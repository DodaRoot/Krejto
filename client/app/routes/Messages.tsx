import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send, Search, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  getConversations,
  getConversationById,
  type MockConversation,
} from "../mock/index";

const CONVERSATIONS = getConversations();

interface ConversationListProps {
  conversations: MockConversation[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  const [t] = useTranslation();

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-muted-foreground">{t("No conversations")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
            selectedId === conversation.id
              ? "bg-primary/10 border border-primary/30"
              : "hover:bg-muted border border-transparent"
          }`}
        >
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={conversation.avatar} />
            <AvatarFallback>
              {conversation.name.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 text-left">
            <h3 className="text-sm font-medium truncate">
              {conversation.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {conversation.lastMessage}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-muted-foreground">
              {conversation.timestamp}
            </span>
            {conversation.unread && (
              <span className="inline-block w-2 h-2 bg-primary rounded-full" />
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

interface MessageBubbleProps {
  message: string;
  sender: "me" | "other";
  timestamp: string;
}

function MessageBubble({ message, sender, timestamp }: MessageBubbleProps) {
  return (
    <div
      className={`flex gap-2 mb-4 ${sender === "me" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          sender === "me"
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        }`}
      >
        <p className="text-sm break-words">{message}</p>
        <span
          className={`text-xs mt-1 block ${
            sender === "me"
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          }`}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
}

interface ChatHeaderProps {
  conversation: MockConversation;
  onBack?: () => void;
}

function ChatHeader({ conversation, onBack }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-border bg-background">
      {onBack && (
        <button
          onClick={onBack}
          className="md:hidden p-1 hover:bg-muted rounded-lg transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <Avatar className="h-10 w-10">
        <AvatarImage src={conversation.avatar} />
        <AvatarFallback>{conversation.name.split(" ")[0][0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h2 className="text-sm font-semibold">{conversation.name}</h2>
        <p className="text-xs text-muted-foreground">Active now</p>
      </div>
    </div>
  );
}

interface ChatViewProps {
  conversation: MockConversation | null;
  onBack?: () => void;
}

function ChatView({ conversation, onBack }: ChatViewProps) {
  const [t] = useTranslation();

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-background">
        <p className="text-muted-foreground">{t("Select a conversation")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader conversation={conversation} onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.content}
            sender={msg.sender}
            timestamp={msg.timestamp}
          />
        ))}
      </div>

      <div className="border-t border-border p-4 bg-background">
        <div className="flex gap-2 items-end">
          <Input
            placeholder={t("Type a message")}
            className="flex-1"
            readOnly
          />
          <Button size="icon" variant="ghost" onClick={() => {}}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Messages() {
  const [t] = useTranslation();
  const [selectedId, setSelectedId] = useState<number | null>(
    CONVERSATIONS[0]?.id || null,
  );
  const [isChatOpenMobile, setIsChatOpenMobile] = useState(false);

  const selectedConversation = selectedId
    ? getConversationById(selectedId)
    : null;

  const handleSelectConversation = (id: number) => {
    setSelectedId(id);
    setIsChatOpenMobile(true);
  };

  const handleBackToConversations = () => {
    setIsChatOpenMobile(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-120px)] gap-4 p-4">
      {/* Conversations Sidebar - Hidden on mobile when chat is open */}
      <div
        className={`md:col-span-1 bg-background shadow rounded-lg overflow-hidden flex flex-col ${
          isChatOpenMobile ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-3">{t("Inbox")}</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t("Search")} className="pl-8" readOnly />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            conversations={CONVERSATIONS}
            selectedId={selectedId}
            onSelect={handleSelectConversation}
          />
        </div>
      </div>

      {/* Chat Area - Full width on mobile when open, otherwise hidden */}
      <div
        className={`md:col-span-2 bg-background shadow rounded-lg overflow-hidden flex flex-col ${
          isChatOpenMobile ? "flex" : "hidden md:flex"
        }`}
      >
        <ChatView
          conversation={selectedConversation ?? null}
          onBack={handleBackToConversations}
        />
      </div>
    </div>
  );
}
