---
title: BM25 & hybrid search
description: BM25 — the classic lexical (term-matching) ranking function of information retrieval — and hybrid search, which fuses it with dense embedding retrieval to combine exact-term and semantic matching.
technicality: technical
tags: [retrieval, search]
group: retrieval
aliases: [BM25, Hybrid search, Lexical retrieval, Okapi BM25]
updated: 2026-06-23
sources:
  - id: wiki-bm25
    title: "Okapi BM25"
    url: https://en.wikipedia.org/wiki/Okapi_BM25
    publisher: Wikipedia
    year: 2026
  - id: cormack2009
    title: "Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods"
    url: https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf
    author: Cormack, Clarke & Büttcher
    publisher: "SIGIR 2009"
    year: 2009
---

# BM25 & hybrid search

**BM25** is the classic **lexical** ranking function of information retrieval — the method a search
engine uses to score how well a document matches a query based on the **words they share**. It long
predates language models, and it remains the baseline that newer retrieval methods, including
[[Embeddings|embedding]]-based search, are measured against. **Hybrid search** is the common modern
practice of running BM25 *and* a dense semantic retriever and fusing their results.[^wiki-bm25]

## BM25: scoring by shared words

BM25 (often "Okapi BM25") scores a document by how often the query's terms appear in it, with two
refinements that make it work well in practice.[^wiki-bm25] First, **term-frequency saturation**:
repeating a query word in a document helps, but with **diminishing returns** — the tenth occurrence
adds far less than the second (controlled by a parameter `k₁`). Second, **document-length
normalization**: longer documents are discounted so they don't rank highly just for containing more
words (controlled by `b`).[^wiki-bm25] The method grew out of the **probabilistic relevance
framework** developed by Stephen Robertson, Karen Spärck Jones, and others — it is statistics over
terms, with no training and no embeddings.[^wiki-bm25]

## Why lexical retrieval still matters

It would be tempting to assume dense [[Embeddings|embedding]] search made BM25 obsolete, but it
didn't. Lexical search nails **exact matches** — proper nouns, error codes, identifiers, rare
technical terms — that a semantic model can blur together, and it needs no model, no training, and
no [[Vector database|vector index]] to run. That reliability is why BM25 endures as the strong
baseline in retrieval, and as half of many production systems.

## Hybrid search

**Hybrid search** combines the two: BM25's exact-term matching and a dense retriever's semantic
matching, run in parallel and merged. A standard way to merge them is **reciprocal rank fusion
(RRF)**, which combines ranked lists using only each document's **rank** in each list — scoring a
document by the sum of `1 / (k + rank)` across the retrievers — so the sparse and dense scores,
which aren't on a common scale, never have to be reconciled directly.[^cormack2009] In a modern
[[Retrieval-augmented generation|RAG]] pipeline, hybrid retrieval is a frequent default, precisely
because exact-term and semantic matching fail in different places and fusing them covers both.
