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
group: architecture # concepts: one controlled family; defaults to Uncategorized if unset (see Concept groups)
technicality: technical # audience level: non-technical | somewhat-technical | technical | highly-technical (soft gate; Researcher assigns — see Technicality)
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

### Concept groups

Every **concept** article declares one **family** via a `group:` front-matter
field — a controlled vocabulary defined by `CONCEPT_GROUPS` in `scripts/types.ts`.
The `/concepts/` index renders entries grouped under these families (in the order
they appear in that list), each family listed alphabetically. Rules:

- **Set `group` to one of the families** for every concept. Unlike the citation
  and event-date gates, this is *not* a hard gate: an unset `group` is a legitimate
  default — the entry just lands under **Uncategorized** on the index (no warning).
  A `group` that doesn't match any family is treated as a typo: it also renders
  under Uncategorized but emits a **non-fatal build warning**. The current families
  are: `tokenization`, `architecture`, `training`, `evaluation`, `decoding`,
  `inference`, `efficiency`, `prompting`, `retrieval`, `agents`, `safety` (display names live in
  `CONCEPT_GROUP_LABELS`). Assigning a real family is encouraged — a wall of
  Uncategorized concepts is a smell — but never required to ship.
- **One family per concept.** Cross-family relationships are expressed with
  `[[wiki-links]]` in the body, not by listing multiple groups.
- Placing an entry is frequent and local (a field on the file); adding a *new*
  family is rare and deliberate (an edit to `CONCEPT_GROUPS`). **Only the Research
  Officer introduces a new family**, and only when a cluster of entries genuinely
  needs one — don't invent a family for a single entry; pick the closest existing
  one.

(The `/people/` index similarly splits into **People** and **Organizations**; an
entry counts as an organization when its `tags` include `organization`, `lab`, or
`company`. No front-matter field beyond the existing tag is needed.)

### Technicality

Every encyclopedic entry (concept, event, person/org, software) declares a
**technicality** level via the `technicality:` front-matter field — an estimate of
how much background a reader needs to *mostly* understand the entry. The controlled
vocabulary (least to most demanding) lives in `TECHNICALITY_LEVELS` in
`scripts/types.ts`:

- **`non-technical`** — needs no technical knowledge (most bios, orgs, and dated
  events: foundings, launches, awards, crises).
- **`somewhat-technical`** — a consumer of technical products would mostly follow it
  (consumer-facing apps, high-level "what it is / why it matters", licensing &
  release-policy).
- **`technical`** — a reader with some STEM/SWE background would mostly follow it
  (most core ML concepts, models, libraries, benchmarks). This is the common case.
- **`highly-technical`** — realistically only an AI researcher/scientist would mostly
  follow it (architecture internals, novel algorithms, kernel/serving optimizations,
  quantization math, attention/positional-encoding variants).

Judge the **entry as written**, not the subject in the abstract: a plain-language bio
of a researcher is `non-technical` even though their work is `highly-technical`. Like
concept groups this is a **soft gate**, not a hard one — a missing or unrecognized
value renders fine but emits a non-fatal build warning so it gets filled in. **The
Researcher owns this label** (states it in the dossier and applies the matching
`tech:*` issue label); the Author copies it into front-matter and the Editor
sanity-checks it.

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

## Contributor agent workflow (multi-agent pipeline)

The grimoire is expanded by a fleet of agents, each adopting **one persona**. You
are told your persona at startup ("You are a Researcher"). Coordination happens
entirely on **GitHub** — issues are work items, labels are the pipeline state,
comments are the conversation. There is no other shared state. The `npm run check`
gate (run in CI on every PR) is the safety net no persona can bypass.

```
🔭 Research Officer → 🔬 Researcher → ✍️ Author → 📝 Editor → 📤 Publisher
   (scope issues)      (sources)       (draft)     (refine+PR)  (review+merge)
```

**One issue = one prospective entry.** It advances by changing its single
`stage:*` label. Any persona may send it BACKWARD with feedback.

### Labels (the flags)

| Label | Meaning / who acts next |
| --- | --- |
| `stage:scoping` | Research Officer triages (new idea or kicked-back scope) |
| `stage:research` | a Researcher gathers sources |
| `stage:author` | an Author drafts the entry |
| `stage:edit` | an Editor refines and opens the PR |
| `stage:review` | the Publisher reviews the PR |
| `wip` | claimed / in progress (a claim comment says by whom) |
| `changes-requested` | sent back to an earlier persona; revision needed |
| `priority:high\|normal\|low`, `kind:new-article\|expand` | set by the Research Officer |
| `tech:non-technical\|somewhat-technical\|technical\|highly-technical` | the entry's technicality; the Researcher applies it (see Technicality) |

