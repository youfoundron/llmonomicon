---
title: Kimi
description: Moonshot AI's family of large language models — from the 2023 Kimi chatbot through the closed reasoning model K1.5 to the open-weight K2, and on to K3, a 2.8-trillion-parameter MoE (896 experts, 1M context) that was, at its July 2026 release, billed as the largest open-weight model to date.
tags: [model, product, open-weights, moe, china]
technicality: technical
aliases: [Kimi K3, Kimi K2, Kimi K1.5, Moonshot Kimi]
updated: 2026-07-22
sources:
  - id: kimi-wikipedia
    title: "Kimi (chatbot)"
    url: https://en.wikipedia.org/wiki/Kimi_(chatbot)
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: k15-arxiv
    title: "Kimi k1.5: Scaling Reinforcement Learning with LLMs"
    url: https://arxiv.org/abs/2501.12599
    author: Kimi Team
    publisher: arXiv
    year: 2025
  - id: k15-github
    title: "Kimi-k1.5 (MoonshotAI/Kimi-k1.5)"
    url: https://github.com/MoonshotAI/Kimi-k1.5
    author: Moonshot AI
    publisher: GitHub
    year: 2025
  - id: k2-arxiv
    title: "Kimi K2: Open Agentic Intelligence"
    url: https://arxiv.org/abs/2507.20534
    author: Kimi Team
    publisher: arXiv
    year: 2025
  - id: k2-github
    title: "Kimi-K2 (MoonshotAI/Kimi-K2)"
    url: https://github.com/MoonshotAI/Kimi-K2
    author: Moonshot AI
    publisher: GitHub
    year: 2025
  - id: k2-instruct-hf
    title: "moonshotai/Kimi-K2-Instruct (model card)"
    url: https://huggingface.co/moonshotai/Kimi-K2-Instruct
    author: Moonshot AI
    publisher: Hugging Face
    year: 2025
  - id: k2-0905-hf
    title: "moonshotai/Kimi-K2-Instruct-0905 (model card)"
    url: https://huggingface.co/moonshotai/Kimi-K2-Instruct-0905
    author: Moonshot AI
    publisher: Hugging Face
    year: 2025
  - id: k2-thinking-news
    title: "Moonshot launches open-source 'Kimi K2 Thinking' AI with trillion parameters, reasoning capabilities"
    url: https://siliconangle.com/2025/11/07/moonshot-launches-open-source-kimi-k2-thinking-ai-trillion-parameters-reasoning-capabilities/
    author: SiliconANGLE
    publisher: SiliconANGLE
    year: 2025
  - id: k27-code-marktechpost
    title: "Moonshot AI Releases Kimi K2.7-Code: a Coding Model Reporting +21.8% on Kimi Code Bench v2 Over K2.6"
    url: https://www.marktechpost.com/2026/06/12/moonshot-ai-releases-kimi-k2-7-code-a-coding-model-reporting-21-8-on-kimi-code-bench-v2-over-k2-6/
    author: MarkTechPost
    publisher: MarkTechPost
    year: 2026
  - id: k3-blog
    title: "Kimi K3 Tech Blog: Open Frontier Intelligence"
    url: https://www.kimi.com/blog/kimi-k3
    author: Moonshot AI
    publisher: Kimi (Moonshot AI)
    year: 2026
  - id: k3-fortune
    title: "Moonshot's Kimi K3 pushes Chinese AI into Fable-level territory"
    url: https://fortune.com/2026/07/16/moonshots-kimi-k3-pushes-chinese-ai-into-fable-level-territory/
    author: Fortune
    publisher: Fortune
    year: 2026
  - id: k3-tomshardware
    title: "China's 2.8-trillion-parameter Kimi K3 beats Claude Fable 5 in Frontend Code Arena benchmark"
    url: https://www.tomshardware.com/tech-industry/artificial-intelligence/moonshot-releases-2-8-trillion-parameter-kimi-k3
    author: Tom's Hardware
    publisher: Tom's Hardware
    year: 2026
  - id: k3-aa-index
    title: "Kimi K3 achieves #3 in the Artificial Analysis Intelligence Index, comparable to Opus 4.8 and GPT-5.5"
    url: https://artificialanalysis.ai/articles/kimi-k3-achieves-3-in-the-artificial-analysis-intelligence-index-comparable-to-opus-4-8-and-gpt-5-5
    author: Artificial Analysis
    publisher: Artificial Analysis
    year: 2026
  - id: k3-notebookcheck
    title: "Kimi K3 tops Frontend Code Arena in a first for Chinese AI models"
    url: https://www.notebookcheck.net/Kimi-K3-tops-Frontend-Code-Arena-in-a-first-for-Chinese-AI-models.1347112.0.html
    author: Notebookcheck
    publisher: Notebookcheck
    year: 2026
  - id: k3-willison
    title: "Kimi K3, and what we can still learn from the pelican benchmark"
    url: https://simonwillison.net/2026/Jul/16/kimi-k3/
    author: Simon Willison
    publisher: "Simon Willison's Weblog"
    year: 2026
---

# Kimi

**Kimi** is the family of large language models built by the Chinese company **[[Moonshot AI]]**. It began in 2023 as a long-context chatbot, turned [[Open weights|open-weight]] in 2025 with the trillion-parameter **K2**, and in July 2026 reached **K3** — a 2.8-trillion-parameter [[Mixture of Experts|MoE]] model that Moonshot calls "the world's first open 3T-class model," billed at its release as the largest open-weight model to date.[^k3-blog][^k3-tomshardware] Alongside [[DeepSeek (models)|DeepSeek]], [[GLM]], and [[MiniMax models|MiniMax]], Kimi is one of a small group of Chinese labs shipping genuinely frontier-class open-weight models.

