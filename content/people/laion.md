---
title: LAION
description: A German nonprofit that publishes open, web-scraped image–text datasets — the data behind Stable Diffusion and OpenCLIP, and the center of a landmark dataset-safety episode.
technicality: non-technical
tags: [organization, lab, nonprofit]
aliases: [Large-scale Artificial Intelligence Open Network, LAION-5B, LAION-400M, Re-LAION-5B]
updated: 2026-06-23
sources:
  - id: laion-wiki
    title: "LAION"
    url: https://en.wikipedia.org/wiki/LAION
    author: Wikipedia contributors
    publisher: Wikipedia
    year: 2026
  - id: laion5b
    title: "LAION-5B: An open large-scale dataset for training next generation image-text models"
    url: https://arxiv.org/abs/2210.08402
    author: Schuhmann et al.
    publisher: NeurIPS / arXiv
    year: 2022
  - id: relaion
    title: "Releasing Re-LAION-5B: transparent iteration on LAION-5B with additional safety fixes"
    url: https://laion.ai/blog/relaion-5b/
    author: LAION
    publisher: LAION
    year: 2024
  - id: relaion-tc
    title: "The org behind the dataset used to train Stable Diffusion claims it has removed CSAM"
    url: https://techcrunch.com/2024/08/30/the-org-behind-the-data-set-used-to-train-stable-diffusion-claims-it-has-removed-csam/
    author: TechCrunch
    publisher: TechCrunch
    year: 2024
---

# LAION

**LAION** (Large-scale Artificial Intelligence Open Network) is a German nonprofit — founded by
Christoph Schuhmann and collaborators — that publishes **open, web-scraped image–text
datasets**. Its data is the often-invisible backbone of open image generation: the
[[Stable Diffusion]] models and OpenCLIP (the open reimplementation of [[CLIP]]) were both
trained on it. LAION is, in effect, the open-**data** counterpart to the open-**model** and
open-**code** organizations the field is built on.

## The datasets

LAION's first major release, **LAION-400M** (August 2021), gathered 400 million image-caption
pairs from Common Crawl web data, explicitly to let the open community replicate OpenAI's
[[CLIP]].[^laion-wiki] It was followed by **LAION-5B** (2022), with roughly **5.85 billion**
image–text pairs — at the time the largest such open dataset — funded in part by
[[Hugging Face]] and [[Stability AI]].[^laion5b][^laion-wiki] That data trained
[[Stable Diffusion]] and OpenCLIP, making LAION's work the image-text analogue of the open text
corpora associated with groups like [[EleutherAI]].

## Data safety and Re-LAION-5B

LAION is also central to a landmark episode in training-data safety. In **December 2023**, the
Stanford Internet Observatory reported finding **3,226 suspected links to child sexual abuse
material** in LAION-5B (1,008 of them externally validated); LAION responded by **temporarily
removing** its datasets, citing a zero-tolerance policy for illegal content.[^laion-wiki] On
**30 August 2024**, it released **Re-LAION-5B**, a cleaned version produced with the Internet
Watch Foundation, the Canadian Centre for Child Protection, and Stanford, from which **2,236
flagged links were removed**; it ships in standard "research" and stricter "research-safe"
variants.[^relaion][^relaion-tc] The episode became a reference point in debates over the
legality and safety of large, web-scraped training sets.
