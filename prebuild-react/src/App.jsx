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

export default function App() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Nav scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <ProblemSection />
      <CalculatorSection scrollTo={scrollTo} />
      <SolutionSection scrollTo={scrollTo} />
      <HowItWorks />
      <WhoSection />
      <ProofSection />
      <CredibilitySection />
      <FAQSection />
      <GuaranteeSection />
      <FinalCTA scrollTo={scrollTo} />
      <Footer />
    </>
  )
}
