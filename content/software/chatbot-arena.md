---
title: Chatbot Arena
description: A crowd-sourced LLM leaderboard where users vote on anonymous head-to-head model responses, ranking models by human preference rather than fixed test scores.
technicality: technical
tags: [evaluation, benchmark, leaderboard]
aliases: [LMArena, Chatbot Arena leaderboard]
updated: 2026-06-17
sources:
  - id: arena-paper
    title: "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference"
    url: https://arxiv.org/abs/2403.04132
    author: Chiang et al.
    publisher: "arXiv (LMSYS)"
    year: 2024
  - id: judge-paper
    title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
    url: https://arxiv.org/abs/2306.05685
    author: Zheng et al.
    publisher: "arXiv (NeurIPS 2023)"
    year: 2023
---

# Chatbot Arena

**Chatbot Arena** (now branded **LMArena**) is a crowd-sourced platform for ranking
language models by **human preference**. Rather than scoring models on a fixed test,
it lets visitors chat with two anonymous models side by side and vote for the
better response, "leverag[ing] input from a diverse user base through crowdsourcing"
via "a pairwise comparison approach."[^arena-paper] Created by the LMSYS group, it
has become the most-watched real-world model ranking of the era.

## How it ranks models

Each vote is a single head-to-head comparison, and because the two models stay
anonymous until after the vote, the result reflects the response rather than the
brand name. Those pairwise votes are aggregated into a leaderboard with a
statistical rating system — an **Elo / Bradley–Terry**-style model that turns many
noisy comparisons into one ranked ordering.[^arena-paper] By the time of the
platform paper, the Arena had gathered "over 240K votes" and "emerged as one of the
most referenced LLM leaderboards."[^arena-paper]

## Why human preference

Chatbot Arena exists as a counterweight to static, multiple-choice
[[Benchmark (LLM evaluation)|benchmarks]], which saturate over time and can be
contaminated by training data. By measuring what real people actually prefer in
open-ended conversation, it captures qualities — helpfulness, tone,
instruction-following — that a single accuracy number misses. (It comes from the
same Berkeley/LMSYS lineage as [[vLLM]].)

## Caveats

Preference-based evaluation has biases of its own. Voters are largely non-experts,
and a response's **style and length** can sway votes independently of whether it is
correct. The closely related practice of using a model *as* the judge — studied in
the MT-Bench paper, which found a strong judge model agreeing with humans "over 80%"
of the time — is documented to show "position, verbosity, and self-enhancement
biases."[^judge-paper] Chatbot Arena is usually read alongside companion evaluations
such as MT-Bench and Arena-Hard; the broader topic of automated judging has its own
entry, [[LLM-as-a-judge]].
