---
title: Inkling
description: Thinking Machines Lab's first foundational model, a large open-weights mixture-of-experts system released in July 2026 and positioned on customizability rather than leaderboard rank.
technicality: technical
tags: [model, open-weights, mixture-of-experts, multimodal]
aliases: [Inkling-Small]
updated: 2026-07-22
sources:
  - id: tml-inkling-announce
    title: "Inkling: Our Open-Weights Model"
    url: https://thinkingmachines.ai/news/introducing-inkling/
    author: Thinking Machines Lab
    publisher: Thinking Machines Lab
    year: 2026
  - id: tml-inkling-modelcard
    title: "Inkling Model Card"
    url: https://thinkingmachines.ai/model-card/inkling/
    author: Thinking Machines Lab
    publisher: Thinking Machines Lab
    year: 2026
  - id: techcrunch-inkling
    title: "Thinking Machines amps up its bet against one-size-fits-all AI with its first open model, Inkling"
    url: https://techcrunch.com/2026/07/15/thinking-machines-amps-up-its-bet-against-one-size-fits-all-ai-with-its-first-open-model-inkling/
    publisher: TechCrunch
    year: 2026
  - id: fortune-inkling
    title: "Murati's Thinking Machines releases first AI model for broad use"
    url: https://fortune.com/2026/07/15/what-is-mira-murati-thinking-machines-first-ai-model-inkling/
    publisher: Fortune
    year: 2026
  - id: willison-inkling
    title: "Inkling: Our open-weights model"
    url: https://simonwillison.net/2026/Jul/16/inkling/
    author: Simon Willison
    publisher: simonwillison.net
    year: 2026
  - id: tml-tinker-announce
    title: "Announcing Tinker"
    url: https://thinkingmachines.ai/news/announcing-tinker/
    author: Thinking Machines Lab
    publisher: Thinking Machines Lab
    year: 2025
---

# Inkling

**Inkling** is [[Thinking Machines Lab]]'s first foundational model — the AI
startup co-founded by former OpenAI CTO [[Mira Murati]] released it as an
open-weights model on 15 July 2026[^tml-inkling-announce]. It's notable less
for topping benchmark leaderboards than for what it represents: a well-funded
frontier lab betting that giving people a strong, freely-modifiable base model
matters more than owning the single "best" closed one[^fortune-inkling].

## Architecture and training

Inkling is a [[Mixture of Experts]] model: instead of running every parameter
on every token, it routes each token through a small subset of specialized
sub-networks ("experts"). Inkling has 975 billion parameters in total, but only
about 41 billion of them are active for any given token, split across 256
routed experts plus 2 shared experts (always-active experts that handle common
patterns), with 6 routed experts switched on per token via a sigmoid-based
router[^tml-inkling-modelcard]. This design lets the model hold a very large
amount of learned knowledge while keeping the compute cost of each prediction
closer to that of a much smaller dense model.

Thinking Machines Lab pretrained Inkling on roughly 45 trillion tokens drawn
from text, image, audio, and video sources, then post-trained it with a mix of
the Muon and Adam optimizers plus large-scale reinforcement learning — more
than 30 million rollouts (sampled attempts the model learns from)[^tml-inkling-announce].
Despite the multimodal training mix, the model card documents text, image, and
audio as the released model's supported inference *inputs*; its output is text
only. Video shows up in the pretraining data but is not listed as a supported
input at inference time[^tml-inkling-modelcard]. Inkling is a [[Multimodal models|multimodal model]]
on that narrower basis.

The model natively supports context windows (how much text and other input it
can consider at once) up to 1 million tokens. Thinking Machines Lab's own
hosting of the model through [[Tinker]], its fine-tuning service, offers only
64K- and 256K-token configurations rather than the full 1M as of its
release[^tml-inkling-announce].

A smaller preview variant, **Inkling-Small**, pairs 276 billion total
parameters with about 12 billion active; as of its announcement Thinking
Machines Lab describes it as still being tested rather than a finished,
generally available release[^tml-inkling-announce].

## Release and licensing

Inkling's weights were published openly under the permissive Apache 2.0
license, meaning anyone can download, run, modify, and redistribute the
model, including commercially[^tml-inkling-modelcard][^techcrunch-inkling]. It can be further
fine-tuned through [[Tinker]], Thinking Machines Lab's commercial training
API announced in October 2025, which uses [[LoRA]] (Low-Rank Adaptation) —
a technique for adapting a large model by training a small set of extra
parameters instead of the whole network — to share compute across many
customers' training runs and keep the cost down[^tml-tinker-announce].

## Positioning

Thinking Machines Lab has been explicit that Inkling is "not the strongest
overall model available today, open or closed"[^tml-inkling-announce]. The
pitch instead is a capable, [[Open weights|open-weights]] model that
organizations can adapt to their own needs — a contrast with the "one best
model for everyone" approach of most closed frontier labs. Independent
commentary from developer Simon Willison echoed that framing, describing
Inkling as measured against its own goals rather than the leaderboard, and
placing it alongside other notable open-weights releases such as Nemotron and
Gemma[^willison-inkling]. Coverage of the release also emphasized the fact of
who shipped it: Murati had been OpenAI's CTO through the release of ChatGPT
and GPT-4, and her company choosing to open its first model rather than keep
it closed was itself treated as news[^fortune-inkling].

Thinking Machines Lab also reports that it trained Inkling to answer directly
on topics subject to censorship pressure rather than defaulting to refusal,
citing a strong score on a third-party evaluation of this behavior run by
Cognition[^tml-inkling-announce].
