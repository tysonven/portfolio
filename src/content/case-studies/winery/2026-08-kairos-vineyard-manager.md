---
title: "Kairos Vineyard Manager"
slug: "kairos-vineyard-manager"
client: "Kairos Wines (Internal)"
category: "winery"
tags: ["astro", "supabase", "vercel", "claude", "anthropic", "biodynamic", "agriculture", "full-stack", "ai", "web-app"]
date: "2026-08"
status: "published"
featured: true
stack: ["Astro 7", "Supabase", "Vercel", "Anthropic Claude Opus 4.6", "Open-Meteo API", "Cloudflare DNS"]
live_url: "https://app.kairos-wines.com"
sop_url: null
excerpt: "A purpose-built vineyard management tool for small-batch natural winemakers, built from two seasons of hands-on experience and the hard lesson that the right tool at the right moment changes everything."
---

<!-- HANDOFF
Documented by: Claude
Date: 2026-08-04
Status: ready-to-publish
Notes: Screenshots committed to /assets/screenshots/kairos-vineyard-manager/ in same repo.
Publish to: github.com/tysonven/portfolio -> src/content/case-studies/winery/2026-08-kairos-vineyard-manager.md
-->

# Kairos Vineyard Manager

## The Problem

Running a small biodynamic vineyard is an information-dense discipline. Every decision — when to spray, when to prune, when to harvest, which preparation to apply — depends on a layered intersection of moon phase, weather conditions, vine health, disease pressure, and accumulated seasonal knowledge. For two seasons at Kairos Wines, that knowledge lived in scattered chat conversations, paper notes, and memory. When a powdery mildew outbreak hit in 2026 and spread across 95% of the vineyard before it could be fully contained, the cost of not having the right information in the right place at the right time became impossible to ignore. No tool existed for this type of operation. Industrial vineyard software is built for scale. Everything else is a notebook.

## What We Built

A full-stack vineyard management web app at `app.kairos-wines.com` — purpose-built for small-batch natural and biodynamic wine production. It gives two people, working the same vineyard from different angles, a single place to plan, log, and learn from every season.

The app opens on a Today view that tells you immediately what kind of day it is: the biodynamic day type (fruit, root, flower, or leaf), current moon phase and whether the moon is ascending or descending, live weather at the vineyard's exact elevation, spray cycle status, and tasks due this week.

![Today view showing BD day type, live weather at vineyard elevation, and spray countdown](/assets/screenshots/kairos-vineyard-manager/today-dashboard.png)

A Week view shows the full 7-day forward picture so Monday morning planning takes minutes rather than hours. It identifies the best spray day, best soil work day, and next BD preparation window for the week ahead.

![Week view showing 7-day BD planning, best spray day, and monthly companion planting notes](/assets/screenshots/kairos-vineyard-manager/week-view.png)

Every day in the calendar carries four layers of information: BD day type, moon phase, ascending/descending indicator, and logged activity dots.

![Calendar with four layers per day including moon phase, BD type, and ascending/descending moon](/assets/screenshots/kairos-vineyard-manager/calendar.png)

Beyond the planning layer, the app covers: activity logging with full 2025 and 2026 seasonal history, spray tracking with rotation logic and sulphur-condition warnings, a Brix tracker with ripeness curves per variety, vine-by-vine condition mapping across all 12 rows, an AI-powered field scanner, weather integration with temperature and wind-speed spray warnings, a contacts directory of winemakers, suppliers, nurseries and advisors, and a forward task list running through to April 2027.

![Field scan with AI agronomic analysis and photo library](/assets/screenshots/kairos-vineyard-manager/field-scan.png)

![Brix tracker showing ripeness curves per variety with harvest readiness targets](/assets/screenshots/kairos-vineyard-manager/brix-tracker.png)

## Tech Stack

- **Astro 7** — server-rendered framework; chosen over Astro 5 due to an unpatched auth bypass in the 5.x adapter
- **Supabase** — PostgreSQL database with row-level security, Supabase Auth (email/password and GitHub OAuth), and private storage for field scan photos
- **Vercel** — deployment and serverless functions; auto-deploys from main branch
- **Anthropic Claude Opus 4.6** — AI vision model for field scan analysis; called server-side only to keep the CSP closed
- **Open-Meteo API** — free, no-key weather API queried for the vineyard's exact coordinates (35.2321N, 24.5447E, 661m elevation); fetched server-side on a 15-minute cache
- **Cloudflare DNS** — DNS management for app.kairos-wines.com; grey cloud (DNS only) for SSL issuance

