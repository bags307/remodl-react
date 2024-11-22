import { createContext, useContext, useState } from 'react';
import type { Organization, Property, Project } from '@/types';

interface OrganizationContextType {
  currentOrg: Organization | null;
  currentProperty: Property | null;
  currentProject: Project | null;
  setCurrentOrg: (org: Organization) => void;
  setCurrentProperty: (property: Property) => void;
  setCurrentProject: (project: Project) => void;
}

const OrganizationContext = createContext<OrganizationContextType>({
  currentOrg: null,
  currentProperty: null,
  currentProject: null,
  setCurrentOrg: () => {},
  setCurrentProperty: () => {},
  setCurrentProject: () => {},
});

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  return (
    <OrganizationContext.Provider
      value={{
        currentOrg,
        currentProperty,
        currentProject,
        setCurrentOrg,
        setCurrentProperty,
        setCurrentProject,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganization = () => useContext(OrganizationContext);