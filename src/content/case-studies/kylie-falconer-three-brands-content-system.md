---
title: "Content system for Kylie Falconer: add goodness, Bare & Wilde, KX Pilates"
subtitle: "A voice-first content architecture across three distinct wellness brands"
date: "2026-07-29"
client: "Kylie Falconer"
service: "DFY Content System"
stack: ["Claude Projects", "Notion", "Kajabi", "GHL", "Loom"]
featured: true
draft: true
---

## The situation

Kylie Falconer runs three brands. Each one is distinct, each one has real momentum, and each one demands its own voice.

**add goodness** is her nervous system and breathwork education platform, delivered through Kajabi. Warm authority, intelligent, grounding. It sits at the intersection of neuroscience and felt experience, and the audience is time-poor corporate decision makers, entrepreneurs, and juggling parents who want credible answers to why their bodies aren't cooperating.

**Bare & Wilde** is her handmade wellness ecommerce brand. Slow, sensory, sanctuary-coded. Australian-made products for people who want rituals that actually work and beautiful things on their bathroom shelf. Restraint over saturation. Quiet luxury over loud premium.

**KX Pilates** is her chain of movement studios. A different beast again, running its own established brand identity through the KX corporate team, with Kylie's content adding a founder-led layer on top.

Three brands, one founder, one VA. And every piece of content — captions, emails, blog posts, product descriptions — was going through Kylie personally because voice was the bottleneck. She'd been writing all of it herself and it sounded like her. But hours a week were disappearing into drafting that she needed for the work only she could do: strategy, relationships, running the studios.

She needed a system that could hold her voice without her being in every draft.

## What we built

A four-layer content system architecture that solved for voice consistency across three brands without requiring Kylie in every generation.

### Layer 1: Brand voice files

Three foundation documents. One per brand. Each captured the voice at a level of specificity that removed ambiguity from every future decision about what to write.

Each brand voice file included:

