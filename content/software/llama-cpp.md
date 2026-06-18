---
title: llama.cpp
description: A C/C++ project for running LLMs efficiently on commodity hardware, popularizing local inference and quantization.
tags: [inference, open-source]
aliases: [llama cpp, GGUF]
updated: 2026-06-17
sources:
  - id: repo
    title: "ggerganov/llama.cpp (GitHub repository)"
    url: https://github.com/ggerganov/llama.cpp
    author: Georgi Gerganov and contributors
    publisher: GitHub
    year: 2023
  - id: gguf
    title: "GGUF file format specification"
    url: https://github.com/ggerganov/ggml/blob/master/docs/gguf.md
    author: ggml project
    publisher: GitHub
    year: 2023
---

# llama.cpp

**llama.cpp** is an open-source project, started by Georgi Gerganov in 2023, for
running large language models efficiently in plain C/C++ with no heavyweight
dependencies. It began as a port of Meta's LLaMA weights to the CPU and grew into
a widely used engine for **local inference**.[^repo] It is also the main testing
ground for [[GGML]], the underlying tensor library.[^repo]

## What it popularized

- **Quantization.** Reducing weights to 4-bit and other low-precision formats so
  multi-billion-parameter models fit in consumer RAM with modest quality
  loss.[^repo]
- **The GGUF format.** A single-file model format carrying weights and metadata,
  now a de facto standard for portable local models.[^gguf]
- **Broad hardware support.** CPU, Apple Silicon (Metal), and GPU backends from
  one codebase.[^repo]

## Why it matters

By making capable models runnable on a laptop, llama.cpp helped catalyze the
local and open-weights movement, complementing higher-level libraries like
[[Hugging Face Transformers]]. It lowered the cost of experimenting with
[[Transformer]] models from a data-center budget to a personal one.
