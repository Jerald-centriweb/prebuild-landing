import { useState, useCallback, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { FadeUp } from './FadeUp'

function useAnimatedNumber(initial) {
  const mv = useMotionValue(initial)
  return mv
}

function AnimatedValue({ motionValue, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <span ref={ref} className="metric-value" style={{ display: 'block' }}>
      <motion.span>
        {motionValue}
      </motion.span>
    </span>
  )
}

/* Format number with locale commas */
const fmt = (n) => Math.round(n).toLocaleString()

export default function CalculatorSection({ scrollTo }) {
  const [quotes,    setQuotes]    = useState(30)
  const [won,       setWon]       = useState(8)
  const [hoursEach, setHoursEach] = useState(20)
  const [rate,      setRate]      = useState(150)

  const lost = Math.max(0, quotes - won)
  const hrs  = lost * hoursEach
  const cost = hrs * rate
  const perj = won > 0 ? Math.round((quotes * hoursEach * rate) / won) : 0

  return (
    <section className="s-white calc-section" id="calculator">
      <div className="wrap">
        <div className="calc-intro">
          <FadeUp>
            <span className="eyebrow-tag">See the real number</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="h2 dark" style={{ marginTop: 0 }}>
              See what unqualified<br />
              quoting is actually<br />
              costing you.
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="lead" style={{ marginBottom: 0 }}>
              Most builders never stop to calculate it. Adjust the sliders and see how much time and
              money disappears each year on quotes that don't convert.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} style={{ marginTop: 44 }}>
          <div className="calc-module">
            <div className="calc-cols">

              {/* INPUTS */}
              <div className="calc-inputs">
                {[
                  { id: 'c1', label: 'Quotes per year',    val: quotes,    set: setQuotes,    min: 5,  max: 100, step: 1,  fmt: (v) => v        },
                  { id: 'c2', label: 'Jobs won per year',  val: won,       set: setWon,       min: 1,  max: 50,  step: 1,  fmt: (v) => v        },
                  { id: 'c3', label: 'Hours per quote',    val: hoursEach, set: setHoursEach, min: 5,  max: 60,  step: 1,  fmt: (v) => `${v} hrs` },
                  { id: 'c4', label: 'Hourly rate (AUD)',  val: rate,      set: setRate,      min: 80, max: 400, step: 10, fmt: (v) => `$${v}`  },
                ].map(({ id, label, val, set, min, max, step, fmt: fmtVal }) => (
                  <div className="calc-field" key={id}>
                    <div className="calc-field-row">
                      <label className="calc-label" htmlFor={id}>{label}</label>
                      <motion.span
                        className="calc-val"
                        key={fmtVal(val)}
                        initial={{ opacity: 0.6, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {fmtVal(val)}
                      </motion.span>
                    </div>
                    <input
                      type="range"
                      id={id}
                      min={min}
                      max={max}
                      step={step}
                      value={val}
                      onChange={(e) => set(+e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {/* OUTPUTS */}
              <div className="calc-outputs">
                {[
                  { id: 'r1', label: 'Annual hours lost to wasted quoting', value: hrs,  sub: 'hours / year on quotes that didn\'t convert', cls: '' },
                  { id: 'r2', label: 'Cost of wasted quoting time',         value: cost, sub: 'AUD / year in unrecoverable capacity',        cls: 'amber', prefix: '$' },
                  { id: 'r3', label: 'Cost to win each job',                value: perj, sub: 'in quoting time per signed project',          cls: 'red',   prefix: '$' },
                ].map(({ id, label, value, sub, cls, prefix = '' }, i) => (
                  <div key={id}>
                    {i > 0 && <div className="metric-rule" />}
                    <div className="metric">
                      <div className="metric-label">{label}</div>
                      <motion.div
                        className={`metric-value${cls ? ` ${cls}` : ''}`}
                        key={value}
                        initial={{ opacity: 0.7, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {prefix}{fmt(value)}
                      </motion.div>
                      <div className="metric-sub">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </FadeUp>

        {/* Bottom CTA */}
        <FadeUp delay={0.28}>
          <div className="calc-cta">
            <p className="serif-callout">That number doesn't have to be yours.</p>
            <motion.a
              href="#final-cta"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); scrollTo('final-cta') }}
              whileHover={{ background: 'var(--blue-600)', y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              See What This Looks Like Solved →
            </motion.a>
            <p className="calc-microcopy">
              If the numbers are bigger than you expected, book a quick conversation and we will show
              you how the process works.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
