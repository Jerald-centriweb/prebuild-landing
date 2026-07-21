import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/* ── FadeUp — simple scroll-triggered entrance ── */
export function FadeUp({ children, delay = 0, className = '', style = {}, as = 'div' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 13 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 13 }}
      transition={{ duration: 0.52, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ── RevealBlur — headline entrance with blur-to-sharp ── */
export function RevealBlur({ children, delay = 0, className = '', style = {}, as = 'div' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.95, y: 40, filter: 'blur(12px)' }}
      animate={inView ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ── StaggerReveal — container that staggers children ── */
export function StaggerReveal({ children, className = '', style = {}, stagger = 0.08, delayStart = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delayStart } },
      }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export const staggerItemBlur = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

/* ── SlideIn — horizontal entrance for asymmetric layouts ── */
export function SlideIn({ children, direction = 'left', delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  const x = direction === 'left' ? -40 : 40

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
