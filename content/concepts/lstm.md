---
title: Long Short-Term Memory
description: The gated recurrent-network architecture that learned long-range dependencies in sequences — the dominant approach to modeling language before the Transformer.
tags: [architecture, mechanism]
group: architecture
technicality: technical
aliases: [LSTM, Long short-term memory, Recurrent neural network, Recurrent neural networks, RNN, RNNs, Vanishing gradient, Vanishing gradient problem]
updated: 2026-06-23
sources:
  - id: hochreiter1997
    title: "Long Short-Term Memory"
    url: https://doi.org/10.1162/neco.1997.9.8.1735
    author: Hochreiter & Schmidhuber
    publisher: Neural Computation (MIT Press)
    year: 1997
  - id: hochreiter1991
    title: "Untersuchungen zu dynamischen neuronalen Netzen (diploma thesis)"
    url: https://people.idsia.ch/~juergen/SeppHochreiter1991ThesisAdvisorSchmidhuber.pdf
    author: Sepp Hochreiter
    publisher: Technische Universität München
    year: 1991
  - id: bengio1994
    title: "Learning Long-Term Dependencies with Gradient Descent Is Difficult"
    url: https://doi.org/10.1109/72.279181
    author: Bengio, Simard & Frasconi
    publisher: IEEE Transactions on Neural Networks
    year: 1994
  - id: gers2000
    title: "Learning to Forget: Continual Prediction with LSTM"
    url: https://doi.org/10.1162/089976600300015015
    author: Gers, Schmidhuber & Cummins
    publisher: Neural Computation (MIT Press)
    year: 2000
  - id: sutskever2014
    title: "Sequence to Sequence Learning with Neural Networks"
    url: https://arxiv.org/abs/1409.3215
    author: Sutskever, Vinyals & Le
    publisher: NeurIPS / arXiv
    year: 2014
  - id: vaswani2017
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: Vaswani et al.
    publisher: NeurIPS / arXiv
    year: 2017
  - id: cho2014
    title: "Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation"
    url: https://arxiv.org/abs/1406.1078
    author: Cho et al.
    publisher: EMNLP / arXiv
    year: 2014
---

# Long Short-Term Memory

**Long Short-Term Memory (LSTM)** is a kind of recurrent neural network built to
remember information across long stretches of a sequence. For roughly two decades
it was the workhorse for sequence data — text, speech, handwriting — and stacked
LSTMs powered the first wave of neural machine translation. It is, in short, the
architecture the [[Transformer]] replaced, and seeing why it was eventually set
aside explains much of why [[Attention|attention]] won.

## Recurrent networks and the vanishing-gradient problem

A **recurrent neural network (RNN)** reads a sequence one element at a time,
keeping a hidden state that it carries forward from step to step — in principle,
a running memory of everything seen so far. In practice, plain RNNs struggle to
use that memory across long gaps. Training them with backpropagation through time
sends an error signal backward across many steps, and at each step that signal is
repeatedly multiplied; it tends to either shrink toward zero (**vanishing
gradients**) or grow without bound (**exploding gradients**). When gradients
vanish, the network cannot learn dependencies that span more than a handful of
steps. The problem was first analyzed in detail in [[Sepp Hochreiter]]'s 1991
diploma thesis[^hochreiter1991] and given its canonical English statement by
Bengio, Simard, and Frasconi in 1994.[^bengio1994]

## The LSTM cell

LSTM, introduced by [[Sepp Hochreiter]] and [[Jürgen Schmidhuber]] in
1997,[^hochreiter1997] addresses this with a redesigned memory unit. Each LSTM
**cell** carries an internal state along a self-connection the authors named the
**constant error carousel** — a path on which the error signal can flow backward
at roughly constant magnitude, neither vanishing nor exploding. Access to that
state is regulated by learned **gates**: small sub-networks that decide how much
information passes in and out. The original 1997 design had an **input gate**
(what new information to store) and an **output gate** (what to expose to the rest
of the network).[^hochreiter1997]

A third gate — the **forget gate**, which lets a cell learn to clear its own state
— was added three years later by Gers, Schmidhuber, and Cummins,[^gers2000] and is
now treated as standard. It let LSTMs work on continuous, unsegmented streams,
where the network must decide for itself when old context has stopped being
relevant. A simpler gated cousin, the **gated recurrent unit (GRU)**, was
introduced by Cho and colleagues in 2014; it folds the gating into a smaller
design and often performs comparably with fewer parameters.[^cho2014]

## Why it mattered for language models

Through the early 2010s, stacked (multilayer) LSTMs became the dominant
architecture for sequence modeling, language included. The clearest landmark is
**sequence-to-sequence learning**: in 2014 [[Ilya Sutskever]], [[Oriol Vinyals]],
and Quoc Le used a multilayer LSTM to compress an input sentence into a
fixed-length vector — effectively a learned [[Embeddings|embedding]] of the whole
sentence — and a second LSTM to unfold that vector into a translation, reaching a
BLEU score (a standard automatic measure of translation quality) of 34.8 on the
WMT'14 English-to-French task, competitive with the strongest systems of the
day.[^sutskever2014] This encoder–decoder recipe became the template for neural
machine translation and, more generally, for mapping one sequence to another.

## The break with recurrence

LSTM's central limitation is structural. Because it walks through a sequence step
by step, its computation is inherently sequential and hard to parallelize, and
even with the constant error carousel, the longest-range dependencies stay hard to
capture. In 2017 the [[Transformer]] abandoned recurrence outright: its defining
paper, [[Attention Is All You Need]], proposed "a new simple network architecture,
the Transformer, based solely on attention mechanisms, dispensing with recurrence
and convolutions entirely."[^vaswani2017] Letting the model relate any two
positions directly and in parallel proved decisive, and the recurrent lineage that
LSTM had defined gave way to the attention-based architecture behind today's large
language models. LSTMs remain useful where input arrives as a stream or compute is
tight, but for modeling language at scale, attention displaced them.
