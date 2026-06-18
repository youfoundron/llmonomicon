---
title: PagedAttention
description: The technique that manages a model's KV cache like operating-system virtual memory—in non-contiguous pages—nearly eliminating the waste that limited LLM serving.
technicality: highly-technical
tags: [inference, serving, memory]
group: inference
aliases: [Paged attention]
updated: 2026-06-18
sources:
  - id: kwon2023
    title: "Efficient Memory Management for Large Language Model Serving with PagedAttention"
    url: https://arxiv.org/abs/2309.06180
    author: Kwon et al.
    publisher: arXiv
    year: 2023
---

# PagedAttention

**PagedAttention** is a technique for managing a model's [[KV cache]] efficiently
during serving, borrowed directly from how operating systems manage memory. Instead of
storing each request's cache as one big contiguous block, it splits the cache into
small fixed-size **pages** that can live anywhere in GPU memory, tracked through a
lookup table — exactly the way an OS maps a program's virtual-memory pages onto
scattered physical frames.[^kwon2023] It was introduced as the engine behind [[vLLM]],
but the idea has since been adopted across serving systems.

## The problem

A request's [[KV cache]] "is huge and grows and shrinks dynamically" as generation
proceeds. The simple approach — reserve one contiguous slab per request, sized to the
longest sequence it might produce — wastes a great deal of memory: much of it sits
reserved but unused, and the leftover gaps fragment memory so badly that the cache
"can be significantly wasted by fragmentation and redundant duplication, limiting the
batch size."[^kwon2023] Since a bigger batch is what keeps a GPU busy, that wasted
memory directly caps throughput.

## The solution

By paging the cache into non-contiguous blocks, PagedAttention achieves "near-zero
waste in KV cache memory."[^kwon2023] The same indirection brings a bonus: blocks can
be **shared** — "flexible sharing of KV cache within and across requests" — so a common
prompt prefix, or the parallel branches of a single generation, can reuse the same
physical pages and only copy them when they diverge.[^kwon2023] Reclaiming that memory
lets the server keep far more requests in flight at once, which is why the technique
(as realized in [[vLLM]]) delivered **2–4× higher throughput** than earlier serving
systems at comparable latency.[^kwon2023] The cache it manages is described in
[[KV cache]], and the engine that introduced it in [[vLLM]].
