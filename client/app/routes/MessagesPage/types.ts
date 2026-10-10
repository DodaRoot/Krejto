import type { MockConversation } from "../../mock";

export interface ConversationListProps {
  conversations: MockConversation[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export interface MessageBubbleProps {
  message: string;
  sender: "me" | "other";
  timestamp: string;
}

export interface ChatHeaderProps {
  conversation: MockConversation;
  onBack?: () => void;
}

export interface ChatViewProps {
  conversation: MockConversation | null;
  onBack?: () => void;
}