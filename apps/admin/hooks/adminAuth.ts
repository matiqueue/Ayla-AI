'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const adminAuth = () => {
  const router = useRouter()

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
        }
      } else {
        router.push('/login')
      }
    }
    console.log(
      'Checking auth..hecking auth..hecking auth..hecking auth..hecking auth..hecking auth..hecking auth..hecking auth..hecking auth...'
    )

    checkAuth()
  }, [router])
}
