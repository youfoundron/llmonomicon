---
title: NVIDIA
description: The American GPU company whose chips and CUDA software became the hardware backbone of modern AI — and, on that demand, briefly the world's most valuable company.
technicality: non-technical
tags: [organization, hardware, gpu, infrastructure]
aliases: [Nvidia, NVIDIA Corporation]
updated: 2026-06-23
sources:
  - id: nvidia-wiki
    title: "Nvidia"
    url: https://en.wikipedia.org/wiki/Nvidia
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: cuda-wiki
    title: "CUDA"
    url: https://en.wikipedia.org/wiki/CUDA
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: nvidia-5t
    title: "Nvidia becomes first company to reach $5 trillion valuation, fueled by AI boom"
    url: https://www.cnbc.com/2025/10/29/nvidia-on-track-to-hit-historic-5-trillion-valuation-amid-ai-rally.html
    author: CNBC
    publisher: CNBC
    year: 2025
  - id: nvidia-rubin
    title: "NVIDIA Vera Rubin platform"
    url: https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform
    author: NVIDIA
    publisher: NVIDIA Newsroom
    year: 2026
---

# NVIDIA

**NVIDIA** is the American chip company whose **graphics processing units (GPUs)** have
become the hardware backbone of modern artificial intelligence. Essentially every large
language model is trained and served on NVIDIA accelerators, and the company's dominance
of that market made it, for a stretch of the mid-2020s, the most valuable company in the
world. The technical details of the chips live in [[Hardware for LLMs]]; this entry is
about the organization.

## Origins

NVIDIA was founded on **April 5, 1993** by **[[Jensen Huang]]** — still its chairman and
CEO — together with Chris Malachowsky and Curtis Priem, reportedly hashed out over coffee
at a Denny's diner in San Jose.[^nvidia-wiki] It built its name selling GPUs for video
games, then discovered that the same hardware — designed to do many simple calculations
in parallel — was extraordinarily well suited to training neural networks.

## The CUDA moat

NVIDIA's real advantage is not just the chips but the software that runs on them.
**[[CUDA]]**, the parallel-computing platform it first released in 2007, lets developers
program its GPUs for general-purpose computation, and over nearly two decades it has
grown into a deep, mature ecosystem that competitors have struggled to displace.[^cuda-wiki]
The pairing proved decisive for deep learning: the [[AlexNet wins ImageNet|AlexNet]]
breakthrough of 2012 was a GPU result, and the [[Transformer]] era scaled on NVIDIA
data-center parts. Much of the LLM tooling in this wiki — [[TensorRT-LLM]],
[[FlashAttention]], [[vLLM]] — is built to run on NVIDIA hardware and CUDA.

## Data-center GPUs

NVIDIA's AI accelerators have advanced through several generations: the A100, then the
**H100** that became the workhorse of the post-ChatGPT boom (and whose cut-down "H800"
variant was sold into China), the **Blackwell** generation, and the **Vera Rubin**
platform unveiled in **2026.**[^nvidia-rubin]

## The AI boom — and its frictions

Demand for those chips, supercharged after the [[ChatGPT launch|launch of ChatGPT]], drove
an extraordinary run: on **October 29, 2025**, NVIDIA became the **first company in history
to reach a $5 trillion market capitalization**, having already become the world's most
valuable company in 2024.[^nvidia-5t][^nvidia-wiki] That dominance also draws scrutiny: US
export controls on advanced AI chips to China have repeatedly reshaped NVIDIA's
China-specific products, such as the H800 and H20 parts.[^nvidia-wiki]
