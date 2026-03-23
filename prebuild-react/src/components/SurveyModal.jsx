import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const CONSULT_FORM_URL = 'https://app.centriweb.com/v2/preview/uJeTq7zg7v503PN20Iic'

export default function SurveyModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-survey', handleOpen)
    return () => window.removeEventListener('open-survey', handleOpen)
  }, [])

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleOpenForm = () => {
    window.open(CONSULT_FORM_URL, '_blank', 'noopener,noreferrer')
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="survey-modal"
          className="survey-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="survey-modal-content"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="survey-close-btn" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>
            <div className="survey-modal-body">
              <h3 className="survey-modal-title">Apply for a Consult</h3>
              <p className="survey-modal-sub">
                Tell us about your build — takes under 2 minutes. Your answers help us understand your project before we talk.
              </p>
              <motion.button
                type="button"
                className="btn-primary survey-open-btn"
                onClick={handleOpenForm}
                whileHover={{ background: 'var(--blue-600)', scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Open consult form →
              </motion.button>
              <p className="survey-modal-trust">Opens in a new tab · No spam · Responses go directly to your file</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
