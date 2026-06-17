---
title: Attention
description: The mechanism that lets a model weigh the relevance of every token to every other token.
tags: [architecture, mechanism]
aliases: [Self-Attention, Scaled Dot-Product Attention]
updated: 2026-06-17
---

# Attention

**Attention** is the mechanism that lets a neural network decide, for each
element of a sequence, which other elements matter most. Rather than compressing
a whole input into a single fixed vector, attention computes a weighted sum over
all positions, where the weights are learned and content-dependent. It is the
core building block of the [[Transformer]].

## Scaled dot-product attention

Each token is projected into three vectors: a **query** (Q), a **key** (K), and
a **value** (V). The relevance of one token to another is the dot product of the
query with the key; these scores are scaled, normalized with a softmax, and used
to take a weighted average of the values:

| Symbol | Name  | Role                                            |
| ------ | ----- | ----------------------------------------------- |
| Q      | Query | What the current token is "looking for"         |
| K      | Key   | What each token "offers" as a match             |
| V      | Value | The information passed along when a match occurs |

The scaling factor (dividing by the square root of the key dimension) keeps the
dot products from growing too large and saturating the softmax.

## Multi-head attention

A single attention computation captures one kind of relationship. **Multi-head
attention** runs several attention operations in parallel — each with its own
learned projections — and concatenates the results, letting the model attend to
different patterns (syntax, coreference, position) at once.

## Why it mattered

Attention replaced the sequential bottleneck of recurrent networks with an
operation that is fully parallelizable across positions. That change, formalized
in [[Attention Is All You Need]], is what made training on internet-scale text
practical. See also [[Mixture of Experts]] for a related idea about routing
computation.
