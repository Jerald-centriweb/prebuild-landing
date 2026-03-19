import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealBlur, FadeUp } from './FadeUp'

const fmt = (n) => Math.round(n).toLocaleString()

export default function CalculatorSection({ scrollTo }) {
  const [quotes, setQuotes] = useState(30)
  const [won, setWon] = useState(8)
  const [hoursEach, setHoursEach] = useState(20)
  const [rate, setRate] = useState(150)

  const [unlocked, setUnlocked] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', website: '' })
  const [submitting, setSubmitting] = useState(false)

  const lost = Math.max(0, quotes - won)
  const hrs = lost * hoursEach
  const cost = hrs * rate
  const perj = won > 0 ? Math.round((quotes * hoursEach * rate) / won) : 0

  const severity = cost > 150000 ? 'critical' : cost > 80000 ? 'high' : 'moderate'

  const handleUnlock = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) return
    setSubmitting(true)

    /* Submit to n8n webhook */
    fetch('https://n8n.centriweb.com/webhook/b74e323d-2237-42d0-87a8-e9c6133f8dd9', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        source: 'prebuild_calculator',
        metrics: {
          quotes_per_year: quotes,
          jobs_won: won,
          hours_per_quote: hoursEach,
          hourly_rate: rate,
          annual_hours_lost: hrs,
          annual_cost_lost: cost,
          cost_per_job: perj,
        }
      }),
    }).catch((err) => console.error("Webhook failed:", err))

    setTimeout(() => {
      setUnlocked(true)
      setSubmitting(false)
    }, 800)
  }

  return (
    <section className="calc-section" id="calculator">
      <div className="wrap-lg">
        <div className="calc-header">
          <FadeUp>
            <span className="eyebrow-tag">See the real number</span>
          </FadeUp>
          <RevealBlur delay={0.08}>
            <h2 className="calc-h2">
              See what unqualified<br />
              quoting is actually<br />
              <span className="accent">costing you.</span>
            </h2>
          </RevealBlur>
          <FadeUp delay={0.16}>
            <p className="calc-lead">
              Most builders never stop to calculate it. Adjust the sliders and see how much time and
              money disappears each year on quotes that don't convert.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className="calc-layout">
            {/* INPUTS */}
            <div className="calc-inputs">
              {[
                { id: 'c1', label: 'Quotes per year', val: quotes, set: setQuotes, min: 5, max: 100, step: 1, fmtVal: (v) => v },
                { id: 'c2', label: 'Jobs won per year', val: won, set: setWon, min: 1, max: 50, step: 1, fmtVal: (v) => v },
                { id: 'c3', label: 'Hours per quote', val: hoursEach, set: setHoursEach, min: 5, max: 60, step: 1, fmtVal: (v) => `${v} hrs` },
                { id: 'c4', label: 'Hourly rate (AUD)', val: rate, set: setRate, min: 80, max: 400, step: 10, fmtVal: (v) => `$${v}` },
              ].map(({ id, label, val, set, min, max, step, fmtVal }) => (
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

            {/* OUTPUTS — dramatic numbers with lead gate */}
            <div className={`calc-outputs ${severity}`}>
              <div className="calc-outputs-grid" aria-hidden="true" />
              {[
                { id: 'r1', label: 'Annual hours lost to wasted quoting', value: hrs, sub: 'hours / year on quotes that didn\'t convert', cls: '' },
                { id: 'r2', label: 'Cost of wasted quoting time', value: cost, sub: 'AUD / year in unrecoverable capacity', cls: 'amber', prefix: '$' },
                { id: 'r3', label: 'Cost to win each job', value: perj, sub: 'in quoting time per signed project', cls: 'red', prefix: '$' },
              ].map(({ id, label, value, sub, cls, prefix = '' }, i) => (
                <div key={id} className="metric-block">
                  {i > 0 && <div className="metric-rule" />}
                  <div className="metric">
                    <div className="metric-label">{label}</div>
                    <div className={`metric-value-wrap${!unlocked && i > 0 ? ' gated' : ''}`}>
                      <motion.div
                        className={`metric-value${cls ? ` ${cls}` : ''}`}
                        key={value}
                        initial={{ opacity: 0.7, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {prefix}{fmt(value)}
                      </motion.div>
                      {!unlocked && i > 0 && (
                        <div className="metric-blur-overlay" />
                      )}
                    </div>
                    <div className="metric-sub">{sub}</div>
                  </div>
                </div>
              ))}

              {/* Lead capture gate */}
              <AnimatePresence>
                {!unlocked && (
                  <motion.div
                    className="calc-gate"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="calc-gate-text">
                      Enter your details to unlock your full cost breakdown
                    </p>
                    <form className="calc-gate-form" onSubmit={handleUnlock}>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                      />
                      <input
                        type="url"
                        placeholder="Website URL (Optional)"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                      <button type="submit" className="btn-primary" disabled={submitting}>
                        {submitting ? 'Calculating...' : 'See My Full Results →'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
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
