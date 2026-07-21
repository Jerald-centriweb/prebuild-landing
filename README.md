# PreBuild — Landing Page

Marketing landing page for **PreBuild**, a lead-qualification system for Australian residential builders.

> **AI assistants:** Edit `prebuild-react/` only. This is the canonical source; it deploys to builder.centriweb.com. See `PROJECT-MAP.md` for the full map.

**Live:** https://builder.centriweb.com

---

## Quick Start

```bash
cd prebuild-react
npm install
npm run dev
# → http://localhost:5173
```

**Production build:**
```bash
npm run build
# ✓ ~450 modules, output to dist/
```

---

## Project Overview

### What PreBuild Does
PreBuild installs a structured front-end qualification process for residential builders — so unqualified leads self-select out before the builder invests 20–40 hours quoting a job that was never going to happen.

**Core pain point we're solving:** Builders spend 40+ hours on quotes for clients with 30–60% budget gaps, discovered at hour 35, not hour zero.

### Page Sections (in order)
1. **Hero** — Cinematic scroll-driven intro with video background
2. **Problem** — Pain points, quantified (3,200 AU builders insolvent in 2024)
3. **Calculator** — Interactive cost calculator (lead magnet / contact capture)
4. **Solution** — Before/after framing
5. **How It Works** — 3-step process
6. **Who It's For** — Audience qualification
7. **Proof** — Testimonials / social proof
8. **Credibility** — Stats and credentials
9. **FAQ** — Objection handling
10. **Guarantee** — 30-day performance guarantee
11. **Final CTA** — "Apply for a Consult" + "Book a Call"
12. **Footer**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React 18 |
| Animations | Framer Motion v12 |
| Advanced scroll | GSAP + ScrollTrigger |
| Styling | CSS custom properties (no Tailwind) |
| Lead capture | n8n webhook |
| CRM | GoHighLevel (GHL) |
| Fonts | Barlow Condensed, Barlow, Space Mono |

---

## Key Integrations

### Calculator → n8n Webhook
When a user submits their details in the calculator gate form, data posts to:
```
POST https://n8n.centriweb.com/webhook/b74e323d-2237-42d0-87a8-e9c6133f8dd9
```

Payload includes full contact info + calculated metrics (annual hours lost, cost, savings projection).

**n8n must be configured to:**
- Create/update contact in GHL
- Send personalised email with the free resource
- Tag contact with `prebuild_calculator` source

### Survey Modal (Apply for Consult)
GHL survey embed: `https://link.centriweb.com/widget/survey/PKQMr5xuouVI0GdmlprM`
Trigger via: `window.dispatchEvent(new Event('open-survey'))`

### Booking Modal (Book a Call)
GHL calendar embed: `https://app.centriweb.com/v2/preview/BYkk5duBQAbZCbJFgWQY`
⚠️ **Currently a preview URL** — swap to live URL before production launch.
Trigger via: `window.dispatchEvent(new Event('open-booking'))`

---

## What's Done ✅

- [x] Full 13-section landing page
- [x] Cinematic hero scroll (350vh sticky, video scrub, line-by-line reveals)
- [x] Interactive cost calculator with SVG ring gauge
- [x] All calculator metrics gated behind contact form
- [x] n8n webhook integration
- [x] Survey modal (GHL embed)
- [x] Booking modal (GHL embed)
- [x] Dual CTA: "Apply for a Consult" + "Book a Call"
- [x] Mobile responsive layout
- [x] Production build passing (0 errors)

---

## What Needs Doing ⚠️

### Before Launch
- [ ] **n8n workflow** — Wire up webhook → GHL contact creation → email send
- [ ] **Free resource** — Create the PDF/guide that gets emailed after calculator submission
- [ ] **GHL Booking URL** — Replace preview URL with live published calendar URL
- [ ] **Real testimonials** — Replace any placeholder social proof with actual builder quotes

### After Launch
- [ ] **Analytics** — Add GA4 or GTM
- [ ] **SEO** — Meta tags, OG image
- [ ] **Performance** — Compress hero video, add poster image
- [ ] **Deploy pipeline** — Vercel or Netlify CI/CD

---

## File Structure

```
prebuild-react/src/
├── App.jsx                    ← Section order, modal registration
├── components/
│   ├── Hero.jsx               ← Scroll-driven hero (most complex)
│   ├── CalculatorSection.jsx  ← Lead magnet calculator (most critical)
│   ├── BookingModal.jsx       ← Book a call popup
│   ├── SurveyModal.jsx        ← Apply for consult popup
│   ├── FinalCTA.jsx           ← Dual CTA section
│   ├── FadeUp.jsx             ← Reusable animation wrappers
│   └── [other sections]
└── styles/
    └── globals.css            ← Full CSS design system
```

---

## Claude Code Setup

This project is set up for **Claude Code** (Anthropic's AI coding assistant).

**Dev server config:** `.claude/launch.json`

**Custom skills** in `.claude/skills/`:
- `landing-page` — Conversion copy, CTA placement, lead magnet design
- `scroll-experience` — Scroll pacing, cinematic UX, parallax
- `motion` — Framer Motion patterns and best practices
- `design-review` — Visual design audit

Full project context for Claude: see `CLAUDE.md` in this directory.

---

## Brand Voice

- Direct and specific: "40+ hours per phantom quote" not "wasted time"
- Builder-friendly: no startup jargon
- Trust through numbers: "3,200 AU builders insolvent in 2024"
- Honest CTAs: "Apply for a Consult" not "Get Started Free"
- Guarantee prominent: "30-day performance guarantee"

---

## Contact

Owner: Jerald Immanuel — Centriweb
GHL sub-account: Centriweb
Server: `builder.centriweb.com` (cPanel, port 65002)
