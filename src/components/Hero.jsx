'use client'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { WHATSAPP_NUMBER, PHONE_NUMBER, WHATSAPP_APPOINTMENT_URL } from '@/lib/constants'
import AppIcon from './AppIcon'

const FLOATING_ICONS = [
  { icon: 'heart', x: '78%', y: '18%', delay: 0 },
  { icon: 'stethoscope', x: '82%', y: '42%', delay: 0.8 },
  { icon: 'pill', x: '70%', y: '65%', delay: 1.4 },
  { icon: 'microscope', x: '88%', y: '72%', delay: 0.4 },
  { icon: 'briefcaseMedical', x: '65%', y: '30%', delay: 1.0 },
  { icon: 'ambulance', x: '75%', y: '80%', delay: 0.6 },
]

const waLink = WHATSAPP_APPOINTMENT_URL
const emergencyLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('URGENCE SENEDIAG - Je souhaite une consultation médicale urgente. Mon adresse et mes symptômes : ')}`
const followUpLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je souhaite une consultation de suivi. Merci de me recontacter pour prendre rendez-vous.')}`

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-soft via-white to-sky-mid pt-16">
      <div className="blob w-96 h-96 bg-primary/30 top-0 left-0" />
      <div className="blob w-80 h-80 bg-teal/25 bottom-0 right-0" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#167B93 1px,transparent 1px),linear-gradient(90deg,#167B93 1px,transparent 1px)', backgroundSize: '48px 48px' }}
      />

      <div className="hidden lg:block">
        {FLOATING_ICONS.map((f, i) => (
          <motion.div
            key={i}
            className="absolute select-none"
            style={{ left: f.x, top: f.y }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: f.delay, ease: 'easeInOut' }}
          >
            <div className="bg-white/85 backdrop-blur rounded-2xl p-3 shadow-card text-primary">
              <AppIcon name={f.icon} size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-12 left-0 right-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1200 80" className="w-full" preserveAspectRatio="none">
          <polyline
            points="0,40 150,40 180,40 200,8 215,72 230,40 260,40 300,40 320,20 340,60 360,40 1200,40"
            fill="none" stroke="#167B93" strokeWidth="2"
            strokeDasharray="800" strokeDashoffset="800"
            className="ecg-path"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white border border-sky-strong px-4 py-2 rounded-full text-sm font-semibold text-primary mb-6 shadow-sm"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Disponible 24h/24 — 7j/7
          </motion.div>

          <h1 className="font-display font-bold text-5xl lg:text-6xl leading-[1.05] text-navy mb-6">
            La médecine <span className="text-gradient">qui vient</span>
            <br />
            <span className="text-gradient">à vous</span>
            <span className="block mt-4 text-2xl lg:text-3xl leading-tight font-semibold text-primary">
              Un accès aux soins de qualité, sans délai
            </span>
          </h1>

          <p className="text-lg text-navy/60 leading-relaxed mb-8 max-w-md">
            Consultation, labo, radio, ambulance — SENEDIAG se déplace partout au Sénégal avec son équipement médical de pointe.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-sm mb-8">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-primary to-teal text-white font-bold text-lg shadow-hover hover:-translate-y-1 transition-all duration-200"
            >
              <AppIcon name="message" size={20} /> <span>Prendre rendez-vous</span>
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white border-2 border-sky-strong text-primary font-bold text-base shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all"
            >
              <AppIcon name="phone" size={18} /> Appeler
            </a>
            <a
              href="#services"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-sky-soft border border-sky-strong text-navy font-semibold text-base hover:bg-sky-mid transition-all"
            >
              <AppIcon name="hospital" size={18} /> Services
            </a>
            <a
              href={emergencyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold text-sm hover:bg-red-100 transition-all"
            >
              <AppIcon name="siren" size={18} /> Médecin d'urgence
            </a>
            <a
              href={followUpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-teal-light border border-teal/30 text-primary font-bold text-sm hover:bg-sky-mid transition-all"
            >
              <AppIcon name="refresh" size={18} /> Consultation de suivi
            </a>
          </div>

          <div className="flex gap-6 flex-wrap">
            {[
              { n: '24/7', l: 'Disponible' },
              { n: '45+', l: 'Spécialistes' },
              { n: '<2h', l: 'Résultats radio' },
              { n: '12', l: 'Appareils mallette' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-display font-bold text-2xl text-primary">{s.n}</div>
                <div className="text-xs text-navy/50 font-medium">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center justify-center"
          style={{ width: '38%', aspectRatio: '1' }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 border-2 border-dashed border-sky-strong rounded-full animate-orbit" style={{ animationDuration: '16s' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-card text-primary">
                <AppIcon name="stethoscope" size={20} />
              </div>
            </div>
            <div className="absolute inset-8 border border-dashed border-teal/40 rounded-full animate-orbit" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-card text-primary">
                <AppIcon name="microscope" size={18} />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-white rounded-3xl shadow-hover p-6 flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-sky-soft text-primary flex items-center justify-center">
                  <AppIcon name="briefcaseMedical" size={36} strokeWidth={1.8} />
                </div>
                <span className="font-display font-bold text-navy text-sm">Mallette médicale</span>
                <span className="text-[11px] text-primary font-semibold bg-sky-soft px-3 py-1 rounded-full">12 appareils intégrés</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Hero)
