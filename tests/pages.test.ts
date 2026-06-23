import assert from "node:assert/strict";
import { test } from "node:test";
import { allPagesIndexHtml, categoryIndexHtml, homeExtrasHtml } from "../scripts/pages.ts";
import type { Page } from "../scripts/types.ts";

// Minimal Page factory for index-rendering tests; only the fields the category
// index reads (title, category, tags, group, url, the role flags) need to be real.
function page(overrides: Partial<Page>): Page {
  const slug = overrides.slug ?? "x";
  const category = overrides.category ?? "concepts";
  return {
    contentPath: `content/${category}/${slug}.md`,
    category,
    slug,
    url: `/llmonomicon/${category}/${slug}/`,
    title: overrides.title ?? slug,
    description: "",
    tags: [],
    aliases: [],
    sources: [],
    related: [],
    group: "",
    technicality: "",
    data: { tags: [], aliases: [], draft: false, sources: [], related: [] },
    body: "",
    outPath: `dist/${category}/${slug}/index.html`,
    isHome: false,
    isCategoryIndex: false,
    ...overrides,
  };
}

test("people index splits People from Organizations, each alphabetical", () => {
  const pages = [
    page({ category: "people", slug: "openai", title: "OpenAI", tags: ["organization", "lab"] }),
    page({ category: "people", slug: "hinton", title: "Geoffrey Hinton", tags: ["researcher"] }),
    page({ category: "people", slug: "vaswani", title: "Ashish Vaswani", tags: ["researcher"] }),
  ];
  const html = categoryIndexHtml("people", pages);

  assert.match(html, /<h2>People<\/h2>/);
  assert.match(html, /<h2>Organizations<\/h2>/);
  // People section precedes Organizations.
  assert.ok(html.indexOf("People</h2>") < html.indexOf("Organizations</h2>"));
  // Within People, Ashish Vaswani sorts before Geoffrey Hinton.
  assert.ok(html.indexOf("Ashish Vaswani") < html.indexOf("Geoffrey Hinton"));
  // OpenAI lands under Organizations (after the Organizations heading).
  assert.ok(html.indexOf("Organizations</h2>") < html.indexOf("OpenAI"));
});

test("concepts index orders family sections alphabetically by label", () => {
  const pages = [
    page({ slug: "prompt-injection", title: "Prompt injection", group: "safety" }),
    page({ slug: "attention", title: "Attention", group: "architecture" }),
    page({ slug: "tokenization", title: "Tokenization", group: "tokenization" }),
  ];
  const html = categoryIndexHtml("concepts", pages);

  // Sections sort by display label: "Model architecture" < "Safety & security"
  // < "Tokenization & inputs".
  const arch = html.indexOf("Model architecture");
  const safety = html.indexOf("Safety &amp; security");
  const tok = html.indexOf("Tokenization &amp; inputs");
  assert.ok(tok >= 0 && arch >= 0 && safety >= 0);
  assert.ok(arch < safety && safety < tok);
});

test("concepts index emits the technicality slider and tags rows with their rank", () => {
  const pages = [
    page({
      slug: "attention",
      title: "Attention",
      group: "architecture",
      technicality: "highly-technical",
    }),
    page({
      slug: "local-llms",
      title: "Local LLMs",
      group: "inference",
      technicality: "somewhat-technical",
    }),
    page({ slug: "loose", title: "Loose end", group: "architecture", technicality: "" }),
  ];
  const html = categoryIndexHtml("concepts", pages);

  // The threshold slider and its scoped container/script are present.
  assert.match(html, /<input type="range" id="tech-range"/);
  assert.match(html, /<div data-concepts>/);
  // Rows carry their technicality rank (index in TECHNICALITY_LEVELS); an unset
  // level renders an empty rank so the filter always shows it.
  assert.match(html, /<li data-tech="3"><a[^>]*>Attention</);
  assert.match(html, /<li data-tech="1"><a[^>]*>Local LLMs</);
  assert.match(html, /<li data-tech=""><a[^>]*>Loose end</);
});

