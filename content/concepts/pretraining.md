---
title: Pretraining
description: The first and largest phase of training a language model — learning general patterns from a huge unlabeled corpus via a self-supervised objective, before any task-specific adaptation.
tags: [training]
group: training
technicality: technical
aliases: [Pre-training, Pretrain, Self-supervised pretraining, Pretrained model, Pre-trained model]
updated: 2026-06-23
sources:
  - id: gpt1
    title: "Improving Language Understanding by Generative Pre-Training"
    url: https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf
    author: Radford, Narasimhan, Salimans & Sutskever
    publisher: OpenAI (technical report)
    year: 2018
  - id: bert2018
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    url: https://arxiv.org/abs/1810.04805
    author: Devlin, Chang, Lee & Toutanova
    publisher: NAACL / arXiv
    year: 2018
  - id: gpt3
    title: "Language Models are Few-Shot Learners"
    url: https://arxiv.org/abs/2005.14165
    author: Brown et al.
    publisher: NeurIPS / arXiv
    year: 2020
  - id: hinton2006
    title: "A Fast Learning Algorithm for Deep Belief Nets"
    url: https://doi.org/10.1162/neco.2006.18.7.1527
    author: Hinton, Osindero & Teh
    publisher: Neural Computation (MIT Press)
    year: 2006
  - id: word2vec
    title: "Efficient Estimation of Word Representations in Vector Space"
    url: https://arxiv.org/abs/1301.3781
    author: Mikolov, Chen, Corrado & Dean
    publisher: arXiv (ICLR Workshop)
    year: 2013
  - id: elmo
    title: "Deep contextualized word representations"
    url: https://arxiv.org/abs/1802.05365
    author: Peters et al.
    publisher: NAACL / arXiv
    year: 2018
  - id: schmidhuber1991
    title: "AI Blog: roots of the AI boom in Munich 1991"
    url: https://people.idsia.ch/~juergen/ai-boom-roots-munich-1991.html
    author: Jürgen Schmidhuber
    publisher: IDSIA
    year: 2021
---

# Pretraining

**Pretraining** is the first and largest phase of building a modern language
model: before it is adapted to any specific task, the model learns general
patterns of language from an enormous body of text. It is the step that made
today's large language models possible — the "Pre-trained" in
[[GPT-2|Generative Pre-trained Transformer]] — and nearly every entry here that
says a model was "trained on a large corpus" is describing pretraining.

## The objective: learning from unlabeled text

What makes pretraining scalable is that it needs no hand-labeled examples. The
training signal comes from the text itself, an approach called **self-supervised
learning**: part of the input is hidden and the model is asked to predict it, so
every passage in the corpus becomes its own labeled example. Two objectives
dominate. The **autoregressive** objective, used by the [[GPT-2|GPT]] line,
predicts the next [[Tokenization|token]] given everything before it. The
**masked-token** objective, introduced by [[BERT]], hides scattered tokens and
predicts them from both sides at once — BERT was built to "pre-train deep
bidirectional representations from unlabeled text by jointly conditioning on both
left and right context in all layers."[^bert2018] Either way, the model is pushed
to absorb grammar, facts, and associations as a side effect of getting the
prediction right. How well it does is measured by [[Perplexity]], which scores
exactly this kind of next-token prediction.

## The "P" in GPT

The label entered the field with [[GPT-2|GPT]]'s direct ancestor: Radford and
colleagues' 2018 report *Improving Language Understanding by Generative
Pre-Training*, which gave the [[Transformer]]-based recipe — pretrain on a large
text corpus, then adapt — its name.[^gpt1] The "P" in GPT is, literally,
"Pre-trained."

## Why it matters

Pretraining is the regime in which scale pays off, in the predictable way the
[[Scaling laws]] describe. As models and their pretraining
corpora grew, broad capabilities began to emerge that were never trained for
directly — most strikingly [[In-context learning|few-shot learning]], the ability
to perform a new task from a handful of examples shown in the prompt, demonstrated
at scale by [[GPT-3]].[^gpt3] One expensive pretraining run yields a
general-purpose base model that many downstream applications can then build on,
which is why so much of this corpus traces back to a single idea.

## A short lineage

The intuition that an unsupervised "pre-training" step helps deep networks learn
goes back at least to 2006, when Hinton, Osindero, and Teh used layer-by-layer
unsupervised pretraining to train deep belief networks.[^hinton2006] In text, the
modern lineage runs through ever-richer learned representations: static word
[[Embeddings]] from word2vec (2013),[^word2vec] then *contextual* representations
from ELMo (2018), a language model "pre-trained on a large text
corpus,"[^elmo] and then the [[Transformer]]-based [[BERT]] and [[GPT-2|GPT]]
families that made large-scale pretraining the default. As an aside,
[[Jürgen Schmidhuber]] argues that his 1991 hierarchical "history-compression"
networks were an early form of self-supervised pretraining — a priority claim
worth noting, though not the settled origin story.[^schmidhuber1991]

## What comes after

Pretraining only produces a base model that continues text; turning it into a
useful assistant takes a second stage of adaptation — [[Fine-tuning]] and
instruction tuning on narrower data, plus alignment methods such as [[RLHF]] or
[[Constitutional AI]]. Those steps are comparatively cheap. The heavy lifting,
and most of the model's knowledge, comes from pretraining.
