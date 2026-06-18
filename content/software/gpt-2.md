---
title: GPT-2
description: OpenAI's 2019 language model, remembered less for its capabilities than for the staged release that launched the modern debate over whether to publish model weights.
technicality: technical
tags: [model, milestone]
aliases: [Generative Pre-trained Transformer 2]
date: 2019-02-14
updated: 2026-06-17
sources:
  - id: radford2019
    title: "Language Models are Unsupervised Multitask Learners"
    url: https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf
    author: "Radford, Wu, Child, Luan, Amodei, Sutskever"
    publisher: OpenAI
    year: 2019
  - id: better-lm
    title: "Better Language Models and Their Implications"
    url: https://openai.com/index/better-language-models/
    author: OpenAI
    publisher: OpenAI
    year: 2019
  - id: gpt2-15b
    title: "GPT-2: 1.5B Release"
    url: https://openai.com/index/gpt-2-1-5b-release/
    author: OpenAI
    publisher: OpenAI
    year: 2019
  - id: solaiman2019
    title: "Release Strategies and the Social Impacts of Language Models"
    url: https://arxiv.org/abs/1908.09203
    author: "Solaiman et al."
    publisher: arXiv
    year: 2019
---

# GPT-2

**GPT-2** is the language model [[OpenAI]] released in 2019 — the successor to the
original GPT and the direct predecessor of [[GPT-3]]. Technically it was a
1.5-billion-parameter decoder-only [[Transformer]] trained on a large web corpus,
described in the paper *Language Models are Unsupervised Multitask Learners*; its
headline result was strong **zero-shot** performance, handling tasks it had never
been explicitly trained for.[^radford2019] But GPT-2 is remembered less for what it
did than for *how it was released*.

## The staged release

When OpenAI announced GPT-2 on February 14, 2019, it did something unusual for a
research lab: it **withheld the full model**, publishing only a small version and
citing concern that the technology could be used to generate misleading news,
impersonate people, or automate abuse.[^better-lm] Instead of releasing everything
at once, OpenAI [[GPT-2 staged release|rolled the model out in stages]] over the
year — a 124M-parameter
version in February, 355M in May, 774M in August, and finally the full
1.5-billion-parameter model on November 5, 2019, by which point it reported having
"seen no strong evidence of misuse so far."[^gpt2-15b]

OpenAI framed the staged approach as buying time to study the technology: releasing
in stages allowed "time between model releases to conduct risk and benefit
analyses," documented in an accompanying study of release strategies and the social
impacts of language models.[^solaiman2019]

## Why it mattered

GPT-2's capabilities were eclipsed by [[GPT-3]] a year later, but the release
decision left a lasting mark. GPT-2 is the origin of the modern debate over whether
and how to publish powerful model weights — the "release norms" question that every
later open-versus-closed decision echoes. Its initial withholding also helped
motivate independent **open-replication** efforts such as [[EleutherAI]]. The
episode is the founding case for the broader idea of
[[Staged and responsible release]].
