---
title: Oriol Vinyals
description: Co-inventor of the seq2seq model (with Ilya Sutskever) and now a technical lead of Google's Gemini — a researcher who bridges the pre-Transformer lineage and today's frontier models.
technicality: non-technical
tags: [scientist]
aliases: [Vinyals]
updated: 2026-06-18
sources:
  - id: seq2seq2014
    title: "Sequence to Sequence Learning with Neural Networks"
    url: https://arxiv.org/abs/1409.3215
    author: Sutskever, Vinyals & Le
    publisher: "arXiv (NeurIPS 2014)"
    year: 2014
  - id: google-vinyals
    title: "Oriol Vinyals — Google Research"
    url: https://research.google/people/oriolvinyals/
    publisher: Google Research
    year: 2026
  - id: wiki-vinyals
    title: "Oriol Vinyals"
    url: https://en.wikipedia.org/wiki/Oriol_Vinyals
    publisher: Wikipedia
    year: 2026
---

# Oriol Vinyals

**Oriol Vinyals** is a principal research scientist at [[Google DeepMind]] and a technical lead
of the [[Gemini]] program. His place in the LLM story reaches back a decade: with
[[Ilya Sutskever]] he co-invented one of the ideas that first pointed neural networks toward
general-purpose text generation, and he now helps lead one of the frontier models that idea made
possible.

## Sequence to sequence

In **2014**, Vinyals — with [[Ilya Sutskever]] and Quoc V. Le — published "Sequence to Sequence
Learning with Neural Networks," co-inventing the **seq2seq** approach to machine
translation.[^seq2seq2014][^wiki-vinyals] The method used "a multilayered Long Short-Term Memory
(LSTM) to map the input sequence to a vector of a fixed dimensionality, and then another deep
LSTM to decode the target sequence from the vector."[^seq2seq2014] That encoder–decoder framing —
read a whole input into a representation, then generate an output sequence from it — was a
foundational, **pre-Transformer** step toward the generative models that followed; the
[[Transformer]] would later replace the recurrent machinery while keeping the encoder–decoder
idea.

## At Google DeepMind

At DeepMind, Vinyals is a principal research scientist and a lead of the Deep Learning
group.[^google-vinyals][^wiki-vinyals] He led **AlphaStar**, the agent that reached Grandmaster
level at StarCraft II and made the cover of Nature — a landmark in game-playing
AI.[^google-vinyals][^wiki-vinyals] Today he is a **technical lead of [[Gemini]]** — with
[[Jeff Dean]] and Noam Shazeer — Google's flagship model family, putting a co-inventor of seq2seq
at the head of a model lineage his early work helped set in motion.[^wiki-vinyals]
