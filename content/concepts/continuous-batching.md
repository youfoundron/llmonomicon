---
title: Continuous batching
description: A scheduling technique for LLM serving that adds and removes requests from a running batch at every step, keeping the GPU busy instead of waiting for the slowest sequence.
tags: [inference, serving, throughput]
group: inference
aliases: [In-flight batching, Iteration-level batching, Dynamic batching]
updated: 2026-06-18
sources:
  - id: orca
    title: "Orca: A Distributed Serving System for Transformer-Based Generative Models"
    url: https://www.usenix.org/conference/osdi22/presentation/yu
    author: Yu et al.
    publisher: "USENIX OSDI 2022"
    year: 2022
  - id: anyscale
    title: "How continuous batching enables 23x throughput in LLM inference"
    url: https://www.anyscale.com/blog/continuous-batching-llm-inference
    author: Anyscale
    publisher: Anyscale
    year: 2023
---

# Continuous batching

**Continuous batching** is a scheduling technique that keeps a GPU busy while it serves
many LLM requests at once. Together with [[PagedAttention]] — which handles memory — it
is one of the two pillars of modern high-throughput serving. The two are complementary:
PagedAttention is about *where* the [[KV cache]] lives; continuous batching is about
*when* requests are run.

## Static batching and its problem

The naive way to batch requests is to gather a fixed group, run them together, and wait
for all of them to finish before starting the next group. But LLM requests take wildly
different numbers of steps to complete, so the whole batch stalls on its slowest
member — a classic **head-of-line blocking** problem. As one explainer puts it,
"requests can 'finish' earlier in a batch, but it is tricky to release their
resources," leaving the GPU idling on slots whose work is already done.[^anyscale]

## The fix: scheduling per step

Continuous batching (also called **iteration-level scheduling**) instead makes its
batching decisions at every decoding step: "once a sequence in a batch has completed
generation, a new sequence can be inserted in its place, yielding higher GPU
utilization."[^anyscale] Finished requests leave and waiting ones join continuously, so
the GPU stays saturated rather than waiting on stragglers. The idea was introduced by
the **Orca** serving system (Yu et al., OSDI 2022), which reported a **36.9× throughput
improvement** over NVIDIA's FasterTransformer at the same latency on a
175-billion-parameter model.[^orca] A later analysis measured up to **23× throughput**
from continuous batching combined with vLLM's memory optimizations.[^anyscale]

## Adoption

Continuous batching is now near-universal in production serving stacks, including
[[vLLM]], [[Text Generation Inference (TGI)|Text Generation Inference]], and
[[TensorRT-LLM]]. Paired with [[PagedAttention]], it is why a modern engine can serve
far more concurrent users on the same hardware than a naive request-at-a-time loop ever
could.
