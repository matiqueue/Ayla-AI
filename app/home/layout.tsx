import { Header } from '@/components/home/header'
import type React from 'react'
import { ClientLayout } from '@/providers/client-layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      <Header />
      <main className="min-h-screen">{children}</main>
    </ClientLayout>
  )
}

{
  /*
  okej, tylko usunales wiekszosc kontentu z sekcji z platnosciami, dodaj tam te cardy z opcjami itd +_ dodaj wiecej kontentu do sekcji "Why Choose AylaAI?" i "Ready to Get Started?" + dodaj pomiedzy sekcjami jakies fajne rzeczy w backgroundzie + dodaj jakis efekt rozmycia pomiedzy backgroundami danych sekcji
  */
}
