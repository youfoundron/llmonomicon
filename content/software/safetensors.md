---
title: safetensors
description: A simple, secure file format for model weights — unlike Python pickle, loading one runs no code — that still loads fast.
technicality: technical
tags: [format, security, open-source]
aliases: [Safetensors, SafeTensors, .safetensors]
updated: 2026-06-17
sources:
  - id: st-repo
    title: "safetensors — Format specification (README)"
    url: https://github.com/huggingface/safetensors
    author: Hugging Face
    publisher: GitHub
    year: 2023
  - id: st-docs
    title: "Safetensors — Documentation"
    url: https://huggingface.co/docs/safetensors/index
    author: Hugging Face
    publisher: Hugging Face
    year: 2023
  - id: st-audit
    title: "Safetensors audited as really safe and becoming the default"
    url: https://huggingface.co/blog/safetensors-security-audit
    author: Nicolas Patry; Stella Biderman
    publisher: Hugging Face / EleutherAI Blog
    year: 2023
  - id: st-tob
    title: "EleutherAI, Hugging Face Safetensors Library Security Assessment"
    url: https://github.com/trailofbits/publications/blob/master/reviews/2023-03-eleutherai-huggingface-safetensors-securityreview.pdf
    author: Trail of Bits
    publisher: Trail of Bits
    year: 2023
  - id: st-hub
    title: "huggingface_hub — Serialization (save_torch_model, safe_serialization)"
    url: https://huggingface.co/docs/huggingface_hub/main/en/package_reference/serialization
    author: Hugging Face
    publisher: Hugging Face
---

# safetensors

**safetensors** is a file format, created by Hugging Face, for saving and loading
the large arrays of numbers — the **weights** — that make up a trained model. The
goal is in the name: store those tensors *safely*, without the security risks of
the formats it replaced, while still loading quickly.[^st-docs]

## The problem it solves

Before safetensors, models in PyTorch were usually saved with Python's **pickle**
(via `torch.save` / `torch.load`). Pickle is a general-purpose
[[Model serialization|serialization]] mechanism, and loading a pickled file can
execute arbitrary code — so a malicious weights file can "give full control of a
user's computer to an attacker without the user's knowledge."[^st-audit] Because
open weights are routinely downloaded and shared between strangers, that is a real
risk every time you load a model.

safetensors removes the risk by storing **only data**. A file holds the numbers
and a small index describing them — there is no code to run on load, so opening an
untrusted file cannot, by construction, execute anything.[^st-audit] The library
itself is written in Rust, which "adds an extra layer of security coming directly
from the language itself."[^st-audit]

## How the format works

A safetensors file has three parts laid out in sequence:[^st-repo]

1. **8 bytes** — a little-endian 64-bit integer giving the size of the header.
2. **A JSON header** — UTF-8 text that, for each tensor, records its data type,
   shape, and the byte offsets where its data begins and ends, plus an optional
   free-form `__metadata__` block.
3. **The raw bytes** of every tensor, packed contiguously with no gaps.

Because the data sits in one contiguous block with an offset table pointing into
it, a loader can **memory-map** the file and read tensors *zero-copy* — pulling
only the tensors it needs (say, the shard for a single GPU) without copying the
whole file into memory.[^st-repo] That makes large checkpoints fast to load as
well as safe.

## Audited, then adopted

In May 2023, Hugging Face — together with EleutherAI and Stability AI —
commissioned an external security audit from **Trail of Bits**. It found no flaw
that could lead to arbitrary code execution, tightened the specification, and
fixed a "polyglot file" weakness (a single file that is valid as two formats at
once).[^st-audit][^st-tob] On the strength of that review, Hugging Face committed
to making safetensors a core dependency of [[Hugging Face Transformers]] and its
default save format.[^st-audit] That shift has since landed: saving weights as
safetensors is now the default across the Hugging Face ecosystem and writing
pickle checkpoints is deprecated,[^st-hub] and the format is used widely across
the open-weights world — from `transformers` and `diffusers` to local-inference
and image-generation tools.[^st-docs]

## Why it matters

safetensors made the everyday act of downloading model weights meaningfully safer
without giving up speed, and it did so as a small, well-specified format rather
than a framework. It sits alongside local-inference formats like [[GGUF]]: where
GGUF packs an often [[Quantization|quantized]] model into one portable file for
running on a laptop, safetensors is the format of choice for the full-precision
weights traded in the research-and-fine-tuning workflow.[^st-docs] The same format
also carries lighter-weight artifacts such as [[LoRA]] fine-tuning adapters.
