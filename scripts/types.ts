// Shared type definitions for the llmonomicon build.

import { humanize } from "./slug.ts";

/** The content categories. The empty string denotes top-level pages (home, about). */
export type Category = "concepts" | "events" | "people" | "software";

/** The category folders, in nav display order. */
export const CATEGORIES: readonly Category[] = ["concepts", "events", "people", "software"];

/** Display labels for categories. The folder/slug stays short; the label can be richer. */
export const CATEGORY_LABELS: Record<Category, string> = {
  concepts: "Concepts",
  events: "Events",
  people: "People & Organizations",
  software: "Software",
};

/** Human-facing label for a category slug, falling back to a humanized slug. */
export function categoryLabel(category: string): string {
  return (CATEGORY_LABELS as Record<string, string>)[category] ?? humanize(category);
}

/** A single bibliographic source for an article. Title is required; URL is strongly encouraged. */
export interface Source {
  /** Stable id used to cite this source inline via `[^id]`. */
  id?: string;
  title: string;
  url?: string;
  author?: string;
  year?: string;
  publisher?: string;
  /** ISO date the source was last accessed. */
  accessed?: string;
}

/** Parsed, normalized front-matter for a single article. */
export interface FrontMatter {
  title?: string;
  description?: string;
  tags: string[];
  aliases: string[];
  /** ISO `YYYY-MM-DD` string (gray-matter/js-yaml dates are coerced to strings). */
  date?: string;
  updated?: string;
  draft: boolean;
  sources: Source[];
}

/** A fully-resolved content page, produced by the discover pass. */
export interface Page {
  /** Repo-root-relative POSIX path, e.g. `content/concepts/attention.md`. */
  contentPath: string;
  /** Category folder, or "" for top-level pages like the homepage or /about/. */
  category: string;
  /** URL slug, e.g. `attention`. */
  slug: string;
  /** Site-absolute URL (basePath-joined), e.g. `/llmonomicon/concepts/attention/`. */
  url: string;
  title: string;
  description: string;
  tags: string[];
  aliases: string[];
  sources: Source[];
  data: FrontMatter;
  /** Markdown body with front-matter stripped. */
  body: string;
  /** Output file path, e.g. `dist/concepts/attention/index.html`. */
  outPath: string;
  isHome: boolean;
  /** True for an authored `content/<category>/index.md`. */
  isCategoryIndex: boolean;
}

/** A heading collected during render, used to build the table of contents. */
export interface Heading {
  depth: number;
  text: string;
  id: string;
}

/** An entry in the page registry used to resolve `[[wiki-links]]`. */
export interface RegistryEntry {
  title: string;
  slug: string;
  url: string;
  category: string;
}
