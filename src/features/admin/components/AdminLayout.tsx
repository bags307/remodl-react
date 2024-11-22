import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const ADMIN_ROLES = ['super_admin', 'admin'];

const tabs = [
  { value: 'overview', label: 'Overview', path: '/settings/global/admin' },
  { value: 'organizations', label: 'Organizations', path: '/settings/global/admin/organizations' },
  { value: 'users', label: 'Users', path: '/settings/global/admin/users' },
  { value: 'billing', label: 'Billing', path: '/settings/global/admin/billing' },
  { value: 'settings', label: 'Settings', path: '/settings/global/admin/settings' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // Check if user has admin access
  useEffect(() => {
    if (!currentUser?.role || !ADMIN_ROLES.includes(currentUser.role)) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // Get current tab value from path
  const getCurrentTab = () => {
    const path = location.pathname;
    const tab = tabs.find(t => t.path === path);
    return tab?.value || 'overview';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
      </div>
      
      <Separator />

      <Tabs value={getCurrentTab()} className="space-y-6">
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div>{children}</div>
      </Tabs>
    </div>
  );
}