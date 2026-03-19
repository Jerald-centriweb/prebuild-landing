# PreBuild Autopilot — Why This Page Is Bad & What Claude Must Fix

**Purpose:** A brutally honest teardown of the current landing page, followed by exact implementation instructions. This is a cold outreach page for Australian residential builders. It needs to convert sceptical, time-poor tradespeople who have never heard of this product, probably landed here from an ad or cold email, and will bounce in 3 seconds if it doesn't grab them.

---

## THE BRUTAL TRUTH: WHY THIS PAGE DOESN'T WORK

### 1. It looks like a developer built it, not a designer

The entire page is a vertical stack of rectangular sections with zero visual tension. Every section follows the same pattern: eyebrow tag → heading → paragraph → grid of equal-sized cards. It's predictable from the second screen. There is no moment that makes someone stop scrolling. No surprise. No drama. No "this is different from every other website I've seen today."

The blueprint grid background and the left-edge blue rule are nice ideas, but they're the only two visual signatures on the entire page. Everything else is generic: white cards with grey borders, symmetrical grids, centred text blocks. It looks like a Bootstrap template with better typography.

### 2. The Hero is a wall of text with no visual hook

The hero section is a dark rectangle with text. No image. No video. No visual element of any kind besides a faint grid pattern. For a cold outreach page where builders are landing for the first time, this is a death sentence. You have maybe 2–3 seconds. The headline is good ("Stop wasting nights on quotes that were never going to happen") but it's competing with nothing. There's no visual anchor. No emotional resonance. No atmosphere. It feels like a slide deck, not a destination.

Worse: below the headline there are **six distinct elements** stacked vertically before the section ends:
1. Eyebrow
2. H1
3. Paragraph
4. Two CTA buttons
5. Guarantee badge
6. "No hard pitch" trust line

That's way too much. The hero is trying to say everything at once. It should say one thing powerfully.

### 3. The Stats Strip is wasted potential

Three industry stats sit in a grey bar below the hero with tiny 12px labels. These numbers (40+ hours lost, 3,200 builders insolvent, 30–60% budget gap) are the most emotionally compelling data on the page. They should hit you in the chest. Instead they're tucked into a forgettable footer-style strip. The sources ("Internal builder surveys, 2024") make them feel even weaker.

### 4. Every section uses the same layout pattern

- Problem: 3 equal cards in a row
- Solution: 3 equal cards in a row
- Calculator: 2-column split
- Who: 2 equal columns
- Proof: 2 equal cards in a row
- Credibility: 2-column split

There is zero layout variety. The eye has nowhere to go. Nothing is emphasized over anything else. When everything is the same size and weight, nothing is important. This is the single biggest visual problem with the page.

### 5. The motion is wallpaper

Almost every element on the page uses the same animation: FadeUp (opacity 0→1, y 13→0, duration 0.52s). The same easing. The same distance. The same trigger. It's applied uniformly to everything — headings, cards, paragraphs, buttons. When every element animates the same way, animation becomes invisible. It adds loading delay without adding perceived quality.

The one exception is HowItWorks, which uses GSAP ScrollTrigger to pin and stagger. That section feels noticeably better than everything around it. But it's an island.

### 6. Typography is consistent but never dramatic

Barlow Condensed is a strong display face, but it's always used at predictable sizes. The H1 maxes at 96px. The H2 maxes at 58px. Nothing ever dominates the viewport. There's no moment where the type IS the design — where a single word or number fills the screen. On a cold outreach page, you need at least 2–3 moments of typographic impact. This page has zero.

### 7. The page reads like an essay, not a story

There is no emotional arc. No build-up. No climax. It's a flat line of information:
- Here's the problem
- Here's a calculator
- Here's the solution
- Here's how it works
- Here's who it's for
- Here's what people say
- Here's our guarantee
- Book a call

That's logical, but it's not compelling. A cold outreach page for sceptical builders needs to feel like a conversation that builds urgency. The pacing should have peaks and valleys — moments of intensity followed by breathing room. Right now it's a steady drone.

### 8. The Calculator section feels like a form, not an experience

The calculator is the strongest conversion asset on the page. But it's trapped inside a bordered box that looks like an embedded form. The inputs are on white, the outputs are on dark — good contrast — but the whole thing feels functional, not dramatic. When someone adjusts a slider and sees "$66,000 / year in unrecoverable capacity," that number should feel like a punch. Instead it just... updates quietly in a box.

