---
title: GPT-3
description: OpenAI's 175-billion-parameter model that demonstrated few-shot learning and helped kick off the modern LLM era.
tags: [model, milestone]
aliases: [GPT-3.5, Generative Pre-trained Transformer 3]
date: 2020-05-28
updated: 2026-06-17
---

# GPT-3

**GPT-3** (Generative Pre-trained Transformer 3) is a decoder-only
[[Transformer]] language model released by OpenAI in 2020, described in the paper
*"Language Models are Few-Shot Learners."* With 175 billion parameters, it was an
order of magnitude larger than its predecessors.

## The key result

GPT-3's headline finding was **in-context, few-shot learning**: without any
gradient updates, the model could perform a new task simply from a few examples
provided in its prompt. Scaling the model and its training data produced
qualitatively new capabilities, lending weight to the idea that scale alone could
unlock generality.

## Influence

- It established the **decoder-only, prompt-driven** paradigm as the dominant
  design for general-purpose LLMs.
- A fine-tuned successor, **GPT-3.5**, powered the original
  [[ChatGPT launch]] in 2022.
- It set off an industry-wide race to train ever-larger models, building on the
  foundation of [[Attention Is All You Need]].
