import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { RevealBlur, FadeUp } from './FadeUp'

const YES_ITEMS = [
  'Residential custom builder, 5–30 homes/year',
  'Custom homes, renovations, extensions, or design-build',
  'Regularly losing time to unqualified enquiries',
  'Want a stronger front-end process built for you',
  'Already charge for preliminary work, or open to starting',
]

const NO_ITEMS = [
  'Volume builder with standardised designs and fixed pricing',
  'Looking for a generic CRM to manage yourself',
  'Not willing to change how your front-end process works',
  'Want results without a short onboarding period',
]

function CheckList({ items, mark, markClass, title }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <div className="who-col" ref={ref}>
      <div className={`who-col-title ${markClass}`}>{title}</div>
      {items.map((text, i) => (
        <motion.div
          key={text}
          className="who-item"
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.42, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`mk ${markClass}`}>{mark}</span>
          {text}
        </motion.div>
      ))}
    </div>
  )
}

export default function WhoSection() {
  return (
    <section className="s-light who-section" id="who">
      <div className="wrap-lg">
        <FadeUp>
          <span className="eyebrow-tag">Is this for you?</span>
        </FadeUp>
        <RevealBlur delay={0.08}>
          <h2 className="who-h2">
            Built for residential builders<br />
            tired of quoting blind.
          </h2>
        </RevealBlur>
        <FadeUp delay={0.16}>
          <p className="who-lead">
            This is a fit if you're regularly dealing with unqualified enquiries, inconsistent
            follow-up, or too much time going into quotes before you know who is actually serious.
          </p>
        </FadeUp>

        <div className="who-cols">
          <CheckList
            items={YES_ITEMS}
            mark="✓"
            markClass="mk-y"
            title="Right for you"
          />
          <CheckList
            items={NO_ITEMS}
            mark="×"
            markClass="mk-n"
            title="Not right for you"
          />
        </div>
      </div>
    </section>
  )
}
