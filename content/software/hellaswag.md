---
title: HellaSwag
description: A commonsense sentence-completion benchmark whose wrong answers were adversarially filtered to fool models—easy for humans, hard for 2019 models, and now saturated.
tags: [benchmark, evaluation, commonsense]
updated: 2026-06-18
sources:
  - id: zellers2019
    title: "HellaSwag: Can a Machine Really Finish Your Sentence?"
    url: https://arxiv.org/abs/1905.07830
    author: Zellers et al.
    publisher: arXiv
    year: 2019
---

# HellaSwag

**HellaSwag** is a commonsense-reasoning benchmark from 2019: given a short everyday
scenario, a model must pick the most plausible continuation from four options.[^zellers2019]
For years it was one of the standard tests of commonsense on open-model leaderboards,
including the original [[Open LLM Leaderboard]].

## Adversarial filtering

What makes HellaSwag distinctive is *how its wrong answers were made*. Rather than
hand-writing distractors, the authors used **Adversarial Filtering** — "a data
collection paradigm wherein a series of discriminators iteratively select an
adversarial set of machine-generated wrong answers."[^zellers2019] In other words, the
incorrect endings were chosen specifically because models found them tempting, which is
what made the benchmark hard.

The result was a striking gap at launch: "though its questions are trivial for humans
(>95% accuracy), state-of-the-art models struggle (<48%)."[^zellers2019] That
easy-for-humans, hard-for-machines contrast is exactly what a good benchmark wants.

## Saturation

Like the other benchmarks of its era, HellaSwag has since **saturated** — modern
frontier models now match or exceed human accuracy on it, so it no longer
distinguishes the best systems from one another. It remains, though, a clean
illustration of adversarial filtering and of the benchmark lifecycle described under
[[Benchmark (LLM evaluation)]], and it sits alongside [[MMLU]] and [[GSM8K]] among the
fixtures of the early leaderboard era.
