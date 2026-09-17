'use client'

import React from 'react'
import AppIcon from './AppIcon'

/**
 * Error Boundary - Capture les erreurs React et les affiche de manière conviviale
 * Usage: Envelopper les sections critiques avec <ErrorBoundary>
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="py-20 px-6 bg-red-50">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border-2 border-red-200 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                  <AppIcon name="alertTriangle" size={34} strokeWidth={1.8} />
                </div>
                <h2 className="font-display font-bold text-2xl text-red-600 mb-2">
                  Oups! Une erreur s'est produite
                </h2>
                <p className="text-navy/60 mb-6">
                  Nous nous excusons pour ce problème. Essayez de rafraîchir la page.
                </p>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs font-mono text-gray-600 mb-4">
                    <summary className="cursor-pointer font-bold mb-2">
                      Détails de l'erreur (développeur)
                    </summary>
                    <div className="whitespace-pre-wrap break-words">
                      <strong>Message:</strong>
                      {'\n'}
                      {this.state.error.toString()}
                      {'\n\n'}
                      <strong>Stack:</strong>
                      {'\n'}
                      {this.state.errorInfo?.componentStack}
                    </div>
                  </details>
                )}

                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-teal text-white font-bold shadow-card hover:shadow-hover transition-all"
                >
                  Rafraîchir la page
                </button>
              </div>
            </div>
          </div>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