test("A–Z index ignores leading punctuation when alphabetizing", () => {
  const pages = [
    page({ category: "events", slug: "aiayn", title: '"Attention Is All You Need" published' }),
    page({ category: "concepts", slug: "attention", title: "Attention" }),
    page({ category: "software", slug: "bert", title: "BERT" }),
  ];
  const html = allPagesIndexHtml(pages);

  // The quoted title files under "A" — not a leading-punctuation "#" bucket.
  assert.doesNotMatch(html, /id="#"/);
  assert.match(html, /<h2 id="a">A<\/h2>/);
  // Within A, plain "Attention" sorts before the quoted '"Attention Is All You Need"'.
  assert.ok(html.indexOf(">Attention<") < html.indexOf("Attention Is All You Need"));
});

test("home extras feature the 3 most-recent entries (by git date) and a random-entry button", () => {
  const pages = [
    page({ category: "concepts", slug: "a", title: "Alpha", url: "/u/a/" }),
    page({ category: "software", slug: "b", title: "Bravo", url: "/u/b/" }),
    page({ category: "people", slug: "c", title: "Charlie", url: "/u/c/" }),
    page({ category: "events", slug: "d", title: "Delta", url: "/u/d/" }),
    page({ category: "concepts", slug: "index", title: "Concepts", isCategoryIndex: true }),
    page({ category: "", slug: "about", title: "About", isHome: false }),
  ];
  const recency = new Map([
    ["content/concepts/a.md", 100],
    ["content/software/b.md", 400],
    ["content/people/c.md", 300],
    ["content/events/d.md", 200],
  ]);
  const html = homeExtrasHtml(pages, recency);

  // Three cards, ordered by recency desc: Bravo(400) > Charlie(300) > Delta(200).
  const bravo = html.indexOf("Bravo");
  const charlie = html.indexOf("Charlie");
  const delta = html.indexOf("Delta");
  assert.ok(bravo >= 0 && bravo < charlie && charlie < delta);
  // The oldest entry (Alpha) and the non-entries (index, meta page) are not featured.
  assert.doesNotMatch(html, /feat-link[^>]*>Alpha/);
  assert.doesNotMatch(html, /Concepts<\/a>/);
  assert.doesNotMatch(html, />About</);
  // The random button and its embedded list cover every entry (incl. unfeatured Alpha),
  // but never a category index or meta page.
  assert.match(html, /id="random-entry"/);
  for (const url of ["/u/a/", "/u/b/", "/u/c/", "/u/d/"]) assert.ok(html.includes(url));
});

test("home extras fall back to front-matter dates when git recency is empty", () => {
  const fm = (updated: string) => ({
    tags: [],
    aliases: [],
    draft: false,
    sources: [],
    related: [],
    updated,
  });
  const pages = [
    page({
      category: "concepts",
      slug: "old",
      title: "Older",
      url: "/u/old/",
      data: fm("2020-01-01"),
    }),
    page({
      category: "concepts",
      slug: "new",
      title: "Newer",
      url: "/u/new/",
      data: fm("2026-01-01"),
    }),
  ];
  const html = homeExtrasHtml(pages, new Map());

  // With no git data, the more recent front-matter `updated` wins.
  assert.ok(html.indexOf("Newer") < html.indexOf("Older"));
});

test("concepts with no group or an unrecognized one fall to a trailing Uncategorized bucket", () => {
  const pages = [
    page({ slug: "attention", title: "Attention", group: "architecture" }),
    page({ slug: "mystery", title: "Mystery", group: "not-a-real-group" }),
    page({ slug: "loose", title: "Loose end", group: "" }),
  ];
  const html = categoryIndexHtml("concepts", pages);

  assert.match(html, /<h2>Uncategorized<\/h2>/);
  // Uncategorized comes last, and both stray concepts still appear (nothing vanishes).
  assert.ok(html.indexOf("Model architecture") < html.indexOf("Uncategorized</h2>"));
  assert.ok(html.indexOf("Mystery") > html.indexOf("Uncategorized</h2>"));
  assert.ok(html.indexOf("Loose end") > html.indexOf("Uncategorized</h2>"));
});
