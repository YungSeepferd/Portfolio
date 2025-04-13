/**
 * Data Entry Point
 * 
 * This file centralizes data exports for work section components.
 */

// Consolidate and export all project data and related configurations

// Import the processed array of all projects
import { processedProjects } from './projects'; // Ensure this is exported from ./projects/index.js

// Import UI configurations like categories
import { workCategories } from './uiConfig';

// Export the processed data and categories
export { processedProjects, workCategories };

// Keep workData export if needed elsewhere, but prefer processedProjects
export const workData = processedProjects;