---
title: Gopher
description: DeepMind's 280-billion-parameter Transformer, whose scaling study set the stage for the Chinchilla compute-optimal training result.
tags: [language-model, scaling, deepmind]
technicality: technical
aliases: [Gopher (language model), Gopher (DeepMind)]
sources:
  - id: rae2021
    title: "Scaling Language Models: Methods, Analysis & Insights from Training Gopher"
    url: https://arxiv.org/abs/2112.11446
    author: Rae, Borgeaud, Cai, et al.
    publisher: arXiv (DeepMind)
    year: 2021
  - id: deepmind2021blog
    title: "Language modelling at scale: Gopher, ethical considerations, and retrieval"
    url: https://deepmind.google/discover/blog/language-modelling-at-scale-gopher-ethical-considerations-and-retrieval/
    author: Google DeepMind
    publisher: Google DeepMind
    year: 2021
  - id: hoffmann2022
    title: "Training Compute-Optimal Large Language Models"
    url: https://arxiv.org/abs/2203.15556
    author: Hoffmann, Borgeaud, Mensch, et al.
    publisher: arXiv (DeepMind)
    year: 2022
---

**Gopher** is a 280-billion-parameter Transformer language model built by
[[Google DeepMind|DeepMind]], the largest member of a family of models the lab
trained ranging from 44 million to 280 billion parameters.[^rae2021] DeepMind
described the work in the paper *"Scaling Language Models: Methods, Analysis &
Insights from Training Gopher,"* first posted to arXiv on December 8, 2021 (and
revised in January 2022), alongside a same-day companion blog post.[^rae2021]
[^deepmind2021blog] The announcement also introduced RETRO, a smaller
retrieval-augmented sibling model, and discussed the toxicity and bias risks
that come with training language models at this scale.[^deepmind2021blog]

## Training

Gopher and the rest of the model family were trained on **MassiveText**, a
curated corpus of 2.35 billion documents — about 10.5 terabytes of text —
combining web pages (a subset called MassiveWeb), books, the C4 dataset, news
articles, GitHub code, and Wikipedia.[^rae2021] Every model in the family,
including the 280B Gopher, was trained on 300 billion tokens with a 2,048-token
context window.[^rae2021]

## Results

DeepMind evaluated the models across 152 diverse tasks and found Gopher
achieved state-of-the-art performance on most of them.[^rae2021] Restricting the
comparison to a narrower set of 124 tasks with published results from prior
language models, Gopher beat the existing state of the art on 100 of them — 81
percent.[^rae2021] The gains from scaling up were largest on reading
comprehension, fact-checking, and identifying toxic language, but much smaller
on tasks requiring logical or mathematical reasoning — a gap that later became
a running theme in evaluations like [[MMLU]].[^rae2021]

## The Chinchilla correction

Gopher's scale made it an influential reference point rather than a lasting
production model. DeepMind's later [[Chinchilla]] paper trained a
70-billion-parameter model on 1.4 trillion tokens — using the same training
compute budget spent on Gopher — and found it "uniformly and significantly"
outperformed the 280-billion-parameter, 300-billion-token Gopher.[^hoffmann2022]
That result reset the field's intuition toward training smaller models on much
more data rather than scaling parameter count alone; see [[Scaling laws]] for
the fuller story of that shift.

## See also

- [[Google DeepMind]]
- [[Scaling laws]]
- [[Transformer]]
