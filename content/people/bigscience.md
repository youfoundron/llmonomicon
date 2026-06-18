---
title: BigScience
description: The year-long open research collaboration (2021–2022) of more than a thousand scientists that built the open-access BLOOM model on a public supercomputer — and showed frontier models could be made as transparent public science.
technicality: non-technical
tags: [organization, open-weights]
aliases: [BigScience Workshop, BigScience Research Workshop]
updated: 2026-06-18
sources:
  - id: bloom2022
    title: "BLOOM: A 176B-Parameter Open-Access Multilingual Language Model"
    url: https://arxiv.org/abs/2211.05100
    author: BigScience Workshop (Scao, Fan, et al.)
    publisher: arXiv
    year: 2022
  - id: bigscience-hf
    title: "BigScience Workshop"
    url: https://huggingface.co/bigscience
    publisher: Hugging Face
    year: 2022
  - id: cnrs-bloom
    title: "Release of the largest trained open-science multilingual language model ever"
    url: https://www.cnrs.fr/en/press/release-largest-trained-open-science-multilingual-language-model-ever
    publisher: CNRS
    year: 2022
  - id: openrail
    title: "The BigScience OpenRAIL-M License"
    url: https://www.licenses.ai/blog/2022/8/26/bigscience-open-rail-m-license
    publisher: Responsible AI Licenses (RAIL)
    year: 2022
---

# BigScience

**BigScience** was a year-long open research collaboration (2021–2022) that built a frontier
language model in the open — by a large international team, on **public** infrastructure.
Convened on [[Hugging Face]], it gathered "more than 1000 researchers" around the world and
produced the open-access [[BLOOM]] model, a deliberate counterexample to the closed, corporate
way large models were usually made.[^bigscience-hf][^cnrs-bloom]

## An open collaboration

Billed as "a one-year long research workshop on large language models," BigScience took "an
approach of open, participatory science involving a thousand researchers."[^bigscience-hf][^cnrs-bloom]
Its flagship model, [[BLOOM]], was trained not on a company's private cluster but on **Jean
Zay** — one of Europe's most powerful supercomputers — through a grant from the French state via
GENCI and the CNRS computing center IDRIS.[^cnrs-bloom] The work was run in public: as CNRS put
it, BLOOM was "the largest multilingual language model to be trained 100% openly and
transparently," with "its architecture, catalogue of data used, and training log all publicly
available."[^cnrs-bloom]

## What it produced

BigScience's headline output was **[[BLOOM]]**, "a 176B-parameter open-access" multilingual
model trained on a corpus spanning "46 natural and 13 programming languages"[^bloom2022] — the
model itself is covered in its own entry. Nearly as influential was a **licensing** idea: the
project released its work under **OpenRAIL-M**, one of the **Open Responsible AI Licenses** —
"licenses designed to permit free and open access, re-use, and downstream distribution of
derivatives of AI artifacts as long as the behavioral-use restrictions always apply."[^openrail]
That behavioral-use approach offered a middle path between fully open and fully restricted, and
fed into how later [[Model licensing|model licenses]] were written.

## Why it matters

BigScience showed a different way to build a large model — **open, collaborative, and publicly
funded** — at a moment when the frontier was otherwise the preserve of a few well-resourced
companies.[^cnrs-bloom] Alongside the [[Open weights]] movement, it stands as the clearest
institutional argument that frontier-scale models could be produced as transparent public
science rather than corporate black boxes.
