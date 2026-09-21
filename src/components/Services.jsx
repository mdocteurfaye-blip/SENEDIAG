'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ANALYSES, KINE_PROGRAMS, SERVICES, WHATSAPP_NUMBER } from '@/lib/constants'
import AppIcon from './AppIcon'
import radiologueDoctor from '@/assets/images/doctors-meeting-cabinet-discuss-x-ray-scans-results-treatment-plan.jpg'

const LAB_STEPS = [
  { icon: 'send', title: 'Envoi de la prescription', desc: 'Commande en ligne' },
  { icon: 'syringe', title: 'Prelevement', desc: 'A domicile ou en clinique' },
  { icon: 'flask', title: 'Analyse', desc: 'Materiel derniere generation' },
  { icon: 'file', title: 'Resultats', desc: 'En ligne et par email' },
]

const TELERADIO_STEPS = [
  { icon: 'send', step: '1', text: 'Vous envoyez la radio ou le scanner' },
  { icon: 'userCheck', step: '2', text: 'Notre radiologue certifie analyse' },
  { icon: 'clock', step: '3', text: 'Resultat en moins de 2 heures' },
  { icon: 'file', step: '4', text: 'Rapport PDF signe envoye par email' },
]

const TELERADIO_PLANS = [
  { icon: 'file', label: 'Acte unique' },
  { icon: 'calendar', label: 'Semaine' },
  { icon: 'calendar', label: 'Mois', popular: true },
  { icon: 'calendar', label: 'Annee' },
]

const KINE_BENEFITS = [
  { icon: 'clipboard', label: 'Bilan personnalise' },
  { icon: 'activity', label: 'Suivi de progression' },
  { icon: 'calendar', label: 'Seances planifiees' },
]

