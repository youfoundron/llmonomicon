---
title: Model Context Protocol
description: An open standard, open-sourced by Anthropic in November 2024, for connecting AI applications to external tools and data via a client–server protocol — "a USB-C port for AI applications."
technicality: technical
tags: [agents, open-standard, tool-use]
aliases: [MCP]
updated: 2026-06-17
sources:
  - id: mcp-announce
    title: "Introducing the Model Context Protocol"
    url: https://www.anthropic.com/news/model-context-protocol
    author: Anthropic
    publisher: Anthropic
    year: 2024
  - id: mcp-docs
    title: "Model Context Protocol — Introduction"
    url: https://modelcontextprotocol.io/introduction
    author: Model Context Protocol project
    publisher: modelcontextprotocol.io
    year: 2025
  - id: mcp-wiki
    title: "Model Context Protocol (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Model_Context_Protocol
    publisher: Wikipedia
    year: 2025
---

# Model Context Protocol

The **Model Context Protocol (MCP)** is an open standard for connecting AI
applications to the external tools and data they need to do useful work.
Open-sourced by [[Anthropic]] in November 2024, it gives agents and assistants a
single, vendor-neutral way to plug into outside systems — the project describes it
as "a USB-C port for AI applications."[^mcp-announce][^mcp-docs]

## What it standardizes

MCP defines a **client–server** protocol. Developers "expose their data through
MCP servers or build AI applications (MCP clients) that connect to these servers"
over secure, two-way connections.[^mcp-announce] An MCP server advertises three
kinds of capability: **tools** (actions the model can invoke), **resources** (data
and context it can read), and **prompts** (reusable workflows).[^mcp-docs] A
client — a chat app, an IDE, or an [[Agent]] — can then discover and use whatever
any compliant server offers, with no custom integration code for each one.

## Why it matters

Before MCP, every application wired up its [[Tool use|tool integrations]] in its
own way, so a connector built for one product did not work in another. MCP
decouples the tools from any single vendor: "build once and integrate
everywhere."[^mcp-docs] In a fragmented agent landscape it is a rare piece of
shared infrastructure — closer in spirit to a standard like OpenAPI than to a
product.[^mcp-wiki] At release, Anthropic shipped the specification and SDKs,
local server support in the Claude desktop apps, and an open repository of
ready-made servers for systems like Google Drive, Slack, GitHub, and
Postgres.[^mcp-announce]

## Adoption

What distinguishes MCP from a single company's plugin system is that other major
providers adopted it. OpenAI embraced MCP in March 2025, integrating it across
products including the ChatGPT desktop app, and Google DeepMind followed in April
2025.[^mcp-wiki] Its documentation lists supporting clients spanning Claude,
ChatGPT, VS Code, and [[Cursor]] — concrete evidence that the standard reaches
across vendors rather than staying within Anthropic's own tools.[^mcp-docs] Many
of the systems described under [[Agent harnesses]] speak MCP to reach their tools.
