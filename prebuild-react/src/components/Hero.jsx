import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FadeUp } from './FadeUp'

gsap.registerPlugin(ScrollTrigger)

const HomeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

/* Stagger config for hero entrance */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero({ scrollTo }) {
  const heroRef    = useRef(null)
  const contentRef = useRef(null)
  const gridRef    = useRef(null)

  /* GSAP parallax — content drifts up, blueprint grid drifts slower */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Content parallax */
      gsap.to(contentRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
      /* Stats strip subtle upward drift */
      gsap.fromTo(
        '.hero-stats',
        { y: 30 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-stats',
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="s-dark" ref={heroRef}>
      <div className="hero">
        <div className="wrap" ref={contentRef}>
          <motion.div variants={container} initial="hidden" animate="show">

            <motion.span className="eyebrow" variants={item}>
              For Australian residential builders · 5–30 homes / year
            </motion.span>

            <motion.h1 className="h1" variants={item}>
              Stop wasting nights<br />
              on quotes that were<br />
              <span>never going to happen.</span>
            </motion.h1>

            <motion.p className="hero-sub" variants={item}>
              PreBuild installs a structured front-end process for residential builders so the right
              leads move forward — and the{' '}
              <strong>wrong ones stop draining your time.</strong>
            </motion.p>

            <motion.div className="hero-ctas" variants={item}>
              <motion.a
                href="#final-cta"
                className="btn-primary"
                onClick={(e) => { e.preventDefault(); scrollTo('final-cta') }}
                whileHover={{ background: 'var(--blue-600)', y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Book a 20-Minute Conversation →
              </motion.a>
              <button
                className="btn-ghost"
                onClick={() => scrollTo('calculator')}
              >
                See what free quoting is costing you →
              </button>
            </motion.div>

            <motion.div className="hero-guarantee" variants={item}>
              <div className="hero-guarantee-icon">✓</div>
              <span className="hero-guarantee-text">
                <strong>30-day guarantee</strong> — First serious lead through the full process, or we rebuild.
              </span>
            </motion.div>

            <motion.span className="hero-trust" variants={item}>
              No hard pitch. Just a look at your current process and whether this is a fit.
            </motion.span>

          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="hero-stats">
        <div className="hero-stats-inner">
          {[
            {
              num: '40+',
              label: 'Hours lost per phantom quote',
              sub: "At $150/hr — that's $6k per job that goes nowhere",
              source: 'Internal builder surveys, 2024',
              delay: 0.1,
            },
            {
              num: '3,200',
              label: 'AU builders insolvent in 2024',
              sub: 'Margins under 10%. Every wasted hour is a direct hit.',
              source: 'Source: ASIC 2024',
              delay: 0.2,
            },
            {
              num: '30–60%',
              label: 'Budget gap homeowners carry',
              sub: 'Discovered at hour 35 of your quote — not hour zero.',
              source: 'Based on HIA data',
              delay: 0.3,
            },
          ].map(({ num, label, sub, source, delay }) => (
            <FadeUp key={num} delay={delay}>
              <div className="hero-stat">
                <div className="stat-num">{num}</div>
                <div className="stat-label">{label}</div>
                <div className="stat-sub">{sub}</div>
                <div className="stat-source">{source}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
