import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HomeIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

export default function Nav({ scrollTo }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`nav${scrolled ? ' scrolled' : ''}`}
      id="nav"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#" className="nav-logo">
        <div className="nav-logo-mark">
          <HomeIcon />
        </div>
        Pre<span>Build</span>
      </a>

      <ul className="nav-links">
        {[
          { label: 'Cost Calculator', id: 'calculator' },
          { label: 'How It Works',    id: 'how' },
          { label: 'FAQ',             id: 'faq' },
        ].map(({ label, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(id) }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <motion.a
        href="#final-cta"
        className="nav-cta"
        onClick={(e) => { e.preventDefault(); scrollTo('final-cta') }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        Book a Conversation →
      </motion.a>
    </motion.nav>
  )
}
