// Generators for the inner HTML of derived pages: category indexes, the A–Z
// "all pages" index, and the 404 body. The build wraps these in the layout.

import type { SiteConfig } from "./site.config.ts";
import { escapeAttr, escapeHtml } from "./template.ts";
import {
  CATEGORIES,
  CONCEPT_GROUPS,
  categoryLabel,
  conceptGroupLabel,
  type Page,
  type RegistryEntry,
} from "./types.ts";
import { joinBase } from "./urls.ts";

// Alphabetization ignores leading punctuation and quotation marks, so a title
// like '"Attention Is All You Need" published' files under A — not a "#" bucket.
function alphaKey(title: string): string {
  return title.replace(/^[^\p{L}\p{N}]+/u, "");
}

function byTitle(a: Page, b: Page): number {
  return alphaKey(a.title).localeCompare(alphaKey(b.title));
}

function listItem(page: Page): string {
  const desc = page.description
    ? ` <span class="page-desc">— ${escapeHtml(page.description)}</span>`
    : "";
  return `<li><a href="${escapeAttr(page.url)}">${escapeHtml(page.title)}</a>${desc}</li>`;
}

/** A titled section wrapping an alphabetical list of pages. */
function pageSection(heading: string, items: Page[]): string {
  const list = items.map(listItem).join("");
  return `<section class="cat-group"><h2>${escapeHtml(heading)}</h2><ul class="page-list">${list}</ul></section>`;
}

/** Tags marking a People & Organizations entry as an organization rather than a person. */
const ORG_TAGS = new Set(["organization", "lab", "company"]);

function isOrganization(page: Page): boolean {
  return page.tags.some((tag) => ORG_TAGS.has(tag.toLowerCase()));
}

/** Bulleted list of the articles within a single category. */
export function categoryIndexHtml(category: string, pages: Page[]): string {
  const articles = pages
    .filter((page) => page.category === category && !page.isCategoryIndex && !page.isHome)
    .sort(byTitle);
  if (articles.length === 0) {
    return '<p class="empty">No articles in this category yet.</p>';
  }
  // People & Organizations splits its two kinds into labelled groups, each
  // listed alphabetically; other categories stay a single flat list.
  if (category === "people") {
    const orgs = articles.filter(isOrganization);
    const people = articles.filter((page) => !isOrganization(page));
    return [
      people.length ? pageSection("People", people) : "",
      orgs.length ? pageSection("Organizations", orgs) : "",
    ].join("");
  }
  // Concepts group into controlled families, each listed alphabetically. The
  // family sections themselves are ordered alphabetically by display label; a
  // concept with no group, or an unrecognized one, falls to a trailing
  // "Uncategorized" bucket rather than vanishing.
  if (category === "concepts") {
    const sections = [...CONCEPT_GROUPS]
      .sort((a, b) => conceptGroupLabel(a).localeCompare(conceptGroupLabel(b)))
      .map((group) => {
        const items = articles.filter((page) => page.group === group);
        return items.length ? pageSection(conceptGroupLabel(group), items) : "";
      });
    const known = new Set<string>(CONCEPT_GROUPS);
    const ungrouped = articles.filter((page) => !known.has(page.group));
    if (ungrouped.length) sections.push(pageSection("Uncategorized", ungrouped));
    return sections.join("");
  }
  return `<ul class="page-list">${articles.map(listItem).join("")}</ul>`;
}

