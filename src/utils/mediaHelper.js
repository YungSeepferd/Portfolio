/**
 * Media Helper Utilities
 * 
 * Centralizes image and video path handling to avoid path-related issues
 */

// Define the base paths for various media types
export const BASE_PATHS = {
  images: '/images', // Public folder images
  videos: '/videos', // Public folder videos
  documents: '/documents', // Public folder documents
  assets: '/assets' // General assets folder
};

/**
 * Generates a correct image path based on the environment and source
 * @param {string} source - Image source path or filename
 * @returns {string} - Properly formatted image path
 */
export const getImagePath = (source) => {
  if (!source) return '/images/placeholder.png';
  
  // If source is already a full URL or absolute path, return it as is
  if (source.startsWith('http') || source.startsWith('/')) {
    return source;
  }
  
  // Otherwise, prefix with the base path
  return `${BASE_PATHS.images}/${source}`;
};

/**
 * Generates a correct path for any public media file (images, videos, docs)
 * @param {string} source - Media source path or filename
 * @returns {string} - Properly formatted media path
 */
export const getPublicMediaUrl = (source) => {
  if (!source) return null;
  
  // If source is already a full URL or absolute path, return it as is
  if (typeof source === 'string' && (source.startsWith('http') || source.startsWith('/'))) {
    return source;
  }
  
  // Handle non-string sources
  if (typeof source !== 'string') {
    console.warn('Non-string source provided to getPublicMediaUrl:', source);
    return null;
  }
  
  // Determine media type from extension
  if (source.match(/\.(mp4|webm|mov|avi)$/i)) {
    return `${BASE_PATHS.videos}/${source}`;
  } else if (source.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    return `${BASE_PATHS.images}/${source}`;
  } else if (source.match(/\.(pdf|doc|docx|ppt|pptx)$/i)) {
    return `${BASE_PATHS.documents}/${source}`;
  }
  
  // If type can't be determined, return as is with assets prefix
  return `${BASE_PATHS.assets}/${source}`;
};

/**
 * Checks if a media file is a video based on its extension
 * @param {string|object} path - File path or object containing path
 * @returns {boolean} - True if the file is a video
 */
export const isVideo = (path) => {
  // Handle no path
  if (!path) return false;
  
  // Handle object with src property (e.g. {src: 'video.mp4'})
  if (typeof path === 'object' && path !== null) {
    // If it's an object, look for a src property
    if (path.src) return isVideo(path.src);
    
    // If there's no src property, it's not a video
    console.warn('Object passed to isVideo without src property:', path);
    return false;
  }
  
  // Ensure path is a string before calling toLowerCase
  if (typeof path !== 'string') {
    console.warn('Non-string path provided to isVideo:', path);
    return false;
  }
  
  // Now we know path is a string, continue with the check
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  return videoExtensions.some(ext => path.toLowerCase().endsWith(ext));
};

/**
 * Creates a thumbnail for videos
 * @param {string|object} videoSrc - Video source path or object with src property
 * @returns {string} - Path to video thumbnail
 */
export const createVideoThumbnail = (videoSrc) => {
  // Handle object with src property
  if (typeof videoSrc === 'object' && videoSrc !== null && videoSrc.src) {
    videoSrc = videoSrc.src;
  }
  
  if (!videoSrc || typeof videoSrc !== 'string') {
    return '/images/video-placeholder.png';
  }
  
  // Replace video extension with jpg for thumbnail
  // This assumes you have thumbnails with the same name but .jpg extension
  return videoSrc.replace(/\.(mp4|webm|ogg|mov)$/i, '.jpg');
};

/**
 * Fixes problematic file paths by handling various edge cases
 * @param {string} path - Original file path
 * @returns {string} - Fixed path
 */
export const fixFilePath = (path) => {
  if (!path || typeof path !== 'string') return '';
  
  // Remove double slashes except after protocol
  let fixedPath = path.replace(/([^:])\/\//g, '$1/');
  
  // Handle spaces in file paths
  fixedPath = fixedPath.replace(/ /g, '%20');
  
  return fixedPath;
};
