import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/database';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'License Code',
      credentials: {
        code: { label: 'License Code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.code) return null;
        const license = await prisma.license.findUnique({
          where: { code: credentials.code },
          include: { user: true },
        });
        if (!license || license.isUsed || !license.user) return null;
        await prisma.license.update({
          where: { code: credentials.code },
          data: { isUsed: true },
        });
        return { id: license.user.id.toString(), email: license.user.email, name: license.user.username };
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt' as 'jwt',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };