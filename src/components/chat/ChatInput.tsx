import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2, Image, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  onFileUpload?: (file: File) => void;
  onImageUpload?: (file: File) => void;
  isLoading?: boolean;
  className?: string;
}

export function ChatInput({ 
  onSubmit, 
  onFileUpload, 
  onImageUpload,
  isLoading, 
  className 
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (e.target === fileInputRef.current && onFileUpload) {
        onFileUpload(file);
      } else if (e.target === imageInputRef.current && onImageUpload) {
        onImageUpload(file);
      }
    }
    // Reset the input
    e.target.value = '';
  };

  return (
    <div className={cn('flex flex-col gap-2', className)} data-name="chat-input">
      <div className="flex items-center gap-2 px-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={() => imageInputRef.current?.click()}
          title="Upload image"
        >
          <Image className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={() => fileInputRef.current?.click()}
          title="Upload file"
        >
          <Paperclip className="h-5 w-5 text-muted-foreground" />
        </Button>
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Sam..."
            className="min-h-[44px] max-h-[200px] pr-12 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 bottom-1.5 h-8 w-8 hover:bg-transparent"
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}