---
title: ReAct
description: A prompting pattern that interleaves a model's reasoning with actions and observations — thought, act, observe — letting it use tools mid-reasoning; the ancestor of modern agent loops.
tags: [agents, prompting]
group: agents
aliases: [Reasoning and acting, ReAct prompting]
updated: 2026-06-17
sources:
  - id: react
    title: "ReAct: Synergizing Reasoning and Acting in Language Models"
    url: https://arxiv.org/abs/2210.03629
    author: Yao et al.
    publisher: "arXiv (ICLR 2023)"
    year: 2022
  - id: toolformer
    title: "Toolformer: Language Models Can Teach Themselves to Use Tools"
    url: https://arxiv.org/abs/2302.04761
    author: Schick et al.
    publisher: "arXiv (Meta AI)"
    year: 2023
---

# ReAct

**ReAct** (short for *Reasoning and Acting*) is a prompting pattern that lets a
language model interleave its reasoning with **actions** — such as calling a tool
or running a search — and feed the results back into its own thinking. Rather than
reasoning in a closed loop and then answering, a ReAct model alternates between
**thought**, **action**, and **observation** steps, so it can both plan and gather
real information as it goes.[^react] It is the conceptual ancestor of modern
tool-using [[Agent|agents]].

## The thought–action–observation loop

ReAct was introduced by Yao et al. in 2022. Its insight is to generate "both
reasoning traces and task-specific actions in an interleaved manner," so the two
reinforce each other: "reasoning traces help the model induce, track, and update
action plans as well as handle exceptions," while "actions allow it to interface
with external sources, such as knowledge bases or environments, to gather
additional information."[^react] In short, reasoning makes the acting smarter, and
acting keeps the reasoning grounded.

## Why it matters

The practical payoff is **less hallucination** on knowledge-heavy tasks. Plain
[[Chain-of-thought prompting]] reasons step by step but never checks itself
against the world, which lets errors compound; ReAct instead pauses to fetch a
real observation — a search result, a tool's output — before continuing, directly
countering the "hallucination and error propagation" of reasoning alone.[^react]

More broadly, ReAct is the foundational pattern behind tool-using LLMs. The
thought–action–observation loop is the conceptual ancestor of today's
function-calling and [[Agent|agent]] loops, and it sits alongside the related
tool-learning line of **Toolformer**, which taught models to decide "which APIs to
call, when to call them, what arguments to pass, and how to best incorporate the
results."[^toolformer]

This entry covers the *pattern* itself: the systems built on it are [[Agent|agents]],
the underlying mechanism is [[Tool use]], and the means of making tool calls
reliably well-formed is [[Constrained decoding]].
