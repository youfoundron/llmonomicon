---
title: Stable Diffusion
description: The landmark open-weights text-to-image model (2022) — latent diffusion that brought high-quality image generation to consumer GPUs and, by SD3, became a Transformer (MMDiT) at its core.
tags: [model, open-weights, image-generation, diffusion]
technicality: technical
aliases: [Latent diffusion, Latent Diffusion Models, SDXL, Stable Diffusion XL, SD3, Stable Diffusion 3, SD3.5]
updated: 2026-06-23
sources:
  - id: ldm2022
    title: "High-Resolution Image Synthesis with Latent Diffusion Models"
    url: https://arxiv.org/abs/2112.10752
    author: Rombach, Blattmann, Lorenz, Esser & Ommer
    publisher: CVPR / arXiv
    year: 2022
  - id: sdxl2023
    title: "SDXL: Improving Latent Diffusion Models for High-Resolution Image Synthesis"
    url: https://arxiv.org/abs/2307.01952
    author: Podell et al. (Stability AI)
    publisher: arXiv
    year: 2023
  - id: sd3-hf
    title: "stabilityai/stable-diffusion-3-medium (Hugging Face model card)"
    url: https://huggingface.co/stabilityai/stable-diffusion-3-medium
    author: Stability AI
    publisher: Hugging Face
    year: 2024
  - id: compvis-repo
    title: "CompVis/stable-diffusion (original release repository)"
    url: https://github.com/CompVis/stable-diffusion
    author: CompVis (LMU Munich)
    publisher: GitHub
    year: 2022
  - id: sd-wiki
    title: "Stable Diffusion"
    url: https://en.wikipedia.org/wiki/Stable_Diffusion
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: bfl-wiki
    title: "Black Forest Labs"
    url: https://en.wikipedia.org/wiki/Black_Forest_Labs
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
---

# Stable Diffusion

**Stable Diffusion** is a family of **open-weights, text-to-image** models first released in
August 2022 — the landmark that put high-quality image generation onto ordinary consumer
hardware and into the hands of anyone who could download a file. Where rivals like
[[DALL·E]] and [[Midjourney]] were closed services, Stable Diffusion shipped its weights
openly, catalyzing a vast community of fine-tunes, tools, and derivatives in much the same
way open LLMs did.

## How it works

Stable Diffusion is built on **latent diffusion**, introduced by [[Robin Rombach]] and
colleagues in their 2022 paper "High-Resolution Image Synthesis with Latent Diffusion
Models."[^ldm2022] A [[Diffusion models|diffusion]] model generates an image by starting
from noise and repeatedly denoising it; the key efficiency trick is to run that process not
on raw pixels but "in the latent space of powerful pretrained autoencoders" — a compressed
representation — and to steer it with text by "introducing cross-attention layers into the
model architecture."[^ldm2022] Working in the smaller latent space is what made near
state-of-the-art image generation feasible on a single consumer GPU.

## Release and open-model impact

The first version was a collaboration between **[[Stability AI]]** (which funded and
promoted it), the **CompVis** group at LMU Munich (where latent diffusion was developed),
and Runway, trained on data from **[[LAION]]**, and released openly in August
2022.[^sd-wiki][^compvis-repo] Distributed through [[Hugging Face]], it became a milestone in
[[Open weights|open-weights]] release culture: it helped **popularize [[LoRA]]** fine-tuning
among non-experts, drove adoption of the [[safetensors]] format, and spawned an enormous
ecosystem of community models — the image-generation analogue of the open-LLM movement,
overlapping with groups like [[EleutherAI]].[^sd-wiki]

## From U-Net to Transformer

The model line evolved quickly: SD 1.4 and 1.5 (2022), the retrained 2.x series (late 2022),
and **SDXL** (July 2023), a roughly 3.5-billion-parameter version that used two text
encoders.[^sdxl2023][^sd-wiki] The most LLM-relevant shift came with **Stable Diffusion 3**
(2024). Earlier versions conditioned on text with a frozen [[CLIP]] encoder; SD3 replaced
the long-standing U-Net backbone with a **Multimodal Diffusion Transformer (MMDiT)** and
draws on **three** text encoders — CLIP ViT-L, OpenCLIP ViT-bigG, and **T5-xxl**, itself a
large language model.[^sd3-hf] Modern Stable Diffusion is thus, at its core, a
[[Transformer]] that jointly attends over text and image tokens — a direct convergence with
the architecture behind LLMs.

## Landscape and licensing

Stable Diffusion is the open-weights counterpart to the proprietary [[DALL·E]] and
[[Midjourney]], part of the broader move in image synthesis from
[[Generative adversarial networks|GANs]] to [[Diffusion models|diffusion]], and a cornerstone
of the [[Multimodal models|multimodal]]-generation era. Its licensing shifted over time —
from the **Creative ML OpenRAIL-M** license of the early releases to the **Stability AI
Community License** introduced with SD 3.5 (October 2024), which adds commercial terms above a
revenue threshold — a [[Model licensing]] evolution that mirrors debates in the open-LLM
world.[^sd-wiki] Stable Diffusion's original creators later left [[Stability AI]] to found
Black Forest Labs, whose [[FLUX]] models carried the open-image-generation lineage
forward.[^bfl-wiki]