- Five voice adjectives and five anti-voice adjectives (what the brand explicitly wasn't)
- Vocabulary the brand used freely
- Words and phrases banned from the brand
- An audience map with problem language and solution language separated
- Tone calibration: formality, emoji usage, sales energy, personal-to-business ratio
- Sentence patterns and rhythm
- Format rules for captions, emails, blog posts, and product descriptions
- Content pillars
- Off-limits topics
- Reference voices and anti-references (the accounts to learn from and the anti-patterns to avoid)
- A visual identity section (for the brand with formal guidelines)

These files became the source of truth. Every generation, every review, every training moment referenced them.

### Layer 2: Claude Projects

Two dedicated Claude Projects — one for add goodness, one for Bare & Wilde. KX Pilates content leans on both, using a shorter appendix that captures the KX-specific angle without needing a full separate project.

Each project loaded with:

- The full brand voice file as project knowledge
- A personalised prompts file (captions, emails, blogs, product descriptions, repurposing prompts, strategy prompts) also as project knowledge
- The System Prompt Block from the voice file as project custom instructions

The result: when Kylie opened either project and asked for a caption, Claude already knew the voice. She didn't need to remind it, describe it, or fight it.

Voice match testing before handoff landed around 96% across both brands — high enough that Kylie could ship most output without revision and the remaining 4% needed only light calibration.

### Layer 3: Notion workspace

A structured Notion workspace served as the storage and workflow layer. Every piece of content moved through a defined status pipeline: Idea → In draft → Awaiting review → Approved → Scheduled → Published → Archived.

The workspace included:

- **Content Hub** — the main database. 16 properties tracking brand, format, pillar, status, dates, and content. 10 views for different workflow states and brand-specific filtering.
- **Pillars** — a reference database of the seven content pillars mapped across the three brands (three shared, two specific to add goodness, two specific to Bare & Wilde).
- **Offers & Promotions** — a live view of what was being sold, when, and at what price. Included specific upcoming launches like the Bare & Wilde Spring Box and add goodness course drops.
- **Brand Assets** — colour palettes, marks, and design references for add goodness (the brand with formal guidelines already in place).
- **Claude Prompts** — a centralised page holding every prompt in copy-ready code blocks, for daily use.
- **Home dashboard and How to Use This System page** — the SOP and quick-reference layer.

Two relations wired the databases together: content records could link to specific offers, and content pieces could reference source material they were repurposed from.

### Layer 4: The distribution layer

Content moved out through Kajabi (for add goodness email and the digital library), GHL (for Bare & Wilde email and social planning after a mid-project migration from Klaviyo), and direct posting for social platforms.

Deliberately, we didn't over-engineer this layer. The manual handoff from Notion to the platforms was a quality gate, not a friction point. It caught last-minute voice issues before content went live.

## The role split

The most consequential decision in the build was the role split. We called it:

**"Kylie writes, Monica ships."**

Kylie held the creative work: drafting in Claude, reviewing, approving. Monica (her VA) held the operational work: managing Notion, moving content through the pipeline, sending emails, publishing to social platforms.

Neither role touched the other's tools. Monica never needed to open Claude. Kylie never needed to touch platform-side settings.

This wasn't just tidy delegation. It was the design principle that made the system durable. Kylie's time was protected for what only she could do. Monica's role was fully documented, learnable, and self-contained. If Monica changed roles, someone new could pick up the operational side from the SOP alone.

## The handoff pack

We delivered:

- Three brand voice files (add goodness, Bare & Wilde, KX Pilates appendix)
- Two operational Claude Projects with voice files, prompts, and custom instructions loaded
- The full Notion workspace with all databases, views, and populated reference data
- A 20-section personalised SOP covering every workflow, decision protocol, breakage response, and 30-day rollout plan
- Three walkthrough videos: the system in three minutes, drafting in Claude, moving content through Notion
- Sample content across every format for immediate use
- Email templates for both platforms
- A pre-drafted three-email soft-restart sequence for the Bare & Wilde list ahead of the Spring Box launch
- Two weeks of email support post-handoff

The Notion workspace transferred via one-click duplication into Kylie's account. The Claude Projects were rebuilt live in her account during the handoff call, with all voice files and prompts uploaded on the call.

## What made it work

Three architectural decisions that separated this build from a lighter template-and-prompts approach.

### 1. The brand voice file as source of truth

We resisted the temptation to make the Claude prompts the source of truth. Prompts get edited, forgotten, drifted. Voice files stay canonical.

Every prompt in the system references the voice file. If the voice needs to change, the voice file changes, and the prompts inherit the shift automatically because they read from it.

This meant Kylie could refine her brand voice over time without rebuilding her prompts. Small update to the voice file, System Prompt Block re-paste, and every future generation reflected the change.

### 2. The two-copy problem, named explicitly

Prompts lived in two places: inside each Claude Project as knowledge files, and in a Notion page for daily copy-paste use.

Rather than pretending that wasn't a maintenance risk, we named it explicitly in the SOP and at the top of the Notion prompts page. If you update one place, update the other. This kept Kylie aware of the small maintenance overhead rather than discovering it through drift.

### 3. Sandbox records staged for the walkthrough videos

The videos we recorded showed the system as it would look in real use, not as an empty database. Six realistic sample content records populated the Content Hub so views actually had records to demonstrate, the publishing calendar showed dated items, and the by-pillar board showed real distribution across the seven pillars.

That decision took an extra hour of staging and made the videos immediately useful as training tools rather than tours of an empty shell.

## The delivery moment

At handoff, Kylie was thrilled with what she'd received. She and Monica were on the call together, and Monica had already watched the training videos ahead of time — a signal that the training material worked as designed and that Monica was engaged with the operational role.

The system covered every daily and weekly workflow. The role split was clear enough that both people knew what they owned. The voice consistency across three distinct brands was strong enough that content would sound like Kylie from day one.

## What's next

Kylie's business continues to evolve. New offerings, seasonal launches, new revenue streams. The system was designed to absorb that evolution without breaking:

- New products and offers get added to the Offers database
- New content pillars can be added when they emerge
- Brand voice files can refine over time
- The workflow scales up when volume increases

For founders who reach a ceiling on manual scheduling or want deeper integration between Claude and their commercial platforms, we build additional operational layers. That work becomes its own conversation, sized to what the business needs.

## Architecture summary

For anyone considering a similar build, the pattern was:

1. **Voice first.** Get the brand voice file rigorous before writing a single prompt.
2. **One Claude Project per brand.** Not per format. The project knows the brand; the format is a prompt variable.
3. **Notion as the workflow spine.** Every piece of content lives here from idea to archive.
4. **The role split, named.** Who writes, who ships, who approves.
5. **Manual quality gates, not automated pipelines.** Especially at the point of publishing.
6. **A written SOP plus short walkthrough videos.** The video shows the mental model. The SOP is the reference. Different jobs.

The result is a content system that respects both the founder's creative time and the operational reality of running multi-brand businesses.

---

*Built by Flow States Collective for Kylie Falconer, founder of add goodness, Bare & Wilde, and operator of KX Pilates studios. Published with permission. Sample outputs and specific voice file contents withheld to protect Kylie's brand voice IP.*
