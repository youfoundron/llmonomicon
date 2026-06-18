---
title: vLLM
description: A high-throughput open-source engine for serving large language models on GPUs, built around the PagedAttention memory technique.
tags: [inference, serving, open-source]
aliases: [vllm-project]
updated: 2026-06-17
sources:
  - id: vllm-paper
    title: "Efficient Memory Management for Large Language Model Serving with PagedAttention"
    url: https://arxiv.org/abs/2309.06180
    author: Kwon et al.
    publisher: "arXiv (SOSP 2023)"
    year: 2023
  - id: vllm-blog
    title: "vLLM: Easy, Fast, and Cheap LLM Serving with PagedAttention"
    url: https://blog.vllm.ai/2023/06/20/vllm.html
    author: vLLM Team (UC Berkeley)
    publisher: vLLM Blog
    year: 2023
  - id: vllm-repo
    title: "vllm-project/vllm (GitHub repository)"
    url: https://github.com/vllm-project/vllm
    author: vLLM contributors
    publisher: GitHub
    year: 2023
---

# vLLM

**vLLM** is an open-source library for running large language models as a
service — answering a stream of requests from many users at once, quickly and
cheaply. First released in June 2023 out of the Sky Computing Lab at UC Berkeley,
it has become one of the most widely used engines for **serving** open models on
GPUs.[^vllm-repo][^vllm-blog]

## The problem it solves

When a model generates text it keeps a running **[[KV cache]]** — the saved
intermediate values for every token so far — in GPU memory. That cache is large
and grows and shrinks as a request runs, and serving engines used to reserve it in
big contiguous chunks. The result was heavy waste: memory lost to fragmentation
and to redundant copies, which capped how many requests could run together in a
batch, and therefore how much work a GPU could do.[^vllm-paper]

## PagedAttention

vLLM's central idea is **PagedAttention**, "an attention algorithm inspired by the
classical virtual memory and paging techniques in operating systems."[^vllm-paper]
Instead of one contiguous block per request, it splits the KV cache into small
fixed-size pages that can sit anywhere in memory — yielding "near-zero waste in KV
cache memory" and letting requests share cache pages with one another.[^vllm-paper]
Reclaiming that memory lets the server keep many more requests in flight at once.
The technique has its own entry: [[PagedAttention]].

## What it provides

Beyond the memory trick, vLLM bundles the machinery a production deployment needs:
**[[Continuous batching]]** of incoming requests (adding and retiring requests
mid-flight rather than waiting for a fixed batch to finish), an
**OpenAI-compatible API server** so existing client code works unchanged,
**[[Speculative decoding|speculative decoding]]** for lower-latency generation,
support for spreading a model across multiple GPUs, and a wide range of
[[Quantization|quantized]] weight formats.[^vllm-repo]

## Why it matters

vLLM made high-throughput open-model serving practical. At its 2023 launch it
reported up to **24× higher throughput** than [[Hugging Face Transformers]] and up
to **3.5× more** than Hugging Face's Text Generation Inference (TGI); the
accompanying paper measured a **2–4×** gain over the research serving systems
FasterTransformer and Orca at comparable latency.[^vllm-blog][^vllm-paper] It sits
at the opposite end of the spectrum from [[llama.cpp]]: where llama.cpp targets
single-user, local, often-CPU inference, vLLM is built for GPU servers handling
many users at once.
