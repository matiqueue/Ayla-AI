'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Book, Code2, FileText, HelpCircle, Home, Lightbulb, Search } from 'lucide-react'
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from 'next-themes'
import { ModeToggle } from '@/components/mode-toggle'
import { FloatingThemeToggle } from '@/components/ui/floating-theme-toggle'
import { DocFooter } from '@/components/docs/doc-footer'

const sidebarSections = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Introduction', href: '#introduction', icon: Home },
      { title: 'Installation', href: '#installation', icon: FileText },
      { title: 'Quick Start', href: '#quick-start', icon: Lightbulb },
    ],
  },
  {
    title: 'Core Concepts',
    links: [
      { title: 'Features', href: '#features', icon: Lightbulb },
      { title: 'Architecture', href: '#architecture', icon: Book },
    ],
  },
  {
    title: 'API Reference',
    links: [
      { title: 'Authentication', href: '#authentication', icon: Code2 },
      { title: 'Endpoints', href: '#endpoints', icon: Code2 },
    ],
  },
  {
    title: 'Guides',
    links: [{ title: 'FAQ', href: '#faq', icon: HelpCircle }],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>('#introduction')
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')

      let currentSection = '#introduction'
      let minDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const distance = Math.abs(sectionTop - 100)

        if (distance < minDistance) {
          minDistance = distance
          currentSection = `#${section.id}`
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 flex h-16 w-screen items-center gap-4 border-b bg-background px-4 md:px-6">
          <SidebarTrigger />
          <Link href="/home" className="flex items-center gap-2 font-semibold">
            <Book className="h-6 w-6" />
            <span>Documentation</span>
          </Link>
          <div className="relative ml-auto hidden md:flex md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documentation..."
              className="w-full bg-background pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`theme-indicator ${theme === 'dark' ? 'dark' : 'light'} hidden md:inline-flex`}
            >
              {theme === 'dark' ? 'Dark' : 'Light'}
            </span>
            <ModeToggle />
          </div>
        </header>

        <div className="flex flex-1">
          <Sidebar className="transition-transform duration-300">
            <SidebarHeader className="border-b">
              <div className="relative p-2">
                <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="w-full bg-background pl-8"
                />
              </div>
            </SidebarHeader>

            <SidebarContent>
              {sidebarSections.map((section, i) => (
                <SidebarGroup key={i}>
                  <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {section.links.map((link, j) => (
                        <SidebarMenuItem key={j}>
                          <SidebarMenuButton
                            asChild
                            isActive={activeSection === link.href}
                            tooltip={link.title}
                          >
                            <a href={link.href}>
                              <link.icon className="h-4 w-4" />
                              <span>{link.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter>
              <div className="p-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Our support team is available 24/7 to assist you.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    Contact Support
                  </Button>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 flex flex-col">
            <main className="flex-1 overflow-hidden transition-all duration-300 mx-auto md:max-w-4xl">
              <div className="h-full overflow-y-auto">{children}</div>
            </main>

            <footer className="mt-auto border-t bg-background">
              <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
                <DocFooter />
              </div>
            </footer>
          </div>
        </div>

        <FloatingThemeToggle />
      </div>
    </SidebarProvider>
  )
}
