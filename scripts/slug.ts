// Deterministic slug helpers: URL slugs, GitHub-style heading anchors (with
// de-duplication), and humanizing slugs back into titles. Pure, no I/O.

/**
 * Normalize arbitrary text into a URL-safe slug: lower-cased, diacritics
 * stripped, runs of non-alphanumerics collapsed to single hyphens, trimmed.
 * Returns "" for input with no slug-able characters (callers supply a fallback).
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip combining diacritical marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // non-alphanumeric runs -> single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

/**
 * Create a stateful heading slugger. Repeated headings get GitHub-style numeric
 * suffixes: the first `Intro` -> `intro`, the next -> `intro-1`, then `intro-2`.
 * Empty slugs fall back to `section`.
 */
export function createSlugger(): (text: string) => string {
  const seen = new Map<string, number>();
  return (text: string): string => {
    const base = slugify(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };
}

/** Turn a slug back into a Title Cased label, e.g. `large-models` -> `Large Models`. */
export function humanize(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
