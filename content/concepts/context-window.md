---
title: Context window
description: The maximum span of tokens a model can attend to at once — prompt plus output — and why it's bounded, how it grew to a million tokens, and why bigger isn't always better.
technicality: somewhat-technical
tags: [context, tokens, attention, limits]
group: inference
aliases: [Context length, Context size, Maximum context length]
updated: 2026-06-17
sources:
  - id: vaswani2017
    title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: Vaswani et al.
    publisher: arXiv
    year: 2017
  - id: liu2023
    title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: https://arxiv.org/abs/2307.03172
    author: Liu et al.
    publisher: arXiv
    year: 2023
  - id: devlin2018
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    url: https://arxiv.org/abs/1810.04805
    author: Devlin et al.
    publisher: arXiv
    year: 2018
  - id: radford2019
    title: "Language Models are Unsupervised Multitask Learners"
    url: https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf
    author: Radford et al.
    publisher: OpenAI
    year: 2019
  - id: brown2020
    title: "Language Models are Few-Shot Learners"
    url: https://arxiv.org/abs/2005.14165
    author: Brown et al.
    publisher: arXiv
    year: 2020
  - id: touvron2023
    title: "Llama 2: Open Foundation and Fine-Tuned Chat Models"
    url: https://arxiv.org/abs/2307.09288
    author: Touvron et al.
    publisher: arXiv
    year: 2023
  - id: gemini2024
    title: "Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context"
    url: https://arxiv.org/abs/2403.05530
    author: Gemini Team, Google
    publisher: arXiv
    year: 2024
  - id: su2021
    title: "RoFormer: Enhanced Transformer with Rotary Position Embedding"
    url: https://arxiv.org/abs/2104.09864
    author: Su et al.
    publisher: arXiv
    year: 2021
---

# Context window

A model's **context window** is the maximum amount of text it can consider at
once — its working memory. Everything in play at a given moment, both the prompt
you send *and* the output the model generates, has to fit inside it. The window
is measured in [[Tokenization|tokens]] rather than words or characters, and it is
a hard limit: exceed it and you get a "context length exceeded" error.

## What limits it

Why can't a model simply take unlimited text? Three forces bound the window:

- **Attention cost grows quadratically.** In a [[Transformer]], every token
  attends to every other token, so the compute of [[Attention|self-attention]]
  scales with the square of the sequence length — doubling the input roughly
  quadruples the work.[^vaswani2017]
- **The [[KV cache]] grows with length.** Generating text efficiently means
  caching the keys and values of every previous token, so a longer context
  consumes proportionally more memory — part of why methods like
  [[Grouped-query & multi-query attention]] exist to shrink that cache.
- **[[Positional encoding|Positional encodings]] have a range.** A model must know *where* each token
  sits. Early models used a fixed-size table of learned position embeddings —
  BERT's 512 and GPT-2's 1,024 are literally the sizes of those
  tables[^devlin2018][^radford2019] — and even formula-based schemes are only
  trained up to some length, beyond which the model has never learned to
  operate.[^vaswani2017]

## The trajectory

Context windows have grown by orders of magnitude in just a few years:

- **BERT** (2018) and **GPT-2** (2019) worked with 512 and 1,024 tokens
  respectively — a few paragraphs.[^devlin2018][^radford2019]
- **GPT-3** (2020) used 2,048; as its paper states, "all models use a context
  window of n_ctx = 2048 tokens."[^brown2020]
- **[[Llama 2]]** (2023) "doubled the context length" of its predecessor to 4,096
  tokens.[^touvron2023]
- By 2024, frontier models reached the hundreds of thousands of tokens, and
  **[[Gemini 1.5]]** pushed into the millions — its technical report reporting
  near-perfect retrieval "up to at least 10M tokens."[^gemini2024]

The arc runs roughly 512 → 1k → 2k → 4k → tens or hundreds of thousands → 1M+,
turning the window from a few paragraphs into entire books.

## Bigger isn't free

A larger window is not automatically better. It costs more compute, memory, and
latency to use,[^vaswani2017] and models do not use long contexts evenly. Liu et
al. found that "performance is often highest when relevant information occurs at
the beginning or end of the input context, and significantly degrades when models
must access relevant information in the middle" — a U-shaped pattern they named
being "lost in the middle."[^liu2023] A big window, in other words, is necessary
but not sufficient: what a model *can* hold and what it reliably *uses* are
different things.

## Extending the window

A family of techniques aims to stretch the usable window beyond the length a
model was trained on, mostly by rethinking positional encodings.
[[Rotary Position Embedding|Rotary position embeddings]] (RoPE) and methods that
interpolate or rescale them — such as [[YaRN]] — help a model generalize to
longer sequences,[^su2021] while [[Sliding-window attention]] and [[ALiBi]]
pursue the same goal by other means. These are pointers rather than the subject
here; each is its own topic.

The context window should not be confused with the [[Transformer]] architecture
that gives rise to it, the [[Tokenization]] that defines its units, or the
[[KV cache]] whose size it bounds.
