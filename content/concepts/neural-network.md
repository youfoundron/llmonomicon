---
title: Neural network
description: The foundational model type behind modern AI — layers of simple weighted units that learn from data; every architecture here, including the Transformer behind LLMs, is one.
tags: [architecture, deep-learning]
group: architecture
technicality: technical
aliases: [Neural networks, Artificial neural network, Deep learning, Deep neural network, Multilayer perceptron, MLP, Perceptron, Neural net]
updated: 2026-06-23
sources:
  - id: rosenblatt1958
    title: "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain"
    url: https://doi.org/10.1037/h0042519
    author: Frank Rosenblatt
    publisher: Psychological Review
    year: 1958
  - id: backprop1986
    title: "Learning representations by back-propagating errors"
    url: https://www.nature.com/articles/323533a0
    author: Rumelhart, Hinton & Williams
    publisher: Nature
    year: 1986
  - id: alexnet2012
    title: "ImageNet Classification with Deep Convolutional Neural Networks"
    url: https://doi.org/10.1145/3065386
    author: Krizhevsky, Sutskever & Hinton
    publisher: Communications of the ACM
    year: 2017
  - id: lecun2015
    title: "Deep Learning"
    url: https://doi.org/10.1038/nature14539
    author: LeCun, Bengio & Hinton
    publisher: Nature
    year: 2015
  - id: goodfellow2016
    title: "Deep Learning"
    url: https://www.deeplearningbook.org/
    author: Goodfellow, Bengio & Courville
    publisher: MIT Press
    year: 2016
---

# Neural network

A **neural network** is the basic building block of modern artificial intelligence
— the kind of model behind everything from image recognition to large language
models. Loosely inspired by the brain, it is a mathematical function made of many
small, simple units wired together in layers. On its own each unit does almost
nothing; connect enough of them and train them on data, and the network can learn to
recognize faces, translate languages, or predict the next word in a sentence. Every
architecture in this wiki — the [[Transformer]], the [[LSTM]],
[[Embeddings|word embeddings]] — is a neural network of some kind.

## What it is

Each unit, or **"neuron,"** takes several numbers as input, multiplies each by a
**weight**, adds the results, and passes the total through a simple nonlinear
function called an **activation**. Stack these units into **layers**, feeding each
layer's outputs into the next, and the whole network becomes a flexible function
that maps inputs (pixels, words) to outputs (a label, a prediction). With enough
units and layers, such networks can approximate remarkably complex
relationships.[^goodfellow2016] The idea traces back to the **perceptron**, a
single-layer version introduced by Frank Rosenblatt in 1958;[^rosenblatt1958]
stacking perceptrons into several layers gives the **multilayer perceptron**, the
simplest deep network.

## How it learns

A freshly built network is useless — its weights start out random. **Training** is
the process of adjusting those weights so the network's outputs move closer to the
right answers. The model makes a prediction, the error is measured, and that error
is used to nudge every weight a little in the direction that reduces it — a procedure
called **gradient descent**. The algorithm that efficiently works out how to adjust
each weight, **[[Backpropagation popularized|backpropagation]]**, was popularized by
David Rumelhart, [[Geoffrey Hinton]], and Ronald Williams in a landmark 1986
paper.[^backprop1986] Repeat this over enough examples and the network gradually
learns.

## "Deep" learning

**Deep learning** is simply the use of neural networks with **many layers** — and the
name of the field that has dominated AI since the early 2010s. The turning point was
**[[AlexNet wins ImageNet|AlexNet (2012)]]**, a deep network from Alex Krizhevsky,
[[Ilya Sutskever]], and [[Geoffrey Hinton]] that won an image-recognition benchmark
by a wide margin and showed what deep networks could do when paired with powerful
GPUs and large datasets.[^alexnet2012] A widely cited overview of the field is
LeCun, Bengio, and Hinton's 2015 review, also titled "Deep Learning."[^lecun2015]
Extra layers let a network build up increasingly abstract features — edges, then
shapes, then objects — learned automatically from data rather than hand-designed.

## The foundation for language models

A large language model is, at bottom, a very large neural network. The
[[Transformer]] architecture behind today's LLMs is a particular arrangement of
neurons and layers; what makes it a *language* model is its scale and the way it is
trained — through [[Pretraining|pretraining]] on enormous amounts of text. Other
concepts in this wiki — [[Attention]], [[Mixture of Experts]], [[Quantization]] —
are all techniques for building, scaling, or shrinking neural networks. This entry
is the floor they all stand on.
