# PreBuild Landing Page — Full Project Context

> This is the primary context file for Claude Code. Read this entire file before making any changes.
> It is intentionally comprehensive — it contains embedded skill knowledge so no external skills are required.

---

## 1. What This Project Is

**PreBuild** is a marketing landing page for an Australian residential builder lead-qualification service.

**The product:** PreBuild installs a structured front-end qualification process for builders — so unqualified leads self-select out early, before the builder invests 20–40 hours quoting a job that was never going to happen.

**Target audience:** Australian residential builders doing 5–30 homes per year.

**Core message:** "Stop wasting nights on quotes that were never going to happen."

**Business model:** PreBuild is a done-for-you service. The builder's front-end process — first response, qualification calls, preliminary commitment — is structured and delivered by PreBuild, allowing the builder to focus on building, not chasing dead enquiries.

**Owner:** Jerald Immanuel — Centriweb

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite 5 + React 18 SPA |
| Animations | Framer Motion v12 (`framer-motion` package) |
| Advanced scroll | GSAP 3 + ScrollTrigger (installed, used in HowItWorks) |
| Styling | CSS custom properties only — no Tailwind |
| Lead capture | n8n webhook → GHL (GoHighLevel) CRM |
| Survey embed | GHL survey widget (iframe) |
| Booking embed | GHL calendar page (iframe) |
| Fonts | Barlow Condensed (display), Barlow (body), Space Mono (mono), Merriweather (serif callouts) |

**Dev server:** `npm run dev` inside `prebuild-react/` → port 5173

**Build:** `npm run build` inside `prebuild-react/` → compiles to `dist/` (434KB JS, 36KB CSS)

**Launch config for preview tool:** `.claude/launch.json` → `preview_start("prebuild-dev")`

---

## 3. File Structure

```
trajan/
├── CLAUDE.md                        ← You are here (read first, always)
├── README.md                        ← Human-readable team overview
├── .gitignore
├── .claude/
│   ├── launch.json                  ← Dev server config for Claude preview tool
│   └── skills/                      ← Custom Claude Code skills (optional - knowledge embedded below)
│       ├── landing-page/SKILL.md
│       ├── scroll-experience/SKILL.md
│       ├── motion/SKILL.md
│       └── design-review/SKILL.md
├── prebuild-react/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx                  ← Section order, modal registration
│       ├── main.jsx
│       ├── components/
│       │   ├── Nav.jsx              ← Sticky nav, fades in on scroll past hero
│       │   ├── Hero.jsx             ← ★ Cinematic scroll-driven hero (most complex)
│       │   ├── ProblemSection.jsx   ← Split layout: sticky left, scroll-animated cards right
│       │   ├── CalculatorSection.jsx← ★ PRIMARY LEAD MAGNET — gated cost calculator
│       │   ├── SolutionSection.jsx  ← Before/after outcome cards (dark section)
│       │   ├── HowItWorks.jsx       ← 3-step process with GSAP
│       │   ├── WhoSection.jsx       ← Audience qualification
│       │   ├── ProofSection.jsx     ← Testimonials (needs real content)
│       │   ├── CredibilitySection.jsx
│       │   ├── FAQSection.jsx
│       │   ├── GuaranteeSection.jsx ← 30-day performance guarantee
│       │   ├── FinalCTA.jsx         ← Dual CTA: Apply for Consult + Book a Call
│       │   ├── Footer.jsx
│       │   ├── FadeUp.jsx           ← Reusable animation wrappers (FadeUp, RevealBlur, StaggerReveal, SlideIn)
│       │   ├── SurveyModal.jsx      ← GHL survey popup ("Apply for a Consult")
│       │   └── BookingModal.jsx     ← GHL booking calendar popup ("Book a Call")
│       └── styles/
│           └── globals.css          ← Complete CSS design system (1900+ lines)
└── docs/
    ├── DESIGN-EVOLUTION-PLAN.md
    └── IMPLEMENTATION-BRIEF.md
```

---

## 4. Section Order (App.jsx)

```jsx
<Nav />
<Hero />
<ProblemSection />
<CalculatorSection />      ← Lead magnet — captures contact info
<SolutionSection />
<HowItWorks />
<WhoSection />
<ProofSection />
<CredibilitySection />
<FAQSection />
<GuaranteeSection />
<FinalCTA />               ← Dual CTA: survey OR booking
<Footer />
<SurveyModal />            ← Global modal, triggered by window event
<BookingModal />           ← Global modal, triggered by window event
```

