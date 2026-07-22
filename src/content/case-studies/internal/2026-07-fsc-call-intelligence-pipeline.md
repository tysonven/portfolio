---
title: "FSC Call Intelligence Pipeline"
slug: "fsc-call-intelligence-pipeline"
client: "Internal — Flow States Collective"
category: "internal"
tags: ["claude", "zoom", "ghl", "supabase", "vercel", "assemblyai", "automation", "sales", "call-intelligence"]
date: "2026-07"
status: "published"
featured: true
stack: ["Node.js", "Vercel", "Zoom Server-to-Server OAuth", "AssemblyAI", "Anthropic Claude Sonnet", "GoHighLevel", "Supabase", "Nodemailer"]
live_url: null
sop_url: null
excerpt: "Replaced a third-party call intelligence subscription with a fully owned, open-source-ready pipeline that captures every sales call, generates structured AI summaries, updates the CRM automatically, and delivers a follow-up email draft to the rep — all before they've closed their laptop."
---

<!-- HANDOFF
Documented by: Claude
Date: 2026-07-22
Status: ready-to-publish
Notes: All email addresses, rep names, and business-sensitive details have been redacted. Stack, architecture, and outcomes are fully publishable. Repo is currently private — update live_url and sop_url when repo goes public.
Publish to: github.com/tysonven/portfolio → src/content/case-studies/internal/
-->

# FSC Call Intelligence Pipeline

## The Problem

Flow States Collective was paying a monthly Fathom subscription to get call summaries. Beyond the subscription cost, the real drain was the 1-2 hours a closer spends after every high-ticket sales call piecing together notes, writing a follow-up email, and manually logging what happened in the CRM. That's an hour of a senior person's time spent on admin instead of closing. Multiply it across every call in a week and it becomes a meaningful operational drag.

The deeper problem: that call data was living in a third-party tool, not in the CRM where it belongs. No automatic contact matching, no timeline notes, no task creation, no routing to the right rep. Just a PDF summary that someone had to act on manually.

## What We Built

A standalone Node.js service, deployed to Vercel, that intercepts every completed call across the FSC stack and handles the entire post-call workflow automatically.

Two entry points feed one shared processing pipeline:

- **Zoom recordings** trigger via a Server-to-Server OAuth webhook when the transcript is ready
- **GHL LC Phone calls** trigger via a GHL workflow when a call completes, with the recording fetched from the GHL API and transcribed via AssemblyAI

From there, the transcript goes to Claude Sonnet, which returns a structured JSON object covering the contact details, call summary, pain points, sales signals, interest level, objections, next steps, and a ready-to-send follow-up email draft. The pipeline then matches or creates the contact in GHL, writes a formatted timeline note, conditionally creates a task if a concrete commitment was made on the call, and delivers the follow-up draft to the rep who owned the call via email — signed in their name, referencing specifics from the conversation.

Every processed call logs to Supabase with full audit trail. Duplicate webhook deliveries are deduplicated via unique constraint on the call ID.

## Tech Stack

- **Node.js + Vercel** — serverless functions for both webhook endpoints; 60s execution budget covers calls up to 45 minutes
- **Zoom Server-to-Server OAuth** — account-level app capturing recordings from all seats; `download_token` used for transcript fetch to avoid redirect auth issues
- **AssemblyAI** — synchronous polling transcription for GHL LC Phone recordings where no transcript file exists natively
- **Anthropic Claude Sonnet** — structured JSON extraction from raw transcripts; single prompt returns contact data, sales intelligence, and follow-up email draft in one call
- **GoHighLevel** — contact search and auto-create, timeline notes, conditional task creation, rep user mapping
- **Supabase** — call processing audit log with RLS enabled; deduplication via unique `external_id` constraint
- **Nodemailer** — SMTP delivery of follow-up email drafts to the owning rep

## Key Decisions

### Standalone Node.js over n8n

