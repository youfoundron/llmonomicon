---
title: LLM.int8()
description: An 8-bit inference method that halves a large model's memory with no quality loss, by keeping a few outlier features in higher precision.
technicality: highly-technical
tags: [quantization, inference, efficiency]
group: efficiency
aliases: [LLM.int8, int8 quantization, load_in_8bit]
updated: 2026-06-18
sources:
  - id: dettmers2022
    title: "LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"
    url: https://arxiv.org/abs/2208.07339
    author: Dettmers, Lewis, Belkada & Zettlemoyer
    publisher: arXiv
    year: 2022
---

# LLM.int8()

**LLM.int8()** is a [[Quantization|quantization]] method that runs a large model's
matrix multiplications in 8-bit integers instead of 16-bit floats — roughly **halving
the memory** needed for inference — with, crucially, **no loss in accuracy**. For many
practitioners it was the first taste of quantization, through the `load_in_8bit`
option in Hugging Face's libraries.

## The outlier problem

Naively casting everything to int8 works for most of a model, but Dettmers and
colleagues found that at scale a handful of **outlier features** — "outlier feature
dimensions" with unusually large magnitudes — emerge and, if quantized like everything
else, wreck the model's accuracy.[^dettmers2022] LLM.int8() handles this with two ideas:

- **Vector-wise quantization** uses "separate normalization constants for each inner
  product" in a matrix multiplication, rather than a single scale for the whole
  tensor, which preserves more precision.[^dettmers2022]
- **Mixed-precision decomposition** "isolates the outlier feature dimensions into a
  16-bit matrix multiplication while still more than 99.9% of values are multiplied in
  8-bit."[^dettmers2022] The rare troublesome dimensions stay in higher precision;
  everything else goes to int8.

## Why it mattered

The payoff was access. The method made it "possible to perform inference in LLMs with
up to 175B parameters without any performance degradation," bringing models such as
OPT-175B and [[BLOOM]] within reach of consumer-grade GPUs.[^dettmers2022] Shipped in
the bitsandbytes library and integrated into Hugging Face, it became one of the most
common on-ramps to running large models locally. It is a sibling to the other
post-training quantizers [[GPTQ]] and [[AWQ]], and the 8-bit-inference forerunner of
the same authors' 4-bit *finetuning* method, [[QLoRA]].
