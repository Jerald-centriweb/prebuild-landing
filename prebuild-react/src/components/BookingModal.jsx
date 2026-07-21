import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useEmbedHeight from './useEmbedHeight'

const BOOKING_URL = 'https://app.prebuildsystems.com/widget/booking/Fl5fA1OXQXKCs5dCWyYG'

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const embedHeight = useEmbedHeight(isOpen)

  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-booking', handleOpen)
    return () => window.removeEventListener('open-booking', handleOpen)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="booking-overlay"
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="modal-card modal-card--wide"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
            {/* The id must match the GoHighLevel widget id — form_embed.js
                targets the iframe by it to push height updates. */}
            <iframe
              id="Fl5fA1OXQXKCs5dCWyYG"
              style={embedHeight ? { height: `${embedHeight}px`, minHeight: 0 } : undefined}
              src={BOOKING_URL}
              title="Book a call with PreBuild"
              scrolling="no"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
