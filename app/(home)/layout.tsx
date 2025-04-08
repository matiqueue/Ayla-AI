import { Header } from '@/components/home/header'
import type React from 'react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
    </>
  )
}
