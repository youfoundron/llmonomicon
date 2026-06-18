---
title: Noam Shazeer
description: A co-author of the Transformer paper and originator of Mixture of Experts and multi-query attention; later founded Character.AI and returned to Google to co-lead Gemini.
tags: [researcher]
aliases: [Shazeer]
updated: 2026-06-18
sources:
  - id: vaswani2017
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: "Vaswani, Shazeer, Parmar et al."
    publisher: "arXiv (NeurIPS 2017)"
    year: 2017
  - id: moe
    title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"
    url: https://arxiv.org/abs/1701.06538
    author: "Shazeer et al."
    publisher: arXiv
    year: 2017
  - id: mqa
    title: "Fast Transformer Decoding: One Write-Head is All You Need"
    url: https://arxiv.org/abs/1911.02150
    author: "Noam Shazeer"
    publisher: arXiv
    year: 2019
  - id: wiki
    title: "Noam Shazeer (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Noam_Shazeer
    publisher: Wikipedia
    year: 2026
  - id: cnbc
    title: "Google Gemini co-lead Noam Shazeer leaves for OpenAI"
    url: https://www.cnbc.com/2026/06/18/google-gemini-co-lead-noam-shazeer-leaves-for-openai.html
    author: CNBC
    publisher: CNBC
    year: 2026
---

# Noam Shazeer

**Noam Shazeer** is one of the most consequential engineers of the [[Transformer]]
era — a co-author, with [[Ashish Vaswani]] and others, of the 2017 paper "Attention Is
All You Need" that introduced the architecture, and the originator of several ideas
that quietly power most large models today.[^vaswani2017]

## A through-line of load-bearing ideas

Beyond the Transformer itself, Shazeer authored a remarkable run of techniques that
became standard:

- **[[Mixture of Experts]].** He was lead author of the 2017 paper that introduced the
  sparsely-gated MoE layer as a way "of dramatically increasing model capacity without
  a proportional increase in computation."[^moe]
- **Multi-query attention.** In a 2019 paper he proposed sharing keys and values
  "across all of the different attention heads," cutting "the memory bandwidth
  requirements of incremental decoding" — the basis of the
  [[Grouped-query & multi-query attention|grouped-query attention]] used in modern
  models.[^mqa]

(The mechanisms themselves are covered in their own entries; the point here is that
one person originated so many of them.)

## Character.AI and Google

Shazeer spent much of his career at Google before leaving in 2021 to co-found
**Character.AI**, a consumer conversational-AI company.[^wiki] He returned to Google in
August 2024 as part of a roughly $2.7 billion deal to license Character.AI's
technology, and became a co-lead of the [[Gemini]] effort at [[Google DeepMind]],
alongside Jeff Dean and Oriol Vinyals.[^wiki] In June 2026 he announced he was leaving
Google to join [[OpenAI]].[^cnbc]
