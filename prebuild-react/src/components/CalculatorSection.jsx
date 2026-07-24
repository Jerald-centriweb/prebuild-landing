import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealBlur, FadeUp } from './FadeUp'
import { sendLead } from '../lib/leadCapture'
import { trackLead } from '../lib/pixel'
import {
  DEFAULTS, fieldsFor, formatField, calculate, money, num, dec,
} from './calcModel'

const pct = (val, min, max) => ((val - min) / (max - min)) * 100

const ARCHETYPES = [
  { value: 'No', model: 'free_quote', label: 'No, quotes are free', hint: 'You wear the estimating time' },
  { value: 'Sometimes', model: 'paid_quote', label: 'Sometimes', hint: 'Depends on the job' },
  { value: 'Yes', model: 'paid_quote', label: 'Yes, always', hint: 'They pay before you price' },
]

export default function CalculatorSection({ scrollTo }) {
  // charges_for_prelim maps 1:1 to the GoHighLevel picklist (Yes/No/Sometimes)
  // and also selects which costing model runs. Asking it first is deliberate:
  // it is zero-risk, non-personal, and answering it is a small commitment that
  // raises completion of everything below it.
  const [charges, setCharges] = useState('')
  const [values, setValues] = useState(DEFAULTS)
  const [unlocked, setUnlocked] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', website: '' })
  const [submitting, setSubmitting] = useState(false)

  const model = charges === 'No' ? 'free_quote' : 'paid_quote'
  const fields = useMemo(() => fieldsFor(model), [model])
  const r = useMemo(() => calculate(model, values), [model, values])

  const update = (k, v) => setValues((p) => ({ ...p, [k]: v }))

  const handleUnlock = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) return
    setSubmitting(true)

    const archetype = model
    trackLead(archetype)

    sendLead({
      ...formData,
      charges_for_prelim: charges,
      source: 'prebuild_calculator',
      archetype,
      metrics: {
        revenue_goal: values.revenue,
        contract_value: values.contract,
        enquiries_per_month: values.enquiries,
        hourly_rate: values.hourly,
        quotes_per_month: values.quotes,
        hours_per_quote: values.hoursPerQuote,
        close_rate: values.closeRate,
        paid_quote_rate: values.paidRate,
        build_rate: values.buildRate,
        front_hours: values.frontHours,
        builds_needed: r.buildsNeeded,
        enquiries_needed: Number(r.enqNeeded.toFixed(1)),
        annual_hours_lost: Math.round(r.unpaidHours),
        annual_cost_lost: Math.round(r.unpaidCost),
        builds_lost: Number(r.lostBuilds.toFixed(1)),
        builds_lost_revenue: Math.round(r.lostRevenue),
        builds_lost_margin: Math.round(r.lostMargin),
        net_margin_pct: values.margin,
        total_cost_of_waiting: Math.round(r.total),
        recommended_plan: r.plan.label,
        roi_multiple: Math.round(r.roi),
      },
    })

    setUnlocked(true)
    setSubmitting(false)
  }

  return (
    <section className="calc-section" id="calculator">
      <div className="wrap-lg">
        <div className="calc-header">
          <FadeUp>
            <span className="eyebrow-tag">Free · No obligation</span>
          </FadeUp>
          <RevealBlur delay={0.08}>
            <h2 className="calc-h2">
              What Your<br />
              Quoting Actually<br />
              <span className="accent">Costs You.</span>
            </h2>
          </RevealBlur>
          <FadeUp delay={0.16}>
            <p className="calc-lead">
              Your numbers, your maths. Every figure shows its working, so you can check it.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className="calc-shell">

            {/* STEP 1 — the switch.
                These read as static cards unless they are given real button
                affordance: a radio dot, a hover lift, and an explicit prompt.
                Without it people scroll past without realising the page is
                waiting on them, and this is the only free lead capture we have. */}
            <div className={`calc-step calc-step-one${charges ? '' : ' is-waiting'}`}>
              <div className="calc-step-head">
                <span className="calc-step-num">01</span>
                <h3 className="calc-step-title">Do you charge for preliminary work?</h3>
              </div>

              <p className="calc-prompt">
                <span className="calc-prompt-dot" aria-hidden="true" />
                Pick one to start. Takes about 30 seconds, no email needed to see your number.
              </p>

              <div className="calc-arch-row" role="radiogroup" aria-label="Do you charge for preliminary work?">
                {ARCHETYPES.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    role="radio"
                    className={`calc-arch${charges === a.value ? ' is-on' : ''}`}
                    onClick={() => setCharges(a.value)}
                    aria-checked={charges === a.value}
                  >
                    <span className="calc-arch-dot" aria-hidden="true" />
                    <span className="calc-arch-text">
                      <span className="calc-arch-label">{a.label}</span>
                      <span className="calc-arch-hint">{a.hint}</span>
                    </span>
                  </button>
                ))}
              </div>

              {charges && (
                <p className="calc-step-note">
                  {model === 'paid_quote'
                    ? 'Good. Your homeowner funds the estimate, so we only count the time and the builds you still lose.'
                    : 'Then the estimating time is yours to wear. That is what we cost out below.'}
                </p>
              )}
            </div>

            {/* STEP 2 — inputs, only once the model is known */}
            {charges && (
              <motion.div
                className="calc-step"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="calc-step-head">
                  <span className="calc-step-num">02</span>
                  <h3 className="calc-step-title">Your numbers</h3>
                </div>

                <div className="calc-grid">
                  {fields.map((f) => (
                    <div className="calc-field-row" key={f.key}>
                      <div className="calc-field-top">
                        <label className="calc-field-name" htmlFor={f.key}>{f.label}</label>
                        <span className="calc-field-val">{formatField(f, values[f.key])}</span>
                      </div>
                      <div className="calc-track">
                        <div className="calc-track-fill" style={{ width: `${pct(values[f.key], f.min, f.max)}%` }} />
                        <input
                          type="range"
                          id={f.key}
                          min={f.min}
                          max={f.max}
                          step={f.step}
                          value={values[f.key]}
                          onChange={(e) => update(f.key, +e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Headline number, ungated. It is the hook, and a builder who
                    cannot see any number has no reason to hand over details. */}
                <div className="calc-headline">
                  <span className="calc-headline-label">What the current process costs you a year</span>
                  <span className="calc-headline-num">{money(r.total)}</span>
                  <span className="calc-headline-sub">
                    {money(r.unpaidCost)} of your own time, plus the margin on {dec(r.lostBuilds)}{' '}
                    {r.lostBuilds === 1 ? 'build' : 'builds'} you did not sign.
                    That is {money(r.lostRevenue)} of contract value walking past you.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — the rest */}
            {charges && (
              <div className="calc-step calc-step-last">
                <div className="calc-step-head">
                  <span className="calc-step-num">03</span>
                  <h3 className="calc-step-title">
                    {unlocked ? 'Your full breakdown' : 'See the full breakdown'}
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  {!unlocked ? (
                    <motion.div key="gate" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      <ul className="calc-gate-value-list">
                        <li>Every figure with its working, so you can check the maths</li>
                        <li>How many enquiries a month you actually need to hit your goal</li>
                        <li>What to charge for preliminary work, and how to hold the number when they push back</li>
                      </ul>
                      <form className="calc-gate-form" onSubmit={handleUnlock}>
                        <div className="calc-gate-row">
                          <label className="calc-field" htmlFor="calc-name">
                            <span className="calc-field-label">Name</span>
                            <input id="calc-name" name="name" type="text" autoComplete="name" placeholder="Dave Thompson" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                          </label>
                          <label className="calc-field" htmlFor="calc-email">
                            <span className="calc-field-label">Email</span>
                            <input id="calc-email" name="email" type="email" autoComplete="email" inputMode="email" spellCheck={false} placeholder="dave@yourbuild.com.au" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                          </label>
                        </div>
                        <div className="calc-gate-row">
                          <label className="calc-field" htmlFor="calc-phone">
                            <span className="calc-field-label">Phone</span>
                            <input id="calc-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="0412 345 678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                          </label>
                          <label className="calc-field" htmlFor="calc-company">
                            <span className="calc-field-label">Company <em>optional</em></span>
                            <input id="calc-company" name="company" type="text" autoComplete="organization" placeholder="Thompson Built" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                          </label>
                        </div>
                        <button type="submit" className="btn-primary calc-gate-btn" disabled={submitting}>
                          {submitting ? 'Working…' : 'Show Me the Breakdown →'}
                        </button>
                      </form>
                      <p className="calc-gate-privacy">No spam. No third parties. Just your numbers.</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="calc-out-grid">
                        <div className="calc-out">
                          <span className="calc-out-label">Builds needed a year</span>
                          <span className="calc-out-num">{num(r.buildsNeeded)}</span>
                          <span className="calc-out-work">{r.buildsWorking}</span>
                        </div>
                        <div className="calc-out">
                          <span className="calc-out-label">Enquiries needed a month</span>
                          <span className="calc-out-num">{dec(r.enqNeeded)}</span>
                          <span className="calc-out-work">{r.enqWorking}</span>
                        </div>
                        <div className="calc-out">
                          <span className="calc-out-label">You get today</span>
                          <span className={`calc-out-num${r.hasGap ? ' is-short' : ' is-ok'}`}>{num(values.enquiries)}</span>
                          <span className="calc-out-work">
                            {r.hasGap
                              ? `${dec(r.gap)} a month short of your own goal`
                              : 'You already get the volume your goal needs'}
                          </span>
                        </div>
                      </div>

                      <div className="calc-cost-grid">
                        <div className="calc-cost">
                          <span className="calc-cost-label">{r.unpaidLabel}</span>
                          <span className="calc-cost-num">{money(r.unpaidCost)}</span>
                          <span className="calc-out-work">{r.unpaidWorking}</span>
                          <p className="calc-cost-means">{r.unpaidMeans}</p>
                        </div>
                        <div className="calc-cost">
                          <span className="calc-cost-label">{r.lostLabel}</span>
                          <span className="calc-cost-num">{money(r.lostMargin)}</span>
                          <span className="calc-out-work">{dec(r.lostBuilds)} builds × {money(values.contract)} = {money(r.lostRevenue)} contract value × {values.margin}% margin</span>
                          <span className="calc-out-work">{r.lostWorking}</span>
                          <p className="calc-cost-means">{r.lostMeans}</p>
                        </div>
                      </div>

                      <div className="calc-total">
                        <span className="calc-total-label">Total cost of waiting, every year it stays the same</span>
                        <span className="calc-total-num">{money(r.total)}</span>
                        <span className="calc-total-sub">
                          Against {r.plan.label} at {money(r.firstYear)} in year one, that is {num(r.roi)}× back. Break-even: {r.breakEven.toLowerCase()}.
                        </span>
                      </div>

                      <div className="calc-next">
                        <p>Your report is on its way to {formData.email || 'your inbox'}.</p>
                        <button
                          type="button"
                          className="btn-primary"
                          onClick={() => window.dispatchEvent(new Event('open-booking'))}
                        >
                          Talk Through Your {money(r.total)} →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </FadeUp>

        <p className="calc-disclaimer">
          An estimate based on the figures you enter, not financial advice. Assumptions are stated in the working above.
        </p>
      </div>
    </section>
  )
}
