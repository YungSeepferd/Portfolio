/**
 * Utility functions for analyzing and enhancing image metadata
 */

/**
 * Analyzes an image and returns enhanced metadata
 * @param {string|Object} image - Image URL or image object
 * @returns {Object} Enhanced image object with metadata
 */
export const analyzeImage = (image) => {
  // If already an enhanced object, return it
  if (typeof image === 'object' && image.src) {
    return image;
  }
  
  // Create basic image object if just a string URL was provided
  const imageSrc = typeof image === 'string' ? image : image?.src || '';
  const baseImageData = {
    src: imageSrc,
    alt: '',
    aspectRatio: null,
    orientation: 'unknown',
    processed: false
  };
  
  // For server-side rendering or build time, we can't analyze dimensions dynamically
  // Here we'll use naming conventions to infer orientation
  const isPortrait = 
    imageSrc.toLowerCase().includes('portrait') || 
    imageSrc.toLowerCase().includes('vertical') ||
    imageSrc.toLowerCase().includes('phone') ||
    imageSrc.toLowerCase().includes('mobile');
    
  const isLandscape = 
    imageSrc.toLowerCase().includes('landscape') || 
    imageSrc.toLowerCase().includes('horizontal') ||
    imageSrc.toLowerCase().includes('desktop') ||
    imageSrc.toLowerCase().includes('computer');
  
  if (isPortrait) {
    return {
      ...baseImageData,
      orientation: 'portrait',
      aspectRatio: 0.75, // Typical portrait ratio (3:4)
      processed: true
    };
  } else if (isLandscape) {
    return {
      ...baseImageData,
      orientation: 'landscape',
      aspectRatio: 1.78, // Typical landscape ratio (16:9)
      processed: true
    };
  }
  
  // Default to landscape if we can't determine
  return {
    ...baseImageData,
    orientation: 'landscape',
    processed: true
  };
};

/**
 * Determines the best object-fit property based on image orientation and container
 * @param {Object} image - Image object with metadata
 * @param {string} containerOrientation - 'portrait' or 'landscape'
 * @returns {string} - Appropriate object-fit value
 */
export const getOptimalObjectFit = (image, containerOrientation) => {
  // If orientations match, use 'cover'
  if (image.orientation === containerOrientation) {
    return 'cover';
  }
  
  // If orientations don't match (e.g., portrait image in landscape container)
  return 'contain';
};

/**
 * Batch processes an array of images
 * @param {Array} images - Array of image URLs or objects
 * @returns {Array} - Array of processed image objects
 */
export const processImageArray = (images) => {
  if (!Array.isArray(images)) return [];
  return images.map(img => analyzeImage(img));
};
