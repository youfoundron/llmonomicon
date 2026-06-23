---
title: Attention
description: The mechanism that lets a model weigh the relevance of every token to every other token.
technicality: technical
tags: [architecture, mechanism]
group: architecture
aliases: [Self-Attention, Scaled Dot-Product Attention]
updated: 2026-06-17
sources:
  - id: vaswani2017
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: Vaswani et al.
    publisher: arXiv
    year: 2017
  - id: bahdanau2014
    title: "Neural Machine Translation by Jointly Learning to Align and Translate"
    url: https://arxiv.org/abs/1409.0473
    author: Bahdanau, Cho & Bengio
    publisher: arXiv
    year: 2014
  - id: illustrated-transformer
    title: "The Illustrated Transformer"
    url: https://jalammar.github.io/illustrated-transformer/
    author: Jay Alammar
    year: 2018
---

# Attention

**Attention** is the mechanism that lets a [[Neural network|neural network]] decide, for each
element of a sequence, which other elements matter most. Rather than compressing
a whole input into a single fixed vector, attention computes a weighted sum over
all positions, where the weights are learned and content-dependent. The idea was
introduced for neural machine translation as a way to let a model "align" to
relevant source words while decoding,[^bahdanau2014] and it later became the core
building block of the [[Transformer]].[^vaswani2017]

## Scaled dot-product attention

Each token is projected into three vectors: a **query** (Q), a **key** (K), and
a **value** (V). The relevance of one token to another is the dot product of the
query with the key; these scores are scaled, normalized with a softmax, and used
to take a weighted average of the values.[^vaswani2017]

| Symbol | Name  | Role                                             |
| ------ | ----- | ------------------------------------------------ |
| Q      | Query | What the current token is "looking for"          |
| K      | Key   | What each token "offers" as a match              |
| V      | Value | The information passed along when a match occurs |

The scaling factor (dividing by the square root of the key dimension) keeps the
dot products from growing too large and saturating the softmax.[^vaswani2017]

Because these scores form an N×N table whose size grows with the square of the
sequence length,[^vaswani2017] computing attention efficiently becomes a central
concern at scale — one addressed by efficient exact implementations such as
[[FlashAttention]].

During autoregressive generation, the keys and values computed for earlier tokens
are reused at every step rather than recomputed — the optimization known as the
[[KV cache]].

## Multi-head attention

A single attention computation captures one kind of relationship. **Multi-head
attention** runs several attention operations in parallel — each with its own
learned projections — and concatenates the results, letting the model attend to
different patterns (syntax, coreference, position) at once.[^vaswani2017] For an
accessible visual walkthrough of these mechanics, see Alammar's *Illustrated
Transformer*.[^illustrated-transformer]

## Why it mattered

Attention replaced the sequential bottleneck of [[Long Short-Term Memory|recurrent networks]] with an
operation that is fully parallelizable across positions. That change, formalized
in [[Attention Is All You Need]], is what made training on internet-scale text
practical. See also [[Mixture of Experts]] for a related idea about routing
computation, and [[Fast weight programmers]] for an early-1990s mechanism that a
2021 result showed equivalent to a linearized form of attention.
