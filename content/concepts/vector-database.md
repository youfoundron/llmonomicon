---
title: Vector database
description: A database built to store embeddings and retrieve them by similarity (nearest-neighbor) rather than exact match — the storage layer of RAG and semantic search.
tags: [retrieval, database]
group: retrieval
aliases: [Vector databases, Vector store, Vector DB, Vector search]
updated: 2026-06-17
sources:
  - id: survey
    title: "Survey of Vector Database Management Systems"
    url: https://arxiv.org/abs/2310.14021
    author: "Pan, Wang, Li"
    publisher: "arXiv (VLDB Journal 2024)"
    year: 2023
  - id: faiss
    title: "Billion-scale similarity search with GPUs (FAISS)"
    url: https://arxiv.org/abs/1702.08734
    author: "Johnson, Douze, Jégou"
    publisher: arXiv
    year: 2017
  - id: pgvector
    title: "pgvector — open-source vector similarity search for Postgres"
    url: https://github.com/pgvector/pgvector
    author: pgvector contributors
    publisher: GitHub
    year: 2024
---

# Vector database

A **vector database** is a database built to store [[Embeddings]] — high-dimensional
vectors — and retrieve them by *similarity* rather than exact match. Where a
traditional database answers "find the row where id = 42," a vector database
answers "find the items whose meaning is closest to this one," which is exactly
what semantic search and [[RAG]] need.[^survey]

## What it does

A vector database stores vectors alongside metadata and serves nearest-neighbor
queries: given a query vector, return the stored vectors closest to it. Doing that
quickly over millions or billions of vectors is the whole challenge — brute-force
comparison against every stored vector does not scale — so a vector database is
built around an **approximate nearest neighbor (ANN)** index that trades a little
accuracy for large speedups.[^survey] It also supports **metadata filtering**, so
a query can combine "similar in meaning" with structured constraints like a date
range or a source document.

The need for these systems grew directly out of the LLM wave. A survey of the
field attributes "this shift from algorithms to systems" to "new data intensive
applications, notably large language models," that demand fast, scalable search
over vast stores of unstructured data.[^survey]

## What's actually inside

It is worth being clear-eyed about what a vector database is. At its core it is an
**ANN index plus vector storage plus a query API plus metadata filtering** — the
real differentiators between products are scale, hybrid (vector-and-metadata)
queries, and operational concerns like persistence, updates, and durability, not
magic.[^survey] The index is the engine: the dominant ANN families are
partition/quantization-based and graph-based, with **HNSW** (Hierarchical
Navigable Small World) the widely used state of the art — but those algorithms
belong to [[Approximate nearest neighbor (ANN) search]], not here.[^survey]

## The landscape

Vector search shows up in three shapes:

- **Libraries** — [[FAISS]], the canonical similarity-search library, whose origin
  paper connected "1 billion vectors in less than 12 hours" on four GPUs.[^faiss]
- **Database extensions** — pgvector adds vector columns and HNSW/IVFFlat indexes
  to PostgreSQL, keeping ordinary SQL, joins, and transactions intact.[^pgvector]
- **Dedicated systems** — purpose-built databases such as Pinecone, Weaviate,
  Milvus, Qdrant, and Chroma, plus vector features added to search engines like
  Elasticsearch and OpenSearch.[^survey]

That an established database can add vector search as a mere *extension* is the
clearest sign of what the category really is: a useful, well-understood index, not
a new kind of magic.[^survey]
