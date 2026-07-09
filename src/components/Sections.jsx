'use client'
import { motion } from 'framer-motion'
import { ANALYSES, KINE_PROGRAMS, WHATSAPP_NUMBER } from '@/lib/constants'
import AppIcon from './AppIcon'

const LAB_STEPS = [
  { icon: 'send', title: 'Envoi de la prescription', desc: 'Demande reçue en ligne' },
  { icon: 'syringe', title: 'Prélèvement', desc: 'À domicile ou en clinique' },
  { icon: 'flask', title: 'Analyse', desc: 'Matériel de dernière génération' },
  { icon: 'file', title: 'Résultats', desc: 'Disponibles en ligne et par courriel' },
]

const KINE_BENEFITS = [
  { icon: 'clipboard', label: 'Bilan personnalisé' },
  { icon: 'activity', label: 'Suivi de progression' },
  { icon: 'calendar', label: 'Séances planifiées' },
]

export function Laboratoire() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG 👋 Je voudrais faire des analyses au laboratoire.')}`

  return (
    <section id="laboratoire" className="py-20 px-6 bg-sky-soft relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-sky-strong px-4 py-1.5 rounded-full text-xs font-bold text-teal mb-4 shadow-sm">
            <AppIcon name="microscope" size={15} /> LABORATOIRE
          </div>
          <h2 className="font-display font-bold text-4xl text-navy mb-3">
            Toutes les <span className="text-gradient">analyses</span>
          </h2>
          <p className="text-navy/50 text-base max-w-sm mx-auto">
            Dernière génération — résultats en ligne — prélèvement à domicile
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {ANALYSES.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-3d group bg-white rounded-2xl p-4 text-center shadow-card border border-white hover:border-sky-strong hover:shadow-hover"
            >
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-sky-soft text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <AppIcon name={a.icon} size={21} />
              </div>
              <div className="text-xs font-bold text-navy">{a.name}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-sky-strong/70"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="w-14 h-14 mb-4 rounded-2xl bg-teal-light text-primary flex items-center justify-center shadow-sm">
                <AppIcon name="hospital" size={28} />
              </div>
              <h3 className="font-display font-bold text-2xl text-navy mb-3">Pour cliniques & hôpitaux</h3>
              <p className="text-navy/60 text-sm leading-relaxed mb-4">
                Sous-traitez vos analyses. Résultats transmis directement à votre équipe. Abonnements flexibles.
              </p>
              <div className="flex gap-3">
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal to-primary text-white font-bold text-sm hover:shadow-hover hover:-translate-y-0.5 transition-all">
                  <AppIcon name="message" size={17} /> Demander un partenariat
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {LAB_STEPS.map((step, i) => (
                <div key={i} className="bg-sky-soft rounded-2xl p-4 border border-white text-left">
                  <div className="w-9 h-9 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm mb-3">
                    <AppIcon name={step.icon} size={17} />
                  </div>
                  <div className="font-bold text-navy text-xs mb-1">{step.title}</div>
                  <div className="text-navy/50 text-[11px] leading-snug">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Teleradiologie() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG 👋 Je voudrais un service de téléradiologie.')}`

  return (
    <section id="teleradiologie" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full text-xs font-bold text-purple-600 mb-5">
              🩻 TÉLÉRADIOLOGIE INTERNATIONALE
            </div>
            <h2 className="font-display font-bold text-4xl text-navy mb-4 leading-tight">
              Vos radios interprétées<br />
              <span className="text-gradient">en moins de 2h</span>
            </h2>
            <p className="text-navy/60 mb-8 text-base leading-relaxed">
              Envoyez vos images médicales — nos radiologues certifiés les interprètent et vous renvoient un rapport signé.
            </p>

            {/* Flow */}
            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: '📤', step: '1', text: 'Vous envoyez la radio ou le scanner' },
                { icon: '👨‍⚕️', step: '2', text: 'Notre radiologue certifié analyse' },
                { icon: '⏱️', step: '3', text: 'Résultat en moins de 2 heures' },
                { icon: '📄', step: '4', text: 'Rapport PDF signé envoyé par email' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-purple-50 rounded-2xl p-4"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">{f.icon}</div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase">Étape {f.step}</span>
                    <div className="font-semibold text-navy text-sm">{f.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Abonnements */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[['🎫','Acte unique'],['📅','Semaine'],['📆','Mois'],['🗓️','Année']].map(([ic, l], i) => (
                <div key={i} className={`rounded-xl p-3 text-center border ${i === 2 ? 'border-primary bg-sky-soft' : 'border-blue-100 bg-white'}`}>
                  <div className="text-xl mb-1">{ic}</div>
                  <div className="text-[10px] font-bold text-navy">{l}</div>
                  {i === 2 && <div className="text-[9px] text-primary font-bold mt-1">Populaire</div>}
                </div>
              ))}
            </div>

            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-primary text-white font-bold shadow-hover hover:-translate-y-0.5 transition-all">
              💬 Demander un devis
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative w-72">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}>
                <div className="bg-gradient-to-br from-sky-soft to-sky-mid rounded-3xl p-6 shadow-hover">
                  <div className="text-7xl text-center mb-4">🩻</div>
                  <div className="bg-white rounded-2xl p-4 text-center shadow-card">
                    <div className="text-xs text-navy/50 mb-1">Résultat</div>
                    <div className="font-display font-bold text-navy">Rapport radiologique</div>
                    <div className="text-primary font-bold text-sm mt-1">✓ Interprété & signé</div>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-600 font-semibold">Envoyé en 2h</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function Kinesitherapie() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG 👋 Je voudrais réserver une séance de kinésithérapie.')}`

  return (
    <section id="kinesitherapie" className="py-20 px-6 bg-sky-soft relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-orange-200 px-4 py-1.5 rounded-full text-xs font-bold text-orange-500 mb-4 shadow-sm">
            <AppIcon name="dumbbell" size={15} /> KINÉSITHÉRAPIE ET ACTIVITÉ PHYSIQUE
          </div>
          <h2 className="font-display font-bold text-4xl text-navy mb-3">
            Rééducation <span className="text-gradient">pour tous</span>
          </h2>
          <p className="text-navy/50 text-base max-w-sm mx-auto">Salle équipée — programmes personnalisés — suivi médical</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {KINE_PROGRAMS.map((k, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-3d group bg-white rounded-2xl p-6 shadow-card border border-white hover:border-orange-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <AppIcon name={k.icon} size={22} />
                </div>
                <div>
                  <div className="font-display font-bold text-navy mb-1">{k.title}</div>
                  <div className="text-navy/50 text-sm leading-relaxed">{k.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 bg-white rounded-3xl p-5 sm:p-6 shadow-card border border-orange-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {KINE_BENEFITS.map(item => (
              <div key={item.label} className="flex items-center gap-3 bg-orange-50 rounded-2xl p-3">
                <div className="w-9 h-9 rounded-xl bg-white text-orange-500 flex items-center justify-center shadow-sm">
                  <AppIcon name={item.icon} size={17} />
                </div>
                <span className="text-sm font-bold text-navy">{item.label}</span>
              </div>
            ))}
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-primary text-white font-bold text-base shadow-hover hover:-translate-y-1 transition-all whitespace-nowrap">
            <AppIcon name="message" size={19} /> Réserver une séance
          </a>
        </div>
      </div>
    </section>
  )
}
