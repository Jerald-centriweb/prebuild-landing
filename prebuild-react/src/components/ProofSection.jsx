import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FadeUp } from './FadeUp'

const TESTIMONIALS = [
  {
    quote: "I used to spend Sunday nights quoting people who had already hired someone else. That stopped. Now the ones who get through are actually serious — and they have already put skin in the game before I touch the drawings.",
    name: 'Custom home builder, NSW',
    sub: '12 homes per year · Custom & design-build',
  },
  {
    quote: "I had been meaning to fix the front-end for years. I knew the problem but could not make time to solve it while running jobs. PreBuild just did it. I had it running in two weeks without writing a single line of anything.",
    name: 'Residential builder, QLD',
    sub: 'Extensions & renovations · 8–14 jobs per year',
  },
]

export default function ProofSection() {
  const testsRef = useRef(null)
  const inView   = useInView(testsRef, { once: true, margin: '-60px 0px' })

  return (
    <section className="s-light proof-section">
      <div className="wrap">
        <FadeUp>
          <span className="eyebrow-tag">What builders say</span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="h2 dark" style={{ marginTop: 0 }}>
            Builders who stopped<br />quoting blind.
          </h2>
        </FadeUp>

        <div className="testimonials" ref={testsRef}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.56, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -3,
                boxShadow: '0 16px 48px rgba(17,24,32,0.09)',
                transition: { duration: 0.25 },
              }}
            >
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                {t.sub}
              </div>
            </motion.div>
          ))}
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
