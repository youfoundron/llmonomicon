---
title: Diffusion models
description: A class of generative model that creates data — images, audio, even text — by learning to reverse a noising process; the dominant paradigm behind modern image generation.
tags: [architecture, image-generation]
group: architecture
technicality: technical
aliases: [Diffusion model, Denoising diffusion, DDPM, Denoising diffusion probabilistic models]
updated: 2026-06-23
sources:
  - id: sohldickstein2015
    title: "Deep Unsupervised Learning using Nonequilibrium Thermodynamics"
    url: https://arxiv.org/abs/1503.03585
    author: Sohl-Dickstein, Weiss, Maheswaranathan & Ganguli
    publisher: ICML / arXiv
    year: 2015
  - id: ddpm2020
    title: "Denoising Diffusion Probabilistic Models"
    url: https://arxiv.org/abs/2006.11239
    author: Ho, Jain & Abbeel
    publisher: NeurIPS / arXiv
    year: 2020
  - id: ldm2022
    title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    url: https://arxiv.org/abs/2112.10752
    author: Rombach, Blattmann, Lorenz, Esser & Ommer
    publisher: CVPR / arXiv
    year: 2022
---

# Diffusion models

**Diffusion models** are a class of generative model that create data — most famously images —
by learning to **reverse a process of adding noise**. Train a model to undo noise step by
step, and you can hand it pure random noise and have it gradually "denoise" that into a
coherent image, sound, or other sample. Since around 2020 they have been the **dominant
approach to AI image generation**, behind [[Stable Diffusion]], [[DALL·E]], [[Midjourney]],
and [[FLUX]], and the idea has since been extended to [[Diffusion language models|text]] and
video.

## How they work

A diffusion model is defined by two processes. The **forward process** takes real data and
"systematically and slowly destroy[s] structure … through an iterative forward diffusion
process," adding a little noise at a time until nothing but noise remains. The model then
learns the **reverse process** — a "reverse diffusion process that restores structure in
data" — running it backward to remove noise step by step.[^sohldickstein2015] To generate
something new, you start from pure noise and run the learned reverse process, denoising over a
series of steps into a finished sample. This framing was introduced by Sohl-Dickstein and
colleagues in 2015; the practical recipe that made diffusion models work well came with the
2020 **Denoising Diffusion Probabilistic Models** (DDPM) paper.[^ddpm2020]

## Latent diffusion

A key efficiency advance was to run the whole noising-and-denoising process not on raw pixels
but in the **compressed latent space** of a pretrained autoencoder — **latent diffusion**,
introduced by Rombach and colleagues in 2022.[^ldm2022] Working in that smaller space is what
made high-resolution image generation practical on ordinary hardware, and it is the basis of
[[Stable Diffusion]].

## Where it fits

Diffusion is now the leading paradigm for image generation, having largely **displaced
[[Generative adversarial networks|GANs]]**, which dominated the field before it. It also
contrasts with the [[Decoding strategies|autoregressive]] approach used by most language
models: where an autoregressive model emits one token after another, a diffusion model refines
a whole output in parallel over several denoising steps — the same insight that
[[Diffusion language models]] now bring to text.
