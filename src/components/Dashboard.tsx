import { ProjectGallery } from './ProjectGallery';
import { ProgressTiles } from './ProgressTiles';
import { BudgetManagement } from './BudgetManagement';
import { WorkOrders } from './WorkOrders';
import { Updates } from './Updates';
import { ModeToggle } from './ModeToggle';
import { Settings, MessageSquare, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useAppStore } from '@/store';

export function Dashboard() {
  const { setChatOpen } = useAppStore();

  return (
    <div className="space-y-6">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex justify-between items-center h-16 px-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex"
              onClick={() => {}}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
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

      <div className="px-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProjectGallery />
            <ProgressTiles />
            <WorkOrders />
          </div>
          <div className="space-y-6">
            <Updates />
            <BudgetManagement />
          </div>
        </div>
      </div>
    </div>
  );
}