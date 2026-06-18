---
title: Claude Code
description: Anthropic's proprietary agentic coding tool — it drives Claude models to read, edit, run, and commit code across a project — launched as a research preview in February 2025.
tags: [closed-source, coding-agent, agents]
updated: 2026-06-17
sources:
  - id: cc-announce
    title: "Claude 3.7 Sonnet and Claude Code"
    url: https://www.anthropic.com/news/claude-3-7-sonnet
    author: Anthropic
    publisher: Anthropic
    year: 2025
  - id: cc-docs
    title: "Claude Code overview"
    url: https://code.claude.com/docs/en/overview
    author: Anthropic
    publisher: Anthropic
    year: 2025
---

# Claude Code

**Claude Code** is [[Anthropic]]'s agentic coding tool: a program that drives
[[Claude]] models to read, edit, run, and commit code across a whole project,
rather than just suggesting snippets. Introduced in February 2025, it was
Anthropic's first agentic coding tool and runs the [[Agent|agent loop]] directly
against your codebase.[^cc-announce]

## What it does

At launch, Anthropic described Claude Code as a command-line tool for "agentic
coding," released as a limited research preview alongside the Claude 3.7 Sonnet
model.[^cc-announce] In practice it can search and read a codebase, edit files,
write and run tests, run command-line tools, and commit and push to GitHub —
carrying out multi-step coding tasks while keeping the developer in the loop at
each step.[^cc-announce] It began as a terminal program and has since expanded to
run in the IDE, a desktop app, and the browser, working across many files and
tools at once.[^cc-docs]

## How it fits the agent picture

Claude Code is a concrete [[Agent]]: it runs the observe–reason–act loop in which
the "acts" are [[Tool use|tool calls]] against your filesystem, shell, and
git.[^cc-docs] It also supports the [[Model Context Protocol]], so it can reach
beyond the codebase — Anthropic notes that "with MCP, Claude Code can read your
design docs in Google Drive, update tickets in Jira, pull data from Slack, or use
your own custom tooling."[^cc-docs]

It is **proprietary** software from Anthropic, generally requiring a Claude
subscription or an Anthropic API account to use.[^cc-docs] In the landscape of
[[Agent harnesses]], it anchors the *closed* side of the coding-agent comparison —
alongside the proprietary editor [[Cursor]] and in contrast to open-source tools
like [[Aider]].

(Fittingly, this grimoire's own contributor-agent pipeline is operated with Claude
Code.)
