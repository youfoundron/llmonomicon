---
title: Constitutional AI
description: Anthropic's alignment method that trains a model to be harmless using AI-generated feedback judged against a written list of principles—a "constitution"—instead of human labels.
technicality: technical
tags: [alignment, method]
group: safety
aliases: [CAI, RLAIF, RL from AI Feedback]
updated: 2026-06-17
sources:
  - id: bai2022
    title: "Constitutional AI: Harmlessness from AI Feedback"
    url: https://arxiv.org/abs/2212.08073
    author: "Bai et al. (Anthropic)"
    publisher: arXiv
    year: 2022
  - id: anthropic-cai
    title: "Constitutional AI: Harmlessness from AI Feedback"
    url: https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback
    author: Anthropic
    publisher: Anthropic
    year: 2022
  - id: anthropic-constitution
    title: "Claude's Constitution"
    url: https://www.anthropic.com/news/claudes-constitution
    author: Anthropic
    publisher: Anthropic
    year: 2023
---

# Constitutional AI

**Constitutional AI** (CAI) is [[Anthropic]]'s method for training a language model
to be **harmless** by having it police itself against a written list of
principles — a "constitution" — instead of relying on people to label harmful
outputs. As the paper that introduced it puts it, "the only human oversight is
provided through a list of rules or principles, and so we refer to the method as
'Constitutional AI'."[^bai2022] It is the alignment method behind
[[Claude]].[^anthropic-constitution]

The motivation is **scalable oversight**. Having humans flag every toxic or
dangerous response is slow, costly, and unpleasant work; CAI instead trains "a
harmless AI assistant through self-improvement, without any human labels
identifying harmful outputs."[^bai2022] It is worth being precise about what that
does and doesn't remove: humans still *write* the constitution and still give
feedback on how *helpful* the model is — it is specifically the *harmlessness*
labeling that is delegated to the AI.[^bai2022]

## Two phases

CAI works in two stages:

1. **Supervised critique-and-revision.** The model is shown its own responses and
   asked to critique them against the constitutional principles and rewrite them to
   comply; it is then fine-tuned on those revised, improved
   answers.[^bai2022][^anthropic-cai]
2. **Reinforcement learning from AI feedback (RLAIF).** A model compares pairs of
   responses and picks the better one according to the principles, producing a
   dataset of *AI-generated* preferences. That data trains a preference model,
   which the assistant is then optimized against with reinforcement
   learning.[^bai2022]

## Relation to RLHF

This second phase deliberately mirrors **[[RLHF]]** (reinforcement learning from
human feedback) — the standard alignment recipe of training a preference model and
then optimizing a model against it — but substitutes AI-generated preferences for
human ones. As Anthropic describes the process, it uses "a model to evaluate which
of the two samples is better, and then train[s] a preference model from this
dataset of AI preferences."[^anthropic-cai] That substitution — AI feedback in
place of human feedback — is what gives the phase its name, **RLAIF**.

## The constitution

The "constitution" itself is just a short, human-readable list of principles the
model judges its answers by — for example, to "choose the assistant response that
is as harmless and ethical as possible" and to avoid being "toxic, racist, or
sexist," while also not being "too preachy, obnoxious or
overly-reactive."[^anthropic-constitution] Anthropic has said it drew these
principles from sources including the UN Declaration of Human Rights, DeepMind's
Sparrow rules, and even Apple's terms of service.[^anthropic-constitution]
