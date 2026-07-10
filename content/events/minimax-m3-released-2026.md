---
title: MiniMax M3 released
description: MiniMax releases M3 as open weights under its own community license — a ~1M-context, natively multimodal mixture-of-experts model that MiniMax says outperforms GPT-5.5 and Gemini 3.1 Pro on SWE-Bench Pro.
technicality: somewhat-technical
date: 2026-06-01
related: [MiniMax models, MiniMax]
aliases: [MiniMax M3 release, MiniMax-M3 release]
sources:
  - id: minimax-m3-blog
    title: "MiniMax M3: Frontier Coding, 1M Context, Native Multimodality — All in One Model"
    url: https://www.minimax.io/blog/minimax-m3
    author: MiniMax
    publisher: MiniMax
    year: 2026
  - id: minimax-m3-hf
    title: "MiniMaxAI/MiniMax-M3 (model card)"
    url: https://huggingface.co/MiniMaxAI/MiniMax-M3
    author: MiniMax
    publisher: Hugging Face
    year: 2026
  - id: marktechpost-m3
    title: "MiniMax Releases MiniMax M3 with MSA Architecture Supporting 1M-Token Context, Native Multimodality, and Agentic Coding"
    url: https://www.marktechpost.com/2026/06/01/minimax-releases-minimax-m3-with-msa-architecture-supporting-1m-token-context-native-multimodality-and-agentic-coding/
    publisher: MarkTechPost
    year: 2026
---

# MiniMax M3 released

On **1 June 2026**, [[MiniMax]] announced **MiniMax M3**, the new flagship of its
[[MiniMax models|model family]] — a mixture-of-experts model (roughly 428B total / 23B active
parameters) with a roughly 1-million-token context window and native image/video
understanding.[^minimax-m3-blog][^minimax-m3-hf] It launched via API the same day, with
[[Open weights|open weights]] following on Hugging Face within ten days, under MiniMax's own
**MiniMax Community License**, not an open-source one.[^minimax-m3-blog][^minimax-m3-hf] On
MiniMax's own reported
benchmarks, M3 scores **59.0%** on [[SWE-bench]] Pro — a harder variant of the standard benchmark —
surpassing GPT-5.5 and Gemini 3.1 Pro.[^minimax-m3-blog][^marktechpost-m3]
