---
title: MATH (Hendrycks)
description: A benchmark of 12,500 competition math problems, each with a worked solution—far harder than grade-school GSM8K and a key tracker of reasoning progress.
technicality: technical
tags: [benchmark, evaluation, reasoning, math]
aliases: [MATH, MATH dataset, Hendrycks MATH]
updated: 2026-06-18
sources:
  - id: hendrycks2021
    title: "Measuring Mathematical Problem Solving with the MATH Dataset"
    url: https://arxiv.org/abs/2103.03874
    author: Hendrycks et al.
    publisher: arXiv
    year: 2021
---

# MATH (Hendrycks)

**MATH** is the standard *hard*-math benchmark of the LLM era. Introduced by Hendrycks
and colleagues in 2021, it is a set of **12,500 challenging competition mathematics
problems** — the kind found in high-school competitions like the AMC and AIME, ranging
from algebra to number theory.[^hendrycks2021] Each problem comes with a **full
step-by-step solution**, which the authors note "can be used to teach models to
generate answer derivations and explanations."[^hendrycks2021] It is far harder than
the grade-school [[GSM8K]]: where GSM8K tests basic multi-step arithmetic, MATH demands
genuine mathematical problem-solving.

## Why it mattered

At release, MATH laid bare how poorly models handled real mathematics: even the largest
models scored only a few percent, and the authors cautioned that "scaling is not
currently solving MATH" and that "we will likely need new algorithmic advancements from
the broader research community."[^hendrycks2021] That proved prescient about *how* the
gap would be closed — not by scale alone, but by [[Reasoning models|reasoning models]]
that spend extra computation working through a problem. As those arrived, MATH (and the
AMC/AIME competitions it draws from) became a primary yardstick for the leap in
mathematical reasoning. It now sits near saturation at the frontier, alongside harder
successors like [[GPQA]].

The same paper also released **AMPS** (Auxiliary Mathematics Problems and Solutions), a
large mathematics pretraining corpus drawn from Khan Academy and Mathematica, meant to
improve models' mathematical ability.[^hendrycks2021]
