import assert from "node:assert/strict";
import { test } from "node:test";
import { config } from "../scripts/site.config.ts";
import type { Page } from "../scripts/types.ts";
import {
  createPageUrl,
  editOnGitHubUrl,
  joinBase,
  outputPath,
  pageUrlPath,
  suggestEditUrl,
} from "../scripts/urls.ts";

test("joinBase joins without double slashes", () => {
  assert.equal(
    joinBase("/llmonomicon", "/concepts/attention/"),
    "/llmonomicon/concepts/attention/",
  );
  assert.equal(joinBase("", "/concepts/attention/"), "/concepts/attention/");
  assert.equal(joinBase("/llmonomicon/", "concepts/"), "/llmonomicon/concepts/");
});

test("joinBase with empty base and root path yields /", () => {
  assert.equal(joinBase("", "/"), "/");
});

test("pageUrlPath produces clean URLs", () => {
  assert.equal(pageUrlPath("concepts", "attention"), "/concepts/attention/");
  assert.equal(pageUrlPath("concepts", "index"), "/concepts/");
  assert.equal(pageUrlPath("", "index"), "/");
});

test("outputPath maps to dist/.../index.html", () => {
  assert.equal(outputPath("concepts", "attention"), "dist/concepts/attention/index.html");
  assert.equal(outputPath("", "index"), "dist/index.html");
  assert.equal(outputPath("concepts", "index"), "dist/concepts/index.html");
});

test("editOnGitHubUrl points at the source file on the configured branch", () => {
  assert.equal(
    editOnGitHubUrl("content/concepts/attention.md", config),
    "https://github.com/youfoundron/llmonomicon/edit/main/content/concepts/attention.md",
  );
});

test("suggestEditUrl prefills the issue form's page-path and page-url", () => {
  const page = {
    contentPath: "content/concepts/attention.md",
    url: "/llmonomicon/concepts/attention/",
    title: "Attention",
  } as Page;
  const url = suggestEditUrl(page, config);
  assert.ok(url.startsWith("https://github.com/youfoundron/llmonomicon/issues/new?"));
  const query = new URL(url).searchParams;
  assert.equal(query.get("template"), "edit-suggestion.yml");
  assert.equal(query.get("page-path"), "content/concepts/attention.md");
  assert.equal(
    query.get("page-url"),
    "https://youfoundron.github.io/llmonomicon/concepts/attention/",
  );
  assert.equal(query.get("title"), "Edit suggestion: Attention");
});

test("createPageUrl carries the article title for red links", () => {
  const url = createPageUrl("Mixture of Experts", config);
  const query = new URL(url).searchParams;
  assert.equal(query.get("template"), "new-article.yml");
  assert.equal(query.get("article-title"), "Mixture of Experts");
});
