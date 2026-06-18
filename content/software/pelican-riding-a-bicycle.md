---
title: Pelican riding a bicycle
description: Simon Willison's informal LLM test—"generate an SVG of a pelican riding a bicycle"—a deliberately absurd, hard-to-game check he runs on every new model.
tags: [evaluation, informal-benchmark]
aliases: [Pelican on a bicycle, Pelican SVG benchmark]
updated: 2026-06-18
sources:
  - id: willison-pelican
    title: "Pelican riding a bicycle (tag) — Simon Willison's Weblog"
    url: https://simonwillison.net/tags/pelican-riding-a-bicycle/
    author: Simon Willison
    publisher: simonwillison.net
    year: 2025
---

# Pelican riding a bicycle

**"Pelican riding a bicycle"** is an informal LLM benchmark popularized by
[[Simon Willison]]. The test is exactly what it sounds like: ask a model, with text
only and no image-generation tools, to "generate an SVG of a pelican riding a
bicycle" — so the model has to write vector-graphics code that, when rendered, looks
like the requested drawing.[^willison-pelican] It is silly on purpose, and that is the
point.

## Why a pelican on a bicycle

The appeal is that the task is deliberately absurd and genuinely hard: pelicans are
awkward to draw, bicycles are awkward to draw, and pelicans cannot ride bicycles at
all. Precisely because it is so ridiculous, no AI lab would bother training a model to
be good at it — which makes the test resistant to the contamination and gaming that
erode formal benchmarks, where popular test sets leak into training data or get
optimized against.[^willison-pelican] And unlike a numeric score, the result is a
picture: anyone can glance at the rendered SVG and judge whether the model drew a
recognizable pelican on a working bicycle.

Willison runs the test on essentially every notable model release and posts the
drawings, turning it into a recurring, shareable "vibe check" on how capable each new
model is at a task no one is training for.[^willison-pelican]

## What it does and doesn't show

Scoring is pure human eyeballing — there is no automated metric; Willison just inspects
each SVG and compares models side by side.[^willison-pelican] That makes the pelican
test genuinely useful as a contamination-resistant probe of general capability and
spatial reasoning, while remaining a single, subjective task rather than a rigorous
measurement. It is the best-loved example of an
[[Informal & vibe-check benchmarks|informal, vibe-check benchmark]] — a complement to
the rigorous static tests catalogued under [[Benchmark (LLM evaluation)]] and the
human-preference rankings of [[Chatbot Arena]].
