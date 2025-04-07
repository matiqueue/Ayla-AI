'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SectionNavigatorProps {
  sections: string[]
  onSectionChange: (index: number) => void
}

export function SectionNavigator({ sections, onSectionChange }: SectionNavigatorProps) {
  const [activeSection, setActiveSection] = useState(0)

  const handleDotClick = (index: number) => {
    setActiveSection(index)
    onSectionChange(index)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.getElementById('scroll-container')
      if (scrollContainer) {
        const scrollPosition = scrollContainer.scrollTop
        const windowHeight = window.innerHeight
        const currentIndex = Math.round(scrollPosition / windowHeight)

        if (currentIndex !== activeSection) {
          setActiveSection(currentIndex)
        }
      }
    }

    const scrollContainer = document.getElementById('scroll-container')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [activeSection])

  return (
    <div className="section-dots">
      {sections.map((section, index) => (
        <motion.div
          key={section}
          className={`section-dot ${activeSection === index ? 'active' : ''}`}
          onClick={() => handleDotClick(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title={section}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  )
}
