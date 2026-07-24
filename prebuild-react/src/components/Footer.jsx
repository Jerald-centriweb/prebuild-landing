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
      <div className="footer-right">
        <p className="footer-copy">© 2026 PreBuild · For Australian residential builders</p>
        {/* Meta requires an accessible privacy policy for advertisers, and
            reviewers check it is linked from the site rather than only
            reachable by direct URL. Plain <a>, not a router link: /privacy is
            a static page served outside the React bundle. */}
        <a className="footer-link" href="/privacy">Privacy Policy</a>
      </div>
    </motion.footer>
  )
}
