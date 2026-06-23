---
title: Knowledge distillation
description: Training a small "student" model to imitate a larger "teacher" — a primary route to cheaper, faster, open-weight models, and a flashpoint when the teacher is someone else's closed model.
tags: [efficiency, training]
group: efficiency
technicality: technical
aliases: [Distillation, Model distillation]
updated: 2026-06-23
sources:
  - id: hinton2015
    title: "Distilling the Knowledge in a Neural Network"
    url: https://arxiv.org/abs/1503.02531
    author: Hinton, Vinyals & Dean
    publisher: arXiv (NIPS 2014 Deep Learning Workshop)
    year: 2015
  - id: deepseek-r1
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
    url: https://arxiv.org/abs/2501.12948
    author: DeepSeek-AI
    publisher: arXiv
    year: 2025
  - id: distill-license
    title: "The Innovation Dilemma: AI Distillation in OpenAI v. DeepSeek"
    url: https://sites.law.berkeley.edu/thenetwork/2025/03/30/the-innovation-dilemma-ai-distillation-in-openai-v-deepseek/
    author: Berkeley Law (The Network)
    publisher: UC Berkeley School of Law
    year: 2025
  - id: anthropic-distill
    title: "Anthropic accuses DeepSeek, Moonshot and MiniMax of distillation attacks on Claude"
    url: https://www.cnbc.com/2026/02/24/anthropic-openai-china-firms-distillation-deepseek.html
    author: CNBC
    publisher: CNBC
    year: 2026
  - id: schmidhuber-munich
    title: "AI Blog: roots of the AI boom in Munich 1991"
    url: https://people.idsia.ch/~juergen/ai-boom-roots-munich-1991.html
    author: Jürgen Schmidhuber
    publisher: IDSIA
    year: 2021
---

# Knowledge distillation

**Knowledge distillation** is a technique for packing a large model's capabilities into a
smaller, cheaper one. A compact **"student"** model is trained to imitate a larger
**"teacher,"** ending up far less expensive to run while keeping much of the teacher's
quality. It is one of the main tools — alongside [[Quantization]] and low-rank fine-tuning
([[LoRA]] / [[QLoRA]]) — for shrinking the cost of deploying models, though it works
differently from each: distillation trains a *new, smaller* model rather than compressing
or adapting an existing one.

## How it works

The key idea is that a teacher's output carries more information than a plain label. Rather
than training the student only on the single correct answer, distillation trains it on the
teacher's full **softened probability distribution** over possible answers — the teacher's
relative confidence across options, which reveals what it considers *almost* right. That
richer signal lets a small student learn more from each example than hard labels alone would
allow. The method was set out by [[Geoffrey Hinton]], [[Oriol Vinyals]], and [[Jeff Dean]]
in their 2015 paper "Distilling the Knowledge in a Neural Network."[^hinton2015]
([[Jürgen Schmidhuber]] argues, on his own pages, that a 1991 "history compressor" of his
was an early form of the idea — noted here for completeness.[^schmidhuber-munich])

## Why it matters for LLMs

Distillation is a primary route to small, fast, [[Open weights|open-weight]] models. A
prominent example is [[DeepSeek]]'s release of compact models that distilled the reasoning
ability of its [[DeepSeek-R1|R1]] model into smaller [[LLaMA|Llama]]- and Qwen-based
students.[^deepseek-r1] It is worth separating from its cost-cutting siblings:
[[Quantization]] lowers the numeric precision of an *existing* model's weights, and
[[LoRA]]/[[QLoRA]] cheaply *fine-tune* a model with small add-on layers — whereas
distillation trains a genuinely smaller model to mimic a bigger one.

## A licensing flashpoint

Distilling from a model you trained yourself is uncontroversial; distilling from another
company's **closed** model is not. The terms of service of OpenAI, Anthropic, Mistral, and
xAI prohibit using their models' outputs to build competing systems. In **January 2025**,
OpenAI said it had found evidence that [[DeepSeek]] distilled its models by extracting data
through its API, allegedly violating those terms.[^distill-license] The dispute widened
through 2026: in **February 2026**, [[Anthropic]] accused DeepSeek and other firms of
distillation attacks on [[Claude]].[^anthropic-distill] The accusations are contested and,
as of mid-2026, unresolved — and they tie distillation directly to [[Model licensing]]:
permissive licenses (MIT, Apache) allow distillation, while proprietary terms forbid it.
