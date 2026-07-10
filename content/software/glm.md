---
title: GLM
description: Z.ai's family of open-weight large language models — from the 2022 GLM-130B to the 2026 flagship GLM-5.2, an MoE model (744B/40B active, 1M context, MIT) that competes near the proprietary frontier.
tags: [model, open-weights, moe, china]
technicality: technical
aliases: [GLM-5.2, GLM-5.1, GLM-5, GLM-4.6, GLM-4.5, GLM-4, ChatGLM, GLM-130B, General Language Model]
updated: 2026-06-24
sources:
  - id: glm130b2022
    title: "GLM-130B: An Open Bilingual Pre-trained Model"
    url: https://arxiv.org/abs/2210.02414
    author: Zeng et al.
    publisher: arXiv (ICLR 2023)
    year: 2022
  - id: chatglm2024
    title: "ChatGLM: A Family of Large Language Models from GLM-130B to GLM-4 All Tools"
    url: https://arxiv.org/abs/2406.12793
    author: Team GLM (Zeng et al.)
    publisher: arXiv
    year: 2024
  - id: glm45pr2025
    title: "Z.ai Releases GLM-4.5, Setting New Standards for AI Performance and Accessibility"
    url: https://www.prnewswire.com/news-releases/zai-releases-glm-4-5--setting-new-standards-for-ai-performance-and-accessibility-while-improving-affordability-302514803.html
    author: Z.ai (Zhipu AI)
    publisher: PR Newswire
    year: 2025
  - id: glm5tr2026
    title: "GLM-5: from Vibe Coding to Agentic Engineering"
    url: https://arxiv.org/abs/2602.15763
    author: GLM-5 Team (Zeng et al.)
    publisher: arXiv
    year: 2026
  - id: glm5github
    title: "GLM-5 (zai-org/GLM-5)"
    url: https://github.com/zai-org/GLM-5
    author: Z.ai (Zhipu AI)
    publisher: GitHub
    year: 2026
  - id: glm52blog
    title: "GLM-5.2: Built for Long-Horizon Tasks"
    url: https://huggingface.co/blog/zai-org/glm-52-blog
    author: Z.ai (Zhipu AI)
    publisher: Hugging Face
    year: 2026
  - id: glm52card
    title: "zai-org/GLM-5.2 model card"
    url: https://huggingface.co/zai-org/GLM-5.2
    author: Z.ai (Zhipu AI)
    publisher: Hugging Face
    year: 2026
  - id: glm52openrouter
    title: "GLM 5.2 — API Pricing & Benchmarks"
    url: https://openrouter.ai/z-ai/glm-5.2
    author: OpenRouter
    publisher: OpenRouter
    year: 2026
---

# GLM

**GLM** (General Language Model) is the family of **open-weight** large language models built by the
Chinese company **[[Z.ai]]** (formerly Zhipu AI). The line runs from the influential **GLM-130B** open
model of 2022 to the current flagship, **GLM-5.2** (2026) — and as of mid-2026 it is one of the leading
open-weight families, named alongside [[DeepSeek (models)|DeepSeek]], [[MiniMax models|MiniMax]], [[LLaMA]], and Alibaba's [[Qwen]].

## The lineage

GLM began as a research effort at Tsinghua University. **GLM-130B** (2022) was an ambitious attempt to
open-source a 100-billion-parameter bilingual (English–Chinese) model "at least as good as GPT-3," and
it could run on consumer GPUs via aggressive quantization.[^glm130b2022] The **ChatGLM** line (from
2023) brought small, locally runnable chat models to a wide audience, and **GLM-4** (2024) — the team's
"All Tools" generation — was reported to rival GPT-4 on standard benchmarks.[^chatglm2024] In **July
2025**, **GLM-4.5** marked the shift to an **agent-native**, [[Mixture of Experts|mixture-of-experts]]
flagship (355 billion total parameters, 32 billion active), and the GLM-5 generation followed in early
2026, scaling further and adopting sparse attention.[^glm45pr2025][^glm5tr2026]

## GLM-5.2

The current flagship, **GLM-5.2**, was released in **mid-June 2026** under the permissive **MIT
[[Model licensing|license]]**.[^glm52card] It is a [[Mixture of Experts|mixture-of-experts]] model with
**744 billion total parameters and about 40 billion active** per token[^glm5github] (its Hugging Face
listing reports ~753 billion total, counting auxiliary parameters), and a **1-million-token
[[Context window]]** for long-horizon work.[^glm52card][^glm52blog] Architecturally it incorporates
**DeepSeek Sparse Attention** (the sparse-attention scheme from [[DeepSeek (models)|DeepSeek]]) and
related efficiency techniques. Z.ai frames the GLM-5 generation around a shift "from vibe coding to
agentic engineering" — targeting long, multi-step [[Agent|agentic]] software work rather than one-shot
snippets (see [[Vibe coding]]).[^glm5tr2026]

## Performance and positioning

On **Z.ai's own reported benchmarks**, GLM-5.2 edges out OpenAI's [[GPT-5|GPT-5.5]] on several coding and agentic
tests — including [[SWE-bench]] Pro, FrontierSWE, and MCP-Atlas — while **trailing Anthropic's Claude
Opus 4.8** across the board (and trailing GPT-5.5 on Terminal-Bench).[^glm52blog] As with any
vendor-published figures these are not independent results, but they reflect GLM's broader
significance: an [[Open weights|open-weight]] model competing close to the proprietary frontier, at a
fraction of the API cost.[^glm52openrouter]
