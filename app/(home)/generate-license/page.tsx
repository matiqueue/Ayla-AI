'use client'

import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function GenerateLicensePage() {
  const searchParams = useSearchParams()
  const period = searchParams.get('period')
  const { user, isLoaded } = useUser()

  interface License {
    id: string
    expiresAt: string
  }

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'exists'>('idle')
  const [license, setLicense] = useState<License | null>(null)

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

  if (!isLoaded) return <p>Ładowanie użytkownika...</p>
  if (!user) return <p>Musisz być zalogowany.</p>
  if (!period) return <p>Nie podano okresu licencji.</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Generuj licencję</h1>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      <p>Okres: {period}</p>

      <button onClick={handleGenerate} disabled={status === 'loading'}>
        {status === 'loading' ? 'Generuję...' : 'Generuj licencję'}
      </button>

      {status === 'success' && license && (
        <div style={{ marginTop: '1rem', color: 'green' }}>
          <p>
            <strong>ID:</strong> {license.id}
          </p>
          <p>
            <strong>Wygasa:</strong> {new Date(license.expiresAt).toLocaleString()}
          </p>
        </div>
      )}
      {status === 'exists' && (
        <p style={{ marginTop: '1rem', color: 'orange' }}>
          Licencja już istnieje dla tego adresu e-mail.
        </p>
      )}
      {status === 'error' && (
        <p style={{ marginTop: '1rem', color: 'red' }}>Wystąpił błąd przy generowaniu licencji.</p>
      )}
    </div>
  )
}
