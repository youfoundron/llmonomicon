---
title: Reasoning models
description: Models trained to "think" at length before answering—spending more compute per query as a new scaling axis, distinct from making the model bigger.
technicality: technical
tags: [reasoning, inference, scaling, reinforcement-learning]
group: inference
aliases: [Reasoning models (test-time compute), Test-time compute, Inference-time scaling, Reasoning model]
updated: 2026-06-17
sources:
  - id: snell2024
    title: "Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters"
    url: https://arxiv.org/abs/2408.03314
    author: Snell, Lee, Xu & Kumar
    publisher: arXiv
    year: 2024
  - id: deepseekr1
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
    url: https://arxiv.org/abs/2501.12948
    author: DeepSeek-AI
    publisher: arXiv
    year: 2025
  - id: openai-o1
    title: "Introducing OpenAI o1-preview"
    url: https://openai.com/index/introducing-openai-o1-preview/
    author: OpenAI
    publisher: OpenAI
    year: 2024
---

# Reasoning models

**Reasoning models** are LLMs trained to spend extra computation *thinking* before
they answer — generating a long internal
[[Chain-of-thought prompting|chain of thought]], checking their own work, and only
then producing a final response. They
introduced a new axis for improving performance: instead of (or in addition to)
making the model bigger, you let it **work longer on each query**. This is usually
called scaling **test-time compute** (or inference-time compute).

## A new scaling axis

For years the way to make models better was to scale *training* — more parameters,
more data, a process the [[Scaling laws]] made predictable. Reasoning models added a second lever. Snell and colleagues showed that,
spent well, inference compute can substitute for size: on problems a smaller model
can already make some headway on, optimally-allocated test-time compute "can be used
to outperform a 14x larger model."[^snell2024] The catch is that the best way to
spend it "critically varies depending on the difficulty of the prompt," so the
compute is best allocated adaptively, per question.[^snell2024]

## From prompted to trained reasoning

The behavior itself is not new — it is what [[Chain-of-thought prompting]] coaxed
out of ordinary models with a prompt. What changed is that the long reasoning is now
**trained into** the model and scaled deliberately at inference. OpenAI's **o1**,
[[OpenAI o1 released|released in September 2024]], opened the public "reasoning model" category — a model
that produces an extended internal reasoning process before answering.[^openai-o1]

The mechanism became fully visible with **DeepSeek-R1** (January 2025), released
openly alongside a paper describing how it works. Its central finding is that
reasoning can be taught largely through **reinforcement learning** rather than
supervised imitation: "the reasoning abilities of LLMs can be incentivized through
pure reinforcement learning (RL), obviating the need for human-labeled reasoning
trajectories."[^deepseekr1] That training drove "the emergent development of advanced
reasoning patterns, such as self-reflection, verification, and dynamic strategy
adaptation."[^deepseekr1] A recurring ingredient is rewarding the model on problems
whose answers can be checked automatically — math and code.[^deepseekr1]

## The trade-off

Test-time compute is not free. "Thinking longer" can mean generating thousands of
reasoning tokens per query, which translates into real **latency and cost**. The
payoff appears on genuinely hard problems; on easy ones the extra compute is largely
wasted.[^snell2024] Reasoning models therefore stand out on demanding
benchmarks — competition math, code, and graduate-level questions such as
[[GPQA]] — where careful step-by-step work earns its keep.
