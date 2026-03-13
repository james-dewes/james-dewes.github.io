---
layout: post
title: Getting to grips with Claude Code
sub-title: First impressions of agentic development in a data engineering workflow
excerpt: "A few weeks into using Claude Code as part of our development workflow — what works, what doesn't, and how persistent memory and peer review have changed the way I work."
categories: [development]
tags: [claude-code, ai, agentic-development, data-engineering, developer-tools, workflow, llm]
---

Over the last few weeks Claude Code has been integrated into our workflow following consultation and business wide training.
I have been using cursor in a limited capacity to date, mostly as a more intelligent auto complete, so an introduction to agentic development with Claude code was an incredible accelerator. I have been using it largely in the terminal because that’s where I find it most useful, where it has made me capable of supervising the execution of multiple agent tasks at the same time.

Admittedly it’s not perfect. Some of this is down to the level of supervision it needs, with a tendency to repeat earlier mistakes and it is more difficult to exclude it from sensitive files than I would like, global settings work and the [.claudeignore package](https://github.com/li-zhixin/claude-ignore) looks promising, but feels like something that should be part of enterprise software by default.

One of my most effective approaches has been directing Claude to generate a persistent memory of my professional style and technical approach. By combining context from across multiple projects the model provides more consistent outputs that match my established patterns. This reduces the cognitive load during review and prevents overlong explanation in responses. Consider asking it to interview you about the stack.

In addition to generation, I’ve integrated Claude into my workflow as a peer reviewer, reducing the burden on the wider team by producing more consistent PRs. When comparing it to other ecosystems, I find the choice is task-dependent. Gemini remains my preferred AI system for broad, knowledge-driven synthesis, but Claude excels within my specific data engineering domain. Its ability to ingest skills and context at execution is a significant benefit. 
Ultimately, the shift toward agentic tools like Claude Code represents a fundamental change in the data engineering landscape. By offloading the heavy lifting to the agent while maintaining a supervisory role I have been able to focus on more strategic and design decisions. As I continue to refine my local context and push the boundaries of what these agents can handle, it isn't just about writing code faster, it’s increasing the complexity of the problems I can solve.

