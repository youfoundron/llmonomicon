---
title: Ollama
description: A user-friendly local LLM runner that wraps the llama.cpp engine with a one-command CLI, a REST API, and a model library.
technicality: somewhat-technical
tags: [inference, local, open-source]
aliases: [ollama]
updated: 2026-06-17
sources:
  - id: ol-repo
    title: "ollama/ollama (GitHub repository + README)"
    url: https://github.com/ollama/ollama
    author: Ollama
    publisher: GitHub
    year: 2023
  - id: ol-openai
    title: "OpenAI compatibility"
    url: https://ollama.com/blog/openai-compatibility
    author: Ollama
    publisher: ollama.com
    year: 2024
  - id: ol-modelfile
    title: "Ollama Modelfile reference"
    url: https://github.com/ollama/ollama/blob/main/docs/modelfile.mdx
    author: Ollama
    publisher: GitHub
    year: 2024
  - id: ol-import
    title: "Importing a model (GGUF)"
    url: https://github.com/ollama/ollama/blob/main/docs/import.mdx
    author: Ollama
    publisher: GitHub
    year: 2024
---

# Ollama

**Ollama** is an open-source tool, first released in 2023 and written in Go, that
turns running a large language model on your own machine into a one-command
experience.[^ol-repo] Where [[llama.cpp]] is the engine that does the actual
inference, Ollama is the friendly layer around it — handling model downloads,
packaging, and a local server so that `ollama run <model>` just works.[^ol-repo]

## What it does

- **One command to run a model.** `ollama run <model>` launches an open model
  locally, downloading it on first use and dropping you into a chat
  session.[^ol-repo]
- **A local server with an OpenAI-compatible API.** Ollama serves a REST API on
  port `11434`,[^ol-repo] and ships "built-in compatibility with the OpenAI Chat
  Completions API" reachable at `http://localhost:11434/v1`, so existing OpenAI
  client code works by changing the base URL.[^ol-openai]
- **Modelfiles.** Models are customized with a *Modelfile* — "the blueprint to
  create and share customized models" — whose `FROM` line sets the base
  model.[^ol-modelfile] The syntax, built around that `FROM` keyword, will look
  familiar to anyone who has written a Dockerfile.

## Its relationship to llama.cpp

Ollama is the packaging, UX, and model-distribution layer; [[llama.cpp]] is the
inference engine underneath, listed among Ollama's supported backends.[^ol-repo]
The models it runs are [[GGUF]] files: you can pull them from Ollama's own
library, import an existing GGUF with a Modelfile (`FROM ./model.gguf` followed by
`ollama create`), or convert a model from [[safetensors]] using llama.cpp's
tools.[^ol-import]

## Why it matters

By turning a multi-step chore — install an inference engine, find compatible
weights, pick a quantization — into a single `ollama run`, Ollama became one of
the most popular on-ramps to [[Local LLMs|local inference]] and helped carry the open-weights
movement to a wider audience.[^ol-repo] It sits one layer above [[llama.cpp]] and
the [[GGML]] lineage that powers it, trading some low-level control for an
experience almost anyone can use.
