---
title: Context-length extension (RoPE scaling)
description: Techniques that stretch a trained model's context window beyond its training length by rescaling RoPE position frequencies — Position Interpolation, NTK-aware scaling, and YaRN — with little or no fine-tuning.
tags: [architecture, context]
group: architecture
aliases: [RoPE scaling, Position Interpolation, YaRN, NTK-aware scaling]
updated: 2026-06-18
sources:
  - id: chen2023
    title: "Extending Context Window of Large Language Models via Position Interpolation"
    url: https://arxiv.org/abs/2306.15595
    author: Chen, Wong, Chen & Tian
    publisher: arXiv
    year: 2023
  - id: peng2023
    title: "YaRN: Efficient Context Window Extension of Large Language Models"
    url: https://arxiv.org/abs/2309.00071
    author: Peng, Quesnelle, Fan & Shippole
    publisher: arXiv
    year: 2023
---

# Context-length extension (RoPE scaling)

**Context-length extension** is the set of techniques used to stretch a trained
model's [[Context window]] beyond the length it was trained on — usually by
rescaling its [[Rotary Position Embedding (RoPE)|RoPE]] position frequencies, with
little or no extra fine-tuning. In practice, it is how the models advertised at
128k or more tokens of context are actually produced: not by training from scratch
at that length, but by extending a shorter-context model after the fact.

## Why rescaling works

A model using RoPE encodes position through rotation frequencies tuned to the
lengths it saw in training. Ask it to handle a far longer sequence directly and it
encounters positions it never learned, which destabilizes attention. Extension
methods sidestep this by remapping the longer range back onto the familiar one.

- **Position Interpolation (PI)** — Chen et al. (2023) "linearly down-scales the
  input position indices to match the original context window size," keeping the
  encodings inside the stable trained range and avoiding the "catastrophically high
  attention scores that completely ruin the self-attention mechanism" that direct
  extrapolation can cause. PI extended LLaMA from 2,048 to as much as 32,768 tokens
  with minimal fine-tuning (within 1,000 steps) and no new parameters.[^chen2023]
- **NTK-aware scaling** — rather than squashing all frequencies uniformly as plain
  PI does, it adjusts them non-uniformly by wavelength, preserving the
  high-frequency detail that encodes fine positional distinctions. It began as a
  community technique and was later formalized within YaRN.[^peng2023]
- **YaRN** — Peng et al. (2023) became the de facto standard, combining
  non-uniform ("NTK-by-parts") interpolation with a temperature adjustment to
  attention. It reached state-of-the-art context extension using "10x less tokens
  and 2.5x less training steps than previous methods."[^peng2023]

## The trade-off

The recurring tension is **length versus short-context quality**: interpolate too
aggressively and the model gains longer reach but degrades on the ordinary,
in-window inputs it was already good at. The progression from PI to NTK-aware
scaling to YaRN is largely the story of pushing that frontier — reaching longer
contexts while preserving short-context performance and needing ever less
fine-tuning. These methods sit alongside other long-context approaches like
[[ALiBi]] and [[Sliding-window & sparse attention]], under the broader
[[Positional encoding]] family.
