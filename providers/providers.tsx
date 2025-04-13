'use client'

import * as React from 'react'
import { ThemeProvider } from '@/providers/theme-provider'
import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'

import { ClientLayout } from './client-layout'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="light" themes={['light', 'dark', 'custom']}>
        <ClientLayout>{children}</ClientLayout>
      </ThemeProvider>
    </ClerkProvider>
  )
}
