'use client'
import { memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { WHATSAPP_NUMBER, PHONE_NUMBER, WHATSAPP_APPOINTMENT_URL } from '@/lib/constants'
import AppIcon from './AppIcon'
import heroDoctor from '@/assets/images/african-american-woman-with-doctor-job-holding-bottle-medicine.jpg'

const STATS = [
  { n: '24/7', l: 'Disponible' },
  { n: '45+', l: 'Spécialistes' },
  { n: '<2h', l: 'Résultats radio' },
  { n: '12', l: 'Appareils mallette' },
]

const waLink = WHATSAPP_APPOINTMENT_URL

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-soft via-white to-sky-mid pt-16">
      <div className="blob w-96 h-96 bg-primary/30 top-0 left-0" />
      <div className="blob w-80 h-80 bg-teal/25 bottom-0 right-0" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(#167B93 1px,transparent 1px),linear-gradient(90deg,#167B93 1px,transparent 1px)', backgroundSize: '48px 48px' }}
      />

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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 w-full grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
        {/* ── Colonne texte ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl order-2 lg:order-1"
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

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-navy mb-6">
            La médecine <span className="text-gradient">qui vient</span>
            <br />
            <span className="text-gradient">à vous</span>
          </h1>

          <p className="text-base sm:text-lg text-navy/60 leading-relaxed mb-8 max-w-md">
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
          </div>

          <div className="flex gap-6 flex-wrap">
            {STATS.map((s, i) => (
              <motion.div
                key={s.l}
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

        {/* ── Colonne visuelle ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative order-1 lg:order-2 mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Anneau décoratif derrière la photo */}
          <div className="hidden lg:block absolute -inset-6 border-2 border-dashed border-sky-strong/60 rounded-[3rem] animate-orbit" style={{ animationDuration: '30s' }} />

          <div className="relative rounded-[2.5rem] overflow-hidden shadow-hover ring-8 ring-white/70">
            <Image
              src={heroDoctor}
              alt="Médecin SENEDIAG en consultation dans son cabinet"
              placeholder="blur"
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[4/3.4]"
            />
            {/* Dégradé bas pour ancrer les badges */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/55 to-transparent" />
          </div>

          {/* Badge mallette */}
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-5 -left-3 sm:left-4 lg:-left-8 bg-white rounded-2xl shadow-hover p-3.5 flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-sky-soft text-primary flex items-center justify-center shrink-0">
              <AppIcon name="briefcaseMedical" size={24} strokeWidth={1.8} />
            </div>
            <div>
              <div className="font-display font-bold text-navy text-sm leading-tight">Mallette médicale</div>
              <div className="text-[11px] text-primary font-semibold">12 appareils intégrés</div>
            </div>
          </motion.div>

          {/* Badge téléradiologie */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute -top-4 -right-2 sm:right-4 lg:-right-6 bg-white rounded-2xl shadow-hover px-3.5 py-2.5 flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-soft text-primary flex items-center justify-center shrink-0">
              <AppIcon name="scan" size={19} strokeWidth={1.8} />
            </div>
            <div>
              <div className="font-display font-bold text-navy text-xs leading-tight">Résultats radio</div>
              <div className="text-[11px] text-primary font-semibold">en moins de 2h</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Hero)
