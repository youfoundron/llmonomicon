// Citation support: a per-article context mapping source ids to reference
// numbers, the rendered References section (with backlinks), and validation.
// The inline `[^id]` marker itself is a marked extension defined in markdown.ts;
// it reads/writes the context built here.

import { escapeAttr, escapeHtml } from "./template.ts";
import type { Source } from "./types.ts";

export interface CitationContext {
  /** Source id -> 1-based reference number (order of the `sources` list). */
  byId: Map<string, number>;
  /** Ids referenced by an inline `[^id]` during render. */
  used: Set<string>;
  /** Ids that received a `#cite-<id>` anchor (first inline occurrence). */
  anchored: Set<string>;
}

export function buildCitationContext(sources: Source[]): CitationContext {
  const byId = new Map<string, number>();
  sources.forEach((source, index) => {
    if (source.id) byId.set(source.id, index + 1);
  });
  return { byId, used: new Set(), anchored: new Set() };
}

/** Render the per-article References section from its sources. Empty if none. */
export function renderReferences(sources: Source[], ctx: CitationContext): string {
  if (sources.length === 0) return "";
  const items = sources
    .map((source) => {
      const titleHtml = source.url
        ? `<a href="${escapeAttr(source.url)}" rel="noopener nofollow">${escapeHtml(source.title)}</a>`
        : escapeHtml(source.title);
      const lead = source.author ? `${escapeHtml(source.author.replace(/\.$/, ""))}. ` : "";
      const meta: string[] = [];
      if (source.publisher) meta.push(escapeHtml(source.publisher));
      if (source.year) meta.push(escapeHtml(source.year));
      const metaHtml = meta.length ? ` (${meta.join(", ")})` : "";
      const back =
        source.id && ctx.anchored.has(source.id)
          ? ` <a class="ref-back" href="#cite-${escapeAttr(source.id)}" aria-label="Back to text">↩</a>`
          : "";
      const idAttr = source.id ? ` id="ref-${escapeAttr(source.id)}"` : "";
      return `<li${idAttr}>${lead}<cite>${titleHtml}</cite>${metaHtml}.${back}</li>`;
    })
    .join("");
  return `<section class="references"><h2 id="references">References</h2><ol class="ref-list">${items}</ol></section>`;
}

/** Validation errors for a page's citations (dangling refs, untitled sources). */
export function citationErrors(sources: Source[], ctx: CitationContext): string[] {
  const errors: string[] = [];
  for (const id of ctx.used) {
    if (!ctx.byId.has(id)) {
      errors.push(`inline citation [^${id}] has no matching source (add an entry with id: ${id})`);
    }
  }
  sources.forEach((source, index) => {
    if (!source.title) errors.push(`source #${index + 1} is missing a title`);
  });
  return errors;
}
