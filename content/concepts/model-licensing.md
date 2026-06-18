---
title: Model licensing
description: The licenses that govern what you can actually do with a model's weights—from permissive Apache-2.0 to custom community terms and use-restricted RAIL licenses.
tags: [licensing, governance, open-weights]
group: safety
aliases: [model license, model licenses, LLM licensing, AI model license]
updated: 2026-06-17
sources:
  - id: apache2
    title: "Apache License, Version 2.0"
    url: https://www.apache.org/licenses/LICENSE-2.0
    author: Apache Software Foundation
    publisher: Apache Software Foundation
    year: 2004
  - id: llama2-license
    title: "Llama 2 Community License Agreement"
    url: https://ai.meta.com/llama/license/
    author: Meta
    publisher: Meta
    year: 2023
  - id: gemma-terms
    title: "Gemma Terms of Use"
    url: https://ai.google.dev/gemma/terms
    author: Google
    publisher: Google
    year: 2024
  - id: openrail
    title: "OpenRAIL: Towards open and responsible AI licensing frameworks"
    url: https://huggingface.co/blog/open_rail
    author: Carlos Muñoz Ferrandis et al.
    publisher: Hugging Face
    year: 2022
  - id: osi-osaid
    title: "The Open Source AI Definition 1.0"
    url: https://opensource.org/ai/open-source-ai-definition
    author: Open Source Initiative
    publisher: OSI
    year: 2024
---

# Model licensing

When a model's weights are published, the **license** — not the download button —
decides what you may actually do with them: use them commercially, redistribute
them, fine-tune them, or build a product on top. "Downloadable" says nothing about
those rights, which is why the license attached to a set of [[Open weights]] matters
as much as the weights themselves. The licenses in use fall into a few broad
families.

## Permissive open-source licenses

The most open tier uses standard software licenses such as **Apache 2.0** or MIT.
Apache 2.0 grants a "perpetual, worldwide, non-exclusive, no-charge, royalty-free,
irrevocable" license — covering both copyright and patents — to use, modify, and
redistribute, subject only to notice and attribution requirements, with **no
restrictions on how you use the result**.[^apache2] Models released this way (for
example [[Mistral 7B / Mixtral]]) are open source in the full sense.

## Custom "community" licenses

Many prominent open-weight models ship under a vendor's own license that is
downloadable but conditional — open *weights*, not open *source*:

- **Meta's [[Llama 2|Llama]] Community License** pairs an acceptable-use policy with
  a commercial-scale clause: if a product's "monthly active users … is greater than
  700 million," you "must request a license from Meta."[^llama2-license]
- **Google's [[Gemma]] Terms of Use** allow commercial use and redistribution but
  bind users to a separate Prohibited Use Policy.[^gemma-terms]

## Responsible AI licenses (RAIL)

A third family, the **RAIL** / **OpenRAIL** licenses, grants "royalty free access
and flexible downstream use and re-distribution" but embeds **behavioral, use-based
restrictions** that forbid a list of harmful applications.[^openrail] Those
field-of-use limits are exactly what a strict open-source definition disallows, so
RAIL models are not open source in that sense. The BigScience **[[BLOOM]]** model
was released under such a license.[^openrail]

## Why downloadable ≠ open source

The Open Source Initiative's **Open Source AI Definition** sets a high bar: the
freedoms to use, study, modify, and share a model, *plus* its components made
available under OSI-approved terms.[^osi-osaid] Custom-community and RAIL licenses
impose use- or user-based restrictions that fail that test — so a model can be
freely downloadable and still not be open source. (For the access spectrum itself,
see [[Open weights]].)

## Clauses worth checking

Whatever the family, a few clauses do the real work and reward reading before you
rely on a model:

- whether **commercial use** is permitted;
- any **acceptable- or prohibited-use** policy;
- **redistribution and derivative-work** terms;
- usage gates such as Llama's **700-million-user** threshold;[^llama2-license]
- explicit **patent grants** (a notable strength of Apache 2.0).[^apache2]
