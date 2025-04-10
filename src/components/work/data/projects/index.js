/**
 * Projects Collection
 * 
 * This file imports all individual project files, combines them,
 * and processes them for use throughout the application.
 */

// Import project-specific data
import masterThesis from './masterThesis';
import resonantRelaxation from './resonantRelaxation';
import amiai from './amiai';
import greenWallet from './greenWallet';
import adhdeer from './adhdeer';
import bachelorThesis from './bachelorThesis';

/**
 * Collection of all projects in their preferred order
 */
export const allProjects = [
  masterThesis,
  resonantRelaxation,
  amiai,
  greenWallet, 
  adhdeer,
  bachelorThesis
];

/**
 * Process and enhance raw project data
 * @param {Array} projects - Raw project data
 * @returns {Array} - Processed projects with enhanced media info
 */
const processProjects = (projects) => {
  return projects.map(project => {
    // Process images array to identify videos
    const processedImages = project.images?.map(img => {
      // For strings, just return as is
      if (typeof img === 'string') return img;
      
      // For already processed objects, maintain their structure
      if (img && img.src) return img;
      
      // Video detection based on filename
      const fileStr = String(img);
      const isVideo = fileStr.endsWith('.mp4') || 
                      fileStr.endsWith('.mov') || 
                      fileStr.endsWith('.webm');
      
      return isVideo 
        ? { type: 'video', src: img } 
        : { type: 'image', src: img };
    }) || [];
    
    // Process media object
    const processedMedia = project.media 
      ? (project.media.type ? project.media : { type: 'image', src: project.media })
      : null;
    
    // Prioritize cover images (non-videos) for project cards
    const sortedImages = [...processedImages].sort((a, b) => {
      const aIsVideo = typeof a === 'object' && a.type === 'video';
      const bIsVideo = typeof b === 'object' && b.type === 'video';
      
      // Sort: images first, then videos
      return aIsVideo === bIsVideo ? 0 : aIsVideo ? 1 : -1;
    });
    
    return {
      ...project,
      images: sortedImages,
      media: processedMedia
    };
  });
};

/**
 * Processed projects ready for use in components
 */
export const processedProjects = processProjects(allProjects);