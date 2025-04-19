'use client'

import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@workspace/ui/components/button'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function GenerateLicensePage() {
  const searchParams = useSearchParams()
  const period = searchParams.get('period')
  const { user, isLoaded } = useUser()

  const [status, setStatus] = useState('idle')
  const [license, setLicense] = useState<{
    id: string
    expiresAt: string
  } | null>(null)

  // Map for title adjectives
  const periodAdjectiveMap = {
    week: 'tygodniową',
    month: 'miesięczną',
    year: 'roczną',
  }

  // Map for period display nouns
  const periodNounMap = {
    week: 'tydzień',
    month: 'miesiąc',
    year: 'rok',
  }

  // Dynamic title based on period
  const title =
    period && period in periodAdjectiveMap
      ? `Generuj ${periodAdjectiveMap[period as keyof typeof periodAdjectiveMap]} licencję`
      : 'Generuj licencję'

  const handleGenerate = async () => {
    if (!isLoaded || !user || !period) return

    setStatus('loading')

    try {
      const res = await fetch('/api/generate-license', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          period,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setLicense(data.license)
        setStatus('success')
      } else if (res.status === 409) {
        setStatus('exists')
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Musisz być zalogowany.</p>
      </div>
    )
  }

  if (!period) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Nie podano okresu licencji.</p>
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-background">
      {/* Gradient tła */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-cyan-500/5 dark:from-black/5 dark:to-black/5 pointer-events-none" />

      {/* Animowane kształty w tle */}
      <motion.div
        className="absolute top-20 right-[10%] w-48 h-48 rounded-full bg-purple-500/10 dark:bg-gray-600/20 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 8,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-[10%] w-56 h-56 rounded-full bg-cyan-500/10 dark:bg-gray-500/10 blur-3xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 10,
          ease: 'easeInOut',
        }}
      />

      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <div className="max-w-2xl w-full space-y-8">
          {/* Główna sekcja */}
          <div className="space-y-6 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent leading-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>

            <motion.div
              className="flex flex-col items-center space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg text-muted-foreground">
                <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
              </p>
              <p className="text-lg text-muted-foreground">
                <strong>Okres:</strong>{' '}
                {period && period in periodNounMap
                  ? periodNounMap[period as keyof typeof periodNounMap]
                  : period}
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={status === 'loading'}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 dark:from-gray-800 dark:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-500 text-white transition-all duration-300 transform hover:cursor-pointer"
              >
                {status === 'loading' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {status === 'loading' ? 'Generuję...' : 'Generuj licencję'}
              </Button>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href="/buy-license"
                className="text-sm xl:text-base text-muted-foreground hover:underline"
              >
                Back to option selection
              </Link>
            </motion.div>
          </div>

          {/* Sekcja statusowa */}
          {status === 'success' && license && (
            <motion.div
              className="mt-8 p-6 rounded-lg bg-background/80 border border-border/40 backdrop-blur-xs shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <p className="text-lg font-medium text-green-500">
                  Licencja wygenerowana pomyślnie
                </p>
              </div>
              <div className="space-y-2 text-center">
                <p>
                  <strong>ID:</strong> {license.id}
                </p>
                <p>
                  <strong>Wygasa:</strong> {new Date(license.expiresAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          )}

          {status === 'exists' && (
            <motion.div
              className="mt-8 p-6 rounded-lg bg-background/80 border border-border/40 backdrop-blur-xs shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertCircle className="h-6 w-6 text-yellow-500" />
                <p className="text-lg font-medium text-yellow-500">
                  Licencja już istnieje dla tego adresu e-mail.
                </p>
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              className="mt-8 p-6 rounded-lg bg-background/80 border border-border/40 backdrop-blur-xs shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <p className="text-lg font-medium text-red-500">
                  Wystąpił błąd przy generowaniu licencji.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
