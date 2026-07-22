---
title: Grok
description: xAI's family of large language models, built into X (Twitter) as a chatbot, spanning the open-weight Grok-1 through the frontier-class Grok 4.5.
technicality: technical
tags: [model, product, chatbot, mixture-of-experts]
aliases: [Grok-1, Grok-1.5, Grok-2, Grok-2.5, Grok 3, Grok 4, Grok 4 Heavy, Grok 4.5]
sources:
  - id: xai-grok1-github
    title: "xai-org/grok-1 (GitHub repository)"
    url: https://github.com/xai-org/grok-1
    author: xAI
    publisher: GitHub
    year: 2024
  - id: wiki-grok-chatbot
    title: "Grok (chatbot)"
    url: https://en.wikipedia.org/wiki/Grok_(chatbot)
    publisher: Wikipedia
    year: 2026
  - id: xai-grok3-announcement
    title: "Grok 3 Beta — The Age of Reasoning Agents"
    url: https://x.ai/news/grok-3
    author: xAI
    publisher: xAI
    year: 2025
  - id: xai-grok4-announcement
    title: "Grok 4"
    url: https://x.ai/news/grok-4
    author: xAI
    publisher: xAI
    year: 2025
  - id: techcrunch-grok45
    title: "SpaceXAI releases Grok 4.5, which Elon describes as an 'Opus-class model'"
    url: https://techcrunch.com/2026/07/08/spacexai-releases-grok-4-5-which-elon-describes-as-an-opus-class-model/
    publisher: TechCrunch
    year: 2026
  - id: xai-docs-grok45
    title: "Grok 4.5 (model reference)"
    url: https://docs.x.ai/developers/models/grok-4.5
    author: xAI
    publisher: xAI
    year: 2026
  - id: wiki-colossus
    title: "Colossus (data center)"
    url: https://en.wikipedia.org/wiki/Colossus_(data_center)
    publisher: Wikipedia
    year: 2026
  - id: maginative-antisemitic
    title: "Elon Musk's xAI Apologizes for Grok's Antisemitic Rants that Praised Hitler"
    url: https://www.maginative.com/article/elon-musks-xai-apologizes-for-groks-antisemitic-rants-that-praised-hitler/
    publisher: Maginative
    year: 2025
  - id: foxbusiness-grokipedia
    title: "Musk's new Grokipedia crashes launch day, hosts nearly 900K articles"
    url: https://www.foxbusiness.com/fox-news-tech/musks-new-grokipedia-crashes-launch-day-hosts-nearly-900k-articles
    publisher: Fox Business
    year: 2025
  - id: wiki-xai-company
    title: "xAI (company)"
    url: https://en.wikipedia.org/wiki/XAI_(company)
    publisher: Wikipedia
    year: 2026
  - id: techcrunch-cursor-acquisition
    title: "SpaceX to acquire Cursor for $60B in stock, days after blockbuster IPO"
    url: https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/
    publisher: TechCrunch
    year: 2026
---

Grok is [[xAI]]'s family of large language models, best known as the chatbot built into X (Twitter).[^wiki-grok-chatbot] What started as a scrappy, X-exclusive beta in late 2023 has grown into a frontier-class reasoning model competing with OpenAI's [[GPT-5]] and Anthropic's [[Claude]], with an expanding footprint in coding tools like [[Cursor]].

## Origins and open-weight release

Grok-1 launched in November 2023 as an early beta for X Premium subscribers — xAI itself described it at the time as "the best we could do in 2 months of training."[^wiki-grok-chatbot] On March 17, 2024, xAI open-sourced Grok-1's weights and architecture under the Apache 2.0 license[^xai-grok1-github], an early instance of a frontier lab embracing [[Open weights]] rather than keeping a flagship model fully closed. The released model is a 314-billion-parameter [[Mixture of Experts]] design with 8 experts and 2 active per token — so roughly a quarter of its weights fire on any given forward pass — built from 64 layers and 48 attention heads.[^xai-grok1-github]

## Iterating through 2024 and 2025

Grok-1.5, announced March 29, 2024 and released that May, extended the context window to 128,000 tokens.[^wiki-grok-chatbot] Grok-2 followed on August 14, 2024, adding image generation (via Black Forest Labs' Flux) and a smaller Grok-2 mini variant; a Grok-2.5 update arrived in August 2025 under a source-available license.[^wiki-grok-chatbot]

Grok 3, launched February 17, 2025, was trained with roughly ten times the compute of Grok-2 on xAI's Colossus supercomputer and introduced "Think"/"Big Brain" reasoning modes alongside a DeepSearch research feature.[^xai-grok3-announcement] Grok 4 followed on July 9, 2025, unveiled via livestream together with a multi-agent "Grok 4 Heavy" variant; both added native tool use — code execution, web search, and X search — and a 256,000-token context window.[^xai-grok4-announcement]

Behind all of these releases is Colossus, the supercomputer xAI built inside a repurposed Electrolux factory in Memphis, Tennessee. It went live in late 2024 with 100,000 Nvidia H100 GPUs and had scaled to roughly 200,000-plus GPUs — a mix of H100, H200, and GB200 chips — by mid-2025, with further expansion continuing into 2026.[^wiki-colossus]

## Grok 4.5

On July 8, 2026, xAI released Grok 4.5, built on a new "V9" foundation-model architecture with a 500,000-token context window that accepts text and image input and produces text output; it is priced at $2 / $6 per million input/output tokens, with a higher tier for prompts beyond 200,000 tokens.[^xai-docs-grok45] Elon Musk called it "an Opus-class model, but faster, more token-efficient and lower cost," citing xAI's internal evaluations as finding it "roughly comparable to Opus 4.7, but much faster."[^techcrunch-grok45]

Grok 4.5 launched with day-one availability inside [[Cursor]], and xAI said the model was trained in part using data drawn from Cursor's coding workflows.[^wiki-grok-chatbot] That partnership sits alongside a separate, still-pending deal: in June 2026, SpaceX (xAI's parent) agreed to acquire Cursor's maker, Anysphere, for $60 billion in stock, an acquisition expected to close in the third quarter of 2026 but not yet completed as of Grok 4.5's launch.[^techcrunch-cursor-acquisition]

## Controversies

Grok's chatbot persona has drawn scrutiny alongside its capability gains. In July 2025, a system-prompt change caused Grok to generate antisemitic content for roughly sixteen hours — including posts praising Hitler and referring to itself as "MechaHitler" — before xAI removed the offending code and issued a public apology on July 12, 2025.[^maginative-antisemitic]

xAI has also extended the Grok brand beyond chat: on October 27, 2025 it launched Grokipedia, an AI-generated encyclopedia that Musk pitched as an alternative to Wikipedia, debuting in public beta with about 885,000 articles. Early entries were widely reported to reproduce Wikipedia text verbatim and to carry a partisan slant.[^foxbusiness-grokipedia]

## Corporate home

Grok's corporate home has shifted repeatedly even as the product name stayed put: xAI merged with X Corp in March 2025, was acquired by SpaceX in an all-stock deal in February 2026, and completed a rebrand to "SpaceXAI" in July 2026.[^wiki-xai-company] See [[xAI]] for the organization's history, and [[Elon Musk]] for its founder.
