# llmonomicon

A **digital grimoire of large language models** — a markdown-first,
community-edited wiki covering the history, concepts, software, people, and
organizations behind LLMs. Static, dependency-light, and built to deploy on
GitHub Pages.

## Philosophy

- **Markdown-first.** Articles are plain `.md` files under `content/`. The build
  turns them into static HTML. No database, no CMS.
- **Minimal dependencies.** One runtime dependency (`marked`) plus `gray-matter`
  for front-matter; two dev tools (`typescript`, `@biomejs/biome`). Everything
  else — the dev server, file watching, globbing, tests — uses Node's built-ins.
- **No backend.** Contributions happen statelessly through GitHub: a **Suggest
  an edit** link opens a prefilled issue, and **Edit on GitHub** opens the web
  editor for a pull request.
- **Sourced and honest.** Much of the grimoire is compiled with the help of
  LLMs, so **every article must cite at least one source** — the build refuses
  to publish a page that doesn't. Inline `[^id]` markers tie specific claims to
  specific sources. See the colophon (`/about/`) and [CLAUDE.md](CLAUDE.md).

## Requirements

- **Node.js 24.16.0** (pinned via `mise.toml` and `.nvmrc`). With `mise`
  installed, run `mise install`. The build scripts are TypeScript and run
  directly via Node's native type-stripping — no compile step.

## Getting started

```sh
npm install      # marked, gray-matter, + dev tools
npm run dev      # build, serve at http://localhost:4173/llmonomicon/, live-reload
```

Other scripts:

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run build`     | One-shot production build into `dist/`                    |
| `npm run dev`       | Build + serve + watch + live-reload (under `node --watch`) |
| `npm run serve`     | Serve an existing `dist/` without rebuilding              |
| `npm run typecheck` | `tsc --noEmit`                                            |
| `npm run test`      | `node --test` (the unit suite)                            |
| `npm run check`     | typecheck + Biome + tests (the full gate)                 |
| `npm run format`    | Biome formatter (write)                                   |

## How it works

`scripts/build.ts` runs a two-pass build:

1. **Discover** — glob `content/**/*.md`, parse front-matter, and build a page
   registry mapping every title, slug, and alias to its URL.
2. **Render** — convert each file with `marked`, resolving `[[wiki-links]]`
   against the registry (missing pages become Wikipedia-style *red links* that
   open a "new article" issue), add heading anchors and a table of contents, and
   wrap the result in `templates/page.html`. It also generates category indexes,
   an A–Z index, and `404.html`, then copies `assets/` and writes `.nojekyll`.

Output lands in `dist/` as clean-URL static HTML
(`/concepts/attention/` → `dist/concepts/attention/index.html`), ready for
GitHub Pages.

## Project layout

```
content/      Markdown articles, by category (concepts, events, people, software)
templates/    The single {{token}} HTML layout
assets/       Vendored water.css base + the grimoire theme + favicon
scripts/      The TypeScript build, dev server, and helpers
tests/        node:test unit suite
.github/      Issue Forms powering the stateless contribution flow
```

## Configuration

Site-wide settings (repo owner, branch, base path, branding, dev port) live in
`scripts/site.config.ts`. The `basePath` is `"/llmonomicon"` for a GitHub
project page; set it to `""` for a user/org page or a custom domain.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: edit or add a markdown file and
open a pull request, or use the **Suggest an edit** button on any page.

## License

- **Code** (build scripts, templates, styles): [MIT](LICENSE).
- **Content** (everything under `content/`):
  [CC BY-SA 4.0](LICENSE-CONTENT) — the same share-alike license Wikipedia uses.
