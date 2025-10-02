import { useEffect, useRef } from "react";
import { type Message } from "@shared/schema";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import EmptyState from "./EmptyState";

interface MessagesContainerProps {
  messages: Message[];
  isTyping: boolean;
}

export default function MessagesContainer({ messages, isTyping }: MessagesContainerProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div 
      className="flex-1 overflow-y-auto px-4 md:px-6 py-6 pt-20 pb-32"
      data-testid="messages-container"
    >
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 && !isTyping ? (
          <div className="h-[calc(100vh-16rem)] flex items-center justify-center">
            <EmptyState />
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
