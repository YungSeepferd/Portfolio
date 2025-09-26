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
  if (!imageData) return 'cover';

  const { isPortrait, isLandscape, aspectRatio } = imageData;
  const normalizedAspectRatio = (Number.isFinite(aspectRatio) && aspectRatio > 0) ? aspectRatio : 1;
  const portrait = typeof isPortrait === 'boolean' ? isPortrait : normalizedAspectRatio < 1;
  const landscape = typeof isLandscape === 'boolean' ? isLandscape : !portrait;

  if (containerOrientation === 'portrait') {
    if (portrait) {
      return 'cover';
    }
    return normalizedAspectRatio > 1.6 ? 'contain' : 'cover';
  }

  if (containerOrientation === 'square') {
    if (normalizedAspectRatio > 1.5 || normalizedAspectRatio < 0.7) {
      return 'contain';
    }
    return 'cover';
  }

  // Default landscape container
  if (!landscape || portrait) {
    // `contain` keeps tall phone screenshots visible inside widescreen frames
    return normalizedAspectRatio <= 0.95 ? 'contain' : 'cover';
  }

  return 'cover';
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
export const createAboutImage = (imgSrc, alt, position = 'center center', options = {}) => {
  const metadata = typeof options === 'object' && options !== null ? options : {};
  const width = metadata.width ?? metadata.naturalWidth ?? metadata.pixelWidth;
  const height = metadata.height ?? metadata.naturalHeight ?? metadata.pixelHeight;

  let aspectRatioNumeric = metadata.aspectRatio;
  if (!aspectRatioNumeric && width && height) {
    aspectRatioNumeric = width / height;
  }

  const aspectRatioValue = metadata.aspectRatioValue
    ?? (width && height ? `${width} / ${height}` : undefined);

  return {
    src: imgSrc,
    alt: alt || (typeof imgSrc === 'string' ? imgSrc.split('/').pop().replace(/\.[^/.]+$/, "") : "Image"),
    position,
    width,
    height,
    aspectRatio: aspectRatioNumeric,
    aspectRatioValue,
    objectFit: metadata.objectFit,
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
