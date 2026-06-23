---
title: Generative adversarial networks
description: A class of generative model that pits a generator network against a discriminator in a minimax game — the approach that dominated AI image generation before diffusion models replaced it.
tags: [architecture, image-generation]
group: architecture
technicality: technical
aliases: [GAN, GANs, Generative adversarial network]
updated: 2026-06-23
sources:
  - id: goodfellow2014
    title: "Generative Adversarial Nets"
    url: https://arxiv.org/abs/1406.2661
    author: Goodfellow et al.
    publisher: NeurIPS / arXiv
    year: 2014
  - id: schmidhuber-munich
    title: "AI Blog: roots of the AI boom in Munich 1991"
    url: https://people.idsia.ch/~juergen/ai-boom-roots-munich-1991.html
    author: Jürgen Schmidhuber
    publisher: IDSIA
    year: 2021
---

# Generative adversarial networks

**Generative adversarial networks (GANs)** are a class of generative model built around a
contest between two neural networks. One network, the **generator**, tries to produce
realistic fake data; the other, the **discriminator**, tries to tell the generator's fakes
apart from real examples. Training them against each other pushes the generator toward
increasingly convincing output. Introduced in 2014, GANs dominated AI image generation for
years — until [[Diffusion models|diffusion]] models largely replaced them.

## How they work

The setup, from Ian Goodfellow and colleagues' 2014 paper "Generative Adversarial Nets," is a
**minimax two-player game**: a "generative model G that captures the data distribution" is
trained alongside "a discriminative model D that estimates the probability that a sample came
from the training data rather than G."[^goodfellow2014] The generator's job is to fool the
discriminator; the discriminator's job is to avoid being fooled. As each improves, the other
must too — and at equilibrium the generator's samples are, ideally, indistinguishable from
real data. Because both are ordinary neural networks, "the entire system can be trained with
backpropagation."[^goodfellow2014]

## Place in the field

Through the late 2010s, GANs were the leading approach to high-quality image synthesis —
NVIDIA's StyleGAN family, for instance, produced strikingly realistic faces. Around 2022,
[[Diffusion models|diffusion]] models (the technique behind [[Stable Diffusion]]) overtook
them for text-to-image generation, trading the GAN's adversarial contest for an iterative
denoising process that proved easier to train and scale. GANs and diffusion are thus the two
major paradigms of modern image generation, and the shift between them is a useful lens on the
field's evolution. Within the language-model world the direct role of GANs is limited — they
are more a vision-and-media technique than a text one — but as a foundational generative idea
they belong to the broader story.

## A contested origin

The conventional credit for GANs goes to Goodfellow's 2014 paper, but the priority is
disputed: [[Jürgen Schmidhuber]] has argued that his own adversarial-network ideas from the
early 1990s anticipated them.[^schmidhuber-munich] The disagreement — which included a
well-known public exchange between the two researchers — is taken up in the
[[Jürgen Schmidhuber]] entry; this wiki takes no side.
