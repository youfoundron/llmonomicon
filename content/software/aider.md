---
title: Aider
description: An open-source, git-native coding agent for the terminal — chat to edit your code and it commits the changes — the vendor-neutral, model-agnostic counterpart to closed agents like Cursor and Claude Code.
tags: [open-source, coding-agent]
updated: 2026-06-17
sources:
  - id: aider-repo
    title: "Aider-AI/aider (GitHub repository)"
    url: https://github.com/Aider-AI/aider
    author: Aider-AI and contributors
    publisher: GitHub
    year: 2024
  - id: aider-site
    title: "Aider — AI pair programming in your terminal"
    url: https://aider.chat
    author: Aider
    publisher: aider.chat
    year: 2024
---

# Aider

**Aider** is an open-source coding agent that runs in the terminal and does "AI
pair programming" directly against a local git repository. You chat with it about
what you want; it edits the relevant files and — its signature move — commits the
changes to git as it goes.[^aider-site][^aider-repo] It is the open, vendor-neutral
counterpart to closed coding agents like [[Claude Code]] and [[Cursor]].

## The workflow

Aider's defining feature is that it is **git-native**. As its documentation puts
it, "Aider automatically commits changes with sensible commit messages," so you
can "use familiar git tools to easily diff, manage and undo AI changes."[^aider-site]
The loop is simple: describe a change in the terminal, Aider edits the files and
makes a commit, and you review the diff like any other commit — keeping a clean,
revertible record of what the AI did.

## Model-agnostic and open

Aider is **model-agnostic**: it works with frontier models from the major
providers and "can connect to almost any LLM, including local models."[^aider-repo]
That local-model support makes it a natural companion to the [[Local LLMs]]
world — you can point it at a model running on your own machine via [[llama.cpp]]
instead of a hosted API. It is released under the **Apache-2.0 license**.[^aider-repo]

## Where it fits

In the landscape of [[Agent harnesses]], Aider anchors the **open** side of the
coding-agent comparison. It shares the terminal niche with Anthropic's
[[Claude Code]] but is vendor-neutral and open source, and it contrasts with the
closed, IDE-based [[Cursor]]. Like any coding agent, it works by [[Tool use|using
tools]] — editing files, running commands, driving git — inside an [[Agent|agent]]
loop.
