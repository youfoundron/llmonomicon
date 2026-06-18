---
title: Attention Is All You Need
description: The 2017 Google paper that introduced the Transformer — the architecture behind GPT, BERT, and essentially every modern large language model.
technicality: technical
tags: [architecture, milestone]
aliases: [Transformer paper, Vaswani et al. 2017]
updated: 2026-06-18
sources:
  - id: vaswani2017
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: Vaswani et al.
    publisher: arXiv
    year: 2017
  - id: neurips2017
    title: "Attention is All you Need (Advances in Neural Information Processing Systems 30)"
    url: https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html
    author: Vaswani et al.
    publisher: NeurIPS
    year: 2017
  - id: google-blog
    title: "Transformer: A Novel Neural Network Architecture for Language Understanding"
    url: https://research.google/blog/transformer-a-novel-neural-network-architecture-for-language-understanding/
    author: Jakob Uszkoreit
    publisher: Google Research
    year: 2017
  - id: semanticscholar
    title: "Attention is All you Need — Semantic Scholar"
    url: https://www.semanticscholar.org/paper/204e3073870fae3d05bcbc2f6a8e263d9b72e776
    publisher: Semantic Scholar
    year: 2017
  - id: wiki-aiayn
    title: "Attention Is All You Need (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Attention_Is_All_You_Need
    publisher: Wikipedia
    year: 2026
---

# Attention Is All You Need

**Attention Is All You Need** is the 2017 research paper that introduced the
[[Transformer]] — the neural-network architecture that underlies the [[GPT-2|GPT]]
series, [[BERT]], and essentially every modern large language model. Written by eight
researchers at Google, it proposed discarding the recurrence and convolutions that
dominated sequence modeling at the time and relying on [[Attention|attention]] alone.
It is among the most influential papers in the history of the field.[^vaswani2017][^wiki-aiayn]

## The paper

The paper was posted to arXiv as **`1706.03762` on 12 June 2017** and presented at
**NeurIPS 2017** (then "NIPS").[^vaswani2017][^neurips2017] Its eight authors — Ashish
Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez,
Łukasz Kaiser, and Illia Polosukhin — are listed as **equal contributors, with the
ordering randomized**.[^wiki-aiayn]

## What it introduced

Its central proposal was, in the paper's words, "a new simple network architecture,
the Transformer, based solely on attention mechanisms, **dispensing with recurrence
and convolutions entirely**."[^vaswani2017] Where a recurrent network reads a sentence
position by position, the Transformer uses [[Self-Attention|self-attention]] to relate
every position to every other in parallel; the specifics — scaled dot-product and
multi-head attention, sinusoidal positional encodings, the encoder–decoder layout — are
covered in the [[Transformer]] entry. Google's accompanying write-up put the idea
plainly: the model "directly models relationships between all words in a sentence,
regardless of their respective position."[^google-blog]

The payoff was both quality and speed. On the WMT 2014 translation benchmarks the model
reached a then-state-of-the-art **28.4 BLEU** on English-to-German and **41.8 BLEU** on
English-to-French, while being "more parallelizable and requiring significantly less
time to train" than the recurrent and convolutional models it replaced[^vaswani2017] —
Google reported training "up to an order of magnitude" faster.[^google-blog] That
parallelism is much of why the architecture went on to scale so well.

## Why it mattered

The Transformer "has become the main architecture of a wide variety of artificial
intelligence systems, including large language models," and the paper is the common
ancestor of [[BERT]], [[GPT-2]] and [[GPT-3]], and the models that followed.[^wiki-aiayn]
Its reach shows up in the citation record: it is one of the most-cited papers of the
21st century, though exact counts vary by index — roughly 180,000 on Semantic Scholar
and more than 250,000 by Wikipedia's tally as of 2026.[^semanticscholar][^wiki-aiayn]
