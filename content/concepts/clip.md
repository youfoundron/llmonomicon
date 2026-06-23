---
title: CLIP
description: OpenAI's 2021 model that places images and text in one shared embedding space via contrastive pretraining — the bridge between language and vision behind text-to-image generation and multimodal models.
tags: [training, multimodal, embeddings]
group: training
technicality: technical
aliases: [Contrastive Language–Image Pretraining, Contrastive Language-Image Pre-training, OpenCLIP]
updated: 2026-06-23
sources:
  - id: clip2021
    title: "Learning Transferable Visual Models From Natural Language Supervision (CLIP)"
    url: https://arxiv.org/abs/2103.00020
    author: Radford et al.
    publisher: arXiv (ICML 2021)
    year: 2021
  - id: openai-clip
    title: "openai/CLIP (official repository)"
    url: https://github.com/openai/CLIP
    author: OpenAI
    publisher: GitHub
    year: 2021
  - id: openclip
    title: "mlfoundations/open_clip — An open source implementation of CLIP"
    url: https://github.com/mlfoundations/open_clip
    author: LAION / ML Foundations
    publisher: GitHub
    year: 2022
---

# CLIP

**CLIP** (Contrastive Language–Image Pre-training) is a 2021 [[OpenAI]] model that learns to
place images and text in a **single shared [[Embeddings|embedding]] space**, so a picture and
a sentence describing it end up near each other. That simple idea became the key **bridge
between language and vision**: it is what lets a text prompt steer an image generator like
[[Stable Diffusion]], and it underpins the image understanding in modern
[[Multimodal models|multimodal models]].

## How it works

CLIP is trained by [[Pretraining|pretraining]] on a very large set of (image, caption) pairs
— 400 million of them, gathered from the web.[^clip2021] It runs an image encoder and a text
encoder side by side and trains them with a **contrastive** objective: "the simple
pre-training task of predicting which caption goes with which image."[^clip2021] In effect,
matched image–caption pairs are pulled together in the embedding space while mismatched ones
are pushed apart. The encoders themselves are ordinary [[Transformer]]-style networks; the
novelty is the objective and the scale. (The work, by Alec Radford and colleagues at OpenAI,
counts [[Ilya Sutskever]] and [[Jack Clark]] among its authors.)

## What it enables

Because text and images share one vector space, you can compare them directly — measure how
well any caption "matches" any image. That yields **zero-shot image classification**: in the
paper's words, "natural language is used to reference learned visual concepts (or describe new
ones) enabling zero-shot transfer," so CLIP can sort images into categories it was never
explicitly trained on, just by describing them in words.[^clip2021] The same shared space is
also what makes **text-conditioned image generation** possible.

## Why it matters for LLMs

CLIP is the connective tissue between this wiki's language world and the vision world. Its
text encoder is what conditioned [[Stable Diffusion]] on prompts (through SD 2.x; SDXL uses
two CLIP encoders, and SD3 adds a T5 language model alongside them). More broadly,
CLIP-style contrastive image–text pretraining is a foundation for **vision-language models** —
the lineage behind the image understanding in systems like [[Gemini]] (see
[[Multimodal models]]). OpenAI released CLIP's code and weights openly,[^openai-clip] and an
open reimplementation, **OpenCLIP**, was later trained by [[LAION]] and is widely used in its
place.[^openclip]
