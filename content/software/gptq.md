---
title: GPTQ
description: A post-training quantization method that compresses LLM weights to 3–4 bits with little accuracy loss by correcting the error each rounding introduces.
technicality: highly-technical
tags: [quantization, efficiency, open-source]
updated: 2026-06-17
sources:
  - id: gptq-paper
    title: "GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"
    url: https://arxiv.org/abs/2210.17323
    author: Frantar, Ashkboos, Hoefler, Alistarh
    publisher: "arXiv (ICLR 2023)"
    year: 2022
  - id: autogptq
    title: "AutoGPTQ (GitHub repository)"
    url: https://github.com/AutoGPTQ/AutoGPTQ
    author: AutoGPTQ contributors
    publisher: GitHub
    year: 2023
---

# GPTQ

**GPTQ** is one of the most widely used methods for [[Quantization|quantizing]] a
large language model after it has been trained. It compresses a model's weights to
just **3 or 4 bits** each — roughly a 4× reduction from 16-bit — with little loss in
quality, and it does so in a single pass with no retraining. The paper that
introduced it (Frantar et al., 2022) describes it as "a new one-shot weight
quantization method based on approximate second-order information, that is both
highly-accurate and highly-efficient."[^gptq-paper]

## How it works

The general idea of using fewer bits is covered under [[Quantization]]; what is
specific to GPTQ is **how it preserves accuracy**. It quantizes a layer's weights a
piece at a time and, crucially, **measures the error** each rounding introduces and
**compensates for it** by nudging the weights that haven't been quantized yet — using
approximate second-order (Hessian) information to decide how. Because each small
rounding error is corrected rather than left to accumulate, quality holds up even at
3–4 bits.[^gptq-paper]

## Why it mattered

GPTQ made very large open models practical to run on a single GPU. The paper reports
quantizing a 175-billion-parameter model "in approximately four GPU hours… with
negligible accuracy degradation," enough to fit a "175 billion-parameter model inside
a single GPU for generative inference," with inference several times faster than
16-bit.[^gptq-paper] That placed it — alongside its sibling method [[AWQ]] and the
k-quants of [[GGUF]] — among the techniques that powered the local and open-weights
movement. It is supported by community tooling such as AutoGPTQ — now succeeded by
the maintained GPTQModel — and is integrated into mainstream model libraries like
Hugging Face Transformers.[^autogptq]
