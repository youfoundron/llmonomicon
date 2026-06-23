---
title: Apple Silicon
description: Apple's M-series system-on-chip — notable for LLMs because its unified memory lets a Mac hold and run large models locally that would otherwise need data-center hardware.
tags: [hardware, local-llms]
technicality: somewhat-technical
aliases: [M-series, Apple M-series, M5, unified memory]
updated: 2026-06-23
sources:
  - id: apple-m5-mlx
    title: "Exploring LLMs with MLX and the Neural Accelerators in the M5 GPU"
    url: https://machinelearning.apple.com/research/exploring-llms-mlx-m5
    author: Apple Machine Learning Research
    publisher: Apple
    year: 2025
  - id: apple-m5-wiki
    title: "Apple M5"
    url: https://en.wikipedia.org/wiki/Apple_M5
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: apple-m5-news
    title: "Apple unleashes M5, the next big leap in AI performance for Apple silicon"
    url: https://www.apple.com/newsroom/2025/10/apple-unleashes-m5-the-next-big-leap-in-ai-performance-for-apple-silicon/
    author: Apple
    publisher: Apple Newsroom
    year: 2025
  - id: ollama-mlx
    title: "Ollama is now powered by MLX on Apple Silicon"
    url: https://ollama.com/blog/mlx
    author: Ollama
    publisher: Ollama
    year: 2026
---

# Apple Silicon

**Apple Silicon** is Apple's family of in-house **M-series** chips — systems-on-a-chip that combine
the CPU, GPU, Neural Engine, and memory in a single package — which began with the M1 in 2020. The
current generation, the **M5**, arrived in October 2025, with M5 Pro and M5 Max following in March
2026.[^apple-m5-news][^apple-m5-wiki] For large language models, the defining feature is **unified
memory**, which makes a Mac a surprisingly capable machine for running big models locally (see
[[Local LLMs]]).

## Unified memory

On a typical PC, the GPU has its own separate, relatively small pool of [[Hardware for LLMs|VRAM]],
and data must be copied to it. Apple Silicon instead gives the CPU, GPU, and Neural Engine a **single
shared pool of memory**, with no copying between them.[^apple-m5-mlx] The practical effect for LLMs is
that the usual VRAM-capacity wall — only so many gigabytes on a consumer GPU — is replaced by however
much unified memory the Mac has. A high-end **M5 Max** offers up to **128 GB**,[^apple-m5-wiki] enough
to hold a 70-billion-parameter model (roughly 40 GB at 4-bit precision) entirely in memory on a
laptop — something that would otherwise require data-center hardware.

## The tradeoff

The advantage is **capacity**, not raw speed. Generating tokens is limited by
[[Hardware for LLMs|memory bandwidth]], and there Apple Silicon trails dedicated data-center GPUs: an
M5 Max's unified memory runs at roughly **460–614 GB/s**,[^apple-m5-wiki] well below the
multiple-terabytes-per-second bandwidth of [[NVIDIA]]'s data-center parts. So a Mac is excellent for
**local, single-user inference** but not a substitute for a training cluster. Apple has been narrowing
the compute gap: the M5 generation added **"Neural Accelerators"** — dedicated matrix-multiply units
in each GPU core, analogous to NVIDIA's Tensor Cores — which Apple reports give up to a **4× speedup in
time-to-first-token** versus the M4 for language-model inference.[^apple-m5-mlx]

## Running models

In practice, models run on Apple Silicon through **[[MLX]]** (Apple's own array/ML framework),
**[[llama.cpp]]**, and **[[Ollama]]**, typically in a quantized [[GGUF]] format ([[Quantization]]). As
of 2026, Ollama's Apple-Silicon backend is itself built on MLX.[^ollama-mlx]
