import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) return new Response(JSON.stringify({ error: 'Brak emaila' }), { status: 400 })

    const license = await prisma.license.findUnique({ where: { email } })

    return new Response(JSON.stringify({ license }), { status: 200 })
  } catch (err) {
    console.error('GET LICENSE ERROR', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
