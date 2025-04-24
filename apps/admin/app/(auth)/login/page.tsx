'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

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

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const login = formData.get('login')
    const password = formData.get('password')

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="w-full max-w-sm p-8 bg-white/95 dark:bg-black/95 rounded-none shadow-xl border border-black/10 dark:border-white/10">
        <h2 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
          Logowanie Admina
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="login"
              className="block text-sm font-medium text-neutral-900 dark:text-white/80"
            >
              Login
            </label>
            <input
              id="login"
              type="text"
              name="login"
              className="mt-1 block w-full px-4 py-3 border border-black/10 dark:border-white/10 rounded-none bg-white/95 dark:bg-black/95 text-black dark:text-white placeholder-neutral-700/80 dark:placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all duration-200"
              placeholder="Wpisz login"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-900 dark:text-white/80"
            >
              Hasło
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="mt-1 block w-full px-4 py-3 border border-black/10 dark:border-white/10 rounded-none bg-white/95 dark:bg-black/95 text-black dark:text-white placeholder-neutral-700/80 dark:placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white transition-all duration-200"
                placeholder="Wpisz hasło"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-900 dark:text-white hover:text-neutral-700/80 dark:hover:text-white/80 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold py-3 rounded-none hover:bg-neutral-700/80 dark:hover:bg-white/80 transition-colors duration-200"
          >
            Zaloguj się
          </button>
        </form>
        {error && (
          <p className="mt-6 text-neutral-700/80 dark:text-white/80 text-center font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
