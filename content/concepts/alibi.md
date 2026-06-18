---
title: ALiBi (Attention with Linear Biases)
description: A positional method that adds no embeddings — it penalizes attention scores by query–key distance — enabling length extrapolation ("train short, test long"); the relative-position alternative to RoPE.
tags: [architecture, position]
group: architecture
aliases: [ALiBi, Attention with Linear Biases]
updated: 2026-06-18
sources:
  - id: press2021
    title: "Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation"
    url: https://arxiv.org/abs/2108.12409
    author: Press, Smith & Lewis
    publisher: arXiv
    year: 2021
  - id: bloom2022
    title: "BLOOM: A 176B-Parameter Open-Access Multilingual Language Model"
    url: https://arxiv.org/abs/2211.05100
    author: BigScience Workshop
    publisher: arXiv
    year: 2022
---

# ALiBi (Attention with Linear Biases)

**ALiBi** (Attention with Linear Biases) is a positional method that does away
with positional embeddings entirely. Rather than tell the model where each token
sits, it nudges the [[Attention]] scores themselves: when a query attends to a
key, ALiBi subtracts a penalty proportional to how far apart the two tokens
are.[^press2021] Its signature benefit is **length extrapolation** — a model
trained on short sequences can run on much longer ones.

## How it works

Introduced by Press, Smith, and Lewis in 2021, ALiBi "biases query-key attention
scores with a penalty that is proportional to their distance."[^press2021] The
farther apart two tokens are, the more their attention score is reduced, so a
token naturally weights its neighbors over distant tokens. Each attention head
gets a different, fixed **slope** for this penalty, letting some heads focus
narrowly and others range more widely. There are no learned or computed position
vectors at all — position enters purely through this distance penalty.

## Train short, test long

Because the bias is just a function of distance, it keeps behaving sensibly past
the length the model was trained on — the property the paper's title calls "train
short, test long." Its headline result: "a 1.3 billion parameter model on input
sequences of length 1024 ... extrapolates to input sequences of length 2048,
achieving the same perplexity as a sinusoidal position embedding model trained on
inputs of length 2048 but training 11% faster and using 11% less
memory."[^press2021] In other words, ALiBi lets you train cheaply on short inputs
and still handle longer ones at inference — a direct lever on the usable
[[Context window]].

## Versus RoPE

ALiBi and [[Rotary Position Embedding (RoPE)]] are the two dominant *relative*
position methods, but they act differently: RoPE rotates the query and key
vectors so their dot product depends on relative position, while ALiBi simply
subtracts a distance penalty from the score. ALiBi was designed from the start
around extrapolation; RoPE became the more common default but typically needs
[[Context-length extension (RoPE scaling)|scaling tricks]] to reach beyond its
training length. Both sit under the broader [[Positional encoding]] family, and
ALiBi was adopted by open models — notably [[BLOOM]], whose 176B-parameter model
uses it.[^bloom2022]
