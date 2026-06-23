---
title: Hardware for LLMs
description: What determines whether you can train or run an LLM — GPUs vs CPUs, memory capacity (VRAM), and the memory bandwidth that makes single-stream inference "memory-bound."
tags: [inference, hardware, efficiency]
group: inference
technicality: technical
aliases: [GPUs for LLMs, GPU, VRAM, Memory bandwidth, Accelerators, Compute and memory]
updated: 2026-06-23
sources:
  - id: kipply
    title: "Transformer Inference Arithmetic"
    url: https://kipp.ly/transformer-inference-arithmetic/
    author: Kipply Chen
    publisher: kipp.ly
    year: 2022
  - id: pope2022
    title: "Efficiently Scaling Transformer Inference"
    url: https://arxiv.org/abs/2211.05102
    author: Pope et al.
    publisher: MLSys 2023 / arXiv (Google)
    year: 2022
  - id: flashattn
    title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
    url: https://arxiv.org/abs/2205.14135
    author: Dao et al.
    publisher: NeurIPS / arXiv
    year: 2022
---

# Hardware for LLMs

Whether you can train or even run a large language model comes down to hardware — and to
two resources in particular: **compute** (how many calculations per second) and **memory**
(how much fits, and how fast it moves). The fact that surprises newcomers is that for
everyday use — generating text one token at a time — it is usually *memory*, not raw
compute, that sets the limit.[^kipply]

## Why GPUs, not CPUs

A neural network is, at bottom, an enormous amount of matrix multiplication: the same
simple arithmetic repeated across billions of numbers in parallel. A **CPU** has a handful
of fast, flexible cores; a **GPU** (graphics processing unit) has thousands of simpler
cores built to do exactly that kind of parallel work. That fit — together with
[[NVIDIA]]'s [[CUDA]] software ecosystem — is why essentially all model training and
serving runs on GPUs and related accelerators. Google's TPUs and Apple's unified-memory
chips are the main alternatives, but the GPU is the default.[^pope2022]

## Memory capacity: the wall you hit first

Before anything can run, the model's **weights have to fit in memory.** A rough rule is
*parameters × bytes per parameter*: a 70-billion-parameter model needs about **140 GB** at
16-bit precision (2 bytes each), or roughly **35 GB** if compressed to 4-bit.[^kipply] On
top of that sits the [[KV cache]], which holds the model's working state and grows with the
length of the conversation. This is the single biggest reason techniques like
[[Quantization]] exist, and why a high-end consumer GPU with around 24 GB of memory can run
only smaller or heavily compressed models — the central constraint behind running
[[Local LLMs]].

## Memory bandwidth: why inference is "memory-bound"

The subtler limit is **bandwidth** — how fast weights can be moved from memory into the
compute units. Generating each new token requires streaming *all* of the model's weights
through the chip while doing relatively little arithmetic per byte read. As one widely
cited analysis puts it, "Flops are increased by both batch size and number of parameters,
while memory is only increased by number of parameters."[^kipply] For single-stream
generation that leaves the processor waiting on memory — the workload is **memory-bound**,
not compute-bound. (On an A100 GPU the crossover sits around 208 arithmetic operations per
byte loaded; below that ratio, memory is the bottleneck.)[^kipply]

This one fact explains a surprising amount of LLM engineering. [[Continuous batching]]
serves many requests together so a single expensive read of the weights is shared across
all of them; [[FlashAttention]] is designed to make fewer trips to memory; and the
[[KV cache]] (packed efficiently by methods such as [[PagedAttention]]) spares the model
from recomputing past tokens.[^flashattn]

## System RAM, VRAM, and offloading

A GPU's own memory (VRAM) is fast but limited; a computer's main **system RAM** is far
larger but much slower for the GPU to reach. When a model is too big for VRAM, software can
**offload** some layers to system RAM — the model will run, but slowly, bottlenecked by the
slower memory. Apple's [[Apple Silicon|unified memory]] strikes a different bargain, letting
the processor and graphics share one large, reasonably fast memory pool — part of why Macs
became popular for local inference (see [[MLX]]).

## Scaling across many chips

The largest models don't fit on one GPU at all, so they are split across many. At that
scale a new limit appears: the **interconnect** — the bandwidth of the links (such as
NVLink or InfiniBand) that shuttle data between GPUs — can matter as much as any single
chip's speed.[^pope2022]
