# PreBuild Landing Page — Project Map for AI Assistants

> **Start here.** This file maps the local folder structure, how components connect, and where to find everything. Give this to any AI platform to get up to speed quickly.

---

## ★ EDIT HERE — Canonical Source (Antigravity / All AI Assistants)

| | |
|---|---|
| **Folder to edit** | `prebuild-react/` (this is the **only** source of truth) |
| **Live deployment** | https://builder.centriweb.com |
| **Do not edit** | `.claude/worktrees/` — that is a stale copy. Ignore it. |

**When working on this project, all edits must go in `trajan/prebuild-react/`.**  
This folder is what deploys to the domain. No other folder in this repo is the active version.

---

## 1. Project Name & Location

| | |
|---|---|
| **Project** | PreBuild — Australian builder lead-qualification landing page |
| **Root folder** | `trajan/` |
| **App entry** | `prebuild-react/` (Vite + React SPA) |
| **Run locally** | `cd prebuild-react && npm run dev` → http://localhost:5173 |

---

## 2. Local Folder Structure

```
trajan/                          ← Project root
├── CLAUDE.md                    ← ★ Full project context (read for deep edits)
├── README.md                     ← Human overview, quick start, integrations
├── PROJECT-MAP.md                ← This file — handoff map for AI
├── .gitignore
│
├── .claude/                      ← Claude Code config (optional for other AIs)
│   ├── launch.json               ← Dev server: prebuild-dev on port 5173
│   └── skills/                   ← Custom skills (landing-page, motion, etc.)
│
├── prebuild-react/               ← ★ Main app (this is what you edit)
│   ├── index.html                ← Single HTML shell
│   ├── vite.config.js
│   ├── package.json
│   ├── public/                   ← Static assets
│   │   ├── video/                ← Hero background video
│   │   └── images/               ← Logo, section images
│   └── src/
│       ├── main.jsx              ← React entry, mounts App
│       ├── App.jsx               ← ★ Section order, modal registration
│       ├── components/           ← All page sections & modals
│       └── styles/
│           └── globals.css       ← ★ Design system (colors, typography, layout)
│
└── docs/
    ├── DESIGN-EVOLUTION-PLAN.md
    └── IMPLEMENTATION-BRIEF.md
```

---

## 3. Component Map (How It Connects)

### Entry point: `App.jsx`

App renders sections in this order and passes `scrollTo(id)` to components that need it:

```
Nav              → Sticky nav, scroll-to links (calculator, how-it-works, faq)
Hero             → Cinematic hero, CTA "Apply for a Consult"
ProblemSection
CalculatorSection → Lead magnet: sliders + gated form, posts to n8n webhook
SolutionSection
HowItWorks       → 3-step process (GSAP ScrollTrigger)
WhoSection       → Audience qualification
FinalCTA         → Dual CTA: "Apply for a Consult" + "Book a Call"
ProofSection
CredibilitySection
FAQSection
GuaranteeSection
Footer
SurveyModal      → Listens for 'open-survey' → consult.centriweb.com.au iframe
BookingModal     → Listens for 'open-booking' → book.centriweb.com.au iframe
```

### Event flow: Modals

Modals are **triggered by custom window events**, not props:

```javascript
// Any component can open a modal:
window.dispatchEvent(new Event('open-survey'))    // → SurveyModal opens
window.dispatchEvent(new Event('open-booking'))   // → BookingModal opens
```

**Who dispatches:**
- `Hero` — "Apply for a Consult" button
- `Nav` — CTA button
- `FinalCTA` — both buttons
- `CalculatorSection` — "See My Results" (calculator gate, not modal)

### scrollTo(id)

`App` defines `scrollTo` and passes it to `Nav`, `Hero`, `CalculatorSection`, `FinalCTA`:

```javascript
scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
```

IDs used: `calculator`, `how-it-works`, `faq`, `final-cta`

---

## 4. Key Files (What to Edit)

| File | Purpose |
|------|---------|
| `App.jsx` | Section order, `scrollTo` logic — add/remove/reorder sections here |
| `Hero.jsx` | Hero content, CTA — load-time or scroll-driven animation |
| `CalculatorSection.jsx` | Sliders, gate form, n8n webhook, ring gauge — lead magnet |
| `SurveyModal.jsx` | GHL survey popup — fullscreen iframe |
| `BookingModal.jsx` | GHL booking popup — fullscreen iframe |
| `FinalCTA.jsx` | Dual CTA section — Apply + Book a Call |
| `FadeUp.jsx` | Reusable animation wrappers (FadeUp, RevealBlur, StaggerReveal) |
| `globals.css` | Design tokens, section styles, modal styles — no Tailwind |

---

## 5. Design System (globals.css)

**Color tokens:** `--blue-400`, `--slate-900`, `--steel-600`, `--amber-400`, `--red-400`, `--green-400`  
**Fonts:** Barlow Condensed (headlines), Barlow (body), Space Mono (labels), Merriweather (callouts)  
**Section classes:** `.s-dark`, `.s-light`, `.s-white`  
**Buttons:** `.btn-primary`, `.btn-book-call`

---

## 6. Integrations

| Integration | Location | Details |
|-------------|----------|---------|
| n8n webhook | `CalculatorSection.jsx` | `POST https://n8n.centriweb.com/webhook/b74e323d-2237-42d0-87a8-e9c6133f8dd9` |
| Survey | `SurveyModal.jsx` | `CONSULT_FORM_URL` → https://consult.centriweb.com.au |
| Booking | `BookingModal.jsx` | `BOOKING_URL` → https://book.centriweb.com.au |

---

## 7. For Deeper Context

- **CLAUDE.md** — Full project spec: scroll pacing, calculator payload, modal patterns, animation rules, pending work
- **README.md** — Quick start, tech stack, what's done / what needs doing

---

## 8. Tech Stack

Vite 5, React 18, Framer Motion v12, GSAP + ScrollTrigger, CSS custom properties (no Tailwind)
