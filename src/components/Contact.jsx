'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, PhoneCall } from 'lucide-react'
import { 
  WHATSAPP_NUMBER, 
  PHONE_NUMBER, 
  EMAIL_TO, 
  WHATSAPP_APPOINTMENT_URL,
  EMAIL_REGEX, 
  PHONE_REGEX, 
  MIN_NAME_LENGTH, 
  MAX_NAME_LENGTH, 
  MAX_MESSAGE_LENGTH 
} from '@/lib/constants'
import { createRateLimiter } from '@/lib/rateLimit'
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

const SERVICE_CONTEXTS = {
  'Consultation à domicile': 'Quel est le motif de votre consultation et souhaitez-vous une visite à domicile ?',
  'Mallette connectée': 'Quels examens ou besoins souhaitez-vous réaliser avec la mallette médicale connectée ?',
  Ambulance: 'Indiquez votre adresse, l’état du patient et le niveau d’urgence de la situation.',
  Laboratoire: 'Précisez les analyses souhaitées et indiquez si un prélèvement à domicile est nécessaire.',
  Téléradiologie: 'Précisez l’examen à interpréter et joignez les informations utiles à votre demande.',
  Kinésithérapie: 'Indiquez le motif de la séance, la zone à traiter et vos disponibilités.',
  'Deuxième avis médical': 'Décrivez votre situation médicale et le type d’avis que vous souhaitez obtenir.',
  'Partenariat clinique': 'Présentez votre structure et le service médical pour lequel vous souhaitez un partenariat.',
}

const TRACKING_STEPS = [
  { icon: '+', label: 'Demande reçue', color: 'text-green-500' },
  { icon: '1', label: "L'équipe examine", color: 'text-blue-500' },
  { icon: '2', label: 'On vous contacte', color: 'text-orange-500' },
  { icon: '3', label: 'RDV confirmé', color: 'text-purple-500' },
  { icon: '4', label: 'On arrive', color: 'text-primary' },
]

const EMPTY_FORM = { name: '', phone: '', email: '', service: '', message: '', website: '' }

function buildWhatsAppMessage({ name, phone, email, service, message }) {
  return [
    'Bonjour SENEDIAG, je voudrais faire une demande.',
    '',
    `Nom : ${name.trim()}`,
    `Telephone / WhatsApp : ${phone.trim()}`,
    email?.trim() ? `Courriel : ${email.trim()}` : '',
    service?.trim() ? `Service souhaite : ${service.trim()}` : '',
    message?.trim() ? `Besoin : ${message.trim()}` : '',
  ].filter(Boolean).join('\n')
}

