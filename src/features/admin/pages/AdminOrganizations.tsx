import { useState, useEffect } from 'react';
import { OrganizationList } from '../components/OrganizationList';
import { OrganizationForm } from '../components/OrganizationForm';
import { useToast } from '@/components/ui/use-toast';
import { Organization, OrganizationFormData } from '@/types/organization';
import {
  getOrganizations,
  createOrganization,
  updateOrganization,
} from '@/lib/db/organizations';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export function AdminOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const loadOrganizations = async () => {
    try {
      setIsRefreshing(true);
      const orgs = await getOrganizations();
      setOrganizations(orgs);
    } catch (error: any) {
      console.error('Error loading organizations:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to load organizations. Please try again.',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  const handleAddOrganization = () => {
    setSelectedOrg(null);
    setIsFormOpen(true);
  };

  const handleEditOrganization = (org: Organization) => {
    setSelectedOrg(org);
    setIsFormOpen(true);
  };

  const handleSubmit = async (data: OrganizationFormData) => {
    try {
      if (selectedOrg) {
        await updateOrganization(selectedOrg.id, data);
        toast({
          title: 'Success',
          description: 'Organization updated successfully',
        });
      } else {
        await createOrganization(data);
        toast({
          title: 'Success',
          description: 'Organization created successfully',
        });
      }
      await loadOrganizations();
    } catch (error: any) {
      console.error('Error saving organization:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to save organization',
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Organizations</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={loadOrganizations}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <OrganizationList
        organizations={organizations}
        onAddOrganization={handleAddOrganization}
        onEditOrganization={handleEditOrganization}
      />

      <OrganizationForm
        organization={selectedOrg || undefined}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}