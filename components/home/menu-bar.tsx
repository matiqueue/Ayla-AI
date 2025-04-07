'use client'

import type * as React from 'react'
import { motion } from 'framer-motion'
import { Home, User, BookOpen, MessageSquare, Sparkles } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
  sectionId?: string // Optional section ID for smooth scrolling
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: 'Home',
    href: '/home',
    gradient:
      'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
    iconColor: 'text-blue-500',
    sectionId: 'hero-section',
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    label: 'Features',
    href: '/home#features',
    gradient:
      'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)',
    iconColor: 'text-orange-500',
    sectionId: 'features-section',
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    label: 'Testimonials',
    href: '/home#testimonials',
    gradient:
      'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)',
    iconColor: 'text-purple-500',
    sectionId: 'testimonials-section',
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    label: 'Chat',
    href: '/chat',
    gradient:
      'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(5,150,105,0.06) 50%, rgba(4,120,87,0) 100%)',
    iconColor: 'text-emerald-500',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: 'Docs',
    href: '/docs',
    gradient:
      'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)',
    iconColor: 'text-green-500',
  },
  {
    icon: <User className="h-5 w-5" />,
    label: 'Profile',
    href: '/profile',
    gradient:
      'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)',
    iconColor: 'text-red-500',
  },
]

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: 'spring', stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function MenuBar() {
  const { theme } = useTheme()
  const pathname = usePathname()
  const isDarkTheme = theme === 'dark'

  const handleNavigation = (e: React.MouseEvent, item: MenuItem) => {
    // If we're on the homepage and there's a section ID, scroll to it
    if (pathname === '/' && item.sectionId) {
      e.preventDefault()

      // Find the section in the scroll container
      const scrollContainer = document.getElementById('scroll-container')
      const sections = document.querySelectorAll('.snap-section')

      // Find the index of the section
      let sectionIndex = -1
      sections.forEach((section, index) => {
        if (section.querySelector(`#${item.sectionId}`)) {
          sectionIndex = index
        }
      })

      // If found, scroll to it
      if (sectionIndex >= 0 && scrollContainer) {
        scrollContainer.scrollTo({
          top: sectionIndex * window.innerHeight,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <motion.nav
      className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden dark:from-background/80 dark:to-background/40"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`absolute -inset-2 bg-gradient-radial from-transparent ${
          isDarkTheme ? 'via-blue-400/30 via-60%' : 'via-blue-400/20 via-60%'
        } to-transparent rounded-3xl z-0 pointer-events-none`}
        variants={navGlowVariants}
      />
      <ul className="flex items-center gap-2 relative z-10">
        {menuItems.map((item) => (
          <motion.li key={item.label} className="relative">
            <motion.div
              className="block rounded-xl overflow-visible group relative"
              style={{ perspective: '600px' }}
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={glowVariants}
                style={{
                  background: item.gradient,
                  opacity: 0,
                  borderRadius: '16px',
                }}
              />
              <motion.div
                className={`flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl ${
                  pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                }`}
                variants={itemVariants}
                transition={sharedTransition}
                style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
              >
                <span
                  className={`transition-colors duration-300 ${pathname === item.href ? item.iconColor : ''}`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </motion.div>
              <Link href={item.href} passHref>
                <motion.a
                  className={`flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl ${
                    pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center top',
                    rotateX: 90,
                  }}
                  onClick={(e) => handleNavigation(e, item)}
                >
                  <span
                    className={`transition-colors duration-300 ${pathname === item.href ? item.iconColor : ''}`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.a>
              </Link>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}
