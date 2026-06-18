---
title: HELM
description: Stanford CRFM's holistic evaluation framework — it scores models across many scenarios and metrics at once (accuracy, robustness, fairness, toxicity, and more) in a transparent matrix, not a single number.
technicality: technical
tags: [benchmark, evaluation]
aliases: [Holistic Evaluation of Language Models]
updated: 2026-06-18
sources:
  - id: liang2022
    title: "Holistic Evaluation of Language Models (HELM)"
    url: https://arxiv.org/abs/2211.09110
    author: Liang et al.
    publisher: "arXiv (TMLR 2023)"
    year: 2022
  - id: repo
    title: "stanford-crfm/helm (GitHub repository)"
    url: https://github.com/stanford-crfm/helm
    author: Stanford CRFM
    publisher: GitHub
    year: 2024
  - id: helmlite
    title: "HELM Lite: Lightweight and Broad Capabilities Evaluation"
    url: https://crfm.stanford.edu/2023/12/19/helm-lite.html
    author: Stanford CRFM
    publisher: Stanford CRFM
    year: 2023
---

# HELM

**HELM** (Holistic Evaluation of Language Models) is an open-source evaluation
framework from Stanford's Center for Research on Foundation Models (CRFM) that
judges models across many scenarios and many metrics at once — and reports the
results as a transparent matrix rather than a single headline score.[^repo] Its
premise is that a model is not one number, and that honest evaluation has to show
the trade-offs.

## The holistic approach

HELM's defining idea is in its name. Rather than rank models on accuracy alone,
the original 2022 study evaluated 30 models across 42 scenarios on seven metrics —
**accuracy, calibration, robustness, fairness, bias, toxicity, and efficiency** —
so that "metrics beyond accuracy don't fall to the wayside, and ... trade-offs are
clearly exposed."[^liang2022] A model that is accurate but biased, or fast but
brittle, has nowhere to hide in a scenario-by-metric grid.

## Standardization and transparency

HELM also set out to make evaluation *comparable*. The paper observed that before
it, "models on average were evaluated on just 17.9% of the core HELM scenarios,
with some prominent models not sharing a single scenario in common" — HELM raised that
coverage to 96%, so models could finally be measured on the same footing.[^liang2022]
It backs this with transparency: HELM publishes all of its raw prompts and model
predictions, with a web interface to inspect individual prompt–response pairs,
making results reproducible by anyone.[^repo]

## Living leaderboards

HELM is maintained as a family of updating leaderboards rather than a one-off
paper. They include **HELM Lite** (a lightweight, broad-capability evaluation,
inspired in part by the [[Open LLM Leaderboard]]), HELM Classic (the original
paper's scenarios), HELM Capabilities, and **HELM MMLU**, which re-runs [[MMLU]]
with *standardized prompts* across all 57 subjects to fix the inconsistent,
self-reported scores that plague that benchmark.[^helmlite][^repo] As a landmark
in *how* to evaluate, HELM is one of the most influential answers to the limits of
single-score [[Benchmark|benchmarks]].
