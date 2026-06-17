---
title: Tokenization
description: How raw text is split into the discrete units a language model actually reads.
tags: [data, preprocessing]
aliases: [Tokenizer, Subword tokenization]
updated: 2026-06-17
---

# Tokenization

**Tokenization** is the process of converting raw text into a sequence of
discrete units — *tokens* — that a model can map to vectors. The choice of
tokenizer shapes vocabulary size, sequence length, and how gracefully a model
handles rare words, code, and other languages.

## Subword units

Modern LLMs almost universally use **subword** tokenization, a middle ground
between characters and whole words:

- **Byte-Pair Encoding (BPE)** merges the most frequent adjacent pairs of
  symbols, building a vocabulary of common fragments.
- **WordPiece**, used by [[BERT]], chooses merges that maximize the likelihood
  of the training corpus.
- **SentencePiece** operates directly on raw text (including the space
  character), making it language-agnostic.

Subword schemes keep the vocabulary bounded while still representing any string,
since unknown words decompose into known fragments.

## Why it matters

Token count drives both cost and the [[Transformer|context window]]: longer
inputs mean more tokens to attend over. Tokenization quirks also explain many
model failures, such as difficulty with arithmetic or spelling, where the
token boundaries cut across the units a human would reason about.
