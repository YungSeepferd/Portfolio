/**
 * Media Utilities
 *
 * This file provides utility functions for handling media assets
 * throughout the application, ensuring consistent path resolution
 * and error handling.
 */

import { mediaResolver } from './MediaPathResolver';

/**
 * Analyzes an image to determine optimal display settings
 *
 * @param {string|Object} src - The image source or object containing src
 * @param {Object} options - Optional configuration
 * @returns {Object} Image analysis data
 */
export const analyzeImage = (src, _options = {}) => {
  // Extract the source URL if src is an object
  const imgSrc = typeof src === 'object' && src !== null ? src.src : src;

  if (!imgSrc) {
    console.warn('Invalid image source provided to analyzeImage');
    return {
      isPortrait: false,
      isLandscape: true,
      aspectRatio: 16 / 9, // Default to landscape
      src: imgSrc || 'https://via.placeholder.com/600x400?text=Image+Not+Found',
    };
  }

  // Create a dummy image to get dimensions (client-side only)
  if (typeof window !== 'undefined' && typeof window.Image !== 'undefined') {
    const img = new window.Image();
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
        aspectRatio: 3 / 4, // Typical portrait ratio
        src: imgSrc,
      };
    }
  }

  // Default fallback
  return {
    isPortrait: false,
    isLandscape: true,
    aspectRatio: 16 / 9, // Default landscape ratio
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
  if (!src) return false;

  // Handle case where src is an object with type and src properties
  if (typeof src === 'object' && src.type) {
    return src.type === 'video';
  }

  // Get the actual src string
  const srcString = typeof src === 'object' ? src.src : src;
  if (!srcString) return false;

  // Check file extension
  const hasVideoExtension = srcString.toLowerCase().match(/\.(mp4|webm|mov|avi)$/);

  // Check URL patterns that might indicate video content
  const hasVideoInUrl =
    srcString.toLowerCase().includes('/video/') ||
    srcString.toLowerCase().includes('movie') ||
    srcString.toLowerCase().includes('video');

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
    alt:
      alt ||
      (typeof imgSrc === 'string'
        ? imgSrc
            .split('/')
            .pop()
            .replace(/\.[^/.]+$/, '')
        : 'Image'),
    position,
  };
};

/**
 * Validates and normalizes project section types to ensure they match allowed types
 *
 * @param {string} type - The original section type
 * @returns {string} - A valid section type that's supported by the ProjectSections component
 */
export const normalizeSectionType = (type) => {
  // List of allowed section types from the error message
  const allowedTypes = [
    'default',
    'overview',
    'problem',
    'research',
    'methodology',
    'technical',
    'findings',
    'recommendations',
    'content',
    'concept',
    'impact',
    'benefits',
    'future',
    'gallery',
    'outcomes',
    'takeaways',
    'prototype',
    'custom',
    'persona',
    'testimonial',
    'timeline',
    'video',
    'onboarding',
    'researchHighlight',
    'motivation',
  ];

  // If the type is null or undefined, default to "custom"
  if (!type) return 'custom';

  // Convert to lowercase for case-insensitive comparison
  const normalizedType = type.toLowerCase();

  // If the type is already allowed (case-insensitive), return the properly cased version
  const matchedType = allowedTypes.find((t) => t.toLowerCase() === normalizedType);
  if (matchedType) {
    return matchedType;
  }

  // Map common non-standard types to standard ones
  const typeMap = {
    context: 'overview', // Map 'context' to 'overview' as it seems the most appropriate
    background: 'overview',
    introduction: 'overview',
    summary: 'overview',
    details: 'content',
    process: 'methodology',
    result: 'outcomes',
    results: 'outcomes',
    conclusion: 'takeaways',
    // Add more mappings as needed
  };

  // Return the mapped type or default to "custom" if no mapping exists
  return typeMap[normalizedType] || 'custom';
};

/**
 * Gets the media type (image/video) for a given source
 * @param {string} src - The source URL or path of the media
 * @returns {string} The media type ('image', 'video', or null)
 */
export const getMediaType = (src) => {
  return mediaResolver.getMediaType(typeof src === 'object' && src?.src ? src.src : src);
};

// Export all utilities as named exports
export // Functions already exported above
 {};

// Create a properly named export object
const mediaUtils = {
  analyzeImage,
  isVideo,
  getAssetPath,
  createAboutImage,
  getOptimalObjectFit,
  getMediaType,
  normalizeSectionType,
};

// Export the named object as default
export default mediaUtils;
