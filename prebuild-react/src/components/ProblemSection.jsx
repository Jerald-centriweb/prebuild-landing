import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { RevealBlur, FadeUp } from './FadeUp'

const PAIN_POINTS = [
  {
    num: '01',
    title: 'Good leads and bad leads look identical at the start',
    desc: 'You are quoting on gut feel — and gut feel costs you nights and weekends, year after year with no way to tell the difference upfront.',
  },
  {
    num: '02',
    title: 'Budget reality shows up at hour 35 of your quote',
    desc: 'Their number was never close to what it actually costs. You discover this only after the work is done and the damage is already real.',
  },
  {
    num: '03',
    title: 'Asking for a commitment feels awkward without a process',
    desc: 'You know you should charge before you quote. But without a structured process, that conversation is hard to earn and easy to avoid.',
  },
]

function PainBlock({ point }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      className="pain-block"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="pain-block-num">{point.num}</div>
      <div className="pain-block-content">
        <h3 className="pain-block-title">{point.title}</h3>
        <p className="pain-block-desc">{point.desc}</p>
      </div>
    </motion.div>
  )
}

export default function ProblemSection() {
  return (
    <section className="s-light problem-section" id="problem">
      <div className="wrap-lg">
        <div className="problem-header">
          <FadeUp>
            <span className="eyebrow-tag">Sound familiar?</span>
          </FadeUp>
          <RevealBlur delay={0.08}>
            <h2 className="problem-h2">
              Most builders don't have a quoting problem.{' '}
              <br />They have a{' '}
              <span className="accent">qualification</span> problem.
            </h2>
          </RevealBlur>
          <FadeUp delay={0.2}>
            <p className="problem-lead">
              By the time you find out who was serious, you have already lost hours you do not get back.
            </p>
          </FadeUp>
        </div>

        <div className="problem-list">
          {PAIN_POINTS.map((point) => (
            <PainBlock key={point.num} point={point} />
          ))}
        </div>
      </div>
    </section>
  )
}