## Key Decisions

### True astronomical declination, not a phase-based shortcut

The biodynamic calendar distinguishes between ascending and descending moon — sap rising versus sap falling — which determines whether BD500 (soil application) or BD501 (foliar spray) should be applied. The obvious implementation maps ascending to the first 14 days of the lunar cycle and descending to the rest. When measured against a full year of 2026 data, that shortcut agreed with reality on 50.1% of days — a coin flip. The reason is that declination runs on the 27.32-day tropical month while phase runs on the 29.53-day synodic month. They drift continuously and never stay aligned. Shipping the shortcut would have scheduled the two principal BD preparations incorrectly for roughly half the season while displaying confident arrows. True lunar declination was implemented using the Meeus astronomical algorithm, validated against the published example (computed: -3.229126, reference: -3.2270). This is the detail that separates a useful planning tool from a misleading one.

### Server-side AI proxy with a closed CSP

The field scan feature sends vineyard photos to Claude Opus 4.6 for agronomic analysis. The naive implementation would call the Anthropic API directly from the browser, which requires either exposing the API key in client code or widening the Content Security Policy to allow browser connections to a third-party origin. Instead, the API call goes through a server-side route with rate limiting (20 requests/hour per user), input validation, and magic-byte image sniffing. The CSP stays at `connect-src 'self'`. An over-permission that had been sitting in the original build (an unnecessary `https://*.supabase.co` in connect-src) was caught and removed during this process.

### Allowlist-pinned RLS for shared vineyard data

Supabase's Row Level Security defaults to per-user data isolation. A vineyard shared between two people needs both users to see the same records without making the data publicly accessible. The solution is an allowlist table (`vineyard_authorised_users`) checked on every authenticated request. Any user not on the allowlist is refused at the policy level, even with a valid session. The allowlist is seeded manually in the Supabase dashboard — onboarding is intentionally manual and controlled rather than open to self-signup.

### Two real security defects caught during build

A security gate script running 13 checks before every deploy caught two defects that reading source code alone would not have found. First: session cookies were readable from JavaScript. The `@supabase/ssr` package defaults `httpOnly: false`, and a spread order error meant the explicit `httpOnly: true` was being silently overridden. Only inspecting an actual `Set-Cookie` header in production caught it. Second: the rate limiter on the AI scan endpoint had a TOCTOU race condition. The original read-then-check pattern allowed parallel requests to all read the same count and all pass. Fixed with a single atomic `INSERT ... ON CONFLICT ... RETURNING`.

## Outcomes

Kairos Wines now has a planning tool that reflects how a biodynamic vineyard actually operates. Opening the app on Monday morning gives an immediate answer to the question every small producer faces before going up to the vines: what should I do today, and why?

Two seasons of vineyard records and winemaking logs are searchable and permanent rather than scattered across conversations. The 2026 spray programme, mildew outbreak data, bunch counts, veraison observations, and variety replacement decisions are all logged and timestamped. The 2025 fermentation logs for the Rosé, Shiraz, and Cabernet field blend are in the system. The forward task list runs to April 2027 with the critical budburst spray date flagged explicitly, because that is where the last two seasons were lost.

The field scanner has already identified smooth sow-thistle and wild carrot in the vineyard from photos taken in the rows, with soil health notes attached to each identification. The weather widget correctly reported that the entire week of 4-10 August 2026 had no clear spray window due to temperature and wind, and recommended the least bad day rather than pretending an ideal window existed.

The most important outcome is not a feature. It is the discipline of logging. Two people now have one place.

## What I'd Do Differently

**Start earlier.** The tool should have existed before the first vintage. The 2025 mildew outbreak, the stuck ferments, the press failing on harvest day — none of those outcomes would necessarily have changed, but the learning from them would have been captured properly rather than reconstructed from memory months later. For any serious small-scale producer, the record is the asset.

**Build the spray rotation logic before the first spray.** The 10-day alternating cycle between sulphur, potassium bicarbonate, and cinnamon oil is not complicated. But without a tool tracking it, the cycle slips. In 2026 it slipped, and the mildew pressure that had been building since April became visible in July. The dashboard now makes the cycle impossible to ignore.

## Assets

- [Live app](https://app.kairos-wines.com)
- [Kairos Wines](https://kairos-wines.com)

---

*Built by Tyson Venables — [Flow OS](https://flowos.tech) | [Flowstates Collective](https://flowstatescollective.com)*
