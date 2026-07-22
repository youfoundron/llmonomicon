---
title: GPT-5
description: OpenAI's flagship, closed-weights model family — from the 2025 unified GPT-5 (a fast model, a reasoning model, and a real-time router) through 2026's point releases to the government-reviewed GPT-5.6 (Luna, Terra, and Sol).
tags: [model, product, reasoning]
technicality: technical
aliases: [GPT-5.6, GPT-5.5, GPT-5 family, GPT-5.x]
updated: 2026-07-10
sources:
  - id: openai-gpt5
    title: "Introducing GPT-5"
    url: https://openai.com/index/introducing-gpt-5/
    author: OpenAI
    publisher: OpenAI
    year: 2025
  - id: openai-gpt5-dev
    title: "Introducing GPT-5 for developers"
    url: https://openai.com/index/introducing-gpt-5-for-developers/
    author: OpenAI
    publisher: OpenAI
    year: 2025
  - id: openai-gpt55
    title: "Introducing GPT-5.5"
    url: https://openai.com/index/introducing-gpt-5-5/
    author: OpenAI
    publisher: OpenAI
    year: 2026
  - id: openai-gpt56
    title: "GPT-5.6: Frontier intelligence that scales with your ambition"
    url: https://openai.com/index/gpt-5-6/
    author: OpenAI
    publisher: OpenAI
    year: 2026
  - id: openai-sol-preview
    title: "Previewing GPT-5.6 Sol: a next-generation model"
    url: https://openai.com/index/previewing-gpt-5-6-sol/
    author: OpenAI
    publisher: OpenAI
    year: 2026
  - id: openai-release-notes
    title: "Model Release Notes"
    url: https://help.openai.com/en/articles/9624314-model-release-notes
    author: OpenAI
    publisher: OpenAI
    year: 2026
  - id: openai-academy-latest
    title: "Introducing GPT-5.3 Instant, GPT-5.4 Thinking, and GPT-5.4 Pro"
    url: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/latest-model
    author: OpenAI Academy
    publisher: OpenAI
    year: 2026
  - id: wiki-gpt5
    title: "GPT-5"
    url: https://en.wikipedia.org/wiki/GPT-5
    publisher: Wikipedia
    year: 2025
  - id: wiki-gpt55
    title: "GPT-5.5"
    url: https://en.wikipedia.org/wiki/GPT-5.5
    publisher: Wikipedia
    year: 2026
  - id: wiki-gpt56
    title: "GPT-5.6"
    url: https://en.wikipedia.org/wiki/GPT-5.6
    publisher: Wikipedia
    year: 2026
  - id: techcrunch-instant
    title: "OpenAI releases GPT-5.5 Instant, a new default model for ChatGPT"
    url: https://techcrunch.com/2026/05/05/openai-releases-gpt-5-5-instant-a-new-default-model-for-chatgpt/
    author: TechCrunch
    publisher: TechCrunch
    year: 2026
  - id: techcrunch-limit
    title: "OpenAI limits GPT-5.6 rollout after government request, says restrictions shouldn't be the norm"
    url: https://techcrunch.com/2026/06/26/openai-limits-gpt-5-6-rollout-after-government-request-says-restrictions-shouldnt-be-the-norm/
    author: TechCrunch
    publisher: TechCrunch
    year: 2026
  - id: engadget-public
    title: "OpenAI gets permission to roll out GPT-5.6 to the public on July 9"
    url: https://www.engadget.com/2210308/openai-rolls-out-gpt5-6-july-9/
    author: Engadget
    publisher: Engadget
    year: 2026
  - id: nextgov-public
    title: "OpenAI's advanced GPT-5.6 models to be available to the public"
    url: https://www.nextgov.com/artificial-intelligence/2026/07/openais-advanced-gpt-56-models-be-available-public/414651/
    author: Nextgov/FCW
    publisher: Nextgov
    year: 2026
  - id: thenextweb
    title: "OpenAI wins US clearance for a broad GPT-5.6 rollout after weeks of government testing"
    url: https://thenextweb.com/news/openai-gpt-5-6-broad-rollout-us-approval
    publisher: The Next Web
    year: 2026
  - id: techtimes-public
    title: "GPT-5.6 Goes Public After 12-Day White House Gate Tests Voluntary AI Framework"
    url: https://www.techtimes.com/articles/319979/20260709/gpt-56-goes-public-after-12-day-white-house-gate-tests-voluntary-ai-framework.htm
    author: Tech Times
    publisher: Tech Times
    year: 2026
  - id: cnbc-eo
    title: "Trump signs AI executive order asking companies to give government early access to models"
    url: https://www.cnbc.com/2026/06/02/trump-executive-order-ai.html
    author: CNBC
    publisher: CNBC
    year: 2026
  - id: whitehouse-eo
    title: "Promoting Advanced Artificial Intelligence Innovation and Security"
    url: https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/
    author: The White House
    publisher: The White House
    year: 2026
  - id: infoworld-sol-files
    title: "OpenAI acknowledges GPT-5.6 may accidentally delete files, calls it an 'honest mistake'"
    url: https://www.infoworld.com/article/4198216/openai-acknowledges-gpt-5-6-may-accidentally-delete-files-calls-it-an-honest-mistake.html
    publisher: InfoWorld
    year: 2026
