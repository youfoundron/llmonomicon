---
title: Tool use
description: How an LLM invokes external tools — emitting a structured call that a harness executes and feeds back — the mechanism that turns a text model into an agent.
tags: [agents, tool-use]
group: agents
aliases: [function calling, tools, tool calling]
updated: 2026-06-17
sources:
  - id: toolformer
    title: "Toolformer: Language Models Can Teach Themselves to Use Tools"
    url: https://arxiv.org/abs/2302.04761
    author: Schick et al.
    publisher: "arXiv (Meta AI)"
    year: 2023
  - id: openai-fc
    title: "Function calling and other API updates"
    url: https://openai.com/index/function-calling-and-other-api-updates/
    author: OpenAI
    publisher: OpenAI
    year: 2023
  - id: anthropic-tools
    title: "Tool use with Claude"
    url: https://docs.claude.com/en/docs/build-with-claude/tool-use/overview
    author: Anthropic
    publisher: Anthropic
    year: 2025
---

# Tool use

**Tool use** — also called **function calling** — is the mechanism that lets a
language model do more than produce text: it can call out to external tools like
a calculator, a search engine, a database, or arbitrary code. This is what turns
a text model into an [[Agent]]; without it, a model can only *describe* an action,
never take one.[^anthropic-tools]

## How it works

The model does not run anything itself. Instead the pattern is a hand-off between
the model and the surrounding program (its harness):[^anthropic-tools]

1. You give the model a set of **tool definitions** — each a name, a description
   of what it does, and a schema (usually JSON) for its inputs.
2. When the model decides a tool is needed, it emits a **structured call** — not
   prose, but a machine-readable request naming the tool and its arguments.
3. Your application **executes** that call and returns the **result** to the model.
4. The model uses the result to continue — answering, or calling another tool.

A useful distinction: **client tools** run in your own application (the model
returns a call, you execute it and send the result back), while **server tools**
run on the provider's own infrastructure.[^anthropic-tools] Either way, the model
chooses *when* and *how* to call; the harness does the actual work.

## Where it came from

The research idea was demonstrated by **Toolformer** (Meta AI, 2023), which showed
that "LMs can teach themselves to use external tools via simple APIs" — learning
in a self-supervised way "to decide which APIs to call, when to call them, what
arguments to pass, and how to best incorporate the results," across tools like a
calculator, a search engine, and a translation system.[^toolformer]

It became a mainstream product primitive in June 2023, when OpenAI added
**function calling**: developers could "describe functions … and have the model
intelligently choose to output a JSON object containing arguments to call those
functions," with the models fine-tuned to "detect when a function needs to be
called and to respond with JSON that adheres to the function signature."[^openai-fc]
Provider-native tool-use APIs have been standard ever since.

## Related ideas

Tool use is the *acting* half of the reason–act loop formalized by [[ReAct]], and
the action primitive the [[Agent]] loop runs on. As tools proliferated, so did the
need to expose them in a consistent way — addressed by the [[Model Context
Protocol]], an open standard for connecting models to tool servers.[^anthropic-tools]
