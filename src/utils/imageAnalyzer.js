/**
 * Image Analysis Utilities
 * 
 * Provides tools for analyzing and optimizing image display
 */

/**
 * Analyzes an image to determine its orientation and properties
 * @param {string|object} src - Image source URL or object with src property
 * @returns {object} Image details including orientation
 */
export const analyzeImage = (src) => {
  // Handle different input types
  const imageSrc = typeof src === 'string' ? src : (src?.src || null);
  
  if (!imageSrc) {
    return { 
      src: '/images/placeholder.png',
      orientation: 'landscape', 
      aspectRatio: 16/9,
      isPortrait: false,
      alt: 'Placeholder image'
    };
  }

  // Default to unknown orientation until we can determine it
  const details = {
    src: imageSrc,
    orientation: 'unknown',
    aspectRatio: null,
    isPortrait: false,
    alt: typeof src === 'object' && src?.alt ? src.alt : 'Image'
  };

  // Check for common naming patterns that indicate orientation
  if (imageSrc.toLowerCase().includes('portrait') || 
      imageSrc.toLowerCase().includes('vertical') || 
      imageSrc.toLowerCase().includes('profile')) {
    details.orientation = 'portrait';
    details.isPortrait = true;
    details.aspectRatio = 3/4; // Assume 3:4 for portrait
  } 
  else if (imageSrc.toLowerCase().includes('landscape') || 
           imageSrc.toLowerCase().includes('horizontal') || 
           imageSrc.toLowerCase().includes('banner')) {
    details.orientation = 'landscape';
    details.aspectRatio = 16/9; // Assume 16:9 for landscape
  }
  else if (imageSrc.toLowerCase().includes('square')) {
    details.orientation = 'square';
    details.aspectRatio = 1; // 1:1 for square
  }

  return details;
};

/**
 * Determines the optimal object-fit property based on image orientation and container orientation
 * @param {object} imageDetails - An object containing the image's orientation and aspect ratio
 * @param {string} containerOrientation - The orientation of the container ("landscape" or "portrait")
 * @returns {string} - The optimal object-fit property ("cover" or "contain")
 */
export const getOptimalObjectFit = (imageDetails, containerOrientation) => {
  if (!imageDetails) return 'cover';

  const { orientation } = imageDetails;

  // If orientation is unknown, default to cover
  if (orientation === 'unknown') return 'cover';
  
  // For square images, cover works well
  if (orientation === 'square') return 'cover';

  // If image and container have the same orientation, use cover
  if (orientation === containerOrientation) return 'cover';
  
  // If they have different orientations, use contain to avoid cropping
  return 'contain';
};

/**
 * Batch processes an array of images
 * @param {Array} images - Array of image URLs or objects
 * @returns {Array} - Array of processed image objects
 */
export const processImageArray = (images) => {
  if (!Array.isArray(images)) return [];
  return images.map(img => {
    if (typeof img === 'string') {
      return analyzeImage(img);
    } else if (img && typeof img === 'object' && img.src) {
      return {
        ...img,
        ...analyzeImage(img.src)
      };
    }
    return analyzeImage(null); // Return default for invalid entries
  });
};

/**
 * Detects if an image is a portrait or landscape based on dimensions
 * @param {HTMLImageElement} imgElement - The image DOM element
 * @returns {string} - 'portrait', 'landscape', or 'square'
 */
export const detectImageOrientation = (imgElement) => {
  if (!imgElement || !imgElement.naturalWidth || !imgElement.naturalHeight) {
    return 'unknown';
  }
  
  const ratio = imgElement.naturalWidth / imgElement.naturalHeight;
  
  if (Math.abs(ratio - 1) < 0.1) {
    return 'square';
  } else if (ratio < 1) {
    return 'portrait';
  } else {
    return 'landscape';
  }
};
