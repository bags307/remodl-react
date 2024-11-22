import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ChevronFirst,
  ChevronLast,
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Calendar,
  Settings,
  Users,
  Building2,
  Receipt,
  Bell,
  HelpCircle,
  LogOut,
  FileText,
  UserCircle2,
  Truck,
  Contact2,
  MessageSquare,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
  isTablet?: boolean;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  icon: any;
  label: string;
  href: string;
}

const menuGroups: MenuGroup[] = [
  {
    title: 'Overview',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
      { icon: Building2, label: 'Properties', href: '/properties' },
      { icon: MessageSquare, label: 'Conversations', href: '/conversations' },
    ],
  },
  {
    title: 'Project Management',
    items: [
      { icon: FolderKanban, label: 'Projects', href: '/projects' },
      { icon: ClipboardList, label: 'Work Orders', href: '/work-orders' },
      { icon: Calendar, label: 'Schedule', href: '/schedule' },
    ],
  },
  {
    title: 'People Ops',
    items: [
      { icon: UserCircle2, label: 'Team', href: '/team' },
      { icon: Truck, label: 'Vendors', href: '/vendors' },
      { icon: Contact2, label: 'Contacts', href: '/contacts' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { icon: Receipt, label: 'Budget', href: '/budget' },
      { icon: FileText, label: 'Invoices', href: '/invoices' },
      { icon: Bell, label: 'Updates', href: '/updates' },
    ],
  },
];

export function Sidebar({ isOpen, setIsOpen, isMobile, isTablet }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const isFullWidth = !isMobile && !isTablet;

  const handleNavigation = (href: string) => {
    navigate(href);
    if (isMobile || isTablet) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-navy transition-all duration-300',
        isOpen ? (isFullWidth ? 'w-[200px]' : 'w-[200px]') : 'w-16',
        isMobile && 'absolute'
      )}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-3">
          {isOpen && (
            <img
              src="https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/demo-o82y47/assets/62eqtqyau5qj/remodL-dark2.png"
              alt="Remodl"
              className="h-8"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'h-8 w-8 text-white hover:bg-white/10',
              !isOpen && 'rotate-180'
            )}
          >
            {isOpen ? (
              <ChevronFirst className="h-4 w-4" />
            ) : (
              <ChevronLast className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-6">
            {menuGroups.map((group, index) => (
              <div key={index} className="space-y-2">
                {isOpen && (
                  <h4 className="px-2 text-[11px] font-semibold text-white/40">
                    {group.title}
                  </h4>
                )}
                <nav className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = isActiveRoute(item.href);
                    const MenuItem = (
                      <Button
                        key={item.label}
                        variant="ghost"
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          'w-full justify-start text-white h-9',
                          !isOpen && !isFullWidth && 'px-2',
                          isActive
                            ? 'bg-remodl_yellow text-navy'
                            : 'hover:bg-remodl_yellow hover:text-navy'
                        )}
                      >
                        <item.icon
                          className={cn('h-4 w-4', isOpen && 'mr-2')}
                        />
                        {isOpen && (
                          <span className="text-[11px]">{item.label}</span>
                        )}
                      </Button>
                    );

                    return isOpen ? (
                      MenuItem
                    ) : (
                      <Tooltip key={item.label} delayDuration={0}>
                        <TooltipTrigger asChild>{MenuItem}</TooltipTrigger>
                        <TooltipContent side="right" className="ml-2">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-white/10 p-3">
          <nav className="space-y-1">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/settings')}
                  className="w-full justify-start text-white hover:bg-remodl_yellow hover:text-navy"
                >
                  <Settings className={cn('h-4 w-4', isOpen && 'mr-2')} />
                  {isOpen && <span className="text-[11px]">Settings</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                Settings
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/help')}
                  className="w-full justify-start text-white hover:bg-remodl_yellow hover:text-navy"
                >
                  <HelpCircle className={cn('h-4 w-4', isOpen && 'mr-2')} />
                  {isOpen && <span className="text-[11px]">Help</span>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="ml-2">
                Help
              </TooltipContent>
            </Tooltip>

            <AlertDialog>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-remodl_yellow hover:text-navy"
                    >
                      <LogOut className={cn('h-4 w-4', isOpen && 'mr-2')} />
                      {isOpen && <span className="text-[11px]">Logout</span>}
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  Logout
                </TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will need to sign in again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>
      </div>
    </aside>
  );
}