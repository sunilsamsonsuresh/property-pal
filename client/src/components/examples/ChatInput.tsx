import ChatInput from '../ChatInput';

export default function ChatInputExample() {
  const handleSend = (text: string, imageFile?: File) => {
    console.log('Message sent:', text, imageFile ? 'with image' : 'text only');
  };

  return (
    <div className="h-96 bg-background relative">
      <ChatInput onSendMessage={handleSend} />
    </div>
  );
}
