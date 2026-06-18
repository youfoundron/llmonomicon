---
title: BLOOM
description: The 176-billion-parameter open-access multilingual model from the open BigScience collaboration (2022) — a GPT-3-scale model built in the open under a responsible-use license.
technicality: technical
tags: [model, open-access, multilingual, bigscience]
aliases: [BigScience BLOOM]
updated: 2026-06-18
sources:
  - id: lescao2022
    title: "BLOOM: A 176B-Parameter Open-Access Multilingual Language Model"
    url: https://arxiv.org/abs/2211.05100
    author: BigScience Workshop (Le Scao et al.)
    publisher: arXiv
    year: 2022
---

# BLOOM

**BLOOM** is a 176-billion-parameter, open-access, multilingual language model
released in 2022 by the BigScience Workshop — a collaboration of hundreds of
researchers. At GPT-3 scale but built entirely in the open, it proved that a
frontier-class model could come from a public scientific collaboration rather than
only a corporate lab.[^lescao2022]

## What it was

BLOOM was, in the words of its paper, a "176B-parameter open-access multilingual
language model ... designed and built thanks to a collaboration of hundreds of
researchers."[^lescao2022] Its multilingual scope was a deliberate counterpoint to
the English-centric frontier models of the time: it was trained on **46 natural
languages and 13 programming languages**.[^lescao2022] Architecturally it is a
[[GPT-3|GPT]]-style decoder, and it uses [[ALiBi]] positional embeddings, which
the team found "led to smoother training and better downstream
performance."[^lescao2022]

## The responsible-release story

BLOOM was notable not just for being open but for *how* it was opened. It was
publicly released under the **Responsible AI License (RAIL)** — specifically the
BigScience **OpenRAIL-M** variant — which makes the model freely downloadable
while attaching **behavioral-use restrictions** that prohibit certain harmful
uses.[^lescao2022] That places it at a distinct point on the spectrum of
[[Open weights|open access]]: not an unrestricted open-source license, but not
research-only or API-gated either — a deliberately *responsible* middle path. The
approach is treated in more depth under [[Model licensing]].

## Significance

BLOOM was the flagship of [[BigScience]], a year-long open research effort hosted
by [[Hugging Face]], and was trained transparently on public research
supercomputing. Alongside efforts like [[EleutherAI]], it showed that large open
models could be produced by the scientific community in the open — a milestone in
the open-model story in the months before [[LLaMA]] catalyzed the wider
open-weights wave.[^lescao2022]