export default function Services() {
  const audioRef = useRef(null)
  const abortControllerRef = useRef(null)
  const [playingService, setPlayingService] = useState(null)

  // Nettoyer les ressources audio au démontage du composant
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const playServiceAudio = serviceId => {
    // Arrêter le audio précédent
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    // Annuler les event listeners précédents
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const audio = new Audio(`/audios/${serviceId}.mp3`)
    const abortController = new AbortController()
    
    audioRef.current = audio
    abortControllerRef.current = abortController
    setPlayingService(serviceId)

    // Event listener avec cleanup automatique
    const handleEnded = () => {
      if (audioRef.current === audio) {
        setPlayingService(null)
      }
    }

    const handleError = () => {
      if (audioRef.current === audio) {
        setPlayingService(null)
      }
    }

    audio.addEventListener('ended', handleEnded, { signal: abortController.signal })
    audio.addEventListener('error', handleError, { signal: abortController.signal })

    audio.play().catch(error => {
      console.warn(`Erreur lecture audio ${serviceId}:`, error)
      if (audioRef.current === audio) {
        setPlayingService(null)
      }
    })
  }

  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-sky-soft border border-sky-strong px-4 py-1.5 rounded-full text-xs font-bold text-primary mb-4 shadow-sm">
            <AppIcon name="hospital" size={15} /> NOS SERVICES
          </div>
          <h2 className="font-display font-bold text-4xl text-navy mb-3">
            Un parcours de soins <span className="text-gradient">complet</span>
          </h2>
          <p className="text-navy/50 text-base max-w-xl mx-auto">
            Consultation, urgence, diagnostic et suivi: SENEDIAG coordonne vos soins a domicile et a distance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.a
              key={service.id}
              href={service.id === 'telemedecine' ? '#contact' : service.id === 'imagerie-medicale' ? '#teleradiologie' : `#${service.id}`}
              onClick={() => playServiceAudio(service.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`card-3d group rounded-2xl border ${service.border} ${service.bg} p-5 shadow-card hover:shadow-hover transition-all`}
              aria-label={`Appuyez pour voir plus d'informations sur ${service.label}`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <AppIcon name={service.icon} size={28} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-navy mb-1">{service.label}</h3>
                  <p className="text-sm text-navy/55 leading-relaxed">{service.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {service.steps.map(step => (
                  <div key={step.label} className="flex items-center gap-2 bg-white/80 rounded-xl p-2.5 min-h-12">
                    <span className="w-8 h-8 rounded-lg bg-white text-primary flex items-center justify-center shadow-sm flex-shrink-0">
                      <AppIcon name={step.icon} size={15} />
                    </span>
                    <span className="text-[11px] font-bold text-navy leading-tight">{step.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-sm font-bold text-primary">
                <span>Appuyez pour voir plus d'informations</span>
                <span className="flex items-center gap-2">
                  {playingService === service.id && (
                    <span className="flex items-end gap-0.5 h-4" aria-hidden="true">
                      <span className="w-1 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="w-1 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '120ms' }} />
                      <span className="w-1 h-4 rounded-full bg-primary animate-pulse" style={{ animationDelay: '240ms' }} />
                    </span>
                  )}
                  <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Laboratoire() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je voudrais faire des analyses au laboratoire.')}`

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
            Derniere generation, resultats en ligne et prelevement a domicile.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {ANALYSES.map((analysis, i) => (
            <motion.div
              key={analysis.name}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card-3d group bg-white rounded-2xl p-4 text-center shadow-card border border-white hover:border-sky-strong hover:shadow-hover"
            >
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-sky-soft text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <AppIcon name={analysis.icon} size={21} />
              </div>
              <div className="text-xs font-bold text-navy">{analysis.name}</div>
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
              <h3 className="font-display font-bold text-2xl text-navy mb-3">Pour cliniques et hopitaux</h3>
              <p className="text-navy/60 text-sm leading-relaxed mb-4">
                Sous-traitez vos analyses. Resultats transmis directement a votre equipe. Abonnements flexibles.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal to-primary text-white font-bold text-sm hover:shadow-hover hover:-translate-y-0.5 transition-all"
              >
                <AppIcon name="message" size={17} /> Demander un partenariat
              </a>
              <a
                href="?service=Laboratoire#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-sky-strong text-primary font-bold text-sm hover:bg-sky-soft transition-all ml-2"
              >
                <AppIcon name="mail" size={17} /> Envoyer un mail
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {LAB_STEPS.map(step => (
                <div key={step.title} className="bg-sky-soft rounded-2xl p-4 border border-white text-left">
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
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je voudrais un service de teleradiologie.')}`

  return (
    <section id="teleradiologie" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full text-xs font-bold text-purple-600 mb-5">
              <AppIcon name="scan" size={15} /> TELERADIOLOGIE INTERNATIONALE
            </div>
            <h2 className="font-display font-bold text-4xl text-navy mb-4 leading-tight">
              Vos radios interpretees<br />
              <span className="text-gradient">en moins de 2h</span>
            </h2>
            <p className="text-navy/60 mb-8 text-base leading-relaxed">
              Nous interprétons vos radiographies, scanners, IRM et autres examens d'imagerie médicale. Nos médecins spécialisés en imagerie médicale, hautement qualifiés et issus des meilleurs réseaux internationaux, vous transmettent un rapport fiable, signé et rapide.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                <AppIcon name="scan" size={21} className="text-purple-600 mb-2" />
                <div className="font-bold text-navy text-sm mb-1">Tous vos examens</div>
                <div className="text-xs text-navy/55 leading-relaxed">Radio, scanner, IRM et autres examens d'imagerie.</div>
              </div>
              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                <AppIcon name="hospital" size={21} className="text-purple-600 mb-2" />
                <div className="font-bold text-navy text-sm mb-1">Pour toutes les structures</div>
                <div className="text-xs text-navy/55 leading-relaxed">Hôpitaux, cliniques, cabinets et petites structures de santé.</div>
              </div>
              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                <AppIcon name="home" size={21} className="text-purple-600 mb-2" />
                <div className="font-bold text-navy text-sm mb-1">À Keur Massar</div>
                <div className="text-xs text-navy/55 leading-relaxed">Nous réalisons également vos examens dans notre local.</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              {TELERADIO_STEPS.map((flow, i) => (
                <motion.div
                  key={flow.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-purple-50 rounded-2xl p-4"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm flex-shrink-0">
                    <AppIcon name={flow.icon} size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-400 uppercase">Etape {flow.step}</span>
                    <div className="font-semibold text-navy text-sm">{flow.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {TELERADIO_PLANS.map(plan => (
                <div
                  key={plan.label}
                  className={`rounded-xl p-3 text-center border ${plan.popular ? 'border-primary bg-sky-soft' : 'border-blue-100 bg-white'}`}
                >
                  <AppIcon name={plan.icon} size={20} className="mx-auto mb-1 text-primary" />
                  <div className="text-[10px] font-bold text-navy">{plan.label}</div>
                  {plan.popular && <div className="text-[9px] text-primary font-bold mt-1">Populaire</div>}
                </div>
              ))}
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-primary text-white font-bold shadow-hover hover:-translate-y-0.5 transition-all"
            >
              <AppIcon name="message" size={18} /> Demander un devis
            </a>
            <a
              href="?service=Téléradiologie#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-purple-200 text-purple-600 font-bold hover:bg-purple-50 transition-all ml-2"
            >
              <AppIcon name="mail" size={18} /> Envoyer un mail
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center pb-8 lg:pb-0"
          >
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-[2rem] overflow-hidden shadow-hover ring-8 ring-white">
                <Image
                  src={radiologueDoctor}
                  alt="Radiologue SENEDIAG analysant une radiographie"
                  placeholder="blur"
                  sizes="(max-width: 1024px) 90vw, 380px"
                  className="w-full h-auto object-cover aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white rounded-2xl p-4 text-center shadow-hover"
              >
                <div className="text-xs text-navy/50 mb-1">Resultat</div>
                <div className="font-display font-bold text-navy">Rapport radiologique</div>
                <div className="text-primary font-bold text-sm mt-1">Interprete et signe</div>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 font-semibold">Envoye en 2h</span>
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
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je voudrais reserver une seance de kinesitherapie.')}`

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
            <AppIcon name="dumbbell" size={15} /> KINESITHERAPIE ET ACTIVITE PHYSIQUE
          </div>
          <h2 className="font-display font-bold text-4xl text-navy mb-3">
            Reeducation <span className="text-gradient">pour tous</span>
          </h2>
          <p className="text-navy/50 text-base max-w-sm mx-auto">Salle equipee, programmes personnalises et suivi medical.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {KINE_PROGRAMS.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-3d group bg-white rounded-2xl p-6 shadow-card border border-white hover:border-orange-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <AppIcon name={program.icon} size={22} />
                </div>
                <div>
                  <div className="font-display font-bold text-navy mb-1">{program.title}</div>
                  <div className="text-navy/50 text-sm leading-relaxed">{program.desc}</div>
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
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-primary text-white font-bold text-base shadow-hover hover:-translate-y-1 transition-all whitespace-nowrap"
          >
            <AppIcon name="message" size={19} /> Reserver une seance
          </a>
          <a
            href="?service=Kinésithérapie#contact"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border-2 border-orange-200 text-orange-600 font-bold text-base hover:bg-orange-50 transition-all whitespace-nowrap"
          >
            <AppIcon name="mail" size={19} /> Envoyer un mail
          </a>
        </div>
      </div>
    </section>
  )
}
