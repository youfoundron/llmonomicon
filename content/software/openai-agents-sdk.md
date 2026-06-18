---
title: OpenAI Agents SDK
description: OpenAI's lightweight open-source framework for building multi-agent workflows—a minimal "agents and handoffs" design, and the production successor to its experimental Swarm.
technicality: technical
tags: [open-source, framework, agents]
aliases: [Swarm]
updated: 2026-06-18
sources:
  - id: agents-sdk
    title: "openai/openai-agents-python (GitHub repository)"
    url: https://github.com/openai/openai-agents-python
    author: OpenAI
    publisher: GitHub
    year: 2025
  - id: swarm
    title: "openai/swarm (GitHub repository)"
    url: https://github.com/openai/swarm
    author: OpenAI
    publisher: GitHub
    year: 2024
---

# OpenAI Agents SDK

The **OpenAI Agents SDK** is [[OpenAI]]'s first-party, open-source framework for building
agent systems — "a lightweight yet powerful framework for building multi-agent
workflows."[^agents-sdk] Its design philosophy is deliberately minimal: rather than a
large set of abstractions, it offers a few composable primitives.

## The primitives

The SDK is built around a small handful of concepts:[^agents-sdk]

- **Agents** — a language model equipped with instructions, tools, and guardrails;
- **Handoffs** — the mechanism by which one agent transfers control to another;
- **Tools** — functions the agent can call, including [[Model Context Protocol]]
  servers;
- **Guardrails** — validation and safety checks on inputs and outputs;
- plus session memory and tracing for debugging runs.

This "agents and handoffs" surface is a deliberate counterpoint to heavier orchestration
frameworks like [[LangChain]]: the pitch is to stay lightweight, controllable, and easy
to test.[^swarm]

## From Swarm to the Agents SDK

The SDK is the production successor to **Swarm**, an earlier OpenAI project that the team
described as "experimental" and "educational" — a way to explore "ergonomic, lightweight
multi-agent orchestration" built on the same agents-and-handoffs idea.[^swarm] Swarm's
repository now states plainly that it "is now replaced by the OpenAI Agents SDK," which
OpenAI recommends "for all production use cases."[^swarm] Both are released under the MIT
license.[^agents-sdk]
