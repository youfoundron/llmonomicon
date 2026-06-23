---
title: ONNX
description: An open, framework-agnostic format that serializes a model as a computation graph — operators and all, not just weights — to move models between frameworks and into deployment runtimes.
technicality: technical
tags: [format, interoperability, open-source]
aliases: [Open Neural Network Exchange, ONNX Runtime]
updated: 2026-06-18
sources:
  - id: wiki-onnx
    title: "Open Neural Network Exchange"
    url: https://en.wikipedia.org/wiki/Open_Neural_Network_Exchange
    publisher: Wikipedia
    year: 2017
  - id: meta-onnx
    title: "ONNX V1 released"
    url: https://research.facebook.com/blog/2017/12/onnx-v1-released/
    author: Facebook AI Research
    publisher: Meta Research
    year: 2017
  - id: onnxruntime
    title: "ONNX Runtime"
    url: https://onnxruntime.ai/
    author: Microsoft
    publisher: ONNX Runtime
    year: 2024
---

# ONNX

**ONNX** (Open Neural Network Exchange) is an open, framework-agnostic format for
representing machine-learning models — and the part of the format family that stores a
model as a **computation graph** rather than just a bag of weights. Its purpose is
portability: export a model from one framework and run it in another, or hand it to a
dedicated inference engine for deployment.[^wiki-onnx]

## Origin

ONNX began inside Facebook's [[PyTorch]] team under the codename "Toffee"; in **September
2017** it was renamed ONNX and announced jointly by **Facebook and Microsoft**.[^wiki-onnx]
That December, "Facebook, AWS, and Microsoft" announced that "the first version of ONNX is
now production-ready,"[^meta-onnx] and support soon followed from across the hardware and
software industry — "IBM, Huawei, Intel, AMD, Arm and Qualcomm."[^wiki-onnx] The aim was to
break models out of single-framework silos at a time when researchers trained in one
toolkit (PyTorch, Caffe2, [[TensorFlow]]) but often wanted to deploy in another.

## A graph, not just weights

This is what sets ONNX apart from weight-only formats like [[safetensors]] and [[GGUF]]:
those store the trained numbers, whereas ONNX serializes the **model itself**. The spec
"provides definitions of an extensible computation graph model, built-in operators and
standard data types, focused on inferencing," packaged as Protocol Buffers.[^wiki-onnx]
Concretely, "each computation dataflow graph is a list of nodes that form an acyclic
graph," where "each node is a call to an operator" with its own inputs and
outputs.[^wiki-onnx] Capturing the operators — not only the weights — is what lets a model
move between frameworks that never agreed on a common runtime.

## Running ONNX models

Paired with the format is **ONNX Runtime**, Microsoft's cross-platform engine for executing
ONNX models — a "production-grade AI engine to speed up training and inferencing in your
existing technology stack."[^onnxruntime] This is where ONNX tends to earn its keep: a model
is exported to the format once, then served, optimized, and accelerated across hardware
targets through the runtime.

## Its place in the LLM era

It is worth being honest about ONNX's role in the large-language-model story specifically.
ONNX and its runtime are widely used for **deployment and inference optimization**, but they
are not how open LLM weights are usually *distributed* — that job belongs to [[safetensors]]
(for full-precision weights) and [[GGUF]] (for quantized, local-inference builds). ONNX is
the broad, long-standing **graph-interchange** branch of the [[Model serialization]] family:
foundational to ML interoperability in general, more supporting cast than headliner in the
open-weights movement that defines the LLM era.[^wiki-onnx]
