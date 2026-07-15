---
title: "The Margin Visibility Dashboard"
slug: "margin-visibility-dashboard"
client: "Internal"
category: "internal"
tags: ["claude", "supabase", "vercel", "full-stack", "internal-tools", "attribution"]
date: "2026-07"
status: "published"
featured: false
stack: ["Claude", "Supabase", "Vercel", "Vanilla JS", "GitHub"]
live_url: null
sop_url: null
excerpt: "A role-gated dashboard that turns invisible agency effort into a live profit-or-debt number, so the business can see which marketing work actually pays for itself."
---

<!-- HANDOFF
Documented by: Claude
Date: 2026-07-15
Status: ready-to-publish
Notes: Internal tool. All figures in the body are illustrative placeholders, not real. Repo and live deployment are both private, so no live_url or repo link is included. Screenshots can be added to /assets/screenshots/margin-visibility-dashboard/ if desired (sanitise any real project names, PINs, or client LTV before use).
Publish to: github.com/tysonven/portfolio -> src/content/case-studies/internal/
-->

# The Margin Visibility Dashboard

## The Problem

Agencies bleed money in a place nobody looks. You build a funnel, an automation, a campaign. It takes hours, often built on someone else's idea, and once it's live everyone moves on. What almost never happens is the honest reckoning: did that build earn back what those hours were worth, or did it quietly run at a loss?

The effort is real and the cost is real, but both are invisible. There was no single place to see whether a given piece of marketing work landed in profit or debt, and no way to tie the low-ticket buyers who trickled in months later back to the build that first pulled them in. Decisions about where to spend build time were being made on gut feel, not on whether the last ten builds actually paid for themselves.

## What We Built

A dashboard that makes the margin visible. Every project or campaign gets logged with the hours it consumed and the billable value of those hours, then set against the revenue it brought in. The result is a live net-ROI number per build, green when it's paying for itself, red when it's underwater.

On top of that sits a client attribution layer. When someone converts, they're tied to the build that first brought them into the business, and their lifetime value rolls up against that build. That solves the hardest part of the whole picture: crediting the people who arrive through several small offers before they ever become worth real money. A summary view rolls the whole portfolio into headline numbers so the founder, and a read-only sales team, can see at a glance where the business is winning and where it's spending time it won't get back.

## Tech Stack

- **Claude** - full build partner across the whole session: architecture, frontend, serverless functions, database schema, and a security hardening pass
- **Supabase** - Postgres storage with row-level security for projects, clients, hour logs, and rate-limit records
- **Vercel** - hosting plus serverless functions that hold every secret and enforce access server-side
- **Vanilla JS** - single-file frontend, no framework, no build step, one file to edit and deploy
- **GitHub** - source of truth, push to main auto-deploys

## Key Decisions

### Make the invisible number the whole point

The temptation with a tool like this is to build a time tracker and call it done. Time trackers tell you where hours went. They don't tell you whether those hours were worth spending. The entire design was pointed at one question instead: for this build, did revenue clear the cost of the time it took? Everything else, the categories, the status tags, the logs, exists to feed that single red-or-green figure. A founder shouldn't have to do arithmetic to know if a campaign paid off. The tool does it and shows the answer in colour.

### First-touch attribution for messy, multi-offer journeys

The real world doesn't hand you clean conversions. People buy a small thing, then another small thing, then months later become a genuinely valuable client. Attributing that value fairly is the difference between a dashboard that lies and one that's trusted. The call here was first meaningful touch: credit the build that first pulled a person into the business, and roll their full lifetime value back to it. It's defensible, it's simple to reason about, and it stops high-value clients from being invisibly credited to whatever they happened to click last.

### Ship it working, then harden it properly

The first version stored data in the browser and gated access with client-side logic. Fine for a demo, not fine for anything real. Rather than pretend that was finished, the build ran a deliberate second pass against a fixed security standard: move every secret server-side, validate every input before it reaches the database, rate-limit the login, and lock the database so it can only be reached through an authenticated function. The lesson worth keeping is that "it works" and "it's safe to hand to a team" are two different milestones, and the gap between them is where most quick internal tools quietly fail.

## Outcomes

The business went from having no answer to a question it should have been asking constantly, to having that answer update live as work gets logged. Build time can now be judged on whether it earns its keep, not on whether it felt busy. Low-ticket buyers who used to vanish into the noise now roll up to the build that earned them, so the true value of a funnel shows up even when it arrives in small pieces over time. And a read-only view means a growing sales team can see exactly where things stand without being able to touch the numbers.

It was built and hardened to a professional security standard in a single working session, which is the part worth underlining: this is what serious internal tooling looks like when AI is the build partner and the operator brings the standards.

## What I'd Do Differently

- Set the security standard as the starting spec, not the second pass. The hardening was clean, but building to it from the first line would have been faster than retrofitting.
- Decide the attribution model before the schema, not alongside it. It's the single most important design choice in the whole tool and it deserved to be settled first.
- Bake in a lightweight way to export the summary, so the margin picture can be dropped into a monthly review without a screenshot.

## Assets

- Internal tool. Repository and live deployment are both private.
- Sanitised screenshots available on request.

---

*Built by Tyson Venables. [Flow OS](https://flowos.tech) | [Flowstates Collective](https://flowstatescollective.com)*
