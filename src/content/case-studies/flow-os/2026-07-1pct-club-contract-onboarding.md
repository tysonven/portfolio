---
title: "Contract-to-Onboarding Automation — The 1% Club"
slug: "1pct-club-contract-onboarding"
client: "Internal (Flow States Collective)"
category: "flow-os"
tags: ["ghl", "automation", "contracts", "onboarding", "kollab", "sales"]
date: "2026-07"
status: "published"
featured: false
stack: ["GoHighLevel", "Kollab"]
live_url: null
sop_url: null
excerpt: "A fully automated contract-to-onboarding system for a two-tier coaching program — the right contract fires automatically on close, the client signs, and onboarding kicks off without a closer touching anything manually."
---

<!-- HANDOFF
Documented by: Claude
Date: 2026-07-21
Status: ready-to-publish
Notes: Client names, closer names, and contract values redacted. Safe to publish as-is.
Publish to: github.com/tysonven/portfolio → src/content/case-studies/flow-os/
-->

# Contract-to-Onboarding Automation — The 1% Club

## The Problem

Running a two-tier coaching program with a sales closer creates a specific operational risk: the wrong contract goes out, or the right contract goes out too slowly, and the buying energy from a strong call dissipates while someone hunts for a document. Beyond that, every manual step between close and onboarding is a point of failure -- a missed email, a late Kollab invite, a new member sitting in limbo wondering if they actually joined. At scale, that kills retention before it starts.

## What We Built

A branching GHL automation that takes a deal from closed to fully onboarded without manual intervention from the sales team. When a closer moves an opportunity to the Contract Sent stage, the workflow reads the client's membership tier and fires the correct agreement automatically. The client signs, the contract is fully executed (pre-signed company signature embedded in both templates), and the post-signing flow handles the onboarding email and community access. The closer's only job is to set the tier, move the stage, and follow up on the call.

## Tech Stack

- **GoHighLevel** -- pipeline management, document templates, workflow automation, community onboarding trigger
- **Kollab** -- community platform; default invite emails suppressed and replaced with a single branded onboarding email

## Key Decisions

### Pre-signed contract templates

Rather than building a sequential signing flow (company counter-signs after the client), both contract templates ship with the company signature already embedded as an image. The client receives a fully executed document from the company's side and signs to complete it. This eliminates a per-deal manual step for the founders and means the closer can send the payment link the moment the client signs -- no waiting, no bottleneck at the top of the org.

### Radio select custom field for tier branching

A single Membership Tier custom field (radio select, two options) sits on the contact record. The closer sets it before moving the deal. The workflow reads it and branches -- one path fires the Standard agreement, the other fires the VIP. No separate workflows, no pipeline duplication, no room for human error in template selection.

### Kollab invite suppression

Kollab's default behaviour is to send its own invite email when a member is added to a community. With a branded onboarding sequence already firing from GHL, that creates duplicate and conflicting emails at the worst possible moment -- right when a new member is forming their first impression. Default Kollab emails are disabled at the template level. One onboarding email, from the right sender, with the right message.

This is now a standing rule for any Flow OS community build: suppress Kollab defaults at the start of setup, not as a cleanup step at the end.

## Outcomes

- Contract-to-onboarding flow fully automated -- no manual document handling per deal
- Estimated time saved in excess of 2 hours per close per closer
- System is evergreen and closer-agnostic -- built to scale as calendar capacity increases
- Single branded onboarding experience regardless of tier
- Closer SOP recorded so the process is transferable to additional closers without retraining from scratch

## What I'd Do Differently

Nothing structurally -- the build is clean and the logic holds. The natural next evolution is bringing call wrap-up and follow-up email generation in-house (currently a third-party subscription) using an internal Fathom-style pipeline. That removes another tool dependency and tightens the sales team's post-call workflow further. Not a fix -- just the next layer.

## Assets

- Closer SOP: recorded via Loom (internal)

---

*Built by Tyson Venables — [Flow OS](https://flowos.tech) | [Flow States Collective](https://flowstatescollective.com)*