All modals sit outside the normal flow and listen for custom window events:
- `window.dispatchEvent(new Event('open-survey'))` → opens SurveyModal
- `window.dispatchEvent(new Event('open-booking'))` → opens BookingModal

---

## 5. Design System

### Colour Tokens (from globals.css `:root`)
```css
/* Brand */
--blue-400:  #2F7FD4   /* Primary CTA, links, ring gauge (moderate) */
--blue-600:  #1A5FAA   /* Hover state */

/* Neutrals */
--slate-900: #111820   /* Dark section backgrounds, hero, calc-right */
--steel-400: #8A96A3   /* Muted labels, subtext */
--steel-200: #DDE2E8   /* Borders, slider tracks */
--steel-600: #4A5563   /* Secondary text */
--steel-800: #1E2630   /* Body text on white */

/* Accents */
--amber-400: #E8A020   /* High severity warning */
--red-400:   #C0392B   /* Critical severity */
--green-400: #2E8B57   /* Success, savings */

/* Surfaces */
--white:     #FFFFFF
--page-bg:   #F8F9FB   /* Light section background */
```

### Typography
```css
--display: 'Barlow Condensed', sans-serif  /* All headlines, numbers, eyebrows */
--body:    'Barlow', sans-serif             /* All body text */
--mono:    'Space Mono', monospace          /* Labels, tags, data points */
--serif:   'Merriweather', serif            /* Callout quotes only */
```

**Text sizes:**
- Hero H1: `clamp(56px, 8vw, 96px)`, `font-weight: 800`, uppercase, `--display`
- Section H2: `clamp(36px, 5vw, 60px)`, `font-weight: 800`
- Body: `16px`, `line-height: 1.7`
- Section leads: `18px`, `line-height: 1.65`
- Mono labels/eyebrows: `11px`, `letter-spacing: 0.08em`, uppercase

### Layout Container
```css
.wrap-lg { max-width: 1096px; margin: 0 auto; padding: 0 32px; }
```

### Section Surfaces
```css
.s-dark   { background: var(--slate-900); color: var(--white); }    /* hero, solution, final CTA */
.s-light  { background: var(--page-bg); }                           /* credibility, who */
.s-white  { background: var(--white); }                             /* calculator left panel */
```

Dark sections (`.s-dark`) have a subtle blueprint grid overlay via `::before` (40px repeating lines at 7% opacity).

### Button Styles
```css
.btn-primary  — Blue filled, sharp corners, mono font, uppercase tracking
.btn-book-call — Outlined, blue border and text, calendar icon
```

---

## 6. Animation System

> This section is embedded skill knowledge. Follow these patterns for ALL animation work.

### Animation Library: Framer Motion

Package: `framer-motion` (v12, already installed). Import from `'framer-motion'`.

```jsx
import { motion, AnimatePresence, useScroll, useTransform, useSpring,
         useMotionValueEvent, useInView } from 'framer-motion'
```

### Standard Easing Curve
All transitions in this project use:
```jsx
ease: [0.16, 1, 0.3, 1]   // Custom spring-like ease — snappy in, smooth out
```

### Reusable Animation Wrappers (FadeUp.jsx)
These are already built — use them instead of writing animations inline:

```jsx
import { FadeUp, RevealBlur, StaggerReveal, staggerItem, SlideIn } from './FadeUp'

// FadeUp: simple scroll-triggered entrance (opacity 0→1, y 13→0)
<FadeUp delay={0.08}>
  <p>Content fades up when it enters viewport</p>
</FadeUp>

// RevealBlur: headline entrance with blur-to-sharp
<RevealBlur delay={0.12}>
  <h2>Headline appears with cinematic blur reveal</h2>
</RevealBlur>

// StaggerReveal: container that staggers children
<StaggerReveal stagger={0.08} delayStart={0.1}>
  <motion.div variants={staggerItem}>Item 1</motion.div>
  <motion.div variants={staggerItem}>Item 2</motion.div>
</StaggerReveal>

// SlideIn: horizontal entrance
<SlideIn direction="left" delay={0.1}>
  <div>Slides in from left</div>
</SlideIn>
```

**Critical:** `FadeUp` and `RevealBlur` use `useInView` (Intersection Observer). They fire when the element enters the viewport organically — they will NOT trigger from `scrollIntoView()` instant jumps in preview tools.

### AnimatePresence (for show/hide transitions)
Use this pattern for any conditional rendering that needs exit animations:

