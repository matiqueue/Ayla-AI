'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@workspace/ui/components/alert-dialog'
import { Button } from '@workspace/ui/components/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LicenseInfoPage() {
  const { user, isLoaded } = useUser()
  interface License {
    expiresAt: string
  }
  const [license, setLicense] = useState<License | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const fetchLicense = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/get-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })

    const data = await res.json()
    setLicense(data.license || null)
    setLoading(false)
  }, [user?.primaryEmailAddress?.emailAddress])

  const deleteLicense = async () => {
    setDeleting(true)
    await fetch('/api/delete-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })
    setDeleting(false)
    setLicense(null)
  }

  useEffect(() => {
    if (isLoaded && user) {
      fetchLicense()
    }
  }, [isLoaded, user, fetchLicense])

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

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-background">
      {/* Gradient tła */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-cyan-500/5 dark:from-black/5 dark:to-black/5 pointer-events-none" />

      {/* Animowane kształty w tle */}
      <motion.div
        className="absolute top-20 right-[10%] w-48 h-48 rounded-full bg-purple-500/10 dark:bg-gray-600/20 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-[10%] w-56 h-56 rounded-full bg-cyan-500/10 dark:bg-gray-500/10 blur-3xl"
        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-gray-400 dark:to-gray-200 bg-clip-text text-transparent leading-normal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Licencja
          </motion.h1>

          {loading ? (
            <p className="text-lg text-muted-foreground">Sprawdzanie licencji...</p>
          ) : license ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-green-100 dark:bg-green-900 custom:bg-green-900 border border-green-300 dark:border-green-700 custom:border-green-700 p-4 rounded-xl space-y-2">
                <p className="text-green-800 dark:text-green-200 custom:text-green-200">
                  ✅ Masz już aktywną licencję.
                </p>
                <p className="text-green-800 dark:text-green-200 custom:text-green-200">
                  <strong>Wygasa:</strong> {new Date(license.expiresAt).toLocaleString('pl-PL')}
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="hover:cursor-pointer dark:bg-red-800 dark:hover:bg-red-900"
                  >
                    Anuluj licencję
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="light:bg-white">
                  <AlertDialogTitle>Na pewno?</AlertDialogTitle>
                  <AlertDialogDescription className="light:text-muted-foreground">
                    Tej operacji nie można cofnąć. Nie dostaniesz zwrotu pieniędzy ani przeprosin 😈
                  </AlertDialogDescription>
                  <div className="flex justify-end space-x-2 mt-4">
                    <AlertDialogCancel className="hover:cursor-pointer">
                      Jednak nie
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={deleteLicense}
                      disabled={deleting}
                      className="bg-red-600 hover:bg-red-700 hover:cursor-pointer custom:text-white"
                    >
                      Usuń licencję
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          ) : (
            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Nie masz jeszcze aktywnej licencji.{' '}
              <Link href="/buy-license" className="font-bold hover:underline cursor-pointer">
                Przejdź na stronę zakupu.
              </Link>
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
