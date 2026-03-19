# PreBuild Autopilot — Design Evolution Plan

**Version:** 1.0  
**Date:** March 2025  
**Purpose:** Audit the current landing page implementation and define a detailed plan to evolve it into a premium, cinematic, editorial experience — with a cinematic background video concept as a core visual storytelling device.

---

# PHASE 1 — AUDIT OF CURRENT REPO

## 1. What Already Works Well Strategically

- **Problem-first positioning:** The page correctly leads with the pain (wasted quoting, qualification chaos) before solution. The "Most builders don't have a quoting problem. They have a qualification problem" line is sharp and memorable.
- **Done-for-you framing:** The copy consistently emphasises that PreBuild is configured and handed back — not a tool the builder manages. This differentiates from CRM/software.
- **Calculator as proof mechanism:** The cost calculator is a strong conversion asset. It makes the problem tangible and creates a "that number doesn't have to be yours" moment. It's interactive, not passive.
- **Trust architecture:** Guarantee (30-day), testimonials (with appropriate caveats), FAQ (straight answers), and "no pitch" language create a credible spine. The page doesn't oversell.
- **Audience clarity:** "For Australian residential builders · 5–30 homes / year" and the WhoSection (Yes/No fit) clearly qualify the audience. This reduces tyre-kicker traffic.
- **Content spine:** The flow — Hero → Problem → Calculator → Solution → How It Works → Who → Proof → Credibility → FAQ → Guarantee → Final CTA — is logically sound. Each section has a clear job.

## 2. What Already Works Well Structurally

- **Section system:** The `.s-dark`, `.s-light`, `.s-white`, `.s-steel`, `.s-blue`, `.s-green` surface classes create intentional contrast. Dark/light alternation is established.
- **Blueprint grid:** The repeating 40px grid on dark sections (`.s-dark::before`, `.s-blue::before`) is a distinctive brand cue. It's subtle, architectural, and not generic.
- **Left-edge blue rule:** The 4px blue accent on dark sections (`.s-dark::after`) adds a consistent editorial touch.
- **Typography hierarchy:** Barlow Condensed (display), Barlow (body), Space Mono (labels), Merriweather (serif callouts) is a considered stack. The `.h1`, `.h2`, `.lead`, `.eyebrow` system is coherent.
- **Wrap system:** `.wrap` (1040px), `.wrap-md` (780px), `.wrap-sm` (620px) provide layout constraints. Max-widths are sensible.
- **Component modularity:** Each section is a self-contained component. App.jsx is clean. Scroll-to behaviour is centralised.

## 3. Sections That Should Remain in the Overall Page Flow

| Section | Role | Verdict |
|---------|------|---------|
| Nav | Persistent navigation + CTA | Keep — essential |
| Hero | First impression, value prop, primary CTA | Keep — core |
| ProblemSection | Pain articulation | Keep — strategic anchor |
| CalculatorSection | Proof, interactivity, qualification | Keep — conversion asset |
| SolutionSection | Outcome framing | Keep — bridge to process |
| HowItWorks | Process transparency | Keep — reduces friction |
| WhoSection | Audience qualification | Keep — filters |
| ProofSection | Social proof | Keep — trust |
| CredibilitySection | System credibility | Keep — authority |
| FAQSection | Objection handling | Keep — conversion |
| GuaranteeSection | Risk reversal | Keep — trust |
| FinalCTA | Conversion moment | Keep — essential |
| Footer | Legal, brand | Keep — minimal |

**All sections should remain.** None should be removed. The question is how each is redesigned, not whether it stays.

## 4. Content Spine to Preserve

- **Hero headline:** "Stop wasting nights on quotes that were never going to happen." — Strong. Keep.
- **Problem headline:** "Most builders don't have a quoting problem. They have a qualification problem." — Keep.
- **Solution headline:** "We set it up. You build homes." — Keep.
- **How It Works headline:** "Simple to start. Done for you." — Keep.
- **Who headline:** "Built for residential builders tired of quoting blind." — Keep.
- **Proof headline:** "Builders who stopped quoting blind." — Keep.
- **Guarantee copy:** 30-day commitment — Keep.
- **Final CTA headline:** "Your next enquiry should be worth your time." — Keep.
- **Calculator CTA:** "That number doesn't have to be yours." — Keep.

The copy spine is strong. Evolution should refine, not replace. Avoid generic SaaS rewrites.

## 5. Promising Visual Patterns Worth Evolving

- **Blueprint grid:** Already distinctive. Can be extended — e.g. denser in hero, sparser in footer; could animate or parallax.
- **Left-edge rule:** Editorial. Could become a scroll-progress indicator or animate on section entry.
- **Stats strip (Hero):** The three-column stat block (40+ hours, 3,200 insolvent, 30–60% budget gap) is data-driven. Could become more dramatic — larger numbers, staggered reveals, or integrated into a cinematic moment.
- **Calculator split layout:** Inputs left, outputs right (dark) — good contrast. The blueprint grid on the output side works. Could be more immersive.
- **HowItWorks pinned scroll:** GSAP ScrollTrigger pin with progress line and staggered step reveals is the most advanced motion in the repo. This is a template for other pinned moments.
- **Merriweather serif callouts:** Used sparingly. Could be used for more editorial "pull quote" moments.
- **Eyebrow tags:** `.eyebrow`, `.eyebrow-tag` — good for section labelling. Could be more expressive.

## 6. What Feels Too Basic, Static, Templated, or Not Premium

- **Hero:** Static dark block with text. No ambient background, no depth, no cinematic entry. The parallax (content drifts up, stats drift) is subtle but the hero doesn't feel like a "moment." It feels like a well-designed section, not an experience.
- **ProblemSection:** Three equal cards in a grid. Predictable. No asymmetry, no editorial layout. The pain cards are functional but visually flat.
- **SolutionSection:** Same pattern — three outcome cards, equal weight. Hover states are nice but the layout is templated.
- **WhoSection:** Two-column checklist. Useful but generic. No visual drama.
- **ProofSection:** Two testimonials side-by-side. Standard. The quote styling is good but the layout is conventional.
- **CredibilitySection:** Two-column (text + stats grid). Functional. Stats animate on scroll (AnimatedStat) but the section feels like filler.
- **FAQSection:** Accordion list. Clean but nondescript. No editorial treatment.
- **GuaranteeSection:** Green block with text. The parallax on background is subtle. Could be a more powerful "anchor" moment.
- **FinalCTA:** Centred text, button. Clear but not memorable. No "last impression" drama.
- **Overall pacing:** Sections feel like a vertical stack of blocks. No sense of a journey, no rhythm variation, no "breathe" moments.
- **Nav:** Fixed bar. Works but doesn't evolve (e.g. minimal on load, fuller on scroll — it does have `.scrolled` but it's basic).

## 7. Sections Needing the Biggest Redesign

