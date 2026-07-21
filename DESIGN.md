# PreBuild — Design System

> This file is the authoritative design reference for the PreBuild landing page.
> It is compatible with Google Stitch's Design DNA format and can be imported into
> any Stitch canvas to generate on-brand screens automatically.

---

## Brand Identity

**Product:** PreBuild — a done-for-you lead qualification service for Australian residential builders
**Aesthetic:** Cinematic, editorial, blueprint-industrial · Awwwards-level execution
**Tone:** Direct, confident, builder-friendly · No fluff, no startup jargon
**Reference:** Apple product launch (scroll-driven storytelling) × premium architecture brand

---

## Colour Palette

### Primary Brand
| Token | Hex | Usage |
|---|---|---|
| `--blue-400` | `#2F7FD4` | Primary CTA, links, accent text, ring gauge |
| `--blue-600` | `#1A5FAA` | Hover states, pressed buttons |
| `--blue-800` | `#0D3E73` | Deep blue for gradients |
| `--blue-900` | `#071F3A` | Footer background |
| `--blue-100` | `#E6F0FB` | Eyebrow tag background |
| `--blue-200` | `#B8D3F4` | Subtle blue borders, dividers |

### Neutrals (Steel)
| Token | Hex | Usage |
|---|---|---|
| `--steel-100` | `#F2F4F6` | Lightest background (credibility section) |
| `--steel-200` | `#DDE2E8` | Borders, slider tracks, dividers |
| `--steel-400` | `#8A96A3` | Muted labels, subtext, secondary body |
| `--steel-600` | `#4A5563` | Secondary text on white |
| `--steel-800` | `#1E2630` | Primary body text on white backgrounds |

### Dark Surfaces
| Token | Hex | Usage |
|---|---|---|
| `--slate-900` | `#111820` | Hero, dark sections, nav background |

### Semantic / Status
| Token | Hex | Usage |
|---|---|---|
| `--amber-400` | `#E8A020` | High severity / warning (calculator) |
| `--amber-600` | `#B87A10` | Amber hover |
| `--green-400` | `#2E8B57` | Success, savings, guarantee |
| `--green-100` | `#E6F4ED` | Light green background |
| `--red-400`   | `#C0392B` | Critical severity (calculator) |
| `--red-100`   | `#FAEAEA` | Light red background |

### Surfaces
| Token | Hex | Usage |
|---|---|---|
| `--white`   | `#FFFFFF` | Calculator left panel, proof section |
| `--page-bg` | `#F8F9FB` | Light section backgrounds |

---

## Typography

