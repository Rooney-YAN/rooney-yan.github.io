---
title: I Built an AI Tool to Improve My Notes
slug: why-i-built-noteloop
date: 2026-10-20
category: Build
tags: NoteLoop, AI, Learning, Building
language: en
excerpt: I've wanted to build a second brain since high school. NoteLoop is my attempt, as an obsessive note-taker and perfectionist, to find the gaps my notes cannot reveal on their own.
---

*Originally written in Chinese.*

I've loved taking notes since high school, and for just as long I've wanted to build a knowledge system of my own. Back then, I came across an idea on Zhihu that really caught my attention: building a note-taking system is like building yourself a “second brain.” I was immediately drawn to it. Things I had learned wouldn't simply disappear after an exam; I could organize them, connect them, and return to them when I needed them. Even the thought of that felt exciting.

I'm also quite an extreme perfectionist. With any set of notes, I can always keep asking whether it could be more complete or better structured. But the longer I worked on my notes, the more one question bothered me: **If a concept is written down, does that mean I actually understand it?**

Maybe I understood a slide at the time and copied its definition into my notes. Maybe I can recognize a term but can't explain it on my own, let alone use it in a new problem. There seems to be a distance between how complete my notes are and how much I really know. I wanted to see exactly where that distance was.

## From “What else should I add?” to “Do I actually know this?”

That was the starting point for [NoteLoop](https://github.com/Rooney-YAN/NoteLoop). I wanted to put course material next to my existing notes and find out which topics were missing or unclear. But comparing two texts wasn't enough. A topic missing from my notes doesn't necessarily mean I don't know it; a topic appearing in them doesn't mean I do. So before changing the notes, NoteLoop asks me to answer a few questions.

Here's how it works now: I upload a course PDF and add my notes in Markdown or plain text. AI analyzes the material and the notes separately, then produces a picture of what the notes cover. Next come six diagnostic questions: single-choice, multiple-choice, and short-answer. I also rate how confident I am in each answer, because getting something right by guessing and getting it wrong with complete confidence call for different kinds of review.

The questions themselves can be wrong, too. Before I see them, another AI review pass checks their wording, answers, and whether they actually match the course material. Finally, NoteLoop diagnoses my answers and, when needed, suggests a small Markdown patch. I decide whether to copy it, append it, or skip it. My existing notes are never silently rewritten.

## Why only a small patch?

This may be the most personal design choice in the whole product. After spending so much time building a note-taking system, I don't want AI to regenerate the entire document every time I review. The result might look neat, but it would become harder to tell what I originally wrote from what was added later. It could also overwrite an explanation I had already thought through.

I'd rather have a reason for every change: which question exposed the gap, what went wrong, and why this particular point needs to be added. If I made a careless mistake, or my notes already cover the point correctly, there's no need to add more paragraphs just to make them look “complete.” For someone who always wants completeness, learning to accept “nothing needs changing here” is surprisingly important.

## Where NoteLoop stands today

It's still a browser-based demo. PDF text is extracted locally, but scanned PDFs have no OCR, and diagrams and images cannot be reliably understood. Its diagnosis depends on the quality of the material, the questions, and my answers. Six questions can point me toward things worth revisiting; they cannot prove I've mastered an entire course. Using the tool also requires my own model API key and may incur API costs.

Even so, I'm fond of this experiment. I used to ask, “How can I make these notes better?” Now I have another, more useful question: “At what point did my understanding break down?” NoteLoop is my attempt to answer it.

[Try NoteLoop](https://rooney-yan.github.io/NoteLoop/) · [View the source](https://github.com/Rooney-YAN/NoteLoop)
