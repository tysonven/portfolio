---
title: "Productising Client Onboarding"
slug: "2026-04-flow-os-intake-system"
client: "Internal (Flow States Collective)"
category: "flow-os"
tags: ["n8n", "ghl", "vercel", "automation", "client-onboarding", "multi-tenant"]
date: "2026-04"
status: "published"
featured: false
stack: ["Vercel", "n8n", "GoHighLevel", "Vanilla HTML/CSS/JS", "GitHub", "GoDaddy DNS"]
live_url: "https://intake.flowstatescollective.com"
sop_url: null
excerpt: "A multi-tenant client intake system that replaced ad-hoc email scoping with structured onboarding, auto-creating CRM contacts and notifying the team in one motion."
---

<!-- HANDOFF
Documented by: Claude
Date: 2026-04-27
Status: ready-to-publish
Notes: Cross-posted to both internal/ and flow-os/ categories per Tyson. If portfolio routing supports a categories[] array in frontmatter, prefer that over file duplication. Client name anonymised by request; brand types kept (Pilates studio, Kajabi course business, Shopify store).
Publish to: github.com/tysonven/portfolio → src/content/case-studies/internal/ AND src/content/case-studies/flow-os/
-->

# Productising Client Onboarding

![The intake form welcome screen](/screenshots/2026-04-flow-os-intake-system/01-welcome.png)

## The Problem

Client intake was happening over email. A new client would say yes to a build, then we'd swap a dozen messages over a week to scope brand voice, audience, offers, access, goals, the lot. Half the time something critical landed three days into the actual build, when going back to ask felt like admitting I should have asked sooner. The other half, scope drifted because nothing was written down in one place.

Generic third-party form tools (GHL native forms, Typeform, Tally) solved part of the structure problem but broke the premium feel of the brand. Bringing a client through the door of a polished website and dropping them into a generic SaaS form is the kind of small thing that quietly costs you trust.

What was missing was a system: a branded, structured, low-friction intake that scaled to every future client and dropped data straight into the place I'd actually use it.

## What We Built

A custom-branded, multi-tenant client intake system live at a dedicated subdomain.

- A 16-section, 80+ question multi-step web form with auto-save and resume, deployed as a static site to Vercel
- Custom domain, premium typography, fully on-brand for Flow States Collective
- An n8n workflow that receives submissions, formats the data, creates or updates a contact in GoHighLevel, attaches the full intake as a structured note, and sends a notification email
- Honeypot spam protection plus IP-based rate limiting at the workflow layer
- Multi-tenant architecture from day one: each client lives at their own subpath (`/kylie`, `/sally`, `/dani`), making future onboarding a folder duplication exercise rather than a rebuild

![Intake submission landing as a structured note on the GHL contact](/screenshots/2026-04-flow-os-intake-system/02-ghl-contact.png)

The first deployment went out the same session: form designed, deployed, n8n workflow built, end-to-end smoke test passed, ready to send to the first client. That client is a multi-business fitness professional running a Pilates studio chain, a Kajabi-hosted course business, and a Shopify ecommerce store, who needed a complete content system across three brands.

## Tech Stack

- **Vercel** — static hosting, GitHub integration, automatic deploys on push, free SSL
- **Vanilla HTML, CSS, JS** — no framework, no build pipeline, deployable as a single file
- **Montserrat + Raleway** — typography matched to Flow States Collective brand
- **n8n (self-hosted)** — workflow engine handling the form-to-CRM pipeline
- **GoHighLevel** — CRM, contact storage, and notification email transport
- **GitHub** — source control, with multi-tenant repo structure
- **GoDaddy DNS** — subdomain CNAME to Vercel

## Key Decisions

### Vanilla HTML over a framework

The form is fundamentally a long static document with light client-side state (auto-save, step navigation, validation). React or Next would add a build pipeline, dependency management, and roughly 200KB of overhead for zero functional benefit. A single HTML file with embedded CSS and JS deploys instantly, has no build to break, and renders identically on any browser without a hydration step. This is the kind of decision that looks lazy until you watch a framework upgrade silently break a client-facing form six months in.

### Multi-tenant subpath architecture from the first build

It would have been faster to hardcode the form for the first client and worry about reuse later. Instead the project structure was set up from the first commit to support multiple clients: `/kylie/index.html` rather than just `index.html`, with the page logic externalised into a config block at the top. Adding the second client now takes about 30 minutes (duplicate folder, edit four constants, swap question schema if needed, push). The cost of building it this way was about 15 minutes of forethought. It pays back on every future client.

### Email via GoHighLevel's conversations API instead of standing up SMTP

The obvious instinct was to add a SendGrid or Resend integration for the notification email. Instead, since GHL's conversations API was already wired up to handle outbound messaging, we routed the notification email through it using an internal contact as the message recipient. Result: no new SMTP credential, no new env var, no new failure mode, and the email lands in the same inbox as everything else. The trick is documented as a reusable internal pattern.

## Outcomes

- **Single-session ship**: from "we should fix this" to "form is live, workflow tested, ready to send" in a few hours of focused work
- **Reusable infrastructure**: the next client onboarding (already booked) becomes a 30-minute duplication rather than a rebuild
- **Structured intake replaces email sprawl**: 80+ questions covering brand, audience, offers, access, goals, all landing in one place, in one CRM record, in one motion
- **Premium aesthetic preserved**: clients move through the funnel in branded surfaces end-to-end, no SaaS form chrome breaking the experience
- **Security baked in**: honeypot spam blocking, IP rate limiting, no credentials in client code, GHL credentials in vault, environment-aware CORS, all checked against a 7-pillar security framework before the workflow went live

## What I'd Do Differently

A few things became obvious only after shipping. Each is a small fix for the next iteration rather than a redesign.

The form questions are currently hardcoded per client. The next iteration should be schema-driven: a single dynamic form that loads its question array from a Supabase row or JSON file based on a URL parameter (`?c=kylie`). Premature now, obvious after client three.

The n8n workflow has location IDs hardcoded into the JSON because the n8n container doesn't currently load the same `.env` that lives on the application server. That should have been consolidated upfront with a docker-compose `env_file` directive. Working around it cost no time on this build, but creates friction every time a workflow gets duplicated.

The webhook is currently protected by honeypot and rate limiting, which is plenty for a low-volume form sent only to known clients via a private link. If this ever opens up to higher-volume use, an HMAC signature verification layer should sit in front of the workflow, with the signing key shared between the form and n8n via the credential vault.

## Assets

- Live form: [intake.flowstatescollective.com](https://intake.flowstatescollective.com)
- Source: private repo (available on request)

---

*Built by Tyson Venables — [Flow OS](https://flowos.tech) | [Flowstates Collective](https://flowstatescollective.com)*
