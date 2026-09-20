'use client'

import ErrorBoundary from '@/components/ErrorBoundary'

export function LayoutClient({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}
