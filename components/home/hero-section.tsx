'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [windowHeight, setWindowHeight] = useState('100vh')

  useEffect(() => {
    const setHeight = () => {
      setWindowHeight(`${window.innerHeight}px`)
    }

    setHeight()
    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [])

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden flex flex-col justify-center"
      style={{ height: windowHeight, minHeight: '600px' }}
    >
      {/* Gradient tła */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-cyan-500/5 dark:from-black dark:to-black pointer-events-none" />

      {/* Animowane kształty w tle */}
      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-purple-500/10 dark:bg-gray-600/30 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-gray-500/10 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 10,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border border-border/40 backdrop-blur-xs mb-6 dark:bg-background/50"
          >
            <Sparkles className="h-4 w-4 text-purple-500 dark:text-gray-500" />
            <span className="text-sm font-medium">Introducing AylaAI - Your AI Assistant</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Supercharge Your Workflow with AI
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            AylaAI helps you automate tasks, generate content, and get insights from your data.
            Experience the power of artificial intelligence designed for everyday use.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white"
            >
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs" className="group">
                View Documentation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
