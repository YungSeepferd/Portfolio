/**
 * Consolidated Media Utilities
 * 
 * This file combines functions from imageUtils.js, imageAnalyzer.js, mediaHelper.js,
 * and unifiedMediaUtils.js to provide a single source for media-related utilities.
 */

// ============================================================
// RETRY LOGIC
// ============================================================
const IMAGE_RETRY_MAP = new Map();

export const shouldRetryImage = (src) => {
  if (!src) return false;
  const attempts = IMAGE_RETRY_MAP.get(src) || 0;
  const GLOBAL_MAX_RETRIES = 10;
  if (attempts >= GLOBAL_MAX_RETRIES) return false;
  IMAGE_RETRY_MAP.set(src, attempts + 1);
  return true;
};

export const resetImageRetry = (src) => {
  if (src) IMAGE_RETRY_MAP.delete(src);
};

export const getRetryUrl = (src, attempt) => {
  if (!src) return '';
  const hasQuery = src.includes('?');
  const separator = hasQuery ? '&' : '?';
  return `${src}${separator}retry=${attempt}&t=${Date.now()}`;
};

export const getProgressiveDelay = (baseDelay, attempt) => {
  return baseDelay * Math.pow(1.5, attempt);
};

// ============================================================
// IMAGE ANALYSIS
// ============================================================
export const analyzeImage = (src) => {
  const imageSrc = typeof src === 'string' ? src : (src?.src || null);
  if (!imageSrc) {
    return { src: '/images/placeholder.png', orientation: 'landscape', aspectRatio: 16 / 9, isPortrait: false, alt: 'Placeholder image' };
  }
  const details = { src: imageSrc, orientation: 'unknown', aspectRatio: null, isPortrait: false, alt: typeof src === 'object' && src?.alt ? src.alt : 'Image' };
  if (imageSrc.toLowerCase().includes('portrait')) {
    details.orientation = 'portrait';
    details.isPortrait = true;
    details.aspectRatio = 3 / 4;
  } else if (imageSrc.toLowerCase().includes('landscape')) {
    details.orientation = 'landscape';
    details.aspectRatio = 16 / 9;
  } else if (imageSrc.toLowerCase().includes('square')) {
    details.orientation = 'square';
    details.aspectRatio = 1;
  }
  return details;
};

export const getOptimalObjectFit = (imageDetails, containerOrientation) => {
  if (!imageDetails) return 'cover';
  const { orientation } = imageDetails;
  if (orientation === 'unknown') return 'cover';
  if (orientation === 'square') return 'cover';
  if (orientation === containerOrientation) return 'cover';
  return 'contain';
};

// ============================================================
// PATH HANDLING
// ============================================================
const BASE_PATHS = {
  images: '/images',
  videos: '/videos',
  documents: '/documents',
  assets: '/assets',
};

export const getImagePath = (source) => {
  if (!source) return '/images/placeholder.png';
  if (source.startsWith('http') || source.startsWith('/')) return source;
  return `${BASE_PATHS.images}/${source}`;
};

export const getPublicMediaUrl = (source) => {
  if (!source) return null;
  if (source.startsWith('http') || source.startsWith('/')) return source;
  if (source.match(/\.(mp4|webm|mov|avi)$/i)) return `${BASE_PATHS.videos}/${source}`;
  if (source.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) return `${BASE_PATHS.images}/${source}`;
  if (source.match(/\.(pdf|doc|docx|ppt|pptx)$/i)) return `${BASE_PATHS.documents}/${source}`;
  return `${BASE_PATHS.assets}/${source}`;
};

export const isVideo = (path) => {
  if (!path) return false;
  const str = String(path).toLowerCase();
  return str.endsWith('.mp4') || str.endsWith('.mov') || str.endsWith('.webm') || str.endsWith('.m4v');
};

export const createVideoThumbnail = (videoSrc) => {
  if (typeof videoSrc === 'object' && videoSrc !== null && videoSrc.src) {
    videoSrc = videoSrc.src;
  }
  if (!videoSrc || typeof videoSrc !== 'string') return '/images/video-placeholder.png';
  return videoSrc.replace(/\.(mp4|webm|ogg|mov)$/i, '.jpg');
};

/**
 * Normalizes an asset path to ensure it works correctly in the application
 * By removing src/ prefixes and ensuring proper public path format
 * 
 * @param {string} path - The original path to normalize
 * @returns {string} - The normalized path
 */
export function normalizeAssetPath(path) {
  if (!path) return null;
  
  // Remove any leading 'src/' as these should be in public folder
  if (path.startsWith('src/')) {
    path = path.replace('src/', '/');
  }
  
  // Ensure path starts with '/' for public folder access
  if (!path.startsWith('/') && !path.startsWith('http')) {
    path = `/${path}`;
  }
  
  return path;
}

// ============================================================
// MEDIA PROCESSING
// ============================================================
export const processMedia = (media) => {
  if (!media) return null;
  return isVideo(media) ? { type: 'video', src: typeof media === 'string' ? media : media.src || '' } : analyzeImage(media);
};
