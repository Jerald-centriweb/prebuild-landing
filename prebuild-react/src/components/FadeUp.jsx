import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * FadeUp — reusable scroll-triggered entrance animation.
 * Replaces the original .r / .in IntersectionObserver pattern.
 * Framer Motion handles the threshold + delay cascade.
 */
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