```jsx
import { AnimatePresence } from 'framer-motion'

<AnimatePresence mode="wait">
  {condition ? (
    <motion.div
      key="a"                                           // key is REQUIRED
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
    />
  ) : (
    <motion.div
      key="b"                                           // different key
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

**Rules:**
1. `AnimatePresence` must stay mounted — never wrap it in a conditional
2. All direct children must have unique `key` props
3. `mode="wait"` — waits for exit before entering. `mode="sync"` — both at once.

### Scroll-Linked Animations (useTransform)

For elements whose style changes as the user scrolls:

```jsx
const { scrollY } = useScroll()  // Raw pixels from page top

// Map scrollY to a CSS value
const opacity = useTransform(scrollY, [0, 200], [0, 1])      // Input range → output range
const y       = useTransform(scrollY, [0, 400], [30, 0])
const blur    = useTransform(scrollY, [0, 200], [10, 0])
const filter  = useTransform(blur, (v) => `blur(${v}px)`)    // Derived transform

<motion.div style={{ opacity, y, filter }}>...</motion.div>
```

**This project uses raw `scrollY` (absolute pixels) NOT `scrollYProgress` (0–1 percentages) for the hero.** This gives pixel-perfect, viewport-size-independent control.

**CRITICAL RULE:** Never call `useTransform` inside `.map()` — React hooks cannot be called conditionally or in loops. Derive all values at the top of the component, store in arrays, reference by index:

```jsx
// ❌ Wrong
LINES.map((line, i) => {
  const opacity = useTransform(scrollY, [...], [...])  // BREAKS — hook in loop
})

// ✅ Correct — all hooks at top level
const opacity0 = useTransform(scrollY, [0, 120], [0, 1])
const opacity1 = useTransform(scrollY, [60, 200], [0, 1])
const transforms = [{ opacity: opacity0 }, { opacity: opacity1 }]
LINES.map((line, i) => <motion.div style={transforms[i]} />)
```

### Spring Smoothing
For fluid motion that follows scroll with natural lag:

```jsx
const smoothScroll = useSpring(scrollY, { stiffness: 40, damping: 20, mass: 1 })
// Use smoothScroll (not scrollY) for video scrub — feels physical, not mechanical
```

### Performance Rules
- Only animate `opacity`, `transform` (x, y, scale, rotate) — never `width`, `height`, `top`, `left`
- For blur filters: always derive `filter` string from `useTransform` — never animate `filter` directly as a motion value string
- Add `will-change: transform` only on actively animating hero elements
- Video scrub: always gate on `videoReady` state

---

## 7. Hero.jsx — Deep Technical Reference

The hero is a **350vh sticky scroll container**. At 800px viewport height that's ~2800px of scroll. The viewport stays fixed while the user scrolls through virtual space — everything is scroll-driven.

### Architecture
```jsx
<section className="hero-container" ref={containerRef}>   {/* 350vh tall */}
  <div className="hero-sticky">                           {/* position: sticky, 100vh */}
    <video />                                              {/* scrubs with scroll */}
    <div className="hero-content" style={{ opacity, scale, y }}>  {/* fades out */}
      <h1>                                                 {/* lines reveal staggered */}
      <div style={{ opacity: subOpacity }}>               {/* subtext + CTA */}
    </div>
    <div className="hero-stats-overlay">                  {/* reveals after hero fades */}
  </div>
