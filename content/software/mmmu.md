---
title: MMMU
description: The multimodal counterpart to MMLU — 11.5K college-level questions interleaving text with charts, diagrams, and other images — and the standard benchmark for vision-language models.
technicality: technical
tags: [benchmark, multimodal, evaluation]
aliases: [MMMU-Pro, Massive Multi-discipline Multimodal Understanding]
updated: 2026-06-18
sources:
  - id: yue2023
    title: "MMMU: A Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark for Expert AGI"
    url: https://arxiv.org/abs/2311.16502
    author: Yue et al.
    publisher: "arXiv (CVPR 2024)"
    year: 2023
  - id: mmmu-pro
    title: "MMMU-Pro: A More Robust Multi-discipline Multimodal Understanding Benchmark"
    url: https://arxiv.org/abs/2409.02813
    author: Yue, Zheng, Ni, et al.
    publisher: arXiv
    year: 2024
---

# MMMU

**MMMU** — Massive Multi-discipline Multimodal Understanding — is the [[Multimodal models|multimodal]] counterpart to
[[MMLU]]: a [[Benchmark (LLM evaluation)|benchmark]] of college-level exam questions, except the questions come with **pictures**.
To answer one, a model has to read a diagram, chart, or chemical structure and reason about it
with expert knowledge — which makes MMMU the standard yardstick for **vision-language
models**.[^yue2023]

## A multimodal college exam

MMMU gathers "11.5K meticulously collected multimodal questions from college exams, quizzes, and
textbooks," spanning **6 core disciplines**, "30 subjects and 183 subfields."[^yue2023] What sets
it apart from a text benchmark is the imagery: its questions interleave text with "30 highly
heterogeneous image types, such as charts, diagrams, maps, tables, music sheets, and chemical
structures."[^yue2023] Answering correctly demands both genuine visual perception and the kind of
domain knowledge an undergraduate in that field would bring — not pattern-matching on a caption.

## Hard at the frontier

MMMU was difficult from the start: at release, the best multimodal models were far from expert
level, as "GPT-4V and Gemini Ultra only achieve accuracies of 56% and 59% respectively."[^yue2023]
That headroom made it a fixture of vision-language leaderboards, alongside text benchmarks like
[[MMLU]] and [[GPQA]]. A harder, more robust follow-up, **MMMU-Pro**, arrived in 2024: it filters
out questions a text-only model can answer without looking, adds more answer options, and includes
a vision-only setting where the question itself is embedded in the image — pushing scores
substantially lower.[^mmmu-pro]
