/**
 * Reliable lead delivery for the calculator.
 *
 * The calculator is the main lead magnet, so a submission must not be lost if
 * the webhook is briefly down, rate-limited, or the visitor's connection drops
 * mid-request. Previously this was a bare fetch().catch(console.error) — a
 * failed send vanished, and the visitor still saw their report, so nobody ever
 * found out a lead had gone missing.
 *
 * Delivery strategy:
 *  1. POST, retried 3 times with backoff (1s, 3s, 7s).
 *  2. Anything still undelivered is queued in localStorage.
 *  3. The queue is flushed on the next page load, and again via sendBeacon if
 *     the visitor closes the tab first.
 *
 * Every lead carries a client-generated id so replays can be de-duplicated
 * downstream in n8n.
 */

const WEBHOOK = 'https://n8n.centriweb.com/webhook/b74e323d-2237-42d0-87a8-e9c6133f8dd9'
const QUEUE_KEY = 'prebuild_pending_leads'
const RETRY_DELAYS = [1000, 3000, 7000]
const MAX_QUEUE = 25

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function readQueue() {
  try {
    const raw = localStorage.getItem(QUEUE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeQueue(items) {
  try {
    // Keep the newest if something has gone badly wrong, rather than growing
    // without bound in a visitor's browser.
    localStorage.setItem(QUEUE_KEY, JSON.stringify(items.slice(-MAX_QUEUE)))
  } catch {
    /* storage full or blocked (private mode) — nothing useful to do */
  }
}

function enqueue(payload) {
  const q = readQueue()
  if (!q.some((item) => item.lead_id === payload.lead_id)) {
    q.push(payload)
    writeQueue(q)
  }
}

function dequeue(leadId) {
  writeQueue(readQueue().filter((item) => item.lead_id !== leadId))
}

async function post(payload) {
  const res = await fetch(WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  })
  if (!res.ok) throw new Error(`webhook responded ${res.status}`)
  return true
}

/**
 * Attempts delivery with retries. Queues the payload on failure.
 * Resolves true if delivered, false if queued for later.
 */
export async function sendLead(payload) {
  const lead = {
    ...payload,
    lead_id: payload.lead_id || crypto.randomUUID(),
    submitted_at: new Date().toISOString(),
  }

  // Queue first, so a hard crash or tab close mid-flight still leaves a record.
  enqueue(lead)

  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    try {
      await post(lead)
      dequeue(lead.lead_id)
      return true
    } catch {
      if (attempt < RETRY_DELAYS.length) await sleep(RETRY_DELAYS[attempt])
    }
  }

  return false
}

/** Retries anything left over from a previous visit or a failed send. */
export async function flushQueue() {
  const q = readQueue()
  if (!q.length) return
  for (const lead of q) {
    try {
      await post(lead)
      dequeue(lead.lead_id)
    } catch {
      // Still unreachable. Leave it queued and try again next load.
      break
    }
  }
}

/**
 * Last-ditch delivery when the tab is closing. sendBeacon survives unload,
 * where a normal fetch would be cancelled.
 */
export function installUnloadFlush() {
  const onHidden = () => {
    if (document.visibilityState !== 'hidden') return
    const q = readQueue()
    if (!q.length || !navigator.sendBeacon) return
    for (const lead of q) {
      try {
        const blob = new Blob([JSON.stringify(lead)], { type: 'application/json' })
        navigator.sendBeacon(WEBHOOK, blob)
      } catch {
        /* nothing further we can do at unload */
      }
    }
  }
  document.addEventListener('visibilitychange', onHidden)
  return () => document.removeEventListener('visibilitychange', onHidden)
}
