import { NextResponse } from 'next/server';
import  prisma  from '@/database/index';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const chat = await prisma.chat.findUnique({
    where: { id: parseInt(params.id) },
    include: { messages: true },
  });
  if (!chat || !session.user || chat.userId !== parseInt(session.user.id))
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  return NextResponse.json(chat);
}