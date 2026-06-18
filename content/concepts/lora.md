---
title: LoRA
description: A parameter-efficient fine-tuning method that freezes a model's weights and trains small low-rank update matrices instead, producing tiny, swappable adapter files.
tags: [fine-tuning, method]
aliases: [Low-Rank Adaptation, LoRA adapter, LoRA adapters]
updated: 2026-06-17
sources:
  - id: hu2021
    title: "LoRA: Low-Rank Adaptation of Large Language Models"
    url: https://arxiv.org/abs/2106.09685
    author: "Hu, Shen, Wallis, Allen-Zhu, Li, Wang, Wang, Chen"
    publisher: "arXiv (ICLR 2022)"
    year: 2021
  - id: peft
    title: "PEFT: Parameter-Efficient Fine-Tuning (documentation)"
    url: https://huggingface.co/docs/peft/en/index
    publisher: "Hugging Face"
    year: 2024
  - id: peftlora
    title: "PEFT — LoRA (developer guide)"
    url: https://huggingface.co/docs/peft/en/developer_guides/lora
    publisher: "Hugging Face"
    year: 2024
  - id: peftquick
    title: "PEFT Quicktour — saving and loading LoRA adapters"
    url: https://huggingface.co/docs/peft/en/quicktour
    publisher: "Hugging Face"
    year: 2024
---

# LoRA

**LoRA** (Low-Rank Adaptation) is a cheap way to fine-tune a large model. Rather
than updating all of a model's billions of weights for a new task, LoRA **freezes
the original weights** and trains a small set of extra matrices that adjust the
model's behavior.[^hu2021] It has become the dominant **parameter-efficient
fine-tuning** approach because it cuts the cost of adapting a model by orders of
magnitude while matching the quality of full fine-tuning.

## The low-rank idea

LoRA starts from an observation: the *change* a model needs in order to learn a
new task has a low "intrinsic rank" — it is far simpler than the full weight
matrix it modifies.[^hu2021] So instead of learning a big dense update to a weight
matrix — in a [[Transformer]], typically the query and value projection matrices
of [[Attention]] — LoRA learns that update as the product of two much smaller
matrices, whose shared inner dimension (the **rank**) is tiny next to the layer's
width, and adds it alongside the frozen original.[^hu2021] Only those small
matrices are trained.

The savings are large. Compared with full fine-tuning of [[GPT-3]] 175B using
Adam, LoRA cuts the number of trainable parameters by roughly **10,000×** and the
GPU memory required by about **3×**, while performing on par with or better than
full fine-tuning across models such as RoBERTa, DeBERTa, GPT-2, and
GPT-3.[^hu2021] And because the trained update is just a pair of matrices, it can
be **merged back into the frozen weights** at deployment — so LoRA adds **no extra
latency at inference**, unlike earlier adapter methods.[^hu2021]

## Adapters as small, swappable files

A practical consequence is that the thing you train and share is tiny. In Hugging
Face's **PEFT** library — the standard implementation of LoRA,[^peft] where it is
"one of the most popular PEFT methods"[^peftlora] — a trained adapter is saved as
just a small config file plus an `adapter_model.safetensors` file of
weights.[^peftquick] These adapters are small enough to swap in per task: a LoRA
adapter for a 350M-parameter model is on the order of **6 MB**, against roughly
**700 MB** for the full model.[^peftquick] Because adapters ship in the
[[safetensors]] format, the same safety and portability story applies to them as
to full model weights.

## Related

For a variant that also quantizes the frozen base model to 4-bit, so a large
fine-tuning run fits on a single GPU, see [[QLoRA]]; the underlying idea of
shrinking weights to lower precision is [[Quantization]].
