---
title: Transformer
description: The neural network architecture, built entirely on attention, that underpins virtually every modern LLM.
tags: [architecture]
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
---

# Transformer

The **Transformer** is a neural network architecture introduced in 2017 that
dispenses with recurrence and convolution entirely, relying instead on
[[Attention]] to model relationships between tokens.[^vaswani2017] It is the
foundation of nearly every modern large language model.

## Anatomy

The original design is an **encoder–decoder** stack:[^vaswani2017]

- The **encoder** maps an input sequence into a set of contextual
  representations.
- The **decoder** generates an output sequence one token at a time, attending
  both to its own previous outputs and to the encoder's representations.

Each layer combines multi-head [[Attention]] with a position-wise feed-forward
network, plus residual connections and layer normalization. Because attention
itself is order-agnostic, **positional encodings** are added to inject
information about token order.[^vaswani2017]

## Encoder-only, decoder-only, and beyond

Later work specialized the architecture:

- **Encoder-only** models such as [[BERT]] excel at understanding tasks.[^bert2018]
- **Decoder-only** models such as [[GPT-3]] excel at generation and became the
  dominant design for general-purpose LLMs.[^gpt3-2020]

## Legacy

The Transformer's parallelism and scalability are why training on enormous
[[Tokenization|tokenized]] corpora became feasible. Its debut paper,
[[Attention Is All You Need]], is among the most-cited works in modern machine
learning.[^vaswani2017]
