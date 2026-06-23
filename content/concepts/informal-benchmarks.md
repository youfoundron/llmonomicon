---
title: Informal & vibe-check benchmarks
description: "The folklore of unofficial, often playful tests — the pelican on a bicycle, the TikZ unicorn, counting R's in \"strawberry,\" Will Smith eating spaghetti — that the community uses to size up new models: hard to game and legible, but unquantified."
technicality: somewhat-technical
tags: [evaluation, benchmark]
group: evaluation
aliases: [vibe check, vibe-check benchmarks, informal benchmarks]
updated: 2026-06-23
sources:
  - id: bubeck2023
    title: "Sparks of Artificial General Intelligence: Early experiments with GPT-4"
    url: https://arxiv.org/abs/2303.12712
    author: Bubeck et al.
    publisher: "arXiv (Microsoft Research)"
    year: 2023
  - id: woolf2025
    title: "Can modern LLMs actually count the number of b's in \"blueberry\"?"
    url: https://minimaxir.com/2025/08/llm-blueberry/
    author: Max Woolf
    publisher: Max Woolf's Blog
    year: 2025
  - id: willsmith
    title: "Will Smith eating spaghetti and other weird AI benchmarks that took off in 2024"
    url: https://techcrunch.com/2024/12/31/will-smith-eating-spaghetti-and-other-weird-ai-benchmarks-that-took-off-in-2024/
    publisher: TechCrunch
    year: 2024
---

# Informal & vibe-check benchmarks

Alongside the formal leaderboards, the AI community sizes up each new model with a folklore of
**unofficial tests** — quick, often playful prompts that give a "vibe check" on what a model can
and can't do. They aren't rigorous, but they're memorable, legible to non-experts, and
surprisingly good at exposing failures the official benchmarks miss.

## A field guide

A handful have become recurring rituals whenever a new model drops:

- **[[Pelican riding a bicycle]]** — [[Simon Willison]]'s habit of asking each new model to draw a
  pelican riding a bicycle as an SVG. Because no lab optimizes for it, the result is an honest
  probe of spatial and compositional reasoning.
- **The TikZ unicorn** — in the 2023 "Sparks of AGI" paper, Microsoft researchers asked GPT-4 to
  draw a unicorn in TikZ (a code-based drawing language) and read the result as a window into the
  model's world model — could it assemble a recognizable unicorn from code alone?[^bubeck2023]
- **"How many R's in strawberry?"** — a gotcha that trips up otherwise-capable models. It is
  usually pinned on [[Tokenization]]: a model sees sub-word tokens like "straw" + "berry," not
  individual letters, so it "may not understand that 'strawberry' is composed of the letters … in
  that specific order," which makes counting characters unnatural.[^woolf2025]
- **"Will Smith eating spaghetti"** — the informal yardstick for AI **video** generation. Born
  from a memorably grotesque 2023 clip, it has "become something of a meme as well as a benchmark:
  seeing whether a new video generator can realistically render Smith slurping down a bowl of
  noodles."[^willsmith]

## Why they persist — and where they fall short

These tests endure for real reasons. Because no lab trains against them, they are **hard to
contaminate and hard to game** — unlike a published benchmark, which a model can be tuned to ace.
They are **legible**: anyone can look at a wonky pelican or a miscounted "strawberry" and judge it,
no metric required. And they often surface concrete failures that aggregate scores smooth over.

Their weaknesses are the mirror image: they are **unquantified, cherry-picked, and not
reproducible** — a single anecdote, not a measurement. They are best understood as a **complement
to** formal [[Benchmark (LLM evaluation)|benchmarks]], not a replacement: the vibe check tells you
where to look, and the benchmark tells you how much.
