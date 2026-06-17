---
title: Transformer
description: The neural network architecture, built entirely on attention, that underpins virtually every modern LLM.
tags: [architecture]
aliases: [Transformer architecture]
updated: 2026-06-17
---

# Transformer

The **Transformer** is a neural network architecture introduced in 2017 that
dispenses with recurrence and convolution entirely, relying instead on
[[Attention]] to model relationships between tokens. It is the foundation of
nearly every modern large language model.

## Anatomy

The original design is an **encoder–decoder** stack:

- The **encoder** maps an input sequence into a set of contextual
  representations.
- The **decoder** generates an output sequence one token at a time, attending
  both to its own previous outputs and to the encoder's representations.

Each layer combines multi-head [[Attention]] with a position-wise feed-forward
network, plus residual connections and layer normalization. Because attention
itself is order-agnostic, **positional encodings** are added to inject
information about token order.

## Encoder-only, decoder-only, and beyond

Later work specialized the architecture:

- **Encoder-only** models such as [[BERT]] excel at understanding tasks.
- **Decoder-only** models such as [[GPT-3]] excel at generation and became the
  dominant design for general-purpose LLMs.

## Legacy

The Transformer's parallelism and scalability are why training on enormous
[[Tokenization|tokenized]] corpora became feasible. Its debut paper,
[[Attention Is All You Need]], is among the most-cited works in modern machine
learning.
