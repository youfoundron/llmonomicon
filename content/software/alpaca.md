---
title: Alpaca
description: Stanford's 2023 proof-of-concept that fine-tuned Meta's LLaMA into an instruction-following assistant for under $600—sparking a wave of cheap open fine-tunes.
technicality: technical
tags: [model, instruction-tuning]
aliases: [Stanford Alpaca]
updated: 2026-06-18
sources:
  - id: crfm
    title: "Alpaca: A Strong, Replicable Instruction-Following Model"
    url: https://crfm.stanford.edu/2023/03/13/alpaca.html
    author: Taori et al. (Stanford CRFM)
    publisher: Stanford CRFM
    year: 2023
  - id: selfinstruct
    title: "Self-Instruct: Aligning Language Models with Self-Generated Instructions"
    url: https://arxiv.org/abs/2212.10560
    author: Wang et al.
    publisher: "arXiv (ACL 2023)"
    year: 2022
---

# Alpaca

**Alpaca** was a small research model from Stanford that, in March 2023, made a big
point: an open base model could be turned into a usable, ChatGPT-style assistant
quickly and cheaply. It took Meta's [[LLaMA]] 7B and fine-tuned it on "52K
instruction-following demonstrations" so that it would follow instructions like a chat
assistant.[^crfm]

## The cheap recipe

What made Alpaca a landmark was its cost. The Stanford team generated its training data
by prompting OpenAI's text-davinci-003 (a [[GPT-3|GPT-3.5]] model) in the style of
**Self-Instruct** — a technique that bootstraps instruction data from a model's own
outputs, generating instruction/input/output samples and "filter[ing] invalid or
similar ones before using them to finetune the original model."[^selfinstruct] That
data cost "less than $500," and the fine-tuning run itself "less than $100" — under
$600 in total to produce a credible instruction-follower.[^crfm]

That demonstration — [[Open weights|open base weights]] plus cheap instruction
tuning — set off a wave of open fine-tuned derivatives (Vicuna, Dolly, and many more)
in the months after the [[LLaMA weights leak]].

## "Open recipe," not "open model"

It is worth being precise about what was open. Stanford released the *recipe* — the
data-generation method and the training code — but the Alpaca **model itself was
strictly research-only**: "only for academic research and any commercial use is
prohibited."[^crfm] That restriction stacked three ways: LLaMA's own non-commercial
license, OpenAI's terms forbidding the use of its outputs to build competing models,
and the model's own safety limitations ("not ready to be deployed for general
use").[^crfm] The public demo was later taken down. The episode also surfaced a
question that recurs throughout open fine-tuning: whether training on another model's
outputs is permitted by that model's terms of service.
