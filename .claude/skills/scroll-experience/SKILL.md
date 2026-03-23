---
name: scroll-experience
description: Design and implement cinematic scroll-driven UX for landing pages. Use when improving scroll behaviour, scroll-linked animations, parallax, scroll storytelling, section transitions, or scroll-controlled video. Triggers on "scroll experience", "scroll animation", "scroll feel", "make the scroll better", "cinematic scroll", "Apple-like scroll".
---

Design and implement premium scroll-driven experiences using Framer Motion and GSAP for this React + Vite project.

## Activation Triggers

"scroll experience", "scroll animation", "make the scroll feel better", "improve scrolling", "cinematic scroll", "scroll storytelling", "parallax", "scroll-linked", "Apple-like", "video scrub", "scroll trigger"

## Architecture Principles

This project uses a hybrid approach:
- **Framer Motion** (`useScroll`, `useTransform`, `useSpring`, `useMotionValueEvent`) for declarative scroll-linked value transforms
- **GSAP + ScrollTrigger** for pinned sections, timeline sequences, and step reveals
- Sticky 100vh viewports inside tall scroll containers (e.g., 350vh hero) for scrubbing

## Core Patterns

### Scroll-Linked Value Transform (Framer Motion)
```jsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
const y = useTransform(scrollYProgress, [0, 1], [0, -200])
```

### Spring-Smoothed Video Scrub
```jsx
const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20, mass: 1 })
useMotionValueEvent(smoothProgress, 'change', (v) => {
  if (videoRef.current) {
    requestAnimationFrame(() => {
      videoRef.current.currentTime = v * videoRef.current.duration * 0.8
    })
  }
})
```

### Blur-to-Sharp Reveal (at top level — never inside .map())
```jsx
const lineBlur = useTransform(scrollYProgress, [0.0, 0.08], [12, 0])
const lineFilter = useTransform(lineBlur, (v) => `blur(${v}px)`)
// Apply: style={{ filter: lineFilter }}
```

### GSAP Pinned Step Reveal
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${steps.length * 100}%`,
      pin: true,
      scrub: 1,
    })
    steps.forEach((_, i) => {
      gsap.from(stepRefs.current[i], {
        opacity: 0, y: 40,
        scrollTrigger: { trigger: containerRef.current, start: `${i * 25}% center`, end: `${(i + 1) * 25}% center`, scrub: true }
      })
    })
  }, containerRef)
  return () => ctx.revert()
}, [])
```

## Scroll Pacing Guide

For a 350vh hero container (viewport = 726px → total = ~2500px):

| Scroll % | Pixel range | What happens |
|----------|-------------|--------------|
| 0–8% | 0–200px | Line 1 headline reveals |
| 5–13% | 125–325px | Line 2 reveals |
| 10–18% | 250–450px | Line 3 reveals |
| 15–20% | 375–500px | Subtext + CTA reveals |
| 30–60% | 750–1500px | Hero content fades + parallaxes up |
| 40–64% | 1000–1600px | Stats reveal one by one |
| 70–100% | 1750–2500px | Video fades out, transition to next section |

## Common Mistakes to Avoid

1. **Hooks in loops** — Never call `useTransform` inside `.map()`. Derive all values at component top level, then reference them in the array.
2. **Missing `requestAnimationFrame`** — Video `currentTime` assignments without rAF cause frame drops.
3. **Fade too early** — Hero content opacity should start fading no earlier than 20–30% scroll progress; users need time to read.
4. **Stats overlap with content** — Stagger stats to appear as hero content is fading (not before).
5. **Nav CTA always visible** — Should start at `opacity: 0` and only gain `.visible` class after user scrolls past the hero.

## Section Transition Principles

- Each section change should feel like a scene cut, not a page scroll
- Use `overflow: hidden` on section wrappers to clip parallax elements
- Entry animations: `FadeUp` (y: 40→0, opacity 0→1) with 0.6–0.85s duration
- For dramatic reveals: `RevealBlur` (blur 12px→0, opacity 0→1)
- Avoid simultaneous entrance of more than 3 elements — stagger by 0.1–0.15s

## Performance Rules

- Never animate `width`, `height`, or `top/left` — use `transform` and `opacity` only
- Use `will-change: transform` sparingly and only on actively animating elements
- Video scrub: always gate on `videoReady` state to avoid currentTime errors
- GSAP contexts: always return `ctx.revert()` from useEffect cleanup

## Quality Checklist

- [ ] Scroll feels smooth at 60fps (no jank on trackpad)
- [ ] Content is readable for long enough at each scroll position
- [ ] Video scrub is fluid (spring-smoothed, not jumpy)
- [ ] Each section has a clear entrance moment
- [ ] Mobile scroll works without horizontal overflow
- [ ] No hooks called conditionally or inside loops
