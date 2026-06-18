---
title: Devin
description: Cognition's proprietary autonomous coding agent, launched in March 2024 as "the first AI software engineer" — a landmark in the autonomous-software-engineer narrative and a case study in capability claims versus independent evaluation.
technicality: somewhat-technical
tags: [closed-source, coding-agent]
aliases: [Devin AI]
updated: 2026-06-18
sources:
  - id: cognition-devin
    title: "Introducing Devin, the first AI software engineer"
    url: https://cognition.ai/blog/introducing-devin
    author: Cognition
    publisher: Cognition
    year: 2024
  - id: register-devin
    title: "'First AI software engineer' is bad at its job"
    url: https://www.theregister.com/2025/01/23/ai_developer_devin_poor_reviews/
    author: Thomas Claburn
    publisher: The Register
    year: 2025
  - id: devin-wiki
    title: "Devin AI (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Devin_AI
    publisher: Wikipedia
    year: 2025
---

# Devin

**Devin** is a proprietary **autonomous coding [[Agent|agent]]** built by the
startup **Cognition**. Announced on March 12, 2024 as "the first AI software
engineer," it was positioned not as an in-editor assistant but as an end-to-end
system that takes a task and carries it to completion on its own — planning,
writing code, running it, and fixing what breaks.[^cognition-devin] The launch made
Devin a landmark in the "autonomous software engineer" story; the year that
followed made it a case study in the distance between a capability claim and an
independent measurement of it.

## What it is

Cognition framed Devin around autonomy. "With our advances in long-term reasoning
and planning," the launch post said, "Devin can plan and execute complex
engineering tasks requiring thousands of decisions."[^cognition-devin] Where
assistive coding tools — [[Cursor]], [[Claude Code]], [[Aider]] — keep a human in
the loop on each edit, Devin was pitched to take a whole job end-to-end and report
back, the autonomous-coding heir to the 2023 [[AutoGPT]] moment.[^cognition-devin]
It is closed and proprietary, sold as a hosted product rather than released as
source.[^devin-wiki]

## The benchmark claim

Devin's launch leaned on [[SWE-bench]], the benchmark that asks an agent to resolve
a real GitHub issue so the repository's own tests pass. Cognition reported that
"Devin correctly resolves 13.86% of the issues end-to-end, far exceeding the
previous state-of-the-art of 1.96%" — a roughly sevenfold jump; the best prior
models reached only 4.80% even when handed the exact files to
edit.[^cognition-devin] The figure was striking precisely because SWE-bench is hard
and execution-graded: there is no credit for plausible-looking output that fails
the tests.

## Scrutiny of the launch demo

The launch is also where the capability narrative met pushback, and the even-handed
account keeps both halves. Within weeks, independent reviewers questioned the
headline demo — a paid Upwork task Devin appeared to complete. As the Devin AI
article on Wikipedia summarizes it, "YouTube channels such as Internet of Bugs and
Computer Vision Project criticized the tool for failing to deliver on the project
request, instead writing, testing, and debugging code irrelevant to the Upwork
request" — that some of the "debugging" on display was Devin fixing problems it had
introduced itself.[^devin-wiki]

A later hands-on study pointed the same way. Three data scientists at Answer.AI gave
Devin twenty tasks; it completed three, failed fourteen outright, and returned three
inconclusive results, with the reviewers reporting that behind "a polished user
experience ... it rarely worked" and that Devin would "press forward with tasks that
weren't actually possible."[^register-devin] None of this settles what Devin is
worth — it kept shipping and improving after launch — but the contrast between a
marketed benchmark number and independent hands-on results is the durable lesson,
and it is why an agent's claims are now read alongside the evaluation they ride on.

## Source model

Devin is **proprietary software from Cognition**, offered as a hosted service rather
than released as source; its sandboxes run on open-source components (Ubuntu), but
the agent itself is closed.[^devin-wiki] Among [[Agent harnesses]] it sits at the
**autonomous, closed** corner — distinct from the assistive, human-in-the-loop
coding agents and from the open [[AutoGPT]] lineage it followed.
