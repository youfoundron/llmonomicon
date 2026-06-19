---
title: Self-consistency
description: A decoding enhancement to chain-of-thought prompting — sample many reasoning paths and take the majority-vote answer — and an early, simple way to trade test-time compute for accuracy.
technicality: technical
tags: [prompting, reasoning]
group: prompting
aliases: [Self-consistency decoding, CoT-SC]
updated: 2026-06-18
sources:
  - id: wang2022
    title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models"
    url: https://arxiv.org/abs/2203.11171
    author: Wang, Wei, Schuurmans, Le, Chi, et al.
    publisher: "arXiv (ICLR 2023)"
    year: 2022
---

# Self-consistency

**Self-consistency** is a simple, effective improvement to [[Chain-of-thought prompting]]:
instead of generating one chain of reasoning and trusting its answer, **sample several** and take
the **majority-vote answer**. It treats a model's reasoning less like a single calculation than
like a poll of many attempts.[^wang2022]

## How it works

Plain chain-of-thought decodes one reasoning path greedily. Self-consistency instead "samples a
diverse set of reasoning paths instead of only taking the greedy one, and then selects the most
consistent answer by marginalizing out the sampled reasoning paths."[^wang2022] In practice that
means drawing several chains with some randomness — a non-zero [[Temperature (sampling)|temperature]]
with [[Top-p sampling|top-p]] sampling — and keeping the final answer the most chains agree on.
The intuition is that "a complex reasoning problem typically admits multiple different ways of
thinking leading to its unique correct answer,"[^wang2022] so a wrong turn in any single chain
tends to be outvoted by the rest.

## What it buys, and what it costs

The gains over plain chain-of-thought are large: in the original paper, self-consistency raised
accuracy by **+17.9%** on [[GSM8K]], +12.2% on AQuA, +11.0% on SVAMP, +6.4% on StrategyQA, and
+3.9% on ARC-Challenge.[^wang2022] The catch is that it runs the model **once per sampled chain**,
so compute scales linearly with the number of samples — making it one of the earliest and simplest
ways to trade [[Reasoning models|test-time compute]] for accuracy, a trade the later
reasoning-model era would push much further.[^wang2022]
