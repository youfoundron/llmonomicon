# CLAUDE.md — operating rules for the llmonomicon

This file is the source of truth for any agent (or human) working in this repo.
Read it before changing anything. It encodes the non-negotiable rules and the
conventions the codebase already follows.

## What this is

The **llmonomicon** is a markdown-first, community-edited static wiki about the
history, concepts, software, people, and organizations of large language models.
It builds to plain static HTML and deploys to GitHub Pages. There is **no
backend**; contributions happen through GitHub (prefilled issues + PRs).

## Non-negotiable rules

1. **Every article must cite at least one source.** This is enforced by the
   build: `node scripts/build.ts` (and `--dry`) **fails** if an article in a
   category has no `sources`, or if an inline `[^id]` citation has no matching
   source. Do not weaken this gate. Do not add an article without real,
   verifiable sources — prefer primary sources (papers, official docs, release
   notes) and include a URL whenever one exists.
2. **Provenance honesty.** Much of this wiki is drafted with the help of LLMs,
   which hallucinate. Citations + human review are the safeguard. When you write
   or edit content, cite specific claims inline and never invent a source or a
   URL. If you cannot verify a claim, mark it or leave it out — do not fabricate.
   The [colophon](content/about.md) states this publicly; keep it accurate.
3. **Minimal dependencies.** Runtime/build deps are exactly `marked` and
   `gray-matter`. Dev deps are `typescript`, `@biomejs/biome`, `@types/node`.
   Everything else uses Node 24 built-ins (`node:fs`, `node:http`, `--watch`,
   `node:test`, `fs.glob`). **Adding a dependency requires a strong, stated
   justification** — default to "no."
4. **Markdown-first.** Content is plain `.md` under `content/`. Don't introduce a
   CMS, a framework, or a client-side rendering step.
5. **TypeScript runs directly.** Node 24 strips types; scripts run via
   `node scripts/*.ts` with no build step. Stay within erasable TS (no enums,
   namespaces, or parameter properties; use `import type`). `tsc --noEmit` is for
   type-checking only.

## Commands

| Command             | Purpose                                                       |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Build + serve + watch + live reload (http://localhost:4173/llmonomicon/) |
| `npm run build`     | Production build into `dist/` (enforces the citation gate)    |
| `npm run check`     | `tsc --noEmit` + Biome + `node --test` + `build --dry` gate   |
| `npm run test`      | Unit tests (`node:test`)                                      |

Always run `npm run check` before committing. CI runs the same gate and then a
real build to deploy Pages, so an uncited page cannot go live.

## Architecture (scripts/)

Two-pass build in `build.ts`: **discover** (glob content, parse front-matter,
build the page registry) then **render** (markdown → HTML, resolve links and
citations, enforce the gate, emit derived pages). Small single-purpose modules:

- `markdown.ts` — the only file with `marked` specifics: heading anchors, the
  `[[wiki-link]]` extension, and the `[^id]` citation extension.
- `citations.ts` — citation context, the rendered References section, validation.
- `frontmatter.ts` — gray-matter wrapper → typed, normalized `FrontMatter`.
- `registry.ts` — title/slug/alias → URL resolution for wiki-links.
- `urls.ts` — clean URLs, `joinBase` (basePath), and the GitHub contribution links.
- `template.ts` — `{{token}}` replacement + HTML escaping.
- `pages.ts` — derived page bodies (category index, A–Z, 404).
- `site.config.ts` — repo identity, basePath, branding. **Change repo/owner here.**
- `serve.ts` — zero-dep dev server (clean URLs, fs.watch, SSE reload).

## Content conventions

Articles live at `content/<category>/<slug>.md`. Categories (folder = slug):

| Folder      | Nav label                | Holds                                      |
| ----------- | ------------------------ | ------------------------------------------ |
| `concepts`  | Concepts                 | ideas & mechanisms                         |
| `events`    | Events                   | dated point-occurrences (see Events below) |
| `people`    | People & Organizations   | individuals **and** labs/companies         |
| `software`  | Research & Software      | research, models, libraries, products      |

(Display labels live in `CATEGORY_LABELS` in `scripts/types.ts`; the folder name
stays a short slug.) `content/index.md` is the home page; top-level pages like
`content/about.md` are meta pages and are **exempt** from the citation gate.
A `content/<category>/index.md` is an optional authored category intro.

### Front-matter schema

```yaml
---
title: Attention # optional; falls back to first H1, then the filename
description: One-sentence summary for meta tags and listings.
tags: [architecture, mechanism]
aliases: [Self-Attention] # extra names that [[wiki-links]] resolve to
date: 2017-06-12 # REQUIRED for events
updated: 2026-06-17
draft: false # true hides the page from production builds
related: [Transformer] # events only: titles this event maps to (see Events)
sources: # REQUIRED for category articles
  - id: vaswani2017 # the key used by inline [^vaswani2017]
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: Vaswani et al.
    publisher: arXiv
    year: 2017
---
```

### Events

An **event** is a single dated occurrence phrased as a short sentence (e.g.
"OpenAI founded"), mapping to entries in other categories via a `related:` list
of their titles/aliases. Rules:

- **`date` is required** for every event — the build fails without it (same
  spirit as the citation gate). Use `YYYY` or `YYYY-MM-DD`.
- Keep the body terse (a sentence or two with the `[[related]]` link + a
  citation); depth belongs in the entity entry the event points to.
- The `/events/` page renders all events as a **timeline**, filterable
  client-side by the category of the related entry and by year range. The filter
  is plain vanilla JS emitted by `timelineHtml` in `pages.ts` — no dependency.

### Linking and citing

- **Internal links must be wiki-links** — `[[Title]]` or `[[Title|label]]`. They
  resolve by title/alias and are basePath-joined. **Never** hand-write an
  absolute internal link like `/about/` in markdown; it bypasses `joinBase` and
  breaks under the project-page base path. A wiki-link to a missing page renders
  as a red link that opens a "new article" issue — that's intentional.
- **Cite inline** with `[^id]`, where `id` matches a `sources[].id`. It renders a
  superscript `[n]` linking to the auto-generated **References** section.

## Style

System serif fonts; a "grimoire" palette in `assets/css/grimoire.css` layered
over a vendored, pinned `water.css` (do not edit `water.css`; it's third-party
and excluded from Biome). Theme follows the OS but can be overridden via the
footer toggle (`data-theme` on `<html>`, stored in `localStorage`). The header is
full on the home page and condensed on article pages (`body.page-article`).

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to
`main`. `basePath` in `site.config.ts` is `/llmonomicon` for the project page;
set it to `""` for a user/org page or custom domain.