</section>
```

### Scroll Pacing (absolute pixels — raw scrollY)
| Scroll position | Event |
|---|---|
| 0 → 120px | Line 1 headline: blur 10px→0, opacity 0→1, y 30→0 |
| 60 → 200px | Line 2 reveals |
| 140 → 280px | Line 3 (accent colour) reveals |
| 220 → 380px | Subtext + "Apply for a Consult" CTA fades in |
| **380 → 1000px** | **★ HOLD — full hero readable, video scrubs, no transitions** |
| 800 → 1600px | Hero content begins scaling down (0.88) and moving up (-80px) |
| 1000 → 1600px | Hero content opacity: 1 → 0 |
| 1300 → 1500px | Stat 1 appears (opacity 0→1, y 40→0) |
| 1500 → 1700px | Stat 2 appears |
| 1700 → 1900px | Stat 3 appears |
| 0 → 2500px | Video scale: 1 → 1.15 (slow zoom) |
| 0 → 1800 → 2500px | Video opacity: 0.35 → 0.2 → 0.08 |

### Video Scrub
```jsx
const smoothScroll = useSpring(scrollY, { stiffness: 40, damping: 20, mass: 1 })
useMotionValueEvent(smoothScroll, 'change', (v) => {
  if (videoRef.current && videoReady) {
    const progress = Math.min(v / containerRef.current.offsetHeight, 1)
    requestAnimationFrame(() => {
      videoRef.current.currentTime = progress * videoRef.current.duration * 0.8
    })
  }
})
```

### Stats Content
```js
{ num: '40+',    unit: 'hrs',  label: 'Lost per phantom quote',       sub: "At $150/hr — that's $6k per job that goes nowhere" }
{ num: '3,200',  unit: '',     label: 'AU builders insolvent in 2024', sub: 'Margins under 10%. Every wasted hour is a direct hit.' }
{ num: '30–60%', unit: '',     label: 'Budget gap homeowners carry',   sub: 'Discovered at hour 35 — not hour zero.' }
```

---

## 8. CalculatorSection.jsx — Primary Lead Magnet

This is the most important section. It's a cost calculator that gates ALL results until the user submits contact info.

### Layout
Two-column grid (`.calc-panel`):
- **Left `.calc-sliders`** — White background, 4 interactive sliders
- **Right `.calc-right`** — Dark background (`--slate-900`), ring gauge + gate form or results

On mobile (<768px): stacks to single column.

### Sliders
| ID | Label | Min | Max | Step | Default |
|---|---|---|---|---|---|
| c1 | Quotes per year | 5 | 100 | 1 | 30 |
| c2 | Jobs won per year | 1 | 50 | 1 | 8 |
| c3 | Hours per quote | 5 | 60 | 1 | 20 hrs |
| c4 | Hourly rate (AUD) | 80 | 400 | 10 | $150 |

### Derived Metrics (`useMemo`)
```js
const lost         = quotes - won                               // Jobs that didn't convert
const hrs          = lost × hours_per_quote                    // Annual hours wasted
const cost         = hrs × hourly_rate                         // Annual dollar cost
const perJob       = (quotes × hrs × rate) / won               // Overhead per won job
const winRate      = (won / quotes) × 100                      // Current win rate %
const severity     = cost > 150000 ? 'critical'                // Ring/badge colour tier
                   : cost > 80000  ? 'high' : 'moderate'
const improvedRate = Math.min(winRate + 15, 85)                // PreBuild projection
const savedHrs     = hrs - (improved_lost × hours × 0.4)       // Hours recovered
const savedCost    = savedHrs × hourly_rate                    // Dollar savings
```

### Ring Gauge (SVG)
```jsx
const ringCircumference = 2 * Math.PI * 90   // r=90 SVG circle
const ringPct    = Math.min(cost / 300000, 1) // Fill % (max at $300k)
const ringOffset = ringCircumference * (1 - ringPct)

<motion.circle
  strokeDasharray={ringCircumference}
  strokeDashoffset={ringOffset}        // Animated by Framer Motion on value change
  stroke={severityColor}               // blue / amber / red based on severity
  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
/>
```

### Gate Logic (AnimatePresence mode="wait")
```
Locked state  → ring shows "YOUR NUMBERS ARE READY 🔒" + blurred preview row + gate form
Unlocked state → ring shows real "$XX,XXX" + metrics grid + email confirmation
```

Gate form requires: **name + email + phone** (required), company (required), website (optional).

On submit: POST to n8n webhook → 800ms delay → `setUnlocked(true)`

### Blurred Preview Row
Shows three card placeholders with `▓▓▓` characters styled with `filter: blur(12px)` + opacity 0.4. Labels are visible ("HOURS LOST", "ANNUAL COST", "PER JOB") — the value is hidden. This creates psychological desire to see the real numbers.

### Value Proposition in Gate Form
```
UNLOCK YOUR PERSONALISED RESULTS
✓ Full cost breakdown based on your numbers
✓ What you could save with a structured front-end
✓ A free resource you can action today to start fixing this
```

### Post-Unlock Email Confirmation
```
✉ Your full breakdown + a free resource to start improving today is on its way to [email]
```

### Webhook Payload (full structure)
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "website": "string (optional)",
  "source": "prebuild_calculator",
  "metrics": {
    "quotes_per_year": 30,
    "jobs_won": 8,
    "hours_per_quote": 20,
    "hourly_rate": 150,
    "annual_hours_lost": 440,
    "annual_cost_lost": 66000,
    "cost_per_job": 112500,
    "win_rate": 27,
    "projected_savings": 52680
  }
}
```

---

## 9. Modals

