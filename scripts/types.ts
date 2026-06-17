// Shared type definitions for the llmonomicon build. Type-only module:
// everything here is erased by Node's type-stripping, so import with `import type`.

/** The five content categories. The empty string denotes top-level pages (e.g. the homepage). */
export type Category = "concepts" | "events" | "people" | "tools" | "projects";

/** The known category folders, in display order. */
export const CATEGORIES: readonly Category[] = [
  "concepts",
  "events",
  "people",
  "tools",
  "projects",
];

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
}

/** A fully-resolved content page, produced by the discover pass. */
export interface Page {
  /** Repo-root-relative POSIX path, e.g. `content/concepts/attention.md`. */
  contentPath: string;
  /** Category folder, or "" for top-level pages like the homepage. */
  category: string;
  /** URL slug, e.g. `attention`. Empty for the homepage. */
  slug: string;
  /** Site-absolute URL (basePath-joined), e.g. `/llmonomicon/concepts/attention/`. */
  url: string;
  title: string;
  description: string;
  tags: string[];
  aliases: string[];
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
