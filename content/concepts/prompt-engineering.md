---
title: Prompt engineering
description: The practice of designing an LLM's text input to get reliable outputs — exploiting in-context learning — its core levers, and its honest limits as part-craft, part-folklore.
technicality: somewhat-technical
tags: [prompting, craft]
group: prompting
aliases: [Prompting, Prompt design]
updated: 2026-06-18
sources:
  - id: gpt3
    title: "Language Models are Few-Shot Learners"
    url: https://arxiv.org/abs/2005.14165
    author: Brown et al.
    publisher: "arXiv (OpenAI)"
    year: 2020
  - id: liu2021
    title: "Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in NLP"
    url: https://arxiv.org/abs/2107.13586
    author: Liu et al.
    publisher: arXiv
    year: 2021
---

# Prompt engineering

**Prompt engineering** is the practice of crafting the text you give a language
model so that it produces reliable, useful output. Because a modern LLM is not
retrained for each task but instead **conditions on whatever it is shown**, the
prompt effectively *is* the task specification — and the model's behavior turns out
to be strikingly sensitive to how that prompt is worded, structured, and
exemplified.[^gpt3] This entry is about the practice and its limits; the underlying
capability it exploits is [[In-context learning]].

## Why it exists

GPT-3 demonstrated that a large model could perform new tasks given only "tasks
and few-shot demonstrations specified purely via text interaction," "without any
gradient updates or fine-tuning."[^gpt3] A 2021 survey framed the resulting
paradigm as "Pre-train, Prompt, and Predict": rather than adapt the model to the
task, you reformulate the task into a textual prompt — a template with "some
unfilled slots" — that the frozen, pre-trained model completes.[^liu2021] The consequence is
that the prompt becomes a significant variable in its own right, where small
changes in wording or examples can swing results substantially.[^liu2021]

## The core levers

Prompt engineering works through a handful of recurring levers — not a fixed
recipe, but the dimensions practitioners adjust:

- **Instructions and system prompts** that set the model's role and task.
- **Few-shot examples** — demonstrations of the desired input–output behavior placed
  directly in the prompt.
- **Output-format specification** — stating exactly what shape the answer should take.
- **Decomposition** — breaking a hard task into smaller prompted steps.

For two important structured cases, see [[Chain-of-thought prompting]] (eliciting
step-by-step reasoning) and [[Constrained decoding]] (forcing output to match a
required format far more reliably than a prompt alone can).

## An honest assessment

Prompt engineering is part empirical craft, part folklore. The *sensitivity* it
exploits is real and measurable — prompts genuinely are a key variable.[^liu2021]
But specific "best practices" are largely empirical, often found by trial and
error, and they **shift as models improve**: behavior that once demanded careful
prompting or elaborate tricks is increasingly handled by newer models given plain
instructions. It also sits in tension with more robust alternatives — **fine-tuning**
changes the model itself, and **constrained decoding** enforces structure
mechanically rather than by request. And the very sensitivity that makes prompting
powerful is what makes [[Prompt injection]] possible: if rewording the input can
change behavior, so can a malicious instruction smuggled into it.
