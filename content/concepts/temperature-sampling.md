---
title: Temperature (sampling)
description: The generation knob that sharpens or flattens a model's next-token distribution—low for focused, deterministic output, high for diverse, creative output.
technicality: technical
tags: [sampling, decoding, generation]
group: decoding
aliases: [Temperature, Softmax temperature]
updated: 2026-06-18
sources:
  - id: hinton2015
    title: "Distilling the Knowledge in a Neural Network"
    url: https://arxiv.org/abs/1503.02531
    author: Hinton, Vinyals & Dean
    publisher: arXiv
    year: 2015
  - id: hf-generate
    title: "How to generate text: using different decoding methods for language generation with Transformers"
    url: https://huggingface.co/blog/how-to-generate
    author: Patrick von Platen (Hugging Face)
    publisher: Hugging Face
    year: 2020
  - id: hf-generation
    title: "Generation — Transformers documentation"
    url: https://huggingface.co/docs/transformers/en/main_classes/text_generation
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
---

# Temperature (sampling)

**Temperature** is the most familiar knob for controlling how a language model
generates text. It adjusts how "confident" or "adventurous" the model is when choosing
each next token, by reshaping its probability distribution before a token is drawn.
Mechanically, the model's output scores (logits) are divided by the temperature `T`
and then passed through the softmax — the long-standing softmax-temperature operation:
as Hinton, Vinyals, and Dean put it, "using a higher value for T produces a softer
probability distribution."[^hinton2015]

The effect across the range follows directly from that division:

- **Low temperature** (toward 0) sharpens the distribution onto the most likely
  tokens; in the limit the output becomes deterministic — equivalent to greedy
  decoding.
- **`T` = 1** leaves the model's native distribution unchanged.
- **High temperature** (above 1) flattens the distribution toward uniform, making the
  output more random and diverse.

Hugging Face's guide describes the low end concretely: you can "make the distribution
… sharper … by lowering the … `temperature` of the softmax."[^hf-generate] In practice
low temperatures suit factual or code tasks, where you want the model's best guess,
while higher temperatures suit creative writing, where variety matters — though pushing
it too high trades away coherence. (The exact "right" value is task- and
model-specific.)

## Temperature vs. truncation

Temperature is often used together with [[Top-k & top-p (nucleus) sampling]], and the
two do different jobs: **temperature reshapes** the whole distribution, while top-k and
top-p **truncate** it to a subset of tokens.[^hf-generation] They are typically applied
in order — temperature first, adjusting the probabilities, then top-k/top-p trimming
which tokens remain eligible before one is sampled. That reshape-versus-truncate
distinction is why they are separate controls (and separate entries). For how these
knobs fit together overall, see [[Decoding strategies]].
