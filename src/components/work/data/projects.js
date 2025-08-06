/**
 * Project data centralization and processing
 *
 * This file imports raw project data and exports processed versions
 */

// Import from projects folder - remove unused rawProjects
import { projectsData } from './projects/index';

// Re-export what other files expect
export const processedProjects = projectsData;
export const allProjects = projectsData;
export const projects = projectsData;

// Default export should be the processed array of projects
export default projects;