### SurveyModal.jsx — "Apply for a Consult"
- **Trigger:** `window.dispatchEvent(new Event('open-survey'))`
- **Embed:** GHL survey widget via `<iframe src="https://link.centriweb.com/widget/survey/PKQMr5xuouVI0GdmlprM" />`
- Dynamically loads `form_embed.js` script on first open
- Backdrop click or ✕ button closes it
- Does NOT lock body scroll (minor issue — see Pending section)

### BookingModal.jsx — "Book a Call"
- **Trigger:** `window.dispatchEvent(new Event('open-booking'))`
- **Embed:** GHL funnel page via `<iframe src="https://app.centriweb.com/v2/preview/BYkk5duBQAbZCbJFgWQY" />`
- ⚠️ **This is a GHL preview URL — it must be replaced with the live published URL before launch**
- Locks `document.body.overflow = 'hidden'` when open
- Spring entrance: `{ scale: 0.95→1, opacity: 0→1, y: 40→0 }`
- Has a header section with title "Book a Call" and subtitle

### Modal Open Pattern (how to add more modals)
```jsx
// 1. Add event listener
window.addEventListener('open-[name]', () => setIsOpen(true))

// 2. Dispatch from any component
window.dispatchEvent(new Event('open-[name]'))

// 3. Wrap in AnimatePresence
<AnimatePresence>
  {isOpen && <motion.div key="overlay" ... />}
</AnimatePresence>
```

---

## 10. Integrations

### n8n → GHL Webhook

**n8n webhook URL (already wired into CalculatorSection.jsx):**
```
POST https://n8n.centriweb.com/webhook/b74e323d-2237-42d0-87a8-e9c6133f8dd9
```

**What needs to be built in n8n (not done yet):**
1. Trigger: Webhook node receives calculator payload
2. Action: Create or update contact in GHL sub-account (Centriweb) with:
   - Name, email, phone, company, website from form
   - Custom fields: annual_cost_lost, quotes_per_year, win_rate, projected_savings
   - Source tag: `prebuild_calculator`
   - Pipeline: Add to "PreBuild Enquiries" pipeline at stage "Calculator Lead"
3. Action: Send automated email from GHL with:
   - Subject: "Your PreBuild results + a resource for today" (or similar)
   - Body: Personalised with their `annual_cost_lost` and `projected_savings` figures
   - Attachment or link: The free resource PDF (see Pending section)
4. Action: Assign to Jerald in GHL for follow-up task in 1 business day

**n8n access:** `https://n8n.centriweb.com` (owner has credentials)

### GHL (GoHighLevel) Sub-Account: Centriweb

| Integration | URL | Status |
|---|---|---|
| Survey (Apply for Consult) | `https://link.centriweb.com/widget/survey/PKQMr5xuouVI0GdmlprM` | ✅ Live |
| Booking calendar | `https://app.centriweb.com/v2/preview/BYkk5duBQAbZCbJFgWQY` | ⚠️ Preview only — needs live URL |
| Calculator webhook receiver | Needs n8n workflow + GHL contact creation | ❌ Not built |

### cPanel Hosting (for deployment)
```
Host:  builder.centriweb.com
SSH:   port 65002, user: u167611500
Path:  /home/u167611500/domains/builder.centriweb.com/public_html/
```
Credentials are in `.claude/settings.local.json` (gitignored — ask owner).

---

## 11. What Has Been Built ✅

### Session 1 (March 20–21, 2026) — Foundation
- Full 13-section landing page with all copy written
- Cinematic hero: 350vh sticky container, video scrub, scroll-driven line-by-line reveal
- Hero scroll pacing verified across all key positions
- Navigation: sticky, hidden until user scrolls past hero
- Full CSS design system: custom properties, all component styles
- `FadeUp`, `RevealBlur`, `StaggerReveal`, `SlideIn` animation wrappers
- ProblemSection: sticky left column + scroll-animated pain point cards
- CalculatorSection v1: basic calculator with single gated metric
- SolutionSection: before/after outcome cards
- HowItWorks, WhoSection, ProofSection, CredibilitySection
- FAQSection, GuaranteeSection, FinalCTA, Footer
- SurveyModal: GHL survey embedded as iframe popup

### Session 2 (March 21–23, 2026) — Lead Magnet Refinement + 3rd CTA
- Body text size increase: 15→16px base, 17→18px section leads
- **Calculator section redesigned 3 times:**
  - v1: 3-column layout, only 1 metric gated — psychologically too weak
  - v2: 2 metrics gated — still not enough friction
  - v3 (current): 2-column layout, ALL metrics gated, blurred ▓▓▓ previews, free resource angle
