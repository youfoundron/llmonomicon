---
title: Simon Willison
description: Independent software developer whose widely followed weblog chronicles the practical LLM era; he named "prompt injection" and builds open-source LLM tooling.
tags: [practitioner, commentator]
aliases: [simonw]
updated: 2026-06-17
sources:
  - id: sw-about
    title: "About — Simon Willison"
    url: https://simonwillison.net/about/
    author: Simon Willison
    publisher: simonwillison.net
    year: 2024
  - id: sw-blog
    title: "Simon Willison's Weblog"
    url: https://simonwillison.net/
    author: Simon Willison
    publisher: simonwillison.net
    year: 2026
  - id: sw-pi
    title: "Prompt injection attacks against GPT-3"
    url: https://simonwillison.net/2022/Sep/12/prompt-injection/
    author: Simon Willison
    publisher: simonwillison.net
    year: 2022
  - id: sw-llm
    title: "simonw/llm — Access large language models from the command-line"
    url: https://github.com/simonw/llm
    author: Simon Willison
    publisher: GitHub
    year: 2023
---

# Simon Willison

**Simon Willison** is an independent software developer and writer whose weblog
has become a closely followed, near-real-time commentary on large language
models. He has blogged at simonwillison.net since 2002; in recent years his
writing emphasizes LLM and AI research, and he is frequently invited to preview
new releases from [[OpenAI]], Anthropic, Google, and Mistral as they
appear.[^sw-about][^sw-blog] For a field that moves faster than the academic
literature can track, those hands-on write-ups have become a common reference
point.

## Naming prompt injection

In September 2022 Willison gave the field one of its enduring security terms. The
day after Riley Goodside publicly demonstrated that you could hijack a [[GPT-3]]
application by feeding it text that orders "the model to ignore its previous
directions," Willison wrote the problem up and proposed a name: "I propose that
the obvious name for this should be **prompt injection**."[^sw-pi] He named and
popularized the term — he did not discover the underlying vulnerability — and the
label stuck. See [[Prompt injection]] for the attack itself.

## Open-source tooling

Willison also builds tools for working with these models. In April 2023 he
released **`llm`**, an open-source command-line tool and Python library for
accessing large language models from the terminal; it has since grown a plugin
system for talking to many hosted and local models.[^sw-llm] See
[[LLM (CLI tool)]] for detail.

## Before LLMs

Willison's career predates this work: he is a co-creator of the Django web
framework, co-founded Lanyrd (later acquired by Eventbrite), created the
Datasette data-exploration tool, and has served on the Python Software Foundation
board.[^sw-about]
