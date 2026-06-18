---
title: DeepSeek
description: A Chinese lab whose open-weight models—the MoE-based V3 and the RL-trained R1 reasoning model—reached near-frontier quality and rattled assumptions about the cost of AI.
technicality: technical
tags: [model, open-weights, moe]
aliases: [DeepSeek AI, DeepSeek-V3, DeepSeek-R1]
updated: 2026-06-18
sources:
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
  - id: cnbc-nvidia
    title: "Nvidia sheds almost $600 billion in market cap, biggest drop ever"
    url: https://www.cnbc.com/2025/01/27/nvidia-sheds-almost-600-billion-in-market-cap-biggest-drop-ever.html
    publisher: CNBC
    year: 2025
---

# DeepSeek

**DeepSeek** is a Chinese AI lab whose openly downloadable models reached near-frontier
quality in late 2024 and early 2025 — a milestone for open weights, and the moment open
models forced their way into the conversation about the cost and geography of AI. Its
significance is as much about **access** as capability: a non-US lab shipping models
anyone could download and build on.

## The models

- **DeepSeek-V3** (December 2024) is a large [[Mixture of Experts]] model — 671 billion
  total parameters, of which about 37 billion are active per token.[^deepseek-v3] Its
  technical report stresses efficiency, reporting that full training took "only 2.788M
  H800 GPU hours" on 14.8 trillion tokens.[^deepseek-v3]
- **DeepSeek-R1** ([[DeepSeek-R1 release|January 2025]]) is a [[Reasoning models (test-time compute)|reasoning
  model]]. Its headline finding is that "the reasoning abilities of LLMs can be
  incentivized through pure reinforcement learning," without human-labeled reasoning
  examples — a result detailed in that entry.[^deepseek-r1]

## Licensing

The license differs by model, and the distinction matters. **DeepSeek-R1 was released
under the permissive MIT license**, which allows commercial use, modification, and even
distillation of its outputs into other models.[^deepseek-r1-hf] DeepSeek-V3, by
contrast, shipped under a custom license with use restrictions — so the family is "open
weights" in the sense covered by [[Open weights]] and [[Model licensing]], with R1's
move to MIT the more open of the two.

## The January 2025 reaction

DeepSeek's arrival landed with unusual force. On January 27, 2025, Nvidia's stock fell
about 17%, shedding roughly $600 billion in market value — the largest single-day loss
in U.S. market history — as investors questioned whether cheap, openly available models
undercut assumptions about how much compute spending AI would require.[^cnbc-nvidia] A
widely repeated claim that V3 was trained for only about $6 million should be treated
carefully: analysts noted the figure likely excludes substantial prior research and
experimentation costs.[^cnbc-nvidia] The durable story is less the market drama than the
capability — an open-weight model line competing at the frontier, and, like
[[Mistral AI]], doing so from outside the big US labs such as [[OpenAI]] and [[Anthropic]].
