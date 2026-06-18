---
title: TruthfulQA
description: A benchmark of 817 questions designed to elicit common human misconceptions — and the source of the surprising finding that larger models can be less truthful, not more.
technicality: technical
tags: [benchmark, evaluation]
updated: 2026-06-18
sources:
  - id: lin2021
    title: "TruthfulQA: Measuring How Models Mimic Human Falsehoods"
    url: https://arxiv.org/abs/2109.07958
    author: Lin, Hilton & Evans
    publisher: "arXiv (ACL 2022)"
    year: 2021
---

# TruthfulQA

**TruthfulQA** is a [[Benchmark (LLM evaluation)|benchmark]] that measures whether a language
model tells the truth — specifically, whether it resists repeating the **falsehoods and
misconceptions that people commonly believe**. Its **817 questions** span **38 categories**,
"including health, law, finance and politics," and are written to bait the kind of popular myth a
model likely absorbed from its training data.[^lin2021]

## Measuring truthfulness

The questions are adversarial by design: each targets a common human misconception, so a model
that simply repeats what it read on the web will get it wrong. Because a model could be trivially
"truthful" by always answering "I have no comment," TruthfulQA scores answers on two axes —
**truthfulness** and **informativeness** — so a useful model has to be both honest and
substantive.[^lin2021]

## The inverse-scaling result

TruthfulQA's most-cited finding was a surprise. "The best model was truthful on 58% of questions,
while human performance was 94%" — a wide gap — but the more striking result was about size: "the
largest models were generally the least truthful. This contrasts with other NLP tasks, where
performance improves with model size."[^lin2021] In other words, scaling a model up could make it
*better* at mimicking human falsehoods rather than worse. That inverse-scaling observation made
TruthfulQA a standard probe of truthfulness and a caution against assuming bigger is always
better — and it remains a common component of evaluation suites such as the
[[Open LLM Leaderboard]].
