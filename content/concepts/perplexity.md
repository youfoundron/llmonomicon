---
title: Perplexity
description: The classic intrinsic measure of how well a language model predicts text—the exponential of its average per-token loss—along with the caveats that limit it.
tags: [evaluation, metric, training]
group: training
aliases: [PP]
updated: 2026-06-17
sources:
  - id: jm
    title: "Speech and Language Processing (3rd ed. draft), Ch. 3: N-gram Language Models"
    url: https://web.stanford.edu/~jurafsky/slp3/3.pdf
    author: "Daniel Jurafsky & James H. Martin"
    publisher: Stanford
    year: 2025
  - id: jelinek1977
    title: "Perplexity—a measure of the difficulty of speech recognition tasks"
    url: https://pubs.aip.org/asa/jasa/article/62/S1/S63/642598/
    author: "Jelinek, Mercer, Bahl, Baker"
    publisher: "Journal of the Acoustical Society of America"
    year: 1977
---

# Perplexity

**Perplexity** is the classic **intrinsic** measure of how well a language model
predicts text — in effect, how "surprised" it is by real language it has not seen.
Formally it is the inverse probability the model assigns to a held-out test set,
normalized by length; equivalently, and more usefully, it is the **exponential of
the model's average per-token loss** (its cross-entropy).[^jm] **Lower is better**:
a lower perplexity means the model assigned higher probability to the text that
actually occurred.[^jm]

## The intuition

The most useful way to read perplexity is as an **effective branching factor**:
roughly, the weighted-average number of equally likely options the model is
choosing among at each step.[^jm] A perplexity of 20 means the model is, on
average, about as uncertain as if it were choosing uniformly among 20 possible
next tokens. The term dates to 1977, when Jelinek and colleagues introduced it as a
better measure of difficulty for speech-recognition tasks than raw vocabulary
size.[^jelinek1977]

Because perplexity is just the model's cross-entropy loss exponentiated, it tracks
training directly — it is essentially the training objective in a more interpretable
unit — which is why it appears everywhere from pretraining curves to
[[Quantization]] quality comparisons.[^jm]

## Two important caveats

Perplexity is genuinely useful, but it has two limits that are easy to forget:

- **It is not comparable across [[Tokenization|tokenizers]].** Perplexity is
  measured *per token*, so two models that split text into different units produce
  numbers that simply cannot be compared. A perplexity figure is only meaningful
  among models that share the same vocabulary.[^jm]
- **It is a weak proxy for usefulness.** A model can have excellent perplexity and
  still be unhelpful at real tasks; predicting text well is not the same as
  reasoning or following instructions. That gap is exactly why task-based
  evaluations like [[MMLU]] — and the broader practice of
  [[Benchmark (LLM evaluation)|benchmarking]] — exist alongside it.[^jm]
