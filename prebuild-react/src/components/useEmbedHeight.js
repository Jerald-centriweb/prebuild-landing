import { useEffect, useState } from 'react'

const EMBED_SCRIPT = 'https://app.prebuildsystems.com/js/form_embed.js'
const HOST = 'prebuildsystems.com'

/**
 * Sizes a GoHighLevel embed to its content.
 *
 * GHL widgets use iframe-resizer. The child inside the iframe announces itself
 * with `[iFrameSizer]<id>:0:0:init` and then waits for the parent library to
 * complete a handshake before it will report heights. GHL's form_embed.js is
 * that parent, but it only scans for iframes when it loads — and our modals
 * mount their iframe later, via a portal, when the modal opens. So the script
 * never saw the iframe, the handshake never happened, no height ever arrived,
 * and the form sat in a fixed-height box surrounded by dead space.
 *
 * Loading the script on open (and re-running it on subsequent opens) means it
 * always runs with the iframe already in the DOM.
 *
 * We also parse the height directly as a fallback, so a change in GHL's script
 * doesn't silently put us back in the dead-space state.
 *
 * @param {boolean} active - true while the modal is open.
 */
export default function useEmbedHeight(active) {
  const [height, setHeight] = useState(null)

  // Load (or re-run) GHL's resizer once the iframe exists.
  useEffect(() => {
    if (!active) return
    const existing = document.querySelector(`script[src="${EMBED_SCRIPT}"]`)
    if (existing) existing.remove()
    const s = document.createElement('script')
    s.src = EMBED_SCRIPT
    s.async = true
    document.body.appendChild(s)
  }, [active])

  // Read heights directly as a safety net.
  useEffect(() => {
    if (!active) return

    const onMessage = (e) => {
      let host
      try { host = new URL(e.origin).hostname } catch { return }
      if (host !== HOST && !host.endsWith(`.${HOST}`)) return

      const d = e.data
      let h = null

      if (typeof d === 'number') {
        h = d
      } else if (typeof d === 'string') {
        // iframe-resizer: "[iFrameSizer]<id>:<height>:<width>:<type>"
        const sizer = d.match(/^\[iFrameSizer\][^:]+:([\d.]+):/)
        if (sizer) {
          h = parseFloat(sizer[1])
        } else {
          try {
            const parsed = JSON.parse(d)
            h = parsed?.height ?? parsed?.docHeight ?? parsed?.scrollHeight
          } catch {
            /* not JSON, ignore */
          }
        }
      } else if (d && typeof d === 'object' && !Array.isArray(d)) {
        h = d.height ?? d.docHeight ?? d.scrollHeight
      }

      h = Number(h)
      // Ignore the 0-height init handshake and any nonsense values, so a stray
      // message can never collapse the modal.
      if (Number.isFinite(h) && h > 200 && h < 6000) setHeight(Math.ceil(h))
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [active])

  // Reset between openings so a tall booking view doesn't leak into a short
  // survey step the next time a modal opens.
  useEffect(() => { if (!active) setHeight(null) }, [active])

  return height
}
