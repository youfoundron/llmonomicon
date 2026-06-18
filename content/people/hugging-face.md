---
title: Hugging Face
description: The company and its Hub — the platform where open models, datasets, and demos are published and downloaded, making it the distribution layer of the open-model ecosystem.
technicality: non-technical
tags: [organization, company, platform]
aliases: [HF, Hugging Face Hub, The Hub]
updated: 2026-06-17
sources:
  - id: hforg
    title: "Hugging Face — the AI community building the future (organization page)"
    url: https://huggingface.co/huggingface
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
  - id: wiki
    title: "Hugging Face"
    url: https://en.wikipedia.org/wiki/Hugging_Face
    publisher: Wikipedia
    year: 2026
---

# Hugging Face

**Hugging Face** is the company — and, through its **Hub**, the platform — that
turned "open weights" from a possibility into something anyone could actually
reach. The model weights themselves come from many labs, but Hugging Face is where
most of them are published, discovered, and downloaded, which makes it the de
facto distribution layer of the open-model ecosystem.[^hforg] It is distinct from
the [[Hugging Face Transformers]] library, which the same company maintains.

## From chatbot to platform

Hugging Face was founded in 2016 in New York by three French entrepreneurs —
Clément Delangue, Julien Chaumond, and Thomas Wolf.[^wiki] It began, improbably,
as a chatbot app aimed at teenagers; after the company open-sourced the model
behind it, that open-source work — not the chatbot — became the business, and
Hugging Face pivoted into machine-learning infrastructure.[^wiki] (The name comes
from the 🤗 "hugging face" emoji.)

## The Hub

The heart of Hugging Face is the **Hub**, which hosts three kinds of artifact:
**models**, **datasets**, and **Spaces** (interactive demos).[^hforg] The company
frames its mission as to "democratize good machine learning, one commit at a
time," and in practice the Hub is where open models live — [[LLaMA]] derivatives,
Mistral's releases, BLOOM, and countless community fine-tunes.[^hforg] This
matters because [[Open weights|open weights]] are only useful if people can find
and download them: the Hub is the access mechanism that makes the [[Local LLMs]]
story possible, complementing the [[Hugging Face Transformers]] library that loads
and runs those models in code.

## BigScience and BLOOM

Hugging Face has also driven open research directly. In 2021 it launched the
[[BigScience]] Research Workshop, a large multi-institution collaboration to build
an open large language model; the effort concluded in 2022 with [[BLOOM]], a
multilingual model of 176 billion parameters.[^wiki]
