import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProjectData } from '../types/project';

interface ProjectState {
  projects: ProjectData[];
  selectedProject: ProjectData | null;
  isModalOpen: boolean;
  selectedProjectIndex: number | null;
  setProjects: (projects: ProjectData[]) => void;
  setSelectedProject: (project: ProjectData | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedProjectIndex: (index: number | null) => void;
  openProjectModal: (project: ProjectData, index: number) => void;
  closeProjectModal: () => void;
  navigateToNextProject: () => void;
  navigateToPreviousProject: () => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      selectedProject: null,
      isModalOpen: false,
      selectedProjectIndex: null,

      setProjects: (projects) => set({ projects }),
      setSelectedProject: (project) => set({ selectedProject: project }),
      setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
      setSelectedProjectIndex: (index) => set({ selectedProjectIndex: index }),

      openProjectModal: (project, index) =>
        set({
          selectedProject: project,
          selectedProjectIndex: index,
          isModalOpen: true,
        }),

      closeProjectModal: () =>
        set({
          selectedProject: null,
          selectedProjectIndex: null,
          isModalOpen: false,
        }),

      navigateToNextProject: () => {
        const { projects, selectedProjectIndex } = get();
        if (selectedProjectIndex !== null && selectedProjectIndex < projects.length - 1) {
          const nextIndex = selectedProjectIndex + 1;
          const nextProject = projects[nextIndex];
          set({
            selectedProject: nextProject,
            selectedProjectIndex: nextIndex,
          });
        } else if (projects.length > 0) {
          // Loop back to first project
          const firstProject = projects[0];
          set({
            selectedProject: firstProject,
            selectedProjectIndex: 0,
          });
        }
      },

      navigateToPreviousProject: () => {
        const { projects, selectedProjectIndex } = get();
        if (selectedProjectIndex !== null && selectedProjectIndex > 0) {
          const prevIndex = selectedProjectIndex - 1;
          const prevProject = projects[prevIndex];
          set({
            selectedProject: prevProject,
            selectedProjectIndex: prevIndex,
          });
        } else if (projects.length > 0) {
          // Loop to last project
          const lastIndex = projects.length - 1;
          const lastProject = projects[lastIndex];
          set({
            selectedProject: lastProject,
            selectedProjectIndex: lastIndex,
          });
        }
      },
    }),
    {
      name: 'project-store',
      partialize: (state) => ({
        // Only persist projects, not modal state
        projects: state.projects,
      }),
    }
  )
);

interface UIState {
  sidebarOpen: boolean;
  isDarkMode: boolean;
  soundEnabled: boolean;
  soundVolume: number; // 0..1
  setSidebarOpen: (open: boolean) => void;
  setDarkMode: (dark: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (vol: number) => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  toggleSound: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      isDarkMode: false,
      soundEnabled: true,
      soundVolume: 0.2,

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setDarkMode: (dark) => set({ isDarkMode: dark }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setSoundVolume: (vol) =>
        set({ soundVolume: Math.max(0, Math.min(1, Number.isFinite(vol) ? vol : 0)) }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: 'ui-store',
    }
  )
);
