---
title: Tokenization
description: How raw text is split into the discrete units a language model actually reads.
tags: [data, preprocessing]
group: tokenization
aliases: [Tokenizer, Subword tokenization]
updated: 2026-06-17
sources:
  - id: bpe2016
    title: "Neural Machine Translation of Rare Words with Subword Units"
    url: https://arxiv.org/abs/1508.07909
    author: Sennrich, Haddow & Birch
    publisher: arXiv
    year: 2016
  - id: sentencepiece2018
    title: "SentencePiece: A simple and language independent subword tokenizer and detokenizer for Neural Text Processing"
    url: https://arxiv.org/abs/1808.06226
    author: Kudo & Richardson
    publisher: arXiv
    year: 2018
  - id: gnmt2016
    title: "Google's Neural Machine Translation System: Bridging the Gap between Human and Machine Translation"
    url: https://arxiv.org/abs/1609.08144
    author: Wu et al.
    publisher: arXiv
    year: 2016
  - id: bert2018
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    url: https://arxiv.org/abs/1810.04805
    author: Devlin et al.
    publisher: arXiv
    year: 2018
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
  symbols, building a vocabulary of common fragments.[^bpe2016]
- **WordPiece**, used by [[BERT]],[^bert2018] chooses merges that maximize the
  likelihood of the training corpus; it was popularized for neural translation by
  Google's GNMT system.[^gnmt2016]
- **SentencePiece** operates directly on raw text (including the space
  character), making it language-agnostic.[^sentencepiece2018]

Subword schemes keep the vocabulary bounded while still representing any string,
since unknown words decompose into known fragments.[^bpe2016]

## Why it matters

Token count drives both cost and the [[Context window]]: longer
inputs mean more tokens to attend over. Tokenization quirks also explain many
model failures, such as difficulty with arithmetic or spelling, where the token
boundaries cut across the units a human would reason about.
