import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  sessionId: string;
}

export default function ChatHeader({ sessionId }: ChatHeaderProps) {
  const shortSessionId = sessionId.substring(0, 8);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-4 md:px-6 bg-card border-b border-card-border backdrop-blur-sm">
      <h1 className="text-lg font-semibold text-foreground" data-testid="text-app-title">
        PropertyPal
      </h1>
      <Badge 
        variant="secondary" 
        className="text-xs font-medium uppercase tracking-wide"
        data-testid="badge-session-id"
      >
        {shortSessionId}
      </Badge>
    </header>
  );
}
