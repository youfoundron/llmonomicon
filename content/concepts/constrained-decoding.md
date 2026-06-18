---
title: Constrained decoding
description: A technique that forces a language model's output to match a formal structure—like JSON or a grammar—by masking out any token that would break it.
tags: [generation, inference, mechanism]
group: decoding
aliases: [Structured generation, Structured output, Grammar-constrained decoding, JSON mode, guided generation]
updated: 2026-06-17
sources:
  - id: willard2023
    title: "Efficient Guided Generation for Large Language Models"
    url: https://arxiv.org/abs/2307.09702
    author: Willard & Louf
    publisher: arXiv
    year: 2023
  - id: gbnf
    title: "GBNF Guide — llama.cpp grammars (README)"
    url: https://github.com/ggerganov/llama.cpp/blob/master/grammars/README.md
    author: llama.cpp contributors
    publisher: GitHub
    year: 2023
  - id: park2024
    title: "Grammar-Aligned Decoding"
    url: https://arxiv.org/abs/2405.21047
    author: Park et al.
    publisher: arXiv
    year: 2024
---

# Constrained decoding

**Constrained decoding** forces a language model's output to follow a required
**format** — valid JSON, a particular grammar, or a value matching a regular
expression — instead of merely hoping it will. It works by **masking** the model's
choices at each step: any token that would make the output impossible to finish
validly is set to zero probability, so the model can only ever sample tokens that
keep the result well-formed.[^willard2023] This is what makes reliable JSON output,
tool-call arguments, and function inputs possible without parsing the model's prose
after the fact or retrying when it comes back malformed.[^willard2023]

## How it works

Underneath constrained decoding is a **state machine** built from the target
format. A grammar or regular expression is compiled into a set of states, and at
each step the machine knows exactly which tokens are allowed to come next;
everything else is masked out before sampling.[^willard2023] The Outlines library
frames generation as "transitions between the states of a finite-state machine" and
pre-indexes the model's vocabulary against those states, so enforcing the structure
"adds little overhead" while "guaranteeing the structure of the generated
text."[^willard2023]

This is *not* the same as the rest of [[Decoding strategies]]. Sampling methods
choose among the tokens the model already finds likely; constrained decoding
changes *which tokens are eligible at all*, restricting the model to a valid subset
and then letting ordinary sampling happen within it.

## Not just prompting

Asking a model in the prompt to "respond only with JSON" is a suggestion, not a
guarantee — the model can and does still produce invalid output. Constrained
decoding makes malformed output literally **impossible to generate**, because the
offending tokens are never available to sample.[^willard2023] Many systems expose
this: [[llama.cpp]]'s **GBNF** grammars — "a format for defining formal grammars to
constrain model outputs" — can "force the model to generate valid JSON, or speak
only in emojis,"[^gbnf] and the same idea underlies the "structured output" and
"JSON mode" features of model providers and serving engines such as [[SGLang]].

## Caveats

Two wrinkles are worth knowing. First, masking interacts awkwardly with
[[Tokenization]]: grammars are defined over characters, but models emit tokens, and
a single token can straddle a grammar boundary — so the machinery has to map the
grammar onto token-level transitions rather than character-level
ones.[^willard2023] Second, forcing validity can quietly **distort** what the model
would otherwise have said: naively masking tokens to satisfy a grammar "can distort
the LLM's distribution, leading to outputs that are grammatical but appear with
likelihoods that are not proportional to the ones given by the LLM" — valid output,
but not necessarily the model's *best* output. Later work proposes ways to correct
for this.[^park2024]
