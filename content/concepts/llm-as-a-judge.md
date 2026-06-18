---
title: LLM-as-a-judge
description: Using a strong language model to grade other models' outputs in place of human raters — the scalable-evaluation method behind many automatic leaderboards, along with its well-documented biases.
technicality: technical
tags: [evaluation, benchmark]
group: evaluation
aliases: [LLM as a judge, LLM judge]
updated: 2026-06-18
sources:
  - id: zheng2023
    title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"
    url: https://arxiv.org/abs/2306.05685
    author: Zheng, Chiang, Sheng, et al.
    publisher: "arXiv (NeurIPS 2023)"
    year: 2023
  - id: alpacaeval
    title: "AlpacaEval: An Automatic Evaluator for Instruction-following Models"
    url: https://github.com/tatsu-lab/alpaca_eval
    author: Tatsu Lab
    publisher: GitHub
    year: 2023
---

# LLM-as-a-judge

**LLM-as-a-judge** is the practice of using a strong language model to **grade** the outputs of
other models, in place of slow and expensive human raters. It is the scalable-evaluation idea
behind many of the automatic leaderboards of the modern era: instead of paying people to compare
answers, you ask a capable model — often GPT-4-class — to do the scoring.[^zheng2023]

## How it works

A judge model is given a rubric and asked either to **score** a single answer or to **pick the
better of two** (a pairwise comparison). The paper that named and studied the method, "Judging
LLM-as-a-Judge with MT-Bench and Chatbot Arena" (Zheng et al., 2023), framed it as "a scalable
and explainable way to approximate human preferences," and found that "strong LLM judges like
GPT-4 can match both controlled and crowdsourced human preferences well, achieving over 80%
agreement" — about the level two humans agree with each other.[^zheng2023] The approach powers
widely used evaluations including **MT-Bench** (multi-turn questions, from that same paper) and
**AlpacaEval** (instruction following).[^zheng2023][^alpacaeval]

## The biases

The reason this entry carries a caveat is that LLM judges are not neutral. The MT-Bench paper
documents several systematic biases: "position, verbosity, and self-enhancement biases, as well
as limited reasoning ability."[^zheng2023] In plain terms, a judge can favor whichever answer is
shown **first** (position), prefer **longer** answers regardless of quality (verbosity), and
rate **its own family's** outputs more highly (self-enhancement) — all while remaining shaky on
hard reasoning problems. These failure modes are concrete enough to engineer around: AlpacaEval,
for instance, adds a **length-controlled win rate** — "a debiased version of the win-rates that
control for the length of the outputs" — specifically to blunt the verbosity bias.[^alpacaeval]

## Where it fits

LLM-as-a-judge sits between two other ways of evaluating models. It is cheaper and faster than
human-preference [[Chatbot Arena|arenas]], which crowd-source real human votes, but it inherits
the judge model's blind spots; and it is more flexible than static [[Benchmark|benchmarks]] with
fixed answer keys, but less reproducible. It is a close cousin of the **AI feedback** used in
[[Constitutional AI]], where a model's own judgments stand in for human labels during training.
As an automatic evaluation method it belongs to the broader toolkit catalogued under
[[Benchmark (LLM evaluation)|LLM evaluation]] and frameworks such as [[HELM]].
