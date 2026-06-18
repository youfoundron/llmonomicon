---
title: Agent
description: A system that uses an LLM to decide its own actions in a loop — observe, reason, act — with tool use, memory, and planning, rather than following a fixed script.
tags: [agents, reasoning]
group: agents
aliases: [LLM agent, agentic systems, AI agent]
updated: 2026-06-17
sources:
  - id: anthropic-bea
    title: "Building Effective Agents"
    url: https://www.anthropic.com/engineering/building-effective-agents
    author: Anthropic
    publisher: Anthropic
    year: 2024
  - id: react2022
    title: "ReAct: Synergizing Reasoning and Acting in Language Models"
    url: https://arxiv.org/abs/2210.03629
    author: Yao et al.
    publisher: "arXiv (ICLR 2023)"
    year: 2022
  - id: weng2023
    title: "LLM Powered Autonomous Agents"
    url: https://lilianweng.github.io/posts/2023-06-23-agent/
    author: Lilian Weng
    publisher: lilianweng.github.io
    year: 2023
---

# Agent

An **agent** (or *LLM agent*) is a system that uses a language model to decide its
own actions in a loop, pursuing a goal with limited human steering. The defining
feature is *who is in control*: in an agent, the model itself decides what to do
next, rather than following steps a programmer laid out in advance.[^anthropic-bea]

## Agents versus workflows

It helps to draw a line. Anthropic distinguishes **agents** — "systems where LLMs
dynamically direct their own processes and tool usage, maintaining control over
how they accomplish tasks" — from **workflows**, "systems where LLMs and tools
are orchestrated through predefined code paths."[^anthropic-bea] A workflow runs
the model through a fixed script; an agent lets the model choose the path. That
distinction, not the mere presence of an LLM, is what makes something "agentic."

## The loop

At their core, agents are "typically just LLMs using tools based on environmental
feedback in a loop."[^anthropic-bea] The pattern is **observe → reason → act →
observe**: the model looks at the current state, decides on an action, takes it
(usually by calling a tool), then observes the result before deciding again.
Crucially, it gets "ground truth from the environment at each step (such as tool
call results or code execution) to assess its progress"[^anthropic-bea] — real
feedback, not just its own predictions, is what keeps the loop on track.

This interleaving of thinking and doing was crystallized by **[[ReAct]]**, which
generates "both reasoning traces and task-specific actions in an interleaved
manner": the reasoning "help[s] the model induce, track, and update action plans"
and handle exceptions, while the actions let it "interface with external sources …
to gather additional information."[^react2022]

## Building blocks

A widely-cited decomposition by Lilian Weng frames the LLM as "the agent's brain,"
surrounded by a few components:[^weng2023]

- **Planning** — breaking a goal into subgoals, and reflecting on or
  self-critiquing earlier steps.
- **Memory** — short-term (what fits in the [[Context window|context window]]) and
  long-term (an external store the agent can read from and write to).
- **[[Tool use]]** — calling external functions and APIs to act on the world or
  fetch information.

These sit inside the orchestration loop that runs until the goal is met or the
agent gives up.

## From autonomy hype to scoped agents

The idea had a breakout moment in 2023, when fully-autonomous experiments like
[[AutoGPT]] tried to chain an LLM into open-ended self-direction. They captured
imaginations but proved hard to make reliable, and the field shifted toward
narrower, **scoped** agents — coding agents being the clearest success. The honest
lesson, as Anthropic puts it, is to "find the simplest solution possible, and only
increase complexity when needed": much of what looks like it needs an agent is
better served by a plain workflow, and an agent's autonomy is worth its
unpredictability only when the task genuinely demands it.[^anthropic-bea]

Specific agent systems and frameworks are covered under [[Agent harnesses]].
