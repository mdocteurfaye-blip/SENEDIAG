/**
 * Instrumentation Next.js - Exécutée au démarrage du serveur
 * Voir: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Only run on server side
    const { checkEnvironmentVariables } = require('@/lib/checkEnv')
    checkEnvironmentVariables()
  }
}
