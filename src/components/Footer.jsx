'use client'
import { PHONE_NUMBER, EMAIL_TO, WHATSAPP_NUMBER } from '@/lib/constants'
import Logo from './Logo'
import AppIcon from './AppIcon'

const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG')}`
const currentYear = new Date().getFullYear()

const footerServices = [
  ['stethoscope', 'Consultation à domicile'],
  ['briefcaseMedical', 'Mallette connectée'],
  ['ambulance', 'Ambulance'],
  ['microscope', 'Laboratoire'],
  ['scan', 'Téléradiologie'],
  ['dumbbell', 'Kinésithérapie'],
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Logo />
              <div>
                <div className="font-display font-bold text-base tracking-wide">SENEDIAG</div>
                <div className="text-[10px] text-sky-strong font-medium">Sénégal Diagnostique</div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
              La première plateforme de santé connectée au Sénégal. Nous vous apportons des soins de qualité internationale, partout où vous êtes.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-white/55 text-xs flex items-center gap-2"><AppIcon name="mapPin" size={14} /> Dakar, Sénégal</span>
              <a href={`tel:${PHONE_NUMBER}`} className="text-white/55 text-xs flex items-center gap-2 hover:text-white transition-colors"><AppIcon name="phone" size={14} /> {PHONE_NUMBER}</a>
              <a href={`mailto:${EMAIL_TO}`} className="text-white/55 text-xs flex items-center gap-2 hover:text-white transition-colors"><AppIcon name="mail" size={14} /> {EMAIL_TO}</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-strong mb-5">Services</h4>
            <div className="flex flex-col gap-3">
              {footerServices.map(([icon, label], i) => (
                <a key={i} href="#services" className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <AppIcon name={icon} size={15} /> {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-strong mb-5">Contact rapide</h4>
            <div className="flex flex-col gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-xl p-3 hover:bg-green-500/30 transition-colors">
                <AppIcon name="message" size={20} />
                <span className="text-sm font-semibold">WhatsApp</span>
              </a>
              <a href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-3 bg-primary/25 border border-primary/40 rounded-xl p-3 hover:bg-primary/35 transition-colors">
                <AppIcon name="phone" size={20} />
                <span className="text-sm font-semibold">Appeler</span>
              </a>
              <a href="#contact"
                className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-3 hover:bg-white/20 transition-colors">
                <AppIcon name="clipboard" size={20} />
                <span className="text-sm font-semibold">Formulaire</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© {currentYear} SENEDIAG — Sénégal Diagnostique. Tous droits réservés.</p>
          <div className="flex gap-2">
            {['FR', 'EN', 'WO'].map(l => (
              <button key={l} type="button" className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-white/10 text-white/50 hover:bg-white/20 hover:text-white transition-all">
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