---

# GPT-5

**GPT-5** is [[OpenAI]]'s flagship family of large language models — the closed-weights line
that powers ChatGPT and the OpenAI API. Unlike [[Open weights|open-weight]] peers such as
[[GLM]] and [[MiniMax models]], the GPT-5 models are delivered only as a hosted product and
API; OpenAI does not release their weights.[^openai-gpt56]

The family's organizing idea is a **unified system**: rather than making users pick between a
fast general model and a slower [[Reasoning models|reasoning]] model, GPT-5 pairs both behind
a **real-time router** that decides, per request, how much to "think." It is the successor to
the [[GPT-3]]/GPT-4 lineage, and since its 2025 debut it has advanced through frequent point
releases rather than one monolithic upgrade.

## The lineage

OpenAI launched the first **GPT-5** on **7 August 2025** as that unified system — a
high-throughput model, a deeper reasoning model, and the router that switches between them —
and exposed it to developers in three sizes, `gpt-5`, `gpt-5-mini`, and
`gpt-5-nano`.[^openai-gpt5][^openai-gpt5-dev] (The launch itself is covered by the [[GPT-5 released]]
event.)

From there the family iterated on two parallel tracks — a fast **"Instant"** line and a
**"Thinking"/"Pro"** reasoning line — bumping the minor version number as it went.[^openai-release-notes]
By **5 March 2026** the ChatGPT lineup was **GPT-5.3 Instant** (the fast, free-tier default),
**GPT-5.4 Thinking** (for longer professional workflows), and **GPT-5.4 Pro** (the
highest-capability option).[^openai-academy-latest][^wiki-gpt5]

**GPT-5.5** followed on **23 April 2026** (Thinking and Pro), reached the API the next day, and
arrived as **GPT-5.5 Instant** for all ChatGPT users on **5 May 2026**, replacing GPT-5.3
Instant as the default.[^wiki-gpt55][^techcrunch-instant][^openai-gpt55] OpenAI reported strong
benchmark numbers for it — for instance 82.7% on Terminal-Bench 2.0 and 51.7% on
[[FrontierMath]] (Tier 1–3) — and the model became the proprietary yardstick that open-weight
challengers measured against, with [[GLM]] and [[MiniMax models]] both citing their coding
scores relative to it.[^wiki-gpt55] OpenAI also briefly previewed a security-focused
**GPT-5.5-Cyber** to vetted teams in May 2026, foreshadowing the controls that would soon
surround its next release.[^wiki-gpt55]

## GPT-5.6

**GPT-5.6**, the family's current generation as of July 2026, reached a limited preview on
**26 June 2026** and the public on **9 July 2026**.[^wiki-gpt56][^engadget-public] It comes in
three variants, from cheapest to strongest: **Luna** (fast, low-cost everyday work), **Terra**
(a balanced middle tier that OpenAI bills as roughly GPT-5.5-level quality at about half the
price), and **Sol** (the flagship).[^engadget-public][^openai-gpt56] Per OpenAI's own list
prices (per million tokens), Sol runs $5 in / $30 out, Terra $2.50 / $15, and Luna $1 /
$6.[^engadget-public] OpenAI frames Sol as its "most capable model yet for cybersecurity,"
singling out long-horizon security work such as vulnerability research — a capability claim
that shaped how the model was released.[^openai-sol-preview]

## A government-reviewed release

That framing put GPT-5.6 at the center of a new US oversight process. On **2 June 2026**,
President Trump signed an executive order, *"Promoting Advanced Artificial Intelligence
Innovation and Security,"* creating a **voluntary** channel for developers to give the federal
government early access to frontier models — up to 30 days before public release — while
explicitly declining to mandate licensing or pre-clearance.[^whitehouse-eo][^cnbc-eo][^nextgov-public]

Under that process, GPT-5.6 stayed in limited preview for roughly twelve days: OpenAI offered
it through the API and [[Codex]] to only a small group of vetted partners (reported as around
twenty organizations) whose identities it shared with the government.[^techcrunch-limit][^thenextweb][^techtimes-public]
The Commerce Department's Center for AI Standards and Innovation (CAISI) ran additional testing
before the broad rollout was cleared for 9 July.[^engadget-public] OpenAI
characterized the arrangement as a short-term step, saying it does not believe "this kind of
government access process should become the long-term default."[^techcrunch-limit]

GPT-5.6's push toward greater autonomy also produced an early stumble in the wild: on
**10 July 2026**, a day after the public launch, [[GPT-5.6 Sol deletes user files|Sol
recursively deleted nearly all the files]] in an AI founder's home directory during a
high-autonomy test session. OpenAI acknowledged the bug and moved to mitigate it through
updated developer guidance and safer permission defaults.[^infoworld-sol-files]
