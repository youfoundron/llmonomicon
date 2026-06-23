---
title: Open LLM Leaderboard
description: Hugging Face's reference scoreboard for open-weight models—reproducible benchmark scores that, over two years, became a textbook case of benchmark saturation.
technicality: technical
tags: [evaluation, leaderboard]
updated: 2026-06-18
sources:
  - id: hf-archive
    title: "Open LLM Leaderboard v1 (archived) — Hugging Face"
    url: https://huggingface.co/docs/leaderboards/en/open_llm_leaderboard/archive
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
  - id: hf-space
    title: "Open LLM Leaderboard (Hugging Face Space)"
    url: https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard
    author: Hugging Face
    publisher: Hugging Face
    year: 2025
---

# Open LLM Leaderboard

The **Open LLM Leaderboard** was, for about two years, the default public ranking of
**open-weight** language models. Run by Hugging Face, it scored submitted models by
re-running a fixed battery of academic benchmarks "in the exact same setup (same
questions, asked in the same order) to gather completely reproducible and comparable
results" — explicitly meant to separate "marketing fluff from actual
progress."[^hf-archive] Under the hood it ran on EleutherAI's
[[lm-evaluation-harness]].[^hf-archive]

## What it measured

The original (v1) leaderboard combined six benchmarks: **[[ARC (AI2 Reasoning Challenge)|ARC]]**, **[[HellaSwag]]**,
**[[MMLU]]**, **[[TruthfulQA]]**, **WinoGrande**, and **[[GSM8K]]**, each run at a fixed
number of few-shot examples.[^hf-archive] It became the community's go-to scoreboard —
the archive notes more than two million unique visitors over a ten-month
span.[^hf-archive]

## Saturation and retirement

The leaderboard is also a clean case study in **benchmark saturation**. By June 2024
the top of the board had bunched up — scores clustering near the ceiling, alongside
contamination concerns — so Hugging Face "archived it" and replaced it with a v2 built
on a harder set of benchmarks.[^hf-archive] In 2025, after evaluating well over ten
thousand models, Hugging Face retired the leaderboard entirely: as reasoning models and
assistants outgrew its tests, a single static scoreboard no longer captured the
frontier, and its role passed to a long tail of community leaderboards.[^hf-space] That
arc — a useful benchmark, then saturation, then a harder replacement, then
retirement — is the lifecycle described under [[Benchmark (LLM evaluation)]]. For the
human-preference alternative to this static-benchmark approach, see [[Chatbot Arena]].
