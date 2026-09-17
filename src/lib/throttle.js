/**
 * Utility pour optimiser les performances
 * - throttle: Limite la fréquence d'exécution d'une fonction
 * - useThrottle: Hook pour utiliser throttle avec React
 */

/**
 * Crée une version throttlée d'une fonction
 * @param {Function} func - Fonction à throttler
 * @param {number} wait - Délai minimum entre appels (ms)
 * @returns {Function} Fonction throttlée
 */
export function throttle(func, wait = 100) {
  let timeout = null
  let previous = 0

  return function executedFunction(...args) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * Hook React pour utiliser throttle
 * @param {Function} callback - Fonction à throttler
 * @param {number} delay - Délai en ms
 * @returns {Function} Fonction throttlée stable
 */
export function useThrottle(callback, delay = 100) {
  const callbackRef = require('react').useRef(callback)
  const throttledRef = require('react').useRef(null)

  require('react').useLayoutEffect(() => {
    callbackRef.current = callback
  }, [callback])

  require('react').useMemo(() => {
    throttledRef.current = throttle((...args) => {
      if (callbackRef.current) {
        callbackRef.current(...args)
      }
    }, delay)
  }, [delay])

  return throttledRef.current
}
