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
  TECHNICALITY_LEVELS,
  technicalityLabel,
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

/**
 * A concept's technicality as a numeric rank (its index in TECHNICALITY_LEVELS),
 * or "" when unset/unrecognized — which the slider treats as always-shown so an
 * entry never vanishes for want of metadata.
 */
function techRank(page: Page): string {
  const rank = (TECHNICALITY_LEVELS as readonly string[]).indexOf(page.technicality);
  return rank >= 0 ? String(rank) : "";
}

/** Like `listItem`, but tags the row with its technicality rank for the slider. */
function conceptListItem(page: Page): string {
  const desc = page.description
    ? ` <span class="page-desc">— ${escapeHtml(page.description)}</span>`
    : "";
  return `<li data-tech="${escapeAttr(techRank(page))}"><a href="${escapeAttr(page.url)}">${escapeHtml(page.title)}</a>${desc}</li>`;
}

/** A concept-group section whose rows carry technicality ranks for filtering. */
function conceptSection(heading: string, items: Page[]): string {
  const list = items.map(conceptListItem).join("");
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
  // "Uncategorized" bucket rather than vanishing. A technicality slider filters
  // the rows client-side (see conceptsIndexHtml).
  if (category === "concepts") {
    const sections = [...CONCEPT_GROUPS]
      .sort((a, b) => conceptGroupLabel(a).localeCompare(conceptGroupLabel(b)))
      .map((group) => {
        const items = articles.filter((page) => page.group === group);
        return items.length ? conceptSection(conceptGroupLabel(group), items) : "";
      });
    const known = new Set<string>(CONCEPT_GROUPS);
    const ungrouped = articles.filter((page) => !known.has(page.group));
    if (ungrouped.length) sections.push(conceptSection("Uncategorized", ungrouped));
    return conceptsIndexHtml(sections.join(""));
  }
  return `<ul class="page-list">${articles.map(listItem).join("")}</ul>`;
}

// Vanilla-JS technicality filter for the concepts index. A single threshold
// slider hides any row more demanding than the chosen level; a group section
// whose rows are all hidden collapses too. Rows with no rank (unset/unknown
// technicality) always show. Self-contained — no dependency, no template change.
const CONCEPTS_SCRIPT = `<script>
(function () {
  var root = document.querySelector("[data-concepts]");
  if (!root) return;
  var range = document.getElementById("tech-range");
  var out = document.getElementById("tech-out");
  var empty = document.getElementById("tech-empty");
  if (!range) return;
  var labels = ${JSON.stringify(TECHNICALITY_LEVELS.map((level) => technicalityLabel(level)))};
  var items = Array.prototype.slice.call(root.querySelectorAll("li[data-tech]"));
  var sections = Array.prototype.slice.call(root.querySelectorAll(".cat-group"));
  function apply() {
    var max = parseInt(range.value, 10);
    var label = labels[max] || "";
    if (out) out.textContent = label;
    range.setAttribute("aria-valuetext", label);
    var shown = 0;
    items.forEach(function (li) {
      var raw = li.getAttribute("data-tech");
      var rank = raw === "" ? NaN : parseInt(raw, 10);
      var ok = isNaN(rank) || rank <= max;
      li.hidden = !ok;
      if (ok) shown++;
    });
    sections.forEach(function (sec) {
      var rows = Array.prototype.slice.call(sec.querySelectorAll("li[data-tech]"));
      sec.hidden = !rows.some(function (li) { return !li.hidden; });
    });
    if (empty) empty.hidden = shown > 0;
  }
  range.addEventListener("input", apply);
  range.addEventListener("change", apply);
  apply();
})();
</script>`;

/**
 * Wrap the concept-group sections with the technicality threshold slider and the
 * client-side filter script. The slider defaults to the top level (everything
 * shown); sliding it down hides the more demanding entries.
 */
function conceptsIndexHtml(sections: string): string {
  const levels = TECHNICALITY_LEVELS.map((level) => technicalityLabel(level));
  const top = levels.length - 1;
  const topLabel = levels[top] ?? "";
  const ticks = levels
    .map((label, i) => `<option value="${i}" label="${escapeAttr(label)}"></option>`)
    .join("");
  const filter = `<form class="tech-filter" aria-label="Filter concepts by technicality">
  <fieldset>
    <legend>Filter by technicality</legend>
    <label for="tech-range">Show concepts up to</label>
    <input type="range" id="tech-range" min="0" max="${top}" step="1" value="${top}" list="tech-ticks" aria-describedby="tech-out" />
    <output id="tech-out" for="tech-range">${escapeHtml(topLabel)}</output>
    <datalist id="tech-ticks">${ticks}</datalist>
  </fieldset>
</form>`;
  return `${filter}<div data-concepts>${sections}</div><p id="tech-empty" class="empty" hidden>No concepts match the current technicality.</p>${CONCEPTS_SCRIPT}`;
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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Render an event's `date` for display. Dates are normalized to `YYYY`,
// `YYYY-MM`, or `YYYY-MM-DD` strings (frontmatter.ts), so show "June 2017" when
// a month is present and fall back to the bare year otherwise. Day precision is
// intentionally dropped — month + year is the right granularity for a timeline.
// Returns "—" when the date is missing or unparseable.
function formatEventDate(date: string): string {
  const year = date.slice(0, 4);
  if (!/^\d{4}$/.test(year)) return "—";
  const month = Number.parseInt(date.slice(5, 7), 10);
  if (date.length >= 7 && month >= 1 && month <= 12) {
    return `${MONTH_NAMES[month - 1]} ${year}`;
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

/** Body for the 404 page. */
export function notFoundHtml(config: SiteConfig): string {
  const home = escapeAttr(joinBase(config.basePath, "/"));
  const all = escapeAttr(joinBase(config.basePath, "/all/"));
  return `<p>This page could not be found in the grimoire. It may have been moved, renamed, or never written.</p>
<p>Return <a href="${home}">home</a>, or browse <a href="${all}">all pages</a>.</p>`;
}
