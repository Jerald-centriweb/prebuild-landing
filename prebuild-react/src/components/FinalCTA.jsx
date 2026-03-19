import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FinalCTA({ scrollTo }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

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
    <section className="final-section" id="final-cta">
      <div className="final-grid" aria-hidden="true" />
      <motion.div
        ref={ref}
        className="final-inner"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.h2 className="final-h2" variants={headlineItem}>
          Your next enquiry<br />
          should be <span className="accent">worth</span><br />
          your time.
        </motion.h2>

        <motion.p className="final-sub" variants={item}>
          Book a 20-minute conversation. We will look at your current front-end process, show you
          exactly how the system works for a builder like you, and tell you plainly whether it is the
          right fit.
        </motion.p>

        <motion.a
          href="#"
          className="btn-primary btn-final"
          variants={item}
          whileHover={{ background: 'var(--blue-600)', y: -2, boxShadow: '0 8px 40px rgba(47,127,212,0.4)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          Book a 20-Minute Conversation →
        </motion.a>

        <motion.p className="final-trust" variants={item}>
          No obligation · No pitch · Available within 2 business days
        </motion.p>

        <motion.div className="final-loopback" variants={item}>
          <p>Not ready to book yet?</p>
          <a
            href="#calculator"
            onClick={(e) => { e.preventDefault(); scrollTo('calculator') }}
          >
            Or run the calculator first — see what your current process is costing you →
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
