---
title: Speculative decoding
description: A lossless inference speedup where a small draft model proposes tokens that the large model verifies in parallel, producing the same output 2–3× faster.
technicality: technical
tags: [inference, mechanism]
group: inference
aliases: [speculative sampling]
updated: 2026-06-17
sources:
  - id: leviathan2022
    title: "Fast Inference from Transformers via Speculative Decoding"
    url: https://arxiv.org/abs/2211.17192
    author: Leviathan, Kalman & Matias
    publisher: arXiv
    year: 2022
  - id: chen2023
    title: "Accelerating Large Language Model Decoding with Speculative Sampling"
    url: https://arxiv.org/abs/2302.01318
    author: Chen et al.
    publisher: arXiv
    year: 2023
  - id: medusa2024
    title: "Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads"
    url: https://arxiv.org/abs/2401.10774
    author: Cai et al.
    publisher: arXiv
    year: 2024
  - id: vllm-specdecode
    title: "Speculative Decoding (vLLM documentation)"
    url: https://docs.vllm.ai/en/latest/features/speculative_decoding/
    author: vLLM project
    publisher: vLLM
    year: 2024
---

# Speculative decoding

**Speculative decoding** is a trick for making a large [[Transformer]]-based
language model generate text faster *without changing what it generates*. A small,
fast **draft** model guesses the next several tokens; the large **target** model
then checks all of those guesses in a single parallel pass, keeping the longest
run it would have produced anyway and discarding the rest.[^leviathan2022] Because
the slow part of generation is shuttling the model's weights through memory rather
than the arithmetic itself, verifying several proposed tokens at once costs almost
the same as producing one token normally — and that spare capacity is what
speculative decoding cashes in.[^leviathan2022] (Why generation is memory-bound is
the subject of the [[KV cache]].)

## The key property: it's lossless

The point that is easiest to miss is that speculative decoding does **not** trade
quality for speed. Its output is statistically identical to ordinary sampling from
the target model. The original method samples "without any changes to the
outputs,"[^leviathan2022] and the concurrent formulation uses "a novel modified
rejection sampling scheme which preserves the distribution of the target model
within hardware numerics."[^chen2023] It is purely a **latency** optimization: the
draft model only ever *proposes*, and the target model alone decides what is
accepted, so a poor draft makes generation slower but never wrong.

That is also why the technique needs no retraining and no change to the target
model. Reported speedups are roughly **2–3×** on T5-XXL with identical
outputs,[^leviathan2022] and **2–2.5×** on Chinchilla 70B "without compromising the
sample quality or making modifications to the model itself."[^chen2023]

## Two names, one idea

The technique was introduced twice, almost at once: as "speculative decoding" by a
team at Google in November 2022,[^leviathan2022] and as "speculative sampling" by a
team at DeepMind in February 2023.[^chen2023] Both pair a draft proposer with
parallel verification under a distribution-preserving acceptance rule; they are
best read as two namings of the same idea rather than one descending from the
other.

## Variants

- **Separate draft model** — the original form, using a smaller model from the
  same family as the proposer.[^leviathan2022][^chen2023]
- **Self-speculation (Medusa)** — instead of a second model, extra "decoding
  heads" are added to the target model to predict several future tokens at once,
  and a tree-structured attention pattern builds and verifies candidate
  continuations. This removes the separate draft model and reports **2.2–3.6×**
  speedups.[^medusa2024]

Speculative decoding is now a standard feature of production serving engines such
as [[vLLM]], whose implementation supports several draft variants and is
"algorithmically validated to be lossless."[^vllm-specdecode]