### Font Families
| Role | Family | CSS Variable | Notes |
|---|---|---|---|
| **Display** | Barlow Condensed | `--display` | ALL headlines, numbers, eyebrows, labels |
| **Body** | Barlow | `--body` | All paragraph and UI text |
| **Mono** | Space Mono | `--mono` | Eyebrow tags, button labels, data labels |
| **Serif** | Merriweather | `--serif` | Callout quotes ONLY (sparingly) |

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Merriweather:ital,wght@0,700;1,700&display=swap
```

### Type Scale
| Element | Family | Size | Weight | Transform | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| Hero H1 | Display | `clamp(48px, 8vw, 110px)` | 800 | uppercase | 0.92 | -0.02em |
| Section H2 | Display | `clamp(36px, 5vw, 64px)` | 800 | uppercase | 1.0 | -0.01em |
| Section H2 (large) | Display | `clamp(40px, 4.5vw, 64px)` | 800 | uppercase | 1.05 | -0.01em |
| Final CTA H2 | Display | `clamp(48px, 8vw, 120px)` | 800 | uppercase | 0.94 | -0.02em |
| Section Lead | Body | 18px | 300 | none | 1.8 | 0 |
| Body Text | Body | 16px | 400 | none | 1.7 | 0 |
| Card Body | Body | 16px | 400 | none | 1.75 | 0 |
| Eyebrow | Mono | 13px | 700 | uppercase | 1 | 0.1em |
| Eyebrow Tag | Mono | 13px | 700 | uppercase | 1 | 0.08em |
| Button Label | Mono | 13px | 700 | uppercase | 1 | 0.06em |
| Stat Number | Display | `clamp(48px, 6vw, 80px)` | 800 | none | 1 | -0.02em |
| Serif Callout | Serif | 24px | 700 | none | 1.4 | 0 |
| Caption / Tag | Mono | 11–12px | 400–700 | uppercase | 1.4 | 0.08em |

---

## Spacing

Based on an **8px grid**. All spacing values are multiples of 8.

| Scale | Value | Usage |
|---|---|---|
| 2xs | 8px | Tight gaps (icon + label) |
| xs | 16px | Button padding (vertical) |
| sm | 24px | Card gaps, eyebrow bottom margin |
| md | 32px | Mobile section padding |
| lg | 48px | Default card padding |
| xl | 64px | Section horizontal gaps |
| 2xl | 80px | Section vertical padding (mobile) |
| 3xl | 120–140px | Section vertical padding (desktop) |

### Container Widths
```css
.wrap    { max-width: 1040px; padding: 0 52px; }  /* Standard */
.wrap-md { max-width: 780px;  padding: 0 52px; }  /* Medium */
.wrap-sm { max-width: 620px;  padding: 0 52px; }  /* Small */
.wrap-lg { max-width: 1200px; padding: 0 52px; }  /* Large */
/* Mobile: padding reduces to 0 24px at ≤768px */
```

---

## Component Patterns

### Buttons

#### Primary CTA (`.btn-primary`)
- Background: `--blue-400`
- Text: white, Space Mono, 13px, 700, uppercase, 0.06em tracking
- Padding: 16px 36px
- Border radius: 6px
- Hover: background `--blue-600`
- Shadow (hero variant): `0 4px 24px rgba(47,127,212,0.35)`

#### Ghost / Outline Button (`.btn-book-call`)
- Background: transparent
- Border: 1px solid `rgba(47,127,212,0.4)`
- Text: `--blue-400`, Space Mono, 13px, 700, uppercase
- Padding: 16px 36px
- Hover: border brightens, faint blue bg fill

#### Trust Line (under primary CTA)
- Font: Space Mono, 12px, uppercase, 0.08em tracking
- Color: `rgba(255,255,255,0.45)` on dark, `rgba(0,0,0,0.35)` on light
- Example: "No hard pitch · 30-day performance guarantee"

### Eyebrow Tags (`.eyebrow-tag`)
- Background: `--blue-100`
- Text: `--blue-400`, Space Mono, 13px, 700, uppercase
- Padding: 5px 12px
- Border radius: 3px
- Always appears above an H2, with 24px bottom margin

### Section Header Pattern
Every section follows this strict hierarchy:
```
[Eyebrow tag]     ← mono, 13px, blue — optional
[H2 headline]     ← display, 40–64px, uppercase, dark/white
[Lead paragraph]  ← body, 18px, 300 weight, muted
```
Spacing: eyebrow → 24px → H2 → 20–24px → lead text

### Cards

#### Dark Card (`.pain-card`, dark sections)
- Background: `rgba(255,255,255,0.03)`
- Border: 1px solid `rgba(255,255,255,0.06)`
- Border radius: 12px
- Padding: 48px
- Left accent bar: 3px `--blue-400` gradient
- Hover: border brightens, left bar opacity 100%

#### Light Card (white sections)
- Background: white
- Border: 1px solid `--steel-200`
- Border radius: 6px
- Padding: 32–40px
- Shadow: `0 8px 24px rgba(17,24,32,0.06)`

### Dark Section Decoration (`.s-dark`)
Every dark section has:
1. **Blueprint grid** (pseudo `::before`): 40px repeating lines, `rgba(47,127,212,0.07)` — both axes
2. **Left edge bar** (pseudo `::after`): 4px wide, `--blue-400`, full height

---

## Animation System

### Easing Curve
All transitions use: `[0.16, 1, 0.3, 1]` — snappy in, smooth out (custom spring-like)

### Standard Scroll Entrance Animations
| Component | Type | Duration | Distance |
|---|---|---|---|
| `FadeUp` | opacity + y | 0.52s | y: 13px |
| `RevealBlur` | opacity + blur + y | 0.85s | y: 30px, blur: 8px→0 |
| `StaggerReveal` | container | — | stagger 0.08s |
| `SlideIn` | opacity + x | 0.65s | x: ±40px |

### Stagger Timing
- Children stagger: 0.08–0.12s (never faster — feels mechanical)
- Section header stagger: eyebrow → 0 delay, H2 → 0.08s, lead → 0.16s

### Scroll-Linked (Hero Only)
- Raw `scrollY` pixel values (not 0–1 progress)
- Hero content hold: 380–1000px (no transitions)
- Video: spring-smoothed scrub (stiffness 40, damping 20)
- Stats reveal: staggered 200px apart

---

## Section Layout Patterns

### Split Layout (Problem section)
Two equal columns, left sticky on desktop:
- Left: sticky (top: 140px) with headline + lead
- Right: scroll-animated cards, offset top by 120px for stagger feel
- Collapses to single column at ≤992px

### Two-Column Asymmetric
- Primary: 60% / 40% or `1.4fr 1fr` ratio
- Used in: WhoSection (yes/no columns), CredibilitySection (text/stats)

### Calculator Panel
- Grid: `1fr 1fr`, overflow hidden, rounded corners (14px)
- Left: white, 40px padding — input sliders
- Right: dark (slate-900), 36px padding — ring gauge + results

---

## Breakpoints

| Breakpoint | Value | Behaviour |
|---|---|---|
| Mobile | `≤ 768px` | Single column, reduced padding (24px), hero 260vh |
| Tablet | `≤ 992px` | Problem section stacks, who-section stacks |
| Desktop | `> 992px` | Full multi-column layouts |

---

## Dark vs Light Sections

| Section | Surface | Background |
|---|---|---|
| Hero | dark | `--slate-900` |
| Problem | dark | `--slate-900` |
| Calculator | white (left) + dark (right) | `--white` + `--slate-900` |
| Solution | dark | `--slate-900` |
| How It Works | dark | `--slate-900` |
| Who | light | `--page-bg` |
| Proof | white | `--white` |
| Credibility | light | `--steel-100` |
| FAQ | white | `--white` |
| Guarantee | dark | `--slate-900` (green accents) |
| Final CTA | dark | `--slate-900` |
| Footer | dark blue | `--blue-900` |

---

## Design Constraints

1. **No Tailwind** — CSS custom properties only
2. **No shadows in dark sections** — they disappear; use glows instead
3. **Accent colour** on dark = `--blue-400`, on white = `--blue-600`
4. **Ring gauge severity**: moderate=blue, high=amber, critical=red (semantic, never decorative)
5. **Animations**: transform + opacity only — never animate width/height/top/left
6. **Typography**: Barlow Condensed for ALL numbers and data — never Barlow regular for large numerics
7. **8px grid**: No arbitrary spacing values

---

## Voice & Copy Standards

- Direct, no fluff: "That number doesn't have to be yours."
- Builder-friendly: talk like a tradie, not a startup founder
- Specific beats vague: "40+ hours per phantom quote" not "wasted time"
- Jargon to avoid: "leverage", "seamlessly", "streamline", "game-changer", "unlock your potential"

### CTAs
- ❌ "Get Started", "Learn More", "Submit"
- ✅ "Apply for a Consult →", "See My Results →", "Book a Call"

---

*This DESIGN.md is maintained by Centriweb (Jerald Immanuel) and powers the PreBuild landing page at builder.centriweb.com.*