- Calculator now posts full payload to n8n webhook
- **BookingModal created:** GHL booking page as iframe popup
- **FinalCTA updated:** Dual CTAs with "or" divider — "Apply for a Consult" + "Book a Call"
- App.jsx: BookingModal registered
- Production build verified: 450 modules, 0 errors, 0 console errors
- `.gitignore` fixed: `.claude/` directory now tracked, `settings.local.json` excluded

---

## 12. What Still Needs To Be Done ⚠️

### 🔴 Critical (Required Before Launch)

#### 1. n8n Workflow — Calculator Lead → GHL Contact
**File to edit:** None in this repo — this is a backend n8n workflow
**What to build:**
- Open `https://n8n.centriweb.com`
- Create a workflow triggered by the calculator webhook
- Use an HTTP Request or GHL node to create a contact in GHL with the full payload (see Section 10)
- Use a GHL Email node to send the personalised follow-up email
- Email must reference the lead's actual numbers: `annual_cost_lost`, `projected_savings`
- Email must include or link to the Free Resource (item 2 below)

#### 2. Free Resource — PDF Guide
**What it is:** A practical PDF that delivers immediate value to builders who submitted their calculator results. It was promised in the calculator value stack: "A free resource you can action today to start fixing this."

**Suggested content:**
- Title: "The Builder's Front-End Checklist" or "5 Questions That Qualify Every Enquiry"
- 3–5 actionable steps a builder can use RIGHT NOW to start qualifying leads better
- Brief explanation of what a structured front-end looks like
- Positioned as "a preview of what PreBuild installs for you"
- Should reference PreBuild at the end with a CTA to book a call

**Delivery:** Hosted in GHL or as a file link. Attached to or linked from the automated email.

#### 3. GHL Booking URL — Replace Preview with Live
**File:** `prebuild-react/src/components/BookingModal.jsx` line 52

```jsx
// Current (BROKEN for lead capture — preview doesn't save submissions):
src="https://app.centriweb.com/v2/preview/BYkk5duBQAbZCbJFgWQY"

// Replace with the live published GHL funnel/calendar URL, e.g.:
src="https://link.centriweb.com/widget/booking/[your-calendar-id]"
// OR the published funnel URL from GHL Funnels tab
```

**How to get the live URL:**
1. Open GHL → Funnels & Websites → find "BYkk5duBQAbZCbJFgWQY" funnel
2. Click Publish → copy the live URL
3. Replace the `src` value in BookingModal.jsx

#### 4. Real Testimonials / Social Proof
**File:** `prebuild-react/src/components/ProofSection.jsx`

The ProofSection may contain placeholder testimonials. These need to be replaced with real builder quotes that include:
- Builder's name and type of build (e.g., "custom homes, Sydney")
- Specific outcome metric (e.g., "Cut quoting time from 40hrs to 12hrs in 8 weeks")
- Genuine language — no marketing speak

---

### 🟡 Important (Shortly After Launch)

#### 5. SurveyModal — Body Scroll Lock Missing
**File:** `prebuild-react/src/components/SurveyModal.jsx`

Currently, SurveyModal does NOT lock `document.body.overflow`. BookingModal does. This inconsistency means the user can accidentally scroll the page behind the survey modal on mobile.

**Fix:** Add this `useEffect` to SurveyModal (same as BookingModal already has):
```jsx
useEffect(() => {
  if (isOpen) { document.body.style.overflow = 'hidden' }
  else { document.body.style.overflow = '' }
  return () => { document.body.style.overflow = '' }
}, [isOpen])
```

#### 6. Analytics
No tracking is installed. Before driving traffic:
- Add GA4 or GTM via `index.html` `<head>`
- Track calculator form submissions as conversion events
- Track modal opens (survey, booking) as micro-conversions
- GHL attribution: ensure calculator webhook includes UTM params if present

#### 7. SEO Meta Tags
**File:** `prebuild-react/index.html`
```html
<!-- Add to <head>: -->
<title>PreBuild | Stop Wasting Time on Quotes That Won't Win</title>
<meta name="description" content="PreBuild installs a structured front-end qualification system for Australian residential builders. Stop spending nights on phantom quotes.">
<meta property="og:title" content="PreBuild | Stop Wasting Time on Quotes That Won't Win">
<meta property="og:description" content="...">
<meta property="og:image" content="/images/og-image.png">  <!-- needs to be created -->
<meta property="og:url" content="https://builder.centriweb.com">
```

