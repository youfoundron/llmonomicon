---
title: Colophon
description: How the llmonomicon is made, sourced, and kept honest — including its use of large language models.
aliases: [About, Provenance, About the llmonomicon]
updated: 2026-06-17
---

# Colophon

The **llmonomicon** is a markdown-first, community-edited wiki about the history,
concepts, software, people, and organizations of large language models. This page
explains how it is made and how it stays trustworthy.

## On the use of large language models

In the spirit of full disclosure: **much of this grimoire has itself been
drafted and compiled with the help of large language models.** That is fitting
for a wiki about LLMs — but it also means the text can contain confident-sounding
errors, subtle misattributions, and invented specifics ("hallucinations").

We treat that risk as a first-class design constraint rather than a footnote:

- **Every article must cite at least one source.** The build *refuses to
  publish* a page that cites nothing — this is enforced automatically, not left
  to good intentions.
- **Inline citations** tie specific claims to specific sources, so a reader (or a
  reviewer) can check any statement against its origin.
- **Everything is correctable by humans.** Each page links to *Suggest an edit*
  (a prefilled GitHub issue) and *Edit on GitHub* (a pull request). Treat
  uncited or surprising claims with skepticism and please fix them.

In short: an LLM may have written a sentence here, but a **citation and a human**
are what keep it.

## How the site is built

The site is plain static HTML generated from markdown by a small, dependency-light
build (one markdown library, no framework). Internal links use wiki-style
`[[double brackets]]`; missing pages render as red links that invite creation.
There is no backend — contributions flow entirely through GitHub.

## How to help

Read skeptically, click *Suggest an edit*, and bring sources. New entries are
welcome — follow any red link, or open a "new article" issue. Contributions to
the writing are licensed CC BY-SA 4.0.
