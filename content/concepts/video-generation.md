---
title: Video generation
description: The synthesis of video from a prompt — the newest generative modality, mostly diffusion-transformer-based; mainstreamed by OpenAI's Sora (since wound down) and led as of 2026 by Google's Veo.
tags: [architecture, video-generation]
group: architecture
technicality: technical
aliases: [Text-to-video, AI video, Video generation models]
updated: 2026-06-23
sources:
  - id: sora-wiki
    title: "Sora (text-to-video model)"
    url: https://en.wikipedia.org/wiki/Sora_(text-to-video_model)
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: sora2
    title: "Sora 2 is here"
    url: https://openai.com/index/sora-2/
    author: OpenAI
    publisher: OpenAI
    year: 2025
  - id: veo-dm
    title: "Veo 3.1 — Google DeepMind"
    url: https://deepmind.google/models/veo/
    author: Google DeepMind
    publisher: Google DeepMind
    year: 2026
---

# Video generation

**Video generation** is the synthesis of short video clips from a prompt — the newest of the
generative modalities, extending the text → image progression into moving pictures. Like image
generation, it is mostly **[[Diffusion models|diffusion]]-based**, and it has become a flagship
capability of the [[Multimodal models|multimodal]] frontier labs.

## How it works

Most video generators are **diffusion [[Transformer|transformers]]** extended into the time
dimension: they denoise a compressed latent representation that spans both space and time.
OpenAI's Sora, for instance, is "a diffusion transformer, a denoising latent diffusion model with
one transformer as its denoiser," generating video by denoising 3D "patches" in latent
space.[^sora-wiki] The hard problems that set video apart from images are **temporal coherence**
(objects staying consistent across frames), plausible **physics and motion**, and increasingly
**synchronized audio**.

## The landscape

**Sora** ([[OpenAI]]) brought text-to-video to mainstream attention — a research preview in
February 2024, a public release in December 2024, and a **Sora 2** with a social app in September
2025.[^sora-wiki][^sora2] But the standalone product proved hard to sustain: the **Sora app shut
down on April 26, 2026**, with its API set to follow on September 24, 2026; reporting tied the
retreat to the heavy cost of running video generation (an estimated ~$1 million per
day).[^sora-wiki] As of 2026, the field is led instead by [[Google DeepMind]]'s **Veo** — Veo 3.1
generates 4K video with **native audio** (ambient sound, dialogue, and synced speech) — alongside
other strong systems from labs such as Runway and Kuaishou (Kling).[^veo-dm] Because the landscape
shifts quickly, any single "best" model is a moving target.

## The LLM connection

Like image generation before it, video generation is converging with the
[[Multimodal models|multimodal]] language-model frontier rather than living in separate products.
Google's Veo sits inside the [[Gemini]] ecosystem, and the broader pattern — first seen as
[[DALL·E]] and [[Imagen]] folded into chat assistants — is for generative media to become a
built-in capability of large multimodal models.
