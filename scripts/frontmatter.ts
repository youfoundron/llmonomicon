// Thin wrapper around gray-matter that normalizes raw front-matter into our
// typed FrontMatter shape. gray-matter (via js-yaml) only ever parses our own
// first-party content at build time, never untrusted runtime input.

import matter from "gray-matter";
import type { FrontMatter, Source } from "./types.ts";

export interface ParsedDoc {
  data: FrontMatter;
  /** Markdown body with the front-matter block removed. */
  body: string;
}

/** Coerce a YAML scalar (string, number, or js-yaml Date) into an optional string. */
function toOptionalString(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const str = String(value).trim();
  return str === "" ? undefined : str;
}

/** Coerce a YAML list, or a comma-separated string, into a trimmed string array. */
function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

/** Normalize the `sources` front-matter list into typed Source objects. */
function toSources(value: unknown): Source[] {
  if (!Array.isArray(value)) return [];
  return value.map((raw) => {
    const entry = (raw ?? {}) as Record<string, unknown>;
    const source: Source = { title: String(entry.title ?? "").trim() };
    const id = toOptionalString(entry.id);
    const url = toOptionalString(entry.url);
    const author = toOptionalString(entry.author);
    const year = toOptionalString(entry.year);
    const publisher = toOptionalString(entry.publisher);
    const accessed = toOptionalString(entry.accessed);
    if (id) source.id = id;
    if (url) source.url = url;
    if (author) source.author = author;
    if (year) source.year = year;
    if (publisher) source.publisher = publisher;
    if (accessed) source.accessed = accessed;
    return source;
  });
}

/** Parse and normalize the front-matter and body of a markdown document. */
export function parseFrontMatter(raw: string): ParsedDoc {
  const parsed = matter(raw);
  const d = parsed.data as Record<string, unknown>;
  const data: FrontMatter = {
    title: toOptionalString(d.title),
    description: toOptionalString(d.description),
    tags: toStringList(d.tags),
    aliases: toStringList(d.aliases),
    date: toOptionalString(d.date),
    updated: toOptionalString(d.updated),
    draft: d.draft === true,
    sources: toSources(d.sources),
    related: toStringList(d.related),
    group: toOptionalString(d.group),
  };
  return { data, body: parsed.content };
}
