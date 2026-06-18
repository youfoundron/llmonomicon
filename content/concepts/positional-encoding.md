---
title: Positional encoding
description: How Transformers inject word-order information — since self-attention is order-agnostic, position must be encoded explicitly — from sinusoidal encodings to relative schemes like RoPE and ALiBi.
technicality: highly-technical
tags: [architecture, position]
group: architecture
aliases: [Position embedding, Positional embeddings, Position encoding]
updated: 2026-06-17
sources:
  - id: vaswani2017
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: Vaswani et al.
    publisher: arXiv
    year: 2017
  - id: shaw2018
    title: "Self-Attention with Relative Position Representations"
    url: https://arxiv.org/abs/1803.02155
    author: Shaw, Uszkoreit & Vaswani
    publisher: arXiv
    year: 2018
---

# Positional encoding

A Transformer's self-[[Attention]] has a curious blind spot: on its own, it has
no sense of word order. Attention compares every token with every other token in
parallel, and that comparison is the same no matter how the tokens are
arranged — it is *permutation-equivariant*. Since order plainly matters for
language, position has to be added back in explicitly. **Positional encoding** is
the family of techniques for doing exactly that.[^vaswani2017]

## Why it's needed

Unlike older recurrent or convolutional networks, a [[Transformer]] processes all
tokens at once and has no built-in notion of sequence — without extra information,
"the cat sat" and "sat the cat" would look the same to it. The original
Transformer paper handled this by adding to each token's embedding a signal
carrying "information about the relative or absolute position of the tokens in the
sequence."[^vaswani2017]

## Absolute schemes

The earliest approaches encode each position by its index:

- **Sinusoidal encoding**, from the original Transformer, adds a pattern of sine
  and cosine waves of different frequencies to the input embeddings — a fixed
  function of position that needs no training.[^vaswani2017]
- **Learned positional embeddings** instead treat each position as a trainable
  vector; the Transformer authors reported the two performed nearly
  identically.[^vaswani2017]

## Relative schemes

Absolute schemes tie meaning to a position's *index*; relative schemes encode the
*distance between* tokens instead. Shaw, Uszkoreit, and Vaswani showed in 2018 how
to make self-attention aware of "relative positions, or distances between sequence
elements," which generalizes better across sequence lengths.[^shaw2018] The
dominant modern methods are relative in spirit — **[[Rotary Position Embedding
(RoPE)|RoPE]]**, which encodes position by rotating query and key vectors, and
**[[ALiBi]]**, which adds a distance-based penalty to attention scores — and their
specifics live in their own entries.

## Position and context length

The choice of scheme bears directly on how long a [[Context window]] a model can
actually use. Fixed absolute encodings tend to break down beyond the length they
were trained on, whereas relative and rotary methods extrapolate to longer
sequences more gracefully[^shaw2018] — which is why long-context models converged
on them.
