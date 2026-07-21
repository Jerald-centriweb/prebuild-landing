import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GuaranteeSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  useEffect(() => {
    // Reduced motion: skip the background parallax entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        backgroundPosition: '0 30px',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="guarantee-section" ref={sectionRef}>
      <div className="guarantee-grid" aria-hidden="true" />
      <motion.div
        className="guarantee-inner"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        <motion.span className="guarantee-label" variants={item}>
          Our commitment
        </motion.span>
        <motion.h2 className="guarantee-headline" variants={item}>
          Your first serious lead through the full process within 30 days of going live, or we go
          back in and rebuild until it does.
        </motion.h2>
        <motion.div className="guarantee-divider" variants={item} />
        <motion.p className="guarantee-body" variants={item}>
          We configure the system, so we own the outcome. This isn't a marketing line. It's how
          we operate. If it doesn't work in 30 days, we fix it.
        </motion.p>
      </motion.div>
    </section>
  )
}
