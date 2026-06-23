---
title: SQuAD
description: The Stanford Question Answering Dataset — the benchmark that defined extractive reading comprehension (find the answer span in a Wikipedia paragraph) — later sharpened by SQuAD 2.0's unanswerable questions.
technicality: technical
tags: [benchmark, nlp]
aliases: [Stanford Question Answering Dataset, SQuAD 2.0]
updated: 2026-06-23
sources:
  - id: rajpurkar2016
    title: "SQuAD: 100,000+ Questions for Machine Comprehension of Text"
    url: https://arxiv.org/abs/1606.05250
    author: Rajpurkar, Zhang, Lopyrev & Liang
    publisher: "arXiv (EMNLP 2016)"
    year: 2016
  - id: rajpurkar2018
    title: "Know What You Don't Know: Unanswerable Questions for SQuAD"
    url: https://arxiv.org/abs/1806.03822
    author: Rajpurkar, Jia & Liang
    publisher: "arXiv (ACL 2018)"
    year: 2018
  - id: devlin2018
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    url: https://arxiv.org/abs/1810.04805
    author: Devlin, Chang, Lee & Toutanova
    publisher: "arXiv (NAACL 2019)"
    year: 2018
---

# SQuAD

**SQuAD** — the **Stanford Question Answering Dataset** — is the
[[Benchmark (LLM evaluation)|benchmark]] that defined extractive **reading comprehension**: give a
model a paragraph and a question, and ask it to point to the **span of text** that answers it.
Released in 2016, it became the proving ground for machine reading in the run-up to the Transformer
era.[^rajpurkar2016]

## The task

SQuAD is a reading-comprehension dataset of "100,000+ questions ... on a set of Wikipedia articles,
where the answer to each question is a segment of text from the corresponding reading
passage."[^rajpurkar2016] Because the answer is always a contiguous span the model has to *locate*
— not free text it generates — scoring is clean and the task is sharply defined. It was hard at
first: the original paper's logistic-regression baseline reached 51% F1, against a human F1 of
**86.8%**.[^rajpurkar2016]

## SQuAD 2.0: knowing what you don't know

The first version had a blind spot — every question had an answer, so a model never had to admit
ignorance. **SQuAD 2.0** (2018) fixed that by adding "over 50,000 unanswerable questions written
adversarially by crowdworkers to look similar to answerable ones."[^rajpurkar2018] Now a system
must "determine when no answer is supported by the paragraph and abstain from answering" — a
markedly harder task, on which a strong system that scored 86% F1 on v1.1 dropped to 66% on
2.0.[^rajpurkar2018]

## The reading-comprehension race

SQuAD's public leaderboard helped drive the fast NLU progress of 2018–2019, alongside
[[GLUE & SuperGLUE]]. The landmark moment came with [[BERT]], which pushed SQuAD v1.1 to **93.2**
Test F1 and v2.0 to 83.1[^devlin2018] — past the 86.8% human F1 the original dataset had
reported[^rajpurkar2016] — a vivid measure of how quickly the [[Transformer]] closed a gap that had
looked daunting only two years earlier.
