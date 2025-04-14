/**
 * Work Data - Main module for project data exports
 */

// Import project collections
import { projects, allProjects, projectsData } from './projects/index';

// Import optional data files if they exist
import { skillTags } from './skillTags';
import uiConfig from './uiConfig'; // using default import

/**
 * Get projects data function for use with useDataLoader
 * 
 * This function returns the projects data for the Work component
 * 
 * @returns {Array} Array of project objects
 */
export const getProjects = () => {
  console.log('Fetching projects data:', projectsData.length, 'items');
  // Process projects to ensure consistent data structure
  return projectsData.map(standardizeProjectData);
};

/**
 * Standardize project data for consistent formats
 * This ensures that all projects have consistent data structure
 * particularly for links, actions and technologies
 */
export const standardizeProjectData = (project) => {
  if (!project) return {};
  
  // Create a new object to avoid mutating the original
  const standardizedProject = { ...project };
  
  // Standardize links array
  if (standardizedProject.links) {
    // If links is an object, convert to array
    const linksArray = Array.isArray(standardizedProject.links) 
      ? standardizedProject.links 
      : Object.values(standardizedProject.links);
      
    // Ensure each link has required fields in consistent format
    standardizedProject.links = linksArray.map(link => ({
      label: link.label || 'View',
      url: link.url || link.href || '#', // Support both formats
      icon: link.icon || null,
      contentType: link.contentType || 'external',
      openInPopup: link.openInPopup !== false,
      color: link.color || 'primary',
      variant: link.variant || 'outlined',
      // Add any other standardization
    }));
  } else {
    standardizedProject.links = [];
  }
  
  // Standardize actions if separate from links
  if (standardizedProject.actions) {
    // Convert actions to standard format if needed, or merge with links
    const actionsArray = Array.isArray(standardizedProject.actions)
      ? standardizedProject.actions
      : Object.values(standardizedProject.actions);
      
    // Standardize action format
    const standardizedActions = actionsArray.map(action => ({
      label: action.label || 'View',
      url: action.url || action.href || '#',
      icon: action.icon || null,
      contentType: action.contentType || 'external',
      openInPopup: action.openInPopup !== false,
      color: action.color || 'primary',
      variant: action.variant || 'outlined',
    }));
    
    // Merge with links if not already included
    // This ensures we don't duplicate actions that might be in both arrays
    standardizedProject.links = [...standardizedProject.links];
    standardizedActions.forEach(action => {
      // Check if this action is already in links array
      const isDuplicate = standardizedProject.links.some(link => 
        link.label === action.label && (link.url === action.url || link.href === action.href)
      );
      
      if (!isDuplicate) {
        standardizedProject.links.push(action);
      }
    });
  }
  
  // Ensure technologies is always an array
  if (!standardizedProject.technologies) {
    standardizedProject.technologies = [];
  } else if (!Array.isArray(standardizedProject.technologies)) {
    standardizedProject.technologies = Object.values(standardizedProject.technologies);
  }
  
  // Always return the object
  return standardizedProject;
};

// Export all data 
export { 
  projects,
  allProjects,
  projectsData,
  skillTags,
  uiConfig
};

// Helper function for formatting projects with required fields
export const formatProjects = (projectsToFormat) => {
  if (!projectsToFormat || !Array.isArray(projectsToFormat)) {
    console.warn('formatProjects called with invalid projects data:', projectsToFormat);
    return [];
  }
  
  return projectsToFormat.map(project => ({
    id: project.id || `project-${Math.random().toString(36).substr(2, 9)}`,
    title: project.title || 'Untitled Project',
    description: project.description || '',
    categories: project.categories || [],
    media: project.media || null,
    cardVariant: project.cardVariant || 'default',
    ...project
  }));
};

// Default export is the projects array
export default projects;