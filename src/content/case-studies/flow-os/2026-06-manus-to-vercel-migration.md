---
title: "Owning the Stack: Migrating a Gated Course Off Manus to Vercel"
slug: "manus-to-vercel-migration"
client: "Flow States Collective"
category: "flow-os"
tags: ["platform-migration", "vercel", "security-audit", "claude-code", "ghl", "lead-generation", "react", "vite"]
date: "2026-06"
status: "published"
featured: true
stack: ["Vite", "React", "TypeScript", "Tailwind CSS", "Vercel", "GitHub", "GoHighLevel", "GTM", "Claude Code"]
live_url: "https://manus.flowstatescollective.com"
sop_url: null
excerpt: "Lifting a gated, lead-capturing course off a no-code platform onto a self-hosted Vercel app I actually own — dropping 64 security vulnerabilities to zero and a 372 kB payload to 5 kB on the way out."
---

<!-- HANDOFF
Documented by: Claude
Date: 2026-06-09
Status: ready-to-publish
Notes: Redaction applied — no GHL form ID/name, no GTM/GA4/Meta IDs (spam risk). Live URL is public and approved. Repo is private, so no public GitHub link is included. Add screenshots to /assets/screenshots/manus-to-vercel-migration/ before publish if available.
Publish to: github.com/tysonven/portfolio → src/content/case-studies/flow-os/
-->

# Owning the Stack: Migrating a Gated Course Off Manus to Vercel

## The Problem

The Manus AI Mastery Hub is a seven-step gated guide — a lead magnet for Flow States Collective that hands over a free prompt pack in exchange for an email. The catch: it lived entirely inside Manus, a no-code AI site builder. Cancelling the subscription meant losing the page; keeping it meant paying for the platform and burning tokens just to make edits.

The deeper problem wasn't cost, it was ownership. The page was served by someone else's runtime, with their trackers baked into it, and the "export" they offered wasn't really the source. For an asset whose entire job is to capture leads and represent the brand, that's exactly the kind of dependency you don't want sitting on a subdomain you care about.

## What We Built

A self-hosted, self-owned version of the course with no platform lock-in:

- Recovered the **real React source** (not the platform's compiled output) and stood it up as a clean Vite single-page app on Vercel, at the brand's own subdomain.
- Ran a full **six-phase security and cleanup audit** before anything went live.
- Rebuilt the **email gate** so it reliably unlocks the gated steps and fires conversion tracking — something the original version effectively never did.
- Wired the **custom domain and DNS** so the brand owns the URL outright, with pushes to GitHub auto-deploying to production.

## Tech Stack

- **Vite + React + TypeScript** — the app itself, rebuilt from recovered source rather than the platform's build artifact.
- **Tailwind CSS** — styling, preserved exactly from the original design.
- **Vercel** — static hosting, preview deploys per branch, and the custom domain.
- **GitHub** — single source of truth; every push auto-deploys.
- **GoHighLevel** — the embedded lead-capture form feeding the CRM.
- **Google Tag Manager / GA4 / Meta** — conversion tracking that fires on unlock.
- **Claude Code** — ran the security audit and implemented the fixes on a branch.
- **Claude** — planning, debugging, and coordinating the migration end to end.

## Key Decisions

### Find the real source, not the compiled corpse

The first export looked complete but was just the platform's build output — minified bundles with the actual content rendered at runtime, none of it editable. That's half the trap of leaving a no-code tool: what it hands you often isn't the thing you built. The migration only became real once the genuine source repo was identified and confirmed. The lesson generalises to any platform exit — before you migrate anything, verify you have *source*, not a screenshot of source.

### Stop fighting the platform's postMessage — redirect with a param

The gated steps unlock after a visitor submits the embedded GoHighLevel form. The inherited approach listened for a `postMessage` from the form's iframe — which is notoriously unreliable for embedded GHL forms. In testing, real submissions left users staring at a "LOCKED" panel with no way forward except a hidden fallback button that only appeared after a delay. The fix was to stop trusting the fragile in-page message: on submit, the form redirects back to the same page with a `?gate=unlocked` flag, which the app reads on load to unlock the content, then strips from the URL. Boring, and it works every single time.

### Treat the migration as a security event, not a copy-paste

A no-code export drags the platform's runtime and trackers along with it. Rather than ship that, the move off-platform doubled as a hardening pass: a 372 kB inline runtime script removed, a surveillance/debug script and its endpoint stripped, the form's message handler tightened to validate its origin, a Content-Security-Policy and security headers added, and 40 unused packages dropped — including one library responsible for most of the high-severity advisories that was used nowhere in the app. Leaving a platform is the right moment to shed everything you don't actually need.

## Outcomes

- **Security vulnerabilities: 64 → 0** (was 1 critical, 24 high)
- **Production HTML payload: 372 kB → 5 kB**
- **Runtime dependencies: 52 → 12**
- **Source files: 69 → 14**
- **~4 hours** end to end, from trapped page to live self-hosted app
- **Subscription cost and platform lock-in eliminated** — the course now runs on infrastructure the brand owns, edited freely through Git and deployed automatically
- **A lead gate that actually converts and reports** — unlock and conversion tracking now fire on every genuine submission, where the original quietly failed

## What I'd Do Differently

- **Confirm the source repo before touching anything.** A chunk of early effort went into the wrong, compiled-output export. "Do we actually have the real source?" is the first question to answer, not something to discover halfway in.
- **Reach for redirect-with-param on embedded forms from the start.** The `postMessage` route is the seductive "clean" option, and trusting it cost a round of confused testing. With GHL embeds specifically, redirect-with-a-flag is the reliable default — go there first.

## Assets

- [Live site](https://manus.flowstatescollective.com)
- Source: private repository (Vite / React / TypeScript), with the full audit report committed alongside the code.

---

*Built by Tyson Venables — [Flow OS](https://flowos.tech) | [Flowstates Collective](https://flowstatescollective.com)*