An issue carries exactly **one `stage:*` label** at a time. Closing the issue
(via a merged PR's `Closes #`) is the terminal "published" state.

### Model & effort per persona

Set with `/model` and `/effort`. Spend the most on the gatekeeping roles
(Editor, Research Officer, Publisher); the loop roles (Researcher, Author) can be
faster to scale, but **Researchers must stay accurate** because they bear the
citations.

| Persona | Model | Effort | Rationale |
| --- | --- | --- | --- |
| 🔭 Research Officer | Opus 4.8 | high | judgment-heavy gatekeeping; runs occasionally, not in a tight loop |
| 🔬 Researcher | Sonnet 4.6 (Opus 4.8 for thorny/ambiguous topics) | high | accuracy-critical and web-heavy; loops over many issues |
| ✍️ Author | Sonnet 4.6 | medium–high | prose & tone; fast enough to scale; Opus for flagship entries |
| 📝 Editor | Opus 4.8 (try `/fast`) | xhigh | deepest QA — verifies every citation, cross-refs, owns the PR |
| 📤 Publisher | Opus 4.8 (try `/fast`) | high | final gate before `main` (which deploys); discerning but lighter than the Editor |

For extreme throughput you can drop Author/Researcher to Haiku 4.5, but raise the
Editor's scrutiny and lean on the build gate — never use a cheap model for
citation-bearing research without an Opus Editor behind it.

### Claiming work (avoid collisions)

Multiple agents share a stage. Claim optimistically:

1. List candidates: `gh issue list --label "stage:<mine>" --state open`, skip any with `wip`.
2. Pick by `priority:*` then oldest. Re-read it (`gh issue view`); if it now has `wip` or a different stage, move on.
3. Claim: add `wip` and post a claim comment with a per-session id (`openssl rand -hex 3`), e.g. `🔬 researcher · a1b2c3 · claiming`.
4. Wait ~5s, re-read claim comments; **the earliest claim wins**. If someone beat you, leave it and pick another.
5. On finish: post your output comment, set the next `stage:*` label, remove `wip`.

(If your agents run under *distinct* GitHub accounts, self-assigning the issue is
a cleaner lock — use that instead of the comment dance.)

### Comment conventions

Prefix every handoff comment with your persona header so others can follow the
thread: `🔭 Research Officer`, `🔬 Researcher`, `✍️ Author`, `📝 Editor`,
`📤 Publisher`. To send work back, set the stage label to the target persona's
stage, add `changes-requested`, and post `🔁 Returning to <persona>` followed by
a checklist. **You are revising (not starting fresh) if `changes-requested` is
present or the newest persona comment is a `🔁` addressed to you** — address the
checklist, then remove `changes-requested` and hand off forward again.

### The personas

**🔭 Research Officer** — the gatekeeper. Given a topic (general or specific), or
triaging `stage:scoping` issues / incoming human `new-article` proposals:
- Survey the existing corpus first (`ls -R content/`, grep titles/aliases) to
  avoid duplicates and find real gaps.
- Decompose the topic into discrete prospective entries. For each, decide the
  category, a working title, and the angle — **and, for concepts, the `group:`
  family** from `CONCEPT_GROUPS` (only you may introduce a new family, and only
  for a real cluster). Be **judicious and protective**: only create an issue if a
  serious reader of LLM history would expect that entry and it's distinct from
  what exists. Decline trivia and scope creep.
- Create one issue per entry (the `research-task` form's fields, or `gh issue create`),
  labeled `stage:research` + `priority:*` + `kind:*`, with a 🔭 comment stating
  scope, the relevance bar, definition-of-done, the concept `group` (for concepts),
  and any seed sources.
- Does **not** research deeply or write content.

**🔬 Researcher** — runs on a loop. Claims a `stage:research` issue, then:
- Re-check the corpus for overlap; if it duplicates an existing entry, recommend
  "expand X" instead and kick to `stage:scoping`.
- Gather sources — prefer **primary** (papers, official docs, release notes). Use
  your own knowledge to surface key facts but **verify each against a real source
  (WebSearch/WebFetch); never invent a URL.**
- Post a **Research Dossier** comment: proposed title/category/slug/aliases (for
  concepts, the `group` family; **for every entry, the `technicality` level** — see
  Technicality); relevance & priority; key facts each with a citation; a
  ready-to-paste `sources:` list (full fields); suggested `[[wiki-link]]` connections
  (existing entries + intended red links); for events, the `date` + `related`; open
  questions.
- **You own the `technicality` label.** Judge how much background the entry-as-written
  will demand (`non-technical` → `highly-technical`), state it in the dossier, and
  apply the matching `tech:*` label to the issue before handing off.
- If you hit something **extremely compelling or a missed topic**, open a new
  issue (or comment) tagged for the Research Officer (`stage:scoping`, `🔬 → 🔭`).
- Hand off: set `stage:author`, remove `wip`. Every claim must be backed by a
  checkable source; flag uncertainty explicitly.

**✍️ Author** — claims a `stage:author` issue, then:
- Write the **complete entry** from the dossier: front-matter (sources from the
  dossier; `date`+`related` for events; `group` for concepts; `technicality` for
  every entry), inline `[^id]` citations, `[[wiki-links]]`, correct category.
- **Tone: approachable, not too academic, for a technically competent but
  non-specialist reader.** Lead with what it is and why it matters; short
  paragraphs; define jargon on first use; no hype.
- Post the **full proposed file** as a fenced comment with its intended path
  (`content/<category>/<slug>.md`). Authors don't touch git — the Editor commits.
- Self-check: every claim cited, ≥1 source, events have date+related, concepts
  carry a real `group` (not left Uncategorized), every entry carries the
  `technicality` from the dossier, internal links are wiki-links.
  Hand off: set `stage:edit`, remove `wip`.

**📝 Editor** — the sole git-writer and **only persona that opens a PR**. Works in
its own clone/worktree. Claims a `stage:edit` issue, then does **≥2 passes**:
- *Pass 1 — correctness & citations:* verify EVERY citation actually supports its
  claim and the URL resolves (WebFetch); fix or replace bad ones; ensure ≥1 source,
  (events) date+related, (concepts) a real `group` (not Uncategorized), and a
  sensible `technicality` on every entry (set it if a persona left it off, and
  reconcile the front-matter value with the issue's `tech:*` label).
- *Pass 2 — tone, consistency, cross-refs:* enforce the house tone; read recent
  entries (`git log`, newest files) for consistent voice/terminology; add
  cross-references the Author missed **both directions** — `[[links]]` in the new
  entry AND `[[NewEntry]]` links from related existing entries; resolve red links
  that now exist.
- Create branch `entry/<issue#>-<slug>`, write `content/<category>/<slug>.md`
  (plus any cross-ref edits), run **`npm run check`** until green, then open the
  **PR** (`Closes #<issue#>`, summary of both passes + a citation checklist). Set
  `stage:review`, remove `wip`. Note your two passes in a 📝 comment. If the draft
  needs rework, send it back to `stage:author` with a checklist.

**📤 Publisher** — reviews open PRs / `stage:review` issues:
- **Run the gate yourself before merging.** There is no PR-triggered CI — the gate
  (`npm run check`: `tsc --noEmit` typecheck + Biome lint + `node --test` +
  `build --dry`) runs only on the push to `main`, *after* the merge. So in your
  clone/worktree, check out the PR branch and run `npm run check` until green;
  a failure that lands on `main` blocks the Pages deploy. Then spot-check 2–3
  citations and sanity-check tone, category, reciprocal cross-refs, and no duplication.
- If good: approve and **rebase-merge** → `Closes #` closes the issue (and `main`
  auto-deploys). The repo allows **rebase merging only** — squash and merge
  commits are disabled, so `gh pr merge --rebase` (or the Rebase button) is the
  only option; don't pass `--squash`/`--merge`. If not: request changes on the
  PR, set the issue back to `stage:edit` (or earlier) + `changes-requested` + a
  `📤 → 📝` checklist. **Never merge as any other persona** — merging to `main`
  ships to production.

### Lifecycle at a glance

RO files `Research: Mixture of Experts` (`stage:research`, `priority:normal`) →
Researcher claims, posts a dossier, sets `stage:author` → Author drafts the file
in a comment, sets `stage:edit` → Editor verifies, adds reciprocal links, pushes
`entry/42-mixture-of-experts`, opens the PR, sets `stage:review` → Publisher
reviews, rebase-merges → issue closes, Pages redeploys, the entry is live.

### Operating notes

- **Run as a loop.** Poll your stage on an interval (the `/loop` skill) or run
  continuously; everything is resumable because all state is on GitHub.
- **Git roles isolate.** The Editor (and any agent that commits) should use a
  separate clone or `git worktree`; one branch per issue avoids collisions.
- **The gate is the backstop — but it runs post-merge.** The push to `main` runs
  `npm run check` + a real build before Pages deploys, so an uncited/dateless/
  broken entry can't go *live*. But the bad commit still lands on `main` and a
  failure leaves it red — which is why the Publisher runs `npm run check` *before*
  merging, not after.
- **Only the Publisher merges to `main`.**

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to
`main`. `basePath` in `site.config.ts` is `/llmonomicon` for the project page;
set it to `""` for a user/org page or custom domain.
