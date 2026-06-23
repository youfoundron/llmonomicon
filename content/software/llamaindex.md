---
title: LlamaIndex
description: An open-source data framework for connecting LLMs to your own documents — ingestion, indexing, and retrieval — and, alongside LangChain, one of the two frameworks most associated with RAG.
technicality: technical
tags: [framework, retrieval, open-source]
aliases: [GPT Index]
updated: 2026-06-23
sources:
  - id: llamaindex-repo
    title: "run-llama/llama_index (GitHub repository)"
    url: https://github.com/run-llama/llama_index
    author: Jerry Liu and contributors
    publisher: GitHub
    year: 2022
  - id: llamaindex-history
    title: "LlamaIndex Turns 1: Big Milestones and Growth"
    url: https://www.llamaindex.ai/blog/llamaindex-turns-1-f69dcdd45fe3
    author: LlamaIndex
    publisher: LlamaIndex Blog
    year: 2023
---

# LlamaIndex

**LlamaIndex** is an open-source framework for connecting language models to your own
data. Where a base model knows only what was in its training set, LlamaIndex helps an
application **ingest, index, and retrieve** private or external documents so the model
can answer questions over them — the core loop of
[[Retrieval-augmented generation|retrieval-augmented generation]]. Alongside
[[LangChain]], it is one of the two frameworks most associated with building
LLM-over-your-data apps.[^llamaindex-repo]

## What it provides

LlamaIndex describes itself as "a 'data framework' to help you build LLM
apps,"[^llamaindex-repo] and it centers on three jobs. First, **data connectors** "to
ingest your existing data sources and data formats (APIs, PDFs, docs, SQL, etc.)."
Second, ways to **structure** that data "(indices, graphs) so that this data can be
easily used with LLMs." Third, "an advanced retrieval/query interface over your data" —
feed in a prompt, get back the relevant retrieved context.[^llamaindex-repo] It is
**MIT-licensed** and was created by **Jerry Liu**.[^llamaindex-repo]

## From GPT Index to LlamaIndex

The project started as a side project named **GPT Index**, whose first commit Jerry Liu
pushed in **November 2022**.[^llamaindex-history] It was **renamed LlamaIndex in 2023**
as it grew beyond a GPT-specific wrapper into a general data framework for the broader
LLM ecosystem.[^llamaindex-history]

## LlamaIndex and LangChain

LlamaIndex is often named in the same breath as [[LangChain]], and the two overlap — but
their emphasis differs. LlamaIndex is **data- and retrieval-centric**: its strengths are
ingestion, indexing, and querying over documents.[^llamaindex-repo] [[LangChain]] is a
more **general-purpose** toolkit for chains and [[Agent|agents]]. It is a *focus*
difference, not a rivalry — many teams reach for one, the other, or both. Within the
grimoire's retrieval cluster, LlamaIndex sits atop the machinery it orchestrates:
[[Embeddings]], a [[Vector database]], and the [[RAG]] pattern itself.
