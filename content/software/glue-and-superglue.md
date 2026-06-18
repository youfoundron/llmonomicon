---
title: GLUE & SuperGLUE
description: The pre-LLM-era NLU benchmark suites — GLUE bundled nine tasks into one score; once BERT surpassed it, the harder SuperGLUE replaced it — the textbook example of benchmark saturation.
technicality: technical
tags: [evaluation, benchmark]
aliases: [GLUE, SuperGLUE]
updated: 2026-06-18
sources:
  - id: glue2018
    title: "GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding"
    url: https://arxiv.org/abs/1804.07461
    author: Wang et al.
    publisher: "arXiv (ICLR 2019)"
    year: 2018
  - id: superglue2019
    title: "SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems"
    url: https://arxiv.org/abs/1905.00537
    author: Wang et al.
    publisher: "arXiv (NeurIPS 2019)"
    year: 2019
---

# GLUE & SuperGLUE

**GLUE** and its successor **SuperGLUE** were the benchmark suites that defined
progress in natural language understanding in the years just before large language
models — and the textbook example of how a benchmark gets *saturated*. GLUE bundled
a set of language-understanding tasks into a single score; once models built on
[[BERT]] blew past it, the deliberately harder SuperGLUE took its place, only to be
beaten in turn.[^glue2018][^superglue2019]

## GLUE

The **General Language Understanding Evaluation (GLUE)** benchmark, introduced by
Wang et al. in 2018, bundled **nine** sentence and sentence-pair tasks into one
aggregate score with a public leaderboard.[^glue2018] It was deliberately
**model-agnostic** — "a tool for evaluating and analyzing the performance of
models across a diverse range of existing NLU tasks" — and its purpose was to
reward *generalization*: a strong score required a system that handled many tasks,
not one "exclusively tailored to any one specific task or dataset."[^glue2018]

## Saturation, then SuperGLUE

GLUE's reign was short. As the [[Transformer]]-based [[BERT]] and its successors
climbed the leaderboard, they surpassed even the human baseline, and the benchmark
ran out of room to measure further progress. The authors said so plainly when
introducing the sequel: "performance on the benchmark has recently surpassed the
level of non-expert humans, suggesting limited headroom for further
research."[^superglue2019] Their answer, in 2019, was **SuperGLUE** — "a new set of
more difficult language understanding tasks" in the same style.[^superglue2019] It,
too, was soon beaten.

## Why it matters

GLUE and SuperGLUE are the canonical illustration of **benchmark saturation**:
scores climb to the ceiling, the benchmark stops distinguishing the best systems,
and the field is forced to build a harder one. That cycle — central to the
[[Benchmark]] story — first played out at scale here, bound up with the [[BERT]]
moment that drove it.