1. **Hero** — Highest impact. Currently static. Needs cinematic treatment, possible video background, larger typography, more dramatic entry.
2. **ProblemSection** — High. Pain cards are too uniform. Needs editorial layout, asymmetry, or a more dramatic reveal.
3. **CalculatorSection** — High. The calculator is strong but the container feels like a form. Could be more immersive, with the numbers feeling more "alive."
4. **HowItWorks** — Medium-high. Already has pinning. Could be more cinematic — e.g. video or visual progression alongside steps.
5. **FinalCTA** — High. Should be the emotional peak. Currently feels like "another CTA block."
6. **ProofSection** — Medium. Testimonials could feel more editorial — larger quotes, asymmetric layout.
7. **GuaranteeSection** — Medium. Could be a more powerful "anchor" — larger type, more presence.

## 8. Motion Opportunities Underused

- **Scroll-linked storytelling:** Only Hero (parallax), HowItWorks (pin), and GuaranteeSection (subtle background) use GSAP ScrollTrigger. Most sections use FadeUp (Framer Motion `useInView`) — simple fade-in. No scroll-driven narrative.
- **Stagger:** Used in Hero, ProblemSection, SolutionSection, ProofSection, etc. But stagger is uniform (0.09s, 0.12s). No variation in rhythm.
- **Parallax layers:** Hero has one layer. No multi-layer depth.
- **Pinned sections:** Only HowItWorks pins. Calculator, Problem, or a "video story" section could pin.
- **Text reveals:** FinalCTA uses blur on headline. Most headings just fade up. No character-by-character, word-by-word, or line-by-line reveals.
- **Hover states:** Present on cards and buttons. Could be more refined — e.g. magnetic buttons, subtle scale, or micro-interactions.
- **Section transitions:** Sections abut each other. No overlap, no wipe, no crossfade. Transitions are abrupt.
- **Loading/entry:** No page-level entrance. Content appears as user scrolls. Could have a curated "opening" sequence.

## 9. Layout Opportunities Underused

- **Asymmetry:** Almost everything is centred or symmetrical. No diagonal layouts, no overlapping elements, no broken grids.
- **Oversized typography:** `.h1` goes to 96px at max. Could push further for key moments (e.g. FinalCTA, Hero).
- **Negative space:** Sections are padded but not dramatically sparse. No "breathing room" moments.
- **Full-bleed:** No full-viewport sections except Hero (92vh). Calculator, Proof, or Guarantee could go full viewport.
- **Overlap:** No sections overlap. No z-index play. No layered compositions.
- **Editorial spreads:** No magazine-style layouts — e.g. large quote on one side, small text on the other.
- **Grid breaking:** Layouts stay within wrap. No elements that break out, overlap, or create tension.

## 10. What Prevents "World-Class" Feel

- **Lack of a central visual metaphor:** The blueprint grid is a start, but there's no unifying visual story. A house being built, structure emerging from chaos — that narrative isn't visualised.
- **Uniform density:** Every section has similar information density. No contrast between "dense" and "sparse."
- **No emotional arc:** The scroll doesn't build. It doesn't have peaks and valleys. It's informative but not evocative.
- **Generic card patterns:** Pain cards, outcome cards, testimonials — all use the same card-in-grid pattern. Feels like a template.
- **No "wow" moment:** Nothing makes the user stop and think "this is different." The HowItWorks pin is the closest.
- **Background is flat:** Dark = solid colour + grid. No depth, no atmosphere, no cinematic quality.
- **Typography is safe:** Good hierarchy but not bold. No moment where type dominates the viewport.
- **Motion is polite:** Animations are smooth but not memorable. No signature motion language.

## 11. Where Cinematic Background Video Could Be Introduced

| Location | Opportunity | Risk |
|----------|-------------|------|
| **Hero** | Full-viewport ambient video behind headline. House/structure emerging. Sets tone. | Overpowering headline; performance on mobile. |
| **Hero → Problem transition** | Video continues as user scrolls; fades or transitions as ProblemSection enters. | Complexity; may feel disjointed. |
| **Dedicated "story" section** | New section between Problem and Calculator, or between Solution and HowItWorks. Pinned. Video plays/progresses as user scrolls. | Adds length; may interrupt flow. |
| **Calculator background** | Subtle video on dark output side. | Distraction from numbers. |
| **HowItWorks** | Video progression (e.g. blueprint → frame → structure) synced to steps. | Sync complexity; may feel gimmicky. |
| **FinalCTA** | Soft video behind CTA. | Could work if very subtle. |

**Recommendation:** Introduce video in **Hero** (primary) and optionally a **pinned story section** mid-page. Avoid video in Calculator (clarity) and FAQ (readability). Hero video should be the main cinematic moment; mid-page video (if used) should support the "chaos to structure" narrative.

## 12. Video: Persistent, Section-Based, or Key Moments?

- **Persistent:** One video runs full-page, with sections overlaying it. High impact but risky — readability, performance, and focus suffer. Not recommended.
- **Section-based:** Video appears in Hero, and optionally in 1–2 other sections. Each section has its own clip or the same clip at different points. Recommended.
- **Key moments only:** Video only in Hero. Rest is static. Simplest. Recommended as Phase 1.

**Recommendation:** Section-based. Hero gets the primary video. A second "story" section (pinned, between Problem and Calculator or after Solution) could have a scroll-linked video that progresses from abstract/chaos to structure. Start with Hero only; add second section if budget and performance allow.

## 13. How Video Supports Narrative

- **Symbolism:** House/structure being built = process being built. Chaos (foundation, framing) → order (finished form). Mirrors the PreBuild story: unqualified chaos → qualified pipeline.
- **Emotional alignment:** Builders understand construction. Seeing a build progress is familiar and aspirational. "That's what we do — and this system helps us do it better."
- **Pacing:** Video can slow the scroll. User pauses. Attention deepens.
- **Premium signal:** Cinematic video says "this is serious, this is premium." Not a stock photo, not a generic gradient.
- **Restraint:** Video should be atmospheric — slow, subtle, not literal "here's a house being built" in a cheesy way. Think: Terrence Malick, not real estate ad.

---

# PHASE 2 — DESIGN EVOLUTION PLAN

## A. CURRENT STATE SUMMARY

**What the current page is:** A well-structured, conversion-oriented landing page for PreBuild Autopilot. It has a clear content spine, a working cost calculator, a logical section flow, and a coherent visual system (blueprint grid, Barlow typography, dark/light alternation). It uses Framer Motion for scroll-triggered reveals and GSAP for Hero parallax, HowItWorks pinning, and GuaranteeSection background.

**Where it is strong:** Strategy (problem-first, done-for-you), copy (sharp headlines, no fluff), calculator (interactive proof), trust architecture (guarantee, FAQ, testimonials), and the HowItWorks pinned scroll (the only "advanced" motion moment).

**Where it falls short:** It feels like a polished template, not a world-class experience. The Hero is static. Layouts are symmetrical and predictable. Motion is polite but not memorable. There is no unifying visual story. No cinematic quality. No emotional arc. No "wow" moment beyond the calculator.

