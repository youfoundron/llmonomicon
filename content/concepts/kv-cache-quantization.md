---
title: KV cache quantization
description: Compressing the per-token key/value tensors a Transformer caches at inference time — storing them at a few bits instead of 16 — to cut the memory that dominates long-context, high-throughput serving.
technicality: highly-technical
tags: [efficiency, inference, quantization]
group: efficiency
aliases: [KV quantization, KV cache compression]
updated: 2026-06-18
sources:
  - id: kivi
    title: "KIVI: A Tuning-Free Asymmetric 2bit Quantization for KV Cache"
    url: https://arxiv.org/abs/2402.02750
    author: Liu et al.
    publisher: "arXiv (ICML 2024)"
    year: 2024
  - id: kvquant
    title: "KVQuant: Towards 10 Million Context Length LLM Inference with KV Cache Quantization"
    url: https://arxiv.org/abs/2401.18079
    author: Hooper et al.
    publisher: "arXiv (NeurIPS 2024)"
    year: 2024
  - id: qjl
    title: "QJL: 1-Bit Quantized JL Transform for KV Cache Quantization with Zero Overhead"
    url: https://arxiv.org/abs/2406.03482
    author: Zandieh, Daliri & Han
    publisher: arXiv
    year: 2024
  - id: polarquant
    title: "PolarQuant: Quantizing KV Caches with Polar Transformation"
    url: https://arxiv.org/abs/2502.02617
    author: Han, Kacham, Karbasi, Mirrokni & Zandieh
    publisher: arXiv
    year: 2025
  - id: turboquant
    title: "TurboQuant: Online Vector Quantization with Near-optimal Distortion Rate"
    url: https://arxiv.org/abs/2504.19874
    author: Zandieh, Daliri, Hadian & Mirrokni
    publisher: arXiv
    year: 2025
  - id: hf-cache
    title: "Cache strategies (Hugging Face Transformers docs)"
    url: https://huggingface.co/docs/transformers/en/kv_cache
    author: Hugging Face
    publisher: Hugging Face
    year: 2025
---

# KV cache quantization

**KV cache quantization** stores the keys and values in a [[KV cache]] at low numerical
precision — often **2 to 4 bits**, and in some schemes as few as one — instead of the usual
16-bit floats, to shrink what is typically the largest consumer of memory during long-context
inference.[^hf-cache] It is a distinct lever from quantizing a model's weights
([[Quantization]]): the same precision-cutting idea, but applied to activations the model
produces *at runtime*.

## Why the cache needs its own quantization

The [[KV cache]] stores the [[Attention|attention]] keys and values of every past token so
they need not be recomputed; its size grows with sequence length, layer count, and the number
of requests served at once, which makes it — not the weights — the memory bottleneck at long
context and high batch size.[^kvquant] (That mechanism is the subject of the [[KV cache]]
entry; this one is about compressing it.)

Quantizing the cache is not the same problem as quantizing weights. Weights are fixed and can
be quantized once, offline; the cache is filled with fresh key/value vectors on every forward
pass, so its quantization must happen **in flight, inside the attention kernel**, cheaply
enough that the extra compute doesn't erase the memory saving. Keys and values also carry
awkward, outlier-heavy distributions that differ from one another — a finding KIVI turned into
the field's rule of thumb: "the key cache should be quantized per-channel" while "the value
cache should be quantized per-token."[^kivi] Most schemes then layer extra machinery — outlier
isolation, dense-and-sparse splits, learned rotations — on top of that asymmetry.

## A tour of methods

This is an active research area; a few representative methods (examples, not an exhaustive
ranking):

- **KIVI** — tuning-free **2-bit** asymmetric quantization, per-channel keys and per-token
  values, with no calibration step.[^kivi]
- **KVQuant** — sub-4-bit (around **3-bit**) using per-channel key quantization plus a
  dense-and-sparse split for outliers; it reports under 0.1 perplexity degradation and context
  lengths up to roughly 10 million tokens on an 8-GPU server.[^kvquant]
- **QJL** — a **1-bit** quantizer built on a quantized Johnson–Lindenstrauss transform that
  stores no quantization constants, which it bills as "zero overhead."[^qjl]
- **PolarQuant** — maps key/value vectors into polar coordinates and quantizes the resulting
  angles, reporting more than 4× compression.[^polarquant]
- **TurboQuant** — an online vector-quantization scheme with near-optimal distortion that,
  applied to KV caches, reports quality-neutral results at about **3.5 bits per
  channel**.[^turboquant]

> **A naming caution.** "PolarQuant" names more than one distinct paper from different author
> groups; the method above is the KV-cache work at arXiv:2502.02617.[^polarquant] Cite the
> specific paper rather than a single canonical "PolarQuant." Several of these methods
> (PolarQuant, TurboQuant) are recent preprints — current research rather than settled practice.

## Where it fits

KV-cache quantization sits in the efficiency toolkit beside weight [[Quantization]], and it is
increasingly available off the shelf: Hugging Face Transformers ships a `QuantizedCache` that
stores KV values at int2 or int4 through its `hqq` and `quanto` backends,[^hf-cache] and
quantized KV-cache options have likewise become common in local-inference engines such as
[[llama.cpp]]. It is one of several complementary attacks on KV-cache cost — alongside the
paging and shared-head attention covered in [[KV cache]] — and the one that trades a little
numerical precision for a large cut in the memory that long-context [[Transformer]] inference
demands.
