import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';

const ADMIN_ROLES = ['super_admin', 'admin'];

export function Settings() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role && ADMIN_ROLES.includes(currentUser.role);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <Separator />

      <div className="grid gap-6">
        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Global Administration
              </CardTitle>
              <CardDescription>
                Manage organizations, users, and system-wide settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => navigate('/settings/global/admin')}
              >
                <span>Access Global Admin Dashboard</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Placeholder for other settings sections */}
        <Card>
          <CardHeader>
            <CardTitle>Organization Settings</CardTitle>
            <CardDescription>
              Configure your organization's preferences and details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Organization settings coming soon...
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Preferences</CardTitle>
            <CardDescription>
              Customize your personal workspace settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              User preferences coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}