**Upgrade direction:** Transform it into a cinematic, editorial, scroll-driven story. Introduce a background video system (house/structure progression) as the central visual metaphor. Increase typography scale, asymmetry, and pacing variation. Add more pinned/sticky moments. Evolve the blueprint grid into a richer visual language. Make the scroll feel like a journey from chaos to structure — both in copy and in visuals.

---

## B. CREATIVE DIRECTION

### Upgraded Visual Concept

**"From chaos to structure."** The page should feel like watching a build take shape — not literally, but emotionally. The scroll progresses from uncertainty (problem, pain) through calculation (facing the cost) to clarity (solution, process) to confidence (proof, guarantee) to commitment (CTA). The background video mirrors this: abstract or early-stage construction → defined structure → finished form. The visual language should feel architectural: precise, considered, built.

### Emotional Tone

- **Confident, not desperate.** Premium. We know the problem; we have the solution. No hype.
- **Serious, not corporate.** Builder-adjacent — practical, no-nonsense — but elevated. Not a tradesman's brochure.
- **Restrained but impressive.** Moments of drama, but clarity always wins. No motion for motion's sake.
- **Trustworthy.** The page should feel like it was built by people who understand builders. Not a generic agency.

### Story Arc of the Page

1. **Hook (Hero):** "You're wasting nights on quotes that go nowhere." Immediate. The video suggests something emerging from nothing.
2. **Pain (Problem):** "It's not a quoting problem — it's a qualification problem." The video (if continuous) could show early framing — structure beginning.
3. **Confrontation (Calculator):** "See the number." Make it real. Video fades or pauses. Focus on the math.
4. **Promise (Solution):** "We set it up. You build homes." The video could show structure taking form.
5. **Process (How It Works):** "Four steps. Done for you." Pinned. Clear. Video could progress in sync.
6. **Fit (Who):** "Is this for you?" Qualification. Ground the reader.
7. **Proof (Testimonials):** "Builders who stopped quoting blind." Social proof. Video subtle or absent.
8. **Credibility:** System stats. Authority.
9. **Objections (FAQ):** Straight answers.
10. **Commitment (Guarantee):** "We own the outcome." Risk reversal.
11. **Ask (Final CTA):** "Your next enquiry should be worth your time." The peak. Video could return, very subtle.

### Pacing of the Scroll Journey

- **Hero:** Slow. Let the video breathe. Headline lands. User absorbs.
- **Problem → Calculator:** Medium. Build tension. Calculator is interactive — user may pause.
- **Solution → How It Works:** Medium-slow. HowItWorks pins — user is "in" the section.
- **Who → Proof → Credibility:** Medium. Trust-building. Steady rhythm.
- **FAQ:** Slower. Accordions require interaction. Dense information.
- **Guarantee:** Pause. Let the guarantee land. Bold type.
- **Final CTA:** Slow. Sparse. One ask. Maximum focus.

### Art Direction

- **Architectural:** Grids, lines, precision. Blueprint as metaphor. Structure.
- **Cinematic:** Depth, layers, subtle motion. Video as atmosphere.
- **Editorial:** Asymmetry, large type, pull quotes. Magazine influence.
- **Premium:** Restraint. No clutter. Every element earns its place.
- **Builder-adjacent:** Industrial undertones — steel, concrete, raw materials — but refined. Not construction-site literal.

### What Makes It Premium and Cinematic

- **Depth:** Layered backgrounds. Video, gradient overlays, subtle texture. Not flat.
- **Scale:** Typography that commands. Headlines that fill the viewport.
- **Rhythm:** Variation in section height, density, and motion. Not uniform.
- **Restraint:** Fewer elements, better chosen. No decorative noise.
- **Motion with purpose:** Every animation supports the story. No gratuitous effects.
- **Video as atmosphere:** Slow, subtle, symbolic. Not a hero "hero."

---

## C. WHAT TO KEEP / WHAT TO EVOLVE / WHAT TO REBUILD

### 1. Keep Mostly As-Is

| Element | Why |
|---------|-----|
| **Section order** | The flow is correct. Don't reorder. |
| **Calculator logic** | The math, sliders, and output structure work. Keep the interaction. |
| **FAQ content and accordion behaviour** | Content is strong. AnimatePresence + height animation is good. |
| **Nav structure** | Logo, links, CTA. Keep. |
| **Footer** | Minimal. Fine. |
| **FadeUp component** | Reusable. Keep. May extend with variants. |
| **Typography stack** | Barlow Condensed, Barlow, Space Mono, Merriweather. Keep. |
| **Color palette** | Blues, steel, slate, amber, green. Keep. |
| **Blueprint grid (concept)** | Distinctive. Keep. Evolve application. |
| **Left-edge rule (concept)** | Editorial. Keep. |

### 2. Keep Strategic Purpose, Redesign Heavily

| Section | Why Redesign | What to Preserve |
|---------|--------------|------------------|
| **Hero** | Currently static. Needs video, larger type, more dramatic entry. | Headline, sub, CTAs, stats strip, guarantee badge. |
| **ProblemSection** | Three equal cards feel templated. | Headline, pain points content. |
| **SolutionSection** | Same card pattern. | Headline, outcome content. |
| **WhoSection** | Two-column checklist is generic. | Yes/No fit content. |
| **ProofSection** | Standard testimonial layout. | Quotes, attribution. |
| **CredibilitySection** | Feels like filler. | Stats, about copy. |
| **GuaranteeSection** | Green block is flat. | Guarantee copy. |
| **FinalCTA** | Centred block. No peak. | Headline, CTA, trust line, loopback. |
| **CalculatorSection** | Strong but container feels like a form. | Sliders, outputs, CTA. |

### 3. Rebuild Almost Completely

| Element | Why |
|---------|-----|
| **Hero background** | Replace solid dark + grid with video + overlay. New component: `HeroVideoBackground`. |
| **Section transitions** | Currently none. Introduce overlap, crossfade, or scroll-linked transitions. |
| **Layout system for key sections** | Problem, Solution, Proof need new layout primitives — asymmetry, full-bleed, overlap. |
| **Motion system** | Extend beyond FadeUp. Add scroll-linked variants, pinned wrappers, parallax primitives. |
| **Background video system** | New. Doesn't exist. |

---

## D. SECTION-BY-SECTION REDESIGN PLAN

### Nav

- **Current purpose:** Persistent nav, scroll-to links, CTA.
- **Stay/merge/move/replace:** Stay.
- **Headline/copy:** No change.
- **Layout:** Consider minimal-on-load (transparent, small) → solid-on-scroll. Already has `.scrolled`. Refine: maybe logo shrinks, nav becomes more compact. Add subtle backdrop blur refinement.
- **Motion:** Nav fade-in on load is good. Consider CTA button micro-interaction (e.g. subtle pulse or glow on scroll-into-view of FinalCTA).
- **Visual treatment:** Keep. Maybe refine border/backdrop on scroll.
- **Transition to next:** Nav overlays Hero. No change.
- **Cinematic/editorial/pinned/etc.:** Compact. Functional. Not a focus.

### Hero

