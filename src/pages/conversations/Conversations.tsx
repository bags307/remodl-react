import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { ConversationList } from './ConversationList';
import { useChatStore } from '@/store/chat-store';
import { formatMessage } from '@/lib/chat';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export function Conversations() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const { 
    conversations,
    currentConversationId,
    setCurrentConversationId,
    createConversation,
    addMessage 
  } = useChatStore();

  // Handle URL changes and conversation loading
  useEffect(() => {
    if (id === 'new') {
      const newConversation = createConversation();
      navigate(`/conversations/${newConversation.id}`, { replace: true });
      return;
    }

    if (id) {
      const conversation = conversations.find(c => c.id === id);
      if (conversation) {
        setCurrentConversationId(id);
      } else {
        if (conversations.length > 0) {
          navigate(`/conversations/${conversations[0].id}`, { replace: true });
        } else {
          const newConversation = createConversation();
          navigate(`/conversations/${newConversation.id}`, { replace: true });
        }
      }
    } else if (conversations.length > 0) {
      navigate(`/conversations/${conversations[0].id}`, { replace: true });
    } else {
      const newConversation = createConversation();
      navigate(`/conversations/${newConversation.id}`, { replace: true });
    }
  }, [id, conversations, navigate, createConversation, setCurrentConversationId]);

  // Get current conversation
  const currentConversation = conversations.find(c => c.id === currentConversationId);

  const handleNewChat = () => {
    navigate('/conversations/new');
  };

  const handleNewMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = formatMessage(content, 'user');
    addMessage(userMessage);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage = formatMessage(
        "I'm processing your request: " + content,
        'assistant'
      );
      addMessage(assistantMessage);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <PageHeader title="Conversations">
        <Button
          variant="outline"
          className="hidden md:flex"
          onClick={handleNewChat}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </PageHeader>

      <div className="flex-1 flex relative overflow-hidden">
        {/* History Panel */}
        <div
          className={cn(
            "relative flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
            isHistoryOpen ? "w-80" : "w-[50px]"
          )}
        >
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-2 translate-x-1/2 z-10 rounded-full border shadow-md bg-background"
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform duration-200",
              !isHistoryOpen && "rotate-180"
            )} />
          </Button>

          <div className={cn(
            "h-full transition-opacity duration-300",
            isHistoryOpen ? "opacity-100" : "opacity-0 invisible"
          )}>
            <ConversationList
              onSelect={(id) => navigate(`/conversations/${id}`)}
              selectedId={currentConversationId}
            />
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="w-full max-w-5xl mx-auto py-4 px-4 space-y-4">
              {currentConversation?.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}
            </div>
          </ScrollArea>

          <div className="border-t">
            <div className="w-full max-w-5xl mx-auto p-4">
              <ChatInput 
                onSubmit={handleNewMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}