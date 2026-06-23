---
title: Decoding strategies
description: How an autoregressive model turns next-token probabilities into text — the decoding loop, deterministic vs stochastic strategies, and the coherence-versus-diversity trade-off.
technicality: technical
tags: [decoding, generation]
group: decoding
aliases: [Decoding, Greedy decoding, Autoregressive decoding, Text generation]
updated: 2026-06-18
sources:
  - id: holtzman2019
    title: "The Curious Case of Neural Text Degeneration"
    url: https://arxiv.org/abs/1904.09751
    author: Holtzman, Buys, Du, Forbes, Choi
    publisher: "arXiv (ICLR 2020)"
    year: 2019
  - id: hf-generate
    title: "How to generate text: using different decoding methods for language generation with Transformers"
    url: https://huggingface.co/blog/how-to-generate
    author: Patrick von Platen
    publisher: Hugging Face
    year: 2020
  - id: nguyen2024
    title: "Turning Up the Heat: Min-p Sampling for Creative and Coherent LLM Outputs"
    url: https://arxiv.org/abs/2407.01082
    author: Nguyen et al.
    publisher: "arXiv (ICLR 2025)"
    year: 2024
---

# Decoding strategies

A language model does not directly emit words. At each step it produces a
**probability distribution** over its entire vocabulary — how likely each
possible next token is. A **decoding strategy** is the rule that turns those
probabilities into an actual choice of token; the chosen token is then fed back
in and the process repeats. This loop is how a [[Transformer]] generates text one
[[Tokenization|token]] at a time, and the strategy you choose has a large effect
on whether the output is accurate, fluent, repetitive, or creative.[^hf-generate]

## The decoding loop

An autoregressive model factorizes the probability of a sequence into the product
of conditional next-token distributions: given everything so far, predict the
next token, append it, and continue until an end-of-sequence token is
produced.[^hf-generate] The model only ever supplies probabilities; the decoding
strategy decides what to do with them. Those strategies fall into two broad
families.

## Deterministic strategies

Deterministic strategies produce the same output every time for a given input.

- **Greedy decoding** is the simplest: at each step it "selects the word with the
  highest probability as its next word."[^hf-generate] It is fast and obvious but
  short-sighted — by always grabbing the single best next token it "misses high
  probability words hidden behind a low probability word," so a slightly worse
  choice now that would have led somewhere better is never explored.[^hf-generate]
- **[[Beam search]]** softens this by keeping several of the most likely running
  hypotheses at each step rather than just one, then choosing the
  highest-probability sequence overall.[^hf-generate] It finds more likely text
  than greedy, but it tends toward repetition, which becomes a real problem in
  open-ended generation.[^hf-generate]

## The degeneration problem

The natural assumption is that always choosing the most probable text yields the
best text. It does not. Holtzman et al. showed that "using likelihood as a
decoding objective leads to text that is bland and strangely repetitive," and,
more broadly, that "decoding strategies alone can dramatically effect the quality
of machine text."[^holtzman2019] This is **neural text degeneration**, and it is
why most creative or conversational generation turns to *stochastic* strategies
instead — deliberately introducing randomness to make the output feel more human.

## Stochastic strategies

Stochastic strategies *sample* from the distribution rather than maximizing it,
which brings diversity — at the risk of incoherence if left unconstrained. Two
knobs shape the sampling:

- **[[Temperature (sampling)|Temperature]]** rescales the distribution before
  sampling: low temperature sharpens it toward the likely tokens (more focused),
  high temperature flattens it (more random).[^hf-generate]
- **[[Top-k & top-p (nucleus) sampling|Top-k and top-p]]** truncate the
  distribution so only plausible tokens can be drawn. Holtzman et al.'s **nucleus
  (top-p)** sampling draws "from the dynamic nucleus of the probability
  distribution, which allows for diversity while effectively truncating the less
  reliable tail of the distribution" — keeping the smallest set of tokens whose
  probabilities sum past a threshold, a set that grows and shrinks with the
  model's confidence.[^holtzman2019] A more recent relative variant,
  **[[Min-p sampling]]**, sets that floor as a fraction of the top token's
  probability, so the cutoff scales with the model's confidence directly.[^nguyen2024]

The tension running through all of these is one trade-off: **coherence and
quality** (favoring high-probability choices) versus **diversity and creativity**
(allowing less likely ones).[^holtzman2019]

## Related, and one thing it isn't

Several refinements hang off this hub — [[Repetition penalty]] to discourage
repeating tokens, and [[Constrained decoding]] to force output into a required
format. Note that [[Speculative decoding]], despite the name, is *not* a decoding
strategy: it is an inference *speedup* that makes generation faster without
changing which text is produced.

The left-to-right loop itself is a design choice, not a requirement:
[[Diffusion language models]] are a non-autoregressive alternative that generate
text by denoising many tokens in parallel rather than one at a time.
