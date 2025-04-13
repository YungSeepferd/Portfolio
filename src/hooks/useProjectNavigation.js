import { useMemo, useCallback } from 'react';
import { useModalContext } from '../context/ModalContext';

/**
 * Custom hook to manage project navigation logic (previous, next, related).
 * @param {Object} currentProject - The currently displayed project.
 * @param {Array} allProjects - The list of all available projects.
 * @returns {Object} - Contains prevProject, nextProject, relatedProjects, and handleNavigation function.
 */
export const useProjectNavigation = (currentProject, allProjects = []) => {
  const { openProjectModal, closeProjectModal } = useModalContext();

  // Memoize previous/next project calculation
  const { prevProject, nextProject } = useMemo(() => {
    if (!currentProject || !allProjects || allProjects.length === 0) {
      return { prevProject: null, nextProject: null };
    }
    const currentIndex = allProjects.findIndex(p => p.id === currentProject.id);
    if (currentIndex === -1) {
        console.warn(`Current project (id: ${currentProject.id}) not found in allProjects list.`);
        return { prevProject: null, nextProject: null };
    }
    const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
    return { prevProject: prev, nextProject: next };
  }, [currentProject, allProjects]);

  // Memoize related projects calculation
  const relatedProjects = useMemo(() => {
    if (!currentProject || !allProjects) return [];
    const currentTags = new Set([...(currentProject.categories || []), ...(currentProject.tags || [])]);
    if (currentTags.size === 0) return []; // No tags to match

    return allProjects
      .filter(p => p.id !== currentProject.id) // Exclude current project
      .map(p => {
        const otherTags = new Set([...(p.categories || []), ...(p.tags || [])]);
        const intersection = new Set([...currentTags].filter(tag => otherTags.has(tag)));
        return { ...p, relevance: intersection.size }; // Calculate relevance based on shared tags
      })
      .filter(p => p.relevance > 0) // Only include projects with shared tags
      .sort((a, b) => b.relevance - a.relevance) // Sort by relevance
      .slice(0, 3); // Limit to top 3 related projects
  }, [currentProject, allProjects]);

  // Callback for navigating between projects (closes current, opens new)
  const handleNavigation = useCallback((targetProject) => {
    if (targetProject) {
      closeProjectModal(() => {
        // Use a short timeout to ensure the close animation completes before opening the new modal
        setTimeout(() => {
          openProjectModal(targetProject, allProjects);
        }, 150); // Adjust timing if needed
      });
    }
  }, [openProjectModal, closeProjectModal, allProjects]);

  return {
    prevProject,
    nextProject,
    relatedProjects,
    handleNavigation,
  };
};
