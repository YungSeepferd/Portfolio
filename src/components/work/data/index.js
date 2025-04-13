/**
 * Work Data - Main module for project data exports
 */

// Import project collections
import { projects, allProjects, projectsData } from './projects/index';

// Import optional data files if they exist
import { skillTags } from './skillTags';
import { uiConfig } from './uiConfig';

// Add workData export that Work.js is trying to import
export const workData = projects;

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