#### 8. Hero Video Performance
**File:** `prebuild-react/public/video/Cinematic_Luxury_Home_Formation_Background.mp4`

This is a large video file loaded on page init with `preload="auto"`. On mobile/slow connections this blocks perceived performance.
- Compress video: target <5MB (use HandBrake, CRF 28, 720p)
- Add `poster="/images/hero-poster.jpg"` to the `<video>` tag — shows while video loads
- Consider `preload="metadata"` on mobile via JS media query

#### 9. HowItWorks.jsx GSAP Verification
**File:** `prebuild-react/src/components/HowItWorks.jsx`

This component uses GSAP ScrollTrigger for pinned step animations. Verify:
- It doesn't conflict with Framer Motion's scroll listeners
- The pin release doesn't cause a layout jump
- It works on iOS Safari (ScrollTrigger has known iOS quirks — use `refreshPriority` if needed)
- Cleanup: confirm `ctx.revert()` is called in useEffect cleanup

---

### 🟢 Eventual (Nice to Have)

#### 10. Visual Assets
Several sections would benefit from custom illustrations:
- **SolutionSection:** A simple diagram showing "Enquiry → PreBuild Qualification → Builder receives qualified lead"
- **HowItWorks:** Step icons (wireframe-style to match brand aesthetic)
- **OG image:** 1200×630px branded share image
- The owner has access to Google AI Studio for AI-generated images

#### 11. Deploy Pipeline
Currently no CI/CD. Options:
- **Vercel (recommended):** Connect GitHub repo, auto-deploys on push to `main`
- **Netlify:** Same simplicity
- **cPanel (manual):** SSH upload `dist/` folder contents to `public_html/`
  ```bash
  cd prebuild-react && npm run build
  # Then SFTP dist/ to builder.centriweb.com/public_html/
  ```

#### 12. Nav Link Visibility
Current nav has "COST CALCULATOR", "HOW IT WORKS", "FAQ" links. These are hidden on mobile. Confirm the hamburger menu (if any) or that mobile users see the CTA button prominently enough.

---

## 13. Scroll Experience Guidelines

> Follow these rules for any work on scroll animations or section transitions.

### Core Philosophy
Every section change should feel like a scene cut — not a standard webpage scroll. The page has a cinematic quality: elements reveal with purpose, hold long enough to read, and transition without jank.

### Scroll-Linked vs. Viewport-Triggered
| Technique | When to use | Implementation |
|---|---|---|
| `useTransform(scrollY, ...)` | Hero only — pixel-precise control | Raw scrollY values |
| `useInView` / `FadeUp` | Most sections — "fire once on entry" | Already in `FadeUp.jsx` |
| `scrollYProgress` + target ref | Per-element parallax on specific cards | `useScroll({ target: ref, offset: [...] })` |
| GSAP ScrollTrigger | Pinned sequences (HowItWorks) | `gsap.context()` with cleanup |

### FadeUp vs. RevealBlur
- **FadeUp:** Use for body text, supporting elements, buttons, cards
  - y: 13→0, opacity: 0→1, duration: 0.52s
- **RevealBlur:** Use for H2 headlines and primary callout text ONLY
  - blur: 8→0, y: 30→0, opacity: 0→1, duration: 0.85s

### Section Header Pattern (consistent across all sections)
```jsx
<FadeUp>
  <span className="eyebrow-tag">Short descriptor</span>
</FadeUp>
<RevealBlur delay={0.08}>
  <h2>Main headline</h2>
</RevealBlur>
<FadeUp delay={0.16}>
  <p className="[section]-lead">Supporting body text</p>
</FadeUp>
```

### Don't break these rules
1. No simultaneous entrance of more than 3 elements — stagger by 0.1–0.15s
2. No animation on `width`, `height`, `top`, `left` — transform and opacity only
3. No `useTransform` inside `.map()` loops
4. Mobile: never horizontal overflow. All animations must respect `overflow-x: hidden` on body
5. Stagger children by 0.08–0.12s maximum — faster than that feels mechanical

---

## 14. Landing Page Copy Standards

> Follow these rules for any new copy or copy edits.

### Voice
- Direct, no fluff: "That number doesn't have to be yours."
- Builder-friendly: talk like a tradie, not a startup founder
- Specific beats vague: "40+ hours per phantom quote" not "wasted time"
- Honest: "30-day performance guarantee" — state what it covers
- No jargon: never use "leverage", "seamlessly", "streamline", "game-changer", "unlock your potential"