- **Current purpose:** First impression, value prop, primary CTA, stats strip.
- **Stay/merge/move/replace:** Stay. Rebuild heavily.
- **Headline/copy:** Keep. Consider line breaks for drama. "Stop wasting nights / on quotes that were / never going to happen."
- **Layout:** Full viewport. Content left-aligned or slightly off-centre (asymmetry). Headline larger — push to 120px+ at desktop. Stats strip remains below fold or integrated.
- **Motion:** Staggered entrance (keep). Add: video plays; content fades in over it. Parallax: content moves faster than video (or vice versa). Stats strip: scroll-triggered reveal or stays in view.
- **Visual treatment:** **Video background.** House/structure progression — abstract or semi-literal. Overlay: dark gradient (bottom? vignette?) for readability. Blueprint grid can overlay video at low opacity. Left-edge rule remains.
- **Transition to next:** As user scrolls, video fades or continues (depends on strategy). Content parallax up. ProblemSection enters — either hard cut or soft crossfade.
- **Cinematic:** Yes. This is the primary cinematic moment.

### ProblemSection

- **Current purpose:** Articulate pain. "Qualification problem."
- **Stay/merge/move/replace:** Stay. Redesign layout.
- **Headline/copy:** Keep. Maybe tighten lead.
- **Layout:** **Editorial.** Not three equal cards. Consider: one large pain (full-width or dominant) + two smaller. Or: asymmetric grid — one card breaks out, overlaps. Or: vertical stack with large pull quote between. Or: single column, each pain as a "chapter" with large number and minimal text.
- **Motion:** Cards reveal with stagger. Consider scroll-linked: as user scrolls, cards "build" (e.g. border draws, content fades in). Or: one card at a time, pinned, with scroll progress.
- **Visual treatment:** Light background. Consider subtle texture or very light grid. Cards: refine — maybe one has a stronger accent (e.g. blue left border on primary pain).
- **Transition to next:** Clear. Maybe a "See the number" bridge line that scrolls into Calculator.
- **Cinematic/editorial:** Editorial. Asymmetry. Not three equal boxes.

### CalculatorSection

- **Current purpose:** Interactive proof. Make cost tangible. CTA to solution.
- **Stay/merge/move/replace:** Stay. Redesign container and presentation.
- **Headline/copy:** Keep.
- **Layout:** Full-width or near-full. Calculator "floats" or is more immersive. Consider: inputs on left (light), outputs on right (dark) — keep split. But outputs could be larger, more dramatic. Or: calculator in a "frame" with more negative space. Avoid feeling like a form.
- **Motion:** Slider interactions: keep. Output numbers: consider more dramatic animation (e.g. count-up when value changes, or scale pulse). Section entrance: calculator "assembles" or slides in. No video here — clarity.
- **Visual treatment:** Output side: keep blueprint grid. Consider stronger contrast. Input side: clean. Maybe subtle shadow or depth.
- **Transition to next:** CTA "That number doesn't have to be yours" — strong. Transition to Solution: clear.
- **Cinematic:** No video. Focus. But the section can feel more "designed" — less form-like.

### SolutionSection

- **Current purpose:** "We set it up. You build homes." Outcome framing.
- **Stay/merge/move/replace:** Stay. Redesign layout.
- **Headline/copy:** Keep.
- **Layout:** **Asymmetric.** Not three equal cards. Consider: one large outcome (hero outcome) + two supporting. Or: vertical timeline. Or: overlapping cards. Or: one outcome per "screen" with scroll-linked reveal (pinned?).
- **Motion:** Stagger. Consider: outcomes "build" — before/after contrast more dramatic. Hover: refine.
- **Visual treatment:** Light. Cards: maybe one has full-bleed accent. Or: use large numbers (01, 02, 03) as visual anchors.
- **Transition to next:** Into HowItWorks. Could be a "How?" bridge.
- **Cinematic/editorial:** Editorial. Asymmetry.

### HowItWorks

- **Current purpose:** Process transparency. Four steps. Pinned scroll.
- **Stay/merge/move/replace:** Stay. Evolve.
- **Headline/copy:** Keep.
- **Layout:** Keep pinned structure. Consider: steps on left, visual on right — e.g. abstract diagram or **scroll-linked video** showing progression (blueprint → frame → structure). Or: steps remain, add a visual column.
- **Motion:** Keep GSAP pin + progress line + stagger. Refine timing. Consider: each step "completes" with a visual change (e.g. diagram updates, or video frame advances).
- **Visual treatment:** Dark. Blueprint grid. If video: very subtle, symbolic. Or: static illustration that progresses.
- **Transition to next:** Unpin. WhoSection enters.
- **Cinematic:** Pinned. Could add visual progression (video or illustration).

### WhoSection

- **Current purpose:** Audience qualification. Yes/No fit.
- **Stay/merge/move/replace:** Stay. Redesign layout.
- **Headline/copy:** Keep.
- **Layout:** Not two equal columns. Consider: one column dominant (e.g. "Right for you" larger), other secondary. Or: single column, Yes items first, then No — with visual separation. Or: checklist as a "path" — items as steps. Or: asymmetric grid with one side larger.
- **Motion:** Stagger on items. Consider: checkmarks animate in. Or: items "check off" as user scrolls (playful but maybe too much).
- **Visual treatment:** Light. Maybe one side has a tint (e.g. green tint for Yes, grey for No).
- **Transition to next:** Into Proof.
- **Cinematic/editorial:** More editorial. Less "two columns."

### ProofSection

- **Current purpose:** Social proof. Testimonials.
- **Stay/merge/move/replace:** Stay. Redesign layout.
- **Headline/copy:** Keep.
- **Layout:** **Editorial.** Not two equal cards. Consider: one large quote (full-width or dominant) + smaller supporting. Or: asymmetric — one testimonial large, one smaller. Or: single quote, large, with attribution below. Or: quotes as "pull quotes" — huge type, minimal frame.
- **Motion:** Stagger. Consider: quote marks animate. Or: quote "types" in (maybe too gimmicky). Hover: subtle.
- **Visual treatment:** Light. Merriweather for quotes — keep. Maybe one quote has a stronger frame (e.g. left border, or background tint).
- **Transition to next:** Into Credibility.
- **Cinematic/editorial:** Editorial. Large quotes.

### CredibilitySection

- **Current purpose:** System credibility. Stats. About copy.
- **Stay/merge/move/replace:** Stay. Redesign.
- **Headline/copy:** Keep "About PreBuild" framing. Copy is good.
- **Layout:** Consider: stats more prominent. Or: single column — copy first, stats below. Or: stats as a "strip" (horizontal) like Hero stats. Or: stats integrated into a visual (e.g. timeline, diagram).
- **Motion:** AnimatedStat — keep. Consider: stats count up with scroll. Section entrance: refine.
- **Visual treatment:** Steel/grey. Functional. Maybe add subtle pattern or texture.
- **Transition to next:** Into FAQ.
- **Cinematic/editorial:** Grounded. Trust. Not flashy.

### FAQSection

