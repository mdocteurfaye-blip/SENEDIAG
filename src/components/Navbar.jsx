'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WHATSAPP_NUMBER, PHONE_NUMBER } from '@/lib/constants'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import AppIcon from './AppIcon'

const NAV_LINKS = [
  { href: '#services', icon: 'hospital', title: 'Services' },
  { href: '#mallette', icon: 'briefcaseMedical', title: 'Mallette' },
  { href: '#ambulance', icon: 'ambulance', title: 'Ambulance' },
  { href: '#laboratoire', icon: 'microscope', title: 'Laboratoire' },
  { href: '#kinesitherapie', icon: 'dumbbell', title: 'Kiné' },
  { href: '#contact', icon: 'phone', title: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je voudrais prendre rendez-vous.')}`

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-card' : 'bg-white/75 backdrop-blur-md'
      } border-b border-sky-strong`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <Logo markClassName="group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-display font-bold text-base text-navy tracking-wide">SENEDIAG</span>
            <span className="block text-[10px] text-primary font-medium leading-none">Sénégal Diagnostique</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-navy/70 hover:text-primary hover:bg-sky-soft transition-all"
            >
              <AppIcon name={l.icon} size={15} />
              <span>{l.title}</span>
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-sky-strong text-primary text-[13px] font-semibold hover:bg-sky-soft transition-all"
          >
            <AppIcon name="phone" size={14} /> Appeler
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-teal text-white text-[13px] font-bold shadow-card hover:shadow-hover transition-all hover:-translate-y-0.5"
          >
            <AppIcon name="message" size={15} /> WhatsApp
          </a>
        </div>

        <button type="button" onClick={() => setOpen(o => !o)} className="md:hidden p-2 rounded-lg hover:bg-sky-soft" aria-label="Menu">
          {open ? <X size={22} className="text-navy" /> : <Menu size={22} className="text-navy" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-sky-strong overflow-hidden"
          >
            <div className="p-4 grid grid-cols-3 gap-2">
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl bg-sky-soft hover:bg-sky-mid transition-all text-center"
                >
                  <AppIcon name={l.icon} size={22} className="text-primary" />
                  <span className="text-[11px] font-semibold text-navy">{l.title}</span>
                </a>
              ))}
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <a href={`tel:${PHONE_NUMBER}`} className="flex-1 py-3 rounded-xl border border-sky-strong text-primary font-bold text-center text-sm flex items-center justify-center gap-2">
                <AppIcon name="phone" size={15} /> Appeler
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-teal text-white font-bold text-center text-sm flex items-center justify-center gap-2">
                <AppIcon name="message" size={15} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