### 9. The testimonials are anonymous and feel fabricated

"Custom home builder, NSW" and "Residential builder, QLD" — these could be anyone. They could be made up. On a cold outreach page where builders don't know you, anonymous testimonials with "Names withheld at clients' request" actually hurt more than they help. If you don't have real named testimonials, you might be better off replacing this section with something else (case study metrics, before/after process comparison, video testimonial — anything with more specificity).

### 10. The Guarantee section is buried and timid

"Your first serious lead through the full process within 30 days of going live — or we go back in and rebuild until it does." This is a STRONG guarantee. But it's sitting on a medium-green background in medium-sized type. It should be a full-viewport moment. It should feel like a handshake. Instead it's just another section in the stack.

### 11. The Final CTA has no gravity

"Your next enquiry should be worth your time" is a good line. But the section is centred text, a button, and some small type. It looks identical to a hundred other SaaS closing sections. For a cold outreach page, this is the moment of truth — the entire page was building to this. It should feel like the culmination. Instead it feels like another block.

### 12. Mobile is an afterthought

The responsive CSS is a single media query that just stacks grids to one column. No consideration for: touch targets on the calculator sliders, reading order priority, mobile-specific CTA sizing, section padding rhythm on small screens, or the fact that mobile users are probably builders checking this on their phone during a break.

### 13. There's no visual metaphor connecting the experience

The page is about builders. About construction. About moving from chaos to structure. But visually, there's no metaphor. No progression. No sense that as you scroll, something is being "built." The blueprint grid hints at it but never evolves. The page starts dark, goes light, goes dark, goes light, goes green, goes dark. There's no visual story.

### 14. The CSS architecture will fight you on upgrades

900+ lines of global CSS in one file. Every section's styles are co-located in a single `globals.css`. There are no CSS modules, no scoped styles, no utility classes. Class names like `.s-dark`, `.h2`, `.lead` are global and fragile. Any layout redesign will require careful surgery on this monolithic file. The component JSX also uses inline styles (`style={{ marginTop: 0 }}`) to override the global CSS, which is a red flag — it means the design system doesn't actually work and needs constant patching.

### 15. The "done-for-you" message gets lost

This page is selling a premium service, not software. But it reads like a software landing page. Card grids, feature lists, metric badges — these are SaaS patterns. A done-for-you service for builders should feel more like a high-end consultancy: confident, sparse, relationship-oriented. The page over-explains and under-impresses.

---

## WHAT MUST CHANGE: IMPLEMENTATION INSTRUCTIONS

### Architecture

The codebase is at `/prebuild-react/`. It's a Vite + React 18 SPA. Framer Motion and GSAP are installed. The page has 13 sections as separate components in `/src/components/`. Styles are in `/src/styles/globals.css`.

**File structure:**
```
prebuild-react/
├── src/
│   ├── App.jsx              (section order — keep)
│   ├── main.jsx             (entry — keep)
│   ├── styles/
│   │   └── globals.css      (monolithic — refactor)
│   └── components/
│       ├── Nav.jsx
│       ├── Hero.jsx
│       ├── ProblemSection.jsx
│       ├── CalculatorSection.jsx
│       ├── SolutionSection.jsx
│       ├── HowItWorks.jsx
│       ├── WhoSection.jsx
│       ├── ProofSection.jsx
│       ├── CredibilitySection.jsx
│       ├── FAQSection.jsx
│       ├── GuaranteeSection.jsx
│       ├── FinalCTA.jsx
│       ├── Footer.jsx
│       └── FadeUp.jsx       (reusable motion — extend)
├── index.html
├── package.json
└── vite.config.js
```

### Section Order

Keep the same order. It's strategically sound:
```
Nav → Hero → Problem → Calculator → Solution → HowItWorks → Who → Proof → Credibility → FAQ → Guarantee → FinalCTA → Footer
```

### Copy / Content

Keep all existing copy. It's strong. Specific changes:
- Hero: reduce elements below the headline. Remove either the guarantee badge or the trust line from hero — move one to nav or post-hero.
- Stats strip: promote to its own visual moment, not a footer.
- Guarantee section: headline is strong. Keep word-for-word.
- Calculator: keep all slider logic and output math.

---

## SECTION-BY-SECTION REBUILD INSTRUCTIONS

### 1. HERO — Rebuild

