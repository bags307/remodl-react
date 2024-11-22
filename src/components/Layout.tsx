import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Sidebar } from './Sidebar';
import { ChatInterface } from './ChatInterface';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { 
    isSidebarOpen, 
    isChatOpen, 
    setSidebarOpen, 
    setChatOpen,
    theme 
  } = useAppStore();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      if (width < 1024) {
        setSidebarOpen(false);
        setChatOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen, setChatOpen]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'ArrowUp') {
        setChatOpen(!isChatOpen);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isChatOpen, setChatOpen]);

  return (
    <ThemeProvider defaultTheme={theme} storageKey="remodl-theme">
      <TooltipProvider>
        <div className="min-h-screen bg-background flex">
          <Sidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setSidebarOpen}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          
          <main
            className={cn(
              "flex-1 transition-all duration-300 relative",
              isSidebarOpen && !isMobile && !isTablet ? 'lg:ml-[200px]' : 'lg:ml-16',
              isChatOpen ? 'lg:mr-[400px]' : 'mr-0',
              isMobile && isSidebarOpen ? 'ml-0 opacity-50' : 'ml-16'
            )}
          >
            {(isMobile || isTablet) && isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            {children}
          </main>

          <ChatInterface 
            isOpen={isChatOpen} 
            setIsOpen={setChatOpen}
            isMobile={isMobile}
          />
          <Toaster />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}