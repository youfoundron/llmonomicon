import assert from "node:assert/strict";
import { test } from "node:test";
import { allPagesIndexHtml, categoryIndexHtml } from "../scripts/pages.ts";
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