**Problem:** Static dark rectangle. No visual hook. Too many elements. No atmosphere.

**What to build:**
- Add a cinematic background video (or animated gradient/particles as fallback). The video should be semi-abstract: slow, atmospheric footage of a house frame or structure emerging. Not literal construction. Think: Terrence Malick, not tradie YouTube.
- If no video asset exists yet, build a dynamic CSS/canvas background that evolves — e.g. animated blueprint lines slowly drawing, or a gradient mesh that shifts subtly. Something alive. NOT a static image.
- Dark overlay on video/background for text readability (60–70% opacity gradient from bottom).
- Headline should be LARGER. Push `clamp()` max from 96px to at minimum 120px, ideally 140px on desktop.
- Reduce below-headline elements to: subtext + ONE primary CTA button. Move guarantee badge to a floating element or post-hero moment.
- Hero should be exactly 100vh. Content vertically centred.
- Entry animation: headline should reveal line-by-line or word-by-word with blur-to-sharp. Not just FadeUp. Each line staggers with 150–200ms delay. The subtext fades in after. The CTA button appears last.
- Add a scroll indicator at bottom (subtle animated chevron or "scroll" text).

**Motion:**
- Background: continuous subtle movement (parallax on scroll, or slow drift).
- Content: staggered entrance with blur-to-sharp reveals.
- On scroll: content parallax up (keep existing GSAP), background parallax at different rate.
- Stats strip fades/slides in as user scrolls to it.

**Mobile:**
- No video. Static dark gradient or poster image fallback.
- Headline: 48–56px. Single CTA.
- Stats strip: stack vertically.

### 2. STATS STRIP — Promote to its own moment

**Problem:** Buried as a footer-style bar. Data is compelling but presentation is weak.

