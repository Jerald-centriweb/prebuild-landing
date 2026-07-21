import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealBlur, FadeUp } from './FadeUp'

const fmt = (n) => Math.round(n).toLocaleString()
const pct = (val, min, max) => ((val - min) / (max - min)) * 100

const SLIDERS = [
  { id: 'c1', label: 'Quotes per year', min: 5, max: 100, step: 1, format: (v) => v },
  { id: 'c2', label: 'Jobs won per year', min: 1, max: 50, step: 1, format: (v) => v },
  { id: 'c3', label: 'Hours per quote', min: 5, max: 60, step: 1, format: (v) => `${v} hrs` },
  { id: 'c4', label: 'Hourly rate (AUD)', min: 80, max: 400, step: 10, format: (v) => `$${v}` },
]

export default function CalculatorSection({ scrollTo }) {
  const [values, setValues] = useState({ c1: 30, c2: 8, c3: 20, c4: 150 })
  const [unlocked, setUnlocked] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', website: '' })
  const [submitting, setSubmitting] = useState(false)

  const updateValue = (id, val) => setValues((prev) => ({ ...prev, [id]: val }))

  const metrics = useMemo(() => {
    const lost = Math.max(0, values.c1 - values.c2)
    const hrs = lost * values.c3
    const cost = hrs * values.c4
    const perJob = values.c2 > 0 ? Math.round((values.c1 * values.c3 * values.c4) / values.c2) : 0
    const winRate = values.c2 > 0 ? Math.round((values.c2 / values.c1) * 100) : 0
    const severity = cost > 150000 ? 'critical' : cost > 80000 ? 'high' : 'moderate'
    const improvedWinRate = Math.min(winRate + 15, 85)
    const improvedWon = Math.round(values.c1 * (improvedWinRate / 100))
    const improvedLost = Math.max(0, values.c1 - improvedWon)
    const improvedHrs = improvedLost * (values.c3 * 0.4)
    const savedHrs = hrs - improvedHrs
    const savedCost = savedHrs * values.c4
    return { lost, hrs, cost, perJob, winRate, severity, savedHrs, savedCost, improvedWinRate }
  }, [values])

  const ringPct = Math.min(metrics.cost / 300000, 1)
  const ringCircumference = 2 * Math.PI * 90
  const ringOffset = ringCircumference * (1 - ringPct)

  const handleUnlock = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) return
    setSubmitting(true)

    fetch('https://n8n.centriweb.com/webhook/b74e323d-2237-42d0-87a8-e9c6133f8dd9', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        source: 'prebuild_calculator',
        metrics: {
          quotes_per_year: values.c1,
          jobs_won: values.c2,
          hours_per_quote: values.c3,
          hourly_rate: values.c4,
          annual_hours_lost: metrics.hrs,
          annual_cost_lost: metrics.cost,
          cost_per_job: metrics.perJob,
          win_rate: metrics.winRate,
          projected_savings: metrics.savedCost,
        }
      }),
    }).catch((err) => console.error('Webhook failed:', err))

    setTimeout(() => {
      setUnlocked(true)
      setSubmitting(false)
    }, 1500)
  }

  const severityColor = 'var(--blue-400)'

  return (
    <section className="calc-section" id="calculator">
      <div className="wrap-lg">
        <div className="calc-header">
          <FadeUp>
            <span className="eyebrow-tag">Free tool · 30 seconds</span>
          </FadeUp>
          <RevealBlur delay={0.08}>
            <h2 className="calc-h2">
              Pre-Construction<br />
              Cost Leakage<br />
              <span className="accent">Audit.</span>
            </h2>
          </RevealBlur>
          <FadeUp delay={0.16}>
            <p className="calc-lead">
              Adjust the variables below. The resulting audit report will show you exactly how many hours and dollars you are leaving on the table.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className="calc-panel">
            {/* Left: Sliders */}
            <div className="calc-sliders">
              {SLIDERS.map((s) => (
                <div className="calc-slider-group" key={s.id}>
                  <div className="calc-slider-top">
                    <label className="calc-slider-label" htmlFor={s.id}>{s.label}</label>
                    <motion.span
                      className="calc-slider-value"
                      key={values[s.id]}
                      initial={{ opacity: 0.6, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {s.format(values[s.id])}
                    </motion.span>
                  </div>
                  <div className="calc-slider-track-wrap">
                    <div
                      className="calc-slider-fill"
                      style={{ width: `${pct(values[s.id], s.min, s.max)}%` }}
                    />
                    <input
                      type="range"
                      id={s.id}
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={values[s.id]}
                      onChange={(e) => updateValue(s.id, +e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Ring + Results/Gate */}
            <div className="calc-right">
              <AnimatePresence mode="wait">
                {!unlocked ? (
                  <motion.div
                    key="locked"
                    className="calc-locked-view"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Ring gauge — the hook */}
                    <div className="calc-ring-row">
                      <div className="calc-ring-container">
                        <svg className="calc-ring-svg" viewBox="0 0 200 200">
                          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                          <motion.circle
                            cx="100" cy="100" r="90"
                            fill="none"
                            stroke={severityColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={ringCircumference}
                            strokeDashoffset={ringOffset}
                            style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </svg>
                        <div className="calc-ring-inner">
                          <span className="calc-ring-label">Your report<br />is ready</span>
                          <div className="calc-ring-lock">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="calc-ring-side">
                        <div className="calc-severity-badge">
                          Results ready
                        </div>
                        <p className="calc-ring-tease">
                          Based on your inputs, we've compiled a custom efficiency report detailing your true cost of free quoting and exactly how to fix it.
                        </p>
                      </div>
                    </div>

                    {/* Gated preview — hours shown as teaser, rest blurred */}
                    <div className="calc-gated-preview">
                      <div className="calc-gated-item calc-gated-revealed">
                        <span className="calc-gated-label">Hours lost / year</span>
                        <motion.span
                          className="calc-gated-real"
                          key={metrics.hrs}
                          initial={{ opacity: 0.5, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {fmt(metrics.hrs)}
                        </motion.span>
                      </div>
                      <div className="calc-gated-item">
                        <span className="calc-gated-label">Annual cost</span>
                        <span className="calc-gated-blur">▓▓▓▓▓</span>
                      </div>
                      <div className="calc-gated-item">
                        <span className="calc-gated-label">Per job overhead</span>
                        <span className="calc-gated-blur">▓▓▓▓</span>
                      </div>
                    </div>

                    {/* Gate form */}
                    <div className="calc-gate">
                      <p className="calc-gate-text">
                        Unlock Your Custom Leakage Report
                      </p>
                      <ul className="calc-gate-value-list">
                        <li>Instant PDF report sent to your email</li>
                        <li>Full cost & leakage breakdown based on your numbers</li>
                        <li>The 3-step framework to transition to paid preliminary agreements</li>
                      </ul>
                      <form className="calc-gate-form" onSubmit={handleUnlock}>
                        <div className="calc-gate-row">
                          <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                          <input type="email" placeholder="Email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        </div>
                        <div className="calc-gate-row">
                          <input type="tel" placeholder="Phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                          <input type="text" placeholder="Company name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
                        </div>
                        <input type="url" placeholder="Website URL (optional)" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
                        <button type="submit" className="btn-primary calc-gate-btn" disabled={submitting}>
                          {submitting ? 'Generating Report...' : 'Unlock My Custom Report →'}
                        </button>
                      </form>
                      <p className="calc-gate-privacy">No spam. No third parties. Just your numbers.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unlocked"
                    className="calc-unlocked-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Ring with real number */}
                    <div className="calc-ring-row">
                      <div className="calc-ring-container">
                        <svg className="calc-ring-svg" viewBox="0 0 200 200">
                          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                          <motion.circle
                            cx="100" cy="100" r="90"
                            fill="none"
                            stroke={severityColor}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={ringCircumference}
                            strokeDashoffset={ringOffset}
                            style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </svg>
                        <div className="calc-ring-inner">
                          <span className="calc-ring-label">Annual cost of<br />wasted quoting</span>
                          <motion.div
                            className="calc-ring-number"
                            style={{ color: severityColor }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            ${fmt(metrics.cost)}
                          </motion.div>
                          <span className="calc-ring-sub">AUD / year</span>
                        </div>
                      </div>
                      <div className="calc-ring-side">
                        <div className="calc-severity-badge">
                          Your annual cost
                        </div>
                      </div>
                    </div>

                    {/* Revealed metrics */}
                    <div className="calc-revealed-grid">
                      <motion.div className="calc-revealed-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <span className="calc-revealed-label">Hours lost / year</span>
                        <span className="calc-revealed-num">{fmt(metrics.hrs)}</span>
                      </motion.div>
                      <motion.div className="calc-revealed-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <span className="calc-revealed-label">Cost per job won</span>
                        <span className="calc-revealed-num amber">${fmt(metrics.perJob)}</span>
                      </motion.div>
                      <motion.div className="calc-revealed-card accent-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <span className="calc-revealed-label green">Projected savings</span>
                        <span className="calc-revealed-num green-text">${fmt(metrics.savedCost)}</span>
                        <span className="calc-revealed-sub">{fmt(metrics.savedHrs)} hrs recovered · win rate → {metrics.improvedWinRate}%</span>
                      </motion.div>
                    </div>

                    {/* Email confirmation */}
                    <motion.div className="calc-email-confirm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                      <span className="calc-email-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 7l-10 7L2 7" />
                        </svg>
                      </span>
                      <p>Your custom Cost Leakage Report has been generated and sent to <strong>{formData.email}</strong></p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>

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
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
