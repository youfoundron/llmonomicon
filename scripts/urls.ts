// URL construction: clean page URLs, basePath joining, output paths, and the
// GitHub contribution deep-links. All pure functions, all funnel through
// joinBase so basePath handling lives in exactly one place.

import type { SiteConfig } from "./site.config.ts";
import type { Page } from "./types.ts";

/** Join a basePath prefix with a site-absolute path, collapsing double slashes. */
export function joinBase(basePath: string, path: string): string {
  const base = basePath.replace(/\/+$/, "");
  const rest = path.startsWith("/") ? path : `/${path}`;
  return `${base}${rest}` || "/";
}

/** Clean URL path (no basePath): `/category/slug/`, `/category/`, or `/`. */
export function pageUrlPath(category: string, slug: string): string {
  const isIndex = slug === "" || slug === "index";
  if (category === "" && isIndex) return "/";
  if (isIndex) return `/${category}/`;
  if (category === "") return `/${slug}/`;
  return `/${category}/${slug}/`;
}

/** Filesystem output path under dist/ for the given category + slug. */
export function outputPath(category: string, slug: string): string {
  const urlPath = pageUrlPath(category, slug);
  const inner = urlPath === "/" ? "" : `${urlPath.replace(/^\/|\/$/g, "")}/`;
  return `dist/${inner}index.html`;
}

/** Absolute URL of a page (origin + already-basePathed url), for prefilled issues. */
export function absoluteUrl(pageUrl: string, config: SiteConfig): string {
  return `${config.siteOrigin}${pageUrl}`;
}

/** GitHub web-editor link that opens the source markdown for a fork+PR edit. */
export function editOnGitHubUrl(contentPath: string, config: SiteConfig): string {
  const encoded = contentPath.split("/").map(encodeURIComponent).join("/");
  return `https://github.com/${config.owner}/${config.repo}/edit/${config.branch}/${encoded}`;
}

/** Prefilled "Suggest an edit" issue-form URL carrying the page's path + URL. */
export function suggestEditUrl(page: Page, config: SiteConfig): string {
  const params = new URLSearchParams({
    template: config.editIssueTemplate,
    title: `Edit suggestion: ${page.title}`,
    "page-path": page.contentPath,
    "page-url": absoluteUrl(page.url, config),
  });
  return `https://github.com/${config.owner}/${config.repo}/issues/new?${params.toString()}`;
}

/** Prefilled "new article" issue-form URL used as the target for red links. */
export function createPageUrl(target: string, config: SiteConfig): string {
  const params = new URLSearchParams({
    template: config.newArticleTemplate,
    title: `New article: ${target}`,
    "article-title": target,
  });
  return `https://github.com/${config.owner}/${config.repo}/issues/new?${params.toString()}`;
}
