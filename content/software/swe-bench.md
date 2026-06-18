---
title: SWE-bench
description: A benchmark of real-world software-engineering tasks — resolve an actual GitHub issue so the repository's tests pass — and the defining yardstick of the coding-agent era.
technicality: technical
tags: [benchmark, code, agents]
aliases: [SWE-bench Verified, SWEbench, SWE bench]
updated: 2026-06-17
sources:
  - id: jimenez2023
    title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
    url: https://arxiv.org/abs/2310.06770
    author: Jimenez, Yang, Wettig et al.
    publisher: "arXiv (ICLR 2024)"
    year: 2023
  - id: verified
    title: "Introducing SWE-bench Verified"
    url: https://openai.com/index/introducing-swe-bench-verified/
    author: OpenAI
    publisher: OpenAI
    year: 2024
  - id: site
    title: "SWE-bench (official site)"
    url: https://www.swebench.com/
    author: SWE-bench team
    publisher: SWE-bench
    year: 2024
---

# SWE-bench

**SWE-bench** is a benchmark that tests whether a language model can do real
software engineering. Instead of asking for a single function, it hands the model
an actual **GitHub issue** and a snapshot of the **repository** it was filed
against, and asks for a code change — a patch — that resolves the issue. Success
is judged the way engineers judge their own work: by running the project's **test
suite** and checking that it passes.[^jimenez2023]

## How it works

SWE-bench is built from 2,294 real task instances drawn from 12 popular
open-source Python repositories.[^jimenez2023] Each task pairs a genuine issue
report with the codebase as it stood at the time, and the model must produce a
patch. Grading is **execution-based**: the patch is applied and the repository's
own tests are run, so a solution counts only if it actually makes the code
work — there is no credit for output that merely looks plausible.[^jimenez2023]

This is what makes SWE-bench hard. Unlike function-level tests, resolving a real
issue often means "understanding and coordinating changes across multiple
functions, classes, and even files simultaneously."[^jimenez2023] The difficulty
showed at launch: the best model evaluated, Claude 2, resolved just
**1.96%** of the issues.[^jimenez2023] That gap is exactly why SWE-bench became
the defining benchmark of the **coding-agent** era — the target that systems
built to autonomously edit code are measured against.

## SWE-bench Verified

The original benchmark had flaws: some tasks were graded incorrectly (rejecting
patches that were actually correct), some issues were under-specified, and some
tests were unreasonably strict. In August 2024, OpenAI, working with the
SWE-bench authors, released **SWE-bench Verified** — a 500-task subset vetted in a
93-developer annotation campaign to remove those problems.[^verified] It is now
the version most frontier model releases actually report, so a quoted "SWE-bench
score" is usually a SWE-bench Verified score.[^verified] Smaller and specialized
variants, including SWE-bench Lite and SWE-bench Multimodal, exist alongside
it.[^site]

## Lineage

SWE-bench is the realistic successor to function-level coding benchmarks like
[[HumanEval]], which ask a model to write one self-contained function that passes
unit tests. SWE-bench keeps the test-based grading but moves up to
whole-repository scale — much closer to what software engineering actually
involves.[^jimenez2023] As a flagship example of a [[Benchmark]], it shows both
how a hard, realistic evaluation can drive an entire field and, as scores climb,
the saturation pressure that pushes that field toward still-harder successors.
