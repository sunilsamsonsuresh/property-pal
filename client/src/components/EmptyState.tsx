import { MessageCircle } from "lucide-react";

export default function EmptyState() {
  return (
    <div 
      className="flex flex-col items-center justify-center h-full text-center px-4"
      data-testid="empty-state"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <MessageCircle className="w-8 h-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Need help with the property?
      </h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        Upload an image to troubleshoot property damage issues, or just send a message if you have tenancy queries.
      </p>
    </div>
  );
}
