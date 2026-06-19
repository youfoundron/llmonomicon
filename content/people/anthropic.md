---
title: Anthropic
description: An AI safety company founded in 2021 by former OpenAI staff, known for the Claude model family and the Constitutional AI training method.
technicality: non-technical
tags: [organization, ai-safety]
aliases: [Anthropic PBC]
updated: 2026-06-18
sources:
  - id: anthropic-company
    title: "Company — Anthropic"
    url: https://www.anthropic.com/company
    author: Anthropic
    publisher: Anthropic
    year: 2024
  - id: anthropic-2021
    title: "Anthropic raises $124 million to build more reliable, general AI systems"
    url: https://www.anthropic.com/news/anthropic-raises-124-million-to-build-more-reliable-general-ai-systems
    author: Anthropic
    publisher: Anthropic
    year: 2021
  - id: anthropic-coreviews
    title: "Core Views on AI Safety: When, Why, What, and How"
    url: https://www.anthropic.com/news/core-views-on-ai-safety
    author: Anthropic
    publisher: Anthropic
    year: 2023
  - id: anthropic-wiki
    title: "Anthropic (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Anthropic
    publisher: Wikipedia
    year: 2025
  - id: mcp-announce
    title: "Introducing the Model Context Protocol"
    url: https://www.anthropic.com/news/model-context-protocol
    author: Anthropic
    publisher: Anthropic
    year: 2024
  - id: cc-announce
    title: "Claude 3.7 Sonnet and Claude Code"
    url: https://www.anthropic.com/news/claude-3-7-sonnet
    author: Anthropic
    publisher: Anthropic
    year: 2025
  - id: cbs
    title: "What's behind the Anthropic-Pentagon feud"
    url: https://www.cbsnews.com/news/anthropic-pentagon-pete-hegseth-feud/
    publisher: CBS News
    year: 2026
  - id: mit
    title: "The Pentagon's culture-war tactic against Anthropic has backfired"
    url: https://www.technologyreview.com/2026/03/30/1134881/the-pentagons-culture-war-tactic-against-anthropic-has-backfired/
    publisher: MIT Technology Review
    year: 2026
  - id: aljazeera-access
    title: "US orders Anthropic to disable AI models for all foreign nationals"
    url: https://www.aljazeera.com/news/2026/6/13/us-orders-anthropic-to-disable-ai-models-for-all-foreign-nationals
    publisher: Al Jazeera
    year: 2026
---

# Anthropic

**Anthropic** is an AI safety and research company that aims to "build frontier AI
systems that are reliable, interpretable, and steerable."[^anthropic-company]
Founded in 2021 by a group that had left [[OpenAI]], it is best known for the
[[Claude]] family of models and for [[Constitutional AI]], its method for training
models to follow a written set of principles. In mission and stature it is the
closest counterpart to [[OpenAI]] itself.

## Founding

Anthropic was founded in 2021 by seven former OpenAI employees, among them the
siblings **[[Dario Amodei]]** — OpenAI's former vice president of research, now
Anthropic's CEO — and **[[Daniela Amodei]]**, its president, along with chief science
officer **[[Jared Kaplan]]** and head of policy **[[Jack Clark]]**.[^anthropic-wiki] By
their own account they left OpenAI over "directional differences," wanting to build
an organization centered on the safety and reliability of AI
systems.[^anthropic-wiki] The company introduced itself publicly in May 2021 with a
$124 million Series A round led by Jaan Tallinn, a co-founder of
Skype.[^anthropic-2021]

## How it is organized

Anthropic is a **public-benefit corporation** — a for-profit company legally
chartered to pursue a stated public mission, which it gives as "the responsible
development and maintenance of advanced AI for the long-term benefit of
humanity."[^anthropic-company] Its governance includes a **Long-Term Benefit
Trust** that, together with stockholders, elects members of the
board.[^anthropic-company]

## Safety thesis

Anthropic frames its existence around AI safety research. In its 2023 *Core Views
on AI Safety*, it argues that "a major reason Anthropic exists as an organization
is that we believe it's necessary to do safety research on 'frontier' AI
systems."[^anthropic-coreviews] The urgency comes from the pace of scaling: the
company expects "around a 1000x increase in the computation used to train the
largest models" over five years, and pairs that expectation with a deliberately
empirical, measure-as-you-go approach to safety.[^anthropic-coreviews]

## What it is known for

- **[[Claude]]** — Anthropic's family of large language models, first released in
  2023.[^anthropic-wiki]
- **[[Constitutional AI]]** — a training method in which, as Anthropic puts it, the
  model "is trained to adhere to a set of principles called a
  constitution."[^anthropic-wiki]
- A substantial research program in **mechanistic interpretability** — trying to
  understand the internal workings of models — alongside its safety and governance
  work.[^anthropic-coreviews]
- The **[[Model Context Protocol]]** — an open standard it open-sourced in
  November 2024 for connecting AI applications to external tools and data.[^mcp-announce]
- **[[Claude Code]]** — its agentic coding tool, introduced in 2025, which drives
  Claude to read, edit, and run code across a project.[^cc-announce]

## The 2026 Pentagon dispute and federal access cut

In early 2026, Anthropic's safety stance collided with the US government in a sequence that became
one of the sharpest clashes yet between a frontier AI lab and a state.

The dispute went public in February 2026. By CBS News's account, the standoff was "reportedly set
off by the U.S. military's use of its technology … during the operation to capture former Venezuela
President Nicolás Maduro in January" — a use Anthropic said it could not confirm, stating it "has
not discussed the use of Claude for specific operations" with the Pentagon.[^cbs] Defense Secretary
Pete Hegseth then "gave Anthropic until Friday, Feb. 27 to agree to give the U.S. military
unrestricted use of its technology or risk being blacklisted."[^cbs] Anthropic held two red lines:
no use of [[Claude]] for "mass surveillance of Americans," and no fully autonomous targeting —
ensuring Claude "is not used by the Pentagon for final targeting decisions … without any human
involvement," given models' tendency to hallucinate.[^cbs]

Anthropic did not back down. On February 27 the administration moved to bar federal use of its
products and the Pentagon **[[Pentagon designates Anthropic a supply-chain risk|designated Anthropic
a "supply-chain risk"]]**, declaring that no military contractor "may conduct any commercial
activity with Anthropic."[^mit] Anthropic sued, arguing the government was trying to "publicly punish
Anthropic for its 'ideology' and 'rhetoric'" in violation of the First Amendment.[^mit] In **late
March 2026**, Judge Rita Lin issued a preliminary injunction blocking the designation, finding
Anthropic "likely to prevail on essentially all of its theories for why the government's actions
were unlawful."[^mit]

The friction returned in June. Days after Anthropic released **[[Claude Fable 5 released|Claude
Fable 5]]**, a government export-control directive ordered it to **[[US suspends foreign access to
Fable 5 & Mythos 5|suspend Fable 5 and Mythos 5 for all foreign nationals]]**, and Anthropic
disabled the models for everyone to comply while disputing the order.[^aljazeera-access] As of June
2026 the matter was unresolved: the March ruling was a preliminary injunction, not a final judgment.
