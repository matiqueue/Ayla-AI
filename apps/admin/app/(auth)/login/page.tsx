'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')

  useEffect(() => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      if (match) return match[2]
      return null
    }

    const isAdmin = getCookie('admin-auth')

    if (isAdmin === 'true') {
      router.push('/dashboard')
    }
    console.log('isAdmin', isAdmin)
  }, [])

  return (
    <div>
      <div>Stronka do logowania admina</div>
      <form action="/api/login" method="post">
        <h1> Podaj login: </h1>
        <input type="text" name="login" />
        <h1> Podaj hasło: </h1>
        <input type="password" name="password" />
        <button type="submit">Zaloguj się</button>
      </form>
      {error && <p style={{ color: 'red' }}>Niepoprawny login lub hasło</p>}
    </div>
  )
}
