---
title: GPQA
description: A small, expert-written benchmark of "Google-proof" graduate-level science questions, used to test frontier reasoning after MMLU saturated.
tags: [benchmark, evaluation, reasoning, science]
aliases: [Graduate-Level Google-Proof Q&A, GPQA Diamond]
updated: 2026-06-17
sources:
  - id: rein2023
    title: "GPQA: A Graduate-Level Google-Proof Q&A Benchmark"
    url: https://arxiv.org/abs/2311.12022
    author: Rein et al.
    publisher: arXiv
    year: 2023
---

# GPQA

**GPQA** (Graduate-Level Google-Proof Q&A) is a benchmark of hard science questions
built to test reasoning rather than recall. Introduced by Rein and colleagues in
2023, it is a set of **448 multiple-choice questions** in biology, physics, and
chemistry, written by domain experts.[^rein2023]

Its defining feature is in the name: the questions are **"Google-proof."** PhD-level
experts in the relevant field answer about 65% of them correctly, but "highly
skilled non-expert validators only reach 34% accuracy, despite spending on average
over 30 minutes with unrestricted access to the web."[^rein2023] You cannot simply
look these up — answering them takes genuine understanding.

## GPQA Diamond

The figure that shows up in model-release announcements is usually **GPQA Diamond**,
a 198-question subset the paper singles out as its highest-quality, hardest slice:
questions both experts answered correctly but most non-experts got wrong.[^rein2023]

## Why it matters

GPQA arrived just as [[MMLU]] was nearing saturation, and it was genuinely hard: at
release, the strongest GPT-4–based baseline reached "39% accuracy" — above the
non-expert level but well below the experts'.[^rein2023] That headroom made it a
standard yardstick for frontier reasoning, and GPQA Diamond in particular has become
a routine line in the scorecards of
[[Reasoning models (test-time compute)|reasoning models]]. It sits alongside
[[MMLU]] and [[GSM8K]] in the modern evaluation toolkit, under the broader idea of a
[[Benchmark (LLM evaluation)|benchmark]].
