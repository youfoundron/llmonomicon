---
title: TensorFlow
description: Google's open-source machine-learning framework (2015) — the static-graph incumbent that dominated deep learning before PyTorch's define-by-run model displaced it in research; still maintained for production.
tags: [framework, training, open-source]
technicality: technical
aliases: [TF, Google TensorFlow]
updated: 2026-06-23
sources:
  - id: g-tensorflow
    title: "TensorFlow - Google's latest machine learning system, open sourced for everyone"
    url: https://research.google/blog/tensorflow-googles-latest-machine-learning-system-open-sourced-for-everyone/
    author: Google Research
    publisher: Google Research
    year: 2015
  - id: abadi2016
    title: "TensorFlow: Large-Scale Machine Learning on Heterogeneous Distributed Systems"
    url: https://arxiv.org/abs/1603.04467
    author: Abadi et al.
    publisher: arXiv (Google)
    year: 2016
  - id: tf20
    title: "TensorFlow 2.0 is now available!"
    url: https://blog.tensorflow.org/2019/09/tensorflow-20-is-now-available.html
    author: TensorFlow team
    publisher: blog.tensorflow.org
    year: 2019
  - id: keras3
    title: "Introducing Keras 3.0"
    url: https://keras.io/keras_3/
    author: Keras team
    publisher: keras.io
    year: 2023
  - id: jax_migration
    title: "6x faster migration from TensorFlow to JAX"
    url: https://cloud.google.com/blog/topics/developers-practitioners/6x-faster-migration-from-tensorflow-to-jax
    author: Google Cloud
    publisher: Google Cloud Blog
    year: 2026
  - id: tf_releases
    title: "tensorflow/tensorflow — releases (current stable line)"
    url: https://github.com/tensorflow/tensorflow/releases
    author: TensorFlow maintainers
    publisher: GitHub
    year: 2026
  - id: bert_repo
    title: "google-research/bert — TensorFlow code and pre-trained models for BERT"
    url: https://github.com/google-research/bert
    author: Google Research
    publisher: GitHub
    year: 2018
---

# TensorFlow

**TensorFlow** is the open-source machine-learning framework Google built and
released in 2015 — for years the dominant way to build and train neural networks,
and the incumbent that [[PyTorch]] later displaced in research. Like PyTorch, it is
a library for computing with **tensors** (multi-dimensional arrays) on GPUs and
other accelerators, with automatic differentiation for training. Its history is, in
large part, the story of how the field's tooling preferences shifted.

## Origins

TensorFlow grew out of [[Google Brain]] — [[Jeff Dean]] was a key figure — and was
**open-sourced in November 2015** under the Apache 2.0 license.[^g-tensorflow] The
accompanying paper describes it as a system for "large-scale machine learning on
heterogeneous distributed systems," designed to run the same model across anything
from a phone to a datacenter.[^abadi2016] It quickly became the default framework
for both research and production.

## The static-graph era

TensorFlow 1.x was built around **static computation graphs**: you first *defined*
the entire graph of operations, then ran data through it inside a session
(`tf.Session`, `feed_dict`).[^abadi2016] This "define-then-run" model was efficient
and easy to deploy, but awkward to debug — you couldn't simply print an
intermediate value or step through the math as ordinary code. When [[PyTorch]]
arrived with the opposite approach — **define-by-run**, where the model is just
Python that executes line by line — researchers increasingly preferred it, and that
ergonomic gap is widely credited as the main reason PyTorch overtook TensorFlow in
research.

## TensorFlow 2.0 and the response

TensorFlow answered with a major redesign. **TensorFlow 2.0** (released September
30, 2019) switched to **eager execution by default** — adopting the same
run-it-line-by-line feel as PyTorch — and made **Keras**, a high-level,
approachable model-building API, the official front end.[^tf20] It narrowed the
ergonomic gap, but by then much of the research community had already moved on.

## Where it stands

As of mid-2026, TensorFlow is mature and production-stable but in a maintenance
posture rather than at the frontier. Google now steers new large-scale
generative-AI work toward [[JAX]] — a functional framework optimized for its TPU
accelerators — and toward [[PyTorch]].[^jax_migration] Tellingly, **Keras 3** (2023)
became **backend-agnostic**, able to run on JAX, TensorFlow, or PyTorch rather than
being TensorFlow-only.[^keras3] The current stable line is **TensorFlow 2.21**
(released March 2026).[^tf_releases]

This is not abandonment. TensorFlow still has the most mature deployment ecosystem —
TensorFlow Serving, TensorFlow Lite for mobile, and TensorFlow.js for the browser —
and remains widely used in production. It is best understood as **superseded for
cutting-edge research, but still maintained for deployment.**

## Relevance to LLMs

TensorFlow was the dominant framework through the years when the [[Transformer]] and
the first large language models emerged; Google's original [[BERT]] release, for
one, shipped as TensorFlow code.[^bert_repo] Its displacement by [[PyTorch]] as
researchers' default framework is one of the defining episodes of modern
ML-tooling history — which is why the two are best read side by side.
