---
title: "SproutCode — Coding Education for the AI Era"
slug: "sproutcode-beta-launch"
client: "Internal"
category: "sproutcode"
tags: ["react", "python", "pyodide", "claude-api", "vercel", "cloudflare", "ghl", "edtech", "ai-guardrails", "kids"]
date: "2026-04"
status: "published"
featured: true
stack: ["React", "Pyodide", "Claude API", "Vercel", "Cloudflare", "GHL / LeadConnector", "Canva"]
live_url: "https://sproutcode.app"
sop_url: null
excerpt: "Built a full kids coding education platform from concept to live beta in a single day — with AI guardrails, screen time limits, and offline-first design baked in from the ground up."
---

<!-- HANDOFF
Documented by: Claude
Date: 2026-04-04
Status: ready-to-publish
Notes:
  Featured case study. No sensitive info — API keys not exposed. Live at sproutcode.app.
  Add screenshots from the beta to /assets/screenshots/sproutcode-beta-launch/
  Publish to: github.com/tysonven/portfolio → src/content/case-studies/sproutcode/
-->

# SproutCode — Coding Education for the AI Era

## The Problem

Every existing kids coding platform — Scratch, Code.org, CodeMonkey — was built before AI existed. None of them have a coherent answer to the question that every parent is quietly asking: what happens when a child can just ask ChatGPT to write the code for them? The result is a generation of kids who appear to be learning but are actually developing a dependency on AI doing their thinking for them. At the same time, screen time is a documented health crisis with no real solution built into the platforms causing it — no session limits, no eye breaks, no offline design, no blue light awareness.

## What We Built

SproutCode is a web-based coding education platform for children aged 5 to 17 with AI guardrails, conscious screen design, and offline balance built in at the architecture level — not as settings parents have to find. Three age tracks (Explorers 5-8, Builders 9-12, Innovators 13-17) each have a fully functioning lesson with real Python execution in the browser via Pyodide. Every lesson follows a WATCH → THINK → CHECK → CELEBRATE structure. The Brain-First Lock prevents the AI tutor from responding until the child has made a genuine attempt. The parent dashboard surfaces a Brain Score — the ratio of independent thinking to AI assistance — alongside session time, offline activities completed, and AI prompts used. When a session ends, the platform transitions to a nature mode and suggests personalised offline activities. A landing page at sproutcode.app captures waitlist leads directly into GHL via webhook, and a seed pitch deck was produced on the same day as launch.

## Tech Stack

* **React** — single-file app, all three age tracks and five views (Home, Dashboard, Lesson, Parent, Offline)
* **Pyodide** — Python runtime loaded from CDN, executes real student code in the browser with stdout capture
* **Claude API** — guardrailed AI tutor, strictly prohibited from writing code, capped response length by age track
* **Vercel** — deployment and hosting, CI=false environment variable to bypass strict ESLint on build
* **Cloudflare** — domain management for sproutcode.app, DNS routing, Google Workspace email setup
* **GHL / LeadConnector** — inbound webhook receives waitlist form submissions, triggers contact creation and confirmation email automation
* **Canva** — logo generation and pitch deck production via connector

## Key Decisions

### Curriculum structure and platform choice

The two biggest decisions made during the build were how to structure the curriculum so it genuinely teaches computational thinking rather than syntax memorisation, and where to build the platform. The WATCH → THINK → CHECK → CELEBRATE loop was deliberately designed around the MIT CSAIL and Stanford HAI research showing that productive struggle before AI assistance produces significantly better retention. The decision to build as a React web app rather than a native mobile app meant faster iteration, zero app store friction for beta, and immediate deployability — the right call for a product that needed real families using it within hours of the first commit.

### Brain-First Lock as the core mechanic

The decision to make the Brain-First Lock a hard architectural constraint rather than a soft suggestion was the most important product decision made. The AI literally cannot respond until a minimum character count is reached and sufficient time has elapsed. Keyboard mashing detection was added to prevent gaming the system. This mechanic is what differentiates SproutCode from every other platform — it is not a feature, it is the product.

### Naming pivot under pressure

Midway through launch day, the original name CodeSprout was found to conflict with an active competing business. The rename to SproutCode was executed immediately — domain secured at sproutcode.app via Cloudflare, social handles @sproutcodeapp locked across Instagram, YouTube, Facebook, X and LinkedIn, logo regenerated, all in-app references updated via Claude Code, and redeployed — all within the same session. The ability to move fast on a naming decision that could have derailed momentum was a critical early test.

## Outcomes

* Live product deployed to sproutcode.app on the same day as the first line of code
* 6 beta families contacted and onboarded within hours of deployment
* Real beta feedback collected, iterated, and redeployed same day across three rounds of UX fixes
* GHL waitlist capture live and tested end-to-end — leads flowing into CRM with age group segmentation from day one
* A 5 year old completed the Explorers lesson and independently went and built a LEGO set, drawing a schematic so the whole family could follow his instructions — unprompted real-world application of computational thinking
* Seed pitch deck produced and downloaded, $200K pre-seed ask with 18-month runway and clear milestone targets
* Professional email tyson@sproutcode.app operational via Google Workspace secondary domain

## What I'd Do Differently

Nothing significant at this stage. The speed of execution — concept to live product with real users in a single day — validated the approach of building in public, iterating on real feedback, and deferring polish until after validation. The one thing worth noting for future builds is to check for active competing businesses before committing to a name, which the CodeSprout to SproutCode rename reinforced as a non-negotiable early step.

## Assets

* [Live Product](https://sproutcode.app)
* [Waitlist Landing Page](https://www.sproutcode.app)
* [Instagram](https://www.instagram.com/sproutcodeapp)
* [LinkedIn](https://www.linkedin.com/company/sprout-code-app/)

---

*Built by Tyson Venables — Flow OS | Flowstates Collective*
