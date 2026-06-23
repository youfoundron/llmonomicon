---
title: Local LLMs
description: Running capable language models on your own consumer hardware instead of a provider's API — the enabling stack, what it unlocks, and the tradeoffs against hosted frontier models.
technicality: somewhat-technical
tags: [inference, open-weights]
group: inference
aliases: [Local LLM, running LLMs locally, on-device LLMs]
updated: 2026-06-17
sources:
  - id: willison-sdmoment
    title: "Large language models are having their Stable Diffusion moment"
    url: https://simonwillison.net/2023/Mar/11/llama/
    author: Simon Willison
    publisher: simonwillison.net
    year: 2023
  - id: willison-gpt4class
    title: "I can now run a GPT-4 class model on my laptop"
    url: https://simonwillison.net/2024/Dec/9/llama-33-70b/
    author: Simon Willison
    publisher: simonwillison.net
    year: 2024
  - id: llamacpp
    title: "ggerganov/llama.cpp (GitHub repository)"
    url: https://github.com/ggerganov/llama.cpp
    author: Georgi Gerganov and contributors
    publisher: GitHub
    year: 2023
  - id: gguf
    title: "GGUF file format specification"
    url: https://github.com/ggml-org/ggml/blob/master/docs/gguf.md
    author: ggml project
    publisher: GitHub
    year: 2023
  - id: ollama
    title: "Ollama"
    url: https://ollama.com
    author: Ollama
    publisher: Ollama
    year: 2024
---

# Local LLMs

**Local LLMs** are large language models run on your own [[Hardware for LLMs|hardware]] — a laptop,
desktop, or even a phone — rather than called over the internet from a provider's
API. For years this was simply impossible: capable models were far too large to
fit on consumer machines, let alone run at usable speed. That changed in early
2023, and "running it on your laptop" has been a defining thread of the open-model
world ever since.

## The moment it became possible

In March 2023, [[Georgi Gerganov]] released [[llama.cpp]], and within days [[Simon
Willison]] was running Meta's [[LLaMA]] models on his own laptop — "the one that
Facebook claim is competitive with GPT-3" — and calling it the moment large
language models were "having their Stable Diffusion moment," a nod to how
downloadable image models had just put generative AI in everyone's
hands.[^willison-sdmoment][^llamacpp]

## The enabling stack

Local inference works because several pieces fit together. Each has its own
entry, so here is only how they combine:

- **[[Open weights]]** — you need a model whose weights you can actually
  download; Meta's [[LLaMA]] was the catalyst.[^willison-sdmoment]
- **[[Quantization]]** — compressing weights to 4-bit and similar low precisions
  lets a multi-billion-parameter model fit in consumer RAM with modest quality
  loss.[^llamacpp]
- **Efficient runtimes** — engines like [[llama.cpp]] run models in portable
  C/C++ across CPU, Apple Silicon, and GPUs from a single codebase,[^llamacpp]
  while [[Ollama]] wraps that into a one-command experience.[^ollama]
- **Portable formats** — [[GGUF]] packages a model and its metadata into a single
  file, now the de facto way local models are shared.[^gguf]

## What it unlocks

Because the model runs entirely on your own device, local LLMs offer things a
hosted API cannot. No prompt or document ever leaves your machine, so it is
**private** by construction; it keeps working **offline** once the weights are
downloaded; and there is **no per-token cost** — you pay once for hardware
instead of per request. For tinkerers it also means the freedom to inspect, swap,
and fine-tune models directly.[^willison-sdmoment]

## The tradeoffs

Running locally trades peak capability and convenience for that control. Larger,
more capable models demand more RAM and VRAM and run slower than a call to a data
center, and the very best frontier models remain hosted-only. But the gap has
narrowed sharply: by December 2024, Willison reported that he could "now run a
GPT-4 class model on my laptop," observing that "the quality of models that are
accessible on consumer hardware has improved _dramatically_ in the past two
years."[^willison-gpt4class]
