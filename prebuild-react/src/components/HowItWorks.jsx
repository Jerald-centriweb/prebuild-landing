import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealBlur, FadeUp } from './FadeUp'

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
    desc: "We configure the workflows, lead handling, and qualification flow around your process. You don't touch anything.",
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
  const sectionRef = useRef(null)
  const progressRef = useRef(null)
  const stepsRef = useRef([])
  const activeNumRef = useRef(null)

  useEffect(() => {
    const stepEls = stepsRef.current.filter(Boolean)

    // Reduced motion: this section pins the viewport and scrubs through the
    // steps. Skip all of it — render the steps in their final state so the
    // content is fully readable without hijacking the scroll.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(stepEls, { opacity: 1, x: 0 })
      gsap.set(progressRef.current, { scaleY: 1, transformOrigin: 'top center' })
      if (activeNumRef.current) activeNumRef.current.innerText = `0${STEPS.length}`
      return
    }

    gsap.set(stepEls, { opacity: 0, x: 32 })
    gsap.set(progressRef.current, { scaleY: 0, transformOrigin: 'top center' })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${stepEls.length * 280}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      })

      tl.to(progressRef.current, {
        scaleY: 1,
        duration: stepEls.length,
        ease: 'none',
        onUpdate: function() {
          if (activeNumRef.current) {
            const progress = this.progress()
            // Map 0-1 progress to steps 1-4
            const step = Math.min(STEPS.length, Math.max(1, Math.ceil(progress * STEPS.length)))
            activeNumRef.current.innerText = `0${step}`
          }
        }
      }, 0)

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
      <div className="how-layout">
        {/* Left — large step number display */}
        <div className="how-visual">
          <div className="how-visual-inner">
            <span className="how-visual-label">Step</span>
            <div className="how-visual-num" ref={activeNumRef}>01</div>
            <div className="how-visual-line" />
          </div>
        </div>

        {/* Right — content */}
        <div className="how-content">
          <FadeUp>
            <span className="eyebrow">Four steps, then it runs itself</span>
          </FadeUp>
          <RevealBlur delay={0.08}>
            <h2 className="how-h2">
              Simple to start.<br />Done for you.
            </h2>
          </RevealBlur>
          <FadeUp delay={0.16}>
            <p className="how-lead">
              You don't need to build this yourself or learn another system. We configure
              everything for your business and hand it back to you running.
            </p>
          </FadeUp>

          <div className="steps-container">
            <div
              ref={progressRef}
              className="steps-progress"
            />
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className="step"
                ref={(el) => { stepsRef.current[i] = el }}
              >
                <div className="step-num">{step.num}</div>
                <div className="step-body">
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
