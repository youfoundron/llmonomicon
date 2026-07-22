---
title: GPT-4
description: OpenAI's first multimodal flagship model, launched in March 2023, whose closed-weights lineage runs through GPT-4V, GPT-4 Turbo, GPT-4o, and GPT-4.1.
tags: [model, product, multimodal]
technicality: technical
aliases: [GPT-4o, GPT-4 Turbo, GPT-4V, GPT-4.1]
updated: 2026-07-22
sources:
  - id: openai2023gpt4
    title: "GPT-4 Technical Report"
    url: https://arxiv.org/abs/2303.08774
    author: OpenAI
    publisher: arXiv
    year: 2023
  - id: bubeck2023sparks
    title: "Sparks of Artificial General Intelligence: Early experiments with GPT-4"
    url: https://arxiv.org/abs/2303.12712
    author: Bubeck et al.
    publisher: arXiv
    year: 2023
  - id: openai-gpt4-research
    title: "GPT-4"
    url: https://openai.com/index/gpt-4-research/
    author: OpenAI
    publisher: OpenAI
    year: 2023
  - id: wiki-gpt4
    title: "GPT-4"
    url: https://en.wikipedia.org/wiki/GPT-4
    publisher: Wikipedia
    year: 2023
  - id: openai-gpt4v-system-card
    title: "GPT-4V(ision) System Card"
    url: https://openai.com/index/gpt-4v-system-card/
    author: OpenAI
    publisher: OpenAI
    year: 2023
  - id: openai-devday-2023
    title: "New models and developer products announced at DevDay"
    url: https://openai.com/index/new-models-and-developer-products-announced-at-devday/
    author: OpenAI
    publisher: OpenAI
    year: 2023
  - id: openai-gpt4o
    title: "Hello GPT-4o"
    url: https://openai.com/index/hello-gpt-4o/
    author: OpenAI
    publisher: OpenAI
    year: 2024
  - id: wiki-gpt4o
    title: "GPT-4o"
    url: https://en.wikipedia.org/wiki/GPT-4o
    publisher: Wikipedia
    year: 2024
  - id: openai-gpt41
    title: "Introducing GPT-4.1 in the API"
    url: https://openai.com/index/gpt-4-1/
    author: OpenAI
    publisher: OpenAI
    year: 2025
  - id: wiki-gpt41
    title: "GPT-4.1"
    url: https://en.wikipedia.org/wiki/GPT-4.1
    publisher: Wikipedia
    year: 2025
---

# GPT-4

**GPT-4** is a large, closed-weights [[Multimodal models|multimodal]] model built by
[[OpenAI]] that accepts both image and text inputs and produces text
outputs.[^openai2023gpt4] OpenAI announced it on **14 March 2023**, as the successor to
[[GPT-3]] and the model that first put "reads a picture and reasons about it" into a
mainstream chat product.[^wiki-gpt4] Rather than a single, static release, GPT-4 turned
out to be a **lineage**: OpenAI kept shipping updated versions under related names —
GPT-4V, GPT-4 Turbo, GPT-4o, and GPT-4.1 — through mid-2025, each cheaper, faster, or
more capable than the last.

Unlike the [[Open weights|open-weight]] models covered elsewhere in this wiki, OpenAI
has never published GPT-4's weights or training data, and its technical report
deliberately withheld architectural details such as parameter count, citing "the
competitive landscape and the safety implications of large-scale models."[^openai2023gpt4]
No parameter count is claimed here for that reason; figures circulating elsewhere are
unconfirmed rumors, not disclosures.

## Launch and reception

At launch, OpenAI reported that GPT-4 reached human-level performance on a range of
professional and academic benchmarks, including a simulated bar exam, where it scored
around the top 10% of test takers — a marked jump over GPT-3.5.[^openai2023gpt4] The
result that most shaped public discussion of the model, however, came from outside
OpenAI: on **22 March 2023**, Microsoft researchers published *"Sparks of Artificial
General Intelligence: Early experiments with GPT-4,"* arguing that an early version of
the model could reasonably be viewed as an early, incomplete instance of
[[Artificial general intelligence|artificial general intelligence]].[^bubeck2023sparks]
The paper was influential — and contested — for putting the "AGI" label on a
commercial product rather than a research prototype.

## The lineage: from text-only to omni

GPT-4 shipped as text-only at launch; vision, speed, and cost improvements arrived in
stages over the following two years:

- **GPT-4V** ("vision") gave GPT-4 the ability to analyze user-supplied images. OpenAI
  detailed its behavior and risks in a system card and rolled it out broadly around
  **25 September 2023**.[^openai-gpt4v-system-card][^wiki-gpt4]
- **GPT-4 Turbo**, announced at OpenAI's first DevDay on **6 November 2023**, extended
  the context window to 128,000 tokens (up from GPT-4's original 8K/32K) and cut
  per-token pricing relative to the original model.[^openai-devday-2023][^wiki-gpt4]
- **GPT-4o** ("omni"), launched on **13 May 2024**, was OpenAI's first natively
  multimodal flagship — a single model handling text, audio, and images together, able
  to hold near-real-time spoken conversations.[^openai-gpt4o] It was also the first time
  OpenAI's best model was made available to free-tier ChatGPT users, while matching or
  exceeding GPT-4-class quality (for instance, 88.7 vs. 86.5 on the [[MMLU]] benchmark)
  at lower cost.[^wiki-gpt4o] The launch itself is covered separately by the
  [[GPT-4o launch]] event.
- **GPT-4.1**, released via the API on **14 April 2025** alongside smaller Mini and
  Nano variants, emphasized coding performance and a much longer context window (up to
  1 million tokens); it reached ChatGPT Plus and Pro subscribers the following month.[^openai-gpt41][^wiki-gpt41]

## Why it matters here

GPT-4 set the template that later flagship releases — including [[GPT-5]] — would
follow: a closed-weights, multimodal model sold as a hosted API and chat product,
iterated through frequent point releases rather than one fixed version. It also
sharpened an ongoing debate about evaluating frontier models, feeding directly into
discussion of [[Reasoning models|reasoning]] capability and what counts as meaningful
progress toward general intelligence.
