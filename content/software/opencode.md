---
title: OpenCode
description: An open-source, model-agnostic, terminal-first AI coding agent — a free counterpart to tools like Claude Code that works across many LLM providers.
tags: [open-source, coding-agent, agents]
technicality: technical
updated: 2026-06-23
sources:
  - id: opencode_site
    title: "OpenCode — documentation"
    url: https://opencode.ai/docs/
    author: OpenCode / Anomaly
    publisher: opencode.ai
    year: 2026
  - id: opencode_repo
    title: "anomalyco/opencode (GitHub repository)"
    url: https://github.com/anomalyco/opencode
    author: Anomaly Innovations
    publisher: GitHub
    year: 2026
  - id: infoq2026
    title: "OpenCode: An Open-Source, Model-Agnostic AI Coding Agent"
    url: https://www.infoq.com/news/2026/02/opencode-coding-agent/
    author: InfoQ
    publisher: InfoQ
    year: 2026
  - id: biggo_crush
    title: "Charm's Crush and the OpenCode split"
    url: https://biggo.com/news/202507310715_Charm_Crush_AI_Coding_Agent
    author: BigGo News
    publisher: BigGo
    year: 2025
  - id: rocha_x
    title: "Christian Rocha (Charm CEO) statement on OpenCode/TermAI"
    url: https://x.com/meowgorithm/status/1933593074820891062
    author: Christian Rocha
    publisher: X (Twitter)
    year: 2025
  - id: opencode_go
    title: "opencode-ai/opencode (archived Go predecessor)"
    url: https://github.com/opencode-ai/opencode
    author: Kujtim Hoxha et al.
    publisher: GitHub
    year: 2025
---

# OpenCode

**OpenCode** is an open-source, terminal-first AI coding [[agent]] — a
command-line tool that reads your codebase, plans changes, edits files, and runs
commands on your behalf. It sits on the open side of the
[[Agent harnesses|coding-agent landscape]], a free counterpart to closed tools
like [[Claude Code]], [[Cursor]], and [[Devin]] and a sibling to other open agents
such as [[Aider]] and [[SWE-agent]]. Its defining trait is that it is
**model-agnostic**: rather than being tied to one lab's models, it works with many.

## What it does

OpenCode runs primarily in the terminal but also ships a desktop app, editor
integrations, and a web interface.[^opencode_site][^infoq2026] It is
**MIT-licensed** and written in TypeScript, maintained by the company Anomaly
Innovations; its repository had **over 177,000 GitHub stars as of June
2026.**[^opencode_repo]

The headline feature is provider independence. OpenCode supports a large number of
models — InfoQ counted more than **75** — including Anthropic's
[[Claude]], [[OpenAI]]'s [[GPT-3|GPT]] models, Google [[Gemini]], [[DeepSeek]], and
local models run through [[Ollama]].[^infoq2026][^opencode_site] Among its other
capabilities are two agent modes — a read-only **Plan** mode that proposes how it
would implement a change without touching files, and a **Build** mode that carries
the change out — along with support for the [[Model Context Protocol|MCP]] for
connecting external [[Tool use|tools]], language-server (LSP) integration, multiple
concurrent sessions, and editor integrations through the Agent Client
Protocol.[^opencode_site][^infoq2026]

## Origins

OpenCode's history is tangled and, in places, disputed. It began in early 2025 as
**TermAI**, a Go terminal coding tool written by Kujtim Hoxha on top of the
open-source terminal-UI libraries from the company Charm.[^rocha_x][^opencode_go]
Developers from the team behind the SST framework got involved, reworked the user
experience, and suggested renaming the project to OpenCode.[^biggo_crush]

A falling-out followed later in 2025. Charm hired Hoxha and moved the project under
its own organization; some community contributors alleged that Charm rewrote the
project's git history and removed contributions, while Charm's CEO, Christian
Rocha, publicly disputed those accounts as untrue.[^biggo_crush][^rocha_x] The
split resolved into two separate projects: Charm rebranded its version as **Crush**,
while the team on the other side kept the OpenCode name, rewrote the tool in
TypeScript, and launched it publicly in June 2025 under Anomaly
Innovations.[^biggo_crush][^infoq2026]
