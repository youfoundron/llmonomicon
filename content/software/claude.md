---
title: Claude
description: Anthropic's family of large language models—and the assistant built on them—trained with Constitutional AI and organized into Opus, Sonnet, and Haiku tiers.
technicality: somewhat-technical
tags: [model, product, assistant]
aliases: [Claude 3, Claude 4, Claude Opus, Claude Sonnet, Claude Haiku, Claude (Anthropic)]
updated: 2026-06-17
sources:
  - id: introducing-claude
    title: "Introducing Claude"
    url: https://www.anthropic.com/news/introducing-claude
    author: Anthropic
    publisher: Anthropic
    year: 2023
  - id: claudes-constitution
    title: "Claude's Constitution"
    url: https://www.anthropic.com/news/claudes-constitution
    author: Anthropic
    publisher: Anthropic
    year: 2023
  - id: claude2
    title: "Claude 2"
    url: https://www.anthropic.com/news/claude-2
    author: Anthropic
    publisher: Anthropic
    year: 2023
  - id: claude3
    title: "Introducing the next generation of Claude"
    url: https://www.anthropic.com/news/claude-3-family
    author: Anthropic
    publisher: Anthropic
    year: 2024
  - id: claude35sonnet
    title: "Introducing Claude 3.5 Sonnet"
    url: https://www.anthropic.com/news/claude-3-5-sonnet
    author: Anthropic
    publisher: Anthropic
    year: 2024
  - id: claude37sonnet
    title: "Claude 3.7 Sonnet and Claude Code"
    url: https://www.anthropic.com/news/claude-3-7-sonnet
    author: Anthropic
    publisher: Anthropic
    year: 2025
  - id: claude4
    title: "Introducing Claude 4"
    url: https://www.anthropic.com/news/claude-4
    author: Anthropic
    publisher: Anthropic
    year: 2025
  - id: anthropic-models
    title: "Models overview — Claude Docs"
    url: https://platform.claude.com/docs/en/docs/about-claude/models/overview
    author: Anthropic
    publisher: Anthropic
    year: 2026
---

# Claude

**Claude** is [[Anthropic]]'s family of large language models, and the AI assistant
built on them.[^introducing-claude] It is the principal counterpart to [[OpenAI]]'s
[[GPT-3|GPT]] and [[ChatGPT launch|ChatGPT]] in the period after 2022, and is
distinguished above all by how it is trained: with [[Constitutional AI]], a method
that teaches the model to follow an explicit written set of principles rather than
relying on human feedback alone.[^claudes-constitution]

## The family

Anthropic first released **Claude** — alongside a faster, cheaper variant, **Claude
Instant** — on March 14, 2023.[^introducing-claude] **Claude 2** followed in July
2023.[^claude2] The line took its lasting shape with the **Claude 3** family on
[[Claude 3 released|March 4, 2024]], which introduced the three named tiers that persist today: **Opus**
(the most capable), **Sonnet** (balanced for everyday use), and **Haiku** (the
fastest and most compact).[^claude3]

Releases since have advanced steadily:

- **Claude 3.5 Sonnet** (June 2024) — a mid-tier model that outperformed the
  earlier top-tier Claude 3 Opus while running faster.[^claude35sonnet]
- **Claude 3.7 Sonnet** (February 2025) — added an opt-in "extended thinking" mode,
  which Anthropic billed as "the first hybrid reasoning model on the
  market."[^claude37sonnet]
- **Claude 4** (May 2025) — the Opus 4 and Sonnet 4 models, with a strong emphasis
  on coding and longer-running agentic tasks.[^claude4]

As of 2026 the current generation is **Claude 4.x** — models such as Opus 4.8,
Sonnet 4.6, and Haiku 4.5 keep the Opus/Sonnet/Haiku tiering — alongside a newer and
more capable line released as **Claude Fable 5**.[^anthropic-models]

## What distinguishes it

- **[[Constitutional AI]] training.** Claude is aligned against a written
  "constitution" of principles; the method has its own entry.[^claudes-constitution]
- **Named capability tiers.** Since Claude 3, each generation ships as Opus, Sonnet,
  and Haiku, letting users trade capability for speed and cost.[^claude3]
- **Hybrid reasoning.** From Claude 3.7 onward, models can optionally spend extra
  computation "thinking" before they answer.[^claude37sonnet]
- **Coding and agentic focus.** The Claude 4 generation foregrounded software
  engineering and multi-step, tool-using work.[^claude4]
