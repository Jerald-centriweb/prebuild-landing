import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FadeUp } from './FadeUp'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'We learn your process',
    desc: 'One short conversation about your build type, budget thresholds, and how you currently handle enquiries. That is all we need to get started.',
  },
  {
    num: '02',
    title: 'We build it for your business',
    desc: 'We configure the workflows, lead handling, and qualification flow around your process. You do not touch anything.',
  },
  {
    num: '03',
    title: 'We launch and optimise',
    desc: 'We monitor how leads move through the system and refine it during the first 30 days until it\'s working correctly for your market.',
  },
  {
    num: '04',
    title: 'You have better conversations',
    desc: 'The people reaching you are clearer on budget, more serious about timelines, and more worth your time.',
  },
]

export default function HowItWorks() {
  const sectionRef  = useRef(null)
  const progressRef = useRef(null)
  const stepsRef    = useRef([])

  /*
   * GSAP ScrollTrigger — cinematic pin:
   * The section pins while the progress line fills and each step
   * fades + slides in from the right, one by one.
   */
  useEffect(() => {
    const stepEls = stepsRef.current.filter(Boolean)

    // Set initial state
    gsap.set(stepEls, { opacity: 0, x: 32 })
    gsap.set(progressRef.current, { scaleY: 0, transformOrigin: 'top center' })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${stepEls.length * 220}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      })

      /* Progress line fills as steps appear */
      tl.to(progressRef.current, {
        scaleY: 1,
        duration: stepEls.length,
        ease: 'none',
      }, 0)

      /* Stagger each step in */
      stepEls.forEach((el, i) => {
        tl.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, i * 0.9)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="s-dark how-section" id="how" ref={sectionRef}>
      <div className="wrap-md">
        <FadeUp>
          <span className="eyebrow">Four steps, then it runs itself</span>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="h2 light">
            Simple to start.<br />Done for you.
          </h2>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="lead on-dark" style={{ marginTop: 16 }}>
            You do not need to build this yourself or learn another complicated system. We configure
            everything for your business and hand it back to you running.
          </p>
        </FadeUp>

        <div className="steps" style={{ position: 'relative' }}>
          {/* Animated progress fill over the left border */}
          <div
            ref={progressRef}
            style={{
              position: 'absolute',
              left: -1,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'var(--blue-400)',
              transformOrigin: 'top center',
            }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="step"
              ref={(el) => { stepsRef.current[i] = el }}
            >
              <div className="step-num">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
