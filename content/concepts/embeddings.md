---
title: Embeddings
description: Dense vector representations of text in which semantic similarity becomes geometric closeness — the representation underlying semantic search, RAG, and clustering.
tags: [retrieval, embeddings]
group: retrieval
aliases: [Embedding, Word embeddings, Text embeddings, Vector embeddings]
updated: 2026-06-17
sources:
  - id: word2vec
    title: "Efficient Estimation of Word Representations in Vector Space"
    url: https://arxiv.org/abs/1301.3781
    author: Mikolov, Chen, Corrado, Dean
    publisher: arXiv
    year: 2013
  - id: sentence-bert
    title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"
    url: https://arxiv.org/abs/1908.10084
    author: Reimers & Gurevych
    publisher: "arXiv (EMNLP 2019)"
    year: 2019
  - id: mteb
    title: "MTEB: Massive Text Embedding Benchmark"
    url: https://arxiv.org/abs/2210.07316
    author: Muennighoff et al.
    publisher: arXiv
    year: 2022
---

# Embeddings

An **embedding** represents a piece of text — a word, a sentence, or a whole
document — as a **dense vector** of numbers, placed in a learned space so that
items with similar meaning land near each other. "Similar meaning, nearby
vectors": closeness in the space (measured by cosine similarity or a dot product)
stands in for semantic similarity. This is what lets software compare *meaning*
rather than match exact words, and it is the representation beneath semantic
search and [[RAG]].

It is distinct from [[Tokenization]]: tokens are the discrete IDs a model reads,
whereas embeddings are the learned, continuous vectors that capture what those
tokens *mean*.

## From word vectors to contextual embeddings

Embeddings began as **static word vectors**. **word2vec** (Mikolov et al., 2013)
showed how to learn dense word vectors from huge text corpora at "much lower
computational cost" than earlier approaches, reaching "state of the art
performance … for measuring syntactic and semantic word similarities."[^word2vec]
A striking property is that meaning shows up as geometry — relationships between
words appear as consistent directions in the space, the basis of the well-known
*king − man + woman ≈ queen* analogy. **GloVe** is the other classic
static-vector method from the same era.

Static vectors give each word a single fixed vector, so they can't tell "river
bank" from "savings bank." **Contextual** embeddings, produced by [[BERT]] and
other [[Transformer]] models, fix this: the same word gets a different vector
depending on the sentence around it.

## Sentence and text embeddings

Plain BERT is awkward for comparing whole sentences at scale — "finding the most
similar pair in a collection of 10,000 sentences requires about 50 million
inference computations (~65 hours) with BERT."[^sentence-bert] **Sentence-BERT**
(Reimers & Gurevych, 2019) restructured the model to emit a single fixed-size
vector per sentence that can be compared directly by cosine similarity, cutting
that search "to about 5 seconds … while maintaining the accuracy."[^sentence-bert]
Modern text-embedding models and APIs continue this line, producing
general-purpose vectors for arbitrary text.

## What they power

Embeddings underpin semantic search, [[RAG]], clustering, classification, and
deduplication — anything that needs a notion of how similar in *meaning* two
pieces of text are. Because no single model is best at everything, they are
compared on benchmarks like **MTEB**, which spans dozens of tasks and languages
and found that "no particular text embedding method dominates across all
tasks."[^mteb] In a retrieval system, embeddings are what get stored in and
searched from a [[Vector database]].
