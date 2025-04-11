'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare, Monitor } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ChatOptionsPage() {
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
      id="chat-options-section"
      className="relative overflow-hidden flex flex-col justify-center"
      style={{ height: windowHeight, minHeight: '600px' }}
    >
      {/* Gradient tła */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-cyan-500/5 dark:from-black/5 dark:to-black/5 pointer-events-none" />

      {/* Animowane kształty w tle */}
      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-purple-500/10 dark:bg-gray-600/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
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
          repeat: Infinity,
          duration: 10,
          ease: 'easeInOut',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Krótka informacja lub nagłówek */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 border border-border/40 backdrop-blur-xs mb-6 dark:bg-background/50"
          >
            <MessageSquare className="h-4 w-4 text-purple-500 dark:text-gray-500" />
            <span className="text-sm font-medium xl:text-lg">Choose Your Path with AylaAI</span>
          </motion.div>

          {/* Nagłówek strony */}
          <motion.h1
            className="mt-[-20] text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-6 leading-[1.3] overflow-visible bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose an option to start your journey
          </motion.h1>

          {/* Krótki opis */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl 3xl:text-3xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            How would you like to use AylaAI today?
          </motion.p>

          {/* Przyciski nawigacyjne */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="2xl:text-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white flex items-center gap-2"
              asChild
            >
              <Link href="/chat">
                <MessageSquare className="h-5 w-5" />
                Use AylaAI Chat in Browser
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="2xl:text-xl flex items-center gap-2"
            >
              <Link href="/download" className="group">
                <Monitor className="h-5 w-5" />
                Download AylaAI Desktop App
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
