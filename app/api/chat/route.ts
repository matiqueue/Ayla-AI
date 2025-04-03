import { NextResponse } from 'next/server';
import prisma from '@/database/index';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const chat = await prisma.chat.create({
    data: { userId: parseInt(session.user.id), title: 'Nowy czat' },
  });
  return NextResponse.json(chat);
}