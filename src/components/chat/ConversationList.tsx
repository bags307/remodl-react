import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { formatTimeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/store/chat-store';
import { useNavigate } from 'react-router-dom';

export function ConversationList() {
  const navigate = useNavigate();
  const { conversations, currentConversationId, setCurrentConversationId } = useChatStore();

  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    navigate(`/conversations/${id}`);
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
              currentConversationId === conversation.id && "bg-muted"
            )}
            onClick={() => handleSelectConversation(conversation.id)}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
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
    </ScrollArea>
  );
}