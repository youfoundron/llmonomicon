// Thin wrapper around gray-matter that normalizes raw front-matter into our
// typed FrontMatter shape. gray-matter (via js-yaml) only ever parses our own
// first-party content at build time, never untrusted runtime input.

import matter from "gray-matter";
import type { FrontMatter } from "./types.ts";

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
  };
  return { data, body: parsed.content };
}
