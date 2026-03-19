import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FadeUp } from './FadeUp'

const OUTCOMES = [
  {
    n: 'OUTCOME 01',
    before: 'Enquiries sitting unanswered for days',
    title: 'Every enquiry gets a professional first response — even when you are flat out on site',
    desc: 'A structured first response fires immediately — so homeowners feel taken care of before you pick up the phone.',
  },
  {
    n: 'OUTCOME 02',
    before: 'Spending hours before knowing if it\'s real',
    title: 'You know which leads are worth your time in the first conversation — not the third',
    desc: 'Every prospect moves through the same qualification process, so your attention goes to real opportunities from day one.',
  },
  {
    n: 'OUTCOME 03',
    before: 'Asking for money felt uncomfortable',
    title: 'The preliminary commitment conversation feels natural — the process earns it for you',
    desc: 'By the time you ask, the process has already established your value — serious prospects expect it, the rest never make it that far.',
  },
]

export default function SolutionSection({ scrollTo }) {
  const cardsRef = useRef(null)
  const inView   = useInView(cardsRef, { once: true, margin: '-60px 0px' })

  return (
    <section className="s-white solution-section">
      <div className="wrap">
        <FadeUp>
          <span className="eyebrow-tag">Done for you, start to finish</span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="h2 dark" style={{ marginTop: 0 }}>
            We set it up.<br />You build homes.
          </h2>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="lead">
            PreBuild is a done-for-you pre-construction system built around how your business already
            works. Every enquiry gets a clear path. Serious prospects move toward a commitment. The
            wrong ones self-select out early.
          </p>
        </FadeUp>

        <div className="outcome-cards" ref={cardsRef}>
          {OUTCOMES.map((card, i) => (
            <motion.div
              key={card.n}
              className="outcome-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.52, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -4,
                borderColor: 'var(--blue-200)',
                boxShadow: '0 12px 36px rgba(17,24,32,0.07)',
                transition: { duration: 0.25 },
              }}
            >
              <span className="outcome-n">{card.n}</span>
              <span className="outcome-before">{card.before}</span>
              <div className="outcome-title">{card.title}</div>
              <div className="outcome-desc">{card.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
