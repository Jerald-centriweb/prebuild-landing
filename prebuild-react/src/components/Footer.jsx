import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px 0px' })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <a href="#top" className="footer-logo-link" aria-label="PreBuild, back to top">
        <img
          src="/images/logo-wordmark.png"
          alt=""
          aria-hidden="true"
          width={800}
          height={264}
          loading="lazy"
          decoding="async"
          className="footer-logo-img"
        />
      </a>
      {/* Meta requires an accessible privacy policy for advertisers, and
          reviewers check it is linked from the site rather than only reachable
          by direct URL. A visible contact address is also a legitimacy signal
          during ad review. Plain <a> tags, not router links: /privacy and
          /terms are static pages served outside the React bundle. */}
      <div className="footer-right">
        <p className="footer-copy">© 2026 PreBuild · For Australian residential builders</p>
        <nav className="footer-links" aria-label="Site">
          {/* Guides must be linked from the app, not just listed in the
              sitemap. Orphan pages are crawled reluctantly and pass no
              internal link equity. */}
          <a className="footer-link" href="/guides">Guides</a>
          <a className="footer-link" href="/privacy">Privacy</a>
          <a className="footer-link" href="/terms">Terms</a>
          <a className="footer-link" href="mailto:info@prebuildsystems.com">info@prebuildsystems.com</a>
        </nav>
      </div>
    </motion.footer>
  )
}
