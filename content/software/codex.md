---
title: Codex
description: OpenAI's 2025-era agentic coding tool — a Rust CLI plus cloud, desktop, and IDE surfaces; not to be confused with the 2021 Codex model behind GitHub Copilot.
tags: [coding-agent, agents]
technicality: technical
aliases: [Codex CLI, OpenAI Codex, codex-1, GPT-5-Codex]
updated: 2026-06-23
sources:
  - id: codex_repo
    title: "openai/codex — Lightweight coding agent that runs in your terminal (GitHub)"
    url: https://github.com/openai/codex
    author: OpenAI
    publisher: GitHub
    year: 2026
  - id: codex_intro2025
    title: "Introducing Codex"
    url: https://openai.com/index/introducing-codex/
    author: OpenAI
    publisher: OpenAI
    year: 2025
  - id: codex_changelog
    title: "Changelog / Models — Codex (OpenAI Developers)"
    url: https://developers.openai.com/codex/changelog
    author: OpenAI
    publisher: OpenAI
    year: 2026
  - id: codex_wiki
    title: "Codex (AI agent)"
    url: https://en.wikipedia.org/wiki/Codex_(AI_agent)
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: chen2021
    title: "Evaluating Large Language Models Trained on Code"
    url: https://arxiv.org/abs/2107.03374
    author: Chen et al.
    publisher: arXiv (OpenAI)
    year: 2021
---

# Codex

**Codex** is [[OpenAI]]'s [[Agent|agentic]] coding tool — software that reads a
codebase, plans and writes changes, and runs commands on a developer's behalf. The
name is a known source of confusion, because OpenAI has used "Codex" for **two
different things.** The first was a 2021 [[GPT-3|GPT]] model fine-tuned on public
code that powered GitHub Copilot and shipped with the [[HumanEval]] coding
benchmark.[^chen2021] This entry is about the second: the **2025-era agent and
product line** that revived the name.

## What it is

Codex spans several surfaces. At its center is an open-source **command-line
interface** — `openai/codex`, written in Rust and Apache-2.0 licensed, billed as a
"lightweight coding agent that runs in your terminal," with over **93,000 GitHub
stars as of June 2026.**[^codex_repo] Around the CLI sit **Codex cloud**, which runs
tasks asynchronously in isolated cloud sandboxes; a **desktop app**; and **IDE**
extensions. The CLI arrived in **April 2025**,[^codex_repo] the cloud version as a
research preview on **May 16, 2025**,[^codex_intro2025] and the desktop app in
**February 2026.**[^codex_wiki]

## The models behind it

Codex has run on a sequence of models. It launched on **codex-1**, described by
OpenAI as "a version of the o3 [[Reasoning models|reasoning model]] optimized for
software engineering,"[^codex_intro2025] then moved to dedicated **GPT-5-Codex**
variants, and has since been folded into OpenAI's general **GPT-5.x** line. As of
June 2026 its recommended model is **GPT-5.5**, with the earlier `-Codex`-suffixed
models retired as user-selectable options.[^codex_changelog] (This part of the story
changes quickly.)

## Adoption and context

Codex grew quickly: OpenAI reported over a million developers using it by February
2026 and roughly two million weekly active users by mid-March 2026,[^codex_wiki]
reaching around five million by early June 2026.[^codex_changelog] It sits alongside
the other [[Agent harnesses|coding agents]] this wiki covers — [[Claude Code]],
[[Cursor]], [[Devin]], [[Aider]], and the open-source [[OpenCode]] — and is notable
for coming from the lab that arguably started the category: the original 2021 Codex
model was the engine behind GitHub Copilot.
