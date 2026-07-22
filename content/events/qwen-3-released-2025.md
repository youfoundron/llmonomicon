---
title: Qwen 3 released
description: Alibaba releases the Qwen3 family of open-weight models — six dense models and two Mixture-of-Experts models — with a hybrid mode that switches between step-by-step reasoning and fast direct answers.
tags: [model-release, open-weight]
technicality: somewhat-technical
date: 2025-04-29
related: [Qwen, Alibaba]
aliases: [Qwen3 launch]
sources:
  - id: qwenlm-blog
    title: "Qwen3: Think Deeper, Act Faster"
    url: https://qwenlm.github.io/blog/qwen3/
    author: Qwen Team
    publisher: QwenLM (Alibaba)
    year: 2025
  - id: wiki-qwen
    title: "Qwen"
    url: https://en.wikipedia.org/wiki/Qwen
    publisher: Wikipedia
    year: 2026
  - id: alibabacloud-qwen3
    title: "Alibaba Introduces Qwen3, Setting New Benchmark in Open-Source AI with Hybrid Reasoning"
    url: https://www.alibabacloud.com/en/press-room/alibaba-introduces-qwen3-setting-new-benchmark
    publisher: Alibaba Cloud
    year: 2025
---

# Qwen 3 released

On **29 April 2025**, [[Alibaba]] released [[Qwen|Qwen3]], a family of
open-weight language models: six dense models (0.6B, 1.7B, 4B, 8B, 14B, and
32B parameters) plus two Mixture-of-Experts models (30B total parameters with
3B active, and 235B total with 22B active) — "dense" meaning every parameter
is used on every request, versus a Mixture-of-Experts model that only
activates a subset per token.[^qwenlm-blog][^wiki-qwen] Qwen3 introduced a
hybrid reasoning mode that lets a single model switch between a slower
"thinking mode" for harder problems and a faster "non-thinking mode" for
quick replies, toggled with controls like `/think` and
`/no_think`.[^qwenlm-blog][^wiki-qwen] The models were released under the
Apache 2.0 license.[^qwenlm-blog][^alibabacloud-qwen3]
