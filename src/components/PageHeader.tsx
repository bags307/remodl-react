import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { MessageSquare, Settings } from 'lucide-react';
import { useAppStore } from '@/store';

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  const { setChatOpen } = useAppStore();

  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex justify-between items-center h-16 px-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-4">
          {children}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setChatOpen(true)}
            title="Open Chat (⌘ + ↑)"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}