---
title: Text Generation Inference (TGI)
description: Hugging Face's production server for serving LLMs—and a notable case study in open-source licensing, after a brief move to a restrictive license and back.
tags: [open-source, inference, serving]
aliases: [TGI]
updated: 2026-06-17
sources:
  - id: tgi-repo
    title: "huggingface/text-generation-inference (GitHub repository)"
    url: https://github.com/huggingface/text-generation-inference
    author: Hugging Face
    publisher: GitHub
    year: 2024
  - id: tgi-license-faq
    title: "New HFOIL 1.0 license — FAQ (TGI issue #744)"
    url: https://github.com/huggingface/text-generation-inference/issues/744
    author: Hugging Face
    publisher: GitHub
    year: 2023
  - id: tgi-relicense
    title: "Julien Chaumond — TGI returns to Apache 2.0 (announcement)"
    url: https://twitter.com/julien_c/status/1777328456709062848
    author: Julien Chaumond (Hugging Face)
    publisher: X (Twitter)
    year: 2024
---

# Text Generation Inference (TGI)

**Text Generation Inference** (TGI) is [[Hugging Face Transformers|Hugging Face]]'s
production server for serving large language models — a "Rust, Python and gRPC server
for text generation inference" that the company uses to power its own Hugging Chat,
Inference API, and Inference Endpoints.[^tgi-repo] It is one of the main open-source
serving stacks, a peer to [[vLLM]].

It helps to be clear about what TGI is *not*: it is a **serving server**, distinct
from the [[Hugging Face Transformers]] modeling library (which defines and runs models
in Python), and it is a **separate project** from [[vLLM]], even though the two
implement many of the same techniques.

## What it provides

TGI bundles the machinery a production deployment needs: [[Continuous batching]] of
requests, tensor parallelism across GPUs, token streaming, an OpenAI-compatible API,
and support for several [[Quantization]] methods.[^tgi-repo] Those individual
techniques have their own entries; TGI's role is to package them into a deployable
server.

## A licensing case study

TGI is also a useful example of the licensing tensions around open AI infrastructure.
It was released under the permissive **Apache 2.0** license through version 0.9.4,
but in July 2023 its v1.0 switched to a custom, restrictive license — **HFOIL**, the
Hugging Face Optimized Inference License — which limited offering TGI as a hosted,
paid service.[^tgi-license-faq] In April 2024 the switch was reversed: TGI returned to
**Apache 2.0**, which remains its license today.[^tgi-repo] Hugging Face's CTO, Julien
Chaumond, said the custom-license experiment had not brought in new business and had
complicated community contributions through legal uncertainty.[^tgi-relicense] The
episode is a small but instructive illustration of how hard it is to combine
open-source distribution with commercial protection — the same tension explored, for
model weights, in [[Model licensing]].
