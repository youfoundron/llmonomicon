// Two-pass static site build. Pass 1 discovers every markdown file and builds
// the page registry; pass 2 renders each page (resolving [[wiki-links]] against
// the full registry) plus the derived index pages, then copies assets.
//
// Run directly with Node 24 (native type-stripping): `node scripts/build.ts`.

import { glob } from "node:fs/promises";
import { sep } from "node:path";
import { parseFrontMatter } from "./frontmatter.ts";
import { copyDir, readText, writeIfChanged } from "./fsutil.ts";
import { buildToc, extractFirstH1, renderMarkdown } from "./markdown.ts";
import { allPagesIndexHtml, categoryIndexHtml, notFoundHtml } from "./pages.ts";
import { createRegistry, type Registry } from "./registry.ts";
import { config } from "./site.config.ts";
import { createSlugger, humanize } from "./slug.ts";
import { escapeAttr, escapeHtml, renderTemplate } from "./template.ts";
import { CATEGORIES, type Page } from "./types.ts";
import { editOnGitHubUrl, joinBase, outputPath, pageUrlPath, suggestEditUrl } from "./urls.ts";

/** Path of the dev-only live-reload SSE endpoint (shared with serve.ts). */
export const LIVE_RELOAD_PATH = "/__livereload";

const TEMPLATE_PATH = "templates/page.html";
const DIST = "dist";

interface Classification {
  category: string;
  slug: string;
  isHome: boolean;
  isCategoryIndex: boolean;
}

