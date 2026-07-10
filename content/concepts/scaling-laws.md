---
title: Scaling laws
description: The empirical power laws by which a language model's loss falls predictably with size, data, and compute — and the Chinchilla correction that reset how the field spends its training budget.
tags: [training, scaling, compute-optimal]
group: training
technicality: technical
aliases: [Neural scaling laws, Scaling law, Chinchilla scaling, Compute-optimal training]
updated: 2026-07-10
sources:
  - id: kaplan2020
    title: "Scaling Laws for Neural Language Models"
    url: https://arxiv.org/abs/2001.08361
    author: Kaplan, McCandlish, Henighan, et al.
    publisher: arXiv
    year: 2020
  - id: hoffmann2022
    title: "Training Compute-Optimal Large Language Models"
    url: https://arxiv.org/abs/2203.15556
    author: Hoffmann, Borgeaud, Mensch, et al.
    publisher: arXiv (DeepMind)
    year: 2022
  - id: llama2023
    title: "LLaMA: Open and Efficient Foundation Language Models"
    url: https://arxiv.org/abs/2302.13971
    author: Touvron et al.
    publisher: arXiv (Meta AI)
    year: 2023
  - id: villalobos2024
    title: "Will we run out of data? Limits of LLM scaling based on human-generated data"
    url: https://arxiv.org/abs/2211.04325
    author: Villalobos, Ho, Sevilla, et al.
    publisher: arXiv (Epoch AI)
    year: 2024
---

# Scaling laws

**Scaling laws** are the empirical rules describing how a language model gets
better — smoothly and predictably — as you make it bigger, feed it more data, and
spend more computation training it. Their real power is *forecasting*: because the
gains follow a **power law** (a relationship in which one quantity varies as a
fixed power of another, so on log-log axes the curve becomes a straight line), you
can fit a handful of small, cheap training runs and extrapolate what a far larger
run will achieve before paying for it. That turned building a frontier model from
a gamble into something closer to an engineering bet.

## The original laws (Kaplan, 2020)

The founding result is Kaplan et al.'s 2020 *"Scaling Laws for Neural Language
Models."*[^kaplan2020] Studying [[Transformer]] language models, they found that a
model's **cross-entropy loss** — its average "surprise" at the next
[[Tokenization|token]], the quantity [[Perplexity]] summarizes — "scales as a
power-law with model size, dataset size, and the amount of compute used for
training, with some trends spanning more than seven orders of
magnitude."[^kaplan2020] Note carefully what scales: the *loss*, not any
particular downstream skill. Each of the three ingredients has its own
curve — the number of **parameters** (the model's learned weights), the number of
training **tokens**, and the total **compute** (measured in FLOPs).

The paper drew a second, era-defining conclusion: "larger models are
significantly more sample-efficient, such that optimally compute-efficient
training involves training very large models on a relatively modest amount of data
and stopping significantly before convergence."[^kaplan2020] Read plainly: given a
fixed compute budget, spend it on a bigger model rather than on more data.

## The Chinchilla correction

Two years later, [[Google DeepMind|DeepMind]]'s *"Training Compute-Optimal Large
Language Models"* — universally nicknamed the **Chinchilla** paper, though that is
not its title — reached the opposite conclusion.[^hoffmann2022] Training more than
400 models across many sizes and token counts, Hoffmann et al. found that "current
large language models are significantly undertrained" and that "for
compute-optimal training, the model size and the number of training tokens should
be scaled equally: for every doubling of model size the number of training tokens
should also be doubled."[^hoffmann2022] **Compute-optimal** here means the best
split of a fixed compute budget between a larger model and more training data.

Their proof was a model they called [[Chinchilla]]: 70 billion parameters trained
on 1.4 trillion tokens, using the same compute budget as the earlier
280-billion-parameter [[Gopher]] (trained on just 300 billion tokens). The
smaller, data-richer model "uniformly and significantly" outperformed Gopher and
the other giants of its day.[^hoffmann2022] The much-repeated "~20 tokens per
parameter" figure is *not* something the paper claims; it simply falls out of
Chinchilla's own recipe (1.4T ÷ 70B ≈ 20) — a convenient shorthand for the
equal-scaling result, not a stated law.

Why had Kaplan's laws pointed the other way? Hoffmann et al. traced it to a
methodology gap: the earlier work used "a fixed number of training tokens and
learning rate schedule for all models; this prevents them from modelling the
impact of these hyperparameters on the loss."[^hoffmann2022] A schedule tuned for
long runs makes shorter runs look worse than they really are, biasing the fit
toward ever-larger models.

## What the laws bought

Before Chinchilla, the laws were the intellectual license for the "just make it
bigger" era — most visibly the 175-billion-parameter [[GPT-3]] bet. (The
through-line from that math to the case for large models is [[Jared Kaplan]]'s
story, which this entry only points to.) Chinchilla then reset the target toward
feeding models far more data for their size.

The picture gains one more twist once you count *inference*. A compute-optimal
model is the cheapest to *train* for a given quality, but not the cheapest to
*run*. Meta's [[LLaMA]] paper made the point plainly — "a smaller one trained
longer will ultimately be cheaper at inference"[^llama2023] — and it deliberately
over-trained small models well past their compute-optimal point (LLaMA-7B on 1.0
trillion tokens, LLaMA-65B on 1.4 trillion), betting that for a widely deployed
model, serving cost dwarfs training cost over its lifetime.[^llama2023]

## After Chinchilla

If compute-optimal training keeps demanding more tokens, the supply of text
becomes the binding constraint. Epoch AI's Villalobos et al. project that models
will exhaust the stock of high-quality, human-generated public text somewhere
between roughly 2026 and 2032 — the "running out of data" concern that follows
directly from Chinchilla's appetite.[^villalobos2024] A separate axis has since
opened up: rather than scaling *training*, [[Reasoning models]] scale *inference*,
spending more compute per query to think before answering — a lever the original
laws do not describe.
