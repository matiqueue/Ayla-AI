import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, period } = body

    console.log('Received:', { email, period })

    if (!email || !period) {
      return new Response(JSON.stringify({ error: 'Missing data' }), { status: 400 })
    }

    const existing = await prisma.license.findUnique({ where: { email } })
    console.log('Existing license:', existing)

    if (existing) {
      return new Response(JSON.stringify({ error: 'License already exists for this email' }), {
        status: 409,
      })
    }

    const now = new Date()
    const expiresAt = new Date(now)

    switch (period) {
      case 'week':
        expiresAt.setDate(expiresAt.getDate() + 7)
        break
      case 'month':
        expiresAt.setMonth(expiresAt.getMonth() + 1)
        break
      case 'year':
        expiresAt.setFullYear(expiresAt.getFullYear() + 1)
        break
      default:
        return new Response(JSON.stringify({ error: 'Invalid period' }), { status: 400 })
    }

    const license = await prisma.license.create({
      data: {
        id: crypto.randomUUID(),
        email,
        period,
        expiresAt,
      },
    })

    console.log('Created license:', license)

    return new Response(JSON.stringify({ license }), { status: 200 })
  } catch (error) {
    console.error('API ERROR:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}
