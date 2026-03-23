import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion'

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

  /* Use raw scrollY (pixels) for predictable, pixel-perfect control */
  const { scrollY } = useScroll()

  /* Spring-smoothed scroll for video scrub only */
  const smoothScroll = useSpring(scrollY, { stiffness: 40, damping: 20, mass: 1 })

  /* Video scrub: map scroll to video currentTime */
  useMotionValueEvent(smoothScroll, 'change', (v) => {
    if (videoRef.current && videoReady) {
      const duration = videoRef.current.duration || 10
      const heroH = containerRef.current?.offsetHeight || 2500
      const progress = Math.min(v / heroH, 1)
      window.requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = progress * duration * 0.8
        }
      })
    }
  })

  /* ── Scroll-driven headline reveal (in absolute pixels) ── */
  /*
   * PACING:
   *   0–120px    : Line 1 reveals (blur-to-sharp)
   *   60–200px   : Line 2 reveals
   *   140–280px  : Line 3 reveals
   *   220–380px  : Subtext + CTA reveals
   *   380–1000px : ★ HOLD — full hero in frame, video scrubs ★
   *   1000–1600px: Hero fades out, stats fade in
   *   1300–2000px: Stats stagger in
   */

  /* Line-by-line scroll reveal — tight stagger */
  const line1Opacity = useTransform(scrollY, [0, 30, 120], [0, 0, 1])
  const line1Y = useTransform(scrollY, [0, 30, 120], [30, 30, 0])
  const line1Blur = useTransform(scrollY, [0, 30, 120], [10, 10, 0])

  const line2Opacity = useTransform(scrollY, [60, 100, 200], [0, 0, 1])
  const line2Y = useTransform(scrollY, [60, 100, 200], [30, 30, 0])
  const line2Blur = useTransform(scrollY, [60, 100, 200], [10, 10, 0])

  const line3Opacity = useTransform(scrollY, [140, 180, 280], [0, 0, 1])
  const line3Y = useTransform(scrollY, [140, 180, 280], [30, 30, 0])
  const line3Blur = useTransform(scrollY, [140, 180, 280], [10, 10, 0])

  /* Blur → CSS filter (top-level, never in .map()) */
  const line1Filter = useTransform(line1Blur, (v) => `blur(${v}px)`)
  const line2Filter = useTransform(line2Blur, (v) => `blur(${v}px)`)
  const line3Filter = useTransform(line3Blur, (v) => `blur(${v}px)`)

  const lineTransforms = [
    { opacity: line1Opacity, y: line1Y, filter: line1Filter },
    { opacity: line2Opacity, y: line2Y, filter: line2Filter },
    { opacity: line3Opacity, y: line3Y, filter: line3Filter },
  ]

  /* Subtext + CTA reveal — right after lines finish */
  const subOpacity = useTransform(scrollY, [220, 380], [0, 1])
  const subY = useTransform(scrollY, [220, 380], [20, 0])

  /* Hero content fade-out — big hold gap, then fade */
  const heroContentOpacity = useTransform(scrollY, [1000, 1600], [1, 0])
  const heroContentScale = useTransform(scrollY, [800, 1600], [1, 0.88])
  const heroContentY = useTransform(scrollY, [800, 1600], [0, -80])
  const videoScale = useTransform(scrollY, [0, 2500], [1, 1.15])
  const videoOpacity = useTransform(scrollY, [0, 1800, 2500], [0.35, 0.2, 0.08])

  /* Stats reveal — stagger in as hero content fades */
  const stat1Opacity = useTransform(scrollY, [1300, 1500], [0, 1])
  const stat1Y = useTransform(scrollY, [1300, 1500], [40, 0])
  const stat2Opacity = useTransform(scrollY, [1500, 1700], [0, 1])
  const stat2Y = useTransform(scrollY, [1500, 1700], [40, 0])
  const stat3Opacity = useTransform(scrollY, [1700, 1900], [0, 1])
  const stat3Y = useTransform(scrollY, [1700, 1900], [40, 0])

  const statTransforms = [
    { opacity: stat1Opacity, y: stat1Y },
    { opacity: stat2Opacity, y: stat2Y },
    { opacity: stat3Opacity, y: stat3Y },
  ]

  /* Eyebrow entrance (on load, not scroll) */
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

          {/* Headline — scroll-driven blur-to-sharp reveal, compressed pacing */}
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

          {/* Subtext + CTA — reveals right after headline completes */}
          <motion.div style={{ opacity: subOpacity, y: subY }}>
            <p className="hero-sub">
              PreBuild installs a structured front-end process for residential builders so the right
              leads move forward — and the{' '}
              <strong>wrong ones stop draining your time.</strong>
            </p>

            <motion.button
              type="button"
              className="btn-primary btn-hero"
              onClick={() => window.dispatchEvent(new Event('open-survey'))}
              whileHover={{ background: 'var(--blue-600)', y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              Apply for a Consult →
            </motion.button>

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
