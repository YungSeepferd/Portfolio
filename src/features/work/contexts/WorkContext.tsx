import { createContext, useContext, useState, ReactNode } from 'react';
import { Project } from '../types';

interface WorkContextValue {
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  isModalOpen: boolean;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

const WorkContext = createContext<WorkContextValue | undefined>(undefined);

export const WorkProvider = ({ children }: { children: ReactNode }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveProject(null);
  };

  return (
    <WorkContext.Provider
      value={{
        activeProject,
        setActiveProject,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};

export const useWork = () => {
  const context = useContext(WorkContext);
  if (context === undefined) {
    throw new Error('useWork must be used within a WorkProvider');
  }
  return context;
};
