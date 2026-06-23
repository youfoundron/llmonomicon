---
title: KV cache
description: The standard inference optimization that stores past keys and values so a model doesn't recompute them for every new token—at the cost of memory that grows with sequence length.
technicality: highly-technical
tags: [inference, mechanism]
group: inference
aliases: [KV caching, key-value cache, key/value cache]
updated: 2026-06-17
sources:
  - id: vaswani2017
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: Vaswani et al.
    publisher: arXiv
    year: 2017
  - id: shazeer2019
    title: "Fast Transformer Decoding: One Write-Head is All You Need"
    url: https://arxiv.org/abs/1911.02150
    author: Noam Shazeer
    publisher: arXiv
    year: 2019
  - id: kwon2023
    title: "Efficient Memory Management for Large Language Model Serving with PagedAttention"
    url: https://arxiv.org/abs/2309.06180
    author: Kwon et al.
    publisher: arXiv
    year: 2023
  - id: nvidia-inference
    title: "Mastering LLM Techniques: Inference Optimization"
    url: https://developer.nvidia.com/blog/mastering-llm-techniques-inference-optimization/
    author: NVIDIA
    publisher: NVIDIA Developer Blog
    year: 2023
---

# KV cache

The **KV cache** is the store of intermediate values a [[Transformer]] keeps in
memory while it generates text, so that it does not have to recompute work it has
already done. It is one of the foundational optimizations of LLM inference — and,
as models take longer inputs, one of the biggest consumers of [[Hardware for LLMs|GPU memory]].

A model produces text one token at a time, and at each step [[Attention]] has the
new token look back over every token before it. The **key** (K) and **value** (V)
vectors of those earlier tokens don't change once they've been computed, so
instead of recalculating them at every step the model caches and reuses them. As
NVIDIA puts it, "to avoid recomputing all these tensors for all tokens at each
time step, it's possible to cache them in GPU memory."[^nvidia-inference] Only the
newest token's query then has to be computed, and it attends to the cached keys
and values.[^vaswani2017]

(For what Q, K, and V are, see [[Attention]]; this entry is about *caching* the
keys and values, not computing them.)

## The tradeoff: memory

Caching trades computation for memory, and the memory adds up fast. The cache
holds a key and a value for every token, in every layer, for every request being
served at once — so its size grows **linearly** with both the sequence length and
the batch size. NVIDIA's worked example: a single Llama-2-7B request can need
roughly **2 GB** of KV cache, separate from and on top of the model's own
weights.[^nvidia-inference] As context windows and batch sizes grow, it is the
cache, not the model, that fills the GPU.

That is why the cache is the central bottleneck in LLM serving. Noam Shazeer
identified "the memory-bandwidth cost of repeatedly loading the large 'keys' and
'values' tensors" as what makes step-by-step decoding slow — the limit is moving
that memory around, not raw arithmetic.[^shazeer2019] In serving systems the cache
"is huge and grows and shrinks dynamically," and a naive layout squanders much of
it to "fragmentation and redundant duplication, limiting the batch size."[^kwon2023]

## What it motivates

Much of the engineering of fast LLM inference is, in effect, a campaign against
the size and cost of the KV cache:

- **[[PagedAttention]]** borrows virtual-memory paging from operating systems to
  hold the cache in scattered fixed-size blocks with "near-zero waste"; it is the
  engine behind [[vLLM]].[^kwon2023]
- **[[Grouped-query & multi-query attention]]** has several attention heads share
  one set of keys and values, directly shrinking the cache and the bandwidth it
  costs.[^shazeer2019]
- **[[KV cache quantization]]** stores the keys and values at lower precision.

Between them, these make the KV cache one of the busiest crossroads in modern
inference work.
