---
title: PyTorch
description: The open-source, Python-first deep learning framework — tensors, autograd, and GPU acceleration — that most modern AI models, large language models included, are built and trained in.
tags: [framework, training, open-source]
technicality: technical
aliases: [PyTorch 2.0, libtorch]
updated: 2026-06-23
sources:
  - id: paszke2019
    title: "PyTorch: An Imperative Style, High-Performance Deep Learning Library"
    url: https://arxiv.org/abs/1912.01703
    author: Paszke et al.
    publisher: NeurIPS / arXiv
    year: 2019
  - id: pytorch_versions
    title: "pytorch/pytorch — releases & version history"
    url: https://github.com/pytorch/pytorch/releases
    author: PyTorch maintainers
    publisher: GitHub
    year: 2026
  - id: pytorch-hn
    title: "PyTorch – Tensors and Dynamic neural networks in Python (public launch announcement, linking to pytorch.org)"
    url: https://news.ycombinator.com/item?id=13428098
    author: Hacker News
    publisher: Hacker News
    year: 2017
  - id: caffe2_v1
    title: "Caffe2 and PyTorch join forces to create a Research + Production platform PyTorch 1.0"
    url: https://caffe2.ai/blog/2018/05/02/Caffe2_PyTorch_1_0.html
    author: Caffe2 / PyTorch team
    publisher: caffe2.ai
    year: 2018
  - id: pytorch20
    title: "PyTorch 2.0: Our next generation release that is faster, more Pythonic and Dynamic as ever"
    url: https://pytorch.org/blog/pytorch-2.0-release/
    author: PyTorch team
    publisher: pytorch.org
    year: 2023
  - id: pytorch_foundation2022
    title: "Announcing the PyTorch Foundation: A new era for the cutting-edge AI framework"
    url: https://ai.meta.com/blog/pytorch-foundation/
    author: Meta AI
    publisher: ai.meta.com
    year: 2022
  - id: pytorch_umbrella2025
    title: "PyTorch Foundation Expands to an Umbrella Foundation"
    url: https://pytorch.org/blog/pt-foundation-expands/
    author: PyTorch Foundation
    publisher: pytorch.org
    year: 2025
---

# PyTorch

**PyTorch** is the open-source software framework that most modern AI models —
large language models very much included — are built and trained in. At its core
it is a Python library for working with **tensors** (the multi-dimensional arrays
that hold a model's numbers) on GPUs, with built-in **automatic differentiation**,
or *autograd* — the machinery that computes the gradients used to train a neural
network.[^paszke2019] If a model is the recipe, PyTorch is the kitchen: the
substrate the code actually runs on.

## Define-by-run: why research adopted it

PyTorch's defining design choice is **eager, "define-by-run" execution**. A model
is just ordinary Python that runs line by line, so you can print intermediate
values and step through it with a normal debugger.[^paszke2019] That contrasted
sharply with the **static-graph** style of early [[TensorFlow]], where you first
defined a fixed computation graph and only then fed data through it — powerful, but
awkward to debug and experiment with. PyTorch's more natural, Pythonic feel is
widely credited for its rapid takeover of machine-learning research.[^paszke2019]

## Origins and milestones

PyTorch grew out of the older Lua-based Torch library; development began in 2016 at
Facebook AI Research (now [[Meta AI]]), led by Soumith Chintala with Adam Paszke,
Sam Gross, and Gregory Chanan among the early authors.[^pytorch_versions] It was
first released publicly in **January 2017** (version 0.1).[^pytorch-hn] A few
releases mark the path since:

- **PyTorch 1.0** (announced May 2018, stable that December) merged in Facebook's
  Caffe2 project to unify research and production in a single framework.[^caffe2_v1]
- **PyTorch 2.0** (March 2023) introduced `torch.compile`, an optional compiler
  (built on a component called TorchDynamo) that speeds models up while preserving
  the easy eager-mode experience.[^pytorch20]
- The latest stable release **as of June 2026 is PyTorch 2.12** (2.12.1, released
  June 18, 2026).[^pytorch_versions]

## Governance: the PyTorch Foundation

In **September 2022**, Meta moved PyTorch out of its sole control into the
independent **PyTorch Foundation**, hosted by the Linux Foundation, with founding
members including AMD, AWS, Google, Meta, Microsoft, and
NVIDIA.[^pytorch_foundation2022] On **April 29, 2025**, the Foundation expanded into
an **umbrella** organization — over 30 members and roughly 120 ecosystem projects —
that now hosts not only PyTorch itself but related tools such as [[vLLM]],
DeepSpeed, ExecuTorch, Ray, and [[safetensors]].[^pytorch_umbrella2025]

## Why it matters for LLMs

PyTorch is the connective tissue of the open LLM stack. [[Hugging Face Transformers]],
Meta's own [[LLaMA]] models, and inference engines like [[vLLM]] are all built on
or interoperate with it. Several other entries here exist because of it:
[[safetensors]] was created to replace PyTorch's unsafe, pickle-based `torch.save`
format ([[Model serialization]]); [[ONNX]] began as a project inside the PyTorch
team for moving models between frameworks; and kernels like [[FlashAttention]] are
distributed as PyTorch extensions. To understand PyTorch is, in large part, to
understand how LLMs are actually made.
