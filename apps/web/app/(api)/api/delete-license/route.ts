import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) return new Response(JSON.stringify({ error: 'Brak emaila' }), { status: 400 })

    await prisma.license.delete({ where: { email } })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error('DELETE LICENSE ERROR', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
