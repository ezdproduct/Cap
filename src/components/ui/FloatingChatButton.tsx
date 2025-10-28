import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const FloatingChatButton = () => {
  return (
    <Button
      className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-cap-dark-blue text-white shadow-lg hover:bg-cap-navy transition-colors"
      aria-label="Open chat"
    >
      <MessageSquare className="h-7 w-7" />
    </Button>
  );
};

export default FloatingChatButton;