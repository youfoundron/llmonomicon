---
title: MMLU
description: The most-cited knowledge benchmark of the LLM era—57 subjects of multiple-choice questions—now largely saturated by frontier models and succeeded by harder, cleaner variants.
tags: [benchmark, evaluation, knowledge]
aliases: [Massive Multitask Language Understanding, MMLU-Pro, MMLU-Redux]
updated: 2026-06-17
sources:
  - id: hendrycks2020
    title: "Measuring Massive Multitask Language Understanding"
    url: https://arxiv.org/abs/2009.03300
    author: Hendrycks et al.
    publisher: arXiv
    year: 2020
  - id: wang2024
    title: "MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark"
    url: https://arxiv.org/abs/2406.01574
    author: Wang et al.
    publisher: arXiv
    year: 2024
  - id: gema2024
    title: "Are We Done with MMLU?"
    url: https://arxiv.org/abs/2406.04127
    author: Gema et al.
    publisher: arXiv
    year: 2024
---

# MMLU

**MMLU** (Massive Multitask Language Understanding) was, for much of the LLM era,
the benchmark people reached for to answer "how much does this model know?"
Introduced by Hendrycks and colleagues in 2020, it is a **multiple-choice** test
spanning **57 subjects** — "elementary mathematics, US history, computer science,
law, and more" — across STEM, the humanities, and the social sciences, built to
measure a model's "extensive world knowledge and problem solving
ability."[^hendrycks2020] It became a fixture of nearly every model-release
comparison table. (For evaluation in general, see [[Benchmark (LLM evaluation)]].)

Questions are typically posed with a few worked examples in the prompt — a few-shot
setup — and no task-specific fine-tuning. When MMLU launched, the largest [[GPT-3]]
model scored 43.9% (against 25% for random guessing), and the authors concluded that
models "need substantial improvements before they can reach expert-level
accuracy."[^hendrycks2020]

## Saturation and successors

Over the following years frontier models climbed from that 43.9% into the high
eighties and beyond, **largely saturating** the benchmark and blunting its ability
to separate the strongest models. Two responses followed:

- **MMLU-Pro** (2024) is "a more robust and challenging" revision that expands "the
  choice set from four to ten options," adds reasoning-heavy questions, and strips
  out trivial ones; models score 16–33% lower on it than on the original.
  Tellingly, [[Chain-of-thought prompting]] *helps* on MMLU-Pro where it did not on
  the original — a sign the new version rewards genuine reasoning over
  recall.[^wang2024]
- **"Are We Done with MMLU?"** (2024) raised a different concern: data quality. Its
  authors found that roughly 6.5% of MMLU's questions contain errors (far more in
  some subjects) and released **MMLU-Redux**, a re-annotated subset, arguing the
  mistakes meaningfully distort reported scores.[^gema2024]

Together these mark MMLU's shift from frontier yardstick to a benchmark whose
limits — in both difficulty and labeling — are now well understood. It sits
alongside harder successors such as [[GPQA]] in the modern evaluation toolkit.
