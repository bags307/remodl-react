import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from '@/store/chat-store';
import { formatMessage } from '@/lib/chat';
import { cn } from '@/lib/utils';

interface ChatContainerProps {
  className?: string;
}

export function ChatContainer({ className }: ChatContainerProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { getCurrentConversation, addMessage } = useChatStore();
  const currentConversation = getCurrentConversation();

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    id: currentConversation?.id,
    initialMessages: currentConversation?.messages || [],
    onFinish: (message) => {
      addMessage(formatMessage({
        ...message,
        createdAt: new Date(),
      }));
    },
  });

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = async () => {
    if (!input?.trim() || isLoading) return;
    await handleSubmit(input);
  };

  if (!currentConversation) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a conversation or start a new chat
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)} data-name="chat-container">
      <ScrollArea 
        className="flex-1 p-4"
        ref={scrollAreaRef}
      >
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLoading={isLoading}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleMessageSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}