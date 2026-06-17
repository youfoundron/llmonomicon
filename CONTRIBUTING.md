# Contributing to the llmonomicon

Thank you for helping build the grimoire! There are two ways to contribute, both
fully through GitHub — there is no backend and no account to create beyond
GitHub itself.

## Two ways to contribute

1. **Suggest an edit (an issue).** Every article has a **✎ Suggest an edit**
   button that opens a prefilled GitHub issue, with the page's path and URL
   already filled in. Best for reporting errors or proposing changes when you'd
   rather not edit the file yourself. Red links (for pages that don't exist yet)
   open a **New article** issue.
2. **Edit on GitHub (a pull request).** The **Edit on GitHub** button opens the
   page's markdown in GitHub's web editor. Saving forks the repo and opens a
   pull request automatically. Best when you want to make the change directly.

For local work, clone the repo and run `npm install && npm run dev`.

## Adding or editing an article

Articles are markdown files under `content/<category>/`, where `<category>` is
one of: `concepts`, `events`, `people`, `tools`, `projects`.

- **Filename → URL.** `content/concepts/attention.md` is served at
  `/concepts/attention/`. Use lowercase, hyphenated filenames.
- **One concept per file.** Keep articles focused; link out to related pages.

### Front-matter

Each file starts with a YAML front-matter block. All fields are optional except
that a page needs a title from *somewhere* (front-matter `title`, or the first
`# H1`, or — failing both — the filename).

```markdown
---
title: Attention
description: One-sentence summary used for meta tags and index listings.
tags: [architecture, mechanism]
aliases: [Self-Attention, Scaled Dot-Product Attention]
date: 2017-06-12 # for events: when it happened
updated: 2026-06-17 # last meaningful edit
draft: false # true hides the page from production builds
---
```

- `aliases` make `[[Self-Attention]]` resolve to this page too.
- `tags` and `description` are surfaced in listings and metadata.

### Linking between pages

Use wiki-style links — they resolve by title or alias and survive renames:

- `[[Transformer]]` → links to the page titled *Transformer*.
- `[[Transformer|the architecture]]` → custom link text.
- A link with no matching page renders as a **red link** that invites someone to
  create it. That's expected and encouraged — it maps the gaps.

Standard markdown, GFM tables, task lists, and fenced code blocks all work.

## Before you open a PR

Run the full gate locally:

```sh
npm run check   # typecheck + Biome (lint & format) + unit tests
```

Please keep the dependency footprint minimal — new runtime dependencies need a
strong justification, since "minimal dependencies" is a core goal of the project.

## Licensing of contributions

By contributing content (anything under `content/`), you agree to license it
under **[CC BY-SA 4.0](LICENSE-CONTENT)**. By contributing code, you agree to
license it under the **[MIT License](LICENSE)**. The issue and pull-request
templates include a checkbox confirming this.
