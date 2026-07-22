---
title: Qwen
description: Alibaba's family of large language models, spanning open-weight releases from 1.8B to 235B parameters and a closed-weight flagship API line.
tags: [model, open-weights, china]
technicality: technical
aliases: [Tongyi Qianwen, Qwen2.5, Qwen3, Qwen-Max, Qwen3.7-Max]
sources:
  - id: qwen-wiki
    title: Qwen
    url: https://en.wikipedia.org/wiki/Qwen
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: qwen3-blog
    title: "Qwen3: Think Deeper, Act Faster"
    url: https://qwenlm.github.io/blog/qwen3/
    author: Qwen Team
    publisher: QwenLM Blog
    year: 2025
  - id: qwen3-techcrunch
    title: Alibaba unveils Qwen3, a family of 'hybrid' AI reasoning models
    url: https://techcrunch.com/2025/04/28/alibaba-unveils-qwen-3-a-family-of-hybrid-ai-reasoning-models/
    author: Kyle Wiggers
    publisher: TechCrunch
    year: 2025
  - id: qwen25-blog
    title: "Qwen2.5: A Party of Foundation Models!"
    url: https://qwenlm.github.io/blog/qwen2.5/
    author: Qwen Team
    publisher: QwenLM Blog
    year: 2024
  - id: qwen37max-marktechpost
    title: "Qwen Introduces Qwen3.7-Max: A Reasoning Agent Model With a 1M-Token Context Window"
    url: https://www.marktechpost.com/2026/05/21/qwen-introduces-qwen3-7-max-a-reasoning-agent-model-with-a-1m-token-context-window/
    author: MarkTechPost Staff
    publisher: MarkTechPost
    year: 2026
  - id: huggingface-qwen-org
    title: Qwen (organization page)
    url: https://huggingface.co/Qwen
    author: Hugging Face
    publisher: Hugging Face
    year: 2026
---

**Qwen** is [[Alibaba]]'s family of large language models, one of the largest and longest-running lines of [[Open weights|open-weight]] models to come out of China. It spans everything from phone-sized models under a billion parameters to a 235-billion-parameter flagship, plus a closed, API-only line for Alibaba's most capable reasoning models.

## Origins: Tongyi Qianwen

Alibaba first showed the model family in April 2023 under the Chinese name **Tongyi Qianwen** (通义千问, roughly "universal answer to a thousand questions"), demoing it in a closed beta inside Alibaba products like DingTalk and Tmall Genie[^qwen-wiki]. It opened to the public in September 2023, after clearing Chinese regulatory approval, as the first generation of what the company began branding internationally as **Qwen**[^qwen-wiki]. That first public release shipped in four sizes — 1.8B, 7B, 14B, and 72B parameters[^qwen-wiki].

## Qwen2 and Qwen2.5

Alibaba followed with Qwen2 in June 2024 and **Qwen2.5** in September 2024, each generation widening the lineup with both dense models (where every parameter is used on every request) and sparser [[Mixture of Experts]] variants[^qwen-wiki]. Qwen2.5 shipped seven dense sizes — 0.5B, 1.5B, 3B, 7B, 14B, 32B, and 72B parameters — alongside specialized Coder and Math variants tuned for those domains[^qwen25-blog]. Most sizes were released under the permissive Apache 2.0 license, though the 3B and 72B variants used a separate, more restrictive Qwen License instead[^qwen25-blog].

## Qwen3: hybrid reasoning

Released April 28–29, 2025, **Qwen3** was Alibaba's first "hybrid reasoning" generation: each model can switch between a slower, step-by-step "thinking mode" for hard problems and a fast "non-thinking mode" for simple queries, with a thinking budget the user can tune[^qwen3-blog]. The lineup covered six dense models from 0.6B to 32B parameters plus two Mixture-of-Experts models — Qwen3-30B-A3B (30B total parameters, 3B active per token) and the flagship Qwen3-235B-A22B (235B total, 22B active) — trained on roughly 36 trillion tokens across 119 languages and released under Apache 2.0[^qwen3-blog]. TechCrunch's coverage of the launch reported the flagship model beating OpenAI's o3-mini on some benchmarks, including Codeforces, AIME, and BFCL[^qwen3-techcrunch].

## A large derivative ecosystem

Because so much of the Qwen line ships with open weights, it has become a popular base for other teams to fine-tune or distill from — for example, [[DeepSeek (models)|DeepSeek]] distilled reasoning ability from its R1 model into Qwen-based smaller models. As of 2026, Hugging Face's Qwen organization page hosts 458 models, along with datasets, demo Spaces, and collections spanning text, multimodal/vision, speech (Qwen3-ASR), and image-generation work[^huggingface-qwen-org].

## Qwen-Max and the shift toward closed flagships

Alongside its open releases, Alibaba has also offered **Qwen-Max**, a closed, API-only tier of larger models available through Alibaba Cloud rather than as downloadable weights. On May 20, 2026, at the Alibaba Cloud Summit, the company announced **Qwen3.7-Max**, a closed-weight flagship built for agentic and reasoning tasks with a 1-million-token context window[^qwen37max-marktechpost]. The release marked a strategic shift: Alibaba is now pairing its continuing open-weight Qwen releases with proprietary flagship models it keeps closed, similar to the split many other labs — including [[GLM]] and [[DeepSeek (models)|DeepSeek]] — maintain between open research releases and commercial flagships.
