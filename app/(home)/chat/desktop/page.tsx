'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DesktopDownloadPage() {
  const [windowHeight, setWindowHeight] = useState('100vh')
  const [selectedModel, setSelectedModel] = useState('default')

  const models = [
    { id: 'default', name: 'Basic Model' },
    { id: 'advanced', name: 'Advanced Model' },
    { id: 'ollama', name: 'Ollama Model' },
  ]

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
      id="desktop-download-section"
      className="relative overflow-hidden flex items-center p-10"
      style={{ height: windowHeight, minHeight: '600px' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-cyan-500/5 dark:from-black/5 dark:to-black/5 pointer-events-none" />

      {/* Floating background shapes */}
      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-purple-500/10 dark:bg-gray-600/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full bg-cyan-500/10 dark:bg-gray-500/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      {/* Główna zawartość */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Lewa kolumna – Wprowadzenie */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-6 leading-[1.05] overflow-visible bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Download the Desktop Version
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl 3xl:text-3xl text-muted-foreground mb-8 max-w-md mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Choose a model optimized for your workflow. Whether you need a lightweight assistant
              or a powerful AI engine, we’ve got you covered.
            </motion.p>
          </div>

          {/* Prawa kolumna – Sekcja pobierania */}
          <div className="w-full md:w-1/2">
            {/* Sekcja wyboru modelu */}
            <motion.div
              className="flex flex-col items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-lg mb-2">Select a model:</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full max-w-xs px-4 py-2 border border-border rounded-md bg-background text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="2xl:text-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white flex items-center gap-2"
                onClick={() => {
                  alert(`Downloading model: ${selectedModel}`)
                }}
              >
                <Download className="h-5 w-5" />
                Download
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Link href="/chat" className="text-sm text-muted-foreground hover:underline">
                Back to option selection
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
