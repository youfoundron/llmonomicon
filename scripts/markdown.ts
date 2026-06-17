// Markdown rendering via marked: GitHub-style heading anchors, a custom
// `[[wiki-link]]` inline extension (with Wikipedia-style red links for missing
// pages), GFM, and a table-of-contents builder. All marked-specific knowledge
// lives here so a marked upgrade only touches this file.

import { lexer, Marked, type RendererThis, type Tokens } from "marked";
import { createRegistry, type Registry } from "./registry.ts";
import type { SiteConfig } from "./site.config.ts";
import { escapeAttr, escapeHtml } from "./template.ts";
import type { Heading } from "./types.ts";
import { createPageUrl } from "./urls.ts";

export interface RenderResult {
  html: string;
  headings: Heading[];
}

/** A `[[Target]]` or `[[Target|Label]]` inline token. */
interface WikiLinkToken extends Tokens.Generic {
  type: "wikilink";
  raw: string;
  target: string;
  label: string;
}

const WIKILINK_RE = /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/;

/**
 * Render a markdown body to HTML, resolving `[[wiki-links]]` against the
 * registry and collecting headings for the TOC. `slugFn` is a per-page slugger
 * so heading ids are unique within the page and match the TOC.
 */
export function renderMarkdown(
  body: string,
  registry: Registry,
  config: SiteConfig,
  slugFn: (text: string) => string,
): RenderResult {
  const headings: Heading[] = [];
  const marked = new Marked({ gfm: true });

  marked.use({
    extensions: [
      {
        name: "wikilink",
        level: "inline",
        start(src: string) {
          return src.indexOf("[[");
        },
        tokenizer(src: string) {
          const match = WIKILINK_RE.exec(src);
          if (!match) return undefined;
          const target = (match[1] ?? "").trim();
          const label = (match[2] ?? match[1] ?? "").trim();
          const token: WikiLinkToken = { type: "wikilink", raw: match[0], target, label };
          return token;
        },
        renderer(token) {
          const link = token as WikiLinkToken;
          const hit = registry.resolve(link.target);
          if (hit) {
            return `<a class="wikilink" href="${escapeAttr(hit.url)}">${escapeHtml(link.label)}</a>`;
          }
          const createHref = escapeAttr(createPageUrl(link.target, config));
          return `<a class="wikilink wikilink--red" href="${createHref}" title="This page does not exist yet — propose it">${escapeHtml(link.label)}</a>`;
        },
      },
    ],
    renderer: {
      heading(this: RendererThis, token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const id = slugFn(token.text);
        headings.push({ depth: token.depth, text: token.text, id });
        const anchor = `<a class="anchor" href="#${id}" aria-hidden="true">#</a>`;
        return `<h${token.depth} id="${id}">${inner}${anchor}</h${token.depth}>\n`;
      },
    },
  });

  const html = marked.parse(body) as string;
  return { html, headings };
}

/**
 * Build a flat table-of-contents nav from H2/H3 headings. Depth is conveyed via
 * a `toc-h{n}` class (indented by CSS) to keep the markup valid and simple.
 */
export function buildToc(headings: Heading[]): string {
  const items = headings.filter((heading) => heading.depth === 2 || heading.depth === 3);
  if (items.length === 0) return "";
  const lis = items
    .map(
      (heading) =>
        `<li class="toc-h${heading.depth}"><a href="#${escapeAttr(heading.id)}">${escapeHtml(heading.text)}</a></li>`,
    )
    .join("");
  return `<nav class="toc" aria-label="Table of contents"><p class="toc-title">Contents</p><ul>${lis}</ul></nav>`;
}

/**
 * Extract the first level-1 heading's text from a markdown body, used as a
 * title fallback when front-matter has none. Uses marked's lexer so it ignores
 * `#` characters inside code fences.
 */
export function extractFirstH1(body: string): string | undefined {
  for (const token of lexer(body)) {
    if (token.type === "heading" && (token as Tokens.Heading).depth === 1) {
      return (token as Tokens.Heading).text.trim();
    }
  }
  return undefined;
}

// Re-export so build/test code can build a registry without importing two modules.
export { createRegistry };
