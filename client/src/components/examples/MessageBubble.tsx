import MessageBubble from '../MessageBubble';

export default function MessageBubbleExample() {
  const userMessage = {
    id: '1',
    role: 'user' as const,
    content: 'Hello! Can you help me with something?',
    timestamp: Date.now() - 60000,
  };

  const assistantMessage = {
    id: '2',
    role: 'assistant' as const,
    content: 'Of course! I\'d be happy to help you. What do you need assistance with?',
    timestamp: Date.now(),
  };

  const imageMessage = {
    id: '3',
    role: 'user' as const,
    content: 'Check out this image',
    imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
    timestamp: Date.now(),
  };

  return (
    <div className="space-y-4 p-4 bg-background">
      <MessageBubble message={userMessage} />
      <MessageBubble message={assistantMessage} />
      <MessageBubble message={imageMessage} />
    </div>
  );
}
