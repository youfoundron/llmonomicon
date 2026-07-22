---
title: Tinker
description: Thinking Machines Lab's training API that lets researchers write fine-tuning code while the company runs the distributed infrastructure underneath.
tags: [fine-tuning, training-infrastructure, api, open-source]
technicality: technical
aliases: [Tinker cookbook, tinker-cookbook]
sources:
  - id: tml-tinker-product
    title: "Tinker"
    url: https://thinkingmachines.ai/tinker/
    author: Thinking Machines Lab
    publisher: Thinking Machines Lab
    year: 2025
  - id: tml-announcing-tinker
    title: "Announcing Tinker"
    url: https://thinkingmachines.ai/news/announcing-tinker/
    author: Thinking Machines Lab
    publisher: Thinking Machines Lab
    year: 2025
  - id: tml-tinker-ga
    title: "Tinker: General Availability and Vision Input"
    url: https://thinkingmachines.ai/news/tinker-general-availability/
    author: Thinking Machines Lab
    publisher: Thinking Machines Lab
    year: 2025
  - id: tinker-cookbook-repo
    title: "thinking-machines-lab/tinker-cookbook"
    url: https://github.com/thinking-machines-lab/tinker-cookbook
    author: Thinking Machines Lab
    publisher: GitHub
    year: 2025
  - id: techcrunch-inkling-2026
    title: "Thinking Machines amps up its bet against one-size-fits-all AI with its first open model, Inkling"
    url: https://techcrunch.com/2026/07/15/thinking-machines-amps-up-its-bet-against-one-size-fits-all-ai-with-its-first-open-model-inkling/
    author: TechCrunch
    publisher: TechCrunch
    year: 2026
  - id: tml-inkling-page
    title: "Inkling"
    url: https://thinkingmachines.ai/inkling/
    author: Thinking Machines Lab
    publisher: Thinking Machines Lab
    year: 2026
---

Tinker is a training API from [[Thinking Machines Lab]] that lets researchers and developers write the code for a fine-tuning run — what data to train on, what loss to use, when to checkpoint — without having to operate the cluster that actually runs it. The company announced it publicly on October 1, 2025[^tml-announcing-tinker]. The pitch is a division of labor: you keep control over the training algorithm and data, and Tinker's infrastructure handles distributed scheduling, resource allocation, and recovering from hardware failures[^tml-announcing-tinker].

## How it works

Tinker's interface is deliberately small. It exposes four core primitives — a forward/backward pass, an optimizer step, sampling (generation), and checkpoint saving — and everything else about the training job (which machines it runs on, how work is scheduled, what happens if a node dies) is handled behind those calls[^tml-tinker-product]. That low-level-but-managed design is aimed at people who want to write and tweak their own training loop rather than call a black-box "fine-tune this model" endpoint.

Rather than updating every weight in a model, Tinker fine-tunes exclusively through [[LoRA]]: it freezes the pretrained base model and trains small low-rank adapter matrices on top of it. Thinking Machines Lab says this matches the quality of full fine-tuning at a fraction of the compute cost, and — because the frozen base is shared — lets many separate training runs draw from the same pool of compute at once[^tml-tinker-product].

Once a training run has saved a checkpoint, an API endpoint lets the user download it[^tml-tinker-product].

## Model support and rollout

Tinker supports fine-tuning a range of [[Open weights|open-weight]] models, including several Qwen variants from 4B to 397B parameters (both dense and mixture-of-experts), Qwen-235B-A22B, DeepSeek-V3.1, Kimi-K2.6 and Kimi K2 Thinking, NVIDIA's Nemotron models, GPT-OSS variants, and Thinking Machines Lab's own [[Inkling]][^tml-tinker-product].

Tinker launched behind a waitlist in October 2025 and reached general availability on December 12, 2025, when Thinking Machines Lab lifted the waitlist and added support for the Kimi K2 Thinking reasoning model, vision input through two Qwen3-VL models, and an OpenAI-API-compatible sampling interface[^tml-tinker-ga].

Alongside the API, the company publishes the open-source tinker-cookbook, an Apache-2.0-licensed library of example training recipes covering supervised learning, reinforcement learning, preference learning, and knowledge distillation, all built on the Tinker API[^tinker-cookbook-repo].

## Role in the Inkling launch

On July 15, 2026, Thinking Machines Lab released [[Inkling]], its first open-weight model — but positioned it less as a finished product to use out of the box than as a base for organizations to fine-tune themselves through Tinker[^techcrunch-inkling-2026]. Inkling is available to run on Tinker with a choice of 64K or 256K context length, even though the model natively supports up to 1M tokens (third-party hosts may offer other limits)[^tml-inkling-page]. TechCrunch reports that Tinker, rather than Inkling itself, is where Thinking Machines Lab's revenue has to come from — through training and fine-tuning fees and a cut of the hosting ecosystem that grows up around it[^techcrunch-inkling-2026].
