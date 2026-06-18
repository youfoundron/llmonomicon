---
title: Rotary Position Embedding (RoPE)
description: The dominant way modern LLMs encode token position—by rotating query and key vectors so that attention naturally depends on the distance between tokens.
tags: [positional-encoding, attention, architecture]
group: architecture
aliases: [RoPE, Rotary embeddings, Rotary positional embedding]
updated: 2026-06-17
sources:
  - id: su2021
    title: "RoFormer: Enhanced Transformer with Rotary Position Embedding"
    url: https://arxiv.org/abs/2104.09864
    author: Su et al.
    publisher: arXiv
    year: 2021
  - id: touvron2023
    title: "LLaMA: Open and Efficient Foundation Language Models"
    url: https://arxiv.org/abs/2302.13971
    author: Touvron et al.
    publisher: arXiv
    year: 2023
---

# Rotary Position Embedding (RoPE)

A [[Transformer]] looks at all tokens at once and has no built-in sense of their
order, so it needs some way to tell the model *where* each token sits in the
sequence. **Rotary Position Embedding (RoPE)** is the method nearly every modern
open LLM uses to do this, with a clever twist on the older approaches.

## The idea

Classic [[Positional encoding]] *adds* a position vector to each token's embedding.
RoPE instead **rotates** each token's query and key vectors by an angle
proportional to the token's position.[^su2021] The payoff comes from a property of
rotation: when you rotate two vectors and then take their dot product, the result
depends only on the *difference* between their rotation angles. Because [[Attention]]
scores are exactly such dot products, the score between two tokens ends up depending
on **how far apart they are** rather than on their absolute positions — relative
position falls out of ordinary attention with no extra machinery. The RoFormer paper
describes it as encoding "the absolute position with a rotation matrix" while
incorporating "explicit relative position dependency in self-attention
formulation."[^su2021]

## Why it took over

RoFormer highlights several advantages, among them "flexibility of sequence length"
and a "decaying inter-token dependency with increasing relative distances" — a
useful built-in bias that tokens far apart should influence each other
less.[^su2021] Two practical properties sealed its dominance:

- **No learned parameters.** The rotation is a fixed function of position, not a
  trained lookup table whose size would also cap the usable [[Context window]].
- **It composes with [[FlashAttention]].** Because the rotation is applied to the
  query and key vectors *before* their dot product, it drops cleanly into the fused,
  memory-efficient attention kernels that never write out the full score matrix.

[[LLaMA]] brought RoPE into the mainstream — "we remove the absolute positional
embeddings, and instead, add rotary positional embeddings (RoPE) … at each layer of
the network"[^touvron2023] — and Mistral, Qwen, and most other modern open models
followed.

## Stretching the context

RoPE also turned out to be the lever for running a model on inputs longer than it
was trained on. Its rotation frequencies (set by a base value, commonly around
10,000) can be rescaled to extend a model's usable context — the basis for methods
such as position interpolation, NTK-aware scaling, and YaRN. Those belong to the
separate topic of context-length extension.
