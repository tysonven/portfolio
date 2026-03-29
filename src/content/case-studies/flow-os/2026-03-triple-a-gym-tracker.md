---
title: "Triple A Gym Tracker"
slug: "triple-a-gym-tracker"
client: "Emma Maidment — Flowstates Collective"
category: "flow-os"
tags: ["react", "supabase", "vite", "vercel", "fitness", "webapp", "mobile-first", "pwa"]
date: "2026-03"
status: "published"
featured: true
stack: ["React", "Vite", "Supabase", "Recharts", "Lucide React", "Vercel", "GitHub"]
live_url: "https://triple-a-tracker.vercel.app"
sop_url: null
excerpt: "Took a messy Notion workout table and turned it into a deployed gym tracker app with Supabase backend — designed, built, and shipped in a single session."
---

<!-- HANDOFF
Documented by: Claude
Date: 2026-03-29
Status: ready-to-publish
Notes: Filed under flow-os as primary showcase. Also relevant as a personal/internal build. Screenshots needed — grab mobile views of home screen, focus mode, overview, and progress chart.
Publish to: github.com/tysonven/portfolio → src/content/case-studies/flow-os/
-->

# Triple A Gym Tracker

## The Problem

Emma's training program lived in a Notion table exported as markdown — fine on a laptop, useless on a phone at the gym. Scrolling sideways through a 6-week spreadsheet between sets isn't realistic. On top of that, the program itself needed rethinking: she'd been running a linear strength peaking cycle (reps dropping from 12 down to 2 toward a 1RM test) but her goals had shifted. She wanted to tighten up for bikini season — abs, glutes, arms — and build enough aerobic fitness to run 5km comfortably. Different goals need a different structure, and that structure needs to be usable where it matters: standing in a gym holding a phone.

## What We Built

A full-stack gym tracker webapp deployed at [triple-a-tracker.vercel.app](https://triple-a-tracker.vercel.app), purpose-built for one person and one program. The app shows one exercise at a time in focus mode — big text, big buttons, no squinting at spreadsheets. It auto-detects which week of the program you're in based on your start date, logs weights to a Supabase database, runs a rest timer that beeps when you're ready to go again, and tracks progress over time with per-exercise charts.

The training program itself was redesigned from scratch: a 6-week hypertrophy block called "Triple A" (Abs, Ass, Arms) with three gym days and one conditioning day per week. Instead of peaking toward a max lift, the periodisation stays in hypertrophy territory the whole way through — foundation phase (weeks 1–2, higher reps), build phase (weeks 3–4, more volume), and peak hypertrophy (weeks 5–6, intensity techniques like drop sets and rest-pause). Conditioning finishers are woven into every gym day so aerobic capacity builds alongside the strength work, with a dedicated running session progressing from walk/run intervals toward a full 5km by week 6.

Everything was designed, built, and deployed in a single working session.

## Tech Stack

- **React (Vite)** — Frontend framework. Vite over Next.js because there's no SSR, no routing, no API layer needed. Builds in under 3 seconds.
- **Supabase** — PostgreSQL backend for workout logs and settings. Two tables: `workout_logs` (weight/reps per exercise per session) and `workout_settings` (program start date). RLS enabled with open policies since it's a single-user app.
- **Recharts** — Progress charts showing weight progression per exercise over time.
- **Lucide React** — Icon library for the UI.
- **Vercel** — Hosting with auto-deploy from GitHub push. Zero config for Vite projects.
- **GitHub** — Source of truth at `tysonven/triple-a-tracker`.

## Key Decisions

### Hypertrophy periodisation instead of strength peaking

The original program used classic linear periodisation — start at 12 reps, drop to 10, then 8, 6, 4, 2 — designed to peak toward a 1RM. That's the opposite of what Emma needed. Her hip thrust PB is already 120kg and she's happy with it. The redesign keeps reps in the 8–15 range throughout and varies intensity through tempo manipulation, rest periods, and techniques like drop sets and rest-pause in the later weeks. This keeps her in the metabolic stress zone that drives hypertrophy rather than neural adaptation.

### Program data baked into the frontend

The exercise data is a JavaScript object inside `App.jsx`, not stored in the database. This was a deliberate simplicity choice: the program only changes every 6–8 weeks, and regenerating the data structure is a 5-minute conversation with Claude. Moving to a Supabase-driven program model with an admin editor is on the roadmap for when there are multiple users or more frequent program changes, but right now the overhead isn't justified. The architecture supports the upgrade path without any frontend rewrites.

### Conditioning built into gym days

Rather than adding separate cardio days (which feel like a chore and are easy to skip), every gym session ends with a conditioning finisher — assault bike intervals, rowing, treadmill sprints, or a dumbbell complex. This means Emma's building aerobic capacity four times a week without ever doing a "cardio day." The dedicated Day 4 running session progresses from 1:1 run/walk intervals to continuous running, but the finishers are doing most of the aerobic heavy lifting.

## Outcomes

- **Notion markdown → deployed webapp in one session.** The full pipeline: program redesign, formatted spreadsheet, React app with Supabase backend, tested and deployed to Vercel.
- **Gym-usable interface.** Focus mode shows one exercise at a time with large touch targets, auto-starting rest timer, and weight input. No pinch-zooming spreadsheets between sets.
- **Persistent tracking.** Every weight logged goes to Supabase. Progress charts show trends over time and carry across program changes — when the next 6-week block starts, the historical data stays.
- **PWA-ready.** Add to home screen on iPhone and it runs full-screen with a dark status bar. Feels native, costs nothing to distribute.
- **Repeatable workflow.** When this block ends, the next program is a conversation: share new goals, get a new `PROGRAM` object, push to GitHub, Vercel auto-deploys. No rebuilding the app.

## What I'd Do Differently

- **Start with the webapp, skip the spreadsheet.** I built a formatted xlsx first, then the app. In hindsight the spreadsheet was a stepping stone that didn't need to exist — the app replaced it immediately. Next time I'd go straight to the interactive version.
- **Add offline support from day one.** The app currently requires a network connection for Supabase reads/writes. A service worker with local-first sync would make it bulletproof for gyms with patchy WiFi. Not hard to add, just wasn't in scope for the first session.
- **Template the program structure for faster regeneration.** The `PROGRAM` data object works but it's ~150 lines of hand-structured JavaScript. A lighter config format (JSON or YAML) with a build step to hydrate it into the app would make program swaps even faster.

## Assets

- [Live App](https://triple-a-tracker.vercel.app)
- [GitHub Repo](https://github.com/tysonven/triple-a-tracker)

---

*Built by Tyson Venables — [Flow OS](https://flowos.tech) | [Flowstates Collective](https://flowstatescollective.com)*
