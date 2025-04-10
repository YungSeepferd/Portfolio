/**
 * Work Data Index
 * 
 * This file exports all work/project data from various sources.
 * It consolidates all project data for easy access across the application.
 */

// Import project data from various files
import { projects } from './projects';
import { skillTags } from './skillTags';
import { sectionConfig, workCategories } from './uiConfig';

// Re-export everything for easy access
export { projects as workData };
export { projects };
export { skillTags };

// Export UI configuration correctly using the actual exports from uiConfig
export { sectionConfig, workCategories };

// For legacy support - if any components are still using these
export const allProjects = projects;