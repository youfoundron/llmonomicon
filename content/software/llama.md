---
title: LLaMA
description: Meta's February 2023 family of efficient foundation models (7B–65B) — released only to researchers, then leaked within weeks — that sparked the open-weight movement.
technicality: technical
tags: [model, milestone]
aliases: [LLaMA 1, Llama 1, LLaMA (Meta)]
updated: 2026-06-18
sources:
  - id: llama-paper
    title: "LLaMA: Open and Efficient Foundation Language Models"
    url: https://arxiv.org/abs/2302.13971
    author: Touvron et al.
    publisher: "arXiv (Meta AI)"
    year: 2023
  - id: meta-blog
    title: "Introducing LLaMA: A foundational, 65-billion-parameter large language model"
    url: https://ai.meta.com/blog/large-language-model-llama-meta-ai/
    author: Meta AI
    publisher: Meta
    year: 2023
  - id: llama-wiki
    title: "Llama (language model) (Wikipedia)"
    url: "https://en.wikipedia.org/wiki/Llama_(language_model)"
    publisher: Wikipedia
    year: 2025
---

# LLaMA

**LLaMA** is the family of foundation models that [[Meta AI|Meta]] announced on **24
February 2023**[^meta-blog] — and, more than any single release, the spark of the
**[[Open weights|open-weight]]** era. It came in four sizes, from **7 billion to 65
billion parameters**, and made a pointed claim for the time: that a comparatively small
model, trained well, could rival the giants.[^llama-paper][^meta-blog] This entry covers
that first release; its successors are covered under [[Llama 2]].

## Small but competitive

The accompanying paper — "LLaMA: Open and Efficient Foundation Language Models" (Touvron
et al., Meta AI) — argued that "it is possible to train state-of-the-art models using
**publicly available datasets exclusively**, without resorting to proprietary and
inaccessible datasets."[^llama-paper] Its headline result was that smaller can beat
bigger: "**LLaMA-13B outperforms GPT-3 (175B) on most benchmarks**," and the largest
model, LLaMA-65B, held its own against the best systems of the day, Chinchilla-70B and
PaLM-540B.[^llama-paper] A 13-billion-parameter model besting a 175-billion-parameter
[[GPT-3]] was a strong signal that careful training mattered as much as raw scale — and,
just as importantly, that a capable model could be small enough to run outside a data
center.

## Released to researchers — then leaked

LLaMA was **not** an open release. Meta handed out the weights only on request: "we are
releasing our model under a **noncommercial license focused on research use cases**,"
with access "granted on a **case-by-case basis** to academic researchers … and industry
research laboratories."[^meta-blog] That restriction did not hold. "On **March 3, 2023**,
a torrent containing Llama's weights was uploaded, with a link to the torrent shared on
the **4chan** imageboard and subsequently spread through online AI communities."[^llama-wiki]
Meta filed takedown requests on March 6, calling it "unauthorized distribution."[^llama-wiki]
So LLaMA's weights reached the public through a **[[LLaMA weights leak|leak]]**, not an
official open-source release — a distinction the [[Open weights|open-weights]] debate
often blurs.

## The wave it started

Whatever Meta intended, the mix of strong-yet-small models and freely circulating weights
set off an explosion of derivative work within days. Stanford released **[[Alpaca]]**, "a
training recipe based on the Llama 7B model" that cheaply turned it into an
instruction-following assistant.[^llama-wiki] Georgi Gerganov released **[[llama.cpp]]** on
**March 10, 2023**, reimplementing LLaMA in C/C++ so it could run on ordinary
laptops[^llama-wiki] — the project that, with the [[GGUF]] format, would anchor the
[[Local LLMs|local-LLM]] movement. For the first time, individuals and small labs could
run a frontier-adjacent model on their own hardware. That, more than any benchmark, is
LLaMA's lasting significance: the moment open weights became unstoppable.
