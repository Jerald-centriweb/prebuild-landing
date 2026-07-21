import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
      {/* The icon and wordmark are a crossfade pair of the same logo, so the
          accessible name lives on the link and both images are decorative —
          otherwise a screen reader announces "PreBuild" twice. */}
      <a href="#top" className="nav-logo" aria-label="PreBuild — back to top">
        <div className="nav-logo-wrap">
          <motion.img
            src="/images/logo-icon.png"
            alt=""
            aria-hidden="true"
            width={256}
            height={256}
            className="nav-logo-icon"
            animate={{ opacity: scrolled ? 0 : 1, scale: scrolled ? 0.88 : 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.img
            src="/images/logo-wordmark.png"
            alt=""
            aria-hidden="true"
            width={800}
            height={264}
            className="nav-logo-wordmark"
            animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.88 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </a>

      <ul className="nav-links">
        {[
          { label: 'Cost Calculator', id: 'calculator' },
          { label: 'How It Works', id: 'how' },
          { label: 'FAQ', id: 'faq' },
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
        className={`nav-cta${scrolled ? ' visible' : ''}`}
        onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-survey')) }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <span className="nav-cta-full">Apply for a Consult →</span>
        <span className="nav-cta-short">Apply →</span>
      </motion.a>
    </motion.nav>
  )
}
