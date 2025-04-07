'use client'

import { useState, useEffect, useRef } from 'react'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturesSection } from '@/components/home/features-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { CTASection } from '@/components/home/cta-section'
import { SectionNavigator } from '@/components/home/section-navigator'

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [isScrolling, setIsScrolling] = useState(false)
  const sections = ['Home', 'Features', 'Testimonials', 'Get Started']

  // Enable smooth scrolling for the home page
  useEffect(() => {
    // Ensure body and html have proper overflow settings for the home page
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      // Cleanup when component unmounts
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

  // Handle wheel events to control scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isScrolling) return

      setIsScrolling(true)

      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // Scroll down
        setCurrentSection((prev) => prev + 1)
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up
        setCurrentSection((prev) => prev - 1)
      }

      setTimeout(() => setIsScrolling(false), 800) // Debounce scrolling
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [currentSection, sections.length, isScrolling])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection < sections.length - 1) {
        e.preventDefault()
        setIsScrolling(true)
        setCurrentSection((prev) => prev + 1)
        setTimeout(() => setIsScrolling(false), 800)
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection > 0) {
        e.preventDefault()
        setIsScrolling(true)
        setCurrentSection((prev) => prev - 1)
        setTimeout(() => setIsScrolling(false), 800)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, sections.length, isScrolling])

  // Scroll to the current section
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: currentSection * window.innerHeight,
        behavior: 'smooth',
      })
    }
  }, [currentSection])

  const handleSectionChange = (index: number) => {
    setCurrentSection(index)
  }

  const navigateSection = (direction: 'up' | 'down') => {
    if (isScrolling) return

    setIsScrolling(true)
    if (direction === 'down' && currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1)
    } else if (direction === 'up' && currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
    }
    setTimeout(() => setIsScrolling(false), 800)
  }

  return (
    <>
      <div
        id="scroll-container"
        ref={scrollContainerRef}
        className="snap-container h-screen overflow-y-auto"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        <section className="snap-section">
          <HeroSection />
        </section>

        <section className="snap-section">
          <FeaturesSection />
        </section>

        <section className="snap-section">
          <TestimonialsSection />
        </section>

        <section className="snap-section">
          <CTASection />
        </section>
      </div>

      <SectionNavigator sections={sections} onSectionChange={handleSectionChange} />

      {/* Navigation arrows */}
      <div className="fixed left-1/2 transform -translate-x-1/2 z-40 flex flex-col gap-4">
        {currentSection > 0 && (
          <motion.button
            className="p-2 rounded-full bg-background/50 dark:bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:hover:bg-background/80 transition-colors"
            onClick={() => navigateSection('up')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ top: '20px', position: 'fixed' }}
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}

        {currentSection < sections.length - 1 && (
          <motion.button
            className="p-2 rounded-full bg-background/50 dark:bg-background/50 backdrop-blur-sm hover:bg-background/80 dark:hover:bg-background/80 transition-colors"
            onClick={() => navigateSection('down')}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ bottom: '20px', position: 'fixed' }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.button>
        )}
      </div>
    </>
  )
}
