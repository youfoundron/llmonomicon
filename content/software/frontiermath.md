---
title: FrontierMath
description: Epoch AI's benchmark of original, research-level mathematics problems — hard enough that frontier models solved under 2% at release — designed to resist contamination, and the subject of a disclosure controversy over OpenAI's funding and access.
technicality: technical
tags: [benchmark, reasoning]
aliases: [FrontierMath]
updated: 2026-06-23
sources:
  - id: glazer2024
    title: "FrontierMath: A Benchmark for Evaluating Advanced Mathematical Reasoning in AI"
    url: https://arxiv.org/abs/2411.04872
    author: Glazer et al. (Epoch AI)
    publisher: arXiv
    year: 2024
  - id: techcrunch-frontiermath
    title: "AI benchmarking organization criticized for waiting to disclose funding from OpenAI"
    url: https://techcrunch.com/2025/01/19/ai-benchmarking-organization-criticized-for-waiting-to-disclose-funding-from-openai/
    author: Kyle Wiggers
    publisher: TechCrunch
    year: 2025
  - id: epoch-scores
    title: "Less than 70% of FrontierMath is within reach for today's models"
    url: https://epoch.ai/gradient-updates/less-than-70-percent-of-frontiermath-is-within-reach-for-todays-models
    author: Epoch AI
    publisher: Epoch AI
    year: 2025
  - id: epoch-v2
    title: "FrontierMath Tier 4 (v2)"
    url: https://epoch.ai/benchmarks/frontiermath-tier-4-v2
    author: Epoch AI
    publisher: Epoch AI
    year: 2026
---

# FrontierMath

**FrontierMath** is a [[Benchmark (LLM evaluation)|benchmark]] of exceptionally hard, original
mathematics problems built by Epoch AI to push past the saturation of earlier math tests like
[[GSM8K]] and [[MATH]]. Where those drew on grade-school or competition problems, FrontierMath
poses **research-level** questions — and at release, the best AI models could solve almost none of
them.[^glazer2024]

## Research-level difficulty

The benchmark gathers "hundreds of original, exceptionally challenging mathematics problems crafted
and vetted by expert mathematicians," covering "most major branches of modern
mathematics."[^glazer2024] These are not quick puzzles: "solving a typical problem requires
multiple hours of effort from a researcher in the relevant branch of mathematics, and for the upper
end questions, multiple days."[^glazer2024] The headline result was stark — "current
state-of-the-art AI models solve under 2% of problems, revealing a vast gap between AI capabilities
and the prowess of the mathematical community."[^glazer2024]

That gap narrowed quickly as [[Reasoning models|reasoning models]] matured: by late 2025, Epoch AI
reported the best *single-run* score had reached 29%.[^epoch-scores] In June 2026 Epoch released a
corrected **v2** of the benchmark after an internal review found errors in a number of the original
problems.[^epoch-v2]

## Built to resist contamination

A recurring weakness of benchmarks is **contamination**: test questions leaking into training data,
so a high score reflects memorization rather than reasoning. FrontierMath was designed against this,
using "new, unpublished problems and automated verification to reliably evaluate models while
minimizing risk of data contamination."[^glazer2024] Keeping the problems secret and
machine-checkable is what lets the benchmark stay meaningful as models improve.

## Funding and access

That secrecy also became a point of controversy. As TechCrunch reported, **OpenAI funded
FrontierMath**, but Epoch AI disclosed the relationship only belatedly — on December 20, 2024,
around the launch of OpenAI's o3 model.[^techcrunch-frontiermath] Epoch's associate director and
co-founder, Tamay Besiroglu, acknowledged the lapse: "We were restricted from disclosing the
partnership until around the time o3 launched, and in hindsight we should have negotiated harder for
the ability to be transparent to the benchmark contributors as soon as possible."[^techcrunch-frontiermath]
Six contributing mathematicians said they had been unaware OpenAI would have access, and OpenAI's
"visibility into many of the problems and solutions" raised concerns about contamination and
conflicts of interest.[^techcrunch-frontiermath] Epoch said OpenAI had only a **verbal agreement**
not to train on the problem set; its lead mathematician, Elliot Glazer, said his own view was that
OpenAI's reported o3 score was legitimate — that the company had not trained on the data — but that
Epoch "can't vouch for them until our independent evaluation is complete."[^techcrunch-frontiermath]