- **Current purpose:** Objection handling. Straight answers.
- **Stay/merge/move/replace:** Stay. Refine.
- **Headline/copy:** Keep.
- **Layout:** Keep accordion. Consider: wider wrap for readability. Or: FAQ as two columns (questions left, answers expand right). Or: keep single column, refine spacing.
- **Motion:** Keep AnimatePresence + height. Refine easing. Consider: icon rotation more pronounced. Or: question text shifts on open.
- **Visual treatment:** White. Clean. Maybe subtle dividers.
- **Transition to next:** Into Guarantee.
- **Cinematic/editorial:** Functional. Readability first.

### GuaranteeSection

- **Current purpose:** Risk reversal. 30-day commitment.
- **Stay/merge/move/replace:** Stay. Redesign.
- **Headline/copy:** Keep. Headline is strong.
- **Layout:** **Full viewport or near-full.** Guarantee should feel like an "anchor" — big, confident. Consider: headline larger (60px+). More negative space. Centred or slightly off-centre. Green background — keep. Maybe add subtle pattern (grid, texture).
- **Motion:** Parallax on background — keep or refine. Content: stagger. Consider: guarantee "seals" — e.g. checkmark or icon animates.
- **Visual treatment:** Green. Grid overlay. Strong. Confident.
- **Transition to next:** Into FinalCTA.
- **Cinematic/editorial:** Bold. Restraint. One message.

### FinalCTA

- **Current purpose:** Conversion. "Book a conversation."
- **Stay/merge/move/replace:** Stay. Rebuild.
- **Headline/copy:** Keep. "Your next enquiry should be worth your time."
- **Layout:** **Sparse. Maximum focus.** Headline very large (80px+). Centred or slightly off. Button prominent. Loopback subtle. Consider: full viewport. Maybe **subtle video** (same as Hero, or abstract) at very low opacity — atmosphere only. Or: solid dark. Blueprint grid very subtle.
- **Motion:** Headline: blur-to-clear (keep). Stagger. Button: magnetic hover? Or: subtle glow. Consider: scroll-into-view triggers nav CTA highlight.
- **Visual treatment:** Dark. Premium. Maybe vignette. Video optional.
- **Transition to next:** Footer.
- **Cinematic:** Yes. Emotional peak. Restraint.

### Footer

- **Current purpose:** Legal, brand.
- **Stay/merge/move/replace:** Stay.
- **Headline/copy:** Keep.
- **Layout:** Minimal. Fine.
- **Motion:** Fade in. Fine.
- **Visual treatment:** Blue-900. Fine.
- **Cinematic/editorial:** Minimal. Functional.

---

## E. CINEMATIC SCROLL FRAMEWORK

| Scroll Position | Moment Type | Description |
|-----------------|-------------|-------------|
| **0–1 viewport** | Hero impact | Video plays. Headline lands. User absorbs. Slow. |
| **1–1.5 viewport** | Stats strip | Data. Transition into Problem. |
| **1.5–2.5 viewport** | Problem | Pain articulated. Editorial layout. Medium pace. |
| **2.5–4 viewport** | Calculator | Interactive. User may pause. Pin optional? No. Keep scrollable. |
| **4–5 viewport** | Solution | Outcomes. Asymmetric. Medium. |
| **5–7 viewport** | HowItWorks | **PINNED.** Progress line. Steps reveal. 2–3 viewports of scroll. Key moment. |
| **7–8 viewport** | Who | Qualification. Ground. |
| **8–9 viewport** | Proof | Testimonials. Editorial. |
| **9–9.5 viewport** | Credibility | Stats. Authority. |
| **9.5–11 viewport** | FAQ | Dense. User may interact. Slower. |
| **11–12 viewport** | Guarantee | **Bold.** Full or near-full. Pause. |
| **12–13 viewport** | Final CTA | **Peak.** Sparse. One ask. Maximum focus. |
| **13+** | Footer | Minimal. |

**Pinning:** HowItWorks only (for now). Optional: add a "video story" pinned section (see F).

**Dramatic reveals:** Hero (video + content), Problem (asymmetric cards), Calculator (numbers), HowItWorks (steps), Guarantee (headline), FinalCTA (headline + button).

**Stacked cards:** Problem, Solution, Proof — but redesigned with asymmetry. Not uniform stacks.

**Oversized typography:** Hero headline, FinalCTA headline, Guarantee headline. Possibly Problem and Solution headlines.

**Pacing slow-down:** Hero, HowItWorks (pinned), Guarantee, FinalCTA.

**Trust grounded:** Who, Proof, Credibility, FAQ.

**CTA pressure:** Calculator CTA, FinalCTA. Nav CTA persistent.

**"Wow" moments:** Hero (video), HowItWorks (pin), Calculator (interactivity), FinalCTA (scale + restraint).

**Restraint over spectacle:** Credibility, FAQ, Footer. Clarity always.

---

## F. BACKGROUND VIDEO STRATEGY

### Where Video Appears

- **Primary:** Hero. Full-viewport background. Video plays on load. Loops or plays once (depending on length). User scrolls; video continues or fades as ProblemSection enters.
- **Optional (Phase 2):** Pinned "story" section between Problem and Calculator, or after Solution. Video progresses (or different clips) as user scrolls through the pin. Symbolic: chaos → structure.
- **Optional (Phase 2):** FinalCTA. Same video as Hero, or abstract loop, at very low opacity (5–10%). Atmosphere only.

### One Continuous Story or Multiple Clips?

- **Option A:** One 60–90 second clip. Plays in Hero. Loops. As user scrolls, video continues (or pauses when out of view). Simplest.
- **Option B:** Multiple clips. Hero: clip 1 (0–30s). Story section: clip 2 (30–60s). FinalCTA: clip 1 again at low opacity. More control, more complexity.
- **Option C:** One long clip (2–3 min). Scroll-linked: video progress tied to scroll position. User "scrubs" through the build by scrolling. Most cinematic, most complex.

**Recommendation:** Start with Option A. One clip in Hero. If successful, add Option C for a pinned story section.

### Literal or Semi-Abstract?

- **Literal:** Real footage of a house being built. Foundation, framing, cladding, etc. Risk: cheesy, stock.
- **Semi-abstract:** Blueprint lines animating into 3D. Or: timelapse with heavy colour grading, slow motion. Or: macro shots of materials (concrete, wood, steel) — texture and form, not full build.
- **Abstract:** Geometric shapes assembling. Lines drawing. Structure emerging from noise. Symbolic.

**Recommendation:** Semi-abstract. Real construction footage, but: slow, atmospheric, colour-graded (desaturated, blue/steel tones). Or: blueprint-to-structure animation. Avoid literal "here's a house" montage.

### How Video Evolves With Scroll

- **Hero:** Video plays. User scrolls. Content parallax up. Video: either (a) fades to black/gradient as Problem enters, or (b) continues at reduced opacity behind Problem (risky for readability), or (c) pauses when Hero exits view. Recommendation: (a) fade. Clean transition.
- **Story section (if used):** Pinned. Video progress = scroll progress. 0% scroll = 0% video. 100% scroll = 100% video. User "builds" the structure by scrolling. Powerful.
- **FinalCTA (if used):** Static frame or very slow loop. Low opacity. Ambient.

