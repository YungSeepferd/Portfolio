/**
 * Work Data - Main module for project data exports
 */

// Import project collections
import { projects, allProjects, projectsData } from './projects/index';
import { skillTags } from './skill-tags';
import uiConfig from './uiConfig';
import { normalizeProjects } from '../../../utils/normalize-project';

/**
 * Get projects data (normalized)
 */
export const getProjects = () => normalizeProjects(projectsData);

// Export all data as-is
export { projects, allProjects, projectsData, skillTags, uiConfig };

// Default export is the projects array
export default projects;
