import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealBlur, FadeUp } from './FadeUp'

const FAQS = [
  {
    q: 'Do I need to change everything I already use?',
    a: "No. PreBuild sits in front of your existing estimating or admin process. It structures what happens before serious quoting begins. It doesn't replace your tools.",
    cat: 'system',
  },
  {
    q: 'Is this another CRM I have to learn?',
    a: "No. We set it up for you. The goal is less manual follow-up and better lead handling, not more admin on your end. You don't manage any of the back end.",
    cat: 'system',
  },
  {
    q: 'How long does setup take?',
    a: 'Most setups are live within 10–14 business days of the onboarding session. If your situation is more complex, we tell you that upfront before you commit to anything.',
    cat: 'getting-started',
  },
  {
    q: 'What happens in the first conversation?',
    a: 'We look at how you currently handle enquiries, where time is being lost, and whether PreBuild is the right fit for your business. No pitch deck. Straight to the point. Twenty minutes.',
    cat: 'getting-started',
  },
  {
    q: 'What does this cost?',
    a: 'Pricing depends on your setup: the number of channels, build type, and how complex your current process is. We cover it in the first conversation so we can give you an accurate number, not a range. There are no surprises after that call.',
    cat: 'getting-started',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <FadeUp delay={index * 0.06}>
      <div className="faq-item">
        <button
          className="faq-trigger"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span className={`faq-q${open ? ' active' : ''}`}>
            {faq.q}
          </span>
          <motion.span
            className="faq-icon"
            animate={{ rotate: open ? 45 : 0, color: open ? 'var(--blue-400)' : 'var(--steel-400)' }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            +
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p className="faq-a">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  )
}

export default function FAQSection() {
  return (
    <section className="s-white faq-section" id="faq">
      <div className="wrap-md">
        <FadeUp>
          <span className="eyebrow-tag">Common questions</span>
        </FadeUp>
        <RevealBlur delay={0.08}>
          <h2 className="faq-h2">Straight answers.</h2>
        </RevealBlur>

        <div className="faq-group">
          <span className="faq-cat-label">About the system</span>
          {FAQS.filter(f => f.cat === 'system').map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>

        <div className="faq-group">
          <span className="faq-cat-label">Getting started</span>
          {FAQS.filter(f => f.cat === 'getting-started').map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
