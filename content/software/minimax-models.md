---
title: MiniMax models
description: MiniMax's family of large language models — from the closed abab API models to the largely open-weight M-series, known for efficient long-context attention (lightning/linear, hybrid, and sparse), low-priced agentic coding, and a run of vendor-claimed architectural firsts.
tags: [model, open-weights, moe, china]
technicality: technical
aliases: [MiniMax-M1, MiniMax-M2, MiniMax-M3, MiniMax-01, MiniMax-Text-01, abab]
updated: 2026-07-10
sources:
  - id: release-notes
    title: "MiniMax Models — Release Notes"
    url: https://platform.minimax.io/docs/release-notes/models
    author: MiniMax
    publisher: MiniMax
    year: 2026
  - id: abab65-news
    title: "The General Large Language Model abab6.5 Series"
    url: https://www.minimax.io/news/abab65-series
    author: MiniMax
    publisher: MiniMax
    year: 2024
  - id: minimax01-arxiv
    title: "MiniMax-01: Scaling Foundation Models with Lightning Attention"
    url: https://arxiv.org/abs/2501.08313
    author: MiniMax
    publisher: arXiv
    year: 2025
  - id: text01-hf
    title: "MiniMaxAI/MiniMax-Text-01 (Hugging Face model card)"
    url: https://huggingface.co/MiniMaxAI/MiniMax-Text-01
    author: MiniMax
    publisher: Hugging Face
    year: 2025
  - id: m1-arxiv
    title: "MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention"
    url: https://arxiv.org/abs/2506.13585
    author: MiniMax
    publisher: arXiv
    year: 2025
  - id: m1-github
    title: "MiniMax-M1 (MiniMax-AI/MiniMax-M1)"
    url: https://github.com/MiniMax-AI/MiniMax-M1
    author: MiniMax
    publisher: GitHub
    year: 2025
  - id: m2-news
    title: "MiniMax M2 & Agent: Ingenious in Simplicity"
    url: https://www.minimax.io/news/minimax-m2
    author: MiniMax
    publisher: MiniMax
    year: 2025
  - id: m2-hf
    title: "MiniMaxAI/MiniMax-M2 (Hugging Face model card)"
    url: https://huggingface.co/MiniMaxAI/MiniMax-M2
    author: MiniMax
    publisher: Hugging Face
    year: 2025
  - id: m2-marktechpost
    title: "MiniMax Releases MiniMax M2: A Mini Open Model Built for Max Coding and Agentic Workflows at 8% Claude Sonnet Price and ~2x Faster"
    url: https://www.marktechpost.com/2025/10/28/minimax-open-sources-minimax-m2-a-mini-model-built-for-max-coding-and-agentic-workflows-at-8-claude-sonnet-price-and-2x-faster/
    author: Asif Razzaq
    publisher: MarkTechPost
    year: 2025
  - id: m27-news
    title: "MiniMax M2.7: Early Echoes of Self-Evolution"
    url: https://www.minimax.io/news/minimax-m27-en
    author: MiniMax
    publisher: MiniMax
    year: 2026
  - id: m27-license
    title: "MiniMax Drops State-of-the-Art AI Agent Model—Then Quietly Changes the License"
    url: https://decrypt.co/364225/minimax-m27-agent-model-license-change
    author: Decrypt
    publisher: Decrypt
    year: 2026
  - id: m3-blog
    title: "MiniMax M3: Frontier Coding, 1M Context, Native Multimodality — All in One Model"
    url: https://www.minimax.io/blog/minimax-m3
    author: MiniMax
    publisher: MiniMax
    year: 2026
  - id: msa-arxiv
    title: "MiniMax Sparse Attention"
    url: https://arxiv.org/abs/2606.13392
    author: Lai et al. (MiniMax)
    publisher: arXiv
    year: 2026
  - id: m3-hf
    title: "MiniMaxAI/MiniMax-M3 (Hugging Face model card)"
    url: https://huggingface.co/MiniMaxAI/MiniMax-M3
    author: MiniMax
    publisher: Hugging Face
    year: 2026
  - id: m3-github
    title: "MiniMax-M3 (MiniMax-AI/MiniMax-M3)"
    url: https://github.com/MiniMax-AI/MiniMax-M3
    author: MiniMax
    publisher: GitHub
    year: 2026
  - id: marktechpost-m3
    title: "MiniMax Releases MiniMax M3 with MSA Architecture Supporting 1M-Token Context, Native Multimodality, and Agentic Coding"
    url: https://www.marktechpost.com/2026/06/01/minimax-releases-minimax-m3-with-msa-architecture-supporting-1m-token-context-native-multimodality-and-agentic-coding/
    publisher: MarkTechPost
    year: 2026
---

# MiniMax models

**MiniMax models** are the family of large language models built by the Chinese AI
company [[MiniMax]]. After a closed first generation — the **abab** API models — the
company became a distinctive [[Open weights|open-weight]] lab with its **M-series**
(MiniMax-01, M1, M2, and M3), alongside peers like [[DeepSeek models|DeepSeek]], [[GLM]],
[[LLaMA]], and Alibaba's [[Qwen]].

