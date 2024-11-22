import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/store/chat-store';

interface ConversationListProps {
  onSelect: (id: string) => void;
  selectedId?: string | null;
}

interface GroupedConversations {
  [key: string]: {
    label: string;
    conversations: Array<any>;
  };
}

export function ConversationList({ onSelect, selectedId }: ConversationListProps) {
  const { conversations } = useChatStore();

  // Sort conversations by updatedAt timestamp, most recent first
  const sortedConversations = [...conversations].sort((a, b) => 
    b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  // Group conversations by date
  const groupedConversations = sortedConversations.reduce((groups: GroupedConversations, conversation) => {
    const date = new Date(conversation.updatedAt);
    let key = format(date, 'yyyy-MM-dd');
    let label = format(date, 'MMMM d, yyyy');

    if (isToday(date)) {
      key = 'today';
      label = 'Today';
    } else if (isYesterday(date)) {
      key = 'yesterday';
      label = 'Yesterday';
    }

    if (!groups[key]) {
      groups[key] = {
        label,
        conversations: [],
      };
    }

    groups[key].conversations.push(conversation);
    return groups;
  }, {});

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => onSelect('new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {Object.entries(groupedConversations).map(([key, group]) => (
            <div key={key} className="mb-4">
              <h3 className="px-3 mb-2 text-sm font-medium text-muted-foreground">
                {group.label}
              </h3>
              <div className="space-y-2">
                {group.conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                      selectedId === conversation.id && "bg-muted"
                    )}
                    onClick={() => onSelect(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/demo-o82y47/assets/gxafbqrtuttu/B2.png"
                          alt="Sam"
                        />
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-sm truncate">
                            {conversation.title}
                          </h3>
                          <time className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTimeAgo(conversation.updatedAt)}
                          </time>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {conversation.messages[conversation.messages.length - 1]?.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}