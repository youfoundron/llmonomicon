---
title: DeepSeek (models)
description: DeepSeek's open-weight model family — the MoE V-series (V2, V3, V3.2, V4) and the RL-trained R1 reasoning model.
technicality: technical
tags: [model, open-weights, moe, reasoning]
aliases: [DeepSeek-V2, DeepSeek-V3, DeepSeek-V3.2, DeepSeek-R1, DeepSeek-V4, DeepSeek-V4-Pro, DeepSeek-V4-Flash]
updated: 2026-06-23
sources:
  - id: deepseek-v2
    title: "DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model"
    url: https://arxiv.org/abs/2405.04434
    author: DeepSeek-AI
    publisher: arXiv
    year: 2024
  - id: deepseek-v3
    title: "DeepSeek-V3 Technical Report"
    url: https://arxiv.org/abs/2412.19437
    author: DeepSeek-AI
    publisher: arXiv
    year: 2024
  - id: deepseek-r1
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
    url: https://arxiv.org/abs/2501.12948
    author: DeepSeek-AI
    publisher: arXiv
    year: 2025
  - id: deepseek-r1-hf
    title: "deepseek-ai/DeepSeek-R1 (Hugging Face model card)"
    url: https://huggingface.co/deepseek-ai/DeepSeek-R1
    author: DeepSeek-AI
    publisher: Hugging Face
    year: 2025
  - id: deepseek-v32
    title: "DeepSeek-V3.2: Pushing the Frontier of Open Large Language Models"
    url: https://arxiv.org/abs/2512.02556
    author: DeepSeek-AI
    publisher: arXiv
    year: 2025
  - id: deepseek-v4
    title: "deepseek-ai/DeepSeek-V4-Pro (Hugging Face model card)"
    url: https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
    author: DeepSeek-AI
    publisher: Hugging Face
    year: 2026
  - id: deepseek-wiki
    title: "DeepSeek"
    url: https://en.wikipedia.org/wiki/DeepSeek
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
---

# DeepSeek (models)

This entry covers the open-weight models built by the AI lab [[DeepSeek]]. The family
pairs an efficient [[Mixture of Experts]] line (the V-series) with a reinforcement-
learning-trained reasoning model (R1), and has trended toward more permissive licensing
over time.

## The V-series (Mixture-of-Experts)

- **DeepSeek-V2** (May 2024) established the family's architecture: a
  [[Mixture of Experts]] model with 236 billion total parameters (about 21 billion
  active per token) and a 128K context window. It introduced **Multi-head Latent
  Attention (MLA)**, which compresses the [[KV cache]] into a small latent vector to cut
  memory use, alongside the DeepSeekMoE design.[^deepseek-v2]
- **DeepSeek-V3** (December 2024) scaled the line to **671 billion total parameters**
  (about 37 billion active per token), trained on 14.8 trillion tokens. Its technical
  report stresses efficiency, reporting that full training took "only 2.788M H800 GPU
  hours."[^deepseek-v3]
- **DeepSeek-V3.2** (December 2025) refined it further under the permissive **MIT
  license**, introducing **DeepSeek Sparse Attention (DSA)** for cheaper long-context
  inference, alongside a high-compute **"Speciale"** edition reported to reach
  gold-medal-level performance at the 2025 mathematics (IMO) and informatics (IOI)
  olympiads.[^deepseek-v32]
- **DeepSeek-V4** (April 2026) is the current generation, released in two MIT-licensed
  sizes — **V4-Pro** (1.6 trillion total parameters, ~49 billion active) and the smaller
  **V4-Flash** (284 billion total, ~13 billion active) — both with a **1-million-token
  context window** and selectable "thinking" modes for harder reasoning.[^deepseek-v4]

## DeepSeek-R1

**DeepSeek-R1** ([[DeepSeek-R1 release|January 2025]]) is the family's
[[Reasoning models|reasoning]] model and its most influential release. Its headline
finding is that "the reasoning abilities of LLMs can be incentivized through pure
reinforcement learning," without human-labeled reasoning examples.[^deepseek-r1] It
shipped under the permissive **MIT license**, which allows commercial use, modification,
and even distillation of its outputs into other models.[^deepseek-r1-hf]

Notably, DeepSeek has **not** released an "R2" successor as of mid-2026; reporting
attributes the delay to performance concerns and chip-supply constraints, and the
reasoning-capable model the lab actually shipped in 2026 was V4 rather than a dedicated
R2.[^deepseek-wiki]

## Licensing

Licensing has trended more permissive across the family: R1, V3.2, and V4 are
**MIT-licensed**, while the earlier V3 shipped under a custom license with use
restrictions. Either way these are "open weights" in the sense covered by
[[Open weights]] and [[Model licensing]] — downloadable weights, distinct from fully
open training data or code.[^deepseek-r1-hf]
