import assert from "node:assert/strict";
import { test } from "node:test";
import { timelineHtml } from "../scripts/pages.ts";
import type { Page, RegistryEntry } from "../scripts/types.ts";

function event(slug: string, date: string, title: string, related: string[]): Page {
  return {
    contentPath: `content/events/${slug}.md`,
    category: "events",
    slug,
    url: `/llmonomicon/events/${slug}/`,
    title,
    description: "",
    tags: [],
    aliases: [],
    sources: [],
    related,
    group: "",
    technicality: "",
    data: { tags: [], aliases: [], draft: false, sources: [], related, date },
    body: "",
    outPath: `dist/events/${slug}/index.html`,
    isHome: false,
    isCategoryIndex: false,
  };
}

const REGISTRY: Record<string, RegistryEntry> = {
  openai: {
    title: "OpenAI",
    slug: "openai",
    url: "/llmonomicon/people/openai/",
    category: "people",
  },
  "gpt-3": {
    title: "GPT-3",
    slug: "gpt-3",
    url: "/llmonomicon/software/gpt-3/",
    category: "software",
  },
};
const resolve = (name: string): RegistryEntry | undefined =>
  REGISTRY[
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  ];

test("timeline sorts events ascending by date", () => {
  const events = [
    event("gpt-3-released", "2020-05-28", "GPT-3 released", ["GPT-3"]),
    event("openai-founded", "2015-12-11", "OpenAI founded", ["OpenAI"]),
  ];
  const html = timelineHtml(events, resolve);
  assert.ok(html.indexOf("OpenAI founded") < html.indexOf("GPT-3 released"));
});

test("timeline items carry year and resolved related categories as data attributes", () => {
  const html = timelineHtml(
    [event("openai-founded", "2015-12-11", "OpenAI founded", ["OpenAI"])],
    resolve,
  );
  assert.match(html, /data-year="2015"/);
  assert.match(html, /data-categories="people"/);
  assert.match(html, /→ <a href="\/llmonomicon\/people\/openai\/">OpenAI<\/a>/);
});

test("timeline dedupes categories and renders filter controls + script", () => {
  const html = timelineHtml(
    [event("gpt-3-released", "2020-05-28", "GPT-3 released", ["GPT-3", "OpenAI"])],
    resolve,
  );
  assert.match(html, /data-categories="software people"|data-categories="people software"/);
  assert.match(html, /class="tl-cat" value="people"/);
  assert.match(html, /id="tl-from"/);
  assert.match(html, /<script>/);
});

test("timeline is empty-stated when there are no events", () => {
  assert.match(timelineHtml([], resolve), /No events yet/);
});
