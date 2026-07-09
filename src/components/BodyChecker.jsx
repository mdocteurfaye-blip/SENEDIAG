'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WHATSAPP_NUMBER } from '@/lib/constants'

const ZONES = [
  { id: 'head',    label: 'Tête',       icon: '🤕', x: '44%',  y: '6%',  service: 'Neurologie / ORL',        wa: 'J\'ai des douleurs à la tête / ORL.' },
  { id: 'eye',     label: 'Yeux',       icon: '👁️',  x: '62%',  y: '10%', service: 'Ophtalmologie',            wa: 'J\'ai un problème aux yeux.' },
  { id: 'chest',   label: 'Poitrine',   icon: '❤️',  x: '44%',  y: '30%', service: 'Cardiologie / Pneumologie', wa: 'J\'ai des douleurs à la poitrine / cœur / respiration.' },
  { id: 'belly',   label: 'Ventre',     icon: '🫃', x: '44%',  y: '46%', service: 'Gastro-entérologie',       wa: 'J\'ai des douleurs abdominales.' },
  { id: 'arm',     label: 'Bras',       icon: '💪',  x: '20%',  y: '34%', service: 'Orthopédie / Kiné',        wa: 'J\'ai un problème au bras.' },
  { id: 'leg',     label: 'Jambes',     icon: '🦵',  x: '36%',  y: '68%', service: 'Orthopédie / Kiné',        wa: 'J\'ai des douleurs aux jambes.' },
  { id: 'back',    label: 'Dos',        icon: '🔙',  x: '68%',  y: '36%', service: 'Orthopédie / Kiné',        wa: 'J\'ai des douleurs dans le dos.' },
  { id: 'skin',    label: 'Peau',       icon: '🩹',  x: '20%',  y: '54%', service: 'Dermatologie',             wa: 'J\'ai un problème de peau.' },
]

export default function BodyChecker() {
  const [selected, setSelected] = useState(null)

  const zone = ZONES.find(z => z.id === selected)
  const waLink = zone
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour SENEDIAG 👋 ${zone.wa} Je voudrais une consultation en ${zone.service}.`)}`
    : '#'

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-sky-soft border border-blue-100 px-4 py-1.5 rounded-full text-xs font-bold text-primary mb-4 shadow-sm">
            🩺 OÙ AVEZ-VOUS MAL ?
          </div>
          <h2 className="font-display font-bold text-4xl text-navy mb-3">
            Appuyez sur <span className="text-gradient">la zone</span> qui vous fait mal
          </h2>
          <p className="text-navy/50 text-base">Nous vous orientons vers le bon médecin instantanément</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Body figure */}
          <div className="relative mx-auto" style={{ width: 280, height: 440 }}>
            {/* Human silhouette */}
            <svg viewBox="0 0 200 320" className="absolute inset-0 w-full h-full opacity-10">
              {/* Head */}
              <ellipse cx="100" cy="30" rx="22" ry="26" fill="#167B93"/>
              {/* Neck */}
              <rect x="91" y="54" width="18" height="14" rx="4" fill="#167B93"/>
              {/* Body */}
              <rect x="68" y="68" width="64" height="80" rx="12" fill="#167B93"/>
              {/* Left arm */}
              <rect x="36" y="70" width="30" height="18" rx="9" fill="#167B93" transform="rotate(15 36 70)"/>
              <rect x="22" y="100" width="28" height="16" rx="8" fill="#167B93" transform="rotate(10 22 100)"/>
              {/* Right arm */}
              <rect x="134" y="70" width="30" height="18" rx="9" fill="#167B93" transform="rotate(-15 164 70)"/>
              <rect x="150" y="100" width="28" height="16" rx="8" fill="#167B93" transform="rotate(-10 178 100)"/>
              {/* Left leg */}
              <rect x="72" y="148" width="24" height="90" rx="10" fill="#167B93"/>
              {/* Right leg */}
              <rect x="104" y="148" width="24" height="90" rx="10" fill="#167B93"/>
              {/* Feet */}
              <ellipse cx="84" cy="242" rx="16" ry="8" fill="#167B93"/>
              <ellipse cx="116" cy="242" rx="16" ry="8" fill="#167B93"/>
            </svg>

            {/* Zone buttons */}
            {ZONES.map(z => (
              <motion.button
                key={z.id}
                onClick={() => setSelected(z.id === selected ? null : z.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-card transition-all ${
                  selected === z.id
                    ? 'bg-primary ring-4 ring-blue-200 scale-125'
                    : 'bg-white hover:bg-sky-soft'
                }`}
                style={{ left: z.x, top: z.y }}
                title={z.label}
              >
                {z.icon}
              </motion.button>
            ))}

            {/* Legend */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
              <span className="text-xs text-navy/40 font-medium">👆 Appuyez sur la zone douloureuse</span>
            </div>
          </div>

          {/* Result panel */}
          <div>
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-sky-soft rounded-3xl p-8 text-center border-2 border-dashed border-blue-200"
                >
                  <div className="text-5xl mb-4">👆</div>
                  <div className="font-display font-bold text-navy text-xl mb-2">Appuyez sur la zone</div>
                  <div className="text-navy/50 text-sm">Nous vous orientons vers le bon spécialiste</div>
                  <div className="mt-6 grid grid-cols-4 gap-2">
                    {ZONES.map(z => (
                      <button
                        key={z.id}
                        onClick={() => setSelected(z.id)}
                        className="bg-white rounded-xl p-2.5 text-center hover:bg-sky-mid transition-colors shadow-sm"
                      >
                        <div className="text-2xl mb-1">{z.icon}</div>
                        <div className="text-[10px] font-bold text-navy">{z.label}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-3xl p-8 shadow-hover border-2 border-primary"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-sky-soft rounded-2xl flex items-center justify-center text-4xl">
                      {zone.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-primary uppercase mb-1">Zone sélectionnée</div>
                      <div className="font-display font-bold text-navy text-2xl">{zone.label}</div>
                    </div>
                  </div>

                  <div className="bg-sky-soft rounded-2xl p-4 mb-6">
                    <div className="text-xs font-bold text-navy/50 uppercase mb-1">Spécialité recommandée</div>
                    <div className="font-bold text-navy text-lg">🩺 {zone.service}</div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-teal text-white font-bold text-center text-base shadow-hover hover:-translate-y-0.5 transition-all"
                    >
                      💬 Consulter pour {zone.label}
                    </a>
                    <button
                      onClick={() => setSelected(null)}
                      className="w-full py-3 rounded-2xl bg-sky-soft text-navy font-semibold text-sm hover:bg-sky-mid transition-colors"
                    >
                      ← Changer de zone
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
