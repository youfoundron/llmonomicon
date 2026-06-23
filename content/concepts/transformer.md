---
title: Transformer
description: The neural network architecture, built entirely on attention, that underpins virtually every modern LLM.
technicality: technical
tags: [architecture]
group: architecture
aliases: [Transformer architecture]
updated: 2026-06-17
sources:
  - id: vaswani2017
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: Vaswani et al.
    publisher: arXiv
    year: 2017
  - id: bert2018
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    url: https://arxiv.org/abs/1810.04805
    author: Devlin et al.
    publisher: arXiv
    year: 2018
  - id: gpt3-2020
    title: "Language Models are Few-Shot Learners"
    url: https://arxiv.org/abs/2005.14165
    author: Brown et al.
    publisher: arXiv
    year: 2020
  - id: fedus2021
    title: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity"
    url: https://arxiv.org/abs/2101.03961
    author: Fedus, Zoph & Shazeer
    publisher: arXiv
    year: 2021
---

# Transformer

The **Transformer** is a [[Neural network|neural network]] architecture introduced in 2017 that
dispenses with the [[Long Short-Term Memory|recurrence]] of earlier sequence
models and convolution entirely, relying instead on
[[Attention]] to model relationships between tokens.[^vaswani2017] It is the
foundation of nearly every modern large language model.

## Anatomy

The original design is an **encoder–decoder** stack:[^vaswani2017]

- The **encoder** maps an input sequence into a set of contextual
  representations.
- The **decoder** generates an output sequence one token at a time, attending
  both to its own previous outputs and to the encoder's representations; the rule
  it uses to turn each step's probabilities into a chosen token is its
  [[Decoding strategies|decoding strategy]].

Each layer combines multi-head [[Attention]] with a position-wise feed-forward
network, plus residual connections and layer normalization. Because attention
itself is order-agnostic, **[[Positional encoding|positional encodings]]** are added to inject
information about token order.[^vaswani2017] Most modern LLMs swap the original
additive encodings for [[Rotary Position Embedding]].

## Encoder-only, decoder-only, and beyond

Later work specialized the architecture:

- **Encoder-only** models such as [[BERT]] excel at understanding tasks.[^bert2018]
- **Decoder-only** models such as [[GPT-3]] excel at generation and became the
  dominant design for general-purpose LLMs.[^gpt3-2020]
- **Sparse** variants such as the [[Mixture of Experts|Mixture-of-Experts]]
  Transformer add many expert feed-forward sub-networks and activate only a few
  per token, scaling capacity without a proportional rise in compute.[^fedus2021]

## Legacy

The Transformer's parallelism and scalability are why training on enormous
[[Tokenization|tokenized]] corpora became feasible. Its debut paper,
[[Attention Is All You Need]], is among the most-cited works in modern machine
learning.[^vaswani2017]
