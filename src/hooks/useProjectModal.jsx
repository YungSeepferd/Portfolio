import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing project modal state and navigation
 */
export const useProjectModal = (projects = []) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const selectedProject = selectedIndex !== null ? projects[selectedIndex] : null;
  
  const openModal = useCallback((project) => {
    const index = projects.findIndex(p => p.id === project.id);
    if (index !== -1) {
      setSelectedIndex(index);
      setIsOpen(true);
    }
  }, [projects]);
  
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  const nextProject = useCallback(() => {
    if (selectedIndex < projects.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectedIndex(0); // Loop back to first
    }
  }, [selectedIndex, projects.length]);
  
  const prevProject = useCallback(() => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      setSelectedIndex(projects.length - 1); // Loop to last
    }
  }, [selectedIndex, projects.length]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevProject();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextProject();
          break;
        case 'Escape':
          e.preventDefault();
          closeModal();
          break;
        default:
          // No action needed for other keys
          break;
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextProject, prevProject, closeModal]);
  
  return {
    isOpen,
    selectedProject,
    selectedIndex,
    openModal,
    closeModal,
    nextProject,
    prevProject
  };
};
