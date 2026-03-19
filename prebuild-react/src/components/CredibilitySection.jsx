import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FadeUp } from './FadeUp'

const CRED_STATS = [
  { num: '14', label: 'Days avg. to go live', target: 14, suffix: '' },
  { num: '8+', label: 'Manual touchpoints removed per enquiry', target: 8, suffix: '+' },
  { num: '0', label: 'Tech required from you', target: 0, suffix: '' },
  { num: '30d', label: 'Performance guarantee', target: 30, suffix: 'd' },
]

function AnimatedStat({ stat, inView }) {
  const [display, setDisplay] = useState(stat.num)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true

    const start = performance.now()
    const duration = 1200

    function tick(now) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(eased * stat.target)
      setDisplay(current + stat.suffix)
      if (t < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, stat.target, stat.suffix])

  return (
    <div className="cred-stat">
      <div className="cred-stat-num">{display}</div>
      <div className="cred-stat-label">{stat.label}</div>
    </div>
  )
}

export default function CredibilitySection() {
  const statsRef = useRef(null)
  const inView = useInView(statsRef, { once: true, margin: '-40px 0px' })

  return (
    <section className="cred-section" id="credibility">
      <div className="wrap-lg">
        <div className="cred-inner">
          <FadeUp className="cred-text">
            <span className="eyebrow-tag">About PreBuild</span>
            <p>
              PreBuild was designed around the{' '}
              <strong>real quoting and pre-construction bottlenecks</strong> that residential builders
              face — not the problems that look good in a software brochure.
            </p>
          </FadeUp>

          <motion.div
            className="cred-stats"
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.52, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {CRED_STATS.map((stat) => (
              <AnimatedStat key={stat.label} stat={stat} inView={inView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
