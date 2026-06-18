---
title: FAISS
description: Meta's open-source library for efficient similarity search over dense vectors — exact and approximate (IVF, HNSW, PQ) indexes on CPU/GPU — the foundational toolkit under much of the vector-search ecosystem.
technicality: technical
tags: [open-source, retrieval]
aliases: [Facebook AI Similarity Search]
updated: 2026-06-18
sources:
  - id: faiss-paper
    title: "Billion-scale similarity search with GPUs"
    url: https://arxiv.org/abs/1702.08734
    author: Johnson, Douze & Jégou
    publisher: arXiv
    year: 2017
  - id: faiss-repo
    title: "facebookresearch/faiss (GitHub repository)"
    url: https://github.com/facebookresearch/faiss
    author: Meta Fundamental AI Research
    publisher: GitHub
    year: 2017
---

# FAISS

**FAISS** (Facebook AI Similarity Search) is the open-source library much of the
vector-search world is built on. Created by Meta's Fundamental AI Research (FAIR)
group, it is "a library for efficient similarity search and clustering of dense
vectors" — the standard toolkit for indexing [[Embeddings]] and finding the
nearest ones to a query at scale.[^faiss-repo]

## What it provides

FAISS is written in C++ with Python and NumPy bindings, released under the MIT
license, and runs on both CPU and GPU.[^faiss-repo] Its core is a collection of
**index types** that trade off speed, accuracy, and memory: an exact (flat) index
that compares against every vector, and a range of [[Approximate nearest neighbor
(ANN) search|approximate]] indexes — IVF clustering, HNSW graphs, and product
quantization for compression — over distances such as L2, dot product, and
cosine.[^faiss-repo] It scales to datasets of billions of vectors, including sets
too large to fit in RAM.[^faiss-repo] The algorithms behind these indexes are
covered under [[Approximate nearest neighbor (ANN) search]]; FAISS is where they
are implemented and combined.

## The billion-scale milestone

FAISS's reputation was cemented by its GPU work. The accompanying paper
demonstrated similarity search at **billion-vector scale** — building "a graph
connecting 1 billion vectors in less than 12 hours" on four GPUs, using
"brute-force, approximate and compressed-domain search based on product
quantization."[^faiss-paper]
That made dense-vector search practical at sizes that had previously been
infeasible.

## Library, not a database

FAISS is a **library you embed in your own program**, not a hosted service — and
that distinction matters. Many [[Vector database]] products wrap FAISS or were
inspired by it, adding the storage, metadata filtering, and operations that a
library alone does not provide.[^faiss-repo] If you simply need to index a set of
embeddings and query their nearest neighbors in code, FAISS is often all you need;
if you need a managed system with persistence and an API, that is where vector
databases come in.
