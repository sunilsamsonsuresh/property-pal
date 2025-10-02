import { type Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
      data-testid={`message-${message.id}`}
    >
      <div 
        className={`max-w-[75%] md:max-w-[65%] ${
          isUser 
            ? 'bg-primary text-primary-foreground rounded-2xl rounded-br-md' 
            : 'bg-secondary text-secondary-foreground rounded-2xl rounded-bl-md'
        } shadow-sm transition-colors duration-200`}
      >
        {message.imageUrl && (
          <div className="p-2">
            <img 
              src={message.imageUrl} 
              alt="Shared image" 
              className="rounded-xl max-h-64 w-auto object-cover"
              data-testid={`img-message-${message.id}`}
            />
          </div>
        )}
        {message.content && (
          <div className={`px-4 py-3 ${message.imageUrl ? 'pt-0' : ''}`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words" data-testid={`text-message-content-${message.id}`}>
              {message.content}
            </p>
          </div>
        )}
      </div>
      <span 
        className={`text-xs text-muted-foreground ${isUser ? 'text-right' : 'text-left'} px-2`}
        data-testid={`text-timestamp-${message.id}`}
      >
        {timestamp}
      </span>
    </div>
  );
}
