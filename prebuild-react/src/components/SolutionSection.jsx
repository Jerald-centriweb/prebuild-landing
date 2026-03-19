import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { RevealBlur, FadeUp } from './FadeUp'

const OUTCOMES = [
  {
    num: '01',
    before: 'Enquiries sitting unanswered for days',
    after: 'Every enquiry gets a professional first response — even when you are flat out on site',
    desc: 'A structured first response fires immediately — so homeowners feel taken care of before you pick up the phone.',
  },
  {
    num: '02',
    before: 'Spending hours before knowing if it\'s real',
    after: 'You know which leads are worth your time in the first conversation — not the third',
    desc: 'Every prospect moves through the same qualification process, so your attention goes to real opportunities from day one.',
  },
  {
    num: '03',
    before: 'Asking for money felt uncomfortable',
    after: 'The preliminary commitment conversation feels natural — the process earns it for you',
    desc: 'By the time you ask, the process has already established your value — serious prospects expect it, the rest never make it that far.',
  },
]

function OutcomeRow({ outcome }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      className="outcome-row"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="outcome-before-col">
        <span className="outcome-num">{outcome.num}</span>
        <span className="outcome-before-text">{outcome.before}</span>
      </div>
      <div className="outcome-arrow" aria-hidden="true">→</div>
      <div className="outcome-after-col">
        <h3 className="outcome-after-title">{outcome.after}</h3>
        <p className="outcome-after-desc">{outcome.desc}</p>
      </div>
    </motion.div>
  )
}

export default function SolutionSection({ scrollTo }) {
  return (
    <section className="s-light solution-section" id="solution">
      <div className="wrap-lg">
        <FadeUp>
          <span className="eyebrow-tag">Done for you, start to finish</span>
        </FadeUp>
        <RevealBlur delay={0.08}>
          <h2 className="solution-h2">
            We set it up.<br />
            <span className="accent">You build homes.</span>
          </h2>
        </RevealBlur>
        <FadeUp delay={0.16}>
          <p className="solution-lead">
            PreBuild is a done-for-you pre-construction system built around how your business already
            works. Every enquiry gets a clear path. Serious prospects move toward a commitment. The
            wrong ones self-select out early.
          </p>
        </FadeUp>

        <div className="outcome-list">
          {OUTCOMES.map((outcome) => (
            <OutcomeRow key={outcome.num} outcome={outcome} />
          ))}
        </div>
      </div>
    </section>
  )
}
