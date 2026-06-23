---
title: Pi (coding agent)
description: A minimal, self-extensible coding agent from Earendil Works (Mario Zechner & Armin Ronacher) — a deliberately contrarian rejection of feature-rich agents like Claude Code.
tags: [open-source, coding-agent, agents]
technicality: technical
aliases: [Pi agent harness, earendil-works/pi]
updated: 2026-06-23
sources:
  - id: pi-repo
    title: "earendil-works/pi — AI agent toolkit (GitHub)"
    url: https://github.com/earendil-works/pi
    author: Earendil Works / Mario Zechner
    publisher: GitHub
    year: 2026
  - id: pi-site
    title: "Pi — minimal, self-extensible coding agent"
    url: https://pi.dev/
    author: Earendil Works
    publisher: pi.dev
    year: 2026
  - id: pi-new-home
    title: "Pi Has a New Home at Earendil"
    url: https://pi.dev/news/2026/5/7/pi-has-a-new-home
    author: Earendil Works
    publisher: pi.dev
    year: 2026
  - id: ronacher-mario
    title: "Mario and Earendil"
    url: https://lucumr.pocoo.org/2026/4/8/mario-and-earendil/
    author: Armin Ronacher
    publisher: lucumr.pocoo.org
    year: 2026
---

# Pi (coding agent)

**Pi** is a minimal, self-extensible coding-[[Agent|agent]] tool from **Earendil Works**.
Where most coding agents compete by adding features, Pi competes by leaving them out: it
ships a small, hackable core and expects you to extend it yourself. (It is unrelated to
Inflection AI's "Pi" chatbot — a different product that shares the name.) Pi stands out less
for raw popularity than for two things: a deliberately contrarian design, and the prominence
of its creators.

## What it is

Pi is an **MIT-licensed, TypeScript** monorepo with three layers.[^pi-repo] **pi-ai** is a
provider-agnostic LLM API spanning Anthropic, [[OpenAI]], Google, and others — including
local models via [[Ollama]]; **pi-agent-core** is the agent-loop runtime that handles
tool-calling and state; and **pi-coding-agent** is the terminal CLI/TUI most users interact
with. The repository describes itself as an "AI agent toolkit: unified LLM API, agent loop,
TUI, coding agent CLI," and had around **65,000 GitHub stars as of June 2026.**[^pi-repo]

## A minimalist, self-extensible design

Pi's pitch is a pointed rejection of the "kitchen-sink" direction of agents like
[[Claude Code]], [[OpenCode]], and [[Codex]]: *"Adapt Pi to your workflows, not the other
way around."*[^pi-site] As of mid-2026 it deliberately ships **without** several features
those tools bundle in by default — sub-agents, a plan mode, built-in to-dos, permission
pop-ups, [[Model Context Protocol|MCP]] support, and background shell processes — pointing
users instead to plain alternatives such as spawning extra instances with tmux, keeping a
`TODO.md`, or running in a container.[^pi-site] The philosophy, in its own words: *"features
that other agents bake in, you can build yourself."*[^pi-site]

The flip side is extensibility. Rather than forking the tool, you ask it to modify itself:
*"If you need a command, tool, provider, workflow, or UI tweak, just ask Pi to build it. It
will customize itself on the fly,"* reloading the change immediately.[^pi-site] Pi thus sits
at the opposite end of the [[Agent harnesses|coding-agent]] spectrum from the feature-rich,
batteries-included tools.

## Who's behind it

Pi was created by **Mario Zechner**, best known as the author of the **libGDX** game-development
framework. In April 2026 he joined **Earendil Works** — a small, deliberately understated
company where **Armin Ronacher**, creator of the **Flask** web framework and a co-founder of
Sentry, is among the principals — bringing Pi with him rather than raising venture funding for
it.[^ronacher-mario] The project moved to the `earendil-works` GitHub organization in May 2026,
with its npm packages renamed accordingly.[^pi-new-home]
