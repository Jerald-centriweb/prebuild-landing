import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion'

/* ── Headline lines ── */
const HEADLINE_LINES = [
  { text: 'Stop wasting nights', accent: false },
  { text: 'on quotes that were', accent: false },
  { text: 'never going to happen.', accent: true },
]

/* ── Stats that reveal after hero content fades ── */
const STATS = [
  { num: '40+', unit: 'hrs', label: 'Lost per phantom quote', sub: "At $150/hr — that's $6k per job that goes nowhere" },
  { num: '3,200', unit: '', label: 'AU builders insolvent in 2024', sub: 'Margins under 10%. Every wasted hour is a direct hit.' },
  { num: '30–60%', unit: '', label: 'Budget gap homeowners carry', sub: 'Discovered at hour 35 — not hour zero.' },
]

const EASE = [0.16, 1, 0.3, 1]

export default function Hero({ scrollTo }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)

  const { scrollY } = useScroll()
  const smoothScroll = useSpring(scrollY, { stiffness: 40, damping: 20, mass: 1 })

  /* Video scrub */
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

  /* Hero content fade-OUT — extended hold so content stays readable longer */
  const heroContentOpacity = useTransform(scrollY, [1000, 1450], [1, 0])
  const heroContentScale = useTransform(scrollY, [1000, 1450], [1, 0.92])
  const heroContentY = useTransform(scrollY, [1000, 1450], [0, -60])

  /* Video background */
  const videoScale = useTransform(scrollY, [0, 2000], [1, 1.12])
  const videoOpacity = useTransform(scrollY, [0, 1400, 2100], [0.35, 0.2, 0.08])

  /* Stats — stagger in as hero content fades, generous windows */
  const stat1Opacity = useTransform(scrollY, [1200, 1400], [0, 1])
  const stat1Y = useTransform(scrollY, [1200, 1400], [30, 0])
  const stat2Opacity = useTransform(scrollY, [1400, 1600], [0, 1])
  const stat2Y = useTransform(scrollY, [1400, 1600], [30, 0])
  const stat3Opacity = useTransform(scrollY, [1600, 1800], [0, 1])
  const stat3Y = useTransform(scrollY, [1600, 1800], [30, 0])

  const statTransforms = [
    { opacity: stat1Opacity, y: stat1Y },
    { opacity: stat2Opacity, y: stat2Y },
    { opacity: stat3Opacity, y: stat3Y },
  ]

  const handleVideoLoaded = () => setVideoReady(true)

  /* Timed animation variants — cinematic staggered entrance on load */
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } },
  }

  const lineVariant = {
    hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 1.0, ease: EASE },
    },
  }

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section className="hero-container" ref={containerRef}>
      <div className="hero-sticky">
        {/* Video background */}
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
        <div className="hero-grid" aria-hidden="true" />

        {/* Hero text + CTA — timed entrance, scroll-driven exit together */}
        <motion.div
          className="hero-content"
          style={{ opacity: heroContentOpacity, scale: heroContentScale, y: heroContentY }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.span className="eyebrow" variants={fadeUpVariant}>
              For Australian residential builders · 5–30 homes / year
            </motion.span>

            <h1 className="hero-h1">
              {HEADLINE_LINES.map((line, i) => (
                <motion.span
                  key={i}
                  className={`hero-h1-line${line.accent ? ' accent' : ''}`}
                  style={{ display: 'block' }}
                  variants={lineVariant}
                >
                  {line.text}
                </motion.span>
              ))}
            </h1>

            <motion.div variants={fadeUpVariant}>
              <p className="hero-sub">
                PreBuild installs a structured front-end process for residential builders so the right
                leads move forward — and the{' '}
                <strong>wrong ones stop draining your time.</strong>
              </p>
            </motion.div>

            <motion.div className="hero-cta-inline" variants={fadeUpVariant}>
              <button
                type="button"
                className="btn-primary btn-hero"
                onClick={() => window.dispatchEvent(new Event('open-survey'))}
              >
                Apply for a Consult →
              </button>
              <span className="hero-trust">
                No hard pitch · 30-day performance guarantee
              </span>
              <a
                href="#"
                className="hero-book-link"
                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-booking')) }}
              >
                or book a call instead
              </a>
            </motion.div>
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
