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
      <a href="#" className="footer-logo-link">
        <img
          src="/images/logo-wordmark.png"
          alt="PreBuild"
          className="footer-logo-img"
        />
      </a>
      <p className="footer-copy">© 2026 PreBuild · For Australian residential builders</p>
    </motion.footer>
  )
}
