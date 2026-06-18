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
  software: "Research & Software",
};

/** Human-facing label for a category slug, falling back to a humanized slug. */
export function categoryLabel(category: string): string {
  return (CATEGORY_LABELS as Record<string, string>)[category] ?? humanize(category);
}

/**
 * The controlled vocabulary of concept families, in display order. A concept
 * article picks one via its `group:` front-matter field; the Concepts index
 * groups by it. This is organizational, not a gate: an unset group defaults to
 * "Uncategorized" silently, and an unrecognized one renders there too but emits a
 * non-fatal build warning (a likely typo). Placing an entry is frequent and local
 * (a field on the file); adding a *family* is rare and deliberate (an edit here) —
 * that split is what keeps it scalable.
 */
export const CONCEPT_GROUPS = [
  "tokenization",
  "architecture",
  "training",
  "evaluation",
  "decoding",
  "inference",
  "efficiency",
  "prompting",
  "retrieval",
  "agents",
  "safety",
] as const;

export type ConceptGroup = (typeof CONCEPT_GROUPS)[number];

/** Display labels for concept families; the front-matter value stays a short key. */
export const CONCEPT_GROUP_LABELS: Record<ConceptGroup, string> = {
  tokenization: "Tokenization & inputs",
  architecture: "Model architecture",
  training: "Training & alignment",
  evaluation: "Evaluation",
  decoding: "Decoding & sampling",
  inference: "Inference & serving",
  efficiency: "Quantization & adaptation",
  prompting: "Prompting & reasoning",
  retrieval: "Retrieval & RAG",
  agents: "Agents & tool use",
  safety: "Safety & security",
};

/** Human-facing label for a concept-group key, falling back to a humanized slug. */
export function conceptGroupLabel(group: string): string {
  return (CONCEPT_GROUP_LABELS as Record<string, string>)[group] ?? humanize(group);
}

/** Whether a string is one of the controlled concept families. */
export function isConceptGroup(value: string): value is ConceptGroup {
  return (CONCEPT_GROUPS as readonly string[]).includes(value);
}

/**
 * The controlled vocabulary of technicality levels, ordered least to most demanding.
 * Every encyclopedic entry declares one via its `technicality:` front-matter field —
 * an estimate of how much background a reader needs to *mostly* understand the entry
 * as written (not the subject in the abstract). Like concept groups this is an
 * organizational hint, not a correctness gate: a missing or unrecognized value renders
 * fine but emits a non-fatal build warning so it gets filled in. The Researcher assigns
 * it (see CLAUDE.md › Technicality).
 */
export const TECHNICALITY_LEVELS = [
  "non-technical",
  "somewhat-technical",
  "technical",
  "highly-technical",
] as const;

export type TechnicalityLevel = (typeof TECHNICALITY_LEVELS)[number];

/** Display labels for technicality levels; the front-matter value stays a short key. */
export const TECHNICALITY_LABELS: Record<TechnicalityLevel, string> = {
  "non-technical": "Non-technical",
  "somewhat-technical": "Somewhat technical",
  technical: "Technical",
  "highly-technical": "Highly technical",
};

/** Human-facing label for a technicality key, falling back to a humanized slug. */
export function technicalityLabel(level: string): string {
  return (TECHNICALITY_LABELS as Record<string, string>)[level] ?? humanize(level);
}

/** Whether a string is one of the controlled technicality levels. */
export function isTechnicalityLevel(value: string): value is TechnicalityLevel {
  return (TECHNICALITY_LEVELS as readonly string[]).includes(value);
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
  /** For events: titles/aliases of the entries this event maps to (e.g. [OpenAI]). */
  related: string[];
  /** For concepts: the family key (one of `CONCEPT_GROUPS`) this concept belongs to. */
  group?: string;
  /** Audience hint: how much background a reader needs (one of `TECHNICALITY_LEVELS`). */
  technicality?: string;
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
  /** For events: titles/aliases of the entries this event maps to. */
  related: string[];
  /** For concepts: the family key (one of `CONCEPT_GROUPS`); "" if unset. */
  group: string;
  /** Audience hint (one of `TECHNICALITY_LEVELS`); "" if unset. */
  technicality: string;
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
