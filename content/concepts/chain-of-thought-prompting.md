---
title: Chain-of-thought prompting
description: A prompting technique that asks a model to work through intermediate reasoning steps before answering, sharply improving its performance on multi-step problems.
technicality: somewhat-technical
tags: [prompting, reasoning, emergent]
group: prompting
aliases: [Chain of thought, CoT, Zero-shot CoT]
updated: 2026-06-17
sources:
  - id: wei2022
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models"
    url: https://arxiv.org/abs/2201.11903
    author: Wei et al.
    publisher: arXiv
    year: 2022
  - id: kojima2022
    title: "Large Language Models are Zero-Shot Reasoners"
    url: https://arxiv.org/abs/2205.11916
    author: Kojima et al.
    publisher: arXiv
    year: 2022
---

# Chain-of-thought prompting

**Chain-of-thought prompting** (CoT) is a simple but powerful idea: instead of
asking a model for an answer directly, you prompt it to produce "a series of
intermediate reasoning steps" and work through the problem first.[^wei2022] On
multi-step tasks — arithmetic word problems, commonsense and symbolic reasoning —
that "thinking out loud" markedly improves the result.

The original result was striking. Wei and colleagues showed that prompting a large
model with worked, step-by-step examples lifted PaLM 540B on the [[GSM8K]]
grade-school math benchmark from 17.9% to 56.9% — more than tripling its accuracy
and beating the prior fine-tuned state of the art.[^wei2022]

## Emergent with scale

An important caveat is that chain-of-thought is an **emergent ability of model
scale**: in Wei et al.'s experiments it mainly helped sufficiently large models (on
the order of 100 billion parameters) and could actually *hurt* smaller ones, which
tend to produce fluent but illogical chains.[^wei2022] It is not a free trick that
works on any model.

## Few-shot and zero-shot

There are two main flavors:

- **Few-shot CoT** (Wei et al., 2022) — the prompt includes a few examples that
  demonstrate the desired step-by-step reasoning.[^wei2022]
- **Zero-shot CoT** (Kojima et al., 2022) — no examples at all; you simply append a
  cue such as **"Let's think step by step"** before the answer. The authors found
  that "LLMs are decent zero-shot reasoners by simply adding 'Let's think step by
  step' before each answer," which on one model lifted a multi-step arithmetic
  benchmark from 17.7% to 78.7%.[^kojima2022]

## Where it leads

Chain-of-thought is a [[Prompt engineering|prompting]] technique that exploits
[[In-context learning]] — a model's ability to be steered by its prompt — and it
opened a long line of follow-up work. [[Self-consistency]] samples many independent
reasoning chains and takes a majority vote over their answers; and the idea was
eventually folded into training itself, with
[[Reasoning models (test-time compute)]] learning to generate long chains of
thought by default rather than needing a prompt to coax them out.
