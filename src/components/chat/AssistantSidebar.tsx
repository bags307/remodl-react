import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus, ChevronRight } from 'lucide-react';
import { ConversationList } from './ConversationList';
import { cn } from '@/lib/utils';

interface AssistantSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  className?: string;
}

export function AssistantSidebar({ 
  isOpen, 
  onClose, 
  onNewChat,
  className 
}: AssistantSidebarProps) {
  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 w-[300px] bg-background border-r transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className
      )}
      data-name="assistant-sidebar"
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={onNewChat}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <ConversationList />
        </ScrollArea>
      </div>
    </div>
  );
}