---
title: Approximate nearest neighbor (ANN) search
description: The algorithms that find vectors closest to a query quickly by accepting approximate answers — HNSW, IVF, and product quantization — the engine inside vector databases and FAISS.
tags: [retrieval, search]
group: retrieval
aliases: [ANN search, Approximate nearest neighbor, Nearest neighbor search, HNSW]
updated: 2026-06-17
sources:
  - id: hnsw
    title: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs"
    url: https://arxiv.org/abs/1603.09320
    author: Malkov & Yashunin
    publisher: "arXiv (IEEE TPAMI)"
    year: 2016
  - id: pq
    title: "Product Quantization for Nearest Neighbor Search"
    url: https://inria.hal.science/inria-00514462
    author: Jégou, Douze & Schmid
    publisher: "IEEE TPAMI (INRIA HAL, open access)"
    year: 2011
  - id: faiss
    title: "Billion-scale similarity search with GPUs"
    url: https://arxiv.org/abs/1702.08734
    author: Johnson, Douze & Jégou
    publisher: arXiv
    year: 2017
---

# Approximate nearest neighbor (ANN) search

**Approximate nearest neighbor (ANN) search** is the family of algorithms that
find the items closest to a query vector quickly, by accepting *approximate*
answers in exchange for large speedups. It is the engine inside every [[Vector
database]] and similarity-search library such as [[FAISS]] — the machinery that
makes searching billions of [[Embeddings]] feasible.

## Why approximate?

Finding the true nearest neighbors of a query is conceptually simple: compute the
distance to every stored vector and keep the closest. But that **exact** search is
a linear scan whose cost grows with the size of the collection, and over millions
or billions of high-dimensional vectors it is far too slow.[^faiss] ANN methods
give that up: they return *almost* the right neighbors *almost* always, trading a
small loss in **recall** for order-of-magnitude gains in speed. For semantic
search and RAG, where "close enough" is usually fine, that is a trade well worth
making.

## The main approaches

Three families dominate, each striking a different balance among recall, speed,
and memory:

- **HNSW (graph-based)** — *Hierarchical Navigable Small World* graphs build a
  layered network of proximity links between vectors and traverse it greedily from
  a coarse top layer downward, achieving "logarithmic complexity scaling" and, in
  its authors' benchmarks, strongly outperforming prior open-source methods.[^hnsw]
  It is the de facto default, prized for excellent recall and speed — at the cost
  of holding the graph in memory.
- **IVF (inverted-file clustering)** — partition the vectors into cells (for
  example with k-means), then at query time probe only the few cells nearest the
  query, sharply cutting how many vectors must be compared.[^pq][^faiss]
- **Product quantization (PQ)** — compress each vector by splitting it into
  sub-vectors and replacing each with the nearest entry in a small learned
  codebook, storing a compact code rather than the full vector — letting a system
  hold very large databases in memory and compute fast approximate distances, at
  some cost in accuracy.[^pq] PQ is often layered on top of IVF (as *IVF-PQ*).

PQ is a close cousin of [[Quantization]]: where model quantization shrinks a
network's *weights*, product quantization shrinks the stored *vectors* — the same
trick of trading precision for size, aimed at a different target.[^pq]

## The trade-off triangle

There is no single best method, only different points on a **recall–speed–memory**
triangle: HNSW leans fast and accurate but memory-hungry; IVF cuts comparisons by
probing fewer cells; PQ shrinks memory dramatically while giving up some accuracy.
Real systems mix them, and the right choice depends on dataset size, latency
budget, and how much hardware you can spend. These algorithms are the engine that
[[Vector database|vector databases]] and [[FAISS]] package into a usable system.
