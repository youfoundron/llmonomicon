---
title: Pickle
description: Python's built-in object-serialization format — used for PyTorch checkpoints, but a serious security risk, since loading an untrusted pickle can execute arbitrary code. The reason safetensors exists.
tags: [format, security, serialization]
technicality: technical
aliases: [Python pickle, pickle file, .pkl]
updated: 2026-06-23
sources:
  - id: python-pickle
    title: "pickle — Python object serialization (with security warning)"
    url: https://docs.python.org/3/library/pickle.html
    author: Python Software Foundation
    publisher: Python docs
    year: 2026
  - id: tob-pickle
    title: "Exploiting ML models with pickle file attacks: Part 1 (Sleepy Pickle)"
    url: https://blog.trailofbits.com/2024/06/11/exploiting-ml-models-with-pickle-file-attacks-part-1/
    author: Trail of Bits
    publisher: Trail of Bits
    year: 2024
  - id: reversinglabs
    title: "Malicious ML models discovered on Hugging Face platform (nullifAI)"
    url: https://www.reversinglabs.com/blog/rl-identifies-malware-ml-model-hosted-on-hugging-face
    author: ReversingLabs
    publisher: ReversingLabs
    year: 2025
  - id: pytorch
    title: "torch.load / serialization semantics (weights_only default)"
    url: https://docs.pytorch.org/docs/stable/notes/serialization.html
    author: PyTorch
    publisher: PyTorch
    year: 2026
  - id: pytorch-26
    title: "PyTorch 2.6 Release Blog (torch.load weights_only=True default)"
    url: https://pytorch.org/blog/pytorch2-6/
    author: PyTorch
    publisher: PyTorch
    year: 2025
  - id: pickleball
    title: "PickleBall: Secure Deserialization of Pickle-based Machine Learning Models"
    url: https://arxiv.org/abs/2508.15987
    author: Kellas et al.
    publisher: arXiv
    year: 2025
---

# Pickle

**Pickle** is Python's built-in **object-serialization** format — the `pickle` module's
`dump`/`load` functions, which save and restore arbitrary Python objects. In machine learning it is
everywhere under the hood: [[PyTorch]]'s `torch.save`/`torch.load` use it, and `.pt`, `.pth`,
`.bin`, `.ckpt`, and `.pkl` checkpoint files are typically pickles.[^python-pickle] It is also a
serious **security problem** — much of why this entry exists, and why the safer [[safetensors]]
format was created.

## Why it's dangerous

A pickle is not passive data; it is a small **program** of stack-based opcodes that the unpickler
executes. Some of those opcodes can **import and call arbitrary functions** while the file is being
loaded (reachable through an object's `__reduce__` method). The upshot is blunt: **loading an
untrusted pickle runs arbitrary code on your machine — before you ever use the model.** Python's own
documentation puts it plainly: "It is possible to construct malicious pickle data which will execute
arbitrary code during unpickling. Never unpickle data that could have come from an untrusted source,
or that could have been tampered with."[^python-pickle] That matters in ML because
[[Open weights|open-weight]] checkpoints are routinely downloaded from strangers on hubs like
[[Hugging Face]] (see [[Model serialization]]).

## Real-world incidents

Security researchers have demonstrated the risk concretely. In June 2024, **Trail of Bits** showed
"Sleepy Pickle," in which a malicious checkpoint, on being loaded, **modifies the model in place** —
inserting backdoors or altering its outputs — rather than merely compromising the host.[^tob-pickle]
In February 2025, **ReversingLabs** found two malicious models on the Hugging Face Hub carrying
reverse shells, using deliberately malformed pickle data that slipped past a security scanner while
still executing when loaded.[^reversinglabs] (Both were research / proof-of-concept findings, not
mass breaches.)

## Defenses

Several mitigations now exist, mostly covered in [[Model serialization]] and [[safetensors]]: tools
that **scan a pickle's opcodes without executing them** (Hugging Face's Picklescan, Protect AI's
modelscan, Trail of Bits' fickling); [[PyTorch]]'s `weights_only=True` loading mode, which limits
what `torch.load` will execute[^pytorch] and became the **default in PyTorch 2.6** (after being
warned since 2.4);[^pytorch-26] and the structural fix, **[[safetensors]]**, a format that stores only tensor data
so there is nothing to execute. The problem remains live, though: a 2025 study found that roughly
**45% of popular Hugging Face models** still ship in the insecure pickle format.[^pickleball]
