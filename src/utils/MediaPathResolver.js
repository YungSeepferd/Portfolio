/**
 * Media Path Resolver
 * 
 * Central utility for resolving media file paths consistently across the application.
 * Works with the new mediaConfig approach.
 */
import { designConstants } from '../theme';

/**
 * Resolves media paths to their appropriate public URL
 * Handles both regular paths and paths with src/ prefix
 * 
 * @param {string} path - The path to resolve
 * @returns {string} - The resolved path for public access
 */
export const resolveMediaPath = (path) => {
  if (!path) {
    return designConstants.placeholderImages?.project || '/assets/images/placeholders/project.jpg';
  }

  // If already an absolute URL, just return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If it's already a root-relative path, just return it
  if (path.startsWith('/')) {
    // For production with potential subdirectory deployment
    const publicUrl = process.env.PUBLIC_URL || '';
    return `${publicUrl}${path}`;
  }

  // If the path includes src/ at the beginning, replace it to make it relative to public
  if (path.startsWith('src/')) {
    return path.replace('src/', '/');
  }

  // For other paths, assume they're relative to public folder
  return `/${path}`;
};

/**
 * Gets the default placeholder image for a given media type
 * @param {string} type - Type of media (image, video, etc.)
 * @returns {string} - Path to the placeholder
 */
export const getDefaultPlaceholder = (type = 'image') => {
  const placeholders = designConstants.placeholderImages || {
    project: '/assets/images/placeholders/project.jpg',
    profile: '/assets/images/placeholders/profile.jpg',
    hero: '/assets/images/placeholders/hero.jpg'
  };

  switch (type) {
    case 'profile':
      return placeholders.profile;
    case 'hero':
      return placeholders.hero;
    case 'video':
      return placeholders.video || placeholders.project;
    default:
      return placeholders.project;
  }
};

// Fix the default export
const mediaPathResolverUtils = { resolveMediaPath, getDefaultPlaceholder };
export default mediaPathResolverUtils;
