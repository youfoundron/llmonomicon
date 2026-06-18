---
title: LangChain
description: The open-source framework, launched in October 2022, that defined how developers build LLM apps and agents — and the abstraction-overhead debate around it.
tags: [agents, framework, open-source]
aliases: [LangGraph, LCEL, LangChain Expression Language]
updated: 2026-06-17
sources:
  - id: repo
    title: "LangChain (GitHub repository)"
    url: https://github.com/langchain-ai/langchain
    author: LangChain
    publisher: GitHub
    year: 2024
  - id: wiki
    title: "LangChain"
    url: https://en.wikipedia.org/wiki/LangChain
    publisher: Wikipedia
    year: 2026
  - id: techcrunch
    title: "Open source agentic startup LangChain hits $1.25B valuation"
    url: https://techcrunch.com/2025/10/21/open-source-agentic-startup-langchain-hits-1-25b-valuation/
    author: TechCrunch
    publisher: TechCrunch
    year: 2025
  - id: octomind
    title: "Why we no longer use LangChain for building our AI agents"
    url: https://octomind.dev/blog/why-we-no-longer-use-langchain-for-building-our-ai-agents
    author: Octomind
    publisher: Octomind
    year: 2024
---

# LangChain

**LangChain** is an open-source framework for building applications and
[[Agent|agents]] on top of language models. Launched in October 2022, just as
ChatGPT was about to make LLMs a mainstream interest, it became — more than any
other tool — the default way developers first learned to wire a model into a
working app.[^wiki][^repo]

## What it provides

LangChain describes itself as "a framework for building agents and LLM-powered
applications," and it supplies the common building blocks: chains that compose
calls into pipelines, [[Tool use|tool use]], memory, and agent loops.[^repo] It is
**open source under the MIT license**, stewarded by the company of the same
name.[^repo] It was created by Harrison Chase in October 2022, and its timing —
arriving right as ChatGPT broke — helped carry it to ubiquity.[^wiki]

A later, lower-level library, **LangGraph**, models agents as explicit stateful
graphs, giving developers direct control over orchestration, memory, and
human-in-the-loop steps — a response to the criticism that the original
high-level abstractions were too rigid for complex agents.[^wiki] It is one of the
frameworks surveyed in [[Agent harnesses]].

## Its place in the ecosystem

LangChain's reach is hard to overstate: for most of the LLM era it has been the
canonical reference point for "how do I build an agent." The company became a
unicorn, raising a $125M Series B at a $1.25 billion valuation in 2025.[^techcrunch]

## The critique

LangChain also draws a consistent criticism: **abstraction overhead**. Detractors
argue its layers — chains, runnables, agents, callbacks — pile "abstractions on
top of other abstractions" that make simple tasks convoluted and hide the levers (prompt
wording, tool wiring, latency) teams actually need to control.[^octomind] Some
have publicly dropped it, arguing that calling provider APIs directly was
simpler.[^octomind] The even-handed read is that LangChain earns its complexity on
large, multi-step, enterprise agent systems but is often overkill for a
straightforward [[RAG]] app — and leaner alternatives such as the [[OpenAI Agents
SDK]] now offer a lighter-weight option.[^octomind]
