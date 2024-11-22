import { useState, useCallback, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { X, ChevronRight, Bot, User, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
}

export function ChatInterface({ isOpen, setIsOpen, isMobile }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const { messages, append, isLoading } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hello! I'm Sam, your renovation assistant. How can I help you today?",
      },
    ],
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;

    try {
      const userMessage = input;
      setInput('');
      await append({
        role: 'user',
        content: userMessage,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [append, input]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={cn(
        'fixed right-0 top-0 h-screen bg-background border-l transition-all duration-300 transform',
        isOpen ? 'translate-x-0' : 'translate-x-full',
        isMobile ? 'w-full' : 'w-[400px]',
        'z-50'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span className="font-semibold">Sam AI Assistant</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            {isMobile ? (
              <X className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2 max-w-[85%]',
                  message.role === 'user' ? 'ml-auto' : 'mr-auto'
                )}
              >
                <Card
                  className={cn(
                    'p-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' ? (
                      <Bot className="h-4 w-4 mt-1 shrink-0" />
                    ) : (
                      <User className="h-4 w-4 mt-1 shrink-0" />
                    )}
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </Card>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 max-w-[85%] mr-auto">
                <Card className="p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}