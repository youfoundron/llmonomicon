---
title: Quantization
description: Storing a model's weights at lower numerical precision to shrink it and speed it up—the technique that made running large models on ordinary hardware possible.
technicality: technical
tags: [efficiency, inference, quantization]
group: efficiency
aliases: [quantized, model quantization, weight quantization]
updated: 2026-06-17
sources:
  - id: hf-quant
    title: "Quantization concepts (Hugging Face Transformers docs)"
    url: https://huggingface.co/docs/transformers/en/quantization/concept_guide
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
  - id: jacob2017
    title: "Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference"
    url: https://arxiv.org/abs/1712.05877
    author: Jacob et al.
    publisher: arXiv
    year: 2017
  - id: dettmers2022
    title: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"
    url: https://arxiv.org/abs/2208.07339
    author: Dettmers, Lewis, Belkada & Zettlemoyer
    publisher: arXiv
    year: 2022
  - id: dettmers2023
    title: "QLoRA: Efficient Finetuning of Quantized LLMs"
    url: https://arxiv.org/abs/2305.14314
    author: Dettmers, Pagnoni, Holtzman & Zettlemoyer
    publisher: arXiv
    year: 2023
---

# Quantization

**Quantization** is the practice of storing a model's numbers — its weights, and
sometimes its activations — at **lower numerical precision** than the 32-bit floats
they are trained in. Doing so makes the model dramatically smaller and faster: an
8-bit version is roughly **four times smaller** than a 32-bit one and uses
correspondingly less memory and bandwidth.[^hf-quant] The catch is a fundamental
**trade-off between efficiency and accuracy** — squeezing numbers into fewer bits
introduces rounding error ("quantization noise") that degrades quality if pushed too
far.[^hf-quant]

More than any other single technique, this is what made the local and open-weights
movement possible: it is how a model that would otherwise need a data center's worth
of memory can run on one consumer [[Hardware for LLMs|GPU]], or even a laptop.

## Precision formats

Models step down a ladder of numeric types: from 32-bit float (FP32) to
half-precision **FP16 / BF16**, then to integer formats like **INT8** and **INT4**
(4-bit values are usually *packed* two to a byte, since most hardware has no native
4-bit type), plus specialized types such as **FP8** and **NF4**.[^hf-quant] NF4
("4-bit NormalFloat") comes from the QLoRA work, which introduced it as "a new data
type that is information theoretically optimal for normally distributed
weights."[^dettmers2023]

## Two approaches: PTQ and QAT

There are two broad ways to quantize a model:

- **Post-training quantization (PTQ)** converts an already-trained model to lower
  precision with no retraining — fast, and the most common approach for large
  LLMs.[^hf-quant] Most named LLM methods are PTQ, including [[GPTQ]], [[AWQ]], the
  k-quants used in [[GGUF]], and [[LLM.int8()]].
- **Quantization-aware training (QAT)** instead simulates quantization during
  training — inserting "fake quantization" ops so the model adapts to it — usually
  yielding better accuracy at very low bit-widths.[^hf-quant] The approach was established by Jacob
  and colleagues in 2017, who co-designed training to "preserve end-to-end model
  accuracy" for integer-only inference.[^jacob2017]

(How the mapping is done — symmetric vs. asymmetric scaling, and whether it is applied
per-tensor or per-group — is a further set of knobs that trade a little overhead for
accuracy.[^hf-quant])

## Why it matters

Quantization is the lever that put frontier-scale models within reach of ordinary
hardware. **[[LLM.int8()]]** showed that a "175B parameter 16/32-bit checkpoint can be
loaded, converted to Int8, and used immediately without performance degradation,"
roughly halving the memory needed to run it.[^dettmers2022] Combined with 4-bit
formats and engines like [[llama.cpp]], the same idea brought capable models down to
laptops — and it makes the [[KV cache]] and fine-tuning ([[QLoRA]]) cheaper too. The
method-specific details live in the entries for each technique; this page is the
shared idea behind them.
