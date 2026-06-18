---
title: Georgi Gerganov
description: The developer behind ggml, llama.cpp, and the GGUF format — the tools that made running large language models on consumer hardware practical.
tags: [developer, open-source]
aliases: [Gerganov, ggerganov]
updated: 2026-06-17
sources:
  - id: github
    title: "Georgi Gerganov (GitHub profile)"
    url: https://github.com/ggerganov
    author: Georgi Gerganov
    publisher: GitHub
    year: 2024
  - id: ggml-site
    title: "ggml.ai"
    url: https://ggml.ai/
    author: ggml.ai
    publisher: ggml.ai
    year: 2023
  - id: gguf-spec
    title: "GGUF file format specification"
    url: https://github.com/ggml-org/ggml/blob/master/docs/gguf.md
    author: ggml project (Georgi Gerganov and contributors)
    publisher: GitHub
    year: 2023
---

# Georgi Gerganov

**Georgi Gerganov** is a software developer, based in Sofia, Bulgaria, whose
open-source tools did more than almost anyone's to put large language models on
ordinary consumer hardware.[^github] Working under the GitHub handle `ggerganov`,
he is the creator of **[[GGML|ggml]]** (a "tensor library for machine learning"),
**[[llama.cpp]]** ("LLM inference in C/C++"), and **whisper.cpp** (a C/C++ port
of OpenAI's Whisper speech-recognition model).[^github][^ggml-site]

## Why he matters

Before his work, running a capable model generally meant renting time on
data-center GPUs. Gerganov's tools changed that. His ggml library is built
explicitly "to enable large models and high performance on commodity
hardware,"[^ggml-site] and he originated the [[GGUF]] single-file format that
became the de facto standard for distributing models meant to run
locally.[^gguf-spec] Combined with aggressive [[Quantization]], these made it
practical to run multi-billion-parameter models on a laptop or a Mac — making
Gerganov, more than any other single person, the engine of the [[Local LLMs]]
movement.[^ggml-site]

## ggml.ai

In 2023, Gerganov founded the company **ggml.ai** to develop the library further,
with pre-seed funding from Nat Friedman and Daniel Gross.[^ggml-site] The company
was acquired by Hugging Face in 2026,[^ggml-site] and his GitHub profile now lists
a Hugging Face affiliation.[^github]
