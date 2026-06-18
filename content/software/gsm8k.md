---
title: GSM8K
description: A benchmark of grade-school math word problems that became the standard test of multi-step reasoning—and the headline number for chain-of-thought prompting.
technicality: technical
tags: [benchmark, evaluation, reasoning, math]
aliases: [Grade School Math 8K, GSM8k]
updated: 2026-06-17
sources:
  - id: cobbe2021
    title: "Training Verifiers to Solve Math Word Problems"
    url: https://arxiv.org/abs/2110.14168
    author: Cobbe et al.
    publisher: arXiv
    year: 2021
  - id: wei2022
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
    url: https://arxiv.org/abs/2201.11903
    author: Wei et al.
    publisher: arXiv
    year: 2022
  - id: zhang2024
    title: "A Careful Examination of Large Language Model Performance on Grade School Arithmetic"
    url: https://arxiv.org/abs/2405.00332
    author: Zhang et al.
    publisher: arXiv
    year: 2024
---

# GSM8K

**GSM8K** (Grade School Math 8K) is a benchmark of math word problems that became
the standard way to measure a model's multi-step reasoning. Introduced by Cobbe and
colleagues at [[OpenAI]] in 2021, it is "a dataset of 8.5K high quality
linguistically diverse grade school math word problems."[^cobbe2021] The problems
are elementary in content but require stringing together "a sequence of elementary
calculations," which makes getting them right a test of reasoning rather than fact
recall.[^cobbe2021]

The paper that introduced GSM8K also introduced an influential idea: **verifiers**.
Rather than trust a model's first answer, it generated many candidate solutions and
used a separately trained model to rank them — an approach the paper found offered
"a boost approximately equivalent to a 30x model size increase."[^cobbe2021]

## The chain-of-thought benchmark

GSM8K is best known as the number that demonstrated the power of
[[Chain-of-thought prompting]]. When Wei and colleagues prompted a large model to
work through its reasoning step by step, PaLM 540B's GSM8K accuracy jumped from
17.9% to 56.9%.[^wei2022] For years afterward, GSM8K was the headline math-reasoning
figure in model-release tables.

## Contamination and saturation

Its very popularity became a weakness. Because GSM8K appears all over the web and in
training data, a high score risks reflecting memorization rather than reasoning. To
test for this, Zhang and colleagues built **GSM1k**, a fresh set of problems
mirroring GSM8K's style, and observed "accuracy drops of up to 8%, with several
families of models showing evidence of systematic overfitting" — though the
strongest frontier models largely generalized to the new problems rather than having
memorized the old ones.[^zhang2024] Today GSM8K is largely saturated at the frontier
and read more as a baseline than a frontier challenge — a role now filled by harder
tests such as [[GPQA]]. (For evaluation in general, see [[Benchmark (LLM evaluation)]].)
