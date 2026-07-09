'use client'
import { motion } from 'framer-motion'
import { MALLETTE_DEVICES, WHATSAPP_NUMBER, PHONE_NUMBER } from '@/lib/constants'
import AppIcon from './AppIcon'

const floatingDevices = [
  { icon: 'radio', label: 'Échographe' },
  { icon: 'heart', label: 'ECG' },
  { icon: 'wind', label: 'Spiromètre' },
  { icon: 'stethoscope', label: 'Stéthoscope' },
]

const flow = [
  { icon: 'calendar', label: 'RDV' },
  { icon: 'truck', label: 'Déplacement' },
  { icon: 'wifi', label: 'Connexion' },
  { icon: 'monitor', label: 'Médecin live' },
  { icon: 'clipboard', label: 'Ordonnance' },
]

export default function Mallette() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je voudrais une visite avec la mallette médicale connectée.')}`

  return (
    <section id="mallette" className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 mx-auto">
              <div className="absolute inset-0 border-2 border-dashed border-sky-strong rounded-full animate-orbit" style={{ animationDuration: '20s' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white shadow-card rounded-full p-2 text-primary"><AppIcon name="stethoscope" size={22} /></div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-card rounded-full p-2 text-primary"><AppIcon name="microscope" size={22} /></div>
              </div>
              <div className="absolute inset-10 border border-dashed border-teal/40 rounded-full animate-orbit" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white shadow-card rounded-full p-1.5 text-primary"><AppIcon name="heart" size={18} /></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white shadow-card rounded-full p-1.5 text-primary"><AppIcon name="radio" size={18} /></div>
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gradient-to-br from-sky-soft to-sky-mid rounded-3xl p-8 shadow-hover text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-2xl bg-white text-primary flex items-center justify-center shadow-card">
                    <AppIcon name="briefcaseMedical" size={34} strokeWidth={1.8} />
                  </div>
                  <div className="font-display font-bold text-navy text-sm">Mallette</div>
                  <div className="text-primary text-xs font-semibold">SENEDIAG</div>
                </div>
              </motion.div>
            </div>

            {floatingDevices.map((d, i) => {
              const positions = ['top-0 -right-4', 'bottom-8 -right-8', 'top-8 -left-8', 'bottom-0 -left-4']
              return (
                <motion.div
                  key={d.label}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
                  className={`absolute ${positions[i]} bg-white shadow-card rounded-xl px-3 py-1.5 text-xs font-bold text-navy whitespace-nowrap flex items-center gap-2`}
                >
                  <AppIcon name={d.icon} size={14} className="text-primary" /> {d.label}
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-sky-soft border border-sky-strong px-4 py-1.5 rounded-full text-xs font-bold text-primary mb-5">
              <AppIcon name="briefcaseMedical" size={14} /> MALLETTE ULTRA-CONNECTÉE
            </div>
            <h2 className="font-display font-bold text-4xl text-navy mb-4 leading-tight">
              Tout l'hôpital,<br />
              <span className="text-gradient">dans une valise</span>
            </h2>
            <p className="text-navy/60 text-base leading-relaxed mb-6">
              Notre infirmier se déplace chez vous. Le médecin consulte à distance en temps réel. Diagnostic complet sans sortir de chez vous.
            </p>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {MALLETTE_DEVICES.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-sky-soft rounded-xl p-2.5 text-center hover:bg-sky-mid transition-colors cursor-default"
                >
                  <AppIcon name={d.icon} size={20} className="mx-auto mb-1 text-primary" />
                  <div className="text-[10px] font-semibold text-navy leading-tight">{d.name}</div>
                </motion.div>
              ))}
            </div>

            <div className="bg-sky-soft rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 flex-wrap">
                {flow.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className="bg-white rounded-lg px-3 py-1.5 text-sm font-semibold text-navy shadow-sm flex items-center gap-2">
                      <AppIcon name={item.icon} size={14} className="text-primary" /> {item.label}
                    </div>
                    {i < flow.length - 1 && <span className="text-sky-strong font-bold">›</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-teal text-white font-bold text-center shadow-hover hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <AppIcon name="message" size={17} /> Demander un déplacement
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="py-3.5 px-5 rounded-2xl border-2 border-sky-strong text-primary font-bold hover:bg-sky-soft transition-all"
                aria-label="Appeler SENEDIAG"
              >
                <AppIcon name="phone" size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