What sets the family apart is a repeated bet on cheaper-than-quadratic [[Attention]] —
linear, hybrid, and sparse variants that make very long contexts affordable — paired with
compact, low-priced models aimed at [[Agent|agentic]] coding. This entry covers MiniMax's
language models; its Hailuo video, speech, and music generators belong to the [[MiniMax]]
organization entry.

## The lineage

- **abab** — MiniMax's first-generation, closed, API-only models, predating the open
  M-series. The **abab6.5** series — abab6.5 and a faster abab6.5s, released
  **17 April 2024** — was pitched as reaching "a trillion parameters" with a 200,000-token
  [[Context window|context window]].[^abab65-news]
- **MiniMax-01** (15 January 2025) — the first open-weight generation, released in text
  (**MiniMax-Text-01**) and vision-language (**MiniMax-VL-01**, see [[Multimodal models]])
  versions.[^release-notes] Text-01 is a [[Mixture of Experts]] (MoE) model — about
  **456 billion** parameters in total but only ~**45.9 billion "active"** per token, since
  an MoE routes each token through only a few of its experts.[^minimax01-arxiv][^text01-hf]
  Its signature is **lightning attention**, an I/O-aware form of *linear attention* whose
  cost grows linearly rather than quadratically with sequence length; MiniMax-01
  interleaves it with ordinary softmax attention in a **hybrid** stack and was trained at a
  **1-million-token** context.[^minimax01-arxiv]
- **MiniMax-M1** (June 2025) — a [[Reasoning models|reasoning]] model MiniMax billed as
  "the world's first open-weight, large-scale hybrid-attention reasoning model," a vendor
  superlative.[^m1-github] Built on Text-01, it was trained with **CISPO**, a
  reinforcement-learning method whose full run, MiniMax reports, took about three weeks on
  512 H800 GPUs for roughly **$534,700** in rented compute; it shipped under the permissive
  **Apache-2.0** license.[^m1-arxiv][^m1-github]
- **MiniMax-M2** (27 October 2025), with rapid point releases **M2.1**, **M2.5**, and
  **M2.7**, marked a pivot to compact [[Agent|agentic]] coding models.[^release-notes] M2
  is a far smaller MoE (~**230 billion** total, ~**10 billion** active), priced at $0.30
  and $1.20 per million input/output tokens — by MiniMax's account about **8% of Claude
  Sonnet 4.5's price** at "nearly double the inference speed," a framing external coverage
  echoed.[^m2-hf][^m2-news][^m2-marktechpost] **M2.7** (18 March 2026) added rounds of
  autonomous self-optimization during training and quietly tightened its license to require
  authorization for commercial use, a change flagged by the outlet Decrypt.[^m27-news][^m27-license]

## MiniMax-M3

**MiniMax-M3** (1 June 2026) is the family's flagship as of July 2026. MiniMax bills it as
"the first and only open-weight model" to combine frontier-level coding, a
**1-million-token [[Context window|context]]**, and native
[[Multimodal models|multimodality]] — it accepts text, image, and video, and can drive a
desktop — again a vendor superlative rather than an independent finding.[^m3-blog] It is a
[[Mixture of Experts|MoE]] of about **428 billion** total / **23 billion** active
parameters, published on Hugging Face under a custom **`minimax-community`**
license.[^m3-hf][^m3-github]

M3's new ingredient is **MSA (MiniMax Sparse Attention)**, a block-sparse [[Attention]]
scheme built on [[Grouped-query attention|grouped-query attention (GQA)]] in which an index
branch selects the most relevant blocks of the [[KV cache|key–value cache]], so each token
attends to only a fraction of the sequence; MiniMax reports roughly 9× faster prefill and
15× faster decoding than M2 at a million-token context.[^m3-blog][^m3-github] The mechanism
is detailed in a separate arXiv paper, "MiniMax Sparse Attention," whose proof-of-concept
is a **109-billion-parameter** model — distinct from the 428-billion-parameter production
M3 — reporting about **28.4× lower** per-token attention compute than GQA at 1M
tokens.[^msa-arxiv] On benchmarks, the numbers so far are **MiniMax's own launch-time
figures**: it reports **59.0% on SWE-Bench Pro** (a harder variant of the [[SWE-bench]]
software-engineering benchmark), which it says beats [[GPT-5|GPT-5.5]] and Gemini 3.1 Pro and
approaches Claude Opus 4.7.[^m3-blog][^marktechpost-m3] Since this wiki already treats
**Claude Opus 4.8** as the mid-2026 proprietary frontier, those results are best read as
claims awaiting independent confirmation.

## Licensing

MiniMax's licensing is uneven, so the M-series should not be called uniformly "open
source": Text-01 uses a custom model license (with the code under MIT)[^text01-hf]; **M1**
is permissive **Apache-2.0**[^m1-github]; **M2** is **modified-MIT**[^m2-hf]; **M2.7**,
though still labeled "Modified-MIT," quietly added a commercial-use restriction requiring
MiniMax's authorization[^m27-license]; and **M3** ships under the custom **`minimax-community`**
license.[^m3-hf] These are "[[Open weights|open weights]]" in the sense covered by
[[Model licensing]] — downloadable weights under a specific license, ranging here from
genuinely permissive to commercially restricted — not the same as open source, open
training data, or unrestricted commercial use.
