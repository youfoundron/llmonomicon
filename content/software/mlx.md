---
title: MLX
description: Apple's open-source array and machine-learning framework for Apple Silicon — a PyTorch/JAX-style toolkit (with mlx-lm for running Hugging Face models) that has become the default way to run and train LLMs on a Mac.
tags: [framework, local-llms, open-source]
technicality: technical
aliases: [Apple MLX, mlx-lm, ml-explore]
updated: 2026-06-23
sources:
  - id: mlx-repo
    title: "ml-explore/mlx — MLX: An array framework for Apple silicon (GitHub)"
    url: https://github.com/ml-explore/mlx
    author: Apple (ml-explore)
    publisher: GitHub
    year: 2023
  - id: mlx-lm-repo
    title: "ml-explore/mlx-lm — Run LLMs with MLX (GitHub)"
    url: https://github.com/ml-explore/mlx-lm
    author: Apple (ml-explore)
    publisher: GitHub
    year: 2025
  - id: apple-m5-mlx
    title: "Exploring LLMs with MLX and the Neural Accelerators in the M5 GPU"
    url: https://machinelearning.apple.com/research/exploring-llms-mlx-m5
    author: Apple Machine Learning Research
    publisher: Apple
    year: 2025
  - id: ollama-mlx
    title: "Ollama is now powered by MLX on Apple Silicon"
    url: https://ollama.com/blog/mlx
    author: Ollama
    publisher: Ollama
    year: 2026
---

# MLX

**MLX** is Apple's open-source **array and machine-learning framework built for [[Apple Silicon]]**.
It offers a NumPy-like API with PyTorch-style neural-network modules, so it feels familiar to anyone
who has used [[PyTorch]] or [[JAX]] — and it has become a common way to run and train models on a Mac.

## What it is

MLX was released by Apple's **`ml-explore`** team in December 2023; it is MIT-licensed, with a C++
core and Python and Swift APIs.[^mlx-repo] Its design is shaped by [[Apple Silicon]]'s **unified
memory**: arrays live in a single pool that both the CPU and GPU use, with no explicit copies between
devices, and the framework adds **lazy evaluation** and composable function transformations (echoing
[[JAX]]). That tight fit with the hardware is what makes it efficient on M-series chips.[^apple-m5-mlx]

## Why it matters for LLMs

The companion library **`mlx-lm`** (split into its own project in March 2025) can **run and fine-tune
most [[Hugging Face]] models directly on a Mac**, with built-in [[Quantization]] to shrink their
memory footprint.[^mlx-lm-repo][^apple-m5-mlx] That makes MLX a core piece of the [[Local LLMs]] stack
alongside [[llama.cpp]] and [[Ollama]] — and as of 2026, Ollama's Apple-Silicon backend is itself
built on MLX.[^ollama-mlx]

It is worth distinguishing MLX from Apple's older **Core ML**: MLX is an open framework for *training
and inference* research on Apple Silicon (the [[PyTorch]]/[[JAX]] counterpart for Macs), whereas Core
ML is the on-device path for *deploying* an already-trained model inside an app.
