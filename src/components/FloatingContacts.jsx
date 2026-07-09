'use client'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Mail, PhoneCall, Youtube } from 'lucide-react'
import { WHATSAPP_NUMBER, PHONE_NUMBER, EMAIL_TO } from '@/lib/constants'
import WhatsAppIcon from './WhatsAppIcon'
import { TikTokIcon, XIcon } from './SocialIcons'

const CONTACTS = [
  {
    Icon: WhatsAppIcon,
    label: 'WhatsApp',
    color: 'bg-green-500 hover:bg-green-600',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je voudrais un renseignement.')}`,
    external: true,
  },
  {
    Icon: PhoneCall,
    label: 'Appel',
    color: 'bg-primary hover:bg-primary-dark',
    href: `tel:${PHONE_NUMBER}`,
    external: false,
  },
  {
    Icon: Mail,
    label: 'Formulaire',
    color: 'bg-teal hover:bg-teal-DEFAULT',
    href: '#contact',
    external: false,
  },
]

const SOCIALS = [
  { Icon: Facebook, label: 'Facebook', color: 'bg-[#1877F2] hover:bg-[#166FE5]', href: '#' },
  { Icon: Instagram, label: 'Instagram', color: 'bg-[#E4405F] hover:bg-[#D83457]', href: '#' },
  { Icon: XIcon, label: 'X', color: 'bg-black hover:bg-zinc-800', href: '#' },
  { Icon: Youtube, label: 'YouTube', color: 'bg-[#FF0000] hover:bg-[#E60000]', href: '#' },
  { Icon: TikTokIcon, label: 'TikTok', color: 'bg-[#111111] hover:bg-zinc-800', href: '#' },
]

function FloatingLink({ item, index, small = false, delayOffset = 0.5 }) {
  const isPlaceholder = item.href === '#'
  const opensNewTab = !isPlaceholder && item.external !== false

  return (
    <motion.a
      href={item.href}
      target={opensNewTab ? '_blank' : undefined}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
      onClick={event => {
        if (isPlaceholder) event.preventDefault()
      }}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: delayOffset + index * 0.1 }}
      whileHover={{ scale: 1.1, x: -4 }}
      className={`${small ? 'w-10 h-10 rounded-xl' : 'w-12 h-12 rounded-2xl'} ${item.color} text-white flex items-center justify-center shadow-lg transition-all group relative`}
      title={item.label}
      aria-label={item.label}
    >
      <item.Icon size={small ? 19 : 22} strokeWidth={2.3} />
      <div className="absolute right-14 bg-navy text-white text-[11px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        {item.label}
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-navy" />
      </div>
    </motion.a>
  )
}

export default function FloatingContacts() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2">
      {CONTACTS.map((c, i) => (
        <FloatingLink key={c.label} item={c} index={i} />
      ))}

      <div className="my-1 h-px w-10 bg-white/70 shadow-sm" />

      {SOCIALS.map((social, i) => (
        <FloatingLink
          key={social.label}
          item={social}
          index={i}
          small
          delayOffset={0.95}
        />
      ))}
    </div>
  )
}
