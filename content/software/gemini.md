---
title: Gemini
description: Google DeepMind's flagship family of natively multimodal frontier models, launched in December 2023 and known for very long context windows.
technicality: somewhat-technical
tags: [model, product, multimodal]
aliases: [Gemini 1.5, Gemini Ultra, Gemini Pro, Gemini Nano]
updated: 2026-06-17
sources:
  - id: gemini-intro
    title: "Introducing Gemini: our largest and most capable AI model"
    url: https://blog.google/technology/ai/google-gemini-ai/
    author: Sundar Pichai & Demis Hassabis
    publisher: Google
    year: 2023
  - id: gemini-15
    title: "Our next-generation model: Gemini 1.5"
    url: https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/
    author: Demis Hassabis & Google DeepMind
    publisher: Google
    year: 2024
---

# Gemini

**Gemini** is [[Google DeepMind]]'s flagship family of large language models, and
Google's principal competitor to [[OpenAI]]'s [[GPT-3|GPT]] line and [[Claude]].
Announced on December 6, 2023, it was designed to be **natively multimodal** —
"built from the ground up" to "understand, operate across and combine different
types of information including text, code, audio, image and video," rather than
bolting those abilities onto a text-only model after the fact.[^gemini-intro]

## The original tiers

Gemini launched in three sizes aimed at different settings:[^gemini-intro]

- **Gemini Ultra** — the "largest and most capable model for highly complex tasks."
- **Gemini Pro** — the "best model for scaling across a wide range of tasks."
- **Gemini Nano** — the "most efficient model for on-device tasks."

At launch, Gemini Ultra was reported as "the first model to outperform human
experts" on [[MMLU]], a broad knowledge-and-reasoning benchmark, scoring 90.0% and
beating the prior state of the art on 30 of 32 standard academic
benchmarks.[^gemini-intro]

## Gemini 1.5 and long context

In February 2024, **Gemini 1.5 Pro** brought two notable changes. It adopted a
[[Mixture of Experts]] architecture, and it dramatically expanded the
[[context window]]: 128,000 tokens as standard, with up to **1 million tokens**
available in production (and as many as 10 million tested in research). At that
scale a single request can take in "1 hour of video, 11 hours of audio, codebases
with over 30,000 lines of code or over 700,000 words."[^gemini-15]

## Foundations

Like its peers, Gemini is built on the [[Transformer]], combined with the
[[Mixture of Experts]] approach for efficient scaling.[^gemini-15] The family has
continued to evolve through later generations. It is the **proprietary** side of
Google DeepMind's model lineup; the company's openly released models are the
separate [[Gemma]] family.
