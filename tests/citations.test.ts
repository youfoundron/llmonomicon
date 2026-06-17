import assert from "node:assert/strict";
import { test } from "node:test";
import { buildCitationContext, citationErrors, renderReferences } from "../scripts/citations.ts";
import { renderMarkdown } from "../scripts/markdown.ts";
import { createRegistry } from "../scripts/registry.ts";
import { config } from "../scripts/site.config.ts";
import { createSlugger } from "../scripts/slug.ts";
import type { Source } from "../scripts/types.ts";

const SOURCES: Source[] = [
  { id: "a", title: "Source A", url: "https://example.com/a", author: "Doe", year: "2020" },
  { id: "b", title: "Source B" },
];

test("buildCitationContext numbers sources by list order", () => {
  const ctx = buildCitationContext(SOURCES);
  assert.equal(ctx.byId.get("a"), 1);
  assert.equal(ctx.byId.get("b"), 2);
});

test("inline [^id] renders a numbered superscript linking to the reference", () => {
  const ctx = buildCitationContext(SOURCES);
  const { html } = renderMarkdown("Claim.[^a]", createRegistry(), config, createSlugger(), ctx);
  assert.match(html, /<sup class="cite" id="cite-a"><a href="#ref-a">\[1\]<\/a><\/sup>/);
  assert.ok(ctx.used.has("a"));
  assert.ok(ctx.anchored.has("a"));
});

test("only the first occurrence of a citation gets the anchor id", () => {
  const ctx = buildCitationContext(SOURCES);
  const { html } = renderMarkdown(
    "One[^a] two[^a]",
    createRegistry(),
    config,
    createSlugger(),
    ctx,
  );
  const sups = html.match(/<sup class="cite"[^>]*>/g) ?? [];
  assert.equal(sups.length, 2);
  assert.ok(sups[0]?.includes('id="cite-a"'));
  assert.ok(!sups[1]?.includes('id="cite-a"'));
});

test("an unknown citation renders a missing marker and is flagged", () => {
  const ctx = buildCitationContext([]);
  const { html } = renderMarkdown("X[^missing]", createRegistry(), config, createSlugger(), ctx);
  assert.match(html, /class="cite cite--missing"/);
  assert.deepEqual(citationErrors([], ctx), [
    "inline citation [^missing] has no matching source (add an entry with id: missing)",
  ]);
});

test("a citation inside a code span is not processed", () => {
  const ctx = buildCitationContext(SOURCES);
  const { html } = renderMarkdown("`[^a]`", createRegistry(), config, createSlugger(), ctx);
  assert.match(html, /<code>\[\^a\]<\/code>/);
  assert.ok(!ctx.used.has("a"));
});

test("renderReferences emits a numbered list with anchors, links, and backlinks", () => {
  const ctx = buildCitationContext(SOURCES);
  ctx.used.add("a");
  ctx.anchored.add("a"); // simulate one inline use of source a
  const refs = renderReferences(SOURCES, ctx);
  assert.match(refs, /<ol class="ref-list">/);
  assert.match(
    refs,
    /<li id="ref-a">Doe\. <cite><a href="https:\/\/example.com\/a"[^>]*>Source A<\/a><\/cite> \(2020\)\./,
  );
  assert.match(refs, /href="#cite-a"/); // backlink for the cited source
  assert.match(refs, /<li id="ref-b">/); // uncited general reference still listed
  assert.ok(!/href="#cite-b"/.test(refs)); // but no backlink
});

test("renderReferences is empty when there are no sources", () => {
  assert.equal(renderReferences([], buildCitationContext([])), "");
});

test("citationErrors flags an untitled source", () => {
  const sources: Source[] = [{ title: "" }];
  const errors = citationErrors(sources, buildCitationContext(sources));
  assert.ok(errors.some((error) => error.includes("missing a title")));
});
