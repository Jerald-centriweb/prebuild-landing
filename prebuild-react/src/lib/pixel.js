/**
 * Meta Pixel event helpers.
 *
 * A pixel that only fires PageView can build audiences but cannot optimise for
 * anything, so the three real conversion points on the page are tracked as
 * standard events Meta already understands.
 *
 * Deliberately sends NO personal data. The calculator collects name, email and
 * phone, but Meta requires those to be SHA-256 hashed for Advanced Matching and
 * sending them raw would leak visitor PII to a third party. Only the archetype
 * (free_quote / paid_quote) goes across, which is useful for building separate
 * retargeting audiences and identifies nobody.
 *
 * Every call no-ops safely if fbq is missing — ad blockers remove it, and a
 * tracking script must never break the page.
 */

function track(event, params) {
  try {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
    if (params) window.fbq('track', event, params)
    else window.fbq('track', event)
  } catch {
    /* tracking must never throw into the app */
  }
}

/** Calculator gate submitted — the main lead magnet conversion. */
export function trackLead(archetype) {
  track('Lead', {
    content_name: 'Quoting Cost Calculator',
    content_category: archetype || 'unknown',
  })
}

/** "Apply for a Consult" opened. */
export function trackConsultOpen() {
  track('Contact', { content_name: 'Apply for a Consult' })
}

/** "Book a Call" opened. */
export function trackBookingOpen() {
  track('Schedule', { content_name: 'Book a Call' })
}
