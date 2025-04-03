import ChatInterface from '@/components/ChatInterface';

export default function ChatPage({ params }: { params: { id: string } }) {
  return <ChatInterface chatId={params.id} />;
}