import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { RevealBlur, FadeUp } from './FadeUp'

const TESTIMONIALS = [
  {
    quote: "I used to spend Sunday nights quoting people who had already hired someone else. That stopped. Now the ones who get through are actually serious — and they have already put skin in the game before I touch the drawings.",
    name: 'Custom home builder, NSW',
    sub: '12 homes per year · Custom & design-build',
    featured: true,
  },
  {
    quote: "I had been meaning to fix the front-end for years. I knew the problem but could not make time to solve it while running jobs. PreBuild just did it. I had it running in two weeks without writing a single line of anything.",
    name: 'Residential builder, QLD',
    sub: 'Extensions & renovations · 8–14 jobs per year',
    featured: false,
  },
]

export default function ProofSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section className="s-white proof-section" id="proof">
      <div className="wrap-lg">
        <FadeUp>
          <span className="eyebrow-tag">What builders say</span>
        </FadeUp>
        <RevealBlur delay={0.08}>
          <h2 className="proof-h2">
            Builders who stopped<br />quoting blind.
          </h2>
        </RevealBlur>

        <div className="proof-quotes" ref={ref}>
          {/* Primary large pull quote */}
          <motion.div
            className="proof-primary"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="proof-primary-quote">
              "{TESTIMONIALS[0].quote}"
            </p>
            <div className="proof-primary-author">
              <strong>{TESTIMONIALS[0].name}</strong>
              <span>{TESTIMONIALS[0].sub}</span>
            </div>
          </motion.div>

          {/* Secondary supporting quote */}
          <motion.div
            className="proof-secondary"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="proof-secondary-quote">
              "{TESTIMONIALS[1].quote}"
            </p>
            <div className="proof-secondary-author">
              <strong>{TESTIMONIALS[1].name}</strong>
              <span>{TESTIMONIALS[1].sub}</span>
            </div>
          </motion.div>
        </div>

        <FadeUp delay={0.3}>
          <p className="proof-note">
            Names withheld at clients' request · Results vary by market and build type
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
