// Generators for the inner HTML of derived pages: category indexes, the A–Z
// "all pages" index, and the 404 body. The build wraps these in the layout.

import type { SiteConfig } from "./site.config.ts";
import { escapeAttr, escapeHtml } from "./template.ts";
import type { Page } from "./types.ts";
import { joinBase } from "./urls.ts";

function byTitle(a: Page, b: Page): number {
  return a.title.localeCompare(b.title);
}

function listItem(page: Page): string {
  const desc = page.description
    ? ` <span class="page-desc">— ${escapeHtml(page.description)}</span>`
    : "";
  return `<li><a href="${escapeAttr(page.url)}">${escapeHtml(page.title)}</a>${desc}</li>`;
}

/** Bulleted list of the articles within a single category. */
export function categoryIndexHtml(category: string, pages: Page[]): string {
  const articles = pages
    .filter((page) => page.category === category && !page.isCategoryIndex && !page.isHome)
    .sort(byTitle);
  if (articles.length === 0) {
    return '<p class="empty">No articles in this category yet.</p>';
  }
  return `<ul class="page-list">${articles.map(listItem).join("")}</ul>`;
}

/** A–Z index of every article, grouped by first letter. */
export function allPagesIndexHtml(pages: Page[]): string {
  const articles = pages.filter((page) => !page.isHome && !page.isCategoryIndex).sort(byTitle);
  if (articles.length === 0) return '<p class="empty">No articles yet.</p>';

  const groups = new Map<string, Page[]>();
  for (const page of articles) {
    const first = (page.title.trim()[0] ?? "#").toUpperCase();
    const key = first >= "A" && first <= "Z" ? first : "#";
    const bucket = groups.get(key);
    if (bucket) bucket.push(page);
    else groups.set(key, [page]);
  }

  return [...groups.keys()]
    .sort()
    .map((letter) => {
      const items = (groups.get(letter) ?? []).map(listItem).join("");
      const id = escapeAttr(letter.toLowerCase());
      return `<section class="az-group"><h2 id="${id}">${escapeHtml(letter)}</h2><ul class="page-list">${items}</ul></section>`;
    })
    .join("");
}

/** Body for the 404 page. */
export function notFoundHtml(config: SiteConfig): string {
  const home = escapeAttr(joinBase(config.basePath, "/"));
  const all = escapeAttr(joinBase(config.basePath, "/all/"));
  return `<p>This page could not be found in the grimoire. It may have been moved, renamed, or never written.</p>
<p>Return <a href="${home}">home</a>, or browse <a href="${all}">all pages</a>.</p>`;
}