### Interaction With Text and Sections

- **Overlay:** Dark gradient (linear or radial) over video. Ensure text contrast. Test with white and dark text.
- **Masking:** Video could be masked (e.g. top half only, or vignette). Reduces distraction.
- **Blur:** Video behind text could be slightly blurred. Keeps focus on copy.
- **Z-index:** Video: z-index 0. Content: z-index 1. Overlay: z-index 0.5 (between).

### When Subtle vs Prominent

- **Hero:** Prominent. Video is the background. But not louder than headline.
- **Story section:** Prominent. It's the focus.
- **FinalCTA:** Subtle. Atmosphere only.
- **Elsewhere:** No video.

### Readability

- **Contrast:** Ensure text meets WCAG. Dark overlay on video. Or: text in a "card" or "panel" with solid background.
- **Font weight:** Heavier weights for headlines on video.
- **Test:** Check on various screens. Video can reduce contrast.

### Premium, Not Cheesy

- **No people:** Avoid builder-in-hard-hat shots. Focus on structure, materials, process.
- **No music:** Or very subtle ambient. Let video breathe.
- **Slow:** No fast cuts. Slow motion. Meditative.
- **Colour:** Desaturated. Blue/steel tones. Match brand.
- **No text on video:** Avoid overlaying text directly on busy parts of video. Use overlay or solid areas.

### Mobile Fallback

- **Video:** Disable on mobile (or low-power mode). Use poster image instead.
- **Poster:** First frame of video, or a curated still (e.g. blueprint, framing, finished detail). Same tone.
- **Performance:** `preload="metadata"` or `none`. Lazy load. Consider serving smaller resolution on mobile if video is used.
- **Detection:** `prefers-reduced-motion` or viewport size. Fallback to static.

### Poster / Fallback Frames

- **Hero:** Key frame from video — e.g. structure mid-build, or blueprint. Or: current dark + blueprint grid (no video).
- **Story section:** Same. Or: gradient + grid.
- **FinalCTA:** Dark solid or very subtle gradient.

### Performance Precautions

- **Format:** WebM + MP4. Use `<video>` with `<source>`. Optimise for web (compression).
- **Size:** Keep under 5MB for Hero. Shorter clip = smaller.
- **Autoplay:** `muted` and `playsinline` for autoplay. No sound = autoplay allowed.
- **Lazy load:** Don't load video until Hero is in view (or on load for Hero).
- **Intersection Observer:** Pause video when out of view. Save resources.

### Overlays, Gradients, Blur, Masking, Texture

- **Overlay:** Dark linear gradient (bottom to top) or radial (edges dark). Opacity 0.4–0.6. Ensures text readability.
- **Blur:** Optional. `backdrop-filter` or video blur. Subtle.
- **Masking:** Vignette. Or: video only in centre, fade at edges.
- **Texture:** Blueprint grid over video at low opacity (0.05–0.1). Maintains brand.
- **Gradient:** Combine with overlay. Blue-to-transparent? Match brand.

---

## G. VISUAL SYSTEM UPGRADE

### Typography System

- **Keep:** Barlow Condensed (display), Barlow (body), Space Mono (labels), Merriweather (serif).
- **Extend:** Add weight variants if needed. Barlow Condensed 800 for hero. Merriweather for more pull quotes.
- **Scale:** Increase max sizes. Hero: 96px → 120px or 140px. FinalCTA: 80px → 100px. Guarantee: 42px → 56px.
- **Line height:** Tighter for display. 0.9–0.95 for headlines.
- **Letter spacing:** Slightly tighter for large type. -0.02em for hero.

### Display Typography Behaviour

- **Responsive:** `clamp()` for fluid scaling. Increase max.
- **Line breaks:** Curate. "Stop wasting nights / on quotes that were / never going to happen." — control where breaks occur.
- **Colour:** White on dark. Slate on light. Blue accent for span.
- **Animation:** Consider: word-by-word or line-by-line reveal for hero. Or: blur-to-clear (FinalCTA has this).

### Editorial Layout System

- **Asymmetry:** Introduce. One column wider. One element breaks grid.
- **Full-bleed:** Hero, Guarantee, FinalCTA can be full viewport.
- **Overlap:** Sections can overlap (e.g. Hero content overlaps Problem top). Or: cards overlap.
- **Grid:** 12-column base. Allow elements to span irregularly (e.g. 7+5, 8+4).
- **Max-width variation:** Not everything 1040px. Some sections 1200px. Some 900px. Create rhythm.

### Spacing Rhythm

- **Section padding:** Vary. Hero: 130px top. Problem: 110px. Calculator: 100px. Create pattern. Some sections "breathe" more (e.g. FinalCTA: 140px).
- **Internal spacing:** Use 8px base. 16, 24, 32, 48, 64, 80. Consistent scale.
- **Negative space:** Increase in Hero, Guarantee, FinalCTA. Sparse = premium.

### Grid Approach

- **CSS Grid:** Use for complex layouts. Problem, Solution, Proof — grid with asymmetric spans.
- **Flexbox:** For nav, footers, simple stacks.
- **Breakpoints:** 768px (mobile), 1024px (tablet), 1280px (desktop). Refine as needed.

### Asymmetry Use

- **Problem:** One card 2/3 width, two cards 1/3 each. Or: one full-width, two half.
- **Solution:** Same.
- **Proof:** One quote 60%, one 40%. Or: one large, one small.
- **Who:** Yes column 60%, No 40%. Or: stacked with visual weight difference.

### Texture / Noise Treatment

- **Blueprint grid:** Keep. Extend to more sections? Or: hero only. Refine opacity.
- **Noise:** Subtle film grain (0.5–1% opacity) on dark sections? Adds premium. Optional.
- **Texture:** Avoid. Keep clean. Blueprint is enough.

### Color Evolution

- **Keep palette.** Maybe add: darker slate for deeper contrast. Lighter steel for subtle backgrounds.
- **Accent use:** Blue for CTAs, links, accents. Amber for stats. Green for guarantee. Red for calculator "cost." Restrained.
- **Contrast:** Ensure 4.5:1 for body, 3:1 for large text.

### Construction / Architectural Visual Cues

- **Blueprint grid:** Primary. Keep.
- **Lines:** Left-edge rule. Consider: horizontal rules, progress lines (HowItWorks).
- **Numbers:** 01, 02, 03 — step numbers. Keep. Maybe larger.
- **Materials:** Avoid literal. Abstract: steel, concrete tones in gradients? Subtle.

### Surface Treatment

- **Dark:** Slate-900. Solid. Blueprint overlay. Video in Hero.
- **Light:** Page-bg, white, steel-100. Clean.
- **Cards:** Border, subtle shadow. Hover: lift. Refine shadow (softer, larger).
- **Sections:** Clear boundaries. Or: overlap for flow.

