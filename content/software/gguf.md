---
title: GGUF
description: The single-file format of the llama.cpp / ggml ecosystem that packs a model's weights, metadata, and tokenizer into one mmap-friendly file for local inference.
tags: [format, inference, open-source]
aliases: [GGUF format, .gguf, GGML Universal File]
updated: 2026-06-17
sources:
  - id: gguf-spec
    title: "GGUF file format specification (ggml/docs/gguf.md)"
    url: https://github.com/ggml-org/ggml/blob/master/docs/gguf.md
    author: ggml project (Georgi Gerganov and contributors)
    publisher: GitHub
    year: 2023
  - id: gguf-pr
    title: "GGUF — new file format with flexible metadata (beta) (llama.cpp PR #2398)"
    url: https://github.com/ggml-org/llama.cpp/pull/2398
    author: Georgi Gerganov
    publisher: GitHub
    year: 2023
  - id: hf-gguf
    title: "GGUF (Hugging Face Hub documentation)"
    url: https://huggingface.co/docs/hub/en/gguf
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
  - id: gguf-wiki
    title: "GGUF (Wikipedia)"
    url: https://en.wikipedia.org/wiki/GGUF
    publisher: Wikipedia
    year: 2025
---

# GGUF

**GGUF** is the single-file format used to store and distribute models for local
inference in the [[llama.cpp]] / ggml ecosystem. One `.gguf` file carries
everything a runtime needs to load a model — the **weights**, a block of
extensible key/value **metadata**, the **tokenizer**, and the **quantization**
details — with no external files required.[^gguf-spec][^hf-gguf] The spec does
not formally spell out the acronym; it is commonly expanded *GGML Universal
File*.[^gguf-wiki]

## Why it replaced GGML

GGUF is the successor to the earlier **GGML**, GGMF, and GGJT formats.[^gguf-spec]
Those stored their settings as a bare list of untyped values, which caused two
recurring problems: there was no reliable way to record *which* model
architecture a file was for, and adding any new field was a breaking change —
every existing file had to be re-converted and re-downloaded. GGUF fixes this with
a typed **key/value metadata** section, so new information can be added to a model
without breaking compatibility with existing ones.[^gguf-spec] See [[GGML]] for the
predecessor format and tensor library.

## How the format works

A GGUF file is laid out in four sections:[^gguf-spec]

1. **Header** — a magic number (the ASCII bytes `GGUF`), a format version, and
   counts of how many tensors and metadata entries follow.
2. **Metadata** — typed key/value pairs with dotted names such as
   `general.architecture`, holding hyperparameters, tokenizer data, and more.
3. **Tensor info** — each tensor's name, shape, type, and offset.
4. **Tensor data** — the raw weights, aligned so the file can be memory-mapped.

Because everything needed to load a model lives in the one file, a `.gguf` model
is "easily distributed and loaded" and can be "loaded using `mmap` for fast
loading."[^gguf-spec] This is the main contrast with a tensor-only format like
[[safetensors]]: GGUF "encodes both the tensors and a standardized set of
metadata," including the tokenizer.[^hf-gguf]

## Quantization in the filename

GGUF models are usually distributed pre-quantized, and the scheme is written into
the filename — for example `model.Q4_K_M.gguf`. Read roughly, the number is the
bits kept per weight (here about four), `K` marks the "k-quant" scheme that holds
the most sensitive weights at higher precision, and the `S`/`M`/`L` suffix trades
file size against quality.[^hf-gguf] The details belong with the broader idea of
[[Quantization]].

## Its role

Introduced on 21 August 2023 by Georgi Gerganov — the author of [[llama.cpp]] —
GGUF arrived as a single deliberate breaking change that required users to
re-convert their existing models.[^gguf-pr] It has since become the de facto
format of the local and open-weights movement, read by [[llama.cpp]], [[Ollama]],
LM Studio, and GPT4All, and supported directly on the Hugging Face Hub with a
metadata viewer and a dedicated filter.[^hf-gguf]
