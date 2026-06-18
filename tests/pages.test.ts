import assert from "node:assert/strict";
import { test } from "node:test";
import { categoryIndexHtml } from "../scripts/pages.ts";
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

test("concepts index groups by family in CONCEPT_GROUPS order", () => {
  const pages = [
    page({ slug: "prompt-injection", title: "Prompt injection", group: "safety" }),
    page({ slug: "attention", title: "Attention", group: "architecture" }),
    page({ slug: "tokenization", title: "Tokenization", group: "tokenization" }),
  ];
  const html = categoryIndexHtml("concepts", pages);

  // tokenization precedes architecture precedes safety (CONCEPT_GROUPS order).
  const tok = html.indexOf("Tokenization &amp; inputs");
  const arch = html.indexOf("Model architecture");
  const safety = html.indexOf("Safety &amp; security");
  assert.ok(tok >= 0 && arch >= 0 && safety >= 0);
  assert.ok(tok < arch && arch < safety);
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
