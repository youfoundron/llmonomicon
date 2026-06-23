---
title: Imagen
description: Google DeepMind's text-to-image model line — notable for showing a bigger language-model text encoder improves images more than a bigger diffusion model; now being folded into Gemini's native image generation.
tags: [model, image-generation, closed-source]
technicality: somewhat-technical
aliases: [Google Imagen, Imagen 4, Imagen 3]
updated: 2026-06-23
sources:
  - id: imagen2022
    title: "Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding (Imagen)"
    url: https://arxiv.org/abs/2205.11487
    author: Saharia et al.
    publisher: NeurIPS / arXiv (Google)
    year: 2022
  - id: imagen-dm
    title: "Imagen — Google DeepMind"
    url: https://deepmind.google/models/imagen/
    author: Google DeepMind
    publisher: Google DeepMind
    year: 2026
  - id: imagen4-blog
    title: "Announcing Imagen 4 Fast and the general availability of the Imagen 4 family in the Gemini API"
    url: https://developers.googleblog.com/announcing-imagen-4-fast-and-imagen-4-family-generally-available-in-the-gemini-api/
    author: Google Developers
    publisher: Google
    year: 2025
  - id: imagen-migration
    title: "Migrate from Imagen to a Gemini Image model (Nano Banana)"
    url: https://firebase.google.com/docs/ai-logic/imagen-models-migration
    author: Google (Firebase AI Logic)
    publisher: Google
    year: 2026
---

# Imagen

**Imagen** is [[Google DeepMind]]'s family of **text-to-image** models — Google's counterpart to
OpenAI's [[DALL·E]]. Like DALL·E, it began as a standalone image generator and is now being folded
directly into a [[Multimodal models|multimodal]] language model: Google is retiring the standalone
Imagen models in favor of [[Gemini]]'s native image generation.

## A language model at its core

The original **Imagen** (2022) was a [[Diffusion models|diffusion]] model, but its most influential
finding was about *text*. It conditioned image generation on a large, frozen **T5** text encoder (a
[[Transformer]] language model), and the authors reported that "generic large language models (e.g.
T5), pretrained on text-only corpora, are surprisingly effective at encoding text for image
synthesis: increasing the size of the language model in Imagen boosts both sample fidelity and
image-text alignment much more than increasing the size of the image diffusion model."[^imagen2022]
In other words, a bigger *language* model — not a bigger image model — was the better lever for
quality, an early sign of how tightly image generation and LLMs would converge.

## The arc, and the merge into Gemini

Imagen advanced through several generations to **Imagen 4**, announced at Google I/O in **May 2025**
and made generally available in the [[Gemini]] API in Fast, Standard, and Ultra variants with
SynthID watermarking.[^imagen-dm][^imagen4-blog] But the standalone line is ending: Google has
announced that **all Imagen models will shut down on June 24, 2026**, with developers migrated to
Gemini's native image models (nicknamed "Nano Banana").[^imagen-migration] As with [[DALL·E]]'s
absorption into GPT-4o, Imagen's story ends with image generation becoming a built-in capability of
the multimodal LLM rather than a separate product.
