---
title: LLM (CLI tool)
description: Simon Willison's open-source command-line tool and Python library for running prompts against many models—notable for logging every interaction to SQLite.
tags: [open-source, cli, tooling]
aliases: [llm, llm CLI, Simon Willison's llm]
updated: 2026-06-17
sources:
  - id: llm-repo
    title: "simonw/llm (GitHub repository)"
    url: https://github.com/simonw/llm
    author: Simon Willison
    publisher: GitHub
    year: 2023
  - id: llm-docs
    title: "LLM: A CLI utility and Python library for interacting with LLMs (documentation)"
    url: https://llm.datasette.io
    author: Simon Willison
    publisher: "llm.datasette.io"
    year: 2023
---

# LLM (CLI tool)

**`llm`** is an open-source command-line tool and Python library, created by
[[Simon Willison]], for working with language models from the terminal. Its own
description sums it up: a tool "for interacting with OpenAI, Anthropic's Claude,
Google's Gemini, Meta's Llama and dozens of other Large Language Models."[^llm-repo]
You can pipe a prompt to it and get a response back — or do the same from Python —
against both hosted APIs and local models. (Its lowercase name, `llm`, predates this
wiki's subject of the same letters.)

## What makes it distinctive

Two design choices set `llm` apart:

- **Plugins.** Support for additional models — other providers, or local models — is
  added through **plugins** rather than built in, which has let a small ecosystem grow
  around the tool.[^llm-repo]
- **SQLite logging.** By default, `llm` records **every prompt and response to a SQLite
  database**, so your whole history is queryable after the fact (and browsable with
  Willison's companion tool, Datasette).[^llm-repo] This "log everything, query later"
  pattern is one of its most-copied ideas.

Beyond plain prompting it also handles **embeddings**, structured data extraction, and
**tool calling** from the command line.[^llm-repo][^llm-docs]

## Where it fits

`llm` is a practitioner's tool, sitting alongside lower-level engines like
[[llama.cpp]] and libraries like [[Hugging Face Transformers]]; its niche is making
many different models — local and remote — usable through one consistent
command-line interface. Its author, [[Simon Willison]], is also one of the field's
most-read commentators; his biography lives in his own entry.
