---
title: Agent harnesses
description: A survey of the software that wraps an LLM into an acting agent — frameworks, coding agents, and autonomous agents — and how they split along the open-source-versus-proprietary axis.
technicality: technical
tags: [agents, tools]
aliases: [Agent frameworks, Coding agents, AI coding agents, Agentic tools]
updated: 2026-06-17
sources:
  - id: react
    title: "ReAct: Synergizing Reasoning and Acting in Language Models"
    url: https://arxiv.org/abs/2210.03629
    author: Yao et al.
    publisher: "arXiv (ICLR 2023)"
    year: 2022
  - id: langchain
    title: "LangChain (GitHub repository)"
    url: https://github.com/langchain-ai/langchain
    publisher: GitHub
    year: 2024
  - id: openai-agents
    title: "OpenAI Agents SDK (GitHub repository)"
    url: https://github.com/openai/openai-agents-python
    author: OpenAI
    publisher: GitHub
    year: 2025
  - id: claudecode
    title: "Claude Code overview (official docs)"
    url: https://code.claude.com/docs/en/overview
    author: Anthropic
    publisher: Anthropic
    year: 2025
  - id: cursor
    title: "Cursor (official site)"
    url: https://www.cursor.com
    author: Anysphere
    publisher: Anysphere
    year: 2024
  - id: aider
    title: "Aider (GitHub repository)"
    url: https://github.com/Aider-AI/aider
    publisher: GitHub
    year: 2024
  - id: opencode
    title: "anomalyco/opencode (GitHub repository)"
    url: https://github.com/anomalyco/opencode
    publisher: GitHub
    year: 2026
  - id: codex
    title: "openai/codex (GitHub repository)"
    url: https://github.com/openai/codex
    publisher: GitHub
    year: 2026
  - id: sweagent
    title: "SWE-agent (GitHub repository)"
    url: https://github.com/SWE-agent/SWE-agent
    author: "Yang, Jimenez, Wettig, Lieret, Yao, Narasimhan, Press"
    publisher: GitHub
    year: 2024
  - id: autogpt
    title: "AutoGPT (GitHub repository)"
    url: https://github.com/Significant-Gravitas/AutoGPT
    publisher: GitHub
    year: 2023
  - id: mcp
    title: "Model Context Protocol — Introduction"
    url: https://modelcontextprotocol.io
    author: Anthropic
    publisher: Anthropic
    year: 2024
---

# Agent harnesses

An **agent harness** is the software scaffolding that turns a one-shot language
model into an acting [[Agent]] — wrapping it in the reason–act–observe loop,
wiring up [[Tool use]], memory, and (for coding agents) access to files, a shell,
and version control. This entry is a map of that landscape; the individual systems
have their own entries.

The underlying loop is the one formalized by [[ReAct]], which interleaves
"reasoning traces [that] help the model induce, track, and update action plans"
with "actions [that] allow it to interface with external sources."[^react]
Harnesses differ mainly in *what* they target and *how open* they are.

## Types of harness

**Frameworks and SDKs** give developers the pieces to assemble their own agents:

- [[LangChain]] — "a framework for building agents and LLM-powered
  applications."[^langchain]
- [[OpenAI Agents SDK]] — "a lightweight yet powerful framework for building
  multi-agent workflows."[^openai-agents]

**Coding agents** are CLIs and IDEs that read and edit real codebases:

- [[Claude Code]] — Anthropic's "agentic coding tool that reads your codebase,
  edits files, runs commands," available in the terminal, an IDE, and
  elsewhere.[^claudecode]
- [[Codex]] — OpenAI's agentic coding tool: an open-source Rust CLI plus
  proprietary cloud, desktop, and IDE surfaces.[^codex]
- [[Cursor]] — Anysphere's AI code editor, built as a fork of VS Code.[^cursor]
- [[Aider]] — "AI pair programming in your terminal."[^aider]
- [[OpenCode]] — an open-source, model-agnostic terminal coding agent that works
  across many LLM providers.[^opencode]
- [[SWE-agent]] — an autonomous coding agent, from Princeton and Stanford
  researchers, that fixes real GitHub issues.[^sweagent]

**Autonomous agents** aim for open-ended self-direction:

- [[AutoGPT]] — one of the first viral "set a goal and let it chain its own tasks"
  projects.[^autogpt]

## Open versus closed

The axis that most shapes the trade-offs is whether a harness is open source. As
of 2026:

| System | Type | Source model |
| --- | --- | --- |
| [[LangChain]] | framework | open (MIT)[^langchain] |
| [[OpenAI Agents SDK]] | framework | open (MIT)[^openai-agents] |
| [[Aider]] | coding CLI | open (Apache-2.0)[^aider] |
| [[OpenCode]] | coding CLI | open (MIT)[^opencode] |
| [[SWE-agent]] | coding agent | open (MIT)[^sweagent] |
| [[AutoGPT]] | autonomous | mixed[^autogpt] |
| [[Claude Code]] | coding CLI / IDE | proprietary[^claudecode] |
| [[Codex]] | coding CLI / cloud | mixed (CLI Apache-2.0)[^codex] |
| [[Cursor]] | IDE | proprietary[^cursor] |

Open harnesses offer auditability, self-hosting, and freedom from lock-in, and
tend to move at community pace; proprietary ones often trade that for tighter
integration and polish. Licenses and source models shift, so treat the table as a
snapshot.

## Shared infrastructure

Across this fragmented landscape, some common ground is emerging. The [[Model
Context Protocol]] — Anthropic's open standard, supported across Claude, ChatGPT,
VS Code, and Cursor — lets any harness connect to external tools and data in a
vendor-neutral way.[^mcp] And coding agents increasingly report their capabilities
on a shared yardstick, [[SWE-bench]], which scores how well a system resolves real
GitHub issues.
