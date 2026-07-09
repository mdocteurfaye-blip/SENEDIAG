'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, PhoneCall } from 'lucide-react'
import { WHATSAPP_NUMBER, PHONE_NUMBER, EMAIL_TO } from '@/lib/constants'
import WhatsAppIcon from './WhatsAppIcon'

const SERVICES_LIST = [
  'Consultation à domicile',
  'Mallette connectée',
  'Ambulance',
  'Laboratoire',
  'Téléradiologie',
  'Kinésithérapie',
  'Deuxième avis médical',
  'Partenariat clinique',
]

const TRACKING_STEPS = [
  { icon: '+', label: 'Demande reçue', color: 'text-green-500' },
  { icon: '1', label: "L'équipe examine", color: 'text-blue-500' },
  { icon: '2', label: 'On vous contacte', color: 'text-orange-500' },
  { icon: '3', label: 'RDV confirmé', color: 'text-purple-500' },
  { icon: '4', label: 'On arrive', color: 'text-primary' },
]

const EMPTY_FORM = { name: '', phone: '', email: '', service: '', message: '', website: '' }

const CONTACT_METHODS = [
  {
    Icon: WhatsAppIcon,
    label: 'WhatsApp',
    sub: 'Reponse immediate',
    color: 'bg-green-500',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je voudrais prendre rendez-vous.')}`,
    external: true,
  },
  {
    Icon: PhoneCall,
    label: 'Appel direct',
    sub: '24h/24 pour urgences',
    color: 'bg-primary',
    href: `tel:${PHONE_NUMBER}`,
    external: false,
  },
  {
    Icon: Mail,
    label: 'Courriel',
    sub: EMAIL_TO,
    color: 'bg-teal',
    href: `mailto:${EMAIL_TO}`,
    external: false,
  },
]

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle')
  const [trackStep, setTrackStep] = useState(-1)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.name || !form.phone) return
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Contact request failed')
      }

      setStatus('success')
      setTrackStep(0)

      let s = 0
      const iv = setInterval(() => {
        s++
        setTrackStep(s)
        if (s >= TRACKING_STEPS.length - 1) clearInterval(iv)
      }, 1200)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 px-6 bg-sky-soft">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 px-4 py-1.5 rounded-full text-xs font-bold text-primary mb-4 shadow-sm">
            NOUS CONTACTER
          </div>
          <h2 className="font-display font-bold text-4xl text-navy mb-3">
            Parlez-nous de <span className="text-gradient">votre besoin</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-4">
            {CONTACT_METHODS.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-card hover:shadow-hover transition-all"
              >
                <div className={`w-12 h-12 ${c.color} rounded-xl flex items-center justify-center text-sm text-white font-bold shadow-sm flex-shrink-0`}>
                  <c.Icon size={24} strokeWidth={2.3} />
                </div>
                <div>
                  <div className="font-bold text-navy">{c.label}</div>
                  <div className="text-navy/50 text-sm">{c.sub}</div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-card"
          >
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                <div className="text-5xl mb-4 text-green-500">+</div>
                <h3 className="font-display font-bold text-2xl text-navy mb-2">Demande envoyée !</h3>
                <p className="text-navy/50 text-sm mb-8">Suivez l'avancement de votre demande ci-dessous</p>

                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  {TRACKING_STEPS.map((t, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: i <= trackStep ? 1 : 0.3,
                        scale: i === trackStep ? 1.03 : 1,
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl ${i <= trackStep ? 'bg-sky-soft' : 'bg-gray-50'}`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold ${i <= trackStep ? t.color : 'text-navy/30'}`}>{t.icon}</div>
                      <div className={`font-semibold text-sm ${i <= trackStep ? 'text-navy' : 'text-navy/30'}`}>{t.label}</div>
                      {i <= trackStep && i === trackStep && (
                        <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => { setStatus('idle'); setForm(EMPTY_FORM); setTrackStep(-1) }}
                  className="mt-8 px-6 py-3 rounded-xl bg-sky-soft text-primary font-bold text-sm hover:bg-sky-mid transition-colors"
                >
                  Nouvelle demande
                </button>
              </motion.div>
            ) : (
              <div>
                <h3 className="font-display font-bold text-xl text-navy mb-6">Formulaire de demande</h3>

                <div className="mb-5">
                  <div className="text-xs font-bold text-navy/50 uppercase mb-2">Service souhaité</div>
                  <div className="grid grid-cols-2 gap-2">
                    {SERVICES_LIST.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, service: s }))}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                          form.service === s
                            ? 'bg-primary text-white shadow-card'
                            : 'bg-sky-soft text-navy hover:bg-sky-mid'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <label className="sr-only" htmlFor="contact-name">Votre nom</label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Votre nom *"
                    autoComplete="name"
                    className="bg-sky-soft border border-blue-100 rounded-xl px-4 py-3 text-sm text-navy placeholder-navy/40 outline-none focus:border-primary transition-colors"
                  />

                  <label className="sr-only" htmlFor="contact-phone">Téléphone ou WhatsApp</label>
                  <input
                    id="contact-phone"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="Téléphone / WhatsApp *"
                    autoComplete="tel"
                    className="bg-sky-soft border border-blue-100 rounded-xl px-4 py-3 text-sm text-navy placeholder-navy/40 outline-none focus:border-primary transition-colors"
                  />
                </div>

                <label className="sr-only" htmlFor="contact-email">Courriel</label>
                <input
                  id="contact-email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="Courriel (optionnel)"
                  autoComplete="email"
                  className="w-full bg-sky-soft border border-blue-100 rounded-xl px-4 py-3 text-sm text-navy placeholder-navy/40 outline-none focus:border-primary transition-colors mb-3"
                />

                <label className="sr-only" htmlFor="contact-message">Votre besoin</label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Décrivez votre besoin (optionnel)"
                  rows={3}
                  className="w-full bg-sky-soft border border-blue-100 rounded-xl px-4 py-3 text-sm text-navy placeholder-navy/40 outline-none focus:border-primary transition-colors resize-none mb-4"
                />

                <label className="hidden" htmlFor="contact-website">Site web</label>
                <input
                  id="contact-website"
                  value={form.website}
                  onChange={set('website')}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm mb-4">
                    Erreur d'envoi. Contactez-nous directement sur WhatsApp.
                  </div>
                )}

                <button
                  type="button"
                  onClick={submit}
                  disabled={!form.name || !form.phone || status === 'loading'}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-teal text-white font-bold text-base shadow-hover hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
                <p className="text-center text-xs text-navy/40 mt-3">* Nous vous répondons sous 30 minutes</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
