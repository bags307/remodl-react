import { ChatMessage as ChatMessageType } from '@/lib/chat';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatMessageProps {
  message: ChatMessageType;
  isLoading?: boolean;
}

export function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'group flex gap-3 py-4',
        isUser && 'justify-end'
      )}
      data-name="chat-message"
    >
      {!isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage
            src="https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/demo-o82y47/assets/gxafbqrtuttu/B2.png"
            alt="Sam"
          />
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn(
        'flex flex-col gap-2',
        isUser ? 'items-end' : 'items-start',
        'w-full max-w-4xl'
      )}>
        {isUser ? (
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg">
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 mt-1 shrink-0" />
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ) : (
          <div 
            className={cn(
              "prose prose-sm dark:prose-invert w-full",
              isLoading && "animate-shimmer bg-[linear-gradient(110deg,#0000_0%,#0000_40%,theme(colors.muted.DEFAULT)_50%,#0000_60%,#0000_100%)] bg-[length:200%_100%]"
            )}
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return <p className="text-sm leading-relaxed">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="my-2 list-disc pl-4">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="my-2 list-decimal pl-4">{children}</ol>;
                },
                li({ children }) {
                  return <li className="text-sm my-1">{children}</li>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}