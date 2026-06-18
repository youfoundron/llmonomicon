---
title: Reranking
description: The precision stage of retrieval — a slower, more accurate model (often a cross-encoder) re-scores the shortlist from fast first-stage search — the standard quality lever in RAG pipelines.
tags: [retrieval, ranking]
group: retrieval
aliases: [Re-ranking, Cross-encoder, Retrieve-then-rerank, "Reranking (cross-encoders)"]
updated: 2026-06-18
sources:
  - id: nogueira2019
    title: "Passage Re-ranking with BERT"
    url: https://arxiv.org/abs/1901.04085
    author: Nogueira & Cho
    publisher: arXiv
    year: 2019
  - id: sentence-bert
    title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"
    url: https://arxiv.org/abs/1908.10084
    author: Reimers & Gurevych
    publisher: "arXiv (EMNLP 2019)"
    year: 2019
  - id: colbert
    title: "ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT"
    url: https://arxiv.org/abs/2004.12832
    author: Khattab & Zaharia
    publisher: arXiv
    year: 2020
---

# Reranking

**Reranking** is the precision stage of a retrieval pipeline: after a fast first
pass pulls a shortlist of candidate documents, a slower but more accurate model
re-scores that shortlist to put the most relevant results on top. It is the
standard quality lever in serious [[RAG]] systems, where the order and relevance
of retrieved passages directly shape the answer.

## Retrieve, then rerank

Retrieval usually happens in two stages with different priorities. The first is
built for **recall and speed**: it uses [[Embeddings|bi-encoder]] embeddings and
[[Approximate nearest neighbor (ANN) search|approximate nearest-neighbor search]]
to pull, say, the top hundred candidates out of millions in milliseconds. The
second is built for **precision**: a reranker carefully re-scores just those
candidates and reorders them. Because the reranker only ever sees a small
shortlist, it can afford to be far more expensive per item than the first-stage
search.

## Bi-encoders versus cross-encoders

The reason for two stages is a fundamental trade-off in how query and document are
compared:

- A **bi-encoder** embeds the query and each document *separately* into vectors and
  compares the vectors. Because the document vectors do not depend on the query,
  they can be **computed once and cached** — which is exactly what makes ANN search
  over millions of documents fast.
- A **cross-encoder** feeds the query and a document *together* through the model
  in a single pass, letting them interact directly. This is much more accurate, but
  nothing can be precomputed: every query–document pair must be run from scratch.

Sentence-BERT quantified the gap: finding the most similar pair among 10,000
sentences takes about "65 hours with BERT" as a cross-encoder, versus about "5
seconds" with cached bi-encoder embeddings.[^sentence-bert] That is why
cross-encoders are reserved for reranking a shortlist rather than searching a whole
corpus.

## The seminal reranker, and a middle ground

Nogueira and Cho introduced the modern approach in 2019, using **[[BERT]] as a
cross-encoder** to re-rank passages — jointly encoding each query–passage pair to
score relevance. It took "the top entry in the leaderboard of the MS MARCO passage
retrieval task, outperforming the previous state of the art by 27% (relative) in
MRR@10."[^nogueira2019]

**ColBERT** later staked out a middle ground called *late interaction*: it encodes
query and document independently into token-level embeddings (so documents can
still be precomputed), then applies a cheap matching step at query time. The result
is "competitive with existing BERT-based models" while running "two
orders-of-magnitude faster" with "four orders-of-magnitude fewer FLOPs per
query."[^colbert]

In practice, reranking is the precision lever you reach for to sharpen a [[RAG]]
pipeline: rerank the retrieved chunks before handing them to the model. Common
options include cross-encoder rerankers from the sentence-transformers library,
commercial services such as Cohere Rerank, and ColBERT-style late interaction.
