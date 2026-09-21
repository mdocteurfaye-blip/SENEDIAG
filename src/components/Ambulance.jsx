'use client'
import { motion } from 'framer-motion'
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '../lib/constants'
import AppIcon from './AppIcon'

const FEATURES = [
  { icon: 'zap', title: 'Intervention rapide', desc: 'Équipe déployée immédiatement' },
  { icon: 'hospital', title: 'Soins embarqués', desc: 'Oxygène, défibrillateur, monitoring' },
  { icon: 'monitor', title: 'Médecin à distance', desc: 'Supervision live pendant transport' },
  { icon: 'refresh', title: 'Suivi continu', desc: 'Accompagnement post-hospitalisation' },
  { icon: 'home', title: 'Retour domicile', desc: 'Suivi infirmier après sortie hôpital' },
  { icon: 'clipboard', title: 'Dossier transmis', desc: 'Rapport accessible en ligne' },
]

const sosWaLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('URGENCE SENEDIAG - J\'ai besoin d\'une ambulance immédiatement. Mon adresse : ')}`

export default function Ambulance() {
  return (
    <section id="ambulance" className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="blob w-80 h-80 bg-red-100 top-0 right-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-1.5 rounded-full text-xs font-bold text-red-500 mb-5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              AMBULANCE & URGENCES
            </div>
            <h2 className="font-display font-bold text-4xl text-navy mb-4 leading-tight">
              Votre patient ne peut<br />
              pas se déplacer ?<br />
              <span className="text-red-500">On arrive.</span>
            </h2>
            <p className="text-navy/60 text-base leading-relaxed mb-8">
              Notre ambulance ultra-équipée intervient rapidement. Soins embarqués, médecin à distance en temps réel, suivi complet de bout en bout.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-red-50 border border-red-100 rounded-2xl p-4 hover:border-red-200 transition-colors"
                >
                  <AppIcon name={f.icon} size={24} className="text-red-500 mb-2" />
                  <div className="font-bold text-navy text-sm mb-1">{f.title}</div>
                  <div className="text-navy/50 text-xs">{f.desc}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-bold text-center text-lg shadow-lg hover:bg-red-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <AppIcon name="phone" size={20} /> Appeler l'ambulance
              </a>
              <a
                href={sosWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 rounded-2xl bg-green-500 text-white font-bold text-center text-lg hover:bg-green-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <AppIcon name="message" size={20} /> WhatsApp urgent
              </a>
              <a
                href="?service=Ambulance#contact"
                className="col-span-2 py-3 rounded-2xl border-2 border-red-200 text-red-600 font-bold text-center hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                <AppIcon name="mail" size={19} /> Envoyer un mail
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="bg-gradient-to-b from-sky-soft to-white rounded-3xl p-10 shadow-card relative overflow-hidden" style={{ width: 340, height: 320 }}>
                <motion.div
                  animate={{ x: ['-60%', '120%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  className="absolute text-red-500"
                  style={{ top: '48%', left: '10%' }}
                >
                  <AppIcon name="ambulance" size={56} strokeWidth={1.8} />
                </motion.div>

                <div className="absolute bottom-16 left-0 right-0 border-b-2 border-dashed border-gray-200" />

                <div className="absolute right-5 top-[58%] -translate-y-1/2 bg-white rounded-2xl p-4 shadow-card text-center">
                  <AppIcon name="home" size={30} className="mx-auto mb-1 text-primary" />
                  <div className="text-xs font-bold text-navy">Destination</div>
                </div>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <div className="bg-white rounded-full px-4 py-2 shadow-card flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-navy">En route vers vous</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <div className="font-display font-bold text-navy text-lg">Ambulance équipée</div>
                  <div className="text-primary text-sm font-semibold">SENEDIAG</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