### Border / Shadow Usage

- **Borders:** 1px steel-200. Refine. Maybe 0.5px in some places.
- **Shadows:** Subtle. 0 4px 24px rgba(0,0,0,0.07). Hover: 0 12px 36px. Avoid heavy.
- **Elevation:** 2–3 levels. Flat, subtle, hover.

### Image / Diagram / UI Usage

- **Images:** None currently. Video replaces hero image. Optional: testimonial photos? Probably not. Keep anonymous.
- **Diagrams:** HowItWorks could have abstract diagram (blueprint → structure). Optional.
- **UI:** No fake product UI. Avoid dashboards. Process-led.

### Premium Without Messy

- **Restraint:** Fewer elements. Better chosen.
- **Consistency:** Same motion easing. Same spacing scale. Same typography rules.
- **Hierarchy:** Clear. One primary message per section.
- **No decoration:** Every element has a job. No "nice to have" shapes or icons.

---

## H. MOTION SYSTEM UPGRADE

### Hover States

- **Buttons:** Keep. Refine: maybe `scale(1.02)` instead of `y: -2`. Or: subtle glow.
- **Cards:** Keep. Refine: `y: -4`, `box-shadow` increase. Easing: `[0.16, 1, 0.3, 1]`.
- **Links:** Underline animate. Or: colour transition.
- **Nav CTA:** `whileHover` scale. Keep.

### Text Reveals

- **FadeUp:** Keep. Extend: add `FadeUpBlur` variant (blur + fade). Add `FadeUpStagger` for containers.
- **Line-by-line:** For hero headline? Each line staggers. Consider.
- **Word-by-word:** Maybe too slow. Avoid for long copy.
- **Blur-to-clear:** FinalCTA has it. Use for more headlines? Guarantee, FinalCTA.

### Section Transitions

- **Overlap:** Section A bottom overlaps Section B top. Creates flow.
- **Crossfade:** Content fades as next section fades in. Complex.
- **Scroll-linked:** As user scrolls, current section "exits" (e.g. opacity, y) and next "enters." GSAP ScrollTrigger.
- **Recommendation:** Start with overlap. Hero content overlaps Problem top by 20–40px. Subtle.

### Scroll-Based Transforms

- **Parallax:** Hero content (keep). Add: multiple layers. E.g. headline, sub, grid — each move at different rates.
- **Scale:** Section scales down slightly as it exits? Subtle.
- **Opacity:** Section fades as it exits view. Common.
- **Y:** Sections slide up as they enter. FadeUp does this. Extend.

### Stagger Systems

- **Current:** 0.09s, 0.12s, 0.15s. Uniform.
- **Upgrade:** Vary. First item: 0. Second: 0.08. Third: 0.18. Fourth: 0.32. Non-linear. Creates rhythm.
- **Stagger children:** Framer Motion `staggerChildren`. Use `delayChildren` + `staggerChildren`. Refine values.

### Parallax Layers

- **Hero:** Add 2–3 layers. Video (or background): slowest. Grid: medium. Content: fastest. Or: content, grid, video.
- **Other sections:** Optional. Problem: background pattern parallax? Subtle.

### Sticky / Pinned Moments

- **HowItWorks:** Keep. Refine.
- **Optional:** Video story section. Pin. Video progresses with scroll.
- **Avoid:** Too many pins. One, maybe two.

### CTA Interactions

- **Primary button:** Hover: background darken, slight lift. Tap: scale down. Keep.
- **Consider:** Magnetic effect (button follows cursor slightly)? Maybe. Test.
- **Consider:** Ripple? No. Keep simple.
- **Nav CTA:** Pulse when FinalCTA in view? Scroll-spy. Possible.

### Loading / Entry Behaviour

- **Page load:** No full-page loader. Content appears. Maybe: nav fades in. Hero content staggers in. Video starts. Simple.
- **Section entry:** FadeUp. Keep. Refine timing.
- **Video:** Autoplay when Hero in view. Pause when out. Saves resources.

### Motion Constraints

- **Easing:** Stick to `[0.16, 1, 0.3, 1]` (ease-out-expo) for most. Consistent.
- **Duration:** 0.4–0.6s for most. 0.8–1s for hero. Avoid > 1s for UI.
- **Reduce motion:** Respect `prefers-reduced-motion`. Disable parallax, video, complex animations. Fallback to fade.
- **No gimmicks:** No bouncing, no elastic (except maybe button tap). Restraint.

---

## I. CONVERSION STRATEGY

### Earning Trust

- **Guarantee:** 30-day. Prominent. "We own the outcome."
- **Testimonials:** Real quotes. Caveats (names withheld, results vary). Honest.
- **FAQ:** Straight answers. No evasion. "What does this cost?" — "We cover it in the first conversation."
- **No pitch:** Repeated. "No hard pitch." "No obligation." Reduces friction.
- **Calculator:** Makes problem tangible. User "sees" the cost. Self-qualification.

### Framing the Problem

- **Lead with pain:** Hero and Problem do this. "Wasting nights." "Qualification problem."
- **Make it specific:** Stats (40+ hours, 3,200 insolvent). Calculator. Numbers.
- **Avoid generic:** "Streamline your workflow" — no. "Stop quoting people who already hired someone else" — yes.

### Avoiding Software Feel

- **Done-for-you:** Emphasise. "We configure." "You don't touch anything." "We hand it back."
- **Process, not features:** No feature list. Outcomes. "Every enquiry gets a clear path."
- **No dashboards:** Don't show fake UI. No screenshots of software.
- **Human:** "Book a conversation." Not "Request a demo." Not "Sign up."

### Positioning Done-For-You Value

- **HowItWorks:** "We learn. We build. We launch. You have better conversations." Clear.
- **Credibility:** "14 days to go live. 0 tech required from you." Stats.
- **Guarantee:** "We own the outcome." Risk reversal.

### CTA Placement

- **Nav:** Persistent. "Book a Conversation."
- **Hero:** Primary. "Book a 20-Minute Conversation." Secondary: "See what free quoting is costing you" (to calculator).
- **Calculator:** "See What This Looks Like Solved."
- **FinalCTA:** "Book a 20-Minute Conversation."
- **Loopback:** "Or run the calculator first." For unconverted.

### Handling Sceptical Builders

- **FAQ:** Address objections. "Another CRM?" "No." "Change everything?" "No."
- **WhoSection:** "Not right for you if..." Honest. Filters tyre-kickers.
- **Guarantee:** "If it doesn't work in 30 days, we fix it." Reduces risk.
- **Tone:** Confident but not pushy. "We'll tell you plainly whether it's the right fit."

### Balancing Drama and Clarity

- **Drama:** Hero, HowItWorks, FinalCTA. Visual impact. Emotion.
- **Clarity:** Problem, Calculator, FAQ, Who. Information. Logic.
- **Trust:** Proof, Credibility, Guarantee. Ground.
- **Rule:** Never sacrifice readability for spectacle. Video has overlay. Type is legible. CTAs are clear.

