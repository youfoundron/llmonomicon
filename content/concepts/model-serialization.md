---
title: Model serialization
description: How a trained model's weights are saved to and loaded from disk—and the pickle security problem that reshaped the file formats the field uses.
technicality: technical
tags: [serialization, security, formats]
group: safety
aliases: [Checkpoint, Model checkpoint, state_dict, Serialization]
updated: 2026-06-17
sources:
  - id: pytorch
    title: "Serialization semantics (PyTorch docs)"
    url: https://docs.pytorch.org/docs/stable/notes/serialization.html
    author: PyTorch
    publisher: PyTorch
    year: 2025
  - id: hfpickle
    title: "Pickle Scanning (Hugging Face Hub security)"
    url: https://huggingface.co/docs/hub/security-pickle
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
  - id: safetensors
    title: "Safetensors (documentation)"
    url: https://huggingface.co/docs/safetensors/index
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
---

# Model serialization

**Model serialization** is the everyday act of saving a trained model's parameters to
disk so they can be reloaded later — and, increasingly, shared and downloaded by
others. The saved file is usually called a **checkpoint**. In PyTorch, the thing being
saved is the model's **`state_dict`**, which "contains all of its parameters and
persistent buffers" — just the learned numbers, mapped by name, rather than the whole
Python program.[^pytorch]

The story of model serialization turns out to be largely a story about **security**,
because the format the field started with proved dangerous.

## The pickle problem

By default, PyTorch's `torch.save` and `torch.load` use Python's **pickle**, writing
files with extensions like `.pt`, `.pth`, or `.bin`.[^pytorch] [[Pickle]] is convenient,
but loading a pickled file can execute arbitrary code embedded in it. PyTorch puts it
bluntly: loading with `weights_only=False` "can result in arbitrary code execution. Do
it only if you got the file from a trusted source."[^pytorch] That is a real
**supply-chain risk** once people routinely download model weights from strangers.
(Pickle is not "broken" — it is simply unsafe for *untrusted* files; a checkpoint you
saved yourself is fine to reload.)

## How the ecosystem responded

Two responses reshaped how models are stored:

- **Scanning.** The Hugging Face Hub runs a **pickle-import scan** on every uploaded
  file, reading its opcodes *without executing them* (via Python's `pickletools`) and
  flagging suspicious imports.[^hfpickle]
- **A safe format.** [[safetensors]] was created as "a new simple format for storing
  tensors safely (as opposed to pickle) and that is still fast (zero-copy)," and has
  become the default across much of the open-model ecosystem.[^safetensors]

Even PyTorch changed its own default: as of version 2.6, `torch.load` defaults to
`weights_only=True`, refusing to run arbitrary code unless explicitly told
otherwise.[^pytorch]

## A family of formats

Serialization is now a small family of formats, each striking a different balance
among **safety, load speed, portability, framework-independence, and metadata**. The
lifecycle runs from pickle (`.pt`/`.bin`) to [[safetensors]] (safety and speed), and
on to specialized successors such as [[GGUF]] — which bundles a model with its
metadata and quantization for local inference — and [[ONNX]], a framework-independent
format for exchanging model graphs. What each format *is* belongs on its own page; the
common thread is the set of trade-offs above.