/** Derive category/slug/role from a `content/...md` path. */
function classify(contentPath: string): Classification {
  const rel = contentPath.replace(/^content\//, "").replace(/\.md$/, "");
  const parts = rel.split("/");
  const last = parts.at(-1) ?? rel;
  if (parts.length === 1) {
    return last === "index"
      ? { category: "", slug: "index", isHome: true, isCategoryIndex: false }
      : { category: "", slug: last, isHome: false, isCategoryIndex: false };
  }
  const category = parts[0] ?? "";
  return last === "index"
    ? { category, slug: "index", isHome: false, isCategoryIndex: true }
    : { category, slug: last, isHome: false, isCategoryIndex: false };
}

function toPosix(path: string): string {
  return sep === "/" ? path : path.split(sep).join("/");
}

// ---- Pass 1: discover -------------------------------------------------------

async function discover(dev: boolean): Promise<{ pages: Page[]; registry: Registry }> {
  const paths: string[] = [];
  for await (const entry of glob("content/**/*.md")) paths.push(toPosix(entry));
  paths.sort(); // deterministic registry + output order

  const registry = createRegistry();
  const pages: Page[] = [];

  for (const contentPath of paths) {
    const { data, body } = parseFrontMatter(await readText(contentPath));
    if (data.draft && !dev) continue;

    const { category, slug, isHome, isCategoryIndex } = classify(contentPath);
    const fallback = isHome
      ? config.siteName
      : isCategoryIndex
        ? humanize(category)
        : humanize(slug);
    const title = data.title ?? extractFirstH1(body) ?? fallback;
    const url = joinBase(config.basePath, pageUrlPath(category, slug));

    const page: Page = {
      contentPath,
      category,
      slug,
      url,
      title,
      description: data.description ?? "",
      tags: data.tags,
      aliases: data.aliases,
      data,
      body,
      outPath: outputPath(category, slug),
      isHome,
      isCategoryIndex,
    };
    pages.push(page);
    if (!isHome) registry.add({ title, slug, url, category }, data.aliases);
  }

  return { pages, registry };
}

// ---- Layout / token assembly ------------------------------------------------

function navHtml(): string {
  return CATEGORIES.map((category) => {
    const href = escapeAttr(joinBase(config.basePath, `/${category}/`));
    return `<a href="${href}">${escapeHtml(humanize(category))}</a>`;
  }).join("");
}

function breadcrumbHtml(page: Page): string {
  const home = `<a href="${escapeAttr(joinBase(config.basePath, "/"))}">Home</a>`;
  if (!page.category) {
    return `<nav class="breadcrumb">${home} <span aria-hidden="true">›</span> <span class="here">${escapeHtml(page.title)}</span></nav>`;
  }
  const catHref = escapeAttr(joinBase(config.basePath, `/${page.category}/`));
  const cat = `<a href="${catHref}">${escapeHtml(humanize(page.category))}</a>`;
  if (page.isCategoryIndex) {
    return `<nav class="breadcrumb">${home} <span aria-hidden="true">›</span> <span class="here">${escapeHtml(page.title)}</span></nav>`;
  }
  return `<nav class="breadcrumb">${home} <span aria-hidden="true">›</span> ${cat} <span aria-hidden="true">›</span> <span class="here">${escapeHtml(page.title)}</span></nav>`;
}

function contributionFooter(page: Page): string {
  const suggest = escapeAttr(suggestEditUrl(page, config));
  const edit = escapeAttr(editOnGitHubUrl(page.contentPath, config));
  const updated = page.data.updated ?? page.data.date;
  const stamp = updated ? `<span class="updated">Last updated ${escapeHtml(updated)}</span>` : "";
  return `<footer class="contribute">
  <p class="contribute-note">Spotted something to fix or expand?</p>
  <a class="btn btn-primary" href="${suggest}">✎ Suggest an edit</a>
  <a class="btn" href="${edit}">Edit on GitHub ↗</a>
  ${stamp}
</footer>`;
}

function reloadSnippet(dev: boolean): string {
  if (!dev) return "";
  const path = joinBase(config.basePath, LIVE_RELOAD_PATH);
  return `<script>new EventSource(${JSON.stringify(path)}).addEventListener("reload",()=>location.reload());</script>`;
}

function renderDocument(
  template: string,
  page: Page,
  contentHtml: string,
  toc: string,
  dev: boolean,
): string {
  const contributable = page.contentPath !== "";
  const documentTitle = page.isHome ? config.siteName : `${page.title} · ${config.siteName}`;
  const tokens: Record<string, string> = {
    documentTitle: escapeHtml(documentTitle),
    title: escapeHtml(page.title),
    siteName: escapeHtml(config.siteName),
    tagline: escapeHtml(config.tagline),
    description: escapeAttr(page.description || config.description),
    homeUrl: escapeAttr(joinBase(config.basePath, "/")),
    allUrl: escapeAttr(joinBase(config.basePath, "/all/")),
    assetBase: escapeAttr(joinBase(config.basePath, "/assets")),
    repoUrl: escapeAttr(`https://github.com/${config.owner}/${config.repo}`),
    nav: navHtml(),
    breadcrumb: page.isHome ? "" : breadcrumbHtml(page),
    content: contentHtml,
    toc,
    contributionFooter: contributable ? contributionFooter(page) : "",
    buildYear: String(new Date().getFullYear()),
    devReloadScript: reloadSnippet(dev),
  };
  return renderTemplate(template, tokens);
}

function syntheticPage(category: string, slug: string, title: string, description: string): Page {
  return {
    contentPath: "",
    category,
    slug,
    url: joinBase(config.basePath, pageUrlPath(category, slug)),
    title,
    description,
    tags: [],
    aliases: [],
    data: { tags: [], aliases: [], draft: false },
    body: "",
    outPath: outputPath(category, slug),
    isHome: false,
    isCategoryIndex: false,
  };
}

// ---- Pass 2: render ---------------------------------------------------------

async function render(
  template: string,
  pages: Page[],
  registry: Registry,
  dev: boolean,
): Promise<void> {
  // Authored pages (articles, home, authored category indexes).
  for (const page of pages) {
    const { html, headings } = renderMarkdown(page.body, registry, config, createSlugger());
    let content = html;
    if (page.isCategoryIndex) content += categoryIndexHtml(page.category, pages);
    const toc = page.isHome || page.isCategoryIndex ? "" : buildToc(headings);
    await writeIfChanged(page.outPath, renderDocument(template, page, content, toc, dev));
  }

  // Auto category indexes for categories lacking an authored index.md.
  const authored = new Set(
    pages.filter((page) => page.isCategoryIndex).map((page) => page.category),
  );
  for (const category of CATEGORIES) {
    if (authored.has(category)) continue;
    const hasArticles = pages.some(
      (page) => page.category === category && !page.isCategoryIndex && !page.isHome,
    );
    if (!hasArticles) continue;
    const page = syntheticPage(
      category,
      "index",
      humanize(category),
      `Articles on ${humanize(category)}.`,
    );
    const content = categoryIndexHtml(category, pages);
    await writeIfChanged(page.outPath, renderDocument(template, page, content, "", dev));
  }

  // A–Z index of all articles.
  const allPage = syntheticPage("", "all", "All pages", "Every article in the grimoire, A to Z.");
  await writeIfChanged(
    allPage.outPath,
    renderDocument(template, allPage, allPagesIndexHtml(pages), "", dev),
  );

  // 404 — written directly to dist/404.html (GitHub Pages serves this on a miss).
  const notFound = syntheticPage("", "404", "Page not found", "");
  await writeIfChanged(
    `${DIST}/404.html`,
    renderDocument(template, notFound, notFoundHtml(config), "", dev),
  );
}

// ---- Orchestration ----------------------------------------------------------

export async function buildSite(options: { dev?: boolean } = {}): Promise<void> {
  const dev = options.dev ?? false;
  const start = performance.now();

  const template = await readText(TEMPLATE_PATH);
  const { pages, registry } = await discover(dev);
  await render(template, pages, registry, dev);

  await copyDir("assets", `${DIST}/assets`);
  await writeIfChanged(`${DIST}/.nojekyll`, "");

  for (const collision of registry.collisions()) console.warn(`⚠︎  ${collision}`);
  const ms = Math.round(performance.now() - start);
  console.log(`✓ Built ${pages.length} pages${dev ? " (dev)" : ""} in ${ms}ms`);
}

if (import.meta.main) {
  await buildSite({ dev: process.argv.includes("--dev") });
}