### Headline Formula
Barlow Condensed, uppercase, tight leading. Short lines. 3–5 words per line. Accent on the key word.

```
STOP WASTING NIGHTS
ON QUOTES THAT WERE
NEVER GOING TO HAPPEN.
                  ↑ accent colour (blue)
```

### CTA Copy
- ❌ "Get Started", "Learn More", "Submit", "Sign Up"
- ✅ "Apply for a Consult →", "See My Results →", "Book a Call", "See What This Looks Like Solved →"

### Trust Lines (under CTAs)
Always include a trust line:
- "No hard pitch · 30-day performance guarantee"
- "No spam. No third parties. Just your numbers."
- "No obligation · No pitch · Available within 2 business days"

### Pain Point Language
Real pain points on this page (do not change — these are tested):
- "Budget reality shows up at hour 35 of your quote"
- "Asking for a commitment feels awkward without a process"
- "Good leads and bad leads look identical at the start"

---

## 15. Design Review Standards

> Follow this checklist when reviewing or making visual changes.

### The 5 Non-Negotiables
1. **Spacing scale:** Everything aligns to an 8px grid. No arbitrary spacing values.
2. **Typography hierarchy:** H1 > H2 > body > caption. Never same weight for two different levels.
3. **Contrast:** Text on dark: minimum white at 70% opacity. Text on light: `--steel-800` (#1E2630).
4. **Transitions:** Nothing instant. Minimum 200ms for hover states. `transition: 0.2s ease` on buttons.
5. **Mobile first:** Check at 375px width. Everything readable. No horizontal scroll.

### This Project Specifically
- Dark sections must maintain the subtle blueprint grid (`.s-dark::before`) — do not override with `overflow: hidden` unless the section content explicitly needs it
- All section headers use the eyebrow tag + H2 + lead copy pattern — maintain consistency
- Eyebrow tags: `.eyebrow-tag` class — mono font, small uppercase, light blue background, blue text
- The accent colour (`.accent`) is always `--blue-400` on dark backgrounds and `--blue-600` on white
- Ring gauge severity colours: moderate=blue, high=amber, critical=red — these are semantic and must not change

---

## 16. Common Gotchas & Debugging

### Preview Tool Dark Screenshots
The Claude Code preview tool sometimes shows dark screenshots when the FadeUp animation hasn't fired yet. To test: scroll organically through the section (use a JS interval to scroll 100px/frame). Force visibility in eval for inspection:
```js
document.querySelectorAll('.calc-section div').forEach(el => {
  if (parseFloat(getComputedStyle(el).opacity) < 1) el.style.opacity = '1'
})
```

### Calculator Always Shows Locked State on Reload
This is intentional — `unlocked` state is local to the component. No persistence needed.

### n8n Webhook May Fire Even If Form Is Incomplete
The `handleUnlock` function validates `name`, `email`, `phone` but still fires the fetch in the same call as unlock. If the webhook receives partial data, check the n8n workflow for null handling.

### BookingModal Preview URL Not Capturing Submissions
The current booking URL is a GHL preview. Submissions made through it may not be saved to GHL. This is the top priority to fix before driving any paid traffic.

### GSAP + Framer Motion Conflict
Both libraries attach scroll listeners. If `HowItWorks` GSAP animations cause jitter in other sections, add `ScrollTrigger.normalizeScroll(true)` in the GSAP context — but test carefully as this affects Framer Motion's `scrollY` values.

### Video Not Scrubbing on iOS
iOS Safari restricts `currentTime` manipulation on muted videos. Test on a real device. If needed, set `playsinline` (already set) and ensure the video is under 60fps. Spring-smoothed scrub helps mask iOS timing restrictions.

### Hooks Cannot Be Called Conditionally
If you see `React Hook "useTransform" is called conditionally` error — you've called a hook inside an `if` block or `.map()`. Move all `useTransform` / `useSpring` / `useInView` calls to the top level of the component function.

---

## 17. What Good Looks Like

This page is aimed at Awwwards-level quality — not a typical lead-gen site. Every decision should ask: "Would this feel at home on a premium architecture or luxury real estate brand site?"

Reference benchmarks:
- Hero: Apple product launch style (content holds while background transforms)
- Calculator: Feels like a premium SaaS tool, not a form widget
- Typography: Editorial — tight leading, purposeful weight contrast, generous whitespace
- Animations: 60fps, spring-physics feel, nothing feels cheap or tacked-on
- Copy: Sparse, confident — one idea per sentence, builder language throughout
