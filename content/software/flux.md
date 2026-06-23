---
title: FLUX
description: Black Forest Labs' family of open-weights text-to-image models — the Stable Diffusion creators' second act and the leading open image generator of the mid-2020s; FLUX.2 fuses a rectified-flow transformer with a Mistral language model.
tags: [model, image-generation, open-weights]
technicality: technical
aliases: [FLUX.1, FLUX.2, Black Forest Labs, BFL, FLUX.1 dev, FLUX.1 schnell, FLUX.1 pro]
updated: 2026-06-23
sources:
  - id: bfl-wiki
    title: "Black Forest Labs"
    url: https://en.wikipedia.org/wiki/Black_Forest_Labs
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: flux-repo
    title: "black-forest-labs/flux — Official inference repo for FLUX.1 models (GitHub)"
    url: https://github.com/black-forest-labs/flux
    author: Black Forest Labs
    publisher: GitHub
    year: 2024
  - id: bfl-seriesb
    title: "Black Forest Labs raises $300M at $3.25B valuation"
    url: https://techcrunch.com/2025/12/01/black-forest-labs-raises-300m-at-3-25b-valuation/
    author: TechCrunch
    publisher: TechCrunch
    year: 2025
  - id: bfl-flux2
    title: "FLUX.2: Frontier Visual Intelligence"
    url: https://bfl.ai/blog/flux-2
    author: Black Forest Labs
    publisher: Black Forest Labs
    year: 2025
---

# FLUX

**FLUX** is a family of **open-weights text-to-image models** from **Black Forest Labs** — and,
as of the mid-2020s, the leading open image generator. It is in effect the second act of the
team that created [[Stable Diffusion]]: where Stable Diffusion opened the door to open image
generation, FLUX is its most direct heir.

## The Stable Diffusion lineage

Black Forest Labs (BFL) is a German lab in Freiburg, founded in 2024 by **[[Robin Rombach]]**,
Andreas Blattmann, and Patrick Esser — the three researchers who, working under Björn Ommer at
LMU Munich, had created [[Stable Diffusion]] in 2022.[^bfl-wiki] All three left [[Stability AI]]
to start BFL, carrying the open-image-generation lineage from CompVis through Stability to their
own lab.[^bfl-wiki]

## FLUX.1 and a tiered release

FLUX.1, released in August 2024, came in three tiers that neatly capture the open-vs-closed
tension of the field: **FLUX.1 [schnell]** under the permissive Apache 2.0 license, **FLUX.1
[dev]** as source-available weights under a non-commercial license, and **FLUX.1 [pro]** as a
proprietary, API-only model.[^flux-repo][^bfl-wiki] Built on a **rectified-flow transformer**
(a variant of the [[Diffusion models|diffusion]] / flow-matching approach), it matched
[[Midjourney]] and [[DALL·E]] on quality while keeping an open tier — taking over the
open-ecosystem role Stable Diffusion had pioneered.

## The line since, and the LLM tie

BFL has iterated quickly: **FLUX 1.1 [pro]** (October 2024), **FLUX.1 Kontext** (May 2025, which
added in-context image editing from text and image prompts), and the **FLUX.2** series (November
2025), available in four tiers (pro, flex, dev, and the Apache-licensed klein).[^bfl-wiki][^bfl-flux2]
FLUX.2 is notable for fusing image generation with a language model: it pairs a
**32-billion-parameter rectified-flow transformer** with **[[Mistral AI]]'s Mistral-3 (24B) as
its vision-language encoder**, letting the model reason about a scene before rendering
it.[^bfl-flux2][^bfl-wiki] It is a vivid example of image generation and LLM technology converging.

## Scale

BFL raised an initial round of about $31 million in 2024, then a **$300 million Series B at a
$3.25 billion valuation in December 2025** (co-led by Salesforce Ventures and Anjney Midha's AMP,
with backers including a16z and NVIDIA), bringing its total funding above $450 million.[^bfl-seriesb]
