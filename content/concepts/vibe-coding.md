---
title: Vibe coding
description: Building software by describing what you want to an AI coding agent and accepting its output without closely reading it—a term coined by Andrej Karpathy in 2025.
technicality: somewhat-technical
tags: [agents, coding, prompting]
group: agents
aliases: [vibecoding, vibe-coding]
updated: 2026-06-18
sources:
  - id: karpathy-post
    title: "Andrej Karpathy on X: \"There's a new kind of coding I call 'vibe coding'…\""
    url: https://x.com/karpathy/status/1886192184808149383
    author: Andrej Karpathy
    publisher: X
    year: 2025
  - id: vibe-wiki
    title: "Vibe coding (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Vibe_coding
    publisher: Wikipedia
    year: 2025
  - id: collins-woty
    title: "'Vibe coding' named Collins Dictionary's Word of the Year"
    url: https://www.cnn.com/2025/11/06/tech/vibe-coding-collins-word-year-scli-intl
    publisher: CNN
    year: 2025
---

# Vibe coding

**Vibe coding** is the practice of building software mostly by *describing* what you
want to an AI coding agent and accepting what it produces, rather than writing the code
yourself. The term was coined by [[Andrej Karpathy]] in a February 2025 post: "There's
a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace
exponentials, and forget that the code even exists."[^karpathy-post]

## What it describes

Karpathy's own account captures the attitude: "I 'Accept All' always, I don't read the
diffs anymore… I just see stuff, say stuff, run stuff, and copy paste stuff, and it
mostly works."[^karpathy-post] The shift it names is from *writing* code to **steering an
agent** — leaning on tools like [[Cursor]], [[Claude Code]], and [[Aider]] to do the
typing while the human stays at the level of intent. As a name for how agentic coding
changed the developer's job, it spread quickly: Collins Dictionary named "vibe coding"
its **Word of the Year for 2025**.[^collins-woty][^vibe-wiki]

## The caveats

What makes the term worth an entry is that vibe coding is genuinely useful *and*
genuinely limited — and even its coiner said so. Karpathy framed it as fine for
"throwaway weekend projects" but risky beyond them, and [[Simon Willison]] cautioned
that "vibe coding your way to a production codebase is clearly risky."[^vibe-wiki] The
concerns are the predictable ones: code you never read can carry bugs and security
flaws, and is harder to maintain or understand later.[^vibe-wiki] The speed is real, but
reviewing, testing, and actually understanding the output still matter — the same
"trust, but verify" caution this wiki applies to LLM-written prose.
