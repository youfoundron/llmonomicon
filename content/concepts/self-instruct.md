---
title: Self-Instruct
description: "Bootstrapping instruction-tuning data from a model's own generations: seed it with a few tasks, have it write thousands more, filter, and fine-tune — the cheap-data recipe behind Alpaca and the open instruction-tuned wave."
tags: [training, instruction-tuning, synthetic-data]
group: training
technicality: technical
updated: 2026-06-29
sources:
  - id: selfinstruct
    title: "Self-Instruct: Aligning Language Models with Self-Generated Instructions"
    url: https://arxiv.org/abs/2212.10560
    author: Wang et al.
    publisher: "arXiv (ACL 2023)"
    year: 2022
  - id: alpaca
    title: "Alpaca: A Strong, Replicable Instruction-Following Model"
    url: https://crfm.stanford.edu/2023/03/13/alpaca.html
    author: Taori et al. (Stanford CRFM)
    publisher: Stanford CRFM
    year: 2023
---

# Self-Instruct

**Self-Instruct** is a method for building instruction-tuning data by having a language
model generate most of it *itself*. You start with a small pool of human-written tasks,
prompt the model to write many more, keep the ones that are new and usable, and fine-tune
the model on the result — turning a handful of seed examples into tens of thousands of
training instances without writing them by hand. Introduced by Wang et al. in 2022, it is
the origin of the now-standard practice of bootstrapping *synthetic* instructions to teach
a base model to follow instructions cheaply.[^selfinstruct]

## Why it mattered

Before Self-Instruct, teaching a base model to follow instructions meant collecting a large
set of human-written demonstrations — the expensive route taken by [[InstructGPT]].
Self-Instruct showed you could mostly skip that. Applied to [[GPT-3]], it produced a model
that followed instructions far better than the untuned original — roughly on par with the
human-supervised InstructGPT-001 on the authors' evaluations — for little more than the cost
of running the model, rather than paying annotators.[^selfinstruct] Cheap instruction data is
a large part of why the 2023 wave of open instruction-following models was possible at all.
The technique operates at the fine-tuning stage, after [[Pretraining]] has already produced a
capable base model; it changes how that model is *adapted*, not how it is built.

## How it works

The pipeline runs in a loop, with the model doing nearly all the work:[^selfinstruct]

1. **Seed pool.** Begin with a small set of human-written tasks — 175 in the original paper,
   each one instruction plus a single example.
2. **Generate instructions.** Show the model a few tasks drawn from the pool
   ([[In-context learning|few-shot]] prompting) and ask it to write new instructions of its own.
3. **Generate examples.** For each new instruction, have the model produce the input/output
   pair(s) that go with it.
4. **Filter and add back.** Drop low-quality or near-duplicate generations, then return the
   survivors to the pool to seed the next round. To keep the set diverse, a new instruction
   is kept only if it isn't too similar to anything already in the pool — the paper uses a
   **ROUGE-L** overlap below 0.7 as the cutoff (ROUGE-L scores similarity by the longest
   sequence of words two texts share in the same order, so this throws out near-repeats).

Run enough rounds and the original 175 seeds grow into over 52,000 instructions and more
than 82,000 input/output instances, which are then used to fine-tune the model.[^selfinstruct]

## Self-improvement vs. distillation

One subtlety is worth keeping straight, because it is easy to conflate. In the original
paper the generator and the student are the **same** model: GPT-3 writes its own training
data and is then fine-tuned on it — a form of self-improvement.[^selfinstruct] The method's
most famous application, [[Alpaca]], changed exactly one thing: it used a *different, stronger*
model — OpenAI's `text-davinci-003`, a [[GPT-3|GPT-3.5]]-class model — as the generator, and
fine-tuned the much smaller [[LLaMA|Llama]] on its outputs.[^alpaca]

That cross-model variant is really [[Knowledge distillation|black-box distillation]]: the
student learns from a closed teacher's *text* because the teacher's internals aren't
available. It is also where the [[Model licensing]] problem enters — using a *closed* model's
outputs to train a competitor is precisely what the major providers' terms of service forbid.
So Self-Instruct the method is not inherently distillation or a licensing issue; the
Alpaca-style use of *someone else's* model as the generator is what makes it both. Either
way, the same generate-then-fine-tune recipe became the template for the wave of open
instruction-tuned models — [[WizardLM]] and others — and underlies much of the black-box
distillation of chat models that followed.
