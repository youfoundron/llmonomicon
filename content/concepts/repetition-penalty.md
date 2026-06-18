---
title: Repetition penalty
description: A family of decoding knobs—repetition, frequency, and presence penalties—that discourage a model from repeating itself by down-weighting tokens it has already used.
tags: [sampling, decoding, generation]
group: decoding
aliases: [Repetition penalties, Frequency penalty, Presence penalty]
updated: 2026-06-18
sources:
  - id: keskar2019
    title: "CTRL: A Conditional Transformer Language Model for Controllable Generation"
    url: https://arxiv.org/abs/1909.05858
    author: Keskar, McCann, Varshney, Xiong & Socher
    publisher: arXiv
    year: 2019
  - id: openai-penalties
    title: "Advanced usage: frequency and presence penalties — OpenAI API documentation"
    url: https://developers.openai.com/api/docs/guides/advanced-usage
    author: OpenAI
    publisher: OpenAI
    year: 2024
---

# Repetition penalty

**Repetition penalties** are decoding-time controls that discourage a model from
repeating itself, by lowering the probability of tokens it has already produced before
the next token is sampled. They counter the loops and verbatim repetition that
otherwise plague generation — especially with greedy decoding, low
[[Temperature (sampling)|temperature]], or smaller models. Three closely related knobs
show up across APIs and runners, and because they are easy to confuse, the useful thing
is to see exactly how they differ.

## The three knobs

- **Repetition penalty** (from the CTRL model) is **multiplicative**: it divides the
  score of any token that has *already appeared* by a fixed factor before the softmax.
  The CTRL authors recommend a factor of about θ≈1.2 with greedy decoding as a good
  balance between coherent generation and avoiding repetition.[^keskar2019]
- **Frequency penalty** (OpenAI) is **additive** and scales with **count**: it
  subtracts an amount proportional to *how many times* a token has already been used,
  so a token that keeps recurring is penalized harder each time.[^openai-penalties]
- **Presence penalty** (OpenAI) is also **additive** but keyed on **presence**: it
  subtracts a flat amount from any token that has appeared *at all*, regardless of how
  often.[^openai-penalties]

Two distinctions capture the whole family: **multiplicative vs. additive** — the
repetition penalty *divides* the scores, while the OpenAI penalties *subtract* from
them — and **count vs. presence** — the frequency penalty grows with *how often* a
token appeared, whereas the presence and repetition penalties fire on whether it
appeared *at all*.

## Using them

These penalties are a balancing act. Set too low and the model still loops; set too
high and it avoids even natural, necessary repetition, drifting off-topic or reading
awkwardly. OpenAI notes that values pushed toward the maximum "can noticeably degrade
the quality of samples," and recommends small values (roughly 0.1 to 1) for gentle
de-duplication.[^openai-penalties]

They are distinct from the other generation knobs: where [[Temperature (sampling)]]
reshapes the whole distribution and [[Top-k & top-p (nucleus) sampling]] truncates its
tail, repetition penalties **target specific tokens based on what has already been
generated**. For how all of these fit together, see [[Decoding strategies]].
