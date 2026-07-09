'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '@/lib/constants'

// ── SOS BUTTON (permanent, bottom center mobile) ─────────────────
export function SOSButton() {
  const [pressed, setPressed] = useState(false)

  const handleSOS = () => {
    setPressed(true)
    const msg = encodeURIComponent('🚨 URGENCE SENEDIAG — J\'ai besoin d\'aide immédiatement. Mon adresse : ')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    setTimeout(() => setPressed(false), 3000)
  }

  return (
    <motion.button
      onClick={handleSOS}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileTap={{ scale: 0.92 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden
        flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-white text-base
        shadow-2xl transition-all duration-200
        ${pressed ? 'bg-green-500' : 'bg-red-500 animate-sos'}`}
    >
      {pressed ? '✅ Message envoyé !' : '🆘 URGENCE — Appuyez ici'}
    </motion.button>
  )
}

// ── FLOATING CONTACTS (desktop right side) ───────────────────────
export function FloatingContacts() {
  const [hovered, setHovered] = useState(null)

  const btns = [
    {
      id: 'wa',
      icon: '💬',
      label: 'WhatsApp',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => {
        const msg = encodeURIComponent('Bonjour SENEDIAG 👋 Je voudrais prendre rendez-vous.')
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
      },
    },
    {
      id: 'phone',
      icon: '📞',
      label: 'Appeler',
      color: 'bg-primary hover:bg-primary-dark',
      action: () => window.open(`tel:${PHONE_NUMBER}`),
    },
    {
      id: 'sos',
      icon: '🆘',
      label: 'Urgence',
      color: 'bg-red-500 hover:bg-red-600 animate-sos',
      action: () => {
        const msg = encodeURIComponent('🚨 URGENCE SENEDIAG — Besoin d\'aide immédiatement. Adresse : ')
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
      },
    },
  ]

  return (
    <div className="fixed right-5 bottom-24 z-50 hidden md:flex flex-col gap-3">
      {btns.map((b) => (
        <div key={b.id} className="relative flex items-center justify-end">
          <AnimatePresence>
            {hovered === b.id && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-14 bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
              >
                {b.label}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-2 h-2 bg-navy rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            onClick={b.action}
            onMouseEnter={() => setHovered(b.id)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            className={`w-12 h-12 rounded-full ${b.color} text-white text-xl flex items-center justify-center shadow-lg transition-all`}
          >
            {b.icon}
          </motion.button>
        </div>
      ))}
    </div>
  )
}

// ── TRACKING STATUS (real-time visual feedback) ───────────────────
export function TrackingStatus({ service, onClose }) {
  const STATUSES = [
    { icon: '✅', label: 'Demande reçue',        color: 'text-green-500' },
    { icon: '👨‍⚕️', label: 'Médecin assigné',     color: 'text-blue-500' },
    { icon: '🚗', label: 'Équipe en route',       color: 'text-orange-500' },
    { icon: '🏠', label: 'Arrivée chez vous',     color: 'text-teal' },
  ]
  const [current] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 bg-white rounded-3xl shadow-hover border border-blue-100 p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="font-display font-bold text-navy text-sm">Suivi de votre demande</div>
        <button onClick={onClose} className="text-navy/30 hover:text-navy text-lg leading-none">×</button>
      </div>
      <div className="text-xs text-navy/50 mb-4 bg-sky-soft rounded-xl px-3 py-2 font-medium">
        🏥 {service || 'Demande SENEDIAG'}
      </div>
      <div className="space-y-3">
        {STATUSES.map((s, i) => (
          <div key={i} className={`flex items-center gap-3 ${i <= current ? 'opacity-100' : 'opacity-30'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base ${i <= current ? 'bg-sky-soft' : 'bg-gray-100'}`}>
              {s.icon}
            </div>
            <div className="flex-1">
              <div className={`text-sm font-semibold ${i <= current ? 'text-navy' : 'text-navy/40'}`}>{s.label}</div>
              {i === current && (
                <div className="flex gap-1 mt-1">
                  {[0,1,2].map(d => (
                    <motion.div
                      key={d}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </div>
            {i < current && <div className="text-green-400 font-bold text-sm">✓</div>}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-blue-50 flex gap-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-green-500 text-white font-bold text-xs text-center hover:bg-green-600 transition-all"
        >
          💬 Contacter via WhatsApp
        </a>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="py-2.5 px-4 rounded-xl border border-blue-200 text-primary font-bold text-xs hover:bg-sky-soft transition-all"
        >
          📞
        </a>
      </div>
    </motion.div>
  )
}
