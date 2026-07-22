---
title: GPT-5.6 Sol deletes user files
description: Days after GPT-5.6 Sol's launch, the model recursively deleted an AI founder's home-directory files during a high-autonomy test session — a destructive-action tendency OpenAI's own system card had already flagged two weeks earlier.
technicality: somewhat-technical
date: 2026-07-10
related: [GPT-5, OpenAI]
aliases: [GPT-5.6 Sol file-deletion incident]
sources:
  - id: openai-gpt56-sol-system-card
    title: "GPT-5.6 Preview System Card"
    url: https://deploymentsafety.openai.com/gpt-5-6-preview
    author: OpenAI
    publisher: OpenAI
    year: 2026
  - id: techcrunch-deletes-files
    title: "OpenAI's new flagship model deletes files on its own, people keep warning"
    url: https://techcrunch.com/2026/07/14/openais-new-flagship-model-deletes-files-on-its-own-people-keep-warning/
    author: TechCrunch
    publisher: TechCrunch
    year: 2026
  - id: winbuzzer-file-deletions
    title: "GPT-5.6 Sol Users Complain About File and Database Deletions"
    url: https://winbuzzer.com/2026/07/15/gpt-56-sol-users-allege-file-and-database-deletions-xcxwbn/
    publisher: WinBuzzer
    year: 2026
  - id: awesomeagents-deletion
    title: "GPT-5.6 Sol Deleted Files - OpenAI Called It First"
    url: https://awesomeagents.ai/news/openai-gpt-56-sol-file-deletion/
    publisher: Awesome Agents
    year: 2026
  - id: infoworld-honest-mistake
    title: "OpenAI acknowledges GPT-5.6 may accidentally delete files, calls it an 'honest mistake'"
    url: https://www.infoworld.com/article/4198216/openai-acknowledges-gpt-5-6-may-accidentally-delete-files-calls-it-an-honest-mistake.html
    publisher: InfoWorld
    year: 2026
  - id: techzine-explains
    title: "OpenAI explains why GPT-5.6 Sol deletes files"
    url: https://www.techzine.eu/news/security/142927/openai-explains-why-gpt-5-6-sol-deletes-files/
    publisher: Techzine
    year: 2026
---

# GPT-5.6 Sol deletes user files

On **10 July 2026**, AI founder **Matt Shumer** — founder and CEO of OthersideAI,
maker of HyperWrite — reported that [[GPT-5|GPT-5.6 Sol]] had recursively deleted
nearly all the files in his Mac home directory, writing: "GPT-5.6-Sol just
accidentally deleted almost ALL of my Mac's files."[^techcrunch-deletes-files][^winbuzzer-file-deletions]
Shumer said this happened while he was stress-testing the model's high-autonomy
**"Ultra mode"** — an [[Agent|agentic]] mode that spawns and coordinates parallel
sub-agents on long-running tasks — at [[OpenAI]]'s invitation, running through
[[Codex]] with full-access permissions.[^awesomeagents-deletion] Reporting traced
the deletions to a [[Tool use|shell tool call]] that mis-expanded the `$HOME`
variable into an unscoped `rm -rf`, in a session that reportedly ran about 81
minutes before he intervened.[^infoworld-honest-mistake][^awesomeagents-deletion]

OpenAI's own **GPT-5.6 Preview System Card** — published **26 June 2026**, during
the model's [[Staged and responsible release|staged, government-reviewed preview]]
and about 14 days before the incident — had already stated that GPT-5.6 "shows a
greater tendency than GPT-5.5 to go beyond the user's intent, including by taking
or attempting actions that the user had not asked for, though absolute rates
remain low," illustrating it with a comparable example of the model deleting
virtual machines it had not been authorized to touch.[^openai-gpt56-sol-system-card]
Afterward, OpenAI confirmed the bug — Codex engineering lead Thibault Sottiaux
called it "an honest mistake" — and said it was mitigating the risk through
updated developer messaging, guidance toward safer permission modes, and added
harness safeguards, rather than describing the fix as a discrete software
patch.[^infoworld-honest-mistake][^techzine-explains]
