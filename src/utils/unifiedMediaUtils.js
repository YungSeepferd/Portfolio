/**
 * Unified Media Utilities
 * 
 * This file consolidates all media-related functions from:
 * - mediaUtils.js
 * - mediaHelper.js
 * - MediaPathResolver.js
 * - imageAnalyzer.js
 * 
 * Having these functions in one place reduces duplication and makes maintenance easier.
 */

import { mediaConfig } from '../config/mediaConfig';

// ============================================================
// PATH RESOLUTION
// ============================================================

/**
 * Resolves media paths based on configuration
 * @param {string} path - Raw path or filename
 * @param {string} type - Media type (image, video, pdf, etc.)
 * @returns {string} Resolved absolute path
 */
export const resolveMediaPath = (path, type = 'image') => {
  if (!path) return '';
  
  // If already an absolute URL or data URL, return as is
  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  // Get base path for this type from config
  const basePath = mediaConfig?.paths?.[type] || '';
  
  // If path already includes the base, don't add it again
  if (path.includes(basePath)) {
    return path;
  }
  
  return `${basePath}/${path}`;
};

/**
 * Parse project content paths
 * @param {Object} content - Content object with paths
 * @returns {Object} Content with resolved paths
 */
export const parseContentPaths = (content) => {
  if (!content) return null;
  
  return {
    ...content,
    image: content.image ? resolveMediaPath(content.image, 'image') : null,
    video: content.video ? resolveMediaPath(content.video, 'video') : null,
    pdf: content.pdf ? resolveMediaPath(content.pdf, 'pdf') : null,
  };
};

// ============================================================
// MEDIA PROCESSING
// ============================================================

/**
 * Process media item based on its type
 * @param {Object} mediaItem - Media item to process
 * @returns {Object} Processed media item with correct paths
 */
export const processMedia = async (mediaItem) => {
  if (!mediaItem) return null;
  
  const { type = 'image', src, alt, title } = mediaItem;
  
  // Resolve path based on media type
  const resolvedSrc = resolveMediaPath(src, type);
  
  // Process based on type
  switch (type) {
    case 'image':
      return {
        ...mediaItem,
        src: resolvedSrc,
        aspectRatio: await getImageAspectRatio(resolvedSrc)
      };
    case 'video':
      return {
        ...mediaItem,
        src: resolvedSrc,
        poster: mediaItem.poster ? resolveMediaPath(mediaItem.poster, 'image') : null
      };
    case 'pdf':
      return {
        ...mediaItem,
        src: resolvedSrc
      };
    default:
      return {
        ...mediaItem,
        src: resolvedSrc
      };
  }
};

/**
 * Get responsive image sizes
 * @param {string} src - Image source
 * @param {Object} options - Size options
 * @returns {Object} Responsive image sources
 */
export const getResponsiveImageSources = (src, options = {}) => {
  if (!src) return {};
  
  const { 
    sizes = [400, 800, 1200, 1600], 
    defaultSize = 800,
    quality = 80 
  } = options;
  
  // If not using an image service that supports dynamic resizing, return original
  if (!src.includes('cloudinary.com') && !src.includes('imgix.net')) {
    return {
      src,
      srcSet: '',
      sizes: ''
    };
  }
  
  // Generate srcset for responsive images
  const srcSet = sizes.map(size => {
    // Format URL based on image service
    let sizedSrc = src;
    
    if (src.includes('cloudinary.com')) {
      // Cloudinary format
      sizedSrc = src.replace('/upload/', `/upload/w_${size},q_${quality}/`);
    } else if (src.includes('imgix.net')) {
      // Imgix format
      const separator = src.includes('?') ? '&' : '?';
      sizedSrc = `${src}${separator}w=${size}&q=${quality}`;
    }
    
    return `${sizedSrc} ${size}w`;
  }).join(', ');
  
  // Default source
  let defaultSrc = src;
  if (src.includes('cloudinary.com')) {
    defaultSrc = src.replace('/upload/', `/upload/w_${defaultSize},q_${quality}/`);
  } else if (src.includes('imgix.net')) {
    const separator = src.includes('?') ? '&' : '?';
    defaultSrc = `${src}${separator}w=${defaultSize}&q=${quality}`;
  }
  
  return {
    src: defaultSrc,
    srcSet,
    sizes: '(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw'
  };
};

// ============================================================
// IMAGE ANALYSIS
// ============================================================

/**
 * Get aspect ratio of an image
 * @param {string} src - Image source
 * @returns {number} Aspect ratio (width/height)
 */
export const getImageAspectRatio = (src) => {
  return new Promise((resolve) => {
    // Default aspect ratio as fallback
    const defaultRatio = 16/9;
    
    if (!src) {
      resolve(defaultRatio);
      return;
    }
    
    const img = new Image();
    
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      resolve(aspectRatio);
    };
    
    img.onerror = () => {
      console.warn(`Failed to load image for aspect ratio calculation: ${src}`);
      resolve(defaultRatio);
    };
    
    img.src = src;
  });
};

/**
 * Check if image is mostly dark to adapt UI
 * @param {string} src - Image source
 * @returns {Promise<boolean>} Whether the image is mostly dark
 */
export const isImageDark = (src) => {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      // Use a small sample size for performance
      canvas.width = 10;
      canvas.height = 10;
      
      // Draw and sample the image
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 10, 10);
      const imageData = ctx.getImageData(0, 0, 10, 10).data;
      
      // Calculate average brightness
      let totalBrightness = 0;
      let pixelCount = 0;
      
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        
        // Perceived brightness formula (human eye is more sensitive to green)
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        totalBrightness += brightness;
        pixelCount++;
      }
      
      const averageBrightness = totalBrightness / pixelCount;
      
      // Consider dark if brightness is less than 0.5 (50%)
      resolve(averageBrightness < 0.5);
    };
    
    img.onerror = () => {
      console.warn(`Failed to analyze image brightness: ${src}`);
      resolve(false);
    };
    
    img.crossOrigin = 'Anonymous';
    img.src = src;
  });
};

// ============================================================
// EXPORTS ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================

// These aliases ensure existing code continues to work
export const getMediaPath = resolveMediaPath;
export const parseMediaPaths = parseContentPaths;
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};