import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { RevealBlur, FadeUp } from './FadeUp'

const TESTIMONIALS = [
  {
    quote: "I used to spend Sunday nights quoting people who had already hired someone else. That stopped. Now the ones who get through are actually serious — and they have already put skin in the game before I touch the drawings.",
    name: 'Custom home builder, NSW',
    sub: '12 homes per year · Custom & design-build',
  },
  {
    quote: "I had been meaning to fix the front-end for years. I knew the problem but could not make time to solve it while running jobs. PreBuild just did it. I had it running in two weeks without writing a single line of anything.",
    name: 'Residential builder, QLD',
    sub: 'Extensions & renovations · 8–14 jobs per year',
  },
  {
    quote: "Our conversion rate on initial consults went from 15% to 80%. We only talk to people who understand our value and are ready to invest.",
    name: 'High-end Developer, VIC',
    sub: '$5M+ Project Avg',
  },
  {
    quote: "The amount of time we save is incredible. We get detailed prospect intel before we even pick up the phone. It completely changed our sales process.",
    name: 'Volume Builder, SA',
    sub: '30+ homes per year',
  },
  {
    quote: "Finally a system that acts like a gatekeeper. If a lead isn't willing to go through the PreBuild process, they were never going to be a good client anyway.",
    name: 'Boutique Builder, WA',
    sub: 'Architectural builds',
  },
]

function QuoteIcon() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" className="proof-quote-icon">
      <path d="M0 28V17.6C0 12.267 1.4 8.067 4.2 5C7.067 1.933 11.2 0.133 16.6 0L17.8 3.4C14.867 4.133 12.667 5.433 11.2 7.3C9.8 9.167 9.133 11.4 9.2 14H16V28H0ZM20 28V17.6C20 12.267 21.4 8.067 24.2 5C27.067 1.933 31.2 0.133 36.6 0L37.8 3.4C34.867 4.133 32.667 5.433 31.2 7.3C29.8 9.167 29.133 11.4 29.2 14H36V28H20Z" fill="var(--blue-200)"/>
    </svg>
  )
}

export default function ProofSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section className="s-white proof-section" id="proof">
      <div className="wrap-lg">
        <FadeUp>
          <span className="eyebrow-tag">What builders say</span>
        </FadeUp>
        <RevealBlur delay={0.08}>
          <h2 className="proof-h2">
            Builders who stopped<br />quoting blind.
          </h2>
        </RevealBlur>

        <motion.div 
          className="proof-marquee-container"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          ref={ref}
        >
          <div className="proof-marquee-track">
            {/* Render array twice for seamless CSS infinite loop */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div className="proof-card" key={i}>
                <QuoteIcon />
                <p className="proof-card-quote">{t.quote}</p>
                <div className="proof-card-author">
                  <strong>{t.name}</strong>
                  <span>{t.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <FadeUp delay={0.4}>
          <p className="proof-note" style={{ marginTop: '24px' }}>
            Names withheld at clients' request · Results vary by market and build type
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
