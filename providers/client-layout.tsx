'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // Apply home-page class only to the html element when on home page
  useEffect(() => {
    if (isHomePage) {
      document.documentElement.classList.add('home-page')
      document.body.classList.add('home-page')
    } else {
      document.documentElement.classList.remove('home-page')
      document.body.classList.remove('home-page')
    }
  }, [isHomePage])

  return <>{children}</>
}
