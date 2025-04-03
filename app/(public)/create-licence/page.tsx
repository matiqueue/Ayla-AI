import { redirect } from 'next/navigation';
import prisma from '@/database';
import { generateLicenceCode } from '@/utils/generateLicenceCode';

export default function CreateLicence() {
  async function createLicence(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    if (!email || !username) throw new Error('Email i nazwa użytkownika są wymagane');
    const code = generateLicenceCode();
    const user = await prisma.user.create({
      data: { email, username, licenceCode: code },
    });
    await prisma.license.create({
      data: { code, userId: user.id },
    });
    redirect('/');
  }

  return (
    <form action={createLicence}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="text" name="username" placeholder="Nazwa użytkownika" required />
      <button type="submit">Stwórz licencję</button>
    </form>
  );
}