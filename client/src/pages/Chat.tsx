import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import ChatHeader from "@/components/ChatHeader";
import MessagesContainer from "@/components/MessagesContainer";
import ChatInput from "@/components/ChatInput";
import { type Message } from "@shared/schema";

export default function Chat() {
  const [sessionId] = useState(() => uuidv4());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string, imageFile?: File) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: text || '',
      timestamp: Date.now(),
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        userMessage.imageUrl = reader.result as string;
        setMessages(prev => [...prev, userMessage]);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setMessages(prev => [...prev, userMessage]);
    }
    await sendToWebhook(text || '', imageFile);
  };

  const sendToWebhook = async (text: string, imageFile?: File) => {
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append('sessionId', sessionId);
      
      if (text.trim()) {
        formData.append('text', text.trim());
      }
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const N8N_WEBHOOK_URL = import.meta.env.WEBHOOK_PROD_URL;

      const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      body: formData,
    });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.response || 'Response received',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <ChatHeader sessionId={sessionId} />
      <MessagesContainer messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
