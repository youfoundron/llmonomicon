---
title: TensorRT-LLM
description: NVIDIA's open-source library for maximum-performance LLM inference on NVIDIA GPUs — built on the TensorRT compiler, now with a PyTorch backend — with continuous batching, a paged KV cache, and aggressive low-precision quantization.
technicality: highly-technical
tags: [inference, efficiency]
aliases: [TensorRT LLM]
updated: 2026-06-18
sources:
  - id: trtllm-repo
    title: "NVIDIA/TensorRT-LLM (GitHub)"
    url: https://github.com/NVIDIA/TensorRT-LLM
    author: NVIDIA
    publisher: GitHub
    year: 2026
  - id: trtllm-docs
    title: "TensorRT-LLM Documentation"
    url: https://nvidia.github.io/TensorRT-LLM/
    author: NVIDIA
    publisher: NVIDIA
    year: 2026
---

# TensorRT-LLM

**TensorRT-LLM** is NVIDIA's open-source library for running large language models as fast as
possible on NVIDIA GPUs. It pairs a Python API for defining and serving models with a deep stack of
GPU-specific optimizations, and is the tool teams typically reach for when wringing maximum
throughput and minimum latency out of NVIDIA hardware in production.[^trtllm-repo]

## What it does

TensorRT-LLM provides "state-of-the-art optimizations to perform inference efficiently on NVIDIA
GPUs."[^trtllm-repo] These cover the now-standard serving techniques — in-flight (continuous)
[[Continuous batching|batching]], a paged [[KV cache]], and multi-GPU tensor- and
pipeline-parallelism — alongside aggressive low-precision [[Quantization]] (FP8, INT8, INT4) and
hand-tuned "custom kernels for common inference operations (attention, GEMMs, MoE, ...)."[^trtllm-repo]
It is commonly deployed behind NVIDIA's Triton Inference Server for production serving.[^trtllm-repo]

## Engines, then PyTorch

The library is named for **TensorRT**, NVIDIA's deep-learning inference compiler, and its original
workflow was an ahead-of-time **compile** step: turn a model into a hardware- and
precision-specific inference *engine*, trading flexibility for raw speed. More recent versions add
a **PyTorch backend** alongside the library's Python LLM API, shifting it toward a more flexible,
runtime-like workflow than its compiler name implies.[^trtllm-docs] Either way, the optimizations
are tuned tightly to NVIDIA silicon.

## Its niche

TensorRT-LLM's strength is also its boundary: it targets **NVIDIA GPUs only**. That makes it a
go-to for maximum performance on NVIDIA hardware, but more specialized than a portable serving
engine like [[vLLM]], which aims to run well across a wider range of setups. In a typical stack it
occupies the lowest, most hardware-specific layer of LLM inference.[^trtllm-repo]
