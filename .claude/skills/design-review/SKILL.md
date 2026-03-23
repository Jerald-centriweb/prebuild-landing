---
name: design-review
description: Visual design audit of web applications evaluating professional polish across layout, typography, colour, hierarchy, components, interactions, and responsive behaviour. Use when asked to "review the design", "does this look good", "check the layout", "is this polished", or "it looks off".
source: jezweb/claude-skills (frontend plugin)
---

Conduct a visual design audit — not usability testing — evaluating professional polish. The goal: would a design-conscious person think this looks well-executed, or developer-built?

## Activation Triggers

Phrases: "design review", "does this look good", "review the design", "check the layout", "is this polished", "it looks off", "critique the UI".

## Evaluation Dimensions

### 1. Layout & Spacing
- Consistent spacing scale (4px/8px grid discipline)
- Alignment — nothing feels accidentally placed
- Whitespace is intentional, not accidental
- Vertical rhythm holds across sections
- Responsive proportions maintain balance

### 2. Typography
- Clear hierarchy: H1 > H2 > Body > Caption
- Line length 50–75 characters for body text
- Line height: 1.4–1.6 for body, 1.1–1.2 for headlines
- Font scale is proportional — no size jumps that feel arbitrary
- Weight usage is deliberate — bold means important
- Truncation handled gracefully

### 3. Colour & Contrast
- Semantic tokens — colours mean something consistent
- WCAG AA: 4.5:1 for body text, 3:1 for large text
- Colour distribution is intentional, not chaotic
- Dark mode (if present) matches light mode quality
- Status colours (success/error/warning) are distinct and clear

### 4. Visual Hierarchy
- Single dominant CTA per viewport
- "Squint test" — blur eyes, is the page structure still clear?
- Progressive disclosure — complexity revealed at the right moment
- Grouping follows Gestalt (proximity, similarity)
- Negative space is used intentionally

### 5. Component Consistency
- Buttons: same border-radius, same padding scale, consistent hover states
- Cards: unified shadow depth, spacing, border treatment
- Inputs: unified height, border, focus ring
- Icons: same weight/style, consistent sizing
- No orphan components that don't share the design language

### 6. Interaction Design
- Hover states on all interactive elements
- Focus rings visible (not removed with outline: none)
- Active/pressed states feel physical
- Transitions 150–200ms ease — not too slow, not instant
- Loading/submitting states exist and feel considered
- Disabled states are visually distinct

### 7. Responsive Quality
- Mobile navigation works and feels native
- Images scale without distortion
- Tables scroll or reflow gracefully
- Touch targets minimum 44×44px
- Tablet breakpoint feels designed, not an afterthought

## Methodology

1. View the page at full desktop width
2. Run the "squint test" — blur your vision, check hierarchy
3. Check dark mode if applicable
4. Resize to 375px mobile
5. Identify component inconsistencies (most common developer-built UI problem)
6. Categorise issues: **High** (broken/unprofessional), **Medium** (unpolished), **Low** (nitpick)

## Output Format

Produce a structured audit with:
- Overall impression (2–3 sentences)
- Issues by severity (High / Medium / Low) with specific element callouts
- Positive patterns worth preserving
- Top 3 priority fixes for maximum visual impact

Focus on actionable specifics — not "improve typography" but "the H2 at 22px is too close to body at 18px; increase to 28px and add more weight contrast".
