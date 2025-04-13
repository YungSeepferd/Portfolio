import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook to manage filtering of projects based on categories.
 * @param {Array} allProjects - The complete list of projects.
 * @param {string} initialCategory - The initially selected category ('all' by default).
 * @returns {Object} - Contains filteredProjects, currentCategory, and handleCategoryChange function.
 */
export const useProjectFilter = (allProjects = [], initialCategory = 'all') => {
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    if (currentCategory === 'all') {
      return allProjects;
    }
    return allProjects.filter(project =>
      project.categories?.includes(currentCategory)
    );
  }, [allProjects, currentCategory]);

  const handleCategoryChange = useCallback((category) => {
    setCurrentCategory(category);
  }, []);

  return {
    filteredProjects,
    currentCategory,
    handleCategoryChange,
  };
};
