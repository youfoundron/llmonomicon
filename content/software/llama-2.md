---
title: Llama 2
description: Meta's July 2023 open-weight model family—the release that made open weights usable commercially, under a custom license with an acceptable-use policy and a large-user clause.
technicality: technical
tags: [model, open-weights, meta]
aliases: [Llama 2-Chat, Llama-2]
updated: 2026-06-17
sources:
  - id: touvron2023
    title: "Llama 2: Open Foundation and Fine-Tuned Chat Models"
    url: https://arxiv.org/abs/2307.09288
    author: Touvron et al.
    publisher: arXiv
    year: 2023
  - id: meta-llama2
    title: "Meta and Microsoft Introduce the Next Generation of Llama"
    url: https://about.fb.com/news/2023/07/llama-2/
    author: Meta
    publisher: Meta
    year: 2023
  - id: llama2-license
    title: "Llama 2 Community License Agreement"
    url: https://ai.meta.com/llama/license/
    author: Meta
    publisher: Meta
    year: 2023
---

# Llama 2

**Llama 2** is [[Meta AI|Meta]]'s family of open-weight large language models,
released on July 18, 2023. Its significance is less about raw capability than about *terms*: where
the original [[LLaMA]] had leaked out under a research-only license, Llama 2 was
published "free for research and commercial use," which made it the first
high-quality open-weight model that companies could legitimately build products
on.[^meta-llama2]

## The models

Llama 2 shipped as pretrained base models ranging from **7B to 70B** parameters,
plus instruction-tuned chat variants: "our fine-tuned LLMs, called Llama 2-Chat,
are optimized for dialogue use cases."[^touvron2023] Architecturally it continued
the [[LLaMA]] lineage — a 4,096-token [[Context window]] (twice the original's),
[[Rotary Position Embedding (RoPE)]], and [[Grouped-query & multi-query
attention|grouped-query attention]] in the larger models — and launched with a
Microsoft partnership that placed it in the Azure AI catalog.[^touvron2023][^meta-llama2]

## The license is the story

Meta described Llama 2 as "open," but the precise term is **open weights, not open
source**. The **Llama 2 Community License** lets anyone download and use the model
commercially, yet it attaches an acceptable-use policy and a notable commercial
gate: if a licensee's products have, in the preceding month, "greater than 700
million monthly active users," they "must request a license from
Meta."[^llama2-license] That clause — aimed squarely at the largest competitors — is
why Llama 2 is classified as open weights rather than open source, a distinction
explored in [[Model licensing]] and [[Open weights]].

## Why it mattered

Llama 2 reset expectations for the open ecosystem. It moved open weights from
"leaked, non-commercial" — the situation after the original [[LLaMA]] — to a
licensed foundation that enterprises could actually deploy, and it set the template
that later open-weight releases followed: free to use, with an acceptable-use policy
and scale-based conditions attached. Meta continued the line with Llama 3 and its
successors.
