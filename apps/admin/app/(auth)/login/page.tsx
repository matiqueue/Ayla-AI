'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const login = sessionStorage.getItem('login')
      const password = sessionStorage.getItem('password')
      const isAdmin = sessionStorage.getItem('admin-auth')

      if (login && password && isAdmin === 'true') {
        const res = await fetch('/api/verification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, password }),
        })

        const data = await res.json()

        if (data.valid) {
          router.push('/dashboard')
        } else {
          sessionStorage.clear()
        }
      }
    }

    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const login = formData.get('login') as string
    const password = formData.get('password') as string

    const res = await fetch('/api/login', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    if (data.success) {
      sessionStorage.setItem('admin-auth', 'true')
      sessionStorage.setItem('login', login)
      sessionStorage.setItem('password', password)
      router.push('/dashboard')
    } else {
      setError('Niepoprawny login lub hasło')
    }
  }

  const getProducts = async () => {
    const res = await fetch('/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <div>Stronka do logowania admina</div>
      <form onSubmit={handleLogin}>
        <h1>Podaj login:</h1>
        <input type="text" name="login" />
        <h1>Podaj hasło:</h1>
        <input type="password" name="password" />
        <button type="submit">Zaloguj się</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={getProducts}>wypisz produkty</button>
    </div>
  )
}
