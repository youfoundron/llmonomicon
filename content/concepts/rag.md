---
title: Retrieval-augmented generation
description: Grounding an LLM in external knowledge at inference time — retrieve relevant documents and insert them into the prompt — so answers reflect current or private data instead of frozen training memory.
technicality: technical
tags: [retrieval, grounding]
group: retrieval
aliases: [RAG, Retrieval augmented generation, Grounding]
updated: 2026-06-17
sources:
  - id: lewis2020
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: https://arxiv.org/abs/2005.11401
    author: "Lewis, Perez, Piktus et al."
    publisher: "arXiv (NeurIPS 2020)"
    year: 2020
  - id: gao2023
    title: "Retrieval-Augmented Generation for Large Language Models: A Survey"
    url: https://arxiv.org/abs/2312.10997
    author: Gao et al.
    publisher: arXiv
    year: 2023
  - id: liu2023
    title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: https://arxiv.org/abs/2307.03172
    author: Liu et al.
    publisher: "arXiv (TACL 2024)"
    year: 2023
---

# Retrieval-augmented generation

**Retrieval-augmented generation (RAG)** gives a language model access to outside
knowledge at the moment it answers, by *retrieving* relevant documents and
inserting them into the prompt. Instead of relying only on what it memorized
during training, a RAG system looks up pertinent text — from a company wiki, a set
of PDFs, the live web — and hands it to the model as context, so the answer is
grounded in that material rather than the model's frozen, fallible memory.[^lewis2020]

## Why retrieve

A model's built-in ("parametric") knowledge is fixed at training time. Lewis et
al., who introduced RAG in 2020, observed that a model's "ability to access and
precisely manipulate knowledge is still limited," and that "providing provenance
for their decisions and updating their world knowledge remain open research
problems."[^lewis2020] In practice that means they go stale, can't see private
data, and hallucinate confidently. Retrieval addresses all three: it injects
current or private information, and because the supporting documents sit right
there in the prompt, the system can cite its sources. RAG does this **without
changing the model's weights**, which makes it complementary to — not a
replacement for — fine-tuning.[^lewis2020] The original formulation paired a
generation model with "a dense vector index of Wikipedia, accessed with a
pre-trained neural retriever," combining "pre-trained parametric and
non-parametric memory."[^lewis2020]

## The pipeline

A typical RAG system composes several pieces, each its own topic:

1. **Index** a document collection by turning chunks of text into [[Embeddings]]
   and storing them in a [[Vector database]].
2. **Retrieve** the top-*k* chunks most similar to the user's query, optionally
   refining the order with [[Reranking (cross-encoders)|reranking]].
3. **Augment** the prompt by placing the retrieved text into the model's
   [[Context window]].
4. **Generate** the answer, now grounded in that text.

A survey of the field calls retrieval, generation, and augmentation the
"tripartite foundation" of RAG, and traces its maturation from **Naive** RAG to
**Advanced** and **Modular** RAG — adding better chunking and indexing, query
rewriting, and composable, increasingly agentic pipelines.[^gao2023]

## What makes it hard

RAG is easy to prototype and hard to do well, because the generation is only as
good as the retrieval. Pulling in more passages is not automatically better:
models get "lost in the middle," with "performance … often highest when relevant
information occurs at the beginning or end" of the input and "significantly
degrad[ing] when models must access relevant information in the middle of long
contexts."[^liu2023] So the quality and ordering of what you retrieve — explored
in depth under [[Context window]] — matter more than sheer quantity, which is why
the retrieval half of the system (embeddings, lexical
[[BM25 & hybrid search|BM25]], similarity search, reranking) is
where most of the engineering goes.
