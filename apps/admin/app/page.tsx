'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

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
    } else {
      sessionStorage.clear()
      router.push('/login')
    }
  }

  return (
    <div>
      <h1>Witaj w panelu admina, zaloguj sie aby kontynuowac: </h1>
      <button onClick={checkAuth}>Zaloguj się</button>
    </div>
  )
}
