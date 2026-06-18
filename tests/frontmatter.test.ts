import assert from "node:assert/strict";
import { test } from "node:test";
import { parseFrontMatter } from "../scripts/frontmatter.ts";

test("parses front-matter data and body", () => {
  const { data, body } = parseFrontMatter(
    "---\ntitle: Attention\ntags: [nlp, transformers]\n---\nHello",
  );
  assert.equal(data.title, "Attention");
  assert.deepEqual(data.tags, ["nlp", "transformers"]);
  assert.equal(body.trim(), "Hello");
});

test("no front-matter yields empty data and full body", () => {
  const { data, body } = parseFrontMatter("# Just markdown");
  assert.equal(data.title, undefined);
  assert.deepEqual(data.tags, []);
  assert.deepEqual(data.aliases, []);
  assert.equal(data.draft, false);
  assert.equal(body.trim(), "# Just markdown");
});

test("coerces a YAML date to an ISO date string", () => {
  const { data } = parseFrontMatter("---\ndate: 2017-06-12\n---\n");
  assert.equal(data.date, "2017-06-12");
});

test("a comma-separated tags string becomes an array", () => {
  const { data } = parseFrontMatter("---\ntags: nlp, transformers\n---\n");
  assert.deepEqual(data.tags, ["nlp", "transformers"]);
});

test("a title containing a colon is preserved when quoted", () => {
  const { data } = parseFrontMatter('---\ntitle: "GPT-4: a model"\n---\n');
  assert.equal(data.title, "GPT-4: a model");
});

test("draft flag is read as a boolean", () => {
  assert.equal(parseFrontMatter("---\ndraft: true\n---\n").data.draft, true);
  assert.equal(parseFrontMatter("---\ntitle: x\n---\n").data.draft, false);
});

test("reads the technicality level as a string", () => {
  assert.equal(
    parseFrontMatter("---\ntechnicality: highly-technical\n---\n").data.technicality,
    "highly-technical",
  );
  assert.equal(parseFrontMatter("---\ntitle: x\n---\n").data.technicality, undefined);
});