**What to build:**
- Give it more vertical space. Each stat should be a tall panel, not a squished row.
- Numbers should be LARGE — 80px+ on desktop. Use count-up animation triggered on scroll into view (already exists in CredibilitySection's AnimatedStat — reuse that pattern but more dramatic).
- Consider: instead of a horizontal 3-column strip, make it a full-width section with stats vertically stacked or in an overlapping/asymmetric layout.
- The amber colour for the numbers is good. Keep.
- The "source" text should be even smaller and more transparent. It should exist but not compete.

### 3. PROBLEM SECTION — Redesign layout

**Problem:** Three identical cards. Predictable. No hierarchy.

**What to build:**
- Break the 3-equal-cards pattern. Options:
  - **Option A (recommended):** Full-width vertical layout. Each pain point is a large block — big number (01), headline spanning most of the width, description below. Separated by thin horizontal rules. Think editorial magazine layout, not card grid.
  - **Option B:** One primary pain (large, full-width, prominent) + two secondary (smaller, side by side below). Asymmetric hierarchy.
- Headline "Most builders don't have a quoting problem. They have a qualification problem." — make "qualification" really pop. Larger, different colour, or animated emphasis.
- Consider: pinned left column with the headline, right column scrolls through pain points. This creates a HowItWorks-like experience.
- Motion: each pain point reveals as user scrolls. Not all at once. Stagger on scroll position, not just "in view."

### 4. CALCULATOR SECTION — Make it dramatic

**Problem:** Functional but feels like an embedded form. Numbers update without impact.

**What to build:**
- Remove the bordered box container. Let the calculator breathe. Full-width or near-full-width.
- Inputs side: clean, more spacing between sliders. Larger slider thumbs. Consider: showing the slider value ABOVE the thumb as a floating label that moves with it.
- Outputs side: the numbers should be HUGE. Like, 80–100px. When a value changes, it should animate with a fast count-up and a subtle scale pulse. The colour escalation (white → amber → red) is good.
- Add a visual "shock" when the numbers are high — e.g. subtle screen shake, red glow, or a brief flash. Very subtle. Not cheesy.
- The CTA below ("That number doesn't have to be yours") is excellent copy. Keep. But make it more prominent — maybe a full-width dark bar with the serif callout larger.
- Blueprint grid on the output side: keep.

### 5. SOLUTION SECTION — Break the card pattern

**Problem:** Three more equal cards. Identical pattern to Problem.

**What to build:**
- Completely different layout from Problem. If Problem uses full-width vertical blocks, Solution should use something else.
- **Recommended:** Before/After comparison approach. Each outcome shows the "before" (struck through, muted) and the "after" (bold, emphasised) in a horizontal split. Think: left side = the old way (grey, faded), right side = the new way (blue accent, sharp).
- Or: a single scrollable/stacked list with large outcome numbers and concise descriptions. Less card-like, more editorial.
- The "before" tags (e.g. "Enquiries sitting unanswered for days") are a good concept. Make them more visually distinct — larger, with a proper strikethrough animation.

### 6. HOW IT WORKS — Evolve (best section currently)

**Problem:** It's actually decent. The GSAP pin + progress line is the best motion on the page. But it could be more cinematic.

**What to build:**
- Keep the pinned scroll structure.
- Add a visual element on the opposite side — a diagram, illustration, or abstract visual that evolves with each step. Even just a large step number that changes (01 → 02 → 03 → 04) with a transition would add a second focal point.
- Make the progress line more prominent — thicker, or add a glow.
- Step numbers: make larger. 24px+ instead of 12px.
- Consider: each step's content slides OUT as the next slides IN (instead of all remaining visible). Creates more focus.

### 7. WHO SECTION — Make it feel less like a checklist

**Problem:** Two equal columns of bullet points. Generic.

**What to build:**
- Make the "Right for you" column dominant — 60–70% width, with items as substantial blocks (not just checkmarks).
- "Not right for you" column should be secondary — smaller, muted, maybe collapsed by default on mobile.
- Or: remove the two-column structure entirely. Use a single column. "This is for builders who..." followed by a focused list. Then a smaller "This isn't for you if..." below.
- The content is good. The layout just needs to not look like every "pricing comparison" table ever made.

### 8. PROOF SECTION — Fix or replace

**Problem:** Anonymous testimonials with "names withheld" feel fabricated.

**What to build:**
- If you can get real names/companies, use them. Even first name + suburb is better than nothing.
- If testimonials must stay anonymous: change the layout to make them feel more editorial. One large pull quote (full-width, huge serif text, quotation marks as giant decorative elements) + one smaller supporting quote. Not two equal cards.
- The Merriweather serif italic for quotes is a good choice. Push it larger — 24px or even 28px for the primary quote.
- Remove the giant decorative `"` before each quote — or make it much more subtle. The current 64px Barlow Condensed quotation mark looks clip-arty.
- Consider: if you have any metrics (e.g. "saved 12 hours/week," "first qualified lead in 9 days"), add those as highlighted numbers within or alongside the quotes. Numbers are more believable than pure text.

### 9. CREDIBILITY SECTION — Merge or sharpen

**Problem:** Feels like filler. Text + stats grid. Neither is compelling on its own.

**What to build:**
- Consider merging with Proof or Who. Three trust sections in a row (Proof → Credibility → FAQ) is too much trust without a CTA break.
- If keeping: make the stats the star. Full-width stat strip. Large animated numbers. The "14 days to go live" and "0 tech required" are strong. Make them impossible to miss.
- The paragraph copy ("PreBuild was designed around the real quoting and pre-construction bottlenecks...") is good but reads like marketing. Tighten it. One short paragraph max.

### 10. FAQ SECTION — Refine

**Problem:** It's fine. Functional. But generic.

**What to build:**
- Keep accordion behaviour. It works.
- Make the section feel more editorial: larger question text, more space between items, maybe alternate background tint on hover.
- The + icon rotation to × on open is a nice touch. Keep.
- Consider: group the 5 FAQs into 2 categories (e.g. "About the system" and "About getting started") with small category labels. Breaks the monotony.

### 11. GUARANTEE SECTION — Make it a full-viewport moment

**Problem:** Strong copy, weak presentation. Just another green rectangle.

**What to build:**
- Full viewport height (100vh or close). Content vertically centred.
- Headline MUCH larger: 60–80px on desktop. This should be the boldest typography on the page outside the hero.
- Consider: dark background instead of green. The green feels like a success alert. A dark background with the guarantee text in white + a green accent (checkmark, border, or highlighted word) would feel more premium.
- Or: keep green but go darker (forest green, not medium-bright). Add a subtle texture or the blueprint grid pattern.
- The body text ("We configure the system, so we own the outcome") should be larger too. It's currently 15px italic at 55% opacity. That's invisible.

### 12. FINAL CTA — Make it the climax

**Problem:** Centred text + button. Forgettable.

**What to build:**
- Full viewport. Content vertically centred. Maximum negative space.
- Headline: push to 100–120px on desktop. "Your next enquiry should be worth your time." should feel like the final word. Oversized. Slow reveal (blur-to-sharp, character-by-character, or line-by-line).
- ONE button. Prominent. Maybe larger than any other button on the page. Possibly with a subtle glow or animation.
- "No obligation · No pitch · Available within 2 business days" — keep. But make it feel like a postscript, not a disclaimer.
- The "loopback" to calculator is smart. Keep but style it as truly secondary.
- Consider: very subtle background motion (slow gradient, particles, or the hero video at 5% opacity). Just enough to feel alive.

### 13. NAV — Polish

**Problem:** Functional but basic.

**What to build:**
- Transparent on load (no background). Solid on scroll. This already exists (`.scrolled`). Refine: add transition for logo size/opacity.
- Hide nav links on first paint, show after scroll. Or: always show them but muted. The nav shouldn't compete with hero.
- CTA button in nav should be more prominent after the user scrolls past the hero CTA.
- Mobile: hamburger menu or just keep CTA only (currently hides links, which is fine). Make CTA button larger on mobile.

### 14. FOOTER — Fine

Leave it. It's minimal. That's correct.

---

## GLOBAL VISUAL SYSTEM CHANGES

### Typography

- Keep all four typefaces (Barlow Condensed, Barlow, Space Mono, Merriweather).
- **Increase max sizes.** Hero H1: 140px max. FinalCTA heading: 120px max. Guarantee headline: 80px max. Stats numbers: 80px+.
- **Tighter line heights for display.** 0.9 for hero, 0.92 for section heads.
- **Letter spacing:** slightly negative for large display type (-0.02em to -0.03em).
- **All-caps for display:** keep, it works with Barlow Condensed. But use sentence case for subtext/descriptions.

### Layout

- **Break the symmetry.** No more than 2 sections should use the same grid pattern. If Problem is full-width vertical blocks, Solution must be something else. If Calculator is a 2-column split, Credibility must be something else.
- **Vary section heights.** Hero: 100vh. Problem: auto (content-driven). Calculator: generous padding. HowItWorks: pinned (multiple vh). Who: compact. Proof: medium. Guarantee: 80–100vh. FinalCTA: 100vh. Variety creates rhythm.
- **Max-width variation.** Not everything at 1040px. Some content at 900px (more focused), some at 1200px (more expansive).
- **Introduce asymmetry.** At least 3 sections should have intentionally unequal column layouts (60/40, 70/30, or one element breaking the grid).

### Colour

- Keep the palette. It's considered.
- **Increase contrast.** Some text is too muted (`.steel-400` on dark, `.steel-600` on light). Bump important text up one shade.
- **More deliberate dark/light alternation.** Right now: dark → light → white → light → dark → light → light → light → light → white → green → dark → dark. That's chaotic. Map it intentionally: Hero (dark) → Problem (light) → Calculator (white/dark split) → Solution (light) → HowItWorks (dark) → Who (light) → Proof (light) → Credibility (steel) → FAQ (white) → Guarantee (dark green or dark) → FinalCTA (dark) → Footer (dark). Group 2–3 light sections, then a dark break.

### Motion

- **Kill the uniform FadeUp.** Replace with a system:
  - `FadeUp` — simple fade+translate (keep for body text, small elements)
  - `RevealBlur` — blur(8px) + opacity + translate for headlines (Hero, FinalCTA, Guarantee)
  - `StaggerReveal` — container that staggers children with non-linear timing
  - `ScrollLinked` — for elements that move/change based on scroll position (stats, calculator outputs, progress indicators)
  - `SlideIn` — horizontal slide for asymmetric layouts (left or right)
- **Vary timing.** Not everything at 0.52s with the same easing. Headings: 0.8s. Cards: 0.5s. Body text: 0.4s. Micro-interactions: 0.2s. Creates rhythm.
- **Add 2–3 scroll-linked moments.** Stats numbers count up on scroll. Calculator outputs scale on change. HowItWorks progress (already exists). Maybe: a scroll progress indicator in the nav or along the page edge.
- **Reduce motion for `prefers-reduced-motion`.** Fallback to simple fades or no animation.

### CSS Architecture

- **Refactor `globals.css` into sections.** Either:
  - One CSS file per section component (co-located with JSX), OR
  - A structured globals.css with clearer separation and fewer inline style overrides.
- **Remove all `style={{ }}` inline overrides.** They indicate the design system is broken. Fix the base classes instead.
- **Audit every instance of `marginTop: 0`** — these are all patching issues with the base `.h2` or `.lead` classes having unwanted margins. Fix at the source.

### Background / Atmosphere

- **Hero:** Must have a dynamic background. Priority order:
  1. Cinematic video (if asset exists)
  2. Animated gradient mesh or noise
  3. Animated blueprint lines drawing
  4. At minimum: a subtle parallax image or gradient
- **Dark sections:** The blueprint grid is fine but don't overuse it. Maybe only on Hero and HowItWorks. Other dark sections can use subtle gradient or texture.
- **Light sections:** Currently flat white/grey. Consider very subtle noise texture (1–2% opacity) for tactile quality.

---

## PERFORMANCE REQUIREMENTS

- **Lighthouse:** Target 90+ on Performance, Accessibility, Best Practices.
- **Video (if used):** WebM + MP4 formats. Under 5MB. `muted autoplay playsinline loop`. `preload="metadata"`. Pause when out of viewport.
- **Fonts:** Already using `preconnect`. Add `font-display: swap` via CSS.
- **Images:** None currently. If adding poster frames or backgrounds, use WebP, lazy load below-fold.
- **Animations:** All GSAP ScrollTriggers must clean up on unmount (`.revert()`). Already done in Hero and HowItWorks — maintain this pattern.
- **Bundle:** Vite will tree-shake. No new dependencies unless essential.
- **Mobile:** Test on real devices. Calculator sliders must be usable with fat fingers (min 44px touch target).

---

## WHAT NOT TO DO

- **Do not add fake product screenshots, dashboards, or UI mockups.** This is a process-led service, not a software product.
- **Do not add stock photos of builders, hard hats, or construction sites.** Cheesy. Undermines premium positioning.
- **Do not add icons for every feature/benefit.** Icon grids are SaaS patterns. This isn't SaaS.
- **Do not use gradients for gradients' sake.** Every visual element must earn its place.
- **Do not add a pricing table.** Price is discussed in conversation. The FAQ handles this correctly.
- **Do not add a chatbot, popup, or exit-intent modal.** Destroys premium feel.
- **Do not break the calculator.** It's the strongest conversion tool. Test thoroughly after any changes.
- **Do not rewrite the copy.** The headlines and content are strong. Refine formatting and emphasis, not the words.
- **Do not add more sections.** 13 is already a lot. If anything, merge Credibility into Proof.

---

## BUILD PRIORITY ORDER

This is the order Claude should implement changes:

1. **Hero rebuild** — video/dynamic background, larger type, reduced clutter, dramatic entry animation. This is where 50% of the conversion impact lives. Get this right first.

2. **FinalCTA rebuild** — full viewport, oversized type, dramatic reveal, maximum focus. This is where the conversion actually happens.

3. **Guarantee section** — full viewport, bold typography, premium treatment. This is the trust anchor.

4. **Calculator polish** — remove box container, larger outputs, dramatic number animation, more breathing room.

5. **Problem section layout** — break the 3-card pattern. Editorial. Asymmetric.

6. **Solution section layout** — different layout from Problem. Before/after or editorial list.

7. **Stats strip promotion** — bigger numbers, count-up animation, more visual weight.

8. **Proof section** — editorial quote layout, not equal cards.

9. **HowItWorks evolution** — add visual column, refine pin, larger step numbers.

10. **Who section** — break equal columns.

11. **Credibility** — merge or sharpen.

12. **FAQ refinement** — polish, not rebuild.

13. **Motion system** — replace uniform FadeUp with varied reveal system across all sections.

14. **CSS cleanup** — remove inline overrides, refactor globals, improve mobile.

---

## SUMMARY

The current page is a solid first draft with good copy and correct strategy, trapped inside a generic, predictable visual execution. Every section looks the same. Every animation feels the same. There's no atmosphere, no drama, no visual story. For cold outreach to sceptical builders, this page needs to feel like it was built by people who are as good at their craft as the builders are at theirs. Right now it feels like a competent developer followed a landing page template. The bones are there. The skin needs to be completely rethought.

The page should make a builder feel: "These people are serious. They understand my world. They're not trying to sell me software — they're offering to fix a problem I've been complaining about for years. And they've clearly put as much thought into this page as I put into my builds."

That's the bar. The current version doesn't clear it.
