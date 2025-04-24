import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const formData = await req.formData()
  const login = formData.get('login')
  const password = formData.get('password')

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  if (login === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false, error: 'Invalid credentials' })
  }
}
