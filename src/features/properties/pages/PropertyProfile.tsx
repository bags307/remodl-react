import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Property } from '@/types';
import { getProperty } from '@/lib/db/properties';
import { PageHeader } from '@/components/PageHeader';
import { PropertyOverview } from '../components/PropertyOverview';
import { PropertyGallery } from '../components/PropertyGallery';
import { PropertyActivity } from '../components/PropertyActivity';
import { PropertyProjects } from '../components/PropertyProjects';
import { PropertyVendors } from '../components/PropertyVendors';
import { PropertyMarket } from '../components/PropertyMarket';
import { PropertyTeam } from '../components/PropertyTeam';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';

export function PropertyProfile() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProperty() {
      if (!id) return;
      try {
        const data = await getProperty(id);
        setProperty(data);
      } catch (error) {
        console.error('Error loading property:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title={property.address.formattedAddress}>
        <Button
          variant="outline"
          className="hidden md:flex"
          onClick={() => {}}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </PageHeader>

      <Tabs defaultValue="overview" className="flex-1">
        <div className="border-b bg-background">
          <div className="px-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="data">Property Data</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="overview" className="flex-1">
          <div className="p-6">
            <div className="grid grid-cols-12 gap-6">
              {/* Column 1 - Property Info & Market Data */}
              <div className="col-span-3 space-y-6">
                <PropertyOverview property={property} />
                <PropertyMarket property={property} />
              </div>

              {/* Column 2 - Gallery & Projects */}
              <div className="col-span-6 space-y-6">
                <PropertyGallery property={property} />
                <PropertyProjects property={property} />
                <PropertyTeam property={property} />
              </div>

              {/* Column 3 - Activity Feed & Vendors */}
              <div className="col-span-3 space-y-6">
                <PropertyActivity property={property} />
                <PropertyVendors property={property} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="data">
          <div className="p-6">
            Property data content coming soon...
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="p-6">
            Projects content coming soon...
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="p-6">
            Documents content coming soon...
          </div>
        </TabsContent>

        <TabsContent value="photos">
          <div className="p-6">
            Photos content coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}