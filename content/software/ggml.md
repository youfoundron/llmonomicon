---
title: GGML
description: Georgi Gerganov's C tensor library and the early quantized model formats that preceded GGUF and seeded local LLM inference.
tags: [library, inference, file-format, open-source]
aliases: [ggml, GGML library, GGML format, GGMF, GGJT]
updated: 2026-06-17
sources:
  - id: ggml-repo
    title: "ggml — Tensor library for machine learning (README)"
    url: https://github.com/ggml-org/ggml
    author: Georgi Gerganov and contributors
    publisher: GitHub
    year: 2023
  - id: gguf-spec
    title: "GGUF — Historical State of Affairs (format specification)"
    url: https://github.com/ggml-org/ggml/blob/master/docs/gguf.md
    author: ggml project
    publisher: GitHub
    year: 2023
  - id: gguf-pr
    title: "GGUF file format specification (PR #302)"
    url: https://github.com/ggml-org/ggml/pull/302
    author: philpax and contributors
    publisher: GitHub
    year: 2023
  - id: ggml-site
    title: "ggml.ai"
    url: https://ggml.ai/
    author: ggml.ai
    publisher: ggml.ai
    year: 2023
---

# GGML

**GGML** is two things that share one name. It is a lightweight tensor library
written in C by [[Georgi Gerganov]], and it is also the family of early single-file
model formats — GGML, GGMF, and GGJT — that the surrounding tools first used to
ship quantized weights.[^ggml-repo][^gguf-spec] Both senses sit at the root of
the local-inference movement: the library is the engine behind [[llama.cpp]], and
the formats are the direct ancestors of [[GGUF]].

## The library

ggml describes itself plainly as a "Tensor library for machine learning" — a
low-level compute library with no heavyweight framework attached.[^ggml-repo] Its
design goals are what make it suited to running models on ordinary hardware:

- **Integer quantization** support, for shrinking weights to low precision (see
  [[Quantization]]).[^ggml-repo]
- **Automatic differentiation**, **no third-party dependencies**, and **zero
  memory allocations during runtime**.[^ggml-repo]
- **Broad hardware support**, from commodity CPUs to GPU backends.[^ggml-repo]

The library underpins [[llama.cpp]], whisper.cpp, and the wider ggml.ai
ecosystem.[^ggml-repo][^ggml-site]

## The legacy formats

Before [[GGUF]], the same project shipped models in a short lineage of formats,
each patching a gap in the last:[^gguf-spec]

- **GGML** — the original, unversioned format, lacking versioning or alignment.
- **GGMF** — identical to GGML but with a version number added.
- **GGJT** — introduced tensor alignment so files could be loaded with `mmap`,
  and went through several incompatible versions.

## Why GGUF replaced them

These formats worked but aged badly, and the GGUF specification spells out
exactly why.[^gguf-spec] There was no way to tell which model architecture a
given file was for. Adding or removing a hyperparameter was a silent breaking
change a reader could only detect with heuristics. Untyped value lists forced
hacks like packing the quantization version into another field, and every new
architecture needed its own bespoke conversion script. In practice this meant
frequent format breaks that forced users to re-download or re-convert their
models.

[[GGUF]], introduced in 2023, fixed this by storing hyperparameters in an
extensible key-value structure, so new metadata could be added without breaking
older readers.[^gguf-pr][^gguf-spec]

## Why it matters

GGML is the technical foundation of local LLM inference and the origin point of
the local model-file lifecycle that runs through [[GGUF]] today. Its formats are
now superseded, but the library lives on as the quiet engine inside the tools
that made running capable models on a laptop ordinary.[^ggml-repo]
