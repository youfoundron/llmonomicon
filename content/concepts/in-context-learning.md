---
title: In-context learning
description: A large model's ability to learn a new task from instructions and a few examples in the prompt alone, with no change to its weights.
technicality: somewhat-technical
tags: [prompting, capability, emergent]
group: prompting
aliases: [ICL, Few-shot prompting, Zero-shot prompting]
updated: 2026-06-17
sources:
  - id: brown2020
    title: "Language Models are Few-Shot Learners"
    url: https://arxiv.org/abs/2005.14165
    author: Brown et al.
    publisher: arXiv
    year: 2020
  - id: dong2023
    title: "A Survey on In-context Learning"
    url: https://arxiv.org/abs/2301.00234
    author: Dong et al.
    publisher: arXiv
    year: 2023
---

# In-context learning

**In-context learning** (ICL) is a large language model's ability to take on a new
task purely from what it is shown in the prompt — an instruction, and perhaps a few
worked examples — with no change to its weights. The task is not trained in; the
model infers it on the fly, within a single forward pass, from the context it is
given.

The capability was popularized by the [[GPT-3]] paper, whose title — *Language
Models are Few-Shot Learners* — states the thesis out loud. GPT-3, the authors
wrote, "is applied without any gradient updates or fine-tuning, with tasks and
few-shot demonstrations specified purely via text interaction with the
model."[^brown2020]

## Zero-, one-, and few-shot

Brown and colleagues framed in-context learning as a spectrum of how many examples
the prompt provides:[^brown2020]

- **Zero-shot** — "no demonstrations are allowed, and the model is only given a
  natural language instruction describing the task."
- **One-shot** — the instruction plus a single worked example.
- **Few-shot** — "a few demonstrations of the task at inference time as
  conditioning, but no weight updates are allowed," typically a handful to a few
  dozen examples that all have to fit inside the model's [[Context window]].

These are points on one continuum, not rival methods — they differ only in how much
task-specific data the prompt carries.[^brown2020]

## Why it mattered

In-context learning changed how the field uses models. The earlier paradigm was to
fine-tune a *separate* model for every task; ICL made it possible to take a single
general model and steer it to thousands of tasks through the prompt
alone.[^brown2020] That shift is what put prompting — and the practice of
[[Prompt engineering]] — at the center of working with LLMs, and specific
techniques such as [[Chain-of-thought prompting]] are refinements built on top of
it.

## An open question

It is worth being honest that *why* in-context learning works is still an open
research question. The behavior is robust and easy to observe, but its underlying
mechanism remains debated; surveys of the area catalog several competing
explanations rather than a settled one.[^dong2023] This entry describes the
phenomenon — it does not claim to explain it.
