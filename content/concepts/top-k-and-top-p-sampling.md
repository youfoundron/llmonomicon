---
title: Top-k and top-p sampling
description: Two truncation methods that improve text generation by sampling only from a model's most probable next tokens—a fixed number (top-k) or a dynamic probability mass (top-p, also called nucleus sampling).
technicality: technical
tags: [sampling, decoding, generation]
group: decoding
aliases: [Nucleus sampling, Top-p sampling, Top-k sampling, Truncation sampling, "Top-k & top-p (nucleus) sampling", "Top-k & top-p sampling"]
updated: 2026-06-17
sources:
  - id: fan2018
    title: "Hierarchical Neural Story Generation"
    url: https://arxiv.org/abs/1805.04833
    author: Fan, Lewis & Dauphin
    publisher: arXiv
    year: 2018
  - id: holtzman2019
    title: "The Curious Case of Neural Text Degeneration"
    url: https://arxiv.org/abs/1904.09751
    author: Holtzman, Buys, Du, Forbes & Choi
    publisher: arXiv
    year: 2019
  - id: hf-generation
    title: "Generation — Transformers documentation"
    url: https://huggingface.co/docs/transformers/en/main_classes/text_generation
    author: Hugging Face
    publisher: Hugging Face
    year: 2024
---

# Top-k and top-p sampling

**Top-k** and **top-p sampling** — the latter also called **nucleus sampling** —
are the two standard ways to *truncate* a language model's choices before it picks
the next token. They are among the most common knobs in any text-generation API,
and they exist to fix a problem with the two naive options: always taking the
single most likely token produces "bland and strangely repetitive" text, while
sampling freely from the model's full distribution keeps reaching into a long,
unreliable tail of bad tokens.[^holtzman2019] Both methods keep the trustworthy
head of the distribution and discard the tail; they differ only in *where* they
cut. For how this fits alongside greedy decoding, [[Beam search|beam search]], and
temperature, see [[Decoding strategies]].

## Top-k: a fixed number of candidates

Top-k sampling keeps only the *k* most probable next tokens, renormalizes their
probabilities, and samples from that shortlist. It was introduced for open-ended
story generation by Fan, Lewis, and Dauphin, who sampled from the 10 most likely
candidates at each step and found it markedly more effective than beam search,
which tends toward common phrases and repetitive text.[^fan2018] Restricting the
draw to a small set of top candidates also lowers the risk of occasionally
picking a wildly inappropriate word.[^fan2018]

## Top-p (nucleus): a dynamic cutoff

Top-p sampling, proposed by Holtzman and colleagues, sets the cutoff by
*probability mass* instead of by count. It keeps "the smallest set" of tokens
whose probabilities sum to at least *p* — that set is the "nucleus" — then
renormalizes and samples from it.[^holtzman2019]

This matters because a fixed *k* is "sub-optimal across varying
contexts."[^holtzman2019] When the model is unsure and spreads its probability
across many plausible tokens, a small *k* cuts off good options; when the model is
confident and one token dominates, a fixed *k* still lets a tail of junk through.
With top-p the size of the candidate set instead "rises and falls dynamically,
corresponding to the changes in the model's confidence" — wide when the model is
uncertain, narrow when it is sure.[^holtzman2019] That adaptiveness is why nucleus
sampling is so widely used in modern LLM tools.

## Relationship to temperature

Truncation is not the same thing as **[[Temperature (sampling)|temperature]]**.
Temperature *reshapes* the entire distribution — flattening it for more randomness
or sharpening it for more focus — whereas top-k and top-p decide *which* tokens
stay eligible at all. The two are orthogonal and routinely combined: temperature
adjusts the probabilities first, then top-k/top-p trims the candidate
set.[^hf-generation] In libraries such as [[Hugging Face Transformers]] they appear
as plain parameters (`top_k`, `top_p`); in the docs, `top_p` keeps the smallest
set of most probable tokens whose probabilities add up to at least
`top_p`.[^hf-generation]
