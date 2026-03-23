---
name: landing-page
description: Generate and improve marketing landing pages for specific audiences. Covers section structure, conversion copy, CTA placement, lead magnets, social proof, and trust elements. Triggers on "landing page", "marketing page", "improve the page", "conversion", "lead capture", "above the fold".
source: jezweb/claude-skills (frontend plugin)
---

Generate or improve single-page marketing sites that convert. Focused on residential builder audience and B2B services.

## Activation Triggers

"landing page", "marketing page", "improve conversion", "lead capture", "above the fold", "CTA placement", "page structure", "does this convert", "sales page"

## Section Anatomy (Optimal Order)

1. **Nav** — Logo + single CTA, hidden on load, visible on scroll
2. **Hero** — Headline + subtext + primary CTA + trust line (no hard pitch, guarantee mention)
3. **Pain/Problem** — Named, quantified pain points. Never generic. Use their language.
4. **Lead Magnet** — Calculator, quiz, or tool that gets them invested before asking for contact
5. **Solution** — Before/after framing, not feature lists
6. **How It Works** — 3–4 steps max, "done for you" framing
7. **Who It's For** — Tight qualification. Include "not right for you if..."
8. **Social Proof** — Real quotes with specifics, not generic testimonials
9. **Credibility** — Stats, numbers, credentials that matter to the audience
10. **FAQ** — Grouped by category. Address real objections.
11. **Guarantee** — Risk reversal. Be specific about what it covers.
12. **Final CTA** — Full-viewport moment. Repeat the primary offer.
13. **Footer** — Minimal. Brand + tagline.

## Conversion Psychology

### Lead Magnet Gate
Users interact with a tool (calculator, quiz) → see partial results → must submit contact info to unlock full results. This works because:
- Investment before ask (sunk cost psychology)
- Results are personalized to their data
- They already believe the numbers before you call

### Calculator Design Rules
- Sliders, not text inputs (immediate feedback)
- Show "hours lost" first (emotional) before "cost" (logical)
- Gate the monetary outputs, not the time outputs
- Blur the gated values at 8px — not hidden, just tantalizingly unreadable
- Form inside the results panel, not a separate modal

### CTA Copy Patterns
- Avoid: "Get Started", "Learn More", "Submit"
- Use: "Book a 20-Minute Conversation →", "See My Full Results →", "Apply for a Consult →"
- Trust lines under CTAs: "No hard pitch · 30-day performance guarantee"

## This Project's Audience

Australian residential builders, 5–30 homes per year. Pain points:
- Hours wasted on quotes that don't convert
- No system to qualify leads before investing time
- Phantom jobs discovered at hour 35 (budget gap)

Key message: PreBuild gives them back their time by qualifying the wrong leads out early, so the right ones move forward.

## Copy Standards

- All caps for headlines (Barlow Condensed)
- Short, punchy lines — "Stop wasting nights on quotes that were never going to happen"
- No jargon, no startup-speak — talk like a builder would
- Specifics beat vague: "40+ hours per phantom quote" not "saves time"
- Qualification is the core product — emphasize "wrong leads self-select out"

## Technical Stack (This Project)

- Vite + React 18 SPA
- Framer Motion for scroll-linked animations
- GSAP + ScrollTrigger for pinned sections
- GHL (GoHighLevel) webhook for lead capture
- CSS custom properties design system
- Fonts: Barlow Condensed (display), Barlow (body), Space Mono (mono)

## Quality Checklist

- [ ] Hero communicates value in < 5 seconds (squint test)
- [ ] Primary CTA appears above the fold
- [ ] Calculator or lead magnet creates investment before ask
- [ ] Social proof is specific (names, numbers, outcomes)
- [ ] Mobile hero readable at 375px
- [ ] No generic AI copy ("seamlessly", "leverage", "streamline")
