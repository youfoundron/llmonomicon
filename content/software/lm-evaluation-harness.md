---
title: lm-evaluation-harness
description: EleutherAI's open-source framework that runs language models against dozens of benchmarks through one interface—the shared plumbing that makes scores comparable.
technicality: technical
tags: [open-source, evaluation]
aliases: [lm-eval, lm-eval-harness, Language Model Evaluation Harness]
updated: 2026-06-18
sources:
  - id: lm-eval-repo
    title: "EleutherAI/lm-evaluation-harness (GitHub repository)"
    url: https://github.com/EleutherAI/lm-evaluation-harness
    author: Gao et al. (EleutherAI)
    publisher: GitHub
    year: 2024
  - id: lm-eval-zenodo
    title: "A framework for few-shot language model evaluation (Zenodo)"
    url: https://doi.org/10.5281/zenodo.10256836
    author: Gao et al.
    publisher: Zenodo
    year: 2024
---

# lm-evaluation-harness

**lm-evaluation-harness** is [[EleutherAI]]'s open-source framework for evaluating
language models — "a unified framework to test generative language models on a large
number of different evaluation tasks."[^lm-eval-repo] It implements "over 60 standard
academic benchmarks" behind a single interface, so one model can be run across a whole
catalog of tests in a consistent way.[^lm-eval-repo] It is widely used but rarely
discussed: the plumbing beneath a great many published benchmark numbers, including as
the backend of the [[Open LLM Leaderboard]].[^lm-eval-repo]

## Why a shared harness matters

The harness exists to solve a genuine reproducibility problem. Benchmark scores are
surprisingly sensitive to *how* a test is run — the exact prompt wording, the number of
few-shot examples, how the answer is parsed — so two papers reporting "[[MMLU]]
accuracy" for the same model can disagree simply because they evaluated it differently.
As the project puts it, "evaluation with publicly available prompts ensures
reproducibility and comparability between papers."[^lm-eval-repo] The implication is
that benchmark numbers are only really comparable when they come from the *same* harness
and setup; a shared implementation like this one is what lets a score for one model line
up against another. (This is the practical counterpart to the validity and contamination
concerns discussed under [[Benchmark (LLM evaluation)]].)

The harness is released under the MIT license, with a canonical citation (Gao et al.)
maintained in the repository.[^lm-eval-zenodo]
