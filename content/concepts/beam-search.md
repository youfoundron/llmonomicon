---
title: Beam search
description: A decoding algorithm that keeps several high-probability candidate sequences at once—great for translation, but the wrong choice for open-ended generation.
technicality: technical
tags: [decoding, generation, search]
group: decoding
aliases: [Beam search decoding, Beam width]
updated: 2026-06-18
sources:
  - id: sutskever2014
    title: "Sequence to Sequence Learning with Neural Networks"
    url: https://arxiv.org/abs/1409.3215
    author: Sutskever, Vinyals & Le
    publisher: arXiv
    year: 2014
  - id: wu2016
    title: "Google's Neural Machine Translation System: Bridging the Gap between Human and Machine Translation"
    url: https://arxiv.org/abs/1609.08144
    author: Wu et al.
    publisher: arXiv
    year: 2016
  - id: holtzman2019
    title: "The Curious Case of Neural Text Degeneration"
    url: https://arxiv.org/abs/1904.09751
    author: Holtzman, Buys, Du, Forbes & Choi
    publisher: arXiv
    year: 2019
---

# Beam search

**Beam search** is a classic [[Decoding strategies|decoding]] algorithm that tries to
find a high-probability output sequence by exploring several candidates at once. Where
greedy decoding commits to the single most likely token at each step, beam search keeps
the **`b` most probable partial sequences** — the "beams" — alive simultaneously: at
every step it extends each beam by each possible next token, scores the candidates by
their cumulative probability, and prunes back to the best `b`. The original
sequence-to-sequence paper describes exactly this: "a simple left-to-right beam search
decoder which maintains a small number B of partial hypotheses."[^sutskever2014]
(Greedy decoding is just the special case where `b` = 1.)

## Beam width and length

The **beam width** `b` controls how broadly the search explores: larger is more
thorough but more expensive, with diminishing returns — Sutskever and colleagues found
their system "performs well even with a beam size of 1, and a beam of size 2 provides
most of the benefits of beam search."[^sutskever2014]

A subtlety is that beam search is biased toward **short** outputs: because each token
adds a negative log-probability, longer sequences score worse and the search tends to
stop early. As Google's machine-translation team put it, "without some form of
length-normalization regular beam search will favor shorter results over longer
ones."[^wu2016] In practice the score is divided by a length-based term to correct for
this.

## Where it works — and where it doesn't

Beam search excels at tasks with a roughly *correct* answer, such as **machine
translation** and summarization, where maximizing the probability of the output is the
right objective.[^sutskever2014][^wu2016] For **open-ended** generation — chat, stories,
creative writing — it fails, and instructively so. Beam search optimizes for the most
probable continuation, but maximizing likelihood produces dull, looping text: Holtzman
and colleagues showed that "using likelihood as a decoding objective leads to text that
is bland and strangely repetitive."[^holtzman2019] That finding is precisely why
open-ended LLM generation relies on **sampling** —
[[Top-k & top-p (nucleus) sampling]] shaped by [[Temperature (sampling)|temperature]] —
rather than searching for the single most probable continuation.
