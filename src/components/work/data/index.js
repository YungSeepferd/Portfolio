/**
 * Work Data - Main module for project data exports
 */

import { projects } from './projects';
import skillTags from './skillTags';
import uiConfig from './uiConfig';

// Add workData export that Work.js is trying to import
export const workData = projects;

// Export projects directly, don't try to re-export projectsData
export { 
  projects,
  skillTags,
  uiConfig
};

// Export a formatted array with all projects for consistency 
export const formatProjects = (projects) => {
  // Ensure all required fields are present
  return projects.map(project => ({
    ...project,
    // Ensure sections are properly structured
    sections: project.sections || [],
    // Convert any string sections to proper section objects
    ...(typeof project.sections === 'string' ? { 
      sections: [{ 
        title: 'Overview', 
        content: project.sections,
        layout: 'textLeft' 
      }] 
    } : {})
  }));
};

// Default export is the projects array
export default projects;