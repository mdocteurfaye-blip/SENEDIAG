# 🏥 SENEDIAG — Site web Phase 1

## ⚡ Démarrage rapide (3 étapes)

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer vos contacts
Ouvrez `src/lib/constants.js` et modifiez :
```js
export const WHATSAPP_NUMBER = '221XXXXXXXXX'  // Votre numéro sans +
export const PHONE_NUMBER    = '+221XXXXXXXXX' // Votre numéro avec +
export const EMAIL_TO        = 'contact@senediag.sn'
```

### 3. Configurer l'email automatique
```bash
cp .env.local.example .env.local
```
Puis remplissez `.env.local` :
```env
GMAIL_USER=mdocteur.faye@univ-thies.sn
GMAIL_APP_PASSWORD=votre_mot_de_passe_application_google
EMAIL_TO=mamadoudocteurf@gmail.com
```

Important : `GMAIL_APP_PASSWORD` n'est pas le mot de passe normal du compte. Il faut créer un mot de passe d'application Google pour `mdocteur.faye@univ-thies.sn` :
1. Activez la validation en deux étapes sur le compte Google.
2. Ouvrez https://myaccount.google.com/apppasswords.
3. Créez un mot de passe d'application pour “Mail”.
4. Collez les 16 caractères dans `.env.local`.

Après modification de `.env.local`, redémarrez le serveur Next.js.

### 4. Lancer le site
```bash
npm run dev
```
Ouvrez http://localhost:3000 🎉

---

## 📁 Structure du projet
```
src/
├── app/
│   ├── page.js              # Page principale
│   ├── layout.js            # Layout global
│   ├── globals.css          # Styles globaux
│   └── api/contact/route.js # Envoi email Gmail SMTP
├── components/
│   ├── Navbar.jsx           # Navigation
│   ├── Hero.jsx             # Section hero 3D
│   ├── BodyChecker.jsx      # Sélecteur de zone corporelle
│   ├── Services.jsx         # Grille des 6 services
│   ├── Mallette.jsx         # Mallette connectée
│   ├── Ambulance.jsx        # Ambulance & urgences
│   ├── Sections.jsx         # Labo + Téléradio + Kiné
│   ├── Contact.jsx          # Formulaire + suivi
│   ├── Footer.jsx           # Pied de page
│   ├── SOSButton.jsx        # Bouton SOS fixe
│   └── FloatingContacts.jsx # Boutons flottants
└── lib/
    └── constants.js         # ⚙️ VOS PARAMÈTRES ICI
```

## 🚀 Déploiement (Vercel — gratuit)
```bash
npm install -g vercel
vercel
```
Ajoutez vos variables d'env dans le dashboard Vercel.

## 🎨 Couleurs SENEDIAG
- Bleu principal : `#1A73E8`
- Bleu ciel : `#EBF5FF`
- Teal : `#0EA5E9`
- Navy : `#0F2B5B`

## 📞 Support
contact@senediag.sn
