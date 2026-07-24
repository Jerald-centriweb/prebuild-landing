/**
 * Two costing models, picked by whether the builder charges for prelim work.
 *
 * This is the same logic as the two sales-call calculators in
 * sales process/sales-call-assets/, unified behind one switch. The website
 * already asks "do you charge for preliminary work?" to segment the lead, so
 * that same answer selects the model. A builder who charges has no unpaid
 * estimating cost — the homeowner funds it — so running the free-quote maths
 * on them produces a number they know is wrong, and they stop trusting the
 * page. Getting this wrong is worse than not asking.
 *
 * Every figure returned carries a `working` string. Showing the arithmetic is
 * what makes the output credible to a sceptical builder rather than assertive.
 */

export const PLANS = {
  starter: { label: 'Starter', setup: 2500, monthly: 297 },
  growth: { label: 'Growth', setup: 3500, monthly: 497 },
}

// Only 1 in 4 of the enquiries that never got quoted are counted as genuinely
// worth having. Deliberately conservative: under-claiming survives scrutiny.
const WORTH_HAVING = 0.25
// Only ~1 in 7 of the paid quotes that go quiet are counted as recoverable.
const RECOVER_SHARE = 0.15

const nf = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 })
const cf = new Intl.NumberFormat('en-AU', {
  style: 'currency', currency: 'AUD', maximumFractionDigits: 0,
})

export const money = (n) => cf.format(Math.round(Number.isFinite(n) ? n : 0))
export const num = (n) => nf.format(Math.round(Number.isFinite(n) ? n : 0))
export const dec = (n) => (Number.isFinite(n) ? n : 0).toFixed(1)

/** Inputs shown for each model. `key` maps into the values object. */
export const FIELDS = {
  shared: [
    { key: 'revenue', label: 'Annual revenue goal', min: 500000, max: 20000000, step: 100000, kind: 'money' },
    { key: 'contract', label: 'Average contract value', min: 100000, max: 3000000, step: 25000, kind: 'money' },
    { key: 'enquiries', label: 'Enquiries per month', min: 1, max: 60, step: 1, kind: 'plain' },
  ],
  free_quote: [
    { key: 'quotes', label: 'Detailed quotes you send per month', min: 0, max: 40, step: 1, kind: 'plain' },
    { key: 'hoursPerQuote', label: 'Hours per detailed quote', min: 2, max: 60, step: 1, kind: 'hours' },
    { key: 'closeRate', label: 'Quotes that become signed jobs', min: 5, max: 80, step: 1, kind: 'pct' },
  ],
  paid_quote: [
    { key: 'paidRate', label: 'Enquiries that become a paid quote', min: 5, max: 90, step: 1, kind: 'pct' },
    { key: 'buildRate', label: 'Paid quotes that become signed builds', min: 5, max: 90, step: 1, kind: 'pct' },
    { key: 'frontHours', label: 'Unpaid hours per enquiry (calls, site visits)', min: 0, max: 20, step: 1, kind: 'hours' },
  ],
  tail: [
    { key: 'hourly', label: 'What your hour is worth', min: 80, max: 500, step: 10, kind: 'money' },
    { key: 'margin', label: 'Your net margin on a build', min: 3, max: 25, step: 1, kind: 'pct' },
  ],
}

export const DEFAULTS = {
  revenue: 3000000,
  contract: 650000,
  enquiries: 8,
  hourly: 150,
  // AU custom builders typically run 5-6% net. 8% is a mildly generous
  // default that still lands in a range a builder recognises as real.
  margin: 8,
  // free-quote branch
  quotes: 4,
  hoursPerQuote: 15,
  closeRate: 20,
  // paid-quote branch
  paidRate: 40,
  buildRate: 30,
  frontHours: 3,
}

export function fieldsFor(model) {
  return [...FIELDS.shared, ...FIELDS[model], ...FIELDS.tail]
}

export function formatField(field, v) {
  if (field.kind === 'money') return money(v)
  if (field.kind === 'pct') return `${Math.round(v)}%`
  if (field.kind === 'hours') return `${num(v)} hrs`
  return num(v)
}

/**
 * @param {'free_quote'|'paid_quote'} model
 * @param {object} v raw slider values
 */
