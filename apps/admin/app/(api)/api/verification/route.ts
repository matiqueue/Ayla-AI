import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { login, password } = await req.json()

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  if (login === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return NextResponse.json({ valid: true })
  } else {
    return NextResponse.json({ valid: false })
  }
}
