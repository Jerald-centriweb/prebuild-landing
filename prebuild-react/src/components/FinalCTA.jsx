import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Rendered twice on the page:
 *  - variant="mid"     — after Who It's For, catches builders who are already sold.
 *                        Loops the undecided back to the calculator.
 *  - variant="closing" — after the Guarantee, once Proof, Credibility and the FAQ
 *                        have done their work. Bookends the hero, so the page no
 *                        longer ends on a footer with nothing to click.
 */
export default function FinalCTA({ scrollTo, variant = 'mid' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const isClosing = variant === 'closing'

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14 } },
  }
  const headlineItem = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="final-section" id={isClosing ? 'closing-cta' : 'final-cta'}>
      <div className="final-grid" aria-hidden="true" />
      <motion.div
        ref={ref}
        className="final-inner"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {isClosing ? (
          <motion.h2 className="final-h2" variants={headlineItem}>
            You already know<br />
            which quotes were<br />
            <span className="accent">never</span> going to land.
          </motion.h2>
        ) : (
          <motion.h2 className="final-h2" variants={headlineItem}>
            Your next enquiry<br />
            should be <span className="accent">worth</span><br />
            your time.
          </motion.h2>
        )}

        <motion.p className="final-sub" variants={item}>
          {isClosing
            ? "One conversation. We look at how enquiries reach you today, show you what changes, and tell you plainly whether it's the right fit for your business."
            : "Apply for a consult or book a call. We'll look at your current front-end process, show you exactly how the system works for a builder like you, and tell you plainly whether it's the right fit."}
        </motion.p>

        <motion.div className="final-cta-group" variants={item}>
          {/* This opens a modal — it is an action, not navigation, so it is a
              <button>. It was previously an <a href="#">. */}
          <motion.button
            type="button"
            className="btn-primary btn-final"
            onClick={() => window.dispatchEvent(new Event('open-survey'))}
            whileHover={{ background: 'var(--blue-600)', y: -2, boxShadow: '0 8px 40px rgba(47,127,212,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            Apply for a Consult →
          </motion.button>

          <span className="final-or-divider">or</span>

          <motion.button
            className="btn-book-call"
            onClick={() => window.dispatchEvent(new Event('open-booking'))}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book a Call
          </motion.button>
        </motion.div>

        <motion.p className="final-trust" variants={item}>
          No obligation · No pitch · Available within 2 business days
        </motion.p>

        {/* Only on the mid-page CTA. By the closing one the visitor has already
            passed the calculator, so sending them back is a dead end. */}
        {!isClosing && (
          <motion.div className="final-loopback" variants={item}>
            <p>Not ready to book yet?</p>
            <a
              href="#calculator"
              onClick={(e) => { e.preventDefault(); scrollTo('calculator') }}
            >
              Or run the calculator first. See what your current process is costing you →
            </a>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
