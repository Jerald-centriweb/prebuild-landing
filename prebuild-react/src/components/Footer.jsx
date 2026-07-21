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
      <a href="#top" className="footer-logo-link" aria-label="PreBuild — back to top">
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
      <p className="footer-copy">© 2026 PreBuild · For Australian residential builders</p>
    </motion.footer>
  )
}