/** A–Z index of every encyclopedic article, grouped by first letter. */
export function allPagesIndexHtml(pages: Page[]): string {
  const articles = pages
    .filter((page) => page.category !== "" && !page.isCategoryIndex && !page.isHome)
    .sort(byTitle);
  if (articles.length === 0) return '<p class="empty">No articles yet.</p>';

  const groups = new Map<string, Page[]>();
  for (const page of articles) {
    const first = (alphaKey(page.title)[0] ?? "#").toUpperCase();
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

// Vanilla-JS filter for the events timeline. Lives in the generated page (the
// only page that needs it); no dependency and no template change required.
const TIMELINE_SCRIPT = `<script>
(function () {
  var list = document.querySelector("[data-timeline]");
  if (!list) return;
  var items = Array.prototype.slice.call(list.querySelectorAll(".timeline-item"));
  var cats = Array.prototype.slice.call(document.querySelectorAll(".tl-cat"));
  var from = document.getElementById("tl-from");
  var to = document.getElementById("tl-to");
  var empty = document.getElementById("tl-empty");
  function apply() {
    var checked = cats.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    var lo = from.value ? parseInt(from.value, 10) : -Infinity;
    var hi = to.value ? parseInt(to.value, 10) : Infinity;
    var shown = 0;
    items.forEach(function (li) {
      var y = parseInt(li.getAttribute("data-year"), 10);
      var cs = (li.getAttribute("data-categories") || "").split(" ").filter(Boolean);
      var catOk = cs.length === 0 || cs.some(function (x) { return checked.indexOf(x) >= 0; });
      var dateOk = isNaN(y) || (y >= lo && y <= hi);
      var ok = catOk && dateOk;
      li.hidden = !ok;
      if (ok) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  cats.concat([from, to]).forEach(function (el) {
    el.addEventListener("input", apply);
    el.addEventListener("change", apply);
  });
  apply();
})();
</script>`;

const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Render an event's `date` for display. Dates are normalized to `YYYY`,
// `YYYY-MM`, or `YYYY-MM-DD` strings (frontmatter.ts), so show "Jun 2017" when
// a month is present and fall back to the bare year otherwise. Day precision is
// intentionally dropped — month + year is the right granularity for a timeline.
// Returns "—" when the date is missing or unparseable.
function formatEventDate(date: string): string {
  const year = date.slice(0, 4);
  if (!/^\d{4}$/.test(year)) return "—";
  const month = Number.parseInt(date.slice(5, 7), 10);
  if (date.length >= 7 && month >= 1 && month <= 12) {
    return `${MONTH_ABBR[month - 1]} ${year}`;
  }
  return year;
}

/**
 * Render events as a chronological, filterable timeline. Each event carries the
 * categories of the entries it maps to (via `related`) plus its year, so the
 * inline script can filter by category and year range entirely client-side.
 */
export function timelineHtml(
  events: Page[],
  resolve: (name: string) => RegistryEntry | undefined,
): string {
  const sorted = [...events].sort((a, b) => (a.data.date ?? "").localeCompare(b.data.date ?? ""));
  if (sorted.length === 0) return '<p class="empty">No events yet.</p>';

  const years = sorted
    .map((event) => Number.parseInt((event.data.date ?? "").slice(0, 4), 10))
    .filter((year) => !Number.isNaN(year));
  const minYear = years.length ? Math.min(...years) : 0;
  const maxYear = years.length ? Math.max(...years) : 0;

  const catBoxes = CATEGORIES.filter((category) => category !== "events")
    .map(
      (category) =>
        `<label><input type="checkbox" class="tl-cat" value="${category}" checked /> ${escapeHtml(categoryLabel(category))}</label>`,
    )
    .join("");

  const items = sorted
    .map((event) => {
      const date = event.data.date ?? "";
      const year = date.slice(0, 4) || "—";
      const display = formatEventDate(date);
      const entries = event.related
        .map(resolve)
        .filter((entry): entry is RegistryEntry => Boolean(entry));
      const cats = [...new Set(entries.map((entry) => entry.category))].join(" ");
      const related = entries.length
        ? `<span class="timeline-rel">→ ${entries
            .map((entry) => `<a href="${escapeAttr(entry.url)}">${escapeHtml(entry.title)}</a>`)
            .join(", ")}</span>`
        : "";
      return `<li class="timeline-item" data-year="${escapeAttr(year)}" data-categories="${escapeAttr(cats)}"><time datetime="${escapeAttr(date)}" class="timeline-date">${escapeHtml(display)}</time><div class="timeline-body"><a class="timeline-title" href="${escapeAttr(event.url)}">${escapeHtml(event.title)}</a>${related}</div></li>`;
    })
    .join("");

  const filters = `<form class="tl-filters" aria-label="Filter the timeline">
  <fieldset class="tl-cats"><legend>Filter by category</legend>${catBoxes}</fieldset>
  <fieldset class="tl-range"><legend>Year range</legend>
    <label>From <input type="number" id="tl-from" inputmode="numeric" min="${minYear}" max="${maxYear}" placeholder="${minYear}" /></label>
    <label>To <input type="number" id="tl-to" inputmode="numeric" min="${minYear}" max="${maxYear}" placeholder="${maxYear}" /></label>
  </fieldset>
</form>`;

  return `${filters}<ol class="timeline" data-timeline>${items}</ol><p id="tl-empty" class="empty" hidden>No events match the current filters.</p>${TIMELINE_SCRIPT}`;
}

/** Encyclopedic entries (category articles, not home/category-index pages). */
function isEntry(page: Page): boolean {
  return page.category !== "" && !page.isCategoryIndex && !page.isHome;
}

/**
 * Recency key for an entry: its last-commit time (see gitdates.ts) when known,
 * otherwise its front-matter `updated`/`date` parsed to ms — so the featured
 * panel stays deterministic and populated even outside a git checkout. Returns 0
 * when nothing is available, which simply sorts the entry last.
 */
function recencyKey(page: Page, recency: Map<string, number>): number {
  const git = recency.get(page.contentPath);
  if (git) return git;
  const stamp = page.data.updated ?? page.data.date;
  const parsed = stamp ? Date.parse(stamp) : Number.NaN;
  return Number.isNaN(parsed) ? 0 : parsed;
}

// Inline, dependency-free "surprise me" jump. The full entry list is embedded
// as a JS array (internal URLs have no `<`, so they're safe in a script body);
// the click handler picks one at random client-side, keeping the build
// deterministic. Lives only on the home page, so it ships with the home extras.
function randomScript(urls: string[]): string {
  const list = JSON.stringify(urls).replace(/</g, "\\u003c");
  return `<script>
(function () {
  var btn = document.getElementById("random-entry");
  if (!btn) return;
  var urls = ${list};
  btn.addEventListener("click", function () {
    if (!urls.length) return;
    window.location.href = urls[Math.floor(Math.random() * urls.length)];
  });
})();
</script>`;
}

/**
 * Home-page extras appended after the authored intro: a panel featuring the
 * three most recently added/edited entries, and a button that jumps to a random
 * entry. `recency` maps contentPath → last-commit ms (see gitdates.ts).
 */
export function homeExtrasHtml(pages: Page[], recency: Map<string, number>): string {
  const entries = pages.filter(isEntry);
  if (entries.length === 0) return "";

  const recent = [...entries]
    .sort(
      (a, b) => recencyKey(b, recency) - recencyKey(a, recency) || a.title.localeCompare(b.title),
    )
    .slice(0, 3);

  const cards = recent
    .map((page) => {
      const desc = page.description
        ? `<p class="feat-desc">${escapeHtml(page.description)}</p>`
        : "";
      return `<li class="feat-card"><a class="feat-link" href="${escapeAttr(page.url)}">${escapeHtml(page.title)}</a><span class="feat-cat">${escapeHtml(categoryLabel(page.category))}</span>${desc}</li>`;
    })
    .join("");

  return `<section class="home-featured" aria-labelledby="feat-heading">
  <h2 id="feat-heading">Recently added &amp; edited</h2>
  <ul class="feat-grid">${cards}</ul>
</section>
<section class="home-random">
  <button type="button" id="random-entry" class="btn btn-primary">Take me to a random entry</button>
  <noscript><span class="random-note">Enable JavaScript to jump to a random entry.</span></noscript>
</section>
${randomScript(entries.map((page) => page.url))}`;
}

/** Body for the 404 page. */
export function notFoundHtml(config: SiteConfig): string {
  const home = escapeAttr(joinBase(config.basePath, "/"));
  const all = escapeAttr(joinBase(config.basePath, "/all/"));
  return `<p>This page could not be found in the grimoire. It may have been moved, renamed, or never written.</p>
<p>Return <a href="${home}">home</a>, or browse <a href="${all}">all pages</a>.</p>`;
}
