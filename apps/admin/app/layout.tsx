import { Geist, Geist_Mono } from 'next/font/google'

import '@workspace/ui/styles/admin.css'
import { Providers } from '@/components/providers'
import AuthComponent from '@/components/dashboard/authComponent'

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable}`}>
        <Providers>
          <AuthComponent />
          {children}
        </Providers>
      </body>
    </html>
  )
}
