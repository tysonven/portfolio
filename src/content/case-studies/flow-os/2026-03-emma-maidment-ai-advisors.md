---
title: "Emma Maidment AI Advisor Platform"
slug: "emma-maidment-ai-advisors"
client: "Emma Maidment / Flowstates Collective"
category: "flow-os"
tags: ["claude", "anthropic", "n8n", "ghl", "supabase", "stripe", "railway", "chatbot", "automation", "monetisation"]
date: "2026-03"
status: "published"
featured: true
stack: ["Claude API", "Node.js", "Express", "Supabase", "Supabase Edge Functions", "Railway", "n8n", "GoHighLevel", "Stripe", "GitHub"]
live_url: "https://advisors.flowstatescollective.com"
sop_url: null
excerpt: "Migrated two ChatGPT Custom GPTs to a fully branded, monetised AI platform with end-to-end purchase automation — built and live in two days."
---

# Emma Maidment AI Advisor Platform

## The Problem

Emma Maidment had two Custom GPTs on ChatGPT — Story Strategist™ and Magnetic Authority™ — built around her signature coaching methodologies for health entrepreneurs. They were working well enough that beta users were asking to pay for access, even as a free ChatGPT tool. But the experience was completely locked inside OpenAI's ecosystem: no branding, no monetisation, no analytics, no ownership. Emma had real IP sitting in a platform she didn't control, with no way to turn it into a revenue stream.

## What We Built

A fully custom, branded AI chat platform powered by the Anthropic Claude API — deployed on Emma's own subdomain with her colours, fonts, and bot character art. Two AI advisors built on her exact methodology and language. A credit-based monetisation model ($17 for 50 messages, $9 top-up) with a complete purchase-to-access automation requiring zero manual work from Emma. When someone buys, a unique magic link token is generated, stored in Supabase, and emailed to the customer automatically — they click the link and land directly in the platform with their credits loaded.

The platform also serves as the top of a funnel toward Emma's $497 strategy session — free users get 10 messages before being prompted to book or purchase access.

## Tech Stack

- **Anthropic Claude API (claude-sonnet-4-6)** — powers both AI advisors
- **Node.js + Express** — backend server, session management, rate limiting
- **Supabase (PostgreSQL)** — credit token storage and balance tracking
- **Supabase Edge Functions** — serverless credit API (create, activate, deduct, topup)
- **Railway** — hosting, auto-deploy from GitHub, custom domain, SSL
- **n8n** — purchase webhook handler, token generation, GHL contact update
- **GoHighLevel** — CRM, product pages, checkout, email automation
- **Stripe (via GHL)** — payment processing
- **Vanilla HTML/CSS/JS** — fast, on-brand frontend, mobile responsive

## Key Decisions

### Edge Function Architecture
The original plan connected the Railway server directly to Supabase using environment variables. Railway's container caching caused the variables to not be injected reliably — the server kept crashing despite the vars being set in the dashboard. The fix was to abstract all Supabase operations into a Supabase Edge Function. The server makes simple authenticated HTTP calls to the function, which has native database access. This eliminated the Railway dependency entirely and created a cleaner, more reusable pattern for future builds.

### Two-Workflow GHL Split
Rather than one GHL workflow that waited on n8n to respond before sending the email, we split into two. Workflow 1 fires on purchase and sends the webhook to n8n — fire and forget. Workflow 2 watches for the ai_advisor_link custom field to be populated and sends the email when it detects the change. This made the system more resilient and means a slow n8n execution never holds up the customer experience.

### Magic Link UX Over Login
No account creation, no password, no login screen. Each purchase generates a unique token embedded in a URL. The customer clicks the link in their email and lands directly in the platform with their credits loaded. Existing coaching clients get a permanent link using their access code as the token — same clean experience, unlimited access.

## Outcomes

Over 20 beta users validated the concept — many asked to pay even when it was a free ChatGPT Custom GPT. The new platform converted that demand into an actual product. The end-to-end purchase flow is fully automated: purchase → token generated → Supabase updated → GHL contact updated → magic link email sent → customer lands with 50 credits ready. Emma does nothing manually. Users consistently reported significant clarity on their brand and story positioning after a single session.

## What I'd Do Differently

- **Start with Edge Functions for all external API calls.** Any time the application server needs to talk to a database, wrapping that in a serverless function removes the environment variable dependency on the host. Would have saved several hours of debugging.
- **Key/value body parameters in n8n from the start.** The raw JSON body editor has a persistent bug that caused multiple failed executions. Key/value parameters are more reliable for dynamic values.
- **Build the post-purchase flow token-first.** The initial thank you page had a button linking to the chat without a token — meaning paid customers could accidentally land on the free tier. Always design the post-purchase UX with the token in mind from day one.

## Assets

- [Live Platform](https://advisors.flowstatescollective.com/chat.html)
- [Sales Funnel](https://go.flowstatescollective.com/ai-advisors)
- [GitHub Repo](https://github.com/tysonven/emma-ai-advisors) *(private)*

---

*Built by Tyson Venables — [Flow Os](https://flowos.tech) | [Flowstates Collective](https://flowstatescollective.com)*
