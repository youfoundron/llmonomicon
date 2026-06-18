---
title: BIG-bench
description: A large collaborative benchmark of 204 tasks from 450 authors, built to probe capabilities beyond current models — and the origin of the widely used BIG-Bench Hard reasoning subset.
technicality: technical
tags: [benchmark, evaluation]
aliases: [BBH, BIG-Bench Hard, Beyond the Imitation Game]
updated: 2026-06-18
sources:
  - id: srivastava2022
    title: "Beyond the Imitation Game: Quantifying and extrapolating the capabilities of language models"
    url: https://arxiv.org/abs/2206.04615
    author: Srivastava et al.
    publisher: "arXiv (TMLR)"
    year: 2022
  - id: suzgun2022
    title: "Challenging BIG-Bench Tasks and Whether Chain-of-Thought Can Solve Them"
    url: https://arxiv.org/abs/2210.09261
    author: Suzgun et al.
    publisher: arXiv
    year: 2022
---

# BIG-bench

**BIG-bench** — the **Beyond the Imitation Game Benchmark** — is a large, collaboratively built
test of language-model ability, designed to push past the narrow skills earlier benchmarks
measured. Rather than one team picking a handful of tasks, it gathered **204 tasks** contributed
by **450 authors across 132 institutions**, deliberately including problems "believed to be
beyond the capabilities of current language models."[^srivastava2022]

## A collaborative breadth test

BIG-bench's distinguishing idea is **breadth by crowd-sourcing**. Its tasks range across
linguistics, mathematics, common-sense reasoning, biology, social bias, software, and a long
tail of unusual or deliberately difficult challenges — assembled to probe what models could
*not* yet do and to help forecast how capabilities might emerge with scale.[^srivastava2022]
Where a [[Benchmark|benchmark]] such as [[MMLU]] measures knowledge across academic subjects,
BIG-bench was built to be wider in scope and harder to exhaust.

## BIG-Bench Hard

The most enduring piece of the project is a subset called **BIG-Bench Hard (BBH)** — "a suite of
23 challenging BIG-Bench tasks ... for which prior language model evaluations did not outperform
the average human-rater."[^suzgun2022] BBH became a standard reasoning benchmark for a memorable
reason: it showcased **[[Chain-of-thought prompting|chain-of-thought]]** prompting. Asking the
model to reason step by step before answering let PaLM "surpass the average human-rater
performance on 10 of the 23 tasks," and Codex on 17 of 23 — a striking sign that a prompting
change, not just a bigger model, could unlock performance that direct answering left on the
table.[^suzgun2022] BBH remains widely cited alongside reasoning benchmarks like [[GSM8K]].
