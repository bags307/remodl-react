import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChatContainer } from './ChatContainer';
import { AssistantSidebar } from './AssistantSidebar';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chat-store';

interface AssistantThreadProps {
  className?: string;
}

export function AssistantThread({ className }: AssistantThreadProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { createConversation } = useChatStore();

  const handleNewChat = () => {
    const conversation = createConversation();
    navigate(`/conversations/${conversation.id}`);
    setIsSidebarOpen(false);
  };

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={cn('flex h-full relative', className)} data-name="assistant-thread">
      <AssistantSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <ChatContainer />
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}