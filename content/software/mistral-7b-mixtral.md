---
title: Mistral 7B / Mixtral
description: Mistral AI's Apache-2.0 open-weight models—Mistral 7B and the Mixture-of-Experts Mixtral 8x7B—that set a new bar for small open models with genuinely unrestricted licenses.
tags: [model, open-weights, mistral]
aliases: [Mistral 7B, Mixtral, Mixtral 8x7B]
updated: 2026-06-17
sources:
  - id: mistral7b-paper
    title: "Mistral 7B"
    url: https://arxiv.org/abs/2310.06825
    author: Jiang et al. (Mistral AI)
    publisher: arXiv
    year: 2023
  - id: mistral7b-announce
    title: "Announcing Mistral 7B"
    url: https://mistral.ai/news/announcing-mistral-7b/
    author: Mistral AI
    publisher: Mistral AI
    year: 2023
  - id: mixtral-paper
    title: "Mixtral of Experts"
    url: https://arxiv.org/abs/2401.04088
    author: Jiang et al. (Mistral AI)
    publisher: arXiv
    year: 2024
  - id: venturebeat-torrent
    title: "Mistral AI bucks release trend by dropping torrent link to new open source LLM"
    url: https://venturebeat.com/ai/mistral-ai-bucks-release-trend-by-dropping-torrent-link-to-new-open-source-llm
    author: Carl Franzen
    publisher: VentureBeat
    year: 2023
---

# Mistral 7B / Mixtral

**Mistral 7B** and **Mixtral** are the early open-weight models from [[Mistral AI]],
a French lab that became one of the most prominent non-US players in the field.
Their importance is twofold: they showed that small open models could punch far
above their weight, and they were released under the **Apache 2.0** license — with
genuinely no strings attached.

## Mistral 7B

Released in September 2023, Mistral 7B drew attention for beating considerably
larger models: the paper reports that it "outperforms Llama 2 13B across all
evaluated benchmarks, and Llama 1 34B in reasoning, mathematics, and code
generation."[^mistral7b-paper] It got there partly through efficiency techniques —
"grouped-query attention (GQA) for faster inference, coupled with sliding window
attention (SWA) to … handle sequences of arbitrary length with a reduced inference
cost"[^mistral7b-paper] — which connect it to [[Grouped-query & multi-query
attention]] and [[Sliding-window & sparse attention]]. It was published under Apache
2.0, so it "can be used without restrictions."[^mistral7b-announce]

Mistral also became known for *how* it shipped models: rather than a polished
rollout, the lab took to simply posting a **magnet (torrent) link** on social
media — what VentureBeat described as bucking the usual release trend.[^venturebeat-torrent]
The Mistral 7B release has its own entry, [[Mistral 7B torrent release]].

## Mixtral 8x7B

In December 2023, Mistral followed with **Mixtral 8x7B**, a sparse [[Mixture of
Experts]] model. It has eight expert networks per layer and a router that picks two
per token, giving it roughly 47B total parameters but only about 13B active for any
given token — enough to match or beat Llama 2 70B and GPT-3.5 while staying much
cheaper to run.[^mixtral-paper] Like Mistral 7B, it shipped under Apache 2.0.

## Why it mattered

The Apache 2.0 license is the crux. Unlike the [[Llama 2]] Community License (with
its 700-million-user clause) or the [[Gemma]] terms (with a prohibited-use policy),
Apache 2.0 places **no restrictions** on commercial use — these are about as close
to no-strings [[Open weights]] as the field offers, a point developed in
[[Model licensing]]. Together with the lab's European base, Mistral's releases
established a credible open-weight alternative to the US tech giants.
