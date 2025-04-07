'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { MenuBar } from '@/components/home/menu-bar'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  //   const scrollToSection = (sectionIndex: number) => {
  //     const scrollContainer = document.getElementById('scroll-container')
  //     if (scrollContainer) {
  //       const sections = document.querySelectorAll('.snap-section')
  //       if (sections[sectionIndex]) {
  //         scrollContainer.scrollTo({
  //           top: sectionIndex * window.innerHeight,
  //           behavior: 'smooth',
  //         })
  //         setCurrentSection(sectionIndex)
  //       }
  //     }
  //   }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentSection > 0
          ? 'bg-background/80 backdrop-blur-lg shadow-md py-2 dark:bg-black/80'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              duration: 2,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="h-6 w-6 text-purple-500" />
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
            AylaAI
          </span>
        </Link>

        <div className="hidden md:block">
          <MenuBar />
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
