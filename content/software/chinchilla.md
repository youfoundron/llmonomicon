---
title: Chinchilla
description: DeepMind's 70-billion-parameter model that beat much larger rivals by training on far more data — the demonstration behind the "compute-optimal" scaling correction.
technicality: technical
tags: [model, scaling]
aliases: [Chinchilla (model), Chinchilla-optimal]
updated: 2026-07-22
sources:
  - id: hoffmann2022
    title: "Training Compute-Optimal Large Language Models"
    url: https://arxiv.org/abs/2203.15556
    author: Hoffmann, Borgeaud, Mensch, et al.
    publisher: arXiv (DeepMind)
    year: 2022
---

# Chinchilla

**Chinchilla** is a 70-billion-parameter language model built by [[Google DeepMind|DeepMind]], presented in the paper "Training Compute-Optimal Large Language Models," submitted 29 March 2022.[^hoffmann2022] The model itself wasn't the point — it was a deliberately designed experiment to test an idea about how to spend a training budget, and the result reshaped how the field [[Pretraining|pretrains]] large models.

## The experiment

DeepMind took the same training compute budget used for an earlier in-house model, [[Gopher]] (280 billion parameters, trained on 300 billion tokens), and spent it differently: instead of building another huge model on a comparatively modest amount of text, they trained a much smaller, 70-billion-parameter model on 1.4 trillion tokens — nearly five times as much data.[^hoffmann2022]

Despite having roughly a quarter of Gopher's parameters, Chinchilla "uniformly and significantly" outperformed Gopher, as well as [[GPT-3]] (175 billion parameters) and Megatron-Turing NLG (530 billion parameters), across a wide range of downstream evaluation tasks.[^hoffmann2022]

## Why it mattered: rethinking scaling laws

The paper's headline argument was about how to allocate a fixed compute budget between model size and training data. Earlier [[Scaling laws|scaling-law]] work by Kaplan et al. had suggested that, given more compute, most of it should go toward a bigger model, with comparatively little extra data. Hoffmann et al. found that conclusion left models undertrained: Gopher, GPT-3, and similar contemporaries were larger than they needed to be for the amount of data they'd seen. Their alternative recipe was to scale model size and training-token count together — double one, double the other — to reach a given compute budget's best possible loss.[^hoffmann2022]

Chinchilla's own recipe — 1.4 trillion tokens over 70 billion parameters, a ratio of roughly 20 tokens per parameter — gave rise to the widely repeated shorthand "Chinchilla-optimal" for compute-optimal training, even though the paper itself never states that ratio as a general law; it's an artifact of the specific budget the authors chose to demonstrate.[^hoffmann2022] The fuller story of how this result changed model design across the field is covered in [[Scaling laws]].

[^hoffmann2022]: Hoffmann, Borgeaud, Mensch, et al., "Training Compute-Optimal Large Language Models," arXiv (DeepMind), 2022.
