import assert from "node:assert/strict";
import { test } from "node:test";
import { buildToc, extractFirstH1, renderMarkdown } from "../scripts/markdown.ts";
import { createRegistry, type Registry } from "../scripts/registry.ts";
import { config } from "../scripts/site.config.ts";
import { createSlugger } from "../scripts/slug.ts";
import type { RegistryEntry } from "../scripts/types.ts";

function registryWith(entries: Array<RegistryEntry & { aliases?: string[] }>): Registry {
  const registry = createRegistry();
  for (const entry of entries) registry.add(entry, entry.aliases ?? []);
  return registry;
}

test("resolves a wiki-link to a known page", () => {
  const registry = registryWith([
    {
      title: "Attention",
      slug: "attention",
      url: "/llmonomicon/concepts/attention/",
      category: "concepts",
    },
  ]);
  const { html } = renderMarkdown("See [[Attention]].", registry, config, createSlugger());
  assert.match(
    html,
    /<a class="wikilink" href="\/llmonomicon\/concepts\/attention\/">Attention<\/a>/,
  );
});

test("renders a wiki-link with a custom label", () => {
  const registry = registryWith([
    { title: "Attention", slug: "attention", url: "/x/", category: "concepts" },
  ]);
  const { html } = renderMarkdown("[[Attention|the mechanism]]", registry, config, createSlugger());
  assert.match(html, /class="wikilink" href="\/x\/">the mechanism<\/a>/);
});

test("an unknown wiki-link becomes a red link to the new-article form", () => {
  const { html } = renderMarkdown(
    "[[Nonexistent Page]]",
    createRegistry(),
    config,
    createSlugger(),
  );
  assert.match(html, /class="wikilink wikilink--red"/);
  assert.match(html, /issues\/new\?/);
});

test("a wiki-link inside a code span is not linkified", () => {
  const { html } = renderMarkdown("`[[Attention]]`", createRegistry(), config, createSlugger());
  assert.match(html, /<code>\[\[Attention\]\]<\/code>/);
  assert.ok(!html.includes("wikilink"));
});

test("resolves a wiki-link via an alias", () => {
  const registry = createRegistry();
  registry.add({ title: "Attention", slug: "attention", url: "/a/", category: "concepts" }, [
    "Self-Attention",
  ]);
  const { html } = renderMarkdown("[[Self-Attention]]", registry, config, createSlugger());
  assert.match(html, /class="wikilink" href="\/a\/"/);
});

test("headings get slug ids, anchors, and are collected", () => {
  const { html, headings } = renderMarkdown(
    "## Background\n\ntext",
    createRegistry(),
    config,
    createSlugger(),
  );
  assert.match(html, /<h2 id="background">Background<a class="anchor" href="#background"/);
  assert.deepEqual(headings, [{ depth: 2, text: "Background", id: "background" }]);
});

test("duplicate headings get de-duplicated ids", () => {
  const { headings } = renderMarkdown(
    "## Intro\n\n## Intro",
    createRegistry(),
    config,
    createSlugger(),
  );
  assert.deepEqual(
    headings.map((heading) => heading.id),
    ["intro", "intro-1"],
  );
});

test("GFM tables render", () => {
  const { html } = renderMarkdown(
    "| a | b |\n|---|---|\n| 1 | 2 |",
    createRegistry(),
    config,
    createSlugger(),
  );
  assert.match(html, /<table>/);
});

test("buildToc lists only h2/h3 headings", () => {
  const toc = buildToc([
    { depth: 1, text: "Title", id: "title" },
    { depth: 2, text: "A", id: "a" },
    { depth: 3, text: "B", id: "b" },
  ]);
  assert.match(toc, /href="#a"/);
  assert.match(toc, /toc-h3/);
  assert.ok(!toc.includes("#title"));
});

test("extractFirstH1 returns the first level-1 heading text", () => {
  assert.equal(extractFirstH1("# Title Here\n\nbody"), "Title Here");
  assert.equal(extractFirstH1("no heading here"), undefined);
});
