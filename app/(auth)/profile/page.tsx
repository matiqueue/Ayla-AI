import { getServerSession } from 'next-auth/next';
import prisma from '@/database/index';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) return <p>Nie jesteś zalogowany</p>;

  if (!session.user) return <p>Nie jesteś zalogowany</p>;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
  });
  if (!user) return <p>Użytkownik nie znaleziony</p>;

  async function updateProfile(formData: FormData) {
    'use server';
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const profilePicture = formData.get('profilePicture') as string;
    if (!user) {
      throw new Error('User not found');
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { firstName, lastName, profilePicture },
    });
  }

  return (
    <form action={updateProfile}>
      <input type="text" name="firstName" defaultValue={user.firstName || ''} placeholder="Imię" />
      <input type="text" name="lastName" defaultValue={user.lastName || ''} placeholder="Nazwisko" />
      <input
        type="text"
        name="profilePicture"
        defaultValue={user.profilePicture || ''}
        placeholder="Zdjęcie profilowe"
      />
      <button type="submit">Zapisz</button>
    </form>
  );
}