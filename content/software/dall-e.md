---
title: DALL·E
description: OpenAI's pioneering text-to-image model line (2021–2026) that brought AI image generation mainstream — later folded into GPT-4o's native image generation and retired.
tags: [model, image-generation, closed-source]
technicality: somewhat-technical
aliases: [DALL-E, DALLE, DALL·E 2, DALL·E 3]
updated: 2026-06-23
sources:
  - id: dalle-wiki
    title: "DALL-E"
    url: https://en.wikipedia.org/wiki/DALL-E
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: dalle2-unclip
    title: "Hierarchical Text-Conditional Image Generation with CLIP Latents (DALL·E 2 / unCLIP)"
    url: https://arxiv.org/abs/2204.06125
    author: Ramesh, Dhariwal, Nichol, Chu & Chen
    publisher: arXiv (OpenAI)
    year: 2022
  - id: openai-deprecation
    title: "Deprecations — OpenAI API (DALL·E models retired 2026-05-12)"
    url: https://developers.openai.com/api/docs/deprecations
    author: OpenAI
    publisher: OpenAI
    year: 2026
---

# DALL·E

**DALL·E** was [[OpenAI]]'s pioneering line of **text-to-image** models — the system that,
more than any other, brought AI image generation into the mainstream. Launched in 2021 and
retired in 2026, its history traces a larger shift: from a standalone image model to image
generation folded directly into a [[Multimodal models|multimodal]] language model. (The name
blends the artist Salvador Dalí and Pixar's WALL·E.[^dalle-wiki])

## The arc

DALL·E was announced on **January 5, 2021**, described by OpenAI as "a version of
[[GPT-3|GPT-3]]" adapted to generate images from text prompts.[^dalle-wiki] **DALL·E 2**
(April 2022) was a large jump in quality built on a different mechanism: a [[Diffusion models|diffusion model]]
conditioned on [[CLIP]] image embeddings — an approach its authors called "unCLIP," set out
in Ramesh et al.'s "Hierarchical Text-Conditional Image Generation with CLIP
Latents."[^dalle2-unclip] **DALL·E 3** followed in September 2023 and was integrated directly
into ChatGPT, letting users generate images in conversation.[^dalle-wiki]

## Folded into the LLM

DALL·E's end is as telling as its beginning. In **March 2025**, OpenAI replaced DALL·E 3 in
ChatGPT with **GPT-4o's native image generation** (later branded "GPT Image"); and on
**May 12, 2026**, the DALL·E API was retired entirely, with developers pointed to the GPT
Image models.[^dalle-wiki][^openai-deprecation] Image generation, in other words, stopped
being a separate product and became a built-in capability of the multimodal LLM itself (see
[[GPT-4o launched]] and [[Multimodal models]]).

## Significance

DALL·E popularized text-to-image generation for a general audience and showed off the
capability that the open-weights [[Stable Diffusion]] soon put in everyone's hands; it was
OpenAI's proprietary counterpart to Stable Diffusion and to [[Midjourney]]. Its absorption
into GPT-4o is one of the clearest concrete examples of a once-separate AI capability being
swallowed into a general-purpose LLM.