// Validation du formulaire
function validateForm(form) {
  const errors = {}
  const name = form.name?.trim() || ''
  const phone = form.phone?.trim() || ''
  const email = form.email?.trim() || ''

  if (!name) {
    errors.name = 'Nom requis'
  } else if (name.length < MIN_NAME_LENGTH) {
    errors.name = `Minimum ${MIN_NAME_LENGTH} caractères`
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Maximum ${MAX_NAME_LENGTH} caractères`
  }

  if (!phone) {
    errors.phone = 'Téléphone requis'
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phone = 'Téléphone invalide (format: +221777268292 ou 777268292)'
  }

  if (email && !EMAIL_REGEX.test(email)) {
    errors.email = 'Email invalide'
  }

  if (form.message && form.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message trop long (max ${MAX_MESSAGE_LENGTH} caractères)`
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}

const CONTACT_METHODS = [
  {
    Icon: WhatsAppIcon,
    label: 'WhatsApp',
    sub: 'Reponse immediate',
    color: 'bg-green-500',
    href: WHATSAPP_APPOINTMENT_URL,
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
  const [serviceContext, setServiceContext] = useState(null)
  const [status, setStatus] = useState('idle')
  const [trackStep, setTrackStep] = useState(-1)
  const [validationErrors, setValidationErrors] = useState({})
  const rateLimiterRef = useRef(createRateLimiter(5, 60000)) // Max 5 soumissions par minute

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get('service')
    const prompt = requestedService ? SERVICE_CONTEXTS[requestedService] : null

    if (requestedService && prompt) {
      setServiceContext({ label: requestedService, prompt })
      setForm(current => ({
        ...current,
        service: requestedService,
        message: current.message || prompt,
      }))
    }
  }, [])

  const set = k => e => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    // Nettoyer l'erreur du champ en cours de modification
    if (validationErrors[k]) {
      setValidationErrors(v => ({ ...v, [k]: '' }))
    }
  }

  const submit = async () => {
    setValidationErrors({})
    
    // Vérifier le rate limit côté client
    const rateLimitCheck = rateLimiterRef.current.isAllowed()
    if (!rateLimitCheck.allowed) {
      const remainingSeconds = Math.ceil((rateLimitCheck.resetAt - Date.now()) / 1000)
      setValidationErrors({
        submit: `Trop de tentatives. Réessayez dans ${remainingSeconds} secondes.`,
      })
      setStatus('error')
      return
    }

    const validation = validateForm(form)
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      // Appeler l'API backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }

      // Succès: afficher le suivi et ouvrir WhatsApp
      setStatus('success')
      setTrackStep(0)
      
      const message = encodeURIComponent(buildWhatsAppMessage(form))
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
      
      // Délai pour afficher le suivi avant d'ouvrir WhatsApp
      setTimeout(() => {
        const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
        if (!opened) {
          window.location.href = whatsappUrl
        }
      }, 800)

      // Animation du suivi
      let s = 0
      const iv = setInterval(() => {
        s++
        setTrackStep(s)
        if (s >= TRACKING_STEPS.length - 1) clearInterval(iv)
      }, 1200)
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
      setValidationErrors({ submit: err.message || 'Erreur d\'envoi. Contactez-nous directement sur WhatsApp.' })
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
            {serviceContext ? (
              <>Votre demande de <span className="text-gradient">{serviceContext.label}</span></>
            ) : (
              <>Parlez-nous de <span className="text-gradient">votre besoin</span></>
            )}
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
                <h3 className="font-display font-bold text-2xl text-navy mb-2">Message WhatsApp prêt !</h3>
                <p className="text-navy/50 text-sm mb-8">Validez l'envoi dans WhatsApp pour finaliser votre demande</p>

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
                  onClick={() => {
                    setStatus('idle')
                    setForm({ ...EMPTY_FORM, service: serviceContext?.label || '', message: '' })
                    setTrackStep(-1)
                  }}
                  className="mt-8 px-6 py-3 rounded-xl bg-sky-soft text-primary font-bold text-sm hover:bg-sky-mid transition-colors"
                >
                  Nouvelle demande
                </button>
              </motion.div>
            ) : (
              <div>
                <h3 className="font-display font-bold text-xl text-navy mb-6" id="form-title">
                  {serviceContext ? `Formulaire - ${serviceContext.label}` : 'Formulaire de demande'}
                </h3>
                <form aria-labelledby="form-title">

                <div className="mb-5">
                  <label htmlFor="service-select" className="text-xs font-bold text-navy/50 uppercase mb-2 block">Service souhaité</label>
                  <div className="grid grid-cols-2 gap-2" role="group" aria-labelledby="service-select">
                    {SERVICES_LIST.map((s, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, service: s }))}
                        aria-pressed={form.service === s}
                        aria-label={`Sélectionner service: ${s}`}
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
                  <div>
                    <label className="sr-only" htmlFor="contact-name">Votre nom</label>
                    <input
                      id="contact-name"
                      value={form.name}
                      onChange={set('name')}
                      placeholder="Votre nom *"
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!validationErrors.name}
                      aria-describedby={validationErrors.name ? "error-name" : undefined}
                      className={`w-full bg-sky-soft border rounded-xl px-4 py-3 text-sm text-navy placeholder-navy/40 outline-none focus:border-primary transition-colors ${
                        validationErrors.name ? 'border-red-400' : 'border-blue-100'
                      }`}
                    />
                    {validationErrors.name && (
                      <p id="error-name" className="text-red-500 text-xs mt-1" role="alert">{validationErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="contact-phone">Téléphone ou WhatsApp</label>
                    <input
                      id="contact-phone"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="Téléphone / WhatsApp *"
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={!!validationErrors.phone}
                      aria-describedby={validationErrors.phone ? "error-phone" : undefined}
                      className={`w-full bg-sky-soft border rounded-xl px-4 py-3 text-sm text-navy placeholder-navy/40 outline-none focus:border-primary transition-colors ${
                        validationErrors.phone ? 'border-red-400' : 'border-blue-100'
                      }`}
                    />
                    {validationErrors.phone && (
                      <p id="error-phone" className="text-red-500 text-xs mt-1" role="alert">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="contact-email">Courriel</label>
                  <input
                    id="contact-email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="Courriel (optionnel)"
                    autoComplete="email"
                    aria-invalid={!!validationErrors.email}
                    aria-describedby={validationErrors.email ? "error-email" : undefined}
                    className={`w-full bg-sky-soft border rounded-xl px-4 py-3 text-sm text-navy placeholder-navy/40 outline-none focus:border-primary transition-colors ${
                      validationErrors.email ? 'border-red-400' : 'border-blue-100'
                    }`}
                  />
                  {validationErrors.email && (
                    <p id="error-email" className="text-red-500 text-xs mt-1" role="alert">{validationErrors.email}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="sr-only" htmlFor="contact-message">Votre besoin</label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={set('message')}
                    placeholder={serviceContext?.prompt || 'Décrivez votre besoin (optionnel)'}
                    rows={3}
                    aria-invalid={!!validationErrors.message}
                    aria-describedby={validationErrors.message ? "error-message" : "message-count"}
                    className={`w-full bg-sky-soft border rounded-xl px-4 py-3 text-sm text-navy placeholder-navy/40 outline-none focus:border-primary transition-colors resize-none ${
                      validationErrors.message ? 'border-red-400' : 'border-blue-100'
                    }`}
                  />
                  <div className="flex justify-between items-start mt-1">
                    <div>
                      {validationErrors.message && (
                        <p id="error-message" className="text-red-500 text-xs" role="alert">{validationErrors.message}</p>
                      )}
                    </div>
                    <span id="message-count" className="text-navy/40 text-xs" aria-live="polite">{form.message.length}/{MAX_MESSAGE_LENGTH}</span>
                  </div>
                </div>

                <label className="hidden" htmlFor="contact-website">Site web</label>
                <input
                  id="contact-website"
                  value={form.website}
                  onChange={set('website')}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {validationErrors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm mb-4" role="alert" aria-live="assertive">
                    {validationErrors.submit}
                  </div>
                )}

                {status === 'error' && !validationErrors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm mb-4" role="alert" aria-live="assertive">
                    Erreur d'envoi. Contactez-nous directement sur WhatsApp.
                  </div>
                )}

                <button
                  type="button"
                  onClick={submit}
                  disabled={!form.name || !form.phone || status === 'loading'}
                  aria-busy={status === 'loading'}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-teal text-white font-bold text-base shadow-hover hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
                <p className="text-center text-xs text-navy/40 mt-3">* Nous vous répondons sous 30 minutes</p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
