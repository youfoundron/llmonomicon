---
title: OpenAI
description: The research organization behind the GPT series and ChatGPT, central to the modern LLM era.
technicality: non-technical
tags: [organization, lab]
aliases: [Open AI]
updated: 2026-06-18
sources:
  - id: intro2015
    title: "Introducing OpenAI"
    url: https://openai.com/index/introducing-openai/
    author: OpenAI
    publisher: OpenAI
    year: 2015
  - id: openai-lp
    title: "OpenAI LP"
    url: https://openai.com/index/openai-lp/
    author: OpenAI
    publisher: OpenAI
    year: 2019
  - id: openai-chatgpt
    title: "Introducing ChatGPT"
    url: https://openai.com/index/chatgpt/
    author: OpenAI
    publisher: OpenAI
    year: 2022
  - id: gpt4
    title: "GPT-4 Technical Report"
    url: https://arxiv.org/abs/2303.08774
    author: OpenAI
    publisher: arXiv
    year: 2023
  - id: wiki-gpt5
    title: "GPT-5"
    url: https://en.wikipedia.org/wiki/GPT-5
    publisher: Wikipedia
    year: 2025
  - id: wiki-gpt56
    title: "GPT-5.6"
    url: https://en.wikipedia.org/wiki/GPT-5.6
    publisher: Wikipedia
    year: 2026
  - id: openai-msft-2023
    title: "OpenAI and Microsoft extend partnership"
    url: https://openai.com/index/openai-and-microsoft-extend-partnership/
    author: OpenAI
    publisher: OpenAI
    year: 2023
  - id: founders-wiki
    title: "John Schulman (Wikipedia)"
    url: https://en.wikipedia.org/wiki/John_Schulman
    publisher: Wikipedia
    year: 2025
---

# OpenAI

**OpenAI** is an artificial-intelligence research organization founded in December
2015, originally as a non-profit with the stated mission of ensuring that artificial
general intelligence benefits all of humanity.[^intro2015] It was started by a group
that included **[[Sam Altman]]** (now its CEO), **[[Elon Musk]]**, **[[Ilya Sutskever]]**
(its longtime chief scientist), and **[[Greg Brockman]]** (its president), along with
researchers such as **[[Andrej Karpathy]]** and **[[John Schulman]]**.[^intro2015][^founders-wiki]

In 2019 it restructured into a "capped-profit" entity — one in which investor and
employee returns are limited to a multiple of the original investment, with any surplus
flowing back to the controlling non-profit — a structure meant to raise the capital
needed for large-scale model training while preserving the mission.[^openai-lp]

## Why it matters here

OpenAI built and released the [[GPT-3|GPT]] series of decoder-only [[Transformer]]
models, and its November 2022 [[ChatGPT launch]] brought large language models into the
mainstream.[^openai-chatgpt] It followed with **GPT-4**, a large multimodal model, in
March 2023,[^gpt4] and has since expanded into agentic developer tools such as the
[[Codex]] coding agent, while its [[DALL·E]] line had earlier brought text-to-image
generation to the mainstream. In August 2025 it launched the [[GPT-5]] family — a
unified system that routes between a fast model and a deeper reasoning model — and has
since advanced it through GPT-5.6 in July 2026.[^wiki-gpt5][^wiki-gpt56] Its products and
research recur throughout the grimoire as reference points for capability, scale, and
alignment techniques such as [[RLHF|reinforcement learning from human feedback]].

## Microsoft and the compute behind the models

OpenAI's scale-up was underwritten by a deep partnership with **Microsoft**, which
invested in 2019 and 2021 and, in January 2023, announced a "multiyear, multibillion
dollar" extension; OpenAI's models are trained and served on Microsoft's Azure
supercomputing infrastructure.[^openai-msft-2023] That partnership funded the compute
behind ChatGPT and GPT-4.

## The 2023 board crisis

In November 2023 OpenAI's board abruptly removed Altman as CEO and then reinstated him
within days, with [[Mira Murati]] serving briefly as interim CEO; the full story is its
own entry, the [[OpenAI board crisis]].

This page is filed under **People & Organizations** alongside individual researchers
like [[Geoffrey Hinton]] and peer labs like [[Anthropic]], since institutions are as
much a part of the story as individuals.
