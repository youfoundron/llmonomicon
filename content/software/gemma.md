---
title: Gemma
description: Google DeepMind's family of open-weight models, built from the same research and technology as the Gemini line.
tags: [model, open-weights]
aliases: [CodeGemma, PaliGemma]
updated: 2026-06-17
sources:
  - id: gemma-intro
    title: "Gemma: Introducing new state-of-the-art open models"
    url: https://blog.google/technology/developers/gemma-open-models/
    author: Jeanine Banks & Tris Warkentin
    publisher: Google
    year: 2024
  - id: gemma-terms
    title: "Gemma Terms of Use"
    url: https://ai.google.dev/gemma/terms
    author: Google
    publisher: Google
    year: 2024
  - id: gemma4-license
    title: "Gemma 4 license (Apache License 2.0)"
    url: https://ai.google.dev/gemma/apache_2
    author: Google
    publisher: Google
    year: 2026
---

# Gemma

**Gemma** is [[Google DeepMind]]'s family of **open-weight** models — the openly
downloadable counterpart to the proprietary [[Gemini]] line. Google describes it as
"a family of lightweight, state-of-the-art open models built from the same research
and technology used to create the Gemini models," and first released it on February
21, 2024.[^gemma-intro] Where Gemini is served only through an API, Gemma's weights
can be downloaded and run on your own hardware.

## The models

Gemma launched in two sizes, **2B** and **7B** parameters, each offered in both a
pre-trained and an instruction-tuned version.[^gemma-intro] The models are small
enough to "run on your laptop, workstation, or Google Cloud,"[^gemma-intro] which
put Google directly into the open-weight arena alongside Meta's [[LLaMA]]. The line
has since grown across successive generations and spawned specialized variants such
as **CodeGemma** and **PaliGemma**.[^gemma-terms]

Designed to run on local hardware,[^gemma-intro] Gemma models are widely available
in the [[GGUF]] format for engines like [[llama.cpp]].

## "Open weights," not "open source"

Gemma is a precise illustration of a distinction that matters in the LLM world.
Most of the family is released under Google's own **Gemma Terms of Use**, which is
*not* an OSI-approved open-source license: the terms allow commercial use,
modification, and redistribution, but only "in accordance with the terms of this
Agreement," and they forbid the "restricted uses set forth in the Gemma Prohibited
Use Policy."[^gemma-terms] So those weights are **open** — free to download and
build on — without being **open source** in the strict licensing sense. The newest
generation, **Gemma 4**, closes that gap: it moved to the standard **Apache 2.0**
open-source license.[^gemma4-license] The broader distinction is the subject of
[[Open weights]] and [[Model licensing]].
