import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SurveyModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-survey', handleOpen)
    return () => window.removeEventListener('open-survey', handleOpen)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script')
      script.src = "https://link.centriweb.com/js/form_embed.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="survey-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            className="survey-modal-content"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="survey-close-btn" onClick={() => setIsOpen(false)}>✕</button>
            <div className="survey-iframe-container">
              <iframe 
                src="https://link.centriweb.com/widget/survey/PKQMr5xuouVI0GdmlprM" 
                style={{ border: 'none', width: '100%', height: '100%' }} 
                scrolling="yes" 
                id="PKQMr5xuouVI0GdmlprM" 
                title="survey"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
