import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Organization, Property, Project, User } from '@/types';

interface AppState {
  currentUser: User | null;
  currentOrg: Organization | null;
  currentProperty: Property | null;
  currentProject: Project | null;
  theme: 'light' | 'dark' | 'system';
  isSidebarOpen: boolean;
  isChatOpen: boolean;
  setCurrentUser: (user: User | null) => void;
  setCurrentOrg: (org: Organization | null) => void;
  setCurrentProperty: (property: Property | null) => void;
  setCurrentProject: (project: Project | null) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setChatOpen: (isOpen: boolean) => void;
  reset: () => void;
}

const initialState = {
  currentUser: null,
  currentOrg: null,
  currentProperty: null,
  currentProject: null,
  theme: 'system' as const,
  isSidebarOpen: true,
  isChatOpen: false,
};

export const useAppStore = create<AppState>()(
  persist(
    immer((set) => ({
      ...initialState,
      setCurrentUser: (user) => set({ currentUser: user }),
      setCurrentOrg: (org) => set({ currentOrg: org }),
      setCurrentProperty: (property) => set({ currentProperty: property }),
      setCurrentProject: (project) => set({ currentProject: project }),
      setTheme: (theme) => set({ theme }),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      setChatOpen: (isOpen) => set({ isChatOpen: isOpen }),
      reset: () => set(initialState),
    })),
    {
      name: 'remodl-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentOrg: state.currentOrg,
        theme: state.theme,
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);