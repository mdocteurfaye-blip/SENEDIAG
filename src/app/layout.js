
import './globals.css'

export const metadata = {
  title: 'SENEDIAG — Sénégal Diagnostique',
  description: 'Soins à domicile, mallette médicale connectée, ambulance, laboratoire et téléradiologie au Sénégal.',
  keywords: 'médecin domicile Sénégal, télémédecine Dakar, laboratoire, ambulance, kinésithérapie',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#167B93" />
      </head>
      <body>{children}</body>
    </html>
  )
}
