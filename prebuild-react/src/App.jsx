import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import CalculatorSection from './components/CalculatorSection'
import SolutionSection from './components/SolutionSection'
import HowItWorks from './components/HowItWorks'
import WhoSection from './components/WhoSection'
import ProofSection from './components/ProofSection'
import CredibilitySection from './components/CredibilitySection'
import FAQSection from './components/FAQSection'
import GuaranteeSection from './components/GuaranteeSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import { flushQueue, installUnloadFlush } from './lib/leadCapture'
import SurveyModal from './components/SurveyModal'
import BookingModal from './components/BookingModal'

export default function App() {
  // Retry any lead that failed to send on a previous visit, and make a
  // last-ditch attempt via sendBeacon if the tab closes with one still queued.
  useEffect(() => {
    flushQueue()
    return installUnloadFlush()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    /* reducedMotion="user" makes every Framer Motion animation on the page
       honour the visitor's OS "reduce motion" setting automatically. */
    <MotionConfig reducedMotion="user">
      <Nav scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <ProblemSection />
      <CalculatorSection scrollTo={scrollTo} />
      <SolutionSection scrollTo={scrollTo} />

      {/* Proof and credibility moved ahead of HowItWorks. Everything before
          this point is PreBuild talking about itself; the reader has to believe
          it works before he'll care how it works. HowItWorks also pins the
          viewport, which is a lot of attention to demand before any evidence. */}
      <ProofSection />
      <CredibilitySection />

      <HowItWorks />

      {/* Who It's For sits after the mechanism. The yes/no list asks the reader
          to categorise himself; that self-label is only worth something once
          the thing is credible. Here the "that's me" tick becomes a micro
          commitment the CTA below can cash in. */}
      <WhoSection />

      {/* Risk reversal decays with distance from the ask, so the guarantee now
          sits directly above the first CTA rather than three sections away. */}
      <GuaranteeSection />
      <FinalCTA scrollTo={scrollTo} variant="mid" />

      {/* Anyone still scrolling past that ask is objecting to something.
          Objection handling then a second ask ends the page on a resolved
          doubt rather than a footer. */}
      <FAQSection />
      <FinalCTA scrollTo={scrollTo} variant="closing" />
      <Footer />
      <SurveyModal />
      <BookingModal />
    </MotionConfig>
  )
}
