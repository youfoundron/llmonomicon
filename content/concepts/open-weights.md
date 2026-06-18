---
title: Open weights
description: What it means to release a model's trained parameters for download — and why "open weights" is not the same as "open source."
tags: [open-weights, licensing]
group: inference
aliases: [open-weight, open weight, open-weight models, open-weights model]
updated: 2026-06-17
sources:
  - id: osi-osaid
    title: "The Open Source AI Definition 1.0"
    url: https://opensource.org/ai/open-source-ai-definition
    author: Open Source Initiative
    publisher: OSI
    year: 2024
  - id: llama2-license
    title: "Llama 2 Community License Agreement"
    url: https://ai.meta.com/llama/license/
    author: Meta
    publisher: Meta
    year: 2023
  - id: gemma-terms
    title: "Gemma Terms of Use"
    url: https://ai.google.dev/gemma/terms
    author: Google
    publisher: Google
    year: 2024
---

# Open weights

A model is **open-weights** when its trained parameters — the actual numbers
learned during training — are released for anyone to download, run, fine-tune, and
redistribute on their own hardware, with no API gatekeeping. It is the
precondition for the entire [[Local LLMs|local-model]] movement: you cannot run,
[[Quantization|quantize]], or repackage a model you can only reach through someone
else's API. But "open weights" is a narrower and more slippery idea than "open
source," and the difference matters.

## The spectrum of openness

Access to a model runs along a spectrum:

- **Closed / API-only.** The weights never leave the provider; you send prompts to
  an API and rent inference. Frontier proprietary models like GPT-4, [[Gemini]],
  and [[Claude]] work this way.
- **Open weights, with restrictions.** The weights are downloadable, but under a
  custom license that attaches conditions. Meta's Llama 2 Community License, for
  instance, pairs an acceptable-use policy with a clause requiring that "if … the
  monthly active users … is greater than 700 million … you must request a license
  from Meta."[^llama2-license] Google's [[Gemma]] ships under a comparable terms of
  use with a prohibited-use policy.[^gemma-terms] Downloadable does not mean
  unrestricted.
- **Fully open source.** The model meets a recognized open-source standard (below),
  typically under a permissive license such as Apache 2.0.

## Open weights is not open source

This is the crux, and it is widely muddled. In October 2024 the Open Source
Initiative published its **Open Source AI Definition**, which grants four freedoms
— to use, study, modify, and share the system — and requires that three things be
made available under OSI-approved terms: information about the training data, the
source code used to train and run the system, and the model parameters
themselves.[^osi-osaid] Releasing only the weights, under a custom license, does
not meet that bar. So most models marketed as "open" are precisely **open weights,
not open source**: you can download and run them, but you do not get the training
data or code, and the license may limit how you use them.[^osi-osaid] Being clear
about that distinction is part of reading the field honestly.

## Why it matters

Open weights are what make the rest of the local thread possible. Only with the
actual parameters in hand can you run a model on your own machine,
[[Quantization|quantize]] it to fit in consumer memory, package it as a [[GGUF]]
file, and serve it with an engine like [[llama.cpp]] — the whole [[Local LLMs]]
story. Meta's [[LLaMA]] release in 2023 is widely credited with catalyzing the
open-weights wave, and the legal mechanics of the licenses involved are covered
under [[Model licensing]].
