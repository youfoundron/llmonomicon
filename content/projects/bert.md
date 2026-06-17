---
title: BERT
description: Google's 2018 bidirectional encoder that set new standards for language understanding tasks.
tags: [model, milestone]
aliases: [Bidirectional Encoder Representations from Transformers]
date: 2018-10-11
updated: 2026-06-17
---

# BERT

**BERT** (Bidirectional Encoder Representations from Transformers) is an
encoder-only [[Transformer]] model introduced by Google in 2018. Where
decoder-only models like [[GPT-3]] read left to right, BERT is **bidirectional**:
it conditions on both left and right context at once, making it especially strong
at understanding tasks.

## Training objectives

BERT is pretrained with two self-supervised objectives:

- **Masked language modeling (MLM)** — randomly hide tokens and train the model
  to predict them from surrounding context.
- **Next-sentence prediction** — decide whether one sentence plausibly follows
  another (a component later work found to be of limited value).

It uses **WordPiece** [[Tokenization]] and is typically **fine-tuned** on a
downstream task with a small task-specific head.

## Influence

BERT topped a wide range of NLP benchmarks on release and made the
**pretrain-then-fine-tune** recipe standard practice. It remains a workhorse for
classification, retrieval, and other understanding tasks, and is a staple of the
[[Hugging Face Transformers]] library.
