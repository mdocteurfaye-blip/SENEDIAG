'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '@/lib/constants'

export default function SOSButton() {
  const [open, setOpen] = useState(false)

  const sosWa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("URGENCE SENEDIAG - J'ai besoin d'aide immediatement. Mon adresse : ")}`

  return (
    <>
      {/* SOS fixed button */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-2"
            >
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-transform"
                title="Appeler"
              >
                📞
              </a>
              <a
                href={sosWa}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-transform"
                title="WhatsApp urgent"
              >
                💬
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main SOS */}
        <motion.button
          onClick={() => setOpen(o => !o)}
          whileTap={{ scale: 0.92 }}
          className="w-16 h-16 rounded-full bg-red-500 text-white font-display font-bold text-sm shadow-lg hover:bg-red-600 transition-colors flex flex-col items-center justify-center gap-0.5"
          style={{ animation: 'pulse-ring 1.5s infinite' }}
          title="Urgence"
        >
          <span className="text-lg">🆘</span>
          <span className="text-[10px] font-bold leading-none">SOS</span>
        </motion.button>
      </div>
    </>
  )
}
