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
import SurveyModal from './components/SurveyModal'
import BookingModal from './components/BookingModal'

export default function App() {
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
      <HowItWorks />
      <WhoSection />
      <FinalCTA scrollTo={scrollTo} variant="mid" />
      <ProofSection />
      <CredibilitySection />
      <FAQSection />
      <GuaranteeSection />
      {/* Closing ask, after proof and objection handling have done their work. */}
      <FinalCTA scrollTo={scrollTo} variant="closing" />
      <Footer />
      <SurveyModal />
      <BookingModal />
    </MotionConfig>
  )
}
