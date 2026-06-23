---
title: Diffusion language models
description: A class of language models that generate text by iteratively denoising many tokens in parallel rather than predicting one token at a time — trading the standard left-to-right approach for speed.
tags: [architecture, efficiency]
group: architecture
technicality: technical
aliases: [Diffusion LLM, Diffusion LLMs, dLLM, dLLMs, Text diffusion, Diffusion LMs, Diffusion LM]
updated: 2026-06-23
sources:
  - id: ddpm2020
    title: "Denoising Diffusion Probabilistic Models"
    url: https://arxiv.org/abs/2006.11239
    author: Ho, Jain & Abbeel
    publisher: NeurIPS / arXiv
    year: 2020
  - id: llada2025
    title: "Large Language Diffusion Models (LLaDA)"
    url: https://arxiv.org/abs/2502.09992
    author: Nie et al.
    publisher: arXiv
    year: 2025
  - id: mercury2025
    title: "Mercury: Ultra-Fast Language Models Based on Diffusion"
    url: https://arxiv.org/abs/2506.17298
    author: Inception Labs et al.
    publisher: arXiv
    year: 2025
  - id: mercury2_2026
    title: "Introducing Mercury 2"
    url: https://www.inceptionlabs.ai/blog/introducing-mercury-2
    author: Inception Labs
    publisher: Inception Labs
    year: 2026
  - id: geminidiffusion2025
    title: "Gemini Diffusion"
    url: https://deepmind.google/models/gemini-diffusion/
    author: Google DeepMind
    publisher: Google DeepMind
    year: 2025
  - id: diffusiongemma2026
    title: "DiffusionGemma"
    url: https://deepmind.google/models/gemma/diffusiongemma/
    author: Google DeepMind
    publisher: Google DeepMind
    year: 2026
  - id: dlmsurvey2025
    title: "A Survey on Diffusion Language Models"
    url: https://arxiv.org/abs/2508.10875
    author: Various
    publisher: arXiv
    year: 2025
---

# Diffusion language models

Most large language models write the way you read a sentence — one word after the
next, left to right. **Diffusion language models** (dLLMs) take a different route:
they generate a whole block of text at once and then refine it over a handful of
passes, the way an image resolves from static. The appeal is speed — polishing
many tokens in parallel can be much faster than emitting them one at a time — and
the approach is an active research frontier rather than a settled replacement for
the dominant [[Transformer]]-based, [[Decoding strategies|autoregressive]] recipe.

## How they work

A diffusion model generates by **iterative denoising**. It starts from a sequence
of masked or noised tokens and, over a small number of steps, repeatedly predicts
a cleaner version until a coherent passage emerges. This is the same denoising
family behind image generators such as [[Stable Diffusion]], turned toward text;
the foundational formulation is Ho, Jain, and Abbeel's 2020 "Denoising Diffusion
Probabilistic Models."[^ddpm2020] Crucially, a dLLM is usually still a
[[Transformer]] underneath — what changes is the objective and the generation
procedure. Rather than predicting the next token from everything before it, the
model learns to fill in **many tokens in parallel**, attending to context on both
sides.[^llada2025]

That parallelism is the whole point. Because tokens are refined together instead
of strictly one-by-one, diffusion models can reach very high generation
throughput — reported figures exceed **1,000 tokens per second** — which is their
main selling point against autoregressive [[GPT-3|GPT]]-style models. (This is a
different lever from [[Speculative decoding]], which speeds up an autoregressive
model without changing its left-to-right nature; diffusion rethinks the generation
process itself.) Whether dLLMs can match the quality and fine-grained control of
the best autoregressive systems is still an open question.[^mercury2025][^dlmsurvey2025]

## Milestones

**LLaDA** (Nie et al., February 2025) was an influential research demonstration:
an 8-billion-parameter diffusion model trained from scratch and parameterized by
an ordinary [[Transformer]] predicting masked tokens, reported as competitive with
a similarly sized autoregressive LLaMA model on [[In-context learning|in-context]]
tasks.[^llada2025] It was evidence that core LLM capabilities need not depend on
strictly left-to-right generation.

On the commercial side, the startup Inception Labs released **Mercury** in 2025,
which it described as the "world's first commercial-scale diffusion
LLM."[^mercury2025] Its follow-up, **Mercury 2** (announced June 2026), is billed
by the company as "the world's fastest [[Reasoning models|reasoning]] language
model," reporting roughly **1,009 tokens per second** on NVIDIA Blackwell GPUs
with a 128K-token [[Context window|context window]] — by its own measurements more
than five times faster than comparable autoregressive models.[^mercury2_2026]

Google DeepMind has pushed the idea as well. **Gemini Diffusion**, shown at Google
I/O in May 2025, was an experimental text-diffusion research preview in the
[[Gemini]] family.[^geminidiffusion2025] In 2026 the company followed with
**DiffusionGemma**, an experimental *open* model built on its [[Gemma]] line and
the Gemini Diffusion research: a [[Mixture of Experts]] design with 26 billion
total parameters but only about 3.8 billion active per token, reported at over
1,000 tokens per second on a single H100 GPU.[^diffusiongemma2026] As an
[[Open weights|open-weight]] release, it put the approach directly in developers'
hands alongside the proprietary systems.

All throughput figures above are vendor-reported snapshots from 2025–2026 and
should be read as such, and the "first"/"fastest" labels are the makers' own
claims rather than independently established facts.
