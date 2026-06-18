---
title: Staged and responsible release
description: The norm—and the debate—around whether and how to release a model's weights, born from OpenAI's staged release of GPT-2 in 2019.
tags: [safety, governance, open-weights]
group: safety
aliases: [Staged release, Responsible release, Release strategy]
updated: 2026-06-18
sources:
  - id: solaiman2019
    title: "Release Strategies and the Social Impacts of Language Models"
    url: https://arxiv.org/abs/1908.09203
    author: Solaiman et al. (OpenAI)
    publisher: arXiv
    year: 2019
  - id: gpt2-release
    title: "GPT-2: 1.5B Release"
    url: https://openai.com/index/gpt-2-1-5b-release/
    author: OpenAI
    publisher: OpenAI
    year: 2019
---

# Staged and responsible release

**Staged and responsible release** is the set of norms — and the running debate —
around *whether and how* to publish a powerful model's weights. The idea was born from
OpenAI's handling of [[GPT-2]] in 2019, and it remains the lens through which every
later open-versus-closed decision is argued.

## The GPT-2 case

When OpenAI announced GPT-2 in February 2019 it withheld the full model, citing the
risk that it could be used for spam or disinformation, and released progressively
larger versions over the year — 124M, then 355M, then 774M, and finally the full 1.5B
in November 2019.[^solaiman2019] The point of a **staged release**, in OpenAI's
framing, was to allow "time between model releases to conduct risk and benefit
analyses."[^solaiman2019] The underlying worry is **dual use**: the same capability
that helps people write or code can also be misused. At the full release, OpenAI said
it had seen "no strong evidence of misuse so far."[^gpt2-release]

## The counter-argument

The approach was contested from the start. Critics argued it amounted to **security
through obscurity** — that withholding weights does not durably prevent a capability
from spreading, and may even *accelerate* independent open replication as others rush
to rebuild what was held back. GPT-2-scale models were in fact reproduced in the open,
an effort the community later institutionalized through groups like [[EleutherAI]]. The
GPT-2 "no misuse" outcome is itself read both ways — as vindication of caution, or as
evidence the danger was overstated.

## Beyond GPT-2

The episode seeded a broader vocabulary for release decisions: **structured access**
(offering a model through an API rather than as downloadable weights), publication
norms, and model-card-style disclosures. It is the concept that the later
weight-release episodes — the [[LLaMA weights leak]], Mistral's torrent drop, and the
rise of [[Open weights]] generally — all argue with or against.
