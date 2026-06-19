---
title: Min-p sampling
description: A decoding method that sets a probability floor relative to the model's top token — strict when the model is confident, permissive when it is uncertain — an increasingly popular alternative to top-k and top-p.
technicality: technical
tags: [decoding, sampling]
group: decoding
aliases: [Min-p]
updated: 2026-06-18
sources:
  - id: nguyen2024
    title: "Turning Up the Heat: Min-p Sampling for Creative and Coherent LLM Outputs"
    url: https://arxiv.org/abs/2407.01082
    author: Nguyen, Baker, Neo, Roush, Kirsch & Shwartz-Ziv
    publisher: "arXiv (ICLR 2025)"
    year: 2024
---

# Min-p sampling

**Min-p sampling** is a [[Decoding strategies|decoding]] method that decides which tokens a model
may pick by setting a probability floor *relative* to its top choice: keep only tokens whose
probability is at least `min_p` times the probability of the most likely token, then renormalize
what remains and sample from it.[^nguyen2024]

## A confidence-scaled cutoff

What makes min-p distinctive is that it "adjusts the sampling threshold based on the model's
confidence by using the top token's probability as a scaling factor."[^nguyen2024] When the model is
confident — one token carries most of the probability — the floor is high and the field of choices
narrows, keeping the output coherent. When the model is uncertain and the distribution is flat, the
same `min_p` lets many tokens through, leaving room for diversity.[^nguyen2024] That is the contrast
with [[Top-k & top-p (nucleus) sampling]]: top-k keeps a fixed *number* of tokens and top-p a fixed
*cumulative mass*, both blind to how peaked the distribution is, whereas min-p's cutoff moves with
the model's confidence. It is usually paired with a [[Temperature (sampling)|temperature]] setting,
and its appeal is keeping generations creative without tipping into incoherence.

## Adoption

Despite being recent, min-p spread fast: the paper — an ICLR 2025 oral — notes it "has been adopted
by popular open-source LLM frameworks, including Hugging Face Transformers, VLLM, and many
others."[^nguyen2024] Among those "many others" are the local-inference tools [[llama.cpp]] and
[[Ollama]], where `min_p` is a standard sampler setting — much of why it became a familiar knob in
the open-weights community.
