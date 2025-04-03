'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const { data: session } = useSession();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (session) {
      fetch('/api/user/chats')
        .then((res) => res.json())
        .then((data) => setChats(data));
    }
  }, [session]);

  const createChat = async () => {
    const res = await fetch('/api/chat', { method: 'POST' });
    if (res.ok) {
      const newChat = await res.json();
      window.location.href = `/chat/${newChat.id}`;
    }
  };

  return (
    <aside style={{ width: '250px', padding: '20px' }}>
      <h2>Historia czatów</h2>
      <ul>
        {chats.map((chat: any) => (
          <li key={chat.id}>
            <Link href={`/chat/${chat.id}`}>{chat.title || 'Nowy czat'}</Link>
          </li>
        ))}
      </ul>
      <button onClick={createChat}>Nowy czat</button>
      <input type="text" placeholder="Szukaj..." style={{ marginTop: '20px', width: '100%' }} />
      <Link href="/profile">
        <button style={{ marginTop: '20px' }}>Profil użytkownika</button>
      </Link>
    </aside>
  );
}