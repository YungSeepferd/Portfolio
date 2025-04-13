/**
 * Project Utilities
 * 
 * This file contains utility functions for working with project data.
 * These functions help with common operations like filtering, searching, and categorizing projects.
 */

import { resolveMediaPath } from './MediaPathResolver';

/**
 * Filter projects by category
 * 
 * @param {Array} projects - Array of project objects
 * @param {String} category - Category to filter by
 * @returns {Array} - Filtered array of projects that contain the specified category
 */
export const filterProjectsByCategory = (projects, category) => {
  if (!category) return projects;
  return projects.filter(project => 
    project.categories && project.categories.includes(category)
  );
};

/**
 * Search projects by text
 * 
 * @param {Array} projects - Array of project objects
 * @param {String} searchTerm - Text to search for
 * @returns {Array} - Filtered array of projects that match the search term
 */
export const searchProjects = (projects, searchTerm) => {
  if (!searchTerm) return projects;
  
  const term = searchTerm.toLowerCase();
  return projects.filter(project => {
    const title = project.title ? project.title.toLowerCase() : '';
    const description = project.description ? project.description.toLowerCase() : '';
    const categories = project.categories ? 
      project.categories.map(cat => cat.toLowerCase()).join(' ') : '';
    const tools = project.tools ? 
      project.tools.map(tool => tool.toLowerCase()).join(' ') : '';
    
    return title.includes(term) || 
           description.includes(term) || 
           categories.includes(term) ||
           tools.includes(term);
  });
};

/**
 * Get unique categories from all projects
 * 
 * @param {Array} projects - Array of project objects
 * @returns {Array} - Array of unique category strings
 */
export const getUniqueCategories = (projects) => {
  const categoriesSet = new Set();
  
  projects.forEach(project => {
    if (project.categories && Array.isArray(project.categories)) {
      project.categories.forEach(category => categoriesSet.add(category));
    }
  });
  
  return Array.from(categoriesSet).sort();
};

/**
 * Get unique tools from all projects
 * 
 * @param {Array} projects - Array of project objects
 * @returns {Array} - Array of unique tool strings
 */
export const getUniqueTools = (projects) => {
  const toolsSet = new Set();
  
  projects.forEach(project => {
    if (project.tools && Array.isArray(project.tools)) {
      project.tools.forEach(tool => toolsSet.add(tool));
    }
  });
  
  return Array.from(toolsSet).sort();
};

/**
 * Organize projects into display matrix
 * 
 * @param {Array} projects - Array of project objects
 * @param {Object} options - Configuration options
 * @param {Number} options.primaryCount - Number of projects for primary display (default: 4)
 * @param {Number} options.secondaryCount - Number of projects for secondary display (default: 4)
 * @returns {Object} - Object with primary, secondary, and additional project arrays
 */
export const organizeProjectsMatrix = (projects, options = {}) => {
  const { 
    primaryCount = 4, 
    secondaryCount = 4,
    sortFn = (a, b) => a.id < b.id ? -1 : 1
  } = options;
  
  // Sort projects based on provided sort function
  const sortedProjects = [...projects].sort(sortFn);
  
  return {
    primary: sortedProjects.slice(0, primaryCount),
    secondary: sortedProjects.slice(primaryCount, primaryCount + secondaryCount),
    additional: sortedProjects.slice(primaryCount + secondaryCount)
  };
};

/**
 * Extract image source from different possible project image formats
 * 
 * @param {Object|string} mediaObj - Media object or string path
 * @param {string} defaultPath - Default path if no source is found
 * @returns {string} The resolved image source path
 */
export const getImageSource = (mediaObj, defaultPath = '/assets/images/placeholders/project.jpg') => {
  if (!mediaObj) return defaultPath;
  
  if (typeof mediaObj === 'string') {
    return resolveMediaPath(mediaObj);
  }
  
  if (mediaObj.src) {
    return resolveMediaPath(mediaObj.src);
  }
  
  if (mediaObj.type === 'image' && mediaObj.src) {
    return resolveMediaPath(mediaObj.src);
  }
  
  return defaultPath;
};

/**
 * Standardize links format to always be an array
 * 
 * @param {Array|Object} links - Links in array or object format
 * @returns {Array} Standardized links array
 */
