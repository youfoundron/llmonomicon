---
title: QLoRA
description: A method for finetuning a large model on a single GPU by training LoRA adapters over a frozen, 4-bit-quantized base—at almost no loss in quality.
technicality: highly-technical
tags: [fine-tuning, quantization, efficiency, peft]
group: efficiency
aliases: [4-bit NormalFloat, NF4]
updated: 2026-06-18
sources:
  - id: dettmers2023
    title: "QLoRA: Efficient Finetuning of Quantized LLMs"
    url: https://arxiv.org/abs/2305.14314
    author: Dettmers, Pagnoni, Holtzman & Zettlemoyer
    publisher: arXiv
    year: 2023
---

# QLoRA

**QLoRA** is a method for finetuning very large language models cheaply, by combining
[[Quantization|quantization]] with [[LoRA]]. It "backpropagates gradients through a
frozen, 4-bit quantized pretrained language model into Low Rank Adapters," meaning the
big base model is compressed to 4 bits and held fixed while only small adapter
matrices are trained.[^dettmers2023] The headline result was striking: QLoRA can
**finetune a 65-billion-parameter model on a single 48 GB GPU** while matching the
task performance of full 16-bit finetuning.[^dettmers2023]

The adapter mechanism itself is covered under [[LoRA]]; QLoRA's contribution is making
the *frozen base* small enough to fit alongside it, through three techniques.

## Three innovations

- **4-bit NormalFloat (NF4)** — a new quantization data type that the authors argue is
  "information theoretically optimal" for the roughly normally-distributed weights of a
  neural network.[^dettmers2023]
- **Double quantization** — quantizing the quantization constants themselves, which
  saves about 0.37 bits per parameter on average.[^dettmers2023]
- **Paged optimizers** — using GPU/CPU unified memory to page optimizer state in and
  out, so the memory spikes during training don't overflow the GPU.[^dettmers2023]

## Why it mattered

QLoRA put finetuning of large open models within reach of someone with a single GPU
rather than a cluster. As a demonstration, the authors' **Guanaco** models — finetuned
with QLoRA — reached "99.3% of the performance level of ChatGPT" on a common
benchmark, while "only requiring 24 hours of finetuning on a single GPU."[^dettmers2023]
It quickly became one of the standard ways to adapt open-weight models on limited
hardware.
