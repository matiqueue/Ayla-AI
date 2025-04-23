import { NextResponse } from 'next/server'

export async function POST(req: Response) {
  const formData = await req.formData()
  const login = formData.get('login')
  const password = formData.get('password')

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

  const host = req.headers.get('host')
  const protocol = req.headers.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  if (login === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const response = NextResponse.redirect(`${baseUrl}/admin/dashboard`)
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 732,
    })
    return response
  } else {
    return NextResponse.redirect(`${baseUrl}/admin/login?error=1`)
  }
}
