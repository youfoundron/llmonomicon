---
title: AutoGPT
description: The open-source project that ignited the 2023 "autonomous agent" wave — wrap GPT-4 in a loop, give it a goal, let it plan and act — and whose limits steered the field toward scoped agents.
tags: [agents, open-source]
aliases: [Auto-GPT]
updated: 2026-06-17
sources:
  - id: autogpt-wiki
    title: "AutoGPT (Wikipedia)"
    url: https://en.wikipedia.org/wiki/AutoGPT
    publisher: Wikipedia
    year: 2025
  - id: autogpt-repo
    title: "Significant-Gravitas/AutoGPT (GitHub repository)"
    url: https://github.com/Significant-Gravitas/AutoGPT
    author: Toran Bruce Richards / Significant Gravitas
    publisher: GitHub
    year: 2023
---

# AutoGPT

**AutoGPT** is the open-source project that, in the spring of 2023, made "AI
agents" a mainstream idea. Its premise was simple and provocative: wrap a powerful
model like GPT-4 in a loop, give it a goal in plain language, and let it plan its
own subtasks and use [[Tool use|tools]] to pursue them with little human input.
Released in March 2023, it became a cultural inflection point — the moment public
imagination caught up with the idea of an [[Agent|agent]] that acts on its
own.[^autogpt-wiki]

## What it was

AutoGPT was released on March 30, 2023, by Toran Bruce Richards, under the banner
of his project Significant Gravitas. It is "an open-source autonomous software
agent that uses OpenAI's large language models, such as [[GPT-3|GPT-4]], to
attempt to achieve a goal specified by a user in natural language," working "by
breaking the main goal into smaller sub-tasks and using tools like web browsing
and file management to complete them."[^autogpt-wiki] It struck a nerve: it
"became the top trending repository on GitHub after its release and has since
repeatedly trended on Twitter."[^autogpt-wiki]

## What it demonstrated — and where it fell short

AutoGPT's importance lies as much in its failures as its successes. In practice it
was unreliable: it had a "tendency to get stuck in infinite loops" (it struggled
to remember its previous actions), a "tendency to hallucinate," and it was
expensive — every step "requires a corresponding call to GPT-4 at a cost of at
least about $0.03 for every 1000 tokens" — and it often failed to finish
tasks.[^autogpt-wiki] The gap between the promise of full autonomy and the messy
reality is precisely what pushed the field away from open-ended autonomous agents
and toward narrower, **scoped** ones — coding agents and the like — that trade
ambition for reliability.

## Source model

The original AutoGPT agent — the 2023 artifact this entry is about — is **open
source under the MIT license**.[^autogpt-repo] The project has since grown into a
larger "AutoGPT Platform," parts of which are dual-licensed (the platform
component uses the source-available Polyform Shield License, while the classic
agent remains MIT), but the historically significant release was the simple,
fully open MIT project.[^autogpt-repo] It occupies the autonomous-agent corner of
the [[Agent harnesses]] landscape.
