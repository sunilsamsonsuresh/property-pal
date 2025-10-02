import MessagesContainer from '../MessagesContainer';

export default function MessagesContainerExample() {
  const messages = [
    {
      id: '1',
      role: 'user' as const,
      content: 'Hello! Can you help me with something?',
      timestamp: Date.now() - 120000,
    },
    {
      id: '2',
      role: 'assistant' as const,
      content: 'Of course! I\'d be happy to help you. What do you need assistance with?',
      timestamp: Date.now() - 60000,
    },
    {
      id: '3',
      role: 'user' as const,
      content: 'I need information about your capabilities',
      timestamp: Date.now(),
    },
  ];

  return (
    <div className="h-screen bg-background">
      <MessagesContainer messages={messages} isTyping={true} />
    </div>
  );
}
