import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FadeUp } from './FadeUp'

const PAIN_CARDS = [
  {
    n: '01 /',
    title: 'Good leads and bad leads look identical at the start',
    desc: 'You are quoting on gut feel — and gut feel costs you nights and weekends, year after year with no way to tell the difference upfront.',
  },
  {
    n: '02 /',
    title: 'Budget reality shows up at hour 35 of your quote',
    desc: 'Their number was never close to what it actually costs. You discover this only after the work is done and the damage is already real.',
  },
  {
    n: '03 /',
    title: 'Asking for a commitment feels awkward without a process',
    desc: 'You know you should charge before you quote. But without a structured process, that conversation is hard to earn and easy to avoid.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function ProblemSection() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px 0px' })

  return (
    <section className="s-light problem-section">
      <div className="wrap">
        <FadeUp>
          <span className="eyebrow-tag">Sound familiar?</span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="h2 dark" style={{ marginTop: 0 }}>
            Most builders don't have<br />
            a quoting problem.<br />
            They have a <span>qualification</span> problem.
          </h2>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="lead" style={{ marginTop: 14, marginBottom: 0 }}>
            By the time you find out who was serious, you have already lost hours you do not get back.
          </p>
        </FadeUp>

        <div className="pain-grid" ref={gridRef}>
          {PAIN_CARDS.map((card, i) => (
            <motion.div
              key={card.n}
              className="pain-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={gridInView ? 'show' : 'hidden'}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <span className="pain-n">{card.n}</span>
              <div className="pain-title">{card.title}</div>
              <div className="pain-desc">{card.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
