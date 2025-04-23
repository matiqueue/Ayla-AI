'use client'

import { adminAuth } from '@/hooks/adminAuth'

export default function AuthComponent() {
  adminAuth()
  return null
}
