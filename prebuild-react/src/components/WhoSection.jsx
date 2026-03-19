import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FadeUp } from './FadeUp'

const YES_ITEMS = [
  'Residential custom builder, 5–30 homes/year',
  'Custom homes, renovations, extensions, or design-build',
  'Regularly losing time to unqualified enquiries',
  'Want a stronger front-end process built for you',
  'Open to asking for a preliminary commitment before you quote',
]

const NO_ITEMS = [
  'Volume builder with standardised designs and fixed pricing',
  'Looking for a generic CRM to manage yourself',
  'Not willing to change how your front-end process works',
  'Want results without a short onboarding period',
]

function CheckList({ items, mark, markClass, colClass, title }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <div className="who-col" ref={ref}>
      <div className={`who-col-title ${colClass}`}>{title}</div>
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
    <section className="s-light who-section" style={{ paddingTop: 0, borderTop: 'var(--line)' }}>
      <div className="wrap">
        <FadeUp>
          <span className="eyebrow-tag">Is this for you?</span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="h2 dark" style={{ marginTop: 0 }}>
            Built for residential builders<br />
            tired of quoting blind.
          </h2>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="lead">
            This is a fit if you are regularly dealing with unqualified enquiries, inconsistent
            follow-up, or too much free quoting before you know who is actually serious.
          </p>
        </FadeUp>

        <div className="who-cols">
          <CheckList
            items={YES_ITEMS}
            mark="✓"
            markClass="mk-y"
            colClass="col-yes"
            title="Right for you if..."
          />
          <CheckList
            items={NO_ITEMS}
            mark="—"
            markClass="mk-n"
            colClass="col-no"
            title="Not right for you if..."
          />
        </div>
      </div>
    </section>
  )
}
