'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle, PhoneCall } from 'lucide-react'
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '@/lib/constants'
import WhatsAppIcon from './WhatsAppIcon'

const FAQ_ITEMS = [
  {
    question: 'Comment prendre rendez-vous avec SENEDIAG ?',
    answer:
      'Vous pouvez nous contacter par WhatsApp, par appel direct ou remplir le formulaire. Notre equipe vous rappelle pour confirmer le service, le lieu, l horaire et les informations utiles.',
  },
  {
    question: 'Est-ce que vous vous deplacez a domicile ?',
    answer:
      'Oui. Selon le besoin, une equipe peut se deplacer a domicile avec la mallette medicale connectee, pour une consultation, un prelevement, un suivi ou une orientation medicale.',
  },
  {
    question: 'Que faire en cas d urgence ?',
    answer:
      'Appuyez sur le bouton SOS, appelez directement le numero d urgence ou contactez-nous sur WhatsApp. Indiquez votre adresse exacte, le probleme principal, l age du patient et un numero joignable.',
  },
  {
    question: 'Quels services sont disponibles ?',
    answer:
      'SENEDIAG propose la telemedecine, la mallette medicale connectee, l ambulance, le laboratoire, la teleradiologie, la kinesitherapie et l accompagnement de patients ou de structures de sante.',
  },
  {
    question: 'Comment se passent les analyses de laboratoire ?',
    answer:
      'Vous envoyez votre demande ou votre prescription, puis nous organisons le prelevement. Les resultats sont transmis selon le delai de chaque analyse, avec possibilite de reception en ligne ou par email.',
  },
  {
    question: 'Puis-je envoyer une radio, un scanner ou une IRM pour interpretation ?',
    answer:
      'Oui. Pour la teleradiologie, vous envoyez les images medicales disponibles. Un radiologue les analyse et vous recevez un rapport signe dans les meilleurs delais.',
  },
  {
    question: 'Que dois-je preparer avant une visite a domicile ?',
    answer:
      'Preparez vos anciens examens, ordonnances, carnet de suivi, traitements en cours et une piece d identification si disponible. Pour une urgence, privilegiez surtout l adresse exacte et les symptomes principaux.',
  },
  {
    question: 'Mes informations medicales restent-elles confidentielles ?',
    answer:
      'Oui. Les informations transmises servent uniquement a organiser et assurer votre prise en charge. Elles sont traitees avec discretion et ne sont partagees qu avec les professionnels concernes.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, j ai une question avant de prendre rendez-vous.')}`

  return (
    <section id="faq" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-sky-soft border border-sky-strong px-4 py-1.5 rounded-full text-xs font-bold text-primary mb-4 shadow-sm">
            <HelpCircle size={15} /> FAQ PATIENTS
          </div>
          <h2 className="font-display font-bold text-4xl text-navy mb-3">
            Questions <span className="text-gradient">frequentes</span>
          </h2>
          <p className="text-navy/50 text-base max-w-xl mx-auto">
            Les reponses aux demandes les plus courantes avant une consultation, une urgence ou un examen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className={`rounded-2xl border bg-white shadow-card overflow-hidden transition-colors ${
                    isOpen ? 'border-sky-strong' : 'border-blue-100'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full min-h-16 px-5 py-4 flex items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-navy text-base leading-snug">{item.question}</span>
                    <span className={`w-9 h-9 rounded-xl bg-sky-soft text-primary flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-navy/60">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-sky-soft border border-sky-strong p-6 shadow-card"
          >
            <div className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center shadow-sm mb-4">
              <MessageCircle size={24} />
            </div>
            <h3 className="font-display font-bold text-2xl text-navy mb-2">Une autre question ?</h3>
            <p className="text-sm text-navy/60 leading-relaxed mb-5">
              Notre equipe peut vous orienter rapidement vers le bon service et vous expliquer la suite.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors"
              >
                <WhatsAppIcon size={20} /> Poser ma question
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border border-sky-strong text-primary font-bold text-sm hover:bg-sky-mid transition-colors"
              >
                <PhoneCall size={18} /> Appeler
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
