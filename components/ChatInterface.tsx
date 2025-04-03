'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ChatInterface({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (session) {
      fetch(`/api/chat/${chatId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data.messages || []));
    }
  }, [session, chatId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content) return;
    await fetch(`/api/chat/${chatId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    setContent('');
    const res = await fetch(`/api/chat/${chatId}`);
    const data = await res.json();
    setMessages(data.messages || []);
  }

  return (
    <div>
      <div>
        {messages.map((message) => (
          <p key={message.id}>{message.content}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Wiadomość"
        />
        <button type="submit">Wyślij</button>
      </form>
    </div>
  );
}