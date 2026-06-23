---
title: Multimodal models
description: Models that take in and/or produce more than one modality — text, images, audio, video — in a single system; the umbrella connecting vision-language models and native image generation to the LLM story.
tags: [architecture, multimodal]
group: architecture
technicality: technical
aliases: [Multimodal LLM, Multimodal model, Vision-language model, Vision-language models, VLM, VLMs, Omnimodal, Multimodality, Multimodal]
updated: 2026-06-23
sources:
  - id: clip2021
    title: "Learning Transferable Visual Models From Natural Language Supervision (CLIP)"
    url: https://arxiv.org/abs/2103.00020
    author: Radford et al.
    publisher: arXiv (ICML 2021)
    year: 2021
  - id: flamingo2022
    title: "Flamingo: a Visual Language Model for Few-Shot Learning"
    url: https://arxiv.org/abs/2204.14198
    author: Alayrac et al.
    publisher: NeurIPS / arXiv (DeepMind)
    year: 2022
  - id: llava2023
    title: "Visual Instruction Tuning (LLaVA)"
    url: https://arxiv.org/abs/2304.08485
    author: Liu et al.
    publisher: NeurIPS / arXiv
    year: 2023
  - id: gpt4o_image2025
    title: "Introducing 4o Image Generation"
    url: https://openai.com/index/introducing-4o-image-generation/
    author: OpenAI
    publisher: OpenAI
    year: 2025
  - id: gptimage_wiki
    title: "GPT Image"
    url: https://en.wikipedia.org/wiki/GPT_Image
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2025
---

# Multimodal models

A **multimodal model** works with more than one kind of data — text, images,
audio, video — inside a single model, rather than handling text alone. The most
common form is the **vision-language model (VLM)**, which understands images
alongside text: you can show it a photo and ask questions about it. More capable
systems also *generate* across modalities, producing images, audio, or even
[[Video generation|video]] as well as words. Multimodality is what lets an assistant read a chart, describe a screenshot,
or draw a picture, and it has become a defining feature of frontier models such as
[[Gemini]].

## Connecting images and text

The core challenge is getting a model built for [[Tokenization|tokens]] of text to
also make sense of pixels. A pivotal step was [[CLIP]] (2021), which trained an
image encoder and a text encoder together so that a picture and its caption land
near each other in a shared representation — learning by "predicting which caption
goes with which image."[^clip2021] That shared image–text space, learned from huge
numbers of captioned images, gave later systems a ready way to feed visual
information into a language model.

## The vision-language recipe

Two influential systems set a template still common today: attach a vision encoder
to a language model with a small "connector" in between. DeepMind's **Flamingo**
(2022) joined a frozen vision encoder to a frozen language model through added
cross-attention layers, reaching strong few-shot performance on visual tasks
without retraining either part.[^flamingo2022] **LLaVA** (2023) made the recipe
cheap and reproducible: take a frozen [[CLIP]] vision encoder and a [[LLaMA]]-based
language model, connect them with a simple projection layer, and then **visually
instruction-tune** the result on image-and-text examples so it learns to follow
visual instructions.[^llava2023]

## Going native

Through 2024–2026 the frontier shifted from bolting modalities on to building them
in. Rather than calling out to a separate image system, the newest models treat
images as a first-class part of the same model. The clearest marker came on
**March 25, 2025**, when OpenAI introduced **GPT-4o native image generation** and
made it ChatGPT's default image generator, succeeding [[DALL·E]]
3.[^gpt4o_image2025][^gptimage_wiki] Notably, this image generator is
**autoregressive** and built natively into the chat model — unlike DALL·E, which
was a separate [[Stable Diffusion|diffusion]] system invoked on the
side.[^gptimage_wiki] [[Gemini]] is likewise natively multimodal from the ground
up. This is why image generation belongs in a history of language models: it is no
longer a bolt-on but, increasingly, part of the model itself.

## Measuring multimodal ability

Because a multimodal model must reason over images and text together, it needs
benchmarks that test exactly that. [[MMMU]] — a college-level exam spanning many
subjects with diagrams, charts, and figures — has become a standard yardstick for
how well these models combine visual and textual understanding. Multimodal inputs
also consume a model's [[Context window|context window]] just as text does, so
feeding in high-resolution images carries a real cost.