---

## J. REACT IMPLEMENTATION RECOMMENDATION

### Component Architecture Changes

- **New:** `HeroVideoBackground` — video element, overlay, poster. Handles play/pause, visibility.
- **New:** `ScrollSection` — wrapper for sections that need scroll-linked behaviour. Optional.
- **New:** `PinnedSection` — wrapper for HowItWorks-style pin. Uses GSAP ScrollTrigger.
- **Extend:** `FadeUp` — add `variant` prop: `"fade"` | `"blur"` | `"stagger"`. Add `delayChildren`, `staggerChildren` for containers.
- **Keep:** Section components. Refactor internals. Don't replace.

### Keep or Refactor Section Components

- **Keep:** All section components. Refactor: Hero (add video), Problem (layout), Solution (layout), Calculator (presentation), Who (layout), Proof (layout), Credibility (layout), FAQ (minimal), Guarantee (layout), FinalCTA (layout).
- **Extract:** Reusable layout primitives. E.g. `AsymmetricGrid`, `EditorialCard`, `PullQuote`.

### Layout Wrappers / Motion Primitives

- **`<FadeUp>`:** Keep. Extend.
- **`<ParallaxLayer>`:** New. Wraps content, applies scroll-based y. Uses GSAP or Framer Motion `useScroll` + `useTransform`.
- **`<PinnedSection>`:** New. Wraps HowItWorks. Manages pin.
- **`<VideoBackground>`:** New. For Hero. Handles video, overlay, fallback.

### GSAP vs Framer Motion

- **GSAP:** ScrollTrigger, pinning, scrub, complex timelines. Use for: Hero parallax, HowItWorks pin, Guarantee background, any scroll-linked video.
- **Framer Motion:** useInView, layout animations, hover, tap, stagger. Use for: FadeUp, card hovers, FAQ accordion, button interactions.
- **Both:** Yes. GSAP for scroll. Framer Motion for component-level.

### Reusable Animation Systems

- **Variants:** Define in `constants/motion.js` or similar. `fadeUp`, `fadeUpBlur`, `staggerContainer`, `staggerItem`.
- **Easing:** `[0.16, 1, 0.3, 1]` as constant. Use everywhere.
- **Duration:** 0.5s default. 0.8s for hero. 0.3s for micro.

### Performance

- **Video:** Lazy load. Pause when out of view. Use `IntersectionObserver`.
- **GSAP:** `ctx.revert()` on unmount. Clean up ScrollTrigger.
- **Framer Motion:** `useInView` with `once: true` for most. Avoid re-animating.
- **Images:** None yet. If added, use `loading="lazy"`.
- **Fonts:** Preconnect. Consider `font-display: swap`.

### Implementing Background Video Responsibly

- **Component:** `HeroVideoBackground`. Props: `src`, `poster`, `overlayOpacity`, `onCanPlay`.
- **State:** `isPlaying`, `isVisible`. Pause when `!isVisible`.
- **Fallback:** `poster` image. Or: `prefers-reduced-motion` → no video.
- **Mobile:** `window.matchMedia('(max-width: 768px)')` or `prefers-reduced-motion` → poster only.
- **Performance:** `preload="metadata"`. Consider `loading="lazy"` for below-fold video (N/A for Hero).

### Build Order

1. **Hero video:** Add `HeroVideoBackground`. Integrate. Test fallback. Test performance.
2. **Typography scale:** Increase hero, FinalCTA, Guarantee headline sizes.
3. **Problem layout:** Redesign to asymmetric. New layout component.
4. **Solution layout:** Same.
5. **Proof layout:** Same.
6. **Who layout:** Redesign.
7. **Calculator presentation:** Refine container. No video.
8. **Guarantee layout:** Full viewport. Larger type.
9. **FinalCTA layout:** Sparse. Larger. Optional subtle video.
10. **Section transitions:** Overlap. Refine.
11. **Motion polish:** Stagger refinement. Parallax layers.
12. **Optional:** Pinned video story section. Phase 2.

### Avoid

- **Full rewrite:** Don't discard. Evolve.
- **Too many pins:** Max 2.
- **Video everywhere:** Hero + optional one more. No more.
- **Heavy dependencies:** No new libs unless necessary.
- **Breaking calculator:** Test thoroughly.
- **Sacrificing mobile:** Fallbacks. Test.

---

## K. FINAL HANDOFF BRIEF

**For Claude Code (or development team):**

You are upgrading the PreBuild Autopilot landing page from its current state (a well-structured, conversion-oriented page with a coherent visual system) into a premium, cinematic, editorial experience. The existing repo is the source of truth. Do not rewrite from scratch.

**Core constraints:**
- Preserve the strategic content spine. All headlines and key copy stay unless there is a strong reason to change.
- Preserve the section order: Nav, Hero, Problem, Calculator, Solution, HowItWorks, Who, Proof, Credibility, FAQ, Guarantee, FinalCTA, Footer.
- Preserve the calculator logic, FAQ content, and trust architecture.
- Upgrade the experience. Evolve layouts, motion, and visual treatment. Do not flatten into generic SaaS.

**Primary new element:**
- Implement a cinematic background video in the Hero section. The video should show the progression of a house/structure being built — semi-abstract, atmospheric, premium. It should NOT feel like a cheesy stock construction montage. Include: overlay for readability, poster/fallback for mobile and reduced-motion, pause when out of view, performance optimisation.

**Visual upgrades:**
- Increase typography scale for Hero, Guarantee, and FinalCTA headlines.
- Redesign Problem, Solution, Proof, and Who sections with asymmetric, editorial layouts. No more three equal cards or two equal columns.
- Refine Calculator presentation — more immersive, less form-like.
- Make Guarantee and FinalCTA full or near-full viewport. Sparse. Bold.
- Add section overlap where appropriate (e.g. Hero content overlaps Problem).
- Extend FadeUp with blur variant. Refine stagger timing.

**Motion upgrades:**
- Keep GSAP for Hero parallax, HowItWorks pin, Guarantee background.
- Keep Framer Motion for FadeUp, hovers, FAQ.
- Add parallax layers to Hero if feasible.
- Refine section transitions. Consider overlap.
- Respect `prefers-reduced-motion`. Fallbacks for video and complex motion.

**Technical:**
- New component: `HeroVideoBackground` (or similar). Handles video, overlay, poster, visibility.
- Extend `FadeUp` with variants.
- No new major dependencies. Use existing GSAP, Framer Motion.
- Test on mobile. Video fallback. Performance budget.

**Tone:**
- The result should feel like a top-tier agency site for a premium B2B service. Cinematic, editorial, architecturally intelligent. Restrained but impressive. Builder-adjacent without clichés. The video supports the story of moving from chaos to structure — it does not distract from it.

**Build in this order:**
1. Hero video + overlay + fallback
2. Typography scale
3. Problem layout
4. Solution layout
5. Proof layout
6. Who layout
7. Calculator, Guarantee, FinalCTA presentation
8. Motion and transition polish

End of brief.
