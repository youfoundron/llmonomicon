---
title: SGLang
description: A high-performance LLM serving engine, distinguished from vLLM by RadixAttention—which reuses KV-cache prefixes across requests—and a structured-generation frontend.
tags: [open-source, inference, serving]
updated: 2026-06-18
sources:
  - id: sglang-paper
    title: "SGLang: Efficient Execution of Structured Language Model Programs"
    url: https://arxiv.org/abs/2312.07104
    author: Zheng et al.
    publisher: arXiv
    year: 2023
  - id: sglang-repo
    title: "sgl-project/sglang (GitHub repository)"
    url: https://github.com/sgl-project/sglang
    author: SGLang team
    publisher: GitHub
    year: 2024
---

# SGLang

**SGLang** is a high-performance serving engine for large language and multimodal
models — a peer to [[vLLM]], from the same Berkeley/LMSYS research
lineage.[^sglang-paper][^sglang-repo] Where vLLM's signature is memory management,
SGLang's two distinguishing ideas are **reusing computation across requests** and a
built-in **structured-generation** frontend.

## RadixAttention

SGLang's core runtime innovation is **RadixAttention**, which automatically reuses
the [[KV cache]] across requests by sharing common **prefixes** — it keeps cached
prefixes in a radix tree so repeated context is served from the cache instead of
being recomputed.[^sglang-paper] This makes a clean contrast with [[vLLM]]: where
[[PagedAttention]] *manages* KV-cache memory efficiently *within* a request,
RadixAttention *reuses* shared prefixes *between* requests — a large win for
workloads that repeat context, such as few-shot prompting, multi-turn chat, and
agent loops. (The KV cache itself is explained in its own entry.)

## Structured generation

SGLang's other half is a frontend language for **structured generation** — primitives
for controlling generation, parallelism, and constraints — backed by a runtime that
uses "compressed finite state machines for faster structured output
decoding."[^sglang-paper] In effect it builds fast [[Constrained decoding]] into the
serving layer, making reliable JSON and other formats a first-class feature rather
than an add-on.

## Performance and adoption

The SGLang paper reports up to **6.4× higher throughput** than prior state-of-the-art
inference systems.[^sglang-paper] By its maintainers' account the project is now
deployed at very large scale — "trillions of tokens in production each day" — across
major cloud and hardware vendors.[^sglang-repo]