The obvious path was to build this in n8n, which is already running in the FSC stack. We didn't. The reason: open-source readiness. An n8n workflow requires anyone who wants to run it to have a self-hosted n8n instance with the right credentials baked in. A standalone Node.js service with a clean `.env.example` and a `docker-compose.yml` is something any team can clone, configure, and deploy in under an hour. Building it right once costs less than rewriting it later.

### download_token over OAuth for transcript fetch

Zoom's transcript download URLs respond with a 302 redirect to a CDN host. The `fetch` spec drops the `Authorization` header on cross-origin redirects — so the Bearer token was being sent correctly and then silently stripped before reaching the file server, producing a 401. The fix: Zoom's `recording.completed` webhook payload includes a `download_token` field purpose-built for downloading that event's files with no OAuth scope required. The pipeline now uses `download_token` as the primary fetch method and only falls back to the OAuth Bearer token (with a `?access_token=` query param retry) when it's absent.

### Rep routing via zoom_host_id with fallback chain

FSC runs two Zoom seats: a shared account seat and a dedicated closer seat. Routing the right call to the right rep required a lookup chain: match on `zoom_host_id` first, fall back to `ghl_user_id` for phone calls, then default to the primary rep with a `rep_fallback_default` flag in Supabase so misroutes are visible and auditable rather than silent. The mapping lives in a statically imported JS module (not a JSON file read at runtime) because Vercel's bundler only traces statically imported files into `/var/task` — runtime `fs` reads of untraced files fail silently in production.

### CRM-specific v1, abstraction in v2

GHL is hardwired in v1. The contact search, timeline note, and task creation all call GHL's API directly. This was a deliberate choice: shipping a working FSC-specific tool fast is more valuable than shipping a perfectly abstracted tool slowly. The architecture is clean enough that swapping the GHL integration module for HubSpot, Pipedrive, or a generic webhook is a contained change. That abstraction is planned for v2 when the repo goes public.

## Outcomes

Every completed sales call on the FSC stack now results in:

- A structured summary in the CRM contact timeline within minutes of the call ending
- A follow-up email draft in the rep's inbox, written in their voice, referencing specifics from the conversation
- A task created automatically when a concrete commitment was made on the call
- A full audit row in Supabase for every processed call

Fathom's Business tier (the plan with CRM sync) runs $25/seat/month with a 2-user minimum — $600/year at minimum, and it still doesn't write timeline notes, create tasks, or route summaries to the right rep automatically. That subscription is gone. The 1-2 hours of post-call admin per closer per week is gone. Call data lives in the CRM where it belongs, not in a third-party tool that has to be checked separately. The only ongoing cost is Anthropic API usage per call processed, which runs cents per transcript.

## What I'd Do Differently

**Map Zoom's webhook events before touching the Marketplace UI.** We picked the wrong event (Contact Center > Recording completed instead of Recording > Recording Transcript files have completed) based on unclear documentation, which cost two failed test call cycles and 40 minutes of debugging. A clear Zoom webhook event reference built into the spec upfront would have prevented it.

**Make `users.json` a JS module from commit one.** Vercel's bundler only traces statically imported files into `/var/task` — runtime `fs` reads of untraced files fail silently in production. Any developer with Vercel experience knows this, and the fix was straightforward once the 500 error surfaced. It should have been caught in the spec, not in production.

**Build the `download_token` path before the OAuth path.** Zoom's transcript download URLs respond with a 302 redirect to a CDN host, and the fetch spec drops the `Authorization` header on cross-origin redirects — producing a 401 that looks like a credentials problem but isn't. This is a documented Zoom API behaviour. The `download_token` included in the webhook payload is the correct fetch method. Starting there and treating OAuth as the fallback would have skipped an entire debugging cycle.

## Assets

- **Repo:** `github.com/tysonven/call-intel` (private — public release planned with v2 CRM abstraction)

---

*Built by Tyson Venables — [Flow OS](https://flowos.tech) | [Flow States Collective](https://flowstatescollective.com)*