export const standardizeLinks = (links) => {
  if (!links) return [];
  
  if (Array.isArray(links)) {
    return links;
  }
  
  if (typeof links === 'object') {
    return Object.values(links);
  }
  
  return [];
};

/**
 * Get the primary media for a project (for cards, headers, etc.)
 * 
 * @param {Object} project - The project object
 * @param {string} defaultPath - Default path if no media is found
 * @returns {string} The resolved primary media path
 */
export const getProjectPrimaryMedia = (project, defaultPath = '/assets/images/placeholders/project.jpg') => {
  if (!project) return defaultPath;
  
  // Try media object first
  if (project.media) {
    return getImageSource(project.media, null);
  }
  
  // Then try featuredImages.overview
  if (project.featuredImages?.overview) {
    return getImageSource(project.featuredImages.overview, null);
  }
  
  // Then try the first gallery image
  if (project.galleryImages && project.galleryImages.length > 0) {
    const firstImage = project.galleryImages.find(img => 
      typeof img === 'string' || 
      (img && img.type !== 'video')
    );
    if (firstImage) {
      return getImageSource(firstImage, null);
    }
  }
  
  return defaultPath;
};

/**
 * Get hero media (image or video) for a project
 * 
 * @param {Object} project - The project object 
 * @returns {Object} Media object with type and src
 */
export const getProjectHeroMedia = (project) => {
  if (!project) {
    return { 
      type: 'image', 
      src: '/assets/images/placeholders/project.jpg' 
    };
  }
  
  // Try heroVideo first
  if (project.heroVideo) {
    return { 
      type: 'video', 
      src: resolveMediaPath(project.heroVideo) 
    };
  }
  
  // Try videos from galleryImages
  if (project.galleryImages && project.galleryImages.length > 0) {
    const videoItem = project.galleryImages.find(item => 
      (typeof item === 'object' && item.type === 'video') ||
      (typeof item === 'string' && (item.endsWith('.mp4') || item.endsWith('.webm') || item.endsWith('.mov')))
    );
    
    if (videoItem) {
      return { 
        type: 'video', 
        src: typeof videoItem === 'object' ? resolveMediaPath(videoItem.src) : resolveMediaPath(videoItem) 
      };
    }
  }
  
  // Try heroImage
  if (project.heroImage) {
    return { 
      type: 'image', 
      src: resolveMediaPath(project.heroImage) 
    };
  }
  
  // Try media object
  if (project.media) {
    if (typeof project.media === 'string') {
      return { type: 'image', src: resolveMediaPath(project.media) };
    }
    if (typeof project.media === 'object') {
      const type = project.media.type || 'image';
      const src = resolveMediaPath(project.media.src);
      return { type, src };
    }
  }
  
  // Try featuredImages.overview
  if (project.featuredImages?.overview) {
    if (typeof project.featuredImages.overview === 'string') {
      return { type: 'image', src: resolveMediaPath(project.featuredImages.overview) };
    }
    if (typeof project.featuredImages.overview === 'object') {
      const type = project.featuredImages.overview.type || 'image';
      const src = resolveMediaPath(project.featuredImages.overview.src);
      return { type, src };
    }
  }
  
  // Fallback to first gallery image
  if (project.galleryImages && project.galleryImages.length > 0) {
    const firstImage = project.galleryImages[0];
    if (typeof firstImage === 'string') {
      return { type: 'image', src: resolveMediaPath(firstImage) };
    }
    if (typeof firstImage === 'object') {
      const type = firstImage.type || 'image';
      const src = resolveMediaPath(firstImage.src);
      return { type, src };
    }
  }
  
  // Ultimate fallback
  return { 
    type: 'image', 
    src: '/assets/images/placeholders/project.jpg' 
  };
};

/**
 * Project utility functions to manage and transform project data
 */

// Fix the default export by assigning to a variable first
const projectUtils = {
  filterProjectsByCategory,
  searchProjects,
  getUniqueCategories,
  getUniqueTools,
  organizeProjectsMatrix,
  getImageSource,
  standardizeLinks,
  getProjectPrimaryMedia,
  getProjectHeroMedia
};

export default projectUtils;