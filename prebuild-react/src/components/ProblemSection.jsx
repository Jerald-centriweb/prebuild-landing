import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

function PainCard({ point }) {
  const cardRef = useRef(null)
  
  // Track scroll progress of this specific card as it moves through the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 85%', 'center center'] // Starts animating when top hits 85% of screen
  })
  
  // Tie opacity and scale directly to the scroll progress
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <motion.div 
      ref={cardRef}
      className="pain-card"
      style={{ opacity, scale, y }}
    >
      <div className="pain-card-num">{point.num}</div>
      <div className="pain-card-content">
        <h3 className="pain-card-title">{point.title}</h3>
        <p className="pain-card-desc">{point.desc}</p>
      </div>
    </motion.div>
  )
}

export default function ProblemSection() {
  return (
    <section className="problem-section-redesigned" id="problem">
      <div className="wrap-lg">
        <div className="problem-split-layout">
          {/* Left Sticky Column */}
          <div className="problem-sticky-left">
            <FadeUp>
              <span className="eyebrow-tag">Sound familiar?</span>
            </FadeUp>
            <RevealBlur delay={0.08}>
              <h2 className="problem-h2-large">
                Most builders don't have a quoting problem.{' '}
                <br />They have a{' '}
                <span className="accent">qualification</span> problem.
              </h2>
            </RevealBlur>
            <FadeUp delay={0.2}>
              <p className="problem-lead-dark">
                By the time you find out who was serious, you have already lost hours you do not get back.
              </p>
            </FadeUp>
          </div>

          {/* Right Scrolling Column */}
          <div className="problem-cards-right">
            {PAIN_POINTS.map((point) => (
              <PainCard key={point.num} point={point} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
