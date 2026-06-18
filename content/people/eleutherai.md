---
title: EleutherAI
description: The grassroots collective that built open replications of GPT-3 — The Pile dataset and the GPT-Neo/GPT-J/GPT-NeoX models — before any major lab released a large model openly.
tags: [organization, open-weights]
aliases: [Eleuther, EleutherAI Institute]
updated: 2026-06-18
sources:
  - id: eleuther-wiki
    title: "EleutherAI (Wikipedia)"
    url: https://en.wikipedia.org/wiki/EleutherAI
    publisher: Wikipedia
    year: 2025
  - id: thepile
    title: "The Pile: An 800GB Dataset of Diverse Text for Language Modeling"
    url: https://arxiv.org/abs/2101.00027
    author: Gao et al. (EleutherAI)
    publisher: arXiv
    year: 2020
---

# EleutherAI

**EleutherAI** is the grassroots research collective that built open replications
of GPT-3 before any major lab released a large model openly. Formed in 2020 as a
direct response to OpenAI's decision to withhold its biggest models, it produced
the open datasets and models the community actually used in the years before
[[LLaMA]] — and became a touchstone for the open-source answer to closed AI.[^eleuther-wiki]

## Origins

EleutherAI "began as a Discord server on July 7, 2020," initially under the
tentative name "LibreAI," founded by Connor Leahy, Leo Gao, and Sid Black.[^eleuther-wiki]
Its founding goal was concrete and pointed: to "create an open-source version of
GPT-3."[^eleuther-wiki] That made it the community embodiment of the open-weights
response to [[Staged and responsible release|staged release]] — the practice,
begun with [[GPT-2]] and continued with [[GPT-3]], of keeping the most capable
models behind APIs or withholding them outright.

## What it built

EleutherAI's output defined open LLM work in the early 2020s:

- **The Pile** (2020) — "an 825 GiB English text corpus" assembled from "22 diverse
  high-quality subsets," which became a standard open pretraining dataset.[^thepile]
- **The GPT-Neo family** — GPT-Neo (2021), **GPT-J-6B** (2021, the largest
  open-source GPT-3-style model in the world at its release), and GPT-NeoX-20B
  (2022): the open models people actually ran before Meta's [[LLaMA]].[^eleuther-wiki]
- Later, **Pythia**, a suite of models built for studying how LLMs learn.[^eleuther-wiki]

These were typically distributed as open weights and runnable through
[[Hugging Face Transformers]], reinforcing the open ecosystem.

## Evolution

In early 2023, EleutherAI "incorporated as a non-profit research institute,"[^eleuther-wiki]
broadening from open replication toward interpretability and alignment research.
Its early work remains a landmark in the [[Open weights]] story — proof that a
volunteer community could build large models in the open when the major labs would
not.
