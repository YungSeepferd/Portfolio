import React, { createContext, useState, useContext } from 'react';

// Create context
const ProjectContext = createContext(null);

/**
 * Project Context Provider
 * 
 * Centralizes project navigation and state management
 */
export const ProjectProvider = ({ children, initialProjects = [], initialIndex = null }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [projects, setProjects] = useState(initialProjects);
  
  const currentProject = currentIndex !== null ? projects[currentIndex] : null;
  
  const navigateProjects = (direction) => {
    if (projects.length === 0) return;
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % projects.length
      : (currentIndex - 1 + projects.length) % projects.length;
    setCurrentIndex(newIndex);
  };
  
  const closeProject = () => setCurrentIndex(null);
  
  const value = {
    projects,
    currentProject,
    currentIndex,
    setCurrentIndex,
    navigateTo: setCurrentIndex,
    navigateNext: () => navigateProjects('next'),
    navigatePrevious: () => navigateProjects('prev'),
    closeProject,
  };
  
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook for consuming project context
export const useProjectContext = () => useContext(ProjectContext);
