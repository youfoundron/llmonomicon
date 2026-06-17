---
title: Attention Is All You Need
description: The 2017 paper that introduced the Transformer architecture and reset the course of NLP.
tags: [paper, milestone]
aliases: [Transformer paper, Vaswani et al. 2017]
date: 2017-06-12
updated: 2026-06-17
---

# Attention Is All You Need

*"Attention Is All You Need"* is a 2017 paper by Ashish Vaswani and seven
co-authors at Google that introduced the [[Transformer]] architecture. First
posted to arXiv on 12 June 2017 and presented at NeurIPS that December, it is one
of the most influential papers in the history of machine learning.

## The claim

Prior sequence models relied on recurrence (RNNs, LSTMs) or convolution, both of
which process tokens in ways that limit parallelism. The paper's provocative
title makes its thesis plain: a model built **entirely** on [[Attention]] —
specifically multi-head self-attention — can match or beat those models on
machine translation while training far faster.

## Why it was a turning point

- **Parallelism.** Self-attention processes all positions at once, making
  efficient use of modern accelerators.
- **Scalability.** The architecture scaled cleanly with data and parameters,
  setting the stage for [[GPT-3]], [[BERT]], and the models that followed.
- **Generality.** Though introduced for translation, the Transformer proved to
  be a general-purpose sequence model.

The paper's ideas underpin essentially every modern LLM, and its citation count
runs well into six figures.
