/**
 * Projects Collection
 * 
 * This file imports all individual project files, combines them,
 * and processes them for use throughout the application.
 */

// Import project-specific data
import adhdeer from './adhdeer';
import amiai from './amiai';
import bachelorThesis from './bachelorThesis';
import greenWallet from './greenWallet';
import masterThesis from './masterThesis';
import resonantRelaxation from './resonantRelaxation';

// Export all projects as a single array with proper naming
export const projectsData = [
  masterThesis,
  resonantRelaxation,
  amiai,
  greenWallet,
  adhdeer,
  bachelorThesis
];

// Add required exports for the files that import them
export const processedProjects = projectsData;
export const allProjects = projectsData;
export const projects = projectsData;

// Also export individual projects for direct access
export {
  greenWallet,
  amiai,
  bachelorThesis,
  adhdeer,
  masterThesis,
  resonantRelaxation
};

export default projectsData;