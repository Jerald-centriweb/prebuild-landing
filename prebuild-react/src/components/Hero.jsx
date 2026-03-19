import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HomeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

/* ── Headline lines that reveal one by one as you scroll ── */
const HEADLINE_LINES = [
  { text: 'Stop wasting nights', accent: false },
  { text: 'on quotes that were', accent: false },
  { text: 'never going to happen.', accent: true },
]

/* ── Stats that weave into the scroll after the headline ── */
const STATS = [
  { num: '40+', unit: 'hrs', label: 'Lost per phantom quote', sub: "At $150/hr — that's $6k per job that goes nowhere" },
  { num: '3,200', unit: '', label: 'AU builders insolvent in 2024', sub: 'Margins under 10%. Every wasted hour is a direct hit.' },
  { num: '30–60%', unit: '', label: 'Budget gap homeowners carry', sub: 'Discovered at hour 35 — not hour zero.' },
]

export default function Hero({ scrollTo }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)

  /* Scroll progress across the tall container */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Add a highly fluid spring physics layer to glide through video scroll updates smoothly
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 40, 
    damping: 20,
    mass: 1 
  })

  /* Video scrub: map scroll to video currentTime */
  useMotionValueEvent(smoothProgress, 'change', (v) => {
    if (videoRef.current && videoReady) {
      const duration = videoRef.current.duration || 10
      window.requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = v * duration * 0.8
        }
      })
    }
  })

  /* Parallax transforms */
  const heroContentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0])
  const heroContentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85])
  const heroContentY = useTransform(scrollYProgress, [0, 0.6], [0, -120])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.35, 0.2, 0.08])

  /* Line-by-line reveal transforms */
  const line1Opacity = useTransform(scrollYProgress, [0, 0.03, 0.08], [0, 0, 1])
  const line1Y = useTransform(scrollYProgress, [0, 0.03, 0.08], [40, 40, 0])
  const line1Blur = useTransform(scrollYProgress, [0, 0.03, 0.08], [8, 8, 0])

  const line2Opacity = useTransform(scrollYProgress, [0.05, 0.08, 0.13], [0, 0, 1])
  const line2Y = useTransform(scrollYProgress, [0.05, 0.08, 0.13], [40, 40, 0])
  const line2Blur = useTransform(scrollYProgress, [0.05, 0.08, 0.13], [8, 8, 0])

  const line3Opacity = useTransform(scrollYProgress, [0.1, 0.13, 0.18], [0, 0, 1])
  const line3Y = useTransform(scrollYProgress, [0.1, 0.13, 0.18], [40, 40, 0])
  const line3Blur = useTransform(scrollYProgress, [0.1, 0.13, 0.18], [8, 8, 0])

  /* Derived blur filter values — must be called at top level, not inside map */
  const line1Filter = useTransform(line1Blur, (v) => `blur(${v}px)`)
  const line2Filter = useTransform(line2Blur, (v) => `blur(${v}px)`)
  const line3Filter = useTransform(line3Blur, (v) => `blur(${v}px)`)

  const lineTransforms = [
    { opacity: line1Opacity, y: line1Y, filter: line1Filter },
    { opacity: line2Opacity, y: line2Y, filter: line2Filter },
    { opacity: line3Opacity, y: line3Y, filter: line3Filter },
  ]

  /* Subtext + CTA reveal */
  const subOpacity = useTransform(scrollYProgress, [0.15, 0.2], [0, 1])
  const subY = useTransform(scrollYProgress, [0.15, 0.2], [20, 0])

  /* Stats reveal — each stat staggers in */
  const stat1Opacity = useTransform(scrollYProgress, [0.4, 0.48], [0, 1])
  const stat1Y = useTransform(scrollYProgress, [0.4, 0.48], [40, 0])
  const stat2Opacity = useTransform(scrollYProgress, [0.48, 0.56], [0, 1])
  const stat2Y = useTransform(scrollYProgress, [0.48, 0.56], [40, 0])
  const stat3Opacity = useTransform(scrollYProgress, [0.56, 0.64], [0, 1])
  const stat3Y = useTransform(scrollYProgress, [0.56, 0.64], [40, 0])

  const statTransforms = [
    { opacity: stat1Opacity, y: stat1Y },
    { opacity: stat2Opacity, y: stat2Y },
    { opacity: stat3Opacity, y: stat3Y },
  ]

  /* Eyebrow + scroll cue initial entrance (not scroll-linked, just on load) */
  const eyebrowAnim = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  }

  const handleVideoLoaded = () => setVideoReady(true)

  return (
    <section className="hero-container" ref={containerRef}>
      {/* Sticky viewport — stays fixed while user scrolls through the tall container */}
      <div className="hero-sticky">
        {/* Video background — scrubs with scroll */}
        <motion.video
          ref={videoRef}
          className="hero-video-bg"
          src="/video/Cinematic_Luxury_Home_Formation_Background.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedData={handleVideoLoaded}
          style={{ scale: videoScale, opacity: videoOpacity }}
        />
        <div className="hero-video-overlay" aria-hidden="true" />

        {/* Blueprint grid — subtle background texture */}
        <div className="hero-grid" aria-hidden="true" />

        {/* Main hero content — fades and beautifully compresses with scroll */}
        <motion.div
          className="hero-content"
          style={{ opacity: heroContentOpacity, scale: heroContentScale, y: heroContentY }}
        >
          <motion.span className="eyebrow" {...eyebrowAnim}>
            For Australian residential builders · 5–30 homes / year
          </motion.span>

          {/* Headline — each line reveals with scroll-controlled blur-to-sharp */}
          <h1 className="hero-h1">
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={i}
                className={`hero-h1-line${line.accent ? ' accent' : ''}`}
                style={{
                  opacity: lineTransforms[i].opacity,
                  y: lineTransforms[i].y,
                  filter: lineTransforms[i].filter,
                  display: 'block',
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* Subtext + CTA — appears after headline completes */}
          <motion.div style={{ opacity: subOpacity, y: subY }}>
            <p className="hero-sub">
              PreBuild installs a structured front-end process for residential builders so the right
              leads move forward — and the{' '}
              <strong>wrong ones stop draining your time.</strong>
            </p>

            <motion.a
              href="#final-cta"
              className="btn-primary btn-hero"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-survey')) }}
              whileHover={{ background: 'var(--blue-600)', y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Apply for a Consult →
            </motion.a>

            <span className="hero-trust">
              No hard pitch · 30-day performance guarantee
            </span>
          </motion.div>
        </motion.div>

        {/* Stats — revealed after hero content scrolls away */}
        <div className="hero-stats-overlay">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.num}
              className="hero-stat-card"
              style={{ opacity: statTransforms[i].opacity, y: statTransforms[i].y }}
            >
              <div className="hero-stat-num">{stat.num}</div>
              <div className="hero-stat-label">{stat.label}</div>
              <div className="hero-stat-sub">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-line" />
        </motion.div>
      </div>
    </section>
  )
}
