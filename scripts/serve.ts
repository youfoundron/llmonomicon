// Zero-dependency dev server: serves dist/ with clean-URL resolution, watches
// the content/template/asset sources, rebuilds on change (debounced), and pushes
// a live-reload signal to the browser over Server-Sent Events.
//
// `npm run dev` runs this under `node --watch` so editing the build code itself
// restarts the process; the in-process fs.watch handles content/template edits.

import { watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { buildSite, LIVE_RELOAD_PATH } from "./build.ts";
import { config } from "./site.config.ts";

const DIST = resolve("dist");
const PORT = config.devPort;
const BASE = config.basePath.replace(/\/+$/, "");
const WATCH_DIRS = ["content", "templates", "assets"];

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

const clients = new Set<ServerResponse>();

function broadcastReload(): void {
  for (const res of clients) res.write("event: reload\ndata: now\n\n");
}

/** Remove the configured basePath prefix from an incoming request path. */
function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) {
    return pathname.slice(BASE.length) || "/";
  }
  return pathname;
}

/** Resolve a URL path to a file inside DIST, honoring clean URLs. Null if absent or escaping. */
async function resolveFile(urlPath: string): Promise<string | null> {
  let rel = decodeURIComponent(urlPath);
  if (rel.endsWith("/")) rel += "index.html";
  const candidate = resolve(DIST, `.${rel}`);
  if (candidate !== DIST && !candidate.startsWith(DIST + sep)) return null; // traversal guard
  try {
    const stats = await stat(candidate);
    if (stats.isFile()) return candidate;
    if (stats.isDirectory()) {
      const index = join(candidate, "index.html");
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    // fall through to "not found"
  }
  return null;
}

function send(res: ServerResponse, status: number, type: string, body: Buffer | string): void {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(body);
}

async function handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const pathname = stripBase(url.pathname);

  // Live-reload SSE channel.
  if (pathname === LIVE_RELOAD_PATH) {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
    });
    res.write(": connected\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  // Clean-URL policy: redirect extensionless paths to a trailing slash.
  if (!pathname.endsWith("/") && extname(pathname) === "") {
    res.writeHead(302, { Location: `${url.pathname}/${url.search}` });
    res.end();
    return;
  }

  const file = await resolveFile(pathname);
  if (!file) {
    const fallback = await resolveFile("/404.html");
    const body = fallback ? await readFile(fallback) : "404 — Not Found";
    send(res, 404, "text/html; charset=utf-8", body);
    return;
  }
  send(res, 200, MIME[extname(file)] ?? "application/octet-stream", await readFile(file));
}

let rebuildTimer: ReturnType<typeof setTimeout> | null = null;

async function rebuild(): Promise<void> {
  try {
    await buildSite({ dev: true });
    broadcastReload();
  } catch (error) {
    console.error("✗ Rebuild failed:", error instanceof Error ? error.message : error);
  }
}

function startWatching(): void {
  const schedule = (): void => {
    if (rebuildTimer) clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(rebuild, 120); // debounce editor save storms
  };
  for (const dir of WATCH_DIRS) {
    try {
      watch(dir, { recursive: true }, () => schedule());
    } catch (error) {
      console.warn(`⚠︎  Cannot watch ${dir}/: ${error instanceof Error ? error.message : error}`);
    }
  }
}

const server = createServer((req, res) => {
  handle(req, res).catch((error) => {
    console.error("✗ Request error:", error);
    if (!res.headersSent) send(res, 500, "text/plain", "500 — Internal Server Error");
  });
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(`✗ Port ${PORT} is in use. Change devPort in scripts/site.config.ts.`);
    process.exit(1);
  }
  throw error;
});

const noBuild = process.argv.includes("--no-build");
if (!noBuild) {
  await buildSite({ dev: true });
  startWatching();
}
// Heartbeat keeps SSE connections from being dropped by proxies.
setInterval(() => {
  for (const res of clients) res.write(": ping\n\n");
}, 20_000).unref();

server.listen(PORT, () => {
  console.log(`llmonomicon dev server → http://localhost:${PORT}${BASE}/`);
});
