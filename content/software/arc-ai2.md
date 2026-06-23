---
title: ARC (AI2 Reasoning Challenge)
description: The AI2 Reasoning Challenge — grade-school science multiple-choice questions split into an Easy set and a deliberately hard Challenge set — a classic reasoning benchmark and Open LLM Leaderboard fixture.
technicality: technical
tags: [benchmark, reasoning]
aliases: [ARC, AI2 Reasoning Challenge, ARC-Challenge, ARC-Easy]
updated: 2026-06-23
sources:
  - id: clark2018
    title: "Think you have Solved Question Answering? Try ARC, the AI2 Reasoning Challenge"
    url: https://arxiv.org/abs/1803.05457
    author: Clark, Cowhey, Etzioni, et al.
    publisher: arXiv
    year: 2018
  - id: chollet2019
    title: "On the Measure of Intelligence"
    url: https://arxiv.org/abs/1911.01547
    author: François Chollet
    publisher: arXiv
    year: 2019
---

# ARC (AI2 Reasoning Challenge)

**ARC** — the **AI2 Reasoning Challenge** — is a [[Benchmark (LLM evaluation)|benchmark]] of
grade-school science questions in multiple-choice form, built by the Allen Institute for AI to
test whether a model can *reason* rather than pattern-match. Its lasting contribution is a
deliberately hard subset: questions chosen to defeat the shallow shortcuts — keyword retrieval and
word co-occurrence — that earlier question-answering systems leaned on.[^clark2018]

> **Not to be confused with ARC-AGI.** This ARC (AI2 Reasoning Challenge, 2018, science QA) is
> unrelated to François Chollet's **ARC-AGI** — the **Abstraction and Reasoning Corpus**, a
> benchmark of abstract visual-grid puzzles "built upon an explicit set of priors designed to be
> as close as possible to innate human priors."[^chollet2019] Same acronym, entirely different
> benchmark.

## The Easy and Challenge sets

ARC consists of "7,787 ... natural, grade-school science questions (authored for human tests)" —
"the largest public-domain set of this kind" at the time — and is "partitioned into a Challenge
Set and an Easy Set."[^clark2018] The split is the point: "the Challenge Set contains only
questions answered incorrectly by both a retrieval-based algorithm and a word co-occurrence
algorithm,"[^clark2018] so by construction it strips out the questions a system could get right
without real reasoning. It was genuinely hard at release — the paper reports that leading neural
models could not significantly beat a random baseline on the Challenge Set.[^clark2018]

## In the leaderboards, and its family

ARC-Challenge became a standard fixture of open-model evaluation: it was one of the six benchmarks
in the original [[Open LLM Leaderboard]], run alongside [[HellaSwag]] and others. It also anchors
a broader family of multiple-choice commonsense and knowledge tests — WinoGrande, PIQA, OpenBookQA,
and CommonsenseQA among them — that probe everyday and scientific reasoning in the same
pick-the-best-answer format.
