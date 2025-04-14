/**
 * Media Utilities
 * 
 * This file provides utility functions for handling media assets
 * throughout the application, ensuring consistent path resolution
 * and error handling.
 */

/**
 * Analyzes an image to determine optimal display settings
 * 
 * @param {string|Object} src - The image source or object containing src
 * @param {Object} options - Optional configuration
 * @returns {Object} Image analysis data
 */
export const analyzeImage = (src, options = {}) => {
  // Extract the source URL if src is an object
  const imgSrc = typeof src === 'object' && src !== null ? src.src : src;
  
  if (!imgSrc) {
    console.warn('Invalid image source provided to analyzeImage');
    return {
      isPortrait: false,
      isLandscape: true,
      aspectRatio: 16/9, // Default to landscape
      src: imgSrc || 'https://via.placeholder.com/600x400?text=Image+Not+Found',
    };
  }
  
  // Create a dummy image to get dimensions (client-side only)
  if (typeof window !== 'undefined') {
    const img = new Image();
    img.src = imgSrc;
    
    // For already loaded images, we can get dimensions immediately
    if (img.complete && img.naturalWidth > 0) {
      const isPortrait = img.naturalHeight > img.naturalWidth;
      return {
        isPortrait,
        isLandscape: !isPortrait,
        aspectRatio: img.naturalWidth / img.naturalHeight,
        src: imgSrc,
      };
    }
    
    // Otherwise make an educated guess based on URL patterns
    if (imgSrc.includes('portrait') || imgSrc.includes('vertical')) {
      return {
        isPortrait: true,
        isLandscape: false,
        aspectRatio: 3/4, // Typical portrait ratio
        src: imgSrc,
      };
    }
  }
  
  // Default fallback
  return {
    isPortrait: false,
    isLandscape: true,
    aspectRatio: 16/9, // Default landscape ratio
    src: imgSrc,
  };
};

/**
 * Determines the optimal object-fit value based on image analysis
 * 
 * @param {Object} imageData - Data from analyzeImage() or image dimensions
 * @param {string} containerOrientation - 'portrait', 'landscape', or 'square'
 * @returns {string} - CSS object-fit value (cover, contain, etc)
 */
export const getOptimalObjectFit = (imageData, containerOrientation = 'landscape') => {
  // If no image data, default to cover which works well in most cases
  if (!imageData) return 'cover';
  
  // Extract image properties
  const { isPortrait, isLandscape, aspectRatio } = imageData;
  
  // Handle container orientation
  if (containerOrientation === 'portrait') {
    // Portrait container
    if (isPortrait) {
      // Portrait image in portrait container - use cover
      return 'cover';
    } else {
      // Landscape image in portrait container - use contain for wide images
      return aspectRatio > 2 ? 'contain' : 'cover';
    }
  } else if (containerOrientation === 'square') {
    // Square container - use cover for most cases
    return 'cover';
  } else {
    // Landscape container (default)
    if (isLandscape) {
      // Landscape image in landscape container - use cover
      return 'cover';
    } else {
      // Portrait image in landscape container - use contain for tall images
      return aspectRatio < 0.5 ? 'contain' : 'cover';
    }
  }
};

/**
 * Determines if a file is a video based on extension or MIME type
 * 
 * @param {string} src - The file source URL
 * @returns {boolean} True if the file appears to be a video
 */
export const isVideo = (src) => {
  if (!src || typeof src !== 'string') return false;
  
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
  const hasVideoExtension = videoExtensions.some(ext => 
    src.toLowerCase().endsWith(ext)
  );
  
  // Check for video in URL
  const hasVideoInUrl = src.toLowerCase().includes('video') || 
                        src.toLowerCase().includes('movie');
  
  return hasVideoExtension || hasVideoInUrl;
};

/**
 * Creates resource paths for information assets like PDFs
 * This is used for documents in the "assets/information" folder
 * 
 * @param {string} section - The section name (e.g., 'ADHDeer', 'Master thesis')
 * @param {string} filename - The document filename 
 * @returns {string} - The correct document path
 */
export const getAssetPath = (section, filename) => {
  return `/assets/information/${section}/${filename}`;
};

/**
 * Creates an image object with position data for the About section slideshow
 * Note: This expects the images to be directly imported in the component
 * 
 * @param {string} imgSrc - The imported image source
 * @param {string} alt - Alt text for the image
 * @param {string} position - CSS object-position value
 * @returns {Object} - Image object with src, alt, and position
 */
export const createAboutImage = (imgSrc, alt, position = 'center center') => {
  return {
    src: imgSrc,
    alt: alt || (typeof imgSrc === 'string' ? imgSrc.split('/').pop().replace(/\.[^/.]+$/, "") : "Image"),
    position
  };
};

// Export all utilities as named exports
export {
  // Functions already exported above
};

// Create a properly named export object
const mediaUtils = {
  analyzeImage,
  isVideo,
  getAssetPath,
  createAboutImage,
  getOptimalObjectFit
};

// Export the named object as default
export default mediaUtils;
