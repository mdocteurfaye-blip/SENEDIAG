/**
 * Vérification des variables d'environnement requises
 * Appelée au démarrage du serveur
 */

export function checkEnvironmentVariables() {
  const requiredVars = ['GMAIL_USER', 'GMAIL_APP_PASSWORD', 'EMAIL_TO']
  const missingVars = []

  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missingVars.push(varName)
    }
  })

  if (missingVars.length > 0) {
    const errorMessage = `
❌ ERREUR: Variables d'environnement manquantes pour l'API Contact:
   ${missingVars.map(v => `   - ${v}`).join('\n')}

Les emails de contact ne seront pas envoyés!

Configurez ces variables dans votre fichier .env.local:
   GMAIL_USER=votre_email@gmail.com
   GMAIL_APP_PASSWORD=votre_app_password
   EMAIL_TO=destinataire@example.com

Pour générer une App Password Gmail:
   1. Aller sur https://myaccount.google.com/security
   2. Activer l'authentification 2FA
   3. Générer une "App password" pour "Mail" sur "Windows Computer"
`
    console.warn(errorMessage)
    return false
  }

  return true
}