export function calculate(model, v) {
  const revenue = Math.max(v.revenue, 0)
  const contract = Math.max(v.contract, 1)
  const enquiries = Math.max(v.enquiries, 0)
  const hourly = Math.max(v.hourly, 0)

  const buildsNeeded = Math.ceil(revenue / contract) || 0

  let convRate, unpaidHours, unpaidCost, unpaidLabel, unpaidWorking, unpaidMeans
  let lostBuilds, lostWorking, lostLabel, lostMeans

  if (model === 'paid_quote') {
    const paid = Math.max(v.paidRate, 0.0001) / 100
    const build = Math.max(v.buildRate, 0.0001) / 100
    convRate = paid * build

    // The homeowner funds the estimate. What the builder still eats is the
    // front-end time on enquiries that never became a client.
    const deadEnq = enquiries * 12 * (1 - paid)
    unpaidHours = deadEnq * Math.max(v.frontHours, 0)
    unpaidCost = unpaidHours * hourly
    unpaidLabel = 'Unpaid front-end time'
    unpaidWorking = `${num(enquiries)}/mo × 12 × (1 − ${Math.round(v.paidRate)}%) = ${dec(deadEnq)} that never became a client × ${num(v.frontHours)} hrs = ${num(unpaidHours)} hrs × ${money(hourly)}`
    unpaidMeans = 'Calls, site visits and first consults with people who never became clients. The estimate itself they paid for. This is the part you still eat.'

    const paidQuotes = enquiries * 12 * paid
    const goneQuiet = paidQuotes * (1 - build)
    lostBuilds = goneQuiet * RECOVER_SHARE
    lostLabel = 'Paid quotes that went quiet'
    lostWorking = `${num(enquiries)}/mo × ${Math.round(v.paidRate)}% = ${dec(paidQuotes)} paid quotes a year × (1 − ${Math.round(v.buildRate)}%) = ${dec(goneQuiet)} went quiet, count 1 in 7 back`
    lostMeans = 'Quotes the homeowner already paid you to produce, then let go quiet. Counting only 1 in 7 as winnable, this is what follow-up recovers.'
  } else {
    const close = Math.max(v.closeRate, 0.0001) / 100
    convRate = close

    unpaidHours = Math.max(v.quotes, 0) * 12 * Math.max(v.hoursPerQuote, 0) * (1 - close)
    unpaidCost = unpaidHours * hourly
    unpaidLabel = 'Unpaid estimating time'
    unpaidWorking = `${num(v.quotes)} quotes/mo × 12 × ${num(v.hoursPerQuote)} hrs × (1 − ${Math.round(v.closeRate)}%) = ${num(unpaidHours)} hrs × ${money(hourly)}`
    unpaidMeans = 'Skilled work, done free, at your own rate, on jobs that were never going to sign.'

    const unquoted = Math.max(enquiries - Math.max(v.quotes, 0), 0) * 12
    const worthHaving = unquoted * WORTH_HAVING
    lostBuilds = worthHaving * close
    lostLabel = 'Enquiries that slipped away'
    lostWorking = `(${num(enquiries)} − ${num(v.quotes)}) × 12 = ${num(unquoted)} never quoted × 1 in 4 worth having = ${dec(worthHaving)} × ${Math.round(v.closeRate)}% close`
    lostMeans = 'The ones nobody had time to quote properly. Counting only 1 in 4 as genuine, this is what quietly walks out the door.'
  }

  // Contract value is revenue, not profit. Summing full contract value into a
  // "cost" produced figures in the millions, which a builder who knows his own
  // margin reads as marketing nonsense. The cost is the margin he did not earn;
  // the contract value is shown separately as context.
  const lostRevenue = lostBuilds * contract
  const lostMargin = lostRevenue * (Math.max(v.margin, 0) / 100)
  const total = unpaidCost + lostMargin

  const enqNeeded = convRate > 0 ? buildsNeeded / convRate / 12 : 0
  const gap = Math.max(enqNeeded - enquiries, 0)
  const hasGap = gap > 0.05
  const buildsNow = enquiries * 12 * convRate

  const planKey = enquiries <= 15 ? 'starter' : 'growth'
  const plan = PLANS[planKey]
  const firstYear = plan.setup + 12 * plan.monthly
  const roi = firstYear > 0 ? total / firstYear : 0

  const dailyLeak = total / 365
  const beDays = dailyLeak > 0 ? Math.ceil(firstYear / dailyLeak) : Infinity
  let breakEven
  if (total <= 0 || !Number.isFinite(beDays) || beDays > 365) breakEven = 'Not at these numbers'
  else if (beDays <= 1) breakEven = 'About a day'
  else breakEven = `${num(beDays)} days`

  return {
    model, buildsNeeded, enqNeeded, gap, hasGap, buildsNow, convRate,
    unpaidHours, unpaidCost, unpaidLabel, unpaidWorking, unpaidMeans,
    lostBuilds, lostRevenue, lostMargin, lostLabel, lostWorking, lostMeans,
    total, plan, planKey, firstYear, roi, breakEven,
    buildsWorking: `${money(revenue)} ÷ ${money(contract)} = ${num(buildsNeeded)} builds`,
    enqWorking: `${num(buildsNeeded)} builds ÷ ${dec(convRate * 100)}% enquiry-to-build ÷ 12 = ${dec(enqNeeded)} a month`,
  }
}
