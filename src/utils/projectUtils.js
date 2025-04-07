/**
 * Project Utilities
 * 
 * This file contains utility functions for working with project data.
 * These functions help with common operations like filtering, searching, and categorizing projects.
 */

/**
 * Filter projects by category
 * 
 * @param {Array} projects - Array of project objects
 * @param {String} category - Category to filter by
 * @returns {Array} - Filtered array of projects that contain the specified category
 */
export const filterProjectsByCategory = (projects, category) => {
  if (!category) return projects;
  return projects.filter(project => 
    project.categories && project.categories.includes(category)
  );
};

/**
 * Search projects by text
 * 
 * @param {Array} projects - Array of project objects
 * @param {String} searchTerm - Text to search for
 * @returns {Array} - Filtered array of projects that match the search term
 */
export const searchProjects = (projects, searchTerm) => {
  if (!searchTerm) return projects;
  
  const term = searchTerm.toLowerCase();
  return projects.filter(project => {
    const title = project.title ? project.title.toLowerCase() : '';
    const description = project.description ? project.description.toLowerCase() : '';
    const categories = project.categories ? 
      project.categories.map(cat => cat.toLowerCase()).join(' ') : '';
    const tools = project.tools ? 
      project.tools.map(tool => tool.toLowerCase()).join(' ') : '';
    
    return title.includes(term) || 
           description.includes(term) || 
           categories.includes(term) ||
           tools.includes(term);
  });
};

/**
 * Get unique categories from all projects
 * 
 * @param {Array} projects - Array of project objects
 * @returns {Array} - Array of unique category strings
 */
export const getUniqueCategories = (projects) => {
  const categoriesSet = new Set();
  
  projects.forEach(project => {
    if (project.categories && Array.isArray(project.categories)) {
      project.categories.forEach(category => categoriesSet.add(category));
    }
  });
  
  return Array.from(categoriesSet).sort();
};

/**
 * Get unique tools from all projects
 * 
 * @param {Array} projects - Array of project objects
 * @returns {Array} - Array of unique tool strings
 */
export const getUniqueTools = (projects) => {
  const toolsSet = new Set();
  
  projects.forEach(project => {
    if (project.tools && Array.isArray(project.tools)) {
      project.tools.forEach(tool => toolsSet.add(tool));
    }
  });
  
  return Array.from(toolsSet).sort();
};

/**
 * Organize projects into display matrix
 * 
 * @param {Array} projects - Array of project objects
 * @param {Object} options - Configuration options
 * @param {Number} options.primaryCount - Number of projects for primary display (default: 4)
 * @param {Number} options.secondaryCount - Number of projects for secondary display (default: 4)
 * @returns {Object} - Object with primary, secondary, and additional project arrays
 */
export const organizeProjectsMatrix = (projects, options = {}) => {
  const { 
    primaryCount = 4, 
    secondaryCount = 4,
    sortFn = (a, b) => a.id < b.id ? -1 : 1
  } = options;
  
  // Sort projects based on provided sort function
  const sortedProjects = [...projects].sort(sortFn);
  
  return {
    primary: sortedProjects.slice(0, primaryCount),
    secondary: sortedProjects.slice(primaryCount, primaryCount + secondaryCount),
    additional: sortedProjects.slice(primaryCount + secondaryCount)
  };
};