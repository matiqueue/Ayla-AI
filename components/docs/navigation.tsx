'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const navItems = [
  { name: 'Introduction', href: '/' },
  { name: 'Getting Started', href: '/getting-started' },
  { name: 'Components', href: '/components' },
  { name: 'API Reference', href: '/api-reference' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 z-50 flex w-72 flex-col border-r">
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <Link href="/docs" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">Docs</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={`w-full justify-start ${pathname === item.href ? 'bg-muted' : ''}`}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
