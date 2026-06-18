---
title: Sliding-window & sparse attention
description: Attention variants — local windows and sparse patterns with a few global tokens — that drop the quadratic all-pairs cost to scale to long sequences, trading some long-range reach for near-linear cost.
tags: [attention, efficiency]
group: efficiency
aliases: [Sliding-window attention, Sliding window attention, Local attention, Sparse attention, Block-sparse attention]
updated: 2026-06-18
sources:
  - id: child2019
    title: "Generating Long Sequences with Sparse Transformers"
    url: https://arxiv.org/abs/1904.10509
    author: Child, Gray, Radford & Sutskever
    publisher: arXiv
    year: 2019
  - id: beltagy2020
    title: "Longformer: The Long-Document Transformer"
    url: https://arxiv.org/abs/2004.05150
    author: Beltagy, Peters & Cohan
    publisher: arXiv
    year: 2020
---

# Sliding-window & sparse attention

**Sliding-window and sparse attention** are families of attention variants that
avoid the full, all-pairs computation of standard self-[[Attention]] in order to
handle long sequences cheaply. Where ordinary attention compares every token with
every other — an O(n²) cost that becomes prohibitive as sequences grow — these
methods have each token attend to only a *subset* of positions, trading some
completeness for a much lower, often near-linear cost. They are one of the
architectural routes to a longer [[Context window]].[^child2019]

## Sliding-window (local) attention

The simplest approach restricts each token to a fixed **window** of nearby tokens.
Because the window size is constant, cost grows roughly *linearly* with sequence
length rather than quadratically, and information still propagates over long
distances indirectly as overlapping windows pass it along layer by layer.
([[Mistral 7B / Mixtral|Mistral 7B]] is a well-known model that uses
sliding-window attention; StreamingLLM's "attention sinks" — always keeping a few
initial tokens in view — stabilize this kind of windowed attention for very long
streams.)

## Sparse and block attention

A richer variant keeps the local window but adds a handful of **global tokens**
that attend to, and are attended by, the whole sequence, preserving some long-range
reach. The **Longformer** "combines a local windowed attention with a task
motivated global attention" and "scales linearly with sequence length."[^beltagy2020]
Earlier, OpenAI's **Sparse Transformers** introduced "sparse factorizations of the
attention matrix which reduce [the cost] to O(n√n)."[^child2019] (BigBird, which
mixes local, global, and random connections, is the other canonical example.)

## The trade-off

The gain in speed comes at a cost: by dropping most token pairs, these methods can
weaken genuinely long-range dependencies — two distant tokens may never attend to
each other directly.[^beltagy2020] Global tokens and attention sinks are partial
remedies, but the fundamental tension is **sub-quadratic cost versus complete
long-range interaction**.

## Two things it is not

- **Not [[FlashAttention]].** This is a common confusion. FlashAttention computes
  *exact* attention — it never drops a single pair — only more memory-efficiently;
  sliding-window and sparse attention compute a deliberately *approximate*, cheaper
  attention. One is a faster implementation of the same computation; the other is a
  different, cheaper computation.
- **A lever on the [[KV cache]].** Windowing also caps how much of the [[KV cache]]
  must be kept — only the keys and values inside the window need be retained — which
  is why local attention helps at inference time, not just during training.
