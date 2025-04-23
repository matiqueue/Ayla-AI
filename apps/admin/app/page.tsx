'use client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleAuth = () => {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      if (match) return match[2]
      return null
    }

    const isAdmin = getCookie('admin-auth')

    console.log('isAdmin', isAdmin)
    if (isAdmin === 'true') {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <div>
      <h1>Witaj w panelu admina, zaloguj sie aby kontynuowac: </h1>
      <button onClick={handleAuth}>Zaloguj się</button>
    </div>
  )
}
