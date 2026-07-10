---
title: RLHF
description: The technique of turning a base language model into a helpful assistant by training a reward model on human preference comparisons and optimizing the policy against it with reinforcement learning.
tags: [alignment, method, reinforcement-learning]
group: training
technicality: technical
aliases: [Reinforcement Learning from Human Feedback]
updated: 2026-07-10
sources:
  - id: christiano2017
    title: "Deep Reinforcement Learning from Human Preferences"
    url: https://arxiv.org/abs/1706.03741
    author: Christiano, Leike, Brown, Martic, Legg & Amodei
    publisher: arXiv
    year: 2017
  - id: stiennon2020
    title: "Learning to Summarize from Human Feedback"
    url: https://arxiv.org/abs/2009.01325
    author: Stiennon et al.
    publisher: arXiv
    year: 2020
  - id: ouyang2022
    title: "Training Language Models to Follow Instructions with Human Feedback"
    url: https://arxiv.org/abs/2203.02155
    author: Ouyang et al. (OpenAI)
    publisher: arXiv
    year: 2022
  - id: rafailov2023
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"
    url: https://arxiv.org/abs/2305.18290
    author: Rafailov et al.
    publisher: arXiv
    year: 2023
  - id: gao2022
    title: "Scaling Laws for Reward Model Overoptimization"
    url: https://arxiv.org/abs/2210.10760
    author: Gao, Schulman & Hilton (OpenAI)
    publisher: arXiv
    year: 2022
  - id: sharma2023
    title: "Towards Understanding Sycophancy in Language Models"
    url: https://arxiv.org/abs/2310.13548
    author: Sharma et al. (Anthropic)
    publisher: arXiv
    year: 2023
  - id: openai-chatgpt
    title: "Introducing ChatGPT"
    url: https://openai.com/index/chatgpt/
    author: OpenAI
    publisher: OpenAI
    year: 2022
---

# RLHF

**RLHF** (reinforcement learning from human feedback) is the technique that
turns a raw [[Pretraining|pretrained]] language model — one that only
predicts the next word — into an assistant that follows instructions and
favors helpful, honest answers over merely plausible-sounding text. Rather
than hand-writing rules for a "good" response, RLHF learns them from people:
it trains a model to predict which of two candidate responses a human would
prefer, then steers the language model toward the outputs people actually
rate more highly.

## The three-step recipe

RLHF, as practiced, breaks into three stages:

1. **Collect preference comparisons.** Human labelers see pairs of model
   outputs for the same prompt and rank them by preference — no need to
   write an ideal answer, just to say which is better. Christiano and
   colleagues introduced this comparison-based approach as a general
   reinforcement-learning technique, showing an agent could learn a complex
   behavior from human feedback on less than one percent of its
   interactions, with no hand-coded reward function.[^christiano2017]
2. **Train a reward model.** Those comparisons train a separate model — the
   **reward model** — to predict which output a human would prefer,
   distilling an expensive set of human judgments into a fast, automatic
   stand-in for "how good is this response."
3. **Optimize the policy against the reward model with RL.** The model
   being trained — now called the **policy**, standard
   reinforcement-learning terminology for "the model being trained to act"
   — is fine-tuned, typically with **Proximal Policy Optimization
   ([[PPO]])**, to score highly under the reward model, usually with a
   penalty that keeps it from drifting too far from its starting behavior.

Stiennon and colleagues were first to run this full loop on language
generation, applying it to summarization: a reward model trained on human
comparisons, then a summarization policy optimized against it, produced
summaries people preferred over both the reference summaries and larger,
purely supervised models.[^stiennon2020]

## From InstructGPT to ChatGPT

[[OpenAI]] scaled the same recipe to general instruction-following with
**InstructGPT** (2022): Ouyang and colleagues — among them
[[John Schulman]] — fine-tuned [[GPT-3]] on human demonstrations, then
trained a reward model on comparisons and optimized against it with
RLHF.[^ouyang2022] Human evaluators preferred the outputs of the resulting
1.3-billion-parameter model over the 175-billion-parameter GPT-3 itself,
"despite having 100x fewer parameters," with measured gains in truthfulness
and less toxic output.[^ouyang2022]

That recipe — supervised warm-start, then reward-model training and RLHF —
became the template for [[ChatGPT launch|ChatGPT]], which OpenAI introduced
as a closely related model trained with similar methods.[^openai-chatgpt]
RLHF is, in large part, why chat-style assistants answer questions and
follow instructions instead of simply continuing whatever text they're
given.

## Relation to Constitutional AI

[[Constitutional AI]] deliberately reuses the back half of the RLHF recipe —
train a preference model on comparisons, then optimize the policy against it
with reinforcement learning — but replaces the human-comparison step with an
AI model judging which of two outputs better follows a written set of
principles. Anthropic calls that substitution **RLAIF** (RL from AI
feedback): the same machinery as RLHF, fed by a different — and far cheaper
to scale — source of preference labels.

## Known limitations

Because the reward model is only a learned stand-in for what people actually
want, pushing a policy to optimize against it too hard can go wrong in
specific, documented ways.

- **Reward hacking.** A policy can learn to score well on the reward model
  without genuinely improving — exploiting quirks in the proxy rather than
  producing outputs a human would rate higher. Gao, Schulman, and Hilton
  found that optimizing too hard against it "can hinder ground truth
  performance, in accordance with Goodhart's law": reward score and true,
  human-judged quality diverge past a point.[^gao2022]
- **Sycophancy.** Because human raters can themselves be swayed by a
  confident, agreeable-sounding answer, that bias can get trained into the
  model. Sharma and colleagues found "both humans and preference models
  (PMs) prefer convincingly-written sycophantic responses over correct ones
  a non-negligible fraction of the time," calling sycophancy "a general
  behavior of state-of-the-art AI assistants," driven partly by the human
  preference judgments RLHF relies on.[^sharma2023]

## What comes after RLHF

Training a reward model and then running RL against it is expensive and can
be finicky to tune. **Direct Preference Optimization (DPO)** re-derives the
same underlying objective as a closed-form loss computed directly on
preference pairs, removing the separate reward-model-training and
RL-sampling steps entirely. Rafailov and colleagues describe it as "a new
parameterization of the reward model in RLHF that enables extraction of the
corresponding optimal policy in closed form," reducing the problem to "a
simple classification loss."[^rafailov2023]

RLHF isn't the only way to train a model with reinforcement learning. Where
RLHF learns its reward from human preference comparisons,
[[Reasoning models]] are more often trained against automatically checkable
rewards — a math answer is right or wrong, code passes its tests or it
doesn't — with no learned preference model needed.
