export const WHATSAPP_NUMBER = '221777268292'
export const PHONE_NUMBER = '+221777268292'
export const EMAIL_TO = 'mamadoudocteurf@gmail.com'
export const EMAIL_FROM = 'mdocteur.faye@univ-thies.sn'
export const SITE_NAME = 'SENEDIAG'
export const SITE_TAGLINE = 'Sénégal Diagnostique'

// URLs WhatsApp centralisées
export const WHATSAPP_APPOINTMENT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour SENEDIAG, je voudrais prendre rendez-vous.')}`

// Validation regex et limites
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_REGEX = /^[\d+\s()-]{8,20}$/
export const MIN_NAME_LENGTH = 2
export const MAX_NAME_LENGTH = 120
export const MAX_MESSAGE_LENGTH = 2000

export const SERVICES = [
  {
    id: 'telemedecine',
    icon: 'stethoscope',
    color: 'from-primary to-teal',
    bg: 'bg-sky-soft',
    border: 'border-sky-strong',
    label: 'Télémédecine',
    desc: 'Consultation à domicile ou à distance',
    steps: [
      { icon: 'phone', label: 'Contactez-nous' },
      { icon: 'truck', label: 'On se déplace' },
      { icon: 'stethoscope', label: 'Consultation' },
      { icon: 'clipboard', label: 'Ordonnance' },
    ],
  },
  {
    id: 'ambulance',
    icon: 'ambulance',
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    label: 'Ambulance',
    desc: 'Intervention rapide & suivi',
    steps: [
      { icon: 'siren', label: 'Urgence' },
      { icon: 'zap', label: 'Départ immédiat' },
      { icon: 'hospital', label: 'Soins embarqués' },
      { icon: 'refresh', label: 'Suivi' },
    ],
  },
  {
    id: 'laboratoire',
    icon: 'microscope',
    color: 'from-teal to-primary',
    bg: 'bg-teal-light',
    border: 'border-sky-strong',
    label: 'Laboratoire',
    desc: 'Toutes les analyses',
    steps: [
      { icon: 'clipboard', label: 'Prescription' },
      { icon: 'syringe', label: 'Prélèvement' },
      { icon: 'flask', label: 'Analyse' },
      { icon: 'activity', label: 'Résultats en ligne' },
    ],
  },
  {
    id: 'teleradiologie',
    icon: 'scan',
    color: 'from-violet-500 to-primary',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    label: 'Téléradiologie',
    desc: 'Radios & scanners interprétés à distance',
    steps: [
      { icon: 'send', label: 'Envoi image' },
      { icon: 'userCheck', label: 'Radiologue' },
      { icon: 'clock', label: 'Moins de 2h' },
      { icon: 'file', label: 'Rapport' },
    ],
  },
  {
    id: 'mallette',
    icon: 'briefcaseMedical',
    color: 'from-primary to-teal',
    bg: 'bg-sky-soft',
    border: 'border-sky-strong',
    label: 'Mallette connectée',
    desc: 'Tous les appareils chez vous',
    steps: [
      { icon: 'calendar', label: 'RDV' },
      { icon: 'truck', label: 'Déplacement' },
      { icon: 'wifi', label: 'Connexion' },
      { icon: 'monitor', label: 'Médecin live' },
    ],
  },
  {
    id: 'kinesitherapie',
    icon: 'dumbbell',
    color: 'from-orange-400 to-primary',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    label: 'Kinésithérapie',
    desc: 'Rééducation & suivi sportif',
    steps: [
      { icon: 'stethoscope', label: 'Bilan' },
      { icon: 'clipboard', label: 'Programme' },
      { icon: 'dumbbell', label: 'Séances' },
      { icon: 'activity', label: 'Évolution' },
    ],
  },
]

export const ANALYSES = [
  { icon: 'activity', name: 'Sang' },
  { icon: 'flask', name: 'ADN' },
  { icon: 'microscope', name: 'Bactéries' },
  { icon: 'scan', name: 'Parasites' },
  { icon: 'flask', name: 'Chimie' },
  { icon: 'pill', name: 'Médicaments' },
  { icon: 'heart', name: 'Cœur' },
  { icon: 'thermometer', name: 'Virus' },
  { icon: 'flask', name: 'Hormones' },
  { icon: 'syringe', name: 'Diabète' },
  { icon: 'stethoscope', name: 'Bucco-dentaire' },
  { icon: 'eye', name: 'Yeux' },
]

export const KINE_PROGRAMS = [
  { icon: 'dumbbell', title: 'Sportifs', desc: 'Préparation physique et récupération' },
  { icon: 'activity', title: 'Après AVC', desc: 'Rééducation neurologique' },
  { icon: 'syringe', title: 'Diabétiques', desc: 'Programme adapté' },
  { icon: 'heart', title: 'Cardiaques', desc: 'Réhabilitation cardiaque' },
  { icon: 'route', title: 'Orthopédie', desc: 'Post-opératoire' },
  { icon: 'userCheck', title: 'Seniors', desc: "Maintien de l'autonomie" },
]

export const MALLETTE_DEVICES = [
  { icon: 'radio', name: 'Échographe' },
  { icon: 'heart', name: 'ECG' },
  { icon: 'wind', name: 'Spiromètre' },
  { icon: 'stethoscope', name: 'Stéthoscope' },
  { icon: 'stethoscope', name: 'Dentaire' },
  { icon: 'camera', name: 'Scanner' },
  { icon: 'thermometer', name: 'Température' },
  { icon: 'syringe', name: 'Glycémètre' },
  { icon: 'activity', name: 'Tensiomètre' },
  { icon: 'eye', name: 'Otoscope' },
  { icon: 'video', name: 'Vidéo HD' },
  { icon: 'printer', name: 'Impression' },
]
