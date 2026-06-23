---
title: JAX
description: Google's NumPy-like library with composable function transformations (grad, jit, vmap) — the third major deep-learning framework, favored for frontier-scale training on TPUs.
tags: [framework, training, open-source]
technicality: technical
aliases: [Google JAX]
updated: 2026-06-23
sources:
  - id: jax-repo
    title: "jax-ml/jax — Composable transformations of Python+NumPy programs (GitHub)"
    url: https://github.com/jax-ml/jax
    author: JAX maintainers (Google)
    publisher: GitHub
    year: 2018
  - id: jax-wiki
    title: "Google JAX"
    url: https://en.wikipedia.org/wiki/Google_JAX
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: deepmind-jax
    title: "Using JAX to accelerate our research"
    url: https://deepmind.google/blog/using-jax-to-accelerate-our-research/
    author: Google DeepMind
    publisher: Google DeepMind
    year: 2020
  - id: anthropic-tpu
    title: "Anthropic to Expand Use of Google Cloud TPUs and Services"
    url: https://www.googlecloudpresscorner.com/2025-10-23-Anthropic-to-Expand-Use-of-Google-Cloud-TPUs-and-Services
    author: Google Cloud
    publisher: Google Cloud
    year: 2025
---

# JAX

**JAX** is a Google numerical-computing library that has become the **third major deep-learning
framework**, alongside [[TensorFlow]] and [[PyTorch]] — and the one most associated with
**frontier-scale training on Google's TPUs**. It offers a familiar NumPy-style API plus a set of
**composable function transformations** that compile high-performance code for CPUs, GPUs, and
TPUs.

## How it works

The core idea is that you write plain **pure functions** and then *transform* them. JAX's key
transforms are **`grad`** (automatic differentiation), **`jit`** (just-in-time compilation via
Google's **XLA** compiler), **`vmap`** (automatic vectorization), and primitives for spreading
work across many devices. Because they compose, you can write something like `jit(grad(f))` to
get a compiled gradient function. Released by Google in 2018 and descended from the earlier
Autograd and XLA projects,[^jax-repo][^jax-wiki] this **functional, transform-based** style is the
main contrast with [[PyTorch]]'s imperative, eager approach.

## Why it matters for LLMs

JAX is heavily used for **large-scale model training, especially on TPUs** — the specialized
[[Hardware for LLMs|accelerators]] that frontier training depends on. [[Google DeepMind]] — the
lab behind [[Gemini]] and [[Gemma]] — has said it built much of its research on JAX.[^deepmind-jax]
TPU-based training has since scaled enormously: [[Anthropic]], for example, expanded its Google
Cloud TPU partnership in **October 2025** to access up to a million TPU chips for training future
Claude models.[^anthropic-tpu] As of the mid-2020s, JAX is Google's framework of choice for new
research — the destination of the field's gradual shift away from [[TensorFlow]].

## Ecosystem

JAX itself is deliberately minimal; neural-network layers and training utilities live in
libraries built on top of it — such as **[[Flax]]** and Haiku for model definitions, and Optax
for optimizers.[^jax-wiki]
