import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const HomeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

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
      <div className="footer-logo">
        <div className="footer-logo-mark">
          <HomeIcon />
        </div>
        PreBuild Autopilot
      </div>
      <p className="footer-copy">© 2025 PreBuild Autopilot · For Australian residential builders</p>
    </motion.footer>
  )
}
