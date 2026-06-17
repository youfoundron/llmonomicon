// Two-pass static site build. Pass 1 discovers every markdown file and builds
// the page registry; pass 2 renders each page (resolving [[wiki-links]] and
// [^id] citations against the registry/sources), enforces the citation policy,
// then writes output and copies assets.
//
// Run directly with Node 24 (native type-stripping):
//   node scripts/build.ts        production build into dist/
//   node scripts/build.ts --dev  inject the live-reload client
//   node scripts/build.ts --dry  validate only (citation gate), write nothing

import { glob } from "node:fs/promises";
import { sep } from "node:path";
import { buildCitationContext, citationErrors, renderReferences } from "./citations.ts";
import { parseFrontMatter } from "./frontmatter.ts";
import { copyDir, readText, writeIfChanged } from "./fsutil.ts";
import { buildToc, extractFirstH1, renderMarkdown } from "./markdown.ts";
import { allPagesIndexHtml, categoryIndexHtml, notFoundHtml } from "./pages.ts";
import { createRegistry, type Registry } from "./registry.ts";
import { config } from "./site.config.ts";
import { createSlugger, humanize } from "./slug.ts";
import { escapeAttr, escapeHtml, renderTemplate } from "./template.ts";
import { CATEGORIES, categoryLabel, type Page } from "./types.ts";
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

interface Write {
  path: string;
  html: string;
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

/** Encyclopedic articles (within a category, not the category landing page) must cite sources. */
function requiresSources(page: Page): boolean {
  return page.category !== "" && !page.isCategoryIndex && !page.isHome;
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
        ? categoryLabel(category)
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
      sources: data.sources,
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
    return `<a href="${href}">${escapeHtml(categoryLabel(category))}</a>`;
  }).join("");
}

function breadcrumbHtml(page: Page): string {
  const chevron = '<span aria-hidden="true">›</span>';
  const home = `<a href="${escapeAttr(joinBase(config.basePath, "/"))}">Home</a>`;
  const here = `<span class="here">${escapeHtml(page.title)}</span>`;
  if (!page.category || page.isCategoryIndex) {
    return `<nav class="breadcrumb">${home} ${chevron} ${here}</nav>`;
  }
  const catHref = escapeAttr(joinBase(config.basePath, `/${page.category}/`));
  const cat = `<a href="${catHref}">${escapeHtml(categoryLabel(page.category))}</a>`;
  return `<nav class="breadcrumb">${home} ${chevron} ${cat} ${chevron} ${here}</nav>`;
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
    aboutUrl: escapeAttr(joinBase(config.basePath, "/about/")),
    assetBase: escapeAttr(joinBase(config.basePath, "/assets")),
    repoUrl: escapeAttr(`https://github.com/${config.owner}/${config.repo}`),
    pageClass: page.isHome ? "page-home" : "page-article",
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
    sources: [],
    data: { tags: [], aliases: [], draft: false, sources: [] },
    body: "",
    outPath: outputPath(category, slug),
    isHome: false,
    isCategoryIndex: false,
  };
}

// ---- Pass 2: render + citation gate -----------------------------------------

function render(
  template: string,
  pages: Page[],
  registry: Registry,
  dev: boolean,
): { writes: Write[]; errors: string[] } {
  const writes: Write[] = [];
  const errors: string[] = [];

  // Authored pages (articles, home, authored category indexes).
  for (const page of pages) {
    const citations = buildCitationContext(page.sources);
    const { html, headings } = renderMarkdown(
      page.body,
      registry,
      config,
      createSlugger(),
      citations,
    );

    let content = html;
    if (page.isCategoryIndex) content += categoryIndexHtml(page.category, pages);
    content += renderReferences(page.sources, citations);

    if (requiresSources(page) && page.sources.length === 0) {
      errors.push(
        `${page.contentPath}: article cites no sources (every article must cite at least one)`,
      );
    }
    for (const err of citationErrors(page.sources, citations)) {
      errors.push(`${page.contentPath}: ${err}`);
    }

    const toc = page.isHome || page.isCategoryIndex ? "" : buildToc(headings);
    writes.push({ path: page.outPath, html: renderDocument(template, page, content, toc, dev) });
  }

  // Auto category indexes for categories lacking an authored index.md.
  const authored = new Set(pages.filter((p) => p.isCategoryIndex).map((p) => p.category));
  for (const category of CATEGORIES) {
    if (authored.has(category)) continue;
    const hasArticles = pages.some((p) => p.category === category && !p.isCategoryIndex);
    if (!hasArticles) continue;
    const label = categoryLabel(category);
    const page = syntheticPage(category, "index", label, `Articles on ${label}.`);
    const content = `<h1>${escapeHtml(label)}</h1>${categoryIndexHtml(category, pages)}`;
    writes.push({ path: page.outPath, html: renderDocument(template, page, content, "", dev) });
  }

  // A–Z index of all articles.
  const allPage = syntheticPage("", "all", "All pages", "Every article in the grimoire, A to Z.");
  writes.push({
    path: allPage.outPath,
    html: renderDocument(
      template,
      allPage,
      `<h1>All pages</h1>${allPagesIndexHtml(pages)}`,
      "",
      dev,
    ),
  });

  // 404 — written to dist/404.html (GitHub Pages serves it on a miss).
  const notFound = syntheticPage("", "404", "Page not found", "");
  writes.push({
    path: `${DIST}/404.html`,
    html: renderDocument(
      template,
      notFound,
      `<h1>Page not found</h1>${notFoundHtml(config)}`,
      "",
      dev,
    ),
  });

  return { writes, errors };
}

// ---- Orchestration ----------------------------------------------------------

export async function buildSite(options: { dev?: boolean; dry?: boolean } = {}): Promise<void> {
  const dev = options.dev ?? false;
  const dry = options.dry ?? false;
  const start = performance.now();

  const template = await readText(TEMPLATE_PATH);
  const { pages, registry } = await discover(dev);
  const { writes, errors } = render(template, pages, registry, dev);

  if (errors.length > 0) {
    console.error(`\n✗ Citation check failed — ${errors.length} problem(s):`);
    for (const err of errors) console.error(`  • ${err}`);
    throw new Error("Citation requirements not met; see errors above.");
  }

  if (!dry) {
    for (const write of writes) await writeIfChanged(write.path, write.html);
    await copyDir("assets", `${DIST}/assets`);
    await writeIfChanged(`${DIST}/.nojekyll`, "");
  }

  for (const collision of registry.collisions()) console.warn(`⚠︎  ${collision}`);
  const ms = Math.round(performance.now() - start);
  const mode = dry ? " (dry — citation gate only)" : dev ? " (dev)" : "";
  console.log(`✓ ${dry ? "Checked" : "Built"} ${pages.length} pages${mode} in ${ms}ms`);
}

if (import.meta.main) {
  await buildSite({
    dev: process.argv.includes("--dev"),
    dry: process.argv.includes("--dry"),
  });
}
