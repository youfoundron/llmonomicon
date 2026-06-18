---
title: Grouped-query & multi-query attention
description: Attention variants that let query heads share key/value heads, shrinking the KV cache and speeding up inference at a small cost to quality.
tags: [architecture, attention, efficiency]
group: architecture
aliases: [GQA, MQA, Grouped-query attention, Multi-query attention, grouped query attention, multi query attention]
updated: 2026-06-18
sources:
  - id: shazeer2019
    title: "Fast Transformer Decoding: One Write-Head is All You Need"
    url: https://arxiv.org/abs/1911.02150
    author: Noam Shazeer
    publisher: arXiv
    year: 2019
  - id: ainslie2023
    title: "GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints"
    url: https://arxiv.org/abs/2305.13245
    author: Ainslie et al.
    publisher: arXiv
    year: 2023
  - id: llama2-hf
    title: "Llama 2 (Hugging Face Transformers docs)"
    url: https://huggingface.co/docs/transformers/en/model_doc/llama2
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
---

# Grouped-query & multi-query attention

**Multi-query attention (MQA)** and **grouped-query attention (GQA)** are variants of
the [[Attention]] mechanism designed to make inference cheaper. They target the main
bottleneck of generation — the [[KV cache]], whose size, and the memory bandwidth
needed to read it at each step, grows with the number of attention heads that keep
their own keys and values. The fix is to have query heads **share** key/value heads.

## From MHA to MQA to GQA

In standard **multi-head attention (MHA)**, every query head has its own key and value
head, so the KV cache grows with the head count.

- **Multi-query attention (MQA)**, introduced by Noam Shazeer in 2019, takes the
  extreme case: *all* query heads share a **single** key/value head, "greatly reducing
  the size of these tensors and hence the memory bandwidth requirements of incremental
  decoding."[^shazeer2019] The savings are large, but using just one K/V head "can lead
  to quality degradation."[^ainslie2023]
- **Grouped-query attention (GQA)** is the middle ground. It uses "an intermediate
  (more than one, less than number of query heads) number of key-value heads,"
  splitting the query heads into groups that each share one K/V head.[^ainslie2023] It
  thus interpolates between MHA and MQA: Ainslie and colleagues report that GQA
  "achieves quality close to multi-head attention with comparable speed to MQA," and
  give a recipe to convert ("uptrain") an existing MHA model into a GQA one using about
  "5% of original pre-training compute."[^ainslie2023]

## Why it's everywhere

GQA has become a default in modern open models, because the [[KV cache]] savings
translate directly into faster, cheaper serving. Hugging Face's documentation notes
that [[Llama 2]] "uses grouped-query attention (GQA) in the 70B model to improve
inference," and the whole spectrum is exposed as a single setting: with the number of
key/value heads equal to the number of query heads you have MHA, set to one you have
MQA, and anything in between is GQA.[^llama2-hf]

This is a different lever from [[FlashAttention]], which speeds attention up by
computing it in a more memory-efficient way *without changing the result*.
Head-sharing instead changes the model itself — fewer K/V heads — trading a little
quality for a smaller cache.
