/**
 * Client-side Rate Limiter
 * Limite le nombre de soumissions de formulaire pour prévenir le spam
 */

/**
 * Simple rate limiter utility
 * @param {number} maxRequests - Nombre maximum de requêtes
 * @param {number} windowMs - Fenêtre de temps en millisecondes
 * @returns {Object} Objet avec méthodes isAllowed() et getRemainingTime()
 */
export function createRateLimiter(maxRequests = 5, windowMs = 60000) {
  const requestTimes = []

  return {
    /**
     * Vérifie si une nouvelle requête est autorisée
     * @returns {Object} { allowed: boolean, remaining: number, resetAt: number }
     */
    isAllowed() {
      const now = Date.now()
      
      // Nettoyer les requêtes en dehors de la fenêtre
      while (requestTimes.length > 0 && requestTimes[0] < now - windowMs) {
        requestTimes.shift()
      }

      if (requestTimes.length < maxRequests) {
        requestTimes.push(now)
        return {
          allowed: true,
          remaining: maxRequests - requestTimes.length,
          resetAt: requestTimes[0] ? requestTimes[0] + windowMs : now + windowMs,
        }
      }

      return {
        allowed: false,
        remaining: 0,
        resetAt: requestTimes[0] + windowMs,
      }
    },

    /**
     * Obtient le temps restant avant la prochaine requête
     * @returns {number} Temps en millisecondes
     */
    getRemainingTime() {
      const now = Date.now()
      if (requestTimes.length === 0) return 0
      
      const oldestRequest = requestTimes[0]
      const resetTime = oldestRequest + windowMs
      
      return Math.max(0, resetTime - now)
    },

    /**
     * Réinitialise le rate limiter
     */
    reset() {
      requestTimes.length = 0
    },

    /**
     * Obtient le nombre de requêtes restantes
     * @returns {number}
     */
    getRemaining() {
      const now = Date.now()
      while (requestTimes.length > 0 && requestTimes[0] < now - windowMs) {
        requestTimes.shift()
      }
      return maxRequests - requestTimes.length
    },
  }
}

/**
 * Hook React pour utiliser le rate limiter
 * @param {number} maxRequests - Nombre maximum de requêtes (défaut: 5)
 * @param {number} windowMs - Fenêtre de temps en ms (défaut: 60000 = 1 min)
 * @returns {Object} Limiter object
 */
export function useRateLimiter(maxRequests = 5, windowMs = 60000) {
  const limiterRef = require('react').useRef(
    createRateLimiter(maxRequests, windowMs)
  ).current

  return limiterRef
}

/**
 * Décorateur pour rate-limiter une fonction
 * @param {Function} fn - Fonction à limiter
 * @param {number} maxRequests - Nombre maximum d'appels
 * @param {number} windowMs - Fenêtre de temps
 * @returns {Function} Fonction décorée
 */
export function withRateLimit(fn, maxRequests = 5, windowMs = 60000) {
  const limiter = createRateLimiter(maxRequests, windowMs)

  return async function rateLimitedFn(...args) {
    const check = limiter.isAllowed()

    if (!check.allowed) {
      const remainingSeconds = Math.ceil(check.resetAt - Date.now()) / 1000
      throw new Error(
        `Rate limit exceeded. Réessayez dans ${remainingSeconds} secondes.`
      )
    }

    return fn(...args)
  }
}
