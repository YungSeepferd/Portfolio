/**
 * MediaPathResolver
 * 
 * Utility for resolving media paths across the application.
 * Centralizes path logic and handles different media types consistently.
 */

import { isVideo } from './mediaHelper';

// Base paths for different media types
const BASE_PATHS = {
  // All media is actually stored in the images directory by project
  images: '/assets/images/',
  videos: '/assets/images/' // We use the images directory for videos too
};

/**
 * Resolves a media path for a specific project
 * 
 * @param {string} projectKey - The project key/name (folder name)
 * @param {string} fileName - The file name including extension
 * @param {string} mediaType - Type of media ('images', 'videos')
 * @returns {string} - The resolved file path
 */
export const resolveProjectMediaPath = (projectKey, fileName, mediaType = 'images') => {
  const basePath = BASE_PATHS[mediaType] || BASE_PATHS.images;
  return `${basePath}${projectKey}/${fileName}`;
};

/**
 * Process a raw media path or object to ensure consistent format
 * 
 * @param {string|Object} media - Raw media path or object
 * @returns {Object} - Processed media object with type and src
 */
export const processMediaItem = (media) => {
  // If it's already a processed object, return it
  if (media && typeof media === 'object' && media.src) {
    return media;
  }
  
  // Handle string paths
  if (typeof media === 'string') {
    return {
      type: isVideo(media) ? 'video' : 'image',
      src: media
    };
  }
  
  // Return null for invalid inputs
  return null;
};

/**
 * Try multiple possible paths for a media file
 * Useful for finding files when exact path is uncertain
 * 
 * @param {string} projectKey - The project folder name
 * @param {string} fileName - The file name to find
 * @returns {string|null} - The first working path or null
 */
export const findMediaPath = (projectKey, fileName) => {
  // Different possible locations to check
  const possiblePaths = [
    `assets/images/${projectKey}/${fileName}`,
    `assets/videos/${projectKey}/${fileName}`,
    `src/assets/images/${projectKey}/${fileName}`,
    `src/assets/videos/${projectKey}/${fileName}`
  ];
  
  // In a real implementation, we would try to access each path
  // but for now we'll just return the first path as we can't
  // actually check file existence at build time
  return possiblePaths[0];
};

export default {
  resolveProjectMediaPath,
  processMediaItem,
  findMediaPath
};
