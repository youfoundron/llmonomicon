---
title: Mixture of Experts
description: A sparse architecture where a learned router sends each token to a few of many expert sub-networks — huge total capacity, but only a fraction of the parameters active per token.
tags: [architecture, efficiency]
group: architecture
aliases: [MoE, Mixture-of-Experts, sparse mixture of experts]
updated: 2026-06-17
sources:
  - id: shazeer2017
    title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer"
    url: https://arxiv.org/abs/1701.06538
    author: Shazeer et al.
    publisher: arXiv
    year: 2017
  - id: fedus2021
    title: "Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity"
    url: https://arxiv.org/abs/2101.03961
    author: Fedus, Zoph & Shazeer
    publisher: arXiv
    year: 2021
  - id: jiang2024
    title: "Mixtral of Experts"
    url: https://arxiv.org/abs/2401.04088
    author: Jiang et al. (Mistral AI)
    publisher: arXiv
    year: 2024
---

# Mixture of Experts

**Mixture of Experts (MoE)** is an architecture that lets a model grow enormously
in size while keeping the cost of running it nearly flat. Instead of passing
every token through one large network, an MoE layer holds many smaller "expert"
sub-networks and a learned **router** that sends each token to only a few of
them. The model can therefore carry a huge total number of parameters while
activating just a small fraction for any given token.[^shazeer2017]

## How it works

In a standard [[Transformer]], every token flows through the same feed-forward
block. An MoE layer replaces that single block with a set of parallel experts —
each its own small feed-forward network — plus a **gating network** that scores
the experts for each token and routes it to the **top-k** highest-scoring ones
(often just one or two).[^shazeer2017] Only those experts do any work, so the
compute per token stays roughly constant however many experts the layer holds.
This is the idea of *conditional computation*: Shazeer et al., who introduced the
sparsely-gated MoE layer with "thousands of feed-forward sub-networks," reported
"greater than 1000x improvements in model capacity with only minor losses in
computational efficiency."[^shazeer2017]

The **Switch Transformer** later pushed this to its simplest form — routing each
token to a single expert — to build "a sparsely-activated model—with outrageous
numbers of parameters—but a constant computational cost," scaling to a trillion
parameters while pretraining several times faster than a comparable dense
model.[^fedus2021]

## The tradeoffs

Sparse activation is not free:

- **Memory.** Even though only a few experts fire per token, *all* of them must
  be stored and loaded into memory. An MoE model's footprint reflects its huge
  total parameter count, not its small active compute — one reason MoE models are
  frequent targets for [[Quantization]].[^fedus2021]
- **Load balancing.** Left alone, the router tends to favor a handful of experts
  and starve the rest. Training adds an auxiliary **load-balancing loss** to
  spread tokens more evenly across experts.[^fedus2021]
- **Training instability.** Sparse routing is prone to instability at scale; the
  Switch Transformer introduced fixes such as selective precision and smaller
  weight initialization to train large sparse models reliably in
  bfloat16.[^fedus2021]

## Landmark instances

- **Sparsely-gated MoE** (Shazeer et al., 2017) — the origin, inserting MoE
  layers between stacked LSTM layers.[^shazeer2017]
- **Switch Transformer** (Fedus, Zoph & Shazeer, 2021) — single-expert (top-1)
  routing at trillion-parameter scale.[^fedus2021]
- **[[Mixtral|Mixtral 8×7B]]** from [[Mistral AI]] (2024) — a modern decoder-only MoE with eight experts per
  layer and top-2 routing, totaling about 47B parameters but activating only
  ~13B per token, matching or beating much larger dense models.[^jiang2024]

## Why it matters

Mixture of Experts decouples a model's *capacity* from its *cost to run*, which
is why it underpins many of the largest and most capable frontier models: it
offers a path to more parameters — and the abilities that come with them —
without a proportional increase in compute per token.[^fedus2021] It is one of
the main architectural ideas, alongside [[Attention]], behind scaling
[[Transformer|Transformers]] efficiently.
