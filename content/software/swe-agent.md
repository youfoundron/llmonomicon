---
title: SWE-agent
description: A research coding agent from Princeton whose key contribution is the "agent-computer interface"—the finding that how you design an agent's tools matters as much as the model.
technicality: technical
tags: [open-source, coding-agent, research]
updated: 2026-06-18
sources:
  - id: swe-agent-paper
    title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
    url: https://arxiv.org/abs/2405.15793
    author: Yang et al. (Princeton)
    publisher: "arXiv (NeurIPS 2024)"
    year: 2024
  - id: swe-agent-repo
    title: "SWE-agent/SWE-agent (GitHub repository)"
    url: https://github.com/SWE-agent/SWE-agent
    author: Princeton NLP / Yang et al.
    publisher: GitHub
    year: 2024
---

# SWE-agent

**SWE-agent** is an open-source research system, from Princeton in 2024, that lets a
language model "autonomously use tools to fix issues in real GitHub
repositories."[^swe-agent-repo] It is best understood not as just another coding
assistant but as the source of an influential idea: that the *interface* between an
agent and its tools matters as much as the underlying model.

## The agent-computer interface

That idea is in the paper's title — "Agent-Computer Interfaces Enable Automated Software
Engineering." Just as humans work better with well-designed user interfaces, the authors
found that LM agents perform far better when given a purpose-built **agent–computer
interface (ACI)**: a carefully chosen set of commands and feedback formats. As they put
it, SWE-agent's "custom agent-computer interface (ACI) significantly enhances an agent's
ability to create and edit code files, navigate entire repositories, and execute
tests."[^swe-agent-paper] The takeaway — that *interface design*, not only model quality,
shapes how well an agent performs — is the entry's reason for being.

## Relationship to SWE-bench

SWE-agent was built to tackle **[[SWE-bench]]**, the benchmark of real GitHub issues. In
the paper it solved 12.5% of tasks (pass@1), which the authors noted "far exceed[ed] the
previous state-of-the-art achieved with non-interactive LMs."[^swe-agent-paper] (That
figure is a 2024 snapshot; the leaderboard has since moved on, and the benchmark's depth
lives in [[SWE-bench]].) SWE-agent is the *research* counterpart to the product coding
agents like [[Devin]] and [[Claude Code]]: where those are tools, its lasting
contribution is the conceptual ACI finding. It is MIT-licensed.[^swe-agent-repo]
