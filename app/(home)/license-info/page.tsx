'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export default function GenerateLicensePage() {
  const { user, isLoaded } = useUser()
  interface License {
    expiresAt: string
  }
  const [license, setLicense] = useState<License | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const fetchLicense = async () => {
    setLoading(true)
    const res = await fetch('/api/get-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })

    const data = await res.json()
    setLicense(data.license || null)
    setLoading(false)
  }

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
  }, [isLoaded, user])

  if (!isLoaded) return <p className="p-4">Ładowanie...</p>
  if (!user) return <p className="p-4">Musisz być zalogowany.</p>

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Licencja</h1>

      {loading ? (
        <p>Sprawdzanie licencji...</p>
      ) : license ? (
        <div className="bg-green-100 border border-green-300 p-4 rounded-xl space-y-2">
          <p>✅ Masz już aktywną licencję.</p>
          <p>
            <strong>Wygasa:</strong> {new Date(license.expiresAt).toLocaleString('pl-PL')}
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Anuluj licencję</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogTitle>Na pewno?</AlertDialogTitle>
              <AlertDialogDescription>
                Tej operacji nie można cofnąć. Nie dostaniesz zwrotu pieniędzy ani przeprosin 😈
              </AlertDialogDescription>
              <div className="flex justify-end space-x-2 mt-4">
                <AlertDialogCancel>Jednak nie</AlertDialogCancel>
                <AlertDialogAction
                  onClick={deleteLicense}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Usuń licencję
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <p>Nie masz jeszcze aktywnej licencji. Przejdź na stronę zakupu.</p>
      )}
    </div>
  )
}
