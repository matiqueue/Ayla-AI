'use client'

import * as React from 'react'
import { ThemeProvider } from '@/providers/theme-provider'

import { ClientLayout } from './client-layout'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClientLayout>{children}</ClientLayout>
    </ThemeProvider>
  )
}
