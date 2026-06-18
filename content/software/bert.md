---
title: BERT
description: Google's 2018 bidirectional encoder that set new standards for language understanding tasks.
technicality: technical
tags: [model, milestone]
aliases: [Bidirectional Encoder Representations from Transformers]
date: 2018-10-11
updated: 2026-06-17
sources:
  - id: devlin2018
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    url: https://arxiv.org/abs/1810.04805
    author: Devlin, Chang, Lee & Toutanova
    publisher: arXiv
    year: 2018
  - id: gnmt2016
    title: "Google's Neural Machine Translation System"
    url: https://arxiv.org/abs/1609.08144
    author: Wu et al.
    publisher: arXiv
    year: 2016
---

# BERT

**BERT** (Bidirectional Encoder Representations from Transformers) is an
encoder-only [[Transformer]] model introduced by Google in 2018.[^devlin2018]
Where decoder-only models like [[GPT-3]] read left to right, BERT is
**bidirectional**: it conditions on both left and right context at once, making
it especially strong at understanding tasks.[^devlin2018]

## Training objectives

BERT is pretrained with two self-supervised objectives:[^devlin2018]

- **Masked language modeling (MLM)** — randomly hide tokens and train the model
  to predict them from surrounding context.
- **Next-sentence prediction** — decide whether one sentence plausibly follows
  another (a component later work found to be of limited value).

It uses **WordPiece** [[Tokenization]] — the subword scheme popularized by
Google's neural translation system[^gnmt2016] — and is typically **fine-tuned**
on a downstream task with a small task-specific head.[^devlin2018]

## Influence

BERT topped a wide range of NLP benchmarks on release — notably
[[GLUE & SuperGLUE|GLUE]] — and made the **pretrain-then-fine-tune** recipe
standard practice.[^devlin2018] It remains a
workhorse for classification, retrieval, and other understanding tasks — its
contextual [[Embeddings]] still power many semantic-search systems — and is a
staple of the [[Hugging Face Transformers]] library.
