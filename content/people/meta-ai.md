---
title: Meta AI
description: Meta's AI research organization (formerly FAIR), the most influential force in open-weight models—the lab behind PyTorch, LLaMA, and FAISS.
technicality: non-technical
tags: [lab, open-weights]
aliases: [FAIR, Facebook AI Research, Meta FAIR, Meta AI / FAIR]
updated: 2026-06-17
sources:
  - id: meta-wiki
    title: "Meta AI (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Meta_AI
    publisher: Wikipedia
    year: 2025
  - id: meta-llama
    title: "Introducing LLaMA: A foundational, 65-billion-parameter large language model"
    url: https://ai.meta.com/blog/large-language-model-llama-meta-ai/
    author: Meta AI
    publisher: Meta
    year: 2023
---

# Meta AI

**Meta AI** is the artificial-intelligence research organization of Meta (formerly
Facebook). It is the open-weight counterpart to [[OpenAI]]: where OpenAI moved toward
closed, API-only models, Meta became the most influential force pushing model weights
into the open.

## From FAIR to Meta AI

The lab was founded in 2013 as **Facebook AI Research (FAIR)**, with **Yann LeCun**
as its first director until 2018.[^meta-wiki] It was renamed **Meta AI** after the
company's 2021 rebrand from Facebook to Meta.[^meta-wiki] Its open contributions
reach well beyond language models: FAIR released **[[PyTorch]]** in 2017, now one of the
most widely used deep-learning frameworks,[^meta-wiki] along with open tools like the
[[FAISS]] similarity-search library.

## The open-weight strategy

Meta's defining move in the LLM era was to release capable model weights for others
to use. It framed the first [[LLaMA]] release around access — putting a strong
foundation model in researchers' hands rather than behind an API[^meta-llama] — and
the family that followed ([[LLaMA]], [[Llama 2]], and their successors) became the
backbone of the open-weight ecosystem, powering local-inference tools like
[[llama.cpp]] and a vast number of community fine-tunes.

## "Open weights," with conditions

It is worth being precise about what "open" means here. PyTorch and FAISS are
genuinely open source, under standard permissive licenses. The Llama *models* are a
different case: their weights are downloadable, but they ship under Meta's own
**community license** with use restrictions — they are **open weights, not open
source** in the strict sense (see [[Open weights]] and [[Model licensing]]). That
distinction, and Meta's broader open posture, set much of the agenda for the
open-weight movement. Its most dramatic early moment was not even a deliberate
release: the [[LLaMA weights leak]].
