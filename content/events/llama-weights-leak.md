---
title: LLaMA weights leak
description: Meta's research-only LLaMA model weights leaked publicly, igniting the open-weight era.
date: 2023-03-03
related: [LLaMA]
updated: 2026-06-17
sources:
  - id: llama-wiki
    title: "Llama (language model) (Wikipedia)"
    url: "https://en.wikipedia.org/wiki/Llama_(language_model)"
    publisher: Wikipedia
    year: 2025
  - id: meta-blog
    title: "Introducing LLaMA: A foundational, 65-billion-parameter large language model"
    url: https://ai.meta.com/blog/large-language-model-llama-meta-ai/
    author: Meta AI
    publisher: Meta
    year: 2023
  - id: batch
    title: "How Meta's LLaMA NLP Model Leaked"
    url: https://www.deeplearning.ai/the-batch/how-metas-llama-nlp-model-leaked/
    author: The Batch
    publisher: DeepLearning.AI
    year: 2023
---

# LLaMA weights leak

Meta released [[LLaMA]] to approved researchers under a non-commercial license on
24 February 2023.[^meta-blog] About a week later — on **3 March 2023** — the model
weights leaked: a BitTorrent link was posted to 4chan (and added to a pull request on
Meta's GitHub repository), making the full weights freely downloadable.[^llama-wiki]
Meta filed takedown requests days later, but the weights had already spread.[^batch]
The leak turned a research-only release into a *de facto* open-weights drop and
helped catalyze the local-LLM ecosystem around tools like [[llama.cpp]]; depth lives
in [[LLaMA]].
