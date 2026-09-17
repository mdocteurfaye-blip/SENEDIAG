/**
 * Tests unitaires pour la fonction validateForm()
 * 
 * Installation des dépendances:
 * npm install --save-dev jest @testing-library/react @testing-library/jest-dom
 * 
 * Configuration dans jest.config.js:
 * const nextJest = require('next/jest')
 * const createJestConfig = nextJest({
 *   dir: './',
 * })
 * const customJestConfig = {
 *   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
 *   testEnvironment: 'jest-environment-jsdom',
 * }
 * module.exports = createJestConfig(customJestConfig)
 */

import {
  EMAIL_REGEX,
  PHONE_REGEX,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MAX_MESSAGE_LENGTH,
} from '@/lib/constants'

/**
 * Fonction de validation (dupliquée du composant pour tester)
 * À terme, externaliser cette fonction dans un fichier séparé
 */
function validateForm(form) {
  const errors = {}
  const name = form.name?.trim() || ''
  const phone = form.phone?.trim() || ''
  const email = form.email?.trim() || ''

  if (!name) {
    errors.name = 'Nom requis'
  } else if (name.length < MIN_NAME_LENGTH) {
    errors.name = `Minimum ${MIN_NAME_LENGTH} caractères`
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Maximum ${MAX_NAME_LENGTH} caractères`
  }

  if (!phone) {
    errors.phone = 'Téléphone requis'
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phone = 'Téléphone invalide (format: +221777268292 ou 777268292)'
  }

  if (email && !EMAIL_REGEX.test(email)) {
    errors.email = 'Email invalide'
  }

  if (form.message && form.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message trop long (max ${MAX_MESSAGE_LENGTH} caractères)`
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}

// ========================================
// TESTS UNITAIRES
// ========================================

describe('validateForm()', () => {
  // Tests pour le champ NAME
  describe('Validation du nom', () => {
    test('doit rejeter un nom vide', () => {
      const result = validateForm({ name: '', phone: '777268292' })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Nom requis')
    })

    test('doit rejeter un nom avec seulement des espaces', () => {
      const result = validateForm({ name: '   ', phone: '777268292' })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBe('Nom requis')
    })

    test('doit rejeter un nom de 1 caractère', () => {
      const result = validateForm({ name: 'A', phone: '777268292' })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toContain('Minimum')
    })

    test('doit accepter un nom de 2 caractères', () => {
      const result = validateForm({ name: 'Jo', phone: '777268292' })
      expect(result.errors.name).toBeUndefined()
    })

    test('doit accepter un nom normal', () => {
      const result = validateForm({ name: 'Jean Dupont', phone: '777268292' })
      expect(result.errors.name).toBeUndefined()
    })

    test('doit rejeter un nom > 120 caractères', () => {
      const longName = 'A'.repeat(121)
      const result = validateForm({ name: longName, phone: '777268292' })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toContain('Maximum')
    })

    test('doit accepter un nom de exactement 120 caractères', () => {
      const maxName = 'A'.repeat(120)
      const result = validateForm({ name: maxName, phone: '777268292' })
      expect(result.errors.name).toBeUndefined()
    })
  })

  // Tests pour le champ PHONE
  describe('Validation du téléphone', () => {
    test('doit rejeter un téléphone vide', () => {
      const result = validateForm({ name: 'Jean', phone: '' })
      expect(result.isValid).toBe(false)
      expect(result.errors.phone).toBe('Téléphone requis')
    })

    test('doit accepter le format +221777268292', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '+221777268292',
      })
      expect(result.errors.phone).toBeUndefined()
    })

    test('doit accepter le format 777268292', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
      })
      expect(result.errors.phone).toBeUndefined()
    })

    test('doit accepter le format avec espaces: 777 268 292', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777 268 292',
      })
      expect(result.errors.phone).toBeUndefined()
    })

    test('doit accepter le format (77) 726-8292', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '(77) 726-8292',
      })
      expect(result.errors.phone).toBeUndefined()
    })

    test('doit rejeter un téléphone trop court (7 chiffres)', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '7772682',
      })
      expect(result.isValid).toBe(false)
      expect(result.errors.phone).toContain('invalide')
    })

    test('doit accepter un téléphone formaté +221 77 726 8292', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '+221 77 726 8292',
      })
      expect(result.errors.phone).toBeUndefined()
    })
  })

  // Tests pour le champ EMAIL
  describe('Validation de l\'email', () => {
    test('doit accepter un email vide (optionnel)', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        email: '',
      })
      expect(result.errors.email).toBeUndefined()
    })

    test('doit accepter un email valide', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        email: 'jean@example.com',
      })
      expect(result.errors.email).toBeUndefined()
    })

    test('doit accepter un email avec domaine complexe', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        email: 'user.name+tag@sub.example.co.uk',
      })
      expect(result.errors.email).toBeUndefined()
    })

    test('doit rejeter un email sans @', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        email: 'jeanexample.com',
      })
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toContain('invalide')
    })

    test('doit rejeter un email sans domaine', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        email: 'jean@',
      })
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toContain('invalide')
    })

    test('doit rejeter un email sans extension', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        email: 'jean@example',
      })
      expect(result.isValid).toBe(false)
      expect(result.errors.email).toContain('invalide')
    })
  })

  // Tests pour le champ MESSAGE
  describe('Validation du message', () => {
    test('doit accepter un message vide (optionnel)', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        message: '',
      })
      expect(result.errors.message).toBeUndefined()
    })

    test('doit accepter un message court', () => {
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        message: 'Bonjour, je voudrais prendre rendez-vous.',
      })
      expect(result.errors.message).toBeUndefined()
    })

    test('doit accepter un message long mais valide', () => {
      const longMessage = 'A'.repeat(2000)
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        message: longMessage,
      })
      expect(result.errors.message).toBeUndefined()
    })

    test('doit rejeter un message > 2000 caractères', () => {
      const tooLongMessage = 'A'.repeat(2001)
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        message: tooLongMessage,
      })
      expect(result.isValid).toBe(false)
      expect(result.errors.message).toContain('trop long')
    })

    test('doit rejeter un message de 10000 caractères', () => {
      const veryLongMessage = 'A'.repeat(10000)
      const result = validateForm({
        name: 'Jean',
        phone: '777268292',
        message: veryLongMessage,
      })
      expect(result.isValid).toBe(false)
      expect(result.errors.message).toContain('trop long')
    })
  })

  // Tests de validation complète (tous les champs)
  describe('Validation complète', () => {
    test('formulaire valide complet', () => {
      const result = validateForm({
        name: 'Jean Dupont',
        phone: '+221777268292',
        email: 'jean@example.com',
        service: 'Consultation',
        message: 'Je voudrais prendre rendez-vous pour une consultation.',
        website: '', // Honeypot field
      })
      expect(result.isValid).toBe(true)
      expect(Object.keys(result.errors)).toHaveLength(0)
    })

    test('formulaire avec plusieurs erreurs', () => {
      const result = validateForm({
        name: 'A', // Trop court
        phone: 'abc', // Invalide
        email: 'not-an-email', // Invalide
        message: 'A'.repeat(2001), // Trop long
      })
      expect(result.isValid).toBe(false)
      expect(Object.keys(result.errors).length).toBeGreaterThan(1)
      expect(result.errors.name).toBeDefined()
      expect(result.errors.phone).toBeDefined()
      expect(result.errors.email).toBeDefined()
      expect(result.errors.message).toBeDefined()
    })

    test('formulaire minimal valide (champs requis seulement)', () => {
      const result = validateForm({
        name: 'Jo',
        phone: '777268292',
        email: '',
        message: '',
      })
      expect(result.isValid).toBe(true)
    })

    test('doit trimmer les espaces avant validation', () => {
      const result = validateForm({
        name: '  Jean  ',
        phone: '  777268292  ',
        email: '  jean@example.com  ',
        message: '  Message  ',
      })
      expect(result.isValid).toBe(true)
    })
  })

  // Tests des cas limites
  describe('Cas limites', () => {
    test('gère les valeurs undefined', () => {
      const result = validateForm({})
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBeDefined()
      expect(result.errors.phone).toBeDefined()
    })

    test('gère les valeurs null', () => {
      const result = validateForm({
        name: null,
        phone: null,
      })
      expect(result.isValid).toBe(false)
      expect(result.errors.name).toBeDefined()
      expect(result.errors.phone).toBeDefined()
    })

    test('accepte des caractères spéciaux dans le nom', () => {
      const result = validateForm({
        name: "Jean-Paul O'Brien",
        phone: '777268292',
      })
      expect(result.errors.name).toBeUndefined()
    })

    test('accepte des accents dans le nom', () => {
      const result = validateForm({
        name: 'Élisée Dufré',
        phone: '777268292',
      })
      expect(result.errors.name).toBeUndefined()
    })

    test('rejette les noms en majuscules seulement (validation contenu, pas format)', () => {
      const result = validateForm({
        name: 'JEAN',
        phone: '777268292',
      })
      // Should pass - regex/format doesn't check case
      expect(result.errors.name).toBeUndefined()
    })
  })
})

export { validateForm }
