'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Auth() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await signIn('credentials', {
      code,
      redirect: false,
    });
    if (result?.error) {
      setError('Nieprawidłowy kod licencji');
    } else {
      window.location.href = '/chat/1'; // Domyślny czat o id 1, można dostosować
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Kod licencji"
        required
      />
      <button type="submit">Zaloguj się</button>
      {error && <p>{error}</p>}
    </form>
  );
}