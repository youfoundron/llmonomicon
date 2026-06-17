import assert from "node:assert/strict";
import { test } from "node:test";
import { createSlugger, humanize, slugify } from "../scripts/slug.ts";

test("slugify lowercases and hyphenates", () => {
  assert.equal(slugify("Attention Is All You Need"), "attention-is-all-you-need");
});

test("slugify collapses non-alphanumerics and trims", () => {
  assert.equal(slugify("  GPT-4: A Model!  "), "gpt-4-a-model");
  assert.equal(slugify("**bold**"), "bold");
});

test("slugify strips diacritics", () => {
  assert.equal(slugify("Café Déjà"), "cafe-deja");
});

test("slugify returns empty for symbol-only input", () => {
  assert.equal(slugify("!!!"), "");
});

test("createSlugger de-duplicates GitHub-style", () => {
  const slug = createSlugger();
  assert.equal(slug("Intro"), "intro");
  assert.equal(slug("Intro"), "intro-1");
  assert.equal(slug("Intro"), "intro-2");
});

test("createSlugger falls back to section for empty slugs", () => {
  const slug = createSlugger();
  assert.equal(slug("!!!"), "section");
  assert.equal(slug("???"), "section-1");
});

test("humanize title-cases slug words", () => {
  assert.equal(humanize("large-language-models"), "Large Language Models");
});
