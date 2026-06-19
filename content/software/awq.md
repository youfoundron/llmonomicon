---
title: AWQ
description: A post-training 4-bit quantization method that protects an LLM's most important weight channels — found from activation statistics — to compress the model with little accuracy loss.
technicality: highly-technical
tags: [quantization, efficiency, open-source]
aliases: [Activation-aware Weight Quantization]
updated: 2026-06-18
sources:
  - id: awq-paper
    title: "AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration"
    url: https://arxiv.org/abs/2306.00978
    author: Lin et al.
    publisher: "arXiv (MLSys 2024)"
    year: 2023
  - id: gptq-paper
    title: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
    url: https://arxiv.org/abs/2210.17323
    author: Frantar, Ashkboos, Hoefler, Alistarh
    publisher: "arXiv (ICLR 2023)"
    year: 2022
  - id: autoawq
    title: "AutoAWQ (GitHub repository)"
    url: https://github.com/casper-hansen/AutoAWQ
    author: AutoAWQ contributors
    publisher: GitHub
    year: 2023
---

# AWQ

**AWQ** (Activation-aware Weight Quantization) is a method for
[[Quantization|quantizing]] a large language model's weights to **4 bits** after
training, with no retraining. Like its sibling method [[GPTQ]], it shrinks a model
roughly 4× from 16-bit while keeping quality close to the original — but it reaches
that point through a different and simpler insight. As the paper (Lin et al., 2023)
puts it, "not all weights in an LLM are equally important," and "protecting only 1%
salient weights can greatly reduce quantization error."[^awq-paper]

## How it works

The general idea of using fewer bits per weight is covered under [[Quantization]];
what is specific to AWQ is **how it decides which weights to protect**. Its key
observation is that a weight's importance is revealed not by the weight itself but by
the activations flowing through it: "to identify salient weight channels, we should
refer to the **activation distribution, not weights**."[^awq-paper] Rather than keep
those channels at higher precision — which would force awkward mixed-precision
math — AWQ "employs an **equivalent transformation to scale the salient weight
channels to protect them**," a per-channel rescaling that needs no backpropagation
and leaves the whole model at a uniform 4 bits.[^awq-paper]

That is the contrast with [[GPTQ]] worth keeping. GPTQ corrects each rounding
**error** after the fact, using approximate second-order (Hessian) information to
compensate;[^gptq-paper] AWQ instead **prevents** error on the channels that matter
by scaling them ahead of time, guided by activations. AWQ runs no reconstruction
pass, which makes it simpler and more hardware-friendly — and frequently the default
quantization in serving frameworks.

## Why it mattered

AWQ paired accuracy with speed. The paper's TinyChat system reports "more than 3×
speedup over the Huggingface FP16 implementation on both desktop and mobile GPUs,"
and shows that AWQ "democratizes the deployment of the 70B Llama-2 model on mobile
GPUs," generalizing to instruction-tuned and multimodal models.[^awq-paper] The work
won the **MLSys 2024 Best Paper Award**.[^awq-paper] Alongside [[GPTQ]] and the
k-quants of [[GGUF]], AWQ became one of the standard ways to run open models cheaply.
Its reference implementation, **AutoAWQ**, was integrated into Hugging Face
Transformers and adopted by [[vLLM]]; AutoAWQ itself was archived in 2025 as that
broader ecosystem support matured.[^autoawq]
