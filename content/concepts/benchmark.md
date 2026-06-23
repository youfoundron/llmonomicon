---
title: Benchmark
description: "What an LLM benchmark is — a task, a dataset, and a scoring metric — how models are scored, and the ways benchmarks break: contamination, saturation, and construct validity."
technicality: somewhat-technical
tags: [evaluation, benchmark]
group: evaluation
aliases: [Benchmarks, Benchmarking, LLM benchmark, Evaluation benchmark, Benchmark (LLM evaluation)]
updated: 2026-06-17
sources:
  - id: raji2021
    title: "AI and the Everything in the Whole Wide World Benchmark"
    url: https://arxiv.org/abs/2111.15366
    author: Raji, Bender, Paullada, Denton, Hanna
    publisher: "arXiv (NeurIPS 2021)"
    year: 2021
  - id: helm2022
    title: "Holistic Evaluation of Language Models"
    url: https://arxiv.org/abs/2211.09110
    author: Liang et al.
    publisher: "arXiv (TMLR 2023)"
    year: 2022
  - id: gsm1k2024
    title: "A Careful Examination of Large Language Model Performance on Grade School Arithmetic"
    url: https://arxiv.org/abs/2405.00332
    author: Zhang et al.
    publisher: arXiv
    year: 2024
  - id: suzgun2022
    title: "Challenging BIG-Bench Tasks and Whether Chain-of-Thought Can Solve Them"
    url: https://arxiv.org/abs/2210.09261
    author: Suzgun et al.
    publisher: arXiv
    year: 2022
---

# Benchmark

A **benchmark** is a fixed, shared test used to measure and compare language
models: a defined task, a dataset of examples, and a scoring rule that turns a
model's answers into a number.[^helm2022] Benchmarks are the currency of progress
in the field — nearly every claim that one model is "better" than another, and
every leaderboard ranking them, rests on one. They are also easy to misread,
which makes understanding how they *break* as important as knowing how they
score.

## Anatomy of a benchmark

A benchmark has three parts: a **task** (what the model must do), a **dataset**
(the specific examples), and a **metric** (how answers are scored). The metric
depends on the task — exact-match **accuracy** for knowledge and
question-answering, **pass@k** for code (does any of *k* generated programs pass
the tests? — see [[HumanEval]]), or **Elo**-style win rates for head-to-head
human preference (see [[Chatbot Arena]]).[^helm2022]

A subtlety that trips up readers: the *same* model can score very differently on
the *same* benchmark depending on the **prompting protocol** — whether it is
given no examples (**zero-shot**), a few worked examples (**few-shot**), or asked
to reason step by step (**chain-of-thought**). The gap can be large: on the
[[BIG-bench|BIG-Bench Hard]] task subset, chain-of-thought prompting lifted models
from below the average human rater to above it on many of its 23 tasks.[^suzgun2022]
A benchmark number is only
meaningful alongside the conditions that produced it, which is why standardized
evaluation matters: a holistic survey of the field found that before efforts to
standardize, "models on average were evaluated on just 17.9% of the core HELM
scenarios," leaving results ad hoc and hard to compare.[^helm2022]

## How benchmarks break

The hard part of evaluation is that a high score does not always mean what it
appears to. Several failure modes recur:

- **Contamination.** If a benchmark's test examples leak into a model's training
  data, its score reflects memorization rather than skill. When researchers
  rebuilt the [[GSM8K]] grade-school math benchmark as a fresh, held-out set
  (GSM1k), they saw "accuracy drops of up to 8%, with several families of models
  showing evidence of systematic overfitting," and a measurable correlation
  between how likely a model was to reproduce a GSM8K example and how far its
  score fell — evidence that some models had "partially memorized" the test.
  (Notably, the strongest frontier models showed minimal signs of this.)[^gsm1k2024]
- **Saturation.** As models improve, scores creep toward the maximum until a
  benchmark can no longer tell the best models apart. The
  natural-language-understanding suites of the [[BERT]] era were saturated this
  way and replaced by deliberately harder successors (see [[GLUE & SuperGLUE]]);
  the once-dominant broad-knowledge test [[MMLU]] has more recently met the same
  fate.
- **Construct validity.** A benchmark measures one narrow thing but is often
  treated as a measure of general ability. Raji et al. examined popular
  benchmarks to "reveal the construct validity issues in their framing as the
  functionally 'general' broad measures of progress they are set up to be" — the
  gap between what a test actually measures and what we claim it shows.[^raji2021]
- **Goodhart's law.** Once a benchmark becomes the target everyone optimizes for,
  it stops being a good measure: a model can be tuned to the eval rather than to
  the capability the eval was meant to stand in for.

## Responses

The field has developed several countermeasures. **Holistic** evaluation reports
many metrics at once instead of a single accuracy number — [[HELM]], for example,
scores models on "accuracy, calibration, robustness, fairness, bias, toxicity,
and efficiency" across standardized scenarios so that "metrics beyond accuracy
don't fall to the wayside."[^helm2022] Other responses include retiring saturated
benchmarks for harder ones, keeping test sets **private or held out** to resist
contamination, ranking models by **human preference** in arenas like
[[Chatbot Arena]], automating that grading with a strong model as the rater
([[LLM-as-a-judge]]), and — informally — the
[[Informal & vibe-check benchmarks|"vibe check"]], where practitioners
simply judge a model's outputs for themselves.

This is the instrument-level view; for the broader practice of judging models see
[[LLM evaluation]], and for the intrinsic alternative to task benchmarks see
[[Perplexity]].
