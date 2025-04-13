/**
 * Media Utilities
 *
 * Centralizes functions for media type detection, analysis, processing,
 * and path handling.
 */

// --- Functions from mediaHelper.js ---

/**
 * Checks if a given source string or object represents a video file.
 * @param {string|Object} source - The media source (URL string or object with src/type).
 * @returns {boolean} - True if it's a video, false otherwise.
 */
export const isVideo = (source) => {
  if (!source) return false;

  const srcString = typeof source === 'string' ? source.toLowerCase() : (source.src || '').toLowerCase();
  const typeString = typeof source === 'object' ? (source.type || '').toLowerCase() : '';

  if (typeString === 'video') return true;

  return /\.(mp4|webm|ogg|mov)$/i.test(srcString);
};

/**
 * Attempts to generate a thumbnail path for a video source.
 * Assumes thumbnails have the same name but a .jpg extension.
 * @param {string|Object} videoSrc - The video source.
 * @returns {string} - Path to the potential thumbnail or a placeholder.
 */
export const createVideoThumbnail = (videoSrc) => {
  let src = '';
  if (typeof videoSrc === 'object' && videoSrc !== null && videoSrc.src) {
    src = videoSrc.src;
  } else if (typeof videoSrc === 'string') {
    src = videoSrc;
  }

  if (!src) {
    return '/images/video-placeholder.png'; // Default placeholder
  }

  // Replace video extension with jpg
  return src.replace(/\.(mp4|webm|ogg|mov)$/i, '.jpg');
};

/**
 * Fixes problematic file paths by handling double slashes and spaces.
 * @param {string} path - Original file path.
 * @returns {string} - Fixed path.
 */
export const fixFilePath = (path) => {
  if (!path || typeof path !== 'string') return '';

  // Remove double slashes except after protocol
  let fixedPath = path.replace(/([^:])\/\//g, '$1/');

  // Handle spaces in file paths (encode them)
  fixedPath = fixedPath.replace(/ /g, '%20');

  return fixedPath;
};

// --- Functions from imageAnalyzer.js ---

/**
 * Analyzes an image source to determine its properties like orientation.
 * Currently provides basic analysis based on filename or assumes landscape.
 * @param {string|Object} imageSource - URL string or object with src property.
 * @returns {Object} - Object containing image details (src, orientation, aspectRatio, alt).
 */
export const analyzeImage = (imageSource) => {
  const src = typeof imageSource === 'string' ? imageSource : imageSource?.src || '';
  const alt = typeof imageSource === 'object' ? imageSource?.alt || '' : '';

  // Basic orientation detection based on keywords in filename (can be improved)
  let orientation = 'landscape'; // Default assumption
  let aspectRatio = 16 / 9; // Default assumption

  if (src) {
    const lowerSrc = src.toLowerCase();
    if (lowerSrc.includes('portrait') || lowerSrc.includes('mobile') || lowerSrc.includes('phone')) {
      orientation = 'portrait';
      aspectRatio = 9 / 16;
    } else if (lowerSrc.includes('square')) {
      orientation = 'square';
      aspectRatio = 1;
    }
    // Placeholder for actual image analysis (e.g., using naturalWidth/naturalHeight on load)
  } else {
      orientation = 'unknown';
      aspectRatio = 1; // Unknown aspect ratio
  }


  return {
    src: src,
    orientation: orientation,
    aspectRatio: aspectRatio,
    alt: alt,
    type: 'image' // Explicitly set type
  };
};

/**
 * Determines the optimal CSS object-fit property based on image and container orientations.
 * @param {Object} imageDetails - Object returned by analyzeImage.
 * @param {string} containerOrientation - 'landscape', 'portrait', or 'square'.
 * @returns {string} - The optimal object-fit property ("cover" or "contain").
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
 * Batch processes an array of images using analyzeImage.
 * @param {Array} images - Array of image URLs or objects.
 * @returns {Array} - Array of processed image objects.
 */
export const processImageArray = (images) => {
  if (!Array.isArray(images)) return [];
  return images.map(img => {
    if (typeof img === 'string' || (img && img.src)) {
      return analyzeImage(img);
    }
    return img; // Return as is if not a recognizable image format
  });
};


// --- Function from original mediaUtils.js ---

/**
 * Unified media processing function. Determines if media is video or image
 * and returns a structured object.
 * @param {string|Object} media - The media source.
 * @returns {Object|null} - Structured media object or null.
 */
export const processMedia = (media) => {
  if (!media) return null;

  // Process based on type
  return isVideo(media) ?
    { type: 'video', src: typeof media === 'string' ? media : media.src || '' } :
    analyzeImage(media); // Use analyzeImage for images
};

// Consolidated media utilities object
const mediaUtils = {
  isVideo,
  createVideoThumbnail,
  fixFilePath,
  analyzeImage,
  getOptimalObjectFit,
  processImageArray,
  processMedia,
};

// Assign to variable before default export
export default mediaUtils;
