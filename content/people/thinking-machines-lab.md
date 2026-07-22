---
title: Thinking Machines Lab
description: An AI research and product company founded by former OpenAI CTO Mira Murati, betting on customizable open models over frontier-leaderboard chasing.
tags: [organization, company]
technicality: non-technical
aliases: [Thinking Machines, TML]
sources:
  - id: tc-launch-2025
    title: "Thinking Machines Lab is ex-OpenAI CTO Mira Murati's new startup"
    url: https://techcrunch.com/2025/02/18/thinking-machines-lab-is-ex-openai-cto-mira-muratis-new-startup/
    author: Maxwell Zeff
    publisher: TechCrunch
    year: 2025
  - id: tc-seed-close
    title: "Mira Murati's Thinking Machines Lab closes on $2B at $10B valuation"
    url: https://techcrunch.com/2025/06/20/mira-muratis-thinking-machines-lab-closes-on-2b-at-10b-valuation/
    author: Marina Temkin
    publisher: TechCrunch
    year: 2025
  - id: tc-seed-12b
    title: "Mira Murati's Thinking Machines Lab is worth $12B in seed round"
    url: https://techcrunch.com/2025/07/15/mira-muratis-thinking-machines-lab-is-worth-12b-in-seed-round/
    author: Marina Temkin
    publisher: TechCrunch
    year: 2025
  - id: tc-tinker-inkling
    title: "Thinking Machines amps up its bet against one-size-fits-all AI with its first open model, Inkling"
    url: https://techcrunch.com/2026/07/15/thinking-machines-amps-up-its-bet-against-one-size-fits-all-ai-with-its-first-open-model-inkling/
    author: Maxwell Zeff
    publisher: TechCrunch
    year: 2026
  - id: tml-interaction-models
    title: "Interaction Models: A Scalable Approach to Human-AI Collaboration"
    url: https://thinkingmachines.ai/blog/interaction-models/
    publisher: Thinking Machines Lab (Connectionism blog)
    year: 2026
  - id: tml-connectionism-launch
    title: "Defeating Nondeterminism in LLM Inference (Connectionism blog launch)"
    url: https://thinkingmachines.ai/blog/
    publisher: Thinking Machines Lab
    year: 2025
  - id: tml-home
    title: Thinking Machines Lab (homepage)
    url: https://thinkingmachines.ai/
    publisher: Thinking Machines Lab
    year: 2026
---

**Thinking Machines Lab** is an AI research and product company founded in
February 2025 by [[Mira Murati]], [[OpenAI]]'s former chief technology
officer; the company was publicly announced on February 18, 2025.[^tc-launch-2025]
Its co-founding leadership included [[John Schulman]] — an OpenAI co-founder —
as chief scientist, and Barret Zoph, formerly OpenAI's head of model
post-training, as CTO, joined by several other researchers who had also left
OpenAI.[^tc-launch-2025]

## Funding

Thinking Machines closed a $2 billion seed round on June 20, 2025, led by
Andreessen Horowitz and initially reported at a $10 billion valuation —
already one of the largest seed rounds in Silicon Valley history.[^tc-seed-close]
By the time the round was reported as finalized on July 15, 2025, the same
raise was valued at $12 billion, with investors including Nvidia, Accel,
ServiceNow, Cisco, AMD, and Jane Street.[^tc-seed-12b]

## Research and products

In September 2025 the company launched its research blog, *Connectionism*,
opening with a post on "Defeating Nondeterminism in LLM Inference."[^tml-connectionism-launch]

Its first product, Tinker — an API and platform for fine-tuning [[open
weights|open-weight]] models across distributed GPUs — launched on October 1,
2025, following a free beta, and became the company's primary revenue
vehicle through usage-based pricing.[^tc-tinker-inkling]

On May 11, 2026 the company previewed "interaction models": full-duplex
systems that continuously take in audio, video, and text and respond in real
time, rather than waiting for a user to finish speaking before replying. The
preview included TML-Interaction-Small, a mixture-of-experts model with 276
billion total parameters (12 billion active) that reached a 0.40-second
turn-taking latency on the FD-bench V1 audio benchmark.[^tml-interaction-models]

On July 15, 2026 Thinking Machines released Inkling, its first open-weight
model: a mixture-of-experts model with 975 billion total parameters (about
41 billion active) trained on 45 trillion tokens of multimodal data. Inkling
is positioned as a customizable alternative to closed frontier models and is
designed to be fine-tuned through Tinker.[^tc-tinker-inkling]

## Strategy

Thinking Machines describes its approach as favoring customizable, open
models over chasing frontier-leaderboard supremacy, betting that
organizations who adapt open models for their own needs will outperform
one-size-fits-all closed systems.[^tc-tinker-inkling] Its homepage states the
company's mission as making AI systems "more widely understood, customizable
and generally capable," combining shared science, human-centered multimodal
collaboration, and empirical safety work.[^tml-home]
