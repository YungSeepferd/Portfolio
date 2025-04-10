/**
 * Data Entry Point
 * 
 * This file centralizes data exports for work section components.
 */

// Import all projects from the projects directory
import { allProjects, processedProjects } from './projects';

// Import skill tags from a standardized location
import { skillTags } from './skillTags';

// Export data for use in components
export const workData = processedProjects;
export { skillTags, allProjects };

// Export UI configuration
export * from './uiConfig';