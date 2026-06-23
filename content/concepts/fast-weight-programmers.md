---
title: Fast weight programmers
description: A 1991 Schmidhuber mechanism in which one network programs another's weights — shown in 2021 to be formally equivalent to linear attention, making it a peer-reviewed precursor of the Transformer.
tags: [architecture, attention, efficiency]
group: architecture
technicality: highly-technical
aliases: [Fast weights, Fast weight programmer, Linear Transformer, Linearized attention]
updated: 2026-06-23
sources:
  - id: schlag2021
    title: "Linear Transformers Are Secretly Fast Weight Programmers"
    url: https://arxiv.org/abs/2102.11174
    author: Schlag, Irie & Schmidhuber
    publisher: ICML / arXiv
    year: 2021
  - id: schmidhuber1992
    title: "Learning to Control Fast-Weight Memories: An Alternative to Dynamic Recurrent Networks"
    url: https://doi.org/10.1162/neco.1992.4.1.131
    author: Jürgen Schmidhuber
    publisher: Neural Computation (MIT Press)
    year: 1992
  - id: schmidhuber-munich
    title: "AI Blog: roots of the AI boom in Munich 1991"
    url: https://people.idsia.ch/~juergen/ai-boom-roots-munich-1991.html
    author: Jürgen Schmidhuber
    publisher: IDSIA
    year: 2021
---

# Fast weight programmers

**Fast weight programmers** are a neural-network mechanism, introduced by [[Jürgen
Schmidhuber]] in 1991–92, in which one network rapidly generates the weights of another.
Long a historical footnote, they became newly relevant when a 2021 result showed they are
formally equivalent to a stripped-down form of the [[Attention|attention]] that powers the
[[Transformer]] — making them a genuine, peer-reviewed precursor to modern LLM architecture
rather than merely a priority claim.

## The original idea

In a standard network the weights are fixed once training ends. A fast weight programmer
splits the model in two: a **"slow"** network, trained normally by gradient descent, emits
— as a function of the current input — a set of rapidly changing **"fast" weights** that
parameterize a second network.[^schmidhuber1992] Because those fast weights are written and
read on the fly, the second network behaves as a **content-addressable associative memory**:
information can be stored under a key and later retrieved by a similar key. That memory is
built from **outer products** of activation vectors, which lets storing and querying it
scale **linearly** with sequence length rather than quadratically.

## The modern bridge

The reason this matters today is a 2021 paper by Imanol Schlag, Kazuki Irie, and
Schmidhuber, **"Linear Transformers Are Secretly Fast Weight Programmers,"** which proves a
formal equivalence. In their words, they "show the formal equivalence of linearised
self-attention mechanisms and fast weight controllers from the early '90s, where a 'slow'
neural net learns by gradient descent to program the 'fast weights' of another net through
sequences of elementary programming instructions which are additive outer products of
self-invented activation patterns (today called keys and values)."[^schlag2021] Put plainly:
the **keys and values** of linearized [[Attention|attention]] are precisely the
outer-product updates of a fast-weight memory.

## Why it matters

The equivalence does two things. It gives [[Attention]] and the [[Transformer]] — usually
traced to the 2017 [[Attention Is All You Need]] paper — a deeper architectural lineage
reaching back to the early 1990s. And it connects to the **efficiency** frontier:
*linear-attention* models, which this framing makes precise, compute attention in time and
memory that grow linearly with context, sidestepping the quadratic cost and [[KV cache]]
growth of standard attention — a goal shared with other sub-quadratic designs such as
[[Sliding-window & sparse attention]]. (Schmidhuber also presents the 1991 work as an
attention precursor on his own pages; the load-bearing claim here is the peer-reviewed 2021
result, with broader credit-priority context in the [[Jürgen Schmidhuber]]
entry.[^schmidhuber-munich])
