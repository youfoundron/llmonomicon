---
title: ChatGPT launch
description: OpenAI's November 2022 release of ChatGPT, the moment LLMs entered the mainstream.
tags: [product, milestone]
aliases: [ChatGPT]
date: 2022-11-30
updated: 2026-06-17
sources:
  - id: openai-chatgpt
    title: "Introducing ChatGPT"
    url: https://openai.com/index/chatgpt/
    author: OpenAI
    publisher: OpenAI
    year: 2022
  - id: reuters-100m
    title: "ChatGPT sets record for fastest-growing user base — analyst note"
    url: https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/
    author: Krystal Hu
    publisher: Reuters
    year: 2023
  - id: instructgpt
    title: "Training language models to follow instructions with human feedback"
    url: https://arxiv.org/abs/2203.02155
    author: Ouyang et al.
    publisher: arXiv
    year: 2022
---

# ChatGPT launch

On **30 November 2022**, OpenAI released **ChatGPT**, a conversational interface
to a fine-tuned [[GPT-3|GPT-3.5]] model.[^openai-chatgpt] Free to use and
strikingly fluent, it was reported to have reached an estimated hundred million
users within two months — among the fastest consumer-product adoptions on
record.[^reuters-100m]

## What was new

The underlying models were not entirely new; what changed was **packaging and
alignment**:

- A simple chat interface lowered the barrier to entry to typing a
  sentence.[^openai-chatgpt]
- **Reinforcement learning from human feedback** (RLHF) made responses more
  helpful and better at following instructions than the raw base model — the
  technique detailed in OpenAI's InstructGPT work.[^instructgpt]

## Why it mattered

ChatGPT turned large language models from a research curiosity into a household
term. It triggered a wave of competing assistants, a surge of investment, and an
intense public conversation about the capabilities and risks of the
[[Transformer]]-based systems that had been maturing since
[[Attention Is All You Need]].
