---
title: FlashAttention
description: An IO-aware algorithm that computes exact attention without storing the full score matrix — faster and far more memory-efficient on GPUs.
tags: [attention, optimization]
aliases: [Flash Attention, FlashAttention-2, FlashAttention-3, FA2]
updated: 2026-06-17
sources:
  - id: dao2022
    title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
    url: https://arxiv.org/abs/2205.14135
    author: "Dao, Fu, Ermon, Rudra, Ré"
    publisher: "arXiv (NeurIPS 2022)"
    year: 2022
  - id: dao2023
    title: "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning"
    url: https://arxiv.org/abs/2307.08691
    author: "Tri Dao"
    publisher: arXiv
    year: 2023
  - id: shah2024
    title: "FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision"
    url: https://arxiv.org/abs/2407.08608
    author: "Shah, Bikshandi, Zhang, Thakkar, Ramani, Dao"
    publisher: arXiv
    year: 2024
  - id: pytorch22
    title: "PyTorch 2.2: FlashAttention-v2 integration, AOTInductor"
    url: https://pytorch.org/blog/pytorch2-2/
    publisher: PyTorch
    year: 2024
  - id: flashrepo
    title: "Dao-AILab/flash-attention (official implementation)"
    url: https://github.com/Dao-AILab/flash-attention
    publisher: GitHub
    year: 2024
---

# FlashAttention

**FlashAttention** is a fast, memory-efficient way to compute the [[Attention]]
operation at the heart of the [[Transformer]]. Crucially, it is *exact* — it
produces the same result as standard attention, not an approximation — yet it
does so without ever storing the full table of attention scores, which is what
makes it both faster and far less memory-hungry.[^dao2022]

## The bottleneck it targets

Standard attention computes an N×N table of scores between every pair of tokens,
and as sequences grow longer that table comes to dominate GPU memory.
Counterintuitively, the real cost is usually not the arithmetic but the *memory
traffic* — shuttling that table between the GPU's small, fast on-chip memory
(SRAM) and its larger but slower main memory (HBM).[^dao2022] Earlier attempts to
tame attention's quadratic cost used *approximate* methods such as sparse or
low-rank attention, but, as the FlashAttention paper notes, these approximate
methods "often do not achieve wall-clock speedup."[^dao2022]

## The idea

FlashAttention is *IO-aware*: it is built around minimizing reads and writes
between levels of GPU memory.[^dao2022] It splits the query, key, and value
matrices into blocks (*tiling*) and fuses the entire softmax into a single GPU
kernel that runs in fast SRAM, keeping running softmax statistics so it can
process one block at a time without ever assembling the full N×N table in slow
HBM.[^dao2022] During training's backward pass, it recomputes those blocks on the
fly instead of storing them.[^dao2022] The outcome is the *exact* same
computation as [[Attention]], but with memory that grows linearly rather than
quadratically — and, because it moves far less data, it runs faster too.[^dao2022]
(The papers also include an optional block-sparse *approximate* variant, but the
core algorithm is exact.)[^dao2022]

## Versions

- **FlashAttention** (2022) delivered large speedups — for instance, roughly 3×
  on GPT-2 — and made long-context benchmarks practical that had been out of
  reach.[^dao2022]
- **FlashAttention-2** (2023) reworked how the computation is divided across a
  GPU's parallel units, roughly doubling throughput over v1 and reaching 50–73%
  of an A100's theoretical maximum.[^dao2023]
- **FlashAttention-3** (2024) adds kernels tuned for NVIDIA's Hopper (H100) GPUs,
  exploiting hardware asynchrony and FP8 low precision for another 1.5–2× over
  v2.[^shah2024]

## Why it matters

FlashAttention turned long contexts and faster training from a research
aspiration into a default. Its adoption is near-ubiquitous: PyTorch integrated
FlashAttention-2 in version 2.2 as a backend of its built-in attention function,
selected automatically,[^pytorch22] and the official implementation covers the
range of recent NVIDIA GPUs as well as AMD's ROCm.[^flashrepo] It pairs naturally
with other inference-efficiency techniques such as the [[KV cache]].