## From chatbot to reasoning model

Moonshot AI was founded in Beijing in March 2023 by Yang Zhilin, Zhou Xinyu, and Wu Yuxin, and launched its **Kimi** chatbot to the public that November. It stood out early for a **128,000-token "lossless" [[Context window]]**, at a time when most chatbots handled far less.[^kimi-wikipedia]

**Kimi K1.5** (20 January 2025) turned Kimi into a dedicated reasoning model, trained with large-scale reinforcement learning; Moonshot's technical report claimed it matched OpenAI's o1 on math (77.5 on AIME, 96.2 on MATH500), code (94th percentile on Codeforces), and multimodal reasoning (74.9 on MathVista).[^k15-arxiv] Unlike every Kimi release since, **K1.5 was not open-weight** — its GitHub repository published only the paper, with no downloadable weights.[^k15-github] The shift to open weights begins with the next release.

## K2 and the open-weight turn

**Kimi K2** (11 July 2025) is a [[Mixture of Experts|MoE]] model with **1 trillion total parameters and about 32 billion active** per token — 384 routed experts plus one shared expert, 8 selected per token — pretrained on 15.5 trillion tokens with MuonClip, a Moonshot-designed optimizer credited with keeping training stable at that scale, and released under a **Modified MIT [[Model licensing|license]]** with the framing "Open Agentic Intelligence" for its tool-use and coding focus.[^k2-arxiv][^k2-github] Its instruct model reported 65.8% pass@1 on the SWE-bench Verified coding benchmark.[^k2-instruct-hf] A September 2025 point release, **Kimi-K2-Instruct-0905**, doubled the context window from 128K to 256K tokens and sharpened coding, agentic, and frontend-aesthetics performance, keeping the same 1T/32B shape and license.[^k2-0905-hf][^kimi-wikipedia]

Point releases kept coming roughly every one to two months. **Kimi K2 Thinking** (around 7 November 2025) added an explicit reasoning/agent mode able to chain 200–300 tool calls in a single run,[^k2-thinking-news] and the coding-focused **Kimi K2.7-Code** (12 June 2026) reported a 21.8% improvement over its predecessor on Moonshot's internal "Kimi Code Bench v2."[^k27-code-marktechpost] As Moonshot's own K3 announcement later put it, "for nine of the past twelve months, Kimi models have set the upper bound of open-model sizes."[^k3-blog]

## Kimi K3

**Kimi K3**, announced [[Kimi K3 released|16 July 2026]], is Moonshot's new flagship: **2.8 trillion total parameters** in a [[Mixture of Experts|MoE]] with **896 experts, 16 active per token** (roughly 1.8% of them), a **1-million-token [[Context window]]**, and native vision input for [[Multimodal models|multimodal]] use.[^k3-blog] Moonshot credits two new architecture pieces meant to "improve how information flows across sequence length and model depth": **Kimi Delta Attention (KDA)**, a linear-[[Attention]] mechanism for scaling attention efficiently, and **Attention Residuals (AttnRes)**, which lets deeper layers selectively retrieve representations from earlier ones rather than accumulating them uniformly.[^k3-blog] It is priced at $3 and $15 per million input and output tokens.[^k3-fortune]

At 2.8 trillion parameters, K3 dwarfs the other open-weight flagships this wiki tracks — [[GLM]]'s GLM-5.2 (about 744 billion total), [[MiniMax models|MiniMax]]'s M3 (about 428 billion), and [[DeepSeek (models)|DeepSeek]]'s largest public models — and coverage from Fortune and Tom's Hardware both describe it as the largest open-weight model released to date.[^k3-fortune][^k3-tomshardware]

**As of 22 July 2026, K3's weights are not yet public.** Moonshot's announcement promises they will follow "by July 27, 2026" under the same Modified MIT [[Model licensing|license]] family as K2; until then, K3 is reachable only through Kimi's app, website, and API, not as a download.[^k3-blog]

## Benchmark standing

K3's benchmark standing comes with independent corroboration, not just vendor-reported numbers. On the **Artificial Analysis Intelligence Index**, a third-party aggregator of model evaluations, K3 scored 57; Artificial Analysis's own write-up places it at around 3rd place — comparable to Claude Opus 4.8 and GPT-5.5, and just behind [[Claude Fable 5]] and [[GPT-5|GPT-5.6 Sol]] — as of mid-July 2026, a ranking that has shifted by a place or two across different trackers as more results come in.[^k3-aa-index] On **[[Chatbot Arena|Arena]]'s Frontend Code leaderboard**, K3 debuted in first place with 1,679 points, ahead of Claude Fable 5 (1,631) and GPT-5.6 Sol (1,618) — a 17-place jump from its predecessor's rank of 18th, and the first time a Chinese model held that top spot.[^k3-notebookcheck] Moonshot's own announcement frames K3 as frontier-level while conceding that its "overall performance still trails the most powerful proprietary models, Claude Fable 5 and GPT 5.6 Sol" — a vendor's framing, but directionally consistent with the independent placement above.[^k3-blog]

Independent hands-on testing arrived within hours: Simon Willison ran his informal [[Pelican riding a bicycle]] SVG test against K3 for about $0.25 in API costs, noting that the test's correlation with a model's real quality has "mostly severed" as models have improved, and that it says nothing about agentic tool-calling — in his view the more load-bearing test for a model like K3.[^k3-willison]
