---
title: Sepp Hochreiter
description: German computer scientist who co-invented LSTM and first analyzed the vanishing-gradient problem; now at JKU Linz, building the Transformer-alternative xLSTM as "AI made in Europe."
technicality: non-technical
tags: [researcher, deep-learning]
aliases: [Josef Hochreiter, Hochreiter]
updated: 2026-06-23
sources:
  - id: hochreiter-wiki
    title: "Sepp Hochreiter"
    url: https://en.wikipedia.org/wiki/Sepp_Hochreiter
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: hochreiter1991
    title: "Untersuchungen zu dynamischen neuronalen Netzen (diploma thesis)"
    url: https://people.idsia.ch/~juergen/SeppHochreiter1991ThesisAdvisorSchmidhuber.pdf
    author: Sepp Hochreiter
    publisher: Technische Universität München
    year: 1991
  - id: lstm1997
    title: "Long Short-Term Memory"
    url: https://doi.org/10.1162/neco.1997.9.8.1735
    author: Hochreiter & Schmidhuber
    publisher: Neural Computation (MIT Press)
    year: 1997
  - id: nxai-jku
    title: "AI Made in Europe: Sepp Hochreiter and his xLSTM"
    url: https://www.jku.at/en/news-events/news/detail/news/ai-made-in-europe-spitzenforscher-sepp-hochreiter-und-sein-xlstm-erhalten-unternehmerische-verstaerkung-fuer-europaeisches-large-language-model/
    author: JKU Linz
    publisher: Johannes Kepler University Linz
    year: 2024
  - id: xlstm-repo
    title: "NX-AI/xlstm — Official repository of the xLSTM (GitHub)"
    url: https://github.com/NX-AI/xlstm
    author: NXAI
    publisher: GitHub
    year: 2024
---

# Sepp Hochreiter

**Sepp Hochreiter** (born 1967) is a German computer scientist best known as a co-inventor
of the **[[LSTM]]** network — the architecture that dominated sequence modeling before the
[[Transformer]] — and for first identifying the problem it was built to solve. He leads the
Institute for Machine Learning at Johannes Kepler University (JKU) in Linz, Austria, and
more recently has become a prominent advocate for "AI made in Europe."

## Vanishing gradients and LSTM

Hochreiter's foundational contribution came early. His **1991 diploma thesis** in Munich
gave the first clear analysis of why deep and recurrent neural networks struggle to learn
across long spans — the **vanishing- and exploding-gradient problem**, in which the training
signal decays or blows up over many steps.[^hochreiter1991] That diagnosis motivated the
solution he and his advisor **[[Jürgen Schmidhuber]]** published in 1997: **Long Short-Term
Memory**, a recurrent network with gated memory cells that can hold information over long
sequences.[^lstm1997] LSTM went on to power speech recognition and machine translation for
the better part of two decades, until [[Attention|attention]]-based models took over; in
2021 Hochreiter received the **IEEE CIS Neural Networks Pioneer Prize** for the
work.[^hochreiter-wiki] (Questions of credit for early deep-learning ideas are taken up in
the [[Jürgen Schmidhuber]] entry.)

## Since

Hochreiter has led JKU Linz's **Institute for Machine Learning since 2018**, and also heads
its LIT AI Lab.[^hochreiter-wiki] In **December 2023** he co-founded **NXAI**, a Linz-based
AI startup, and the following year unveiled **xLSTM** ("Extended LSTM") — a modernized
version of his original architecture, pitched as a more efficient, European alternative to
the [[Transformer]]-based large language models that dominate the field.[^nxai-jku][^xlstm-repo]
It is, in effect, an attempt to carry the idea he began in 1991 into the era of large-scale
generative AI.
