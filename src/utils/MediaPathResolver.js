// import { designConstants } from '../theme';

/**
 * MediaPathResolver
 * 
 * Utility for resolving media paths in the application.
 * Handles conversion between relative and absolute paths,
 * and ensures consistent path structure.
 */

// Default paths if designConstants is not available
// const DEFAULT_PATHS = {
//   documents: '/assets/documents',
//   images: '/assets/images',
//   videos: '/assets/videos',
// };

// Default file formats if designConstants is not available
// const DEFAULT_FILE_FORMATS = {
//   documents: ['.pdf', '.doc', '.docx', '.ppt', '.pptx'],
//   images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
//   videos: ['.mp4', '.webm', '.mov', '.avi']
// };

// Defined for potential future use
// const mediaPaths = designConstants?.media?.paths || DEFAULT_PATHS;
// const fileFormats = designConstants?.media?.fileFormats || DEFAULT_FILE_FORMATS;

/**
 * Resolves image/video paths for both imported assets and public/static paths
 * 
 * @param {string|object} input - The input path or imported asset
 * @returns {string} The resolved path
 */
export const resolveMediaPath = (input) => {
  if (!input) return '/assets/images/placeholders/project.jpg';
  // If it's already a full URL or imported image, just return it
  if (typeof input === 'string' && (input.startsWith('http') || input.startsWith('/'))) {
    return input;
  }
  // If it's an imported image (webpack will resolve to a string), just return it
  if (typeof input === 'string') {
    return input;
  }
  // Fallback
  return '/assets/images/placeholders/project.jpg';
};

/**
 * Gets an asset path from the public folder
 * Specialized version of resolveMediaPath for public assets
 * 
 * @param {string} projectId - The project ID folder
 * @param {string} filename - The filename within the project folder
 * @returns {string} The resolved path to the public asset
 */
export const getAssetPath = (projectId, filename) => {
  if (!projectId || !filename) return '';
  return `${process.env.PUBLIC_URL || ''}/assets/projects/${projectId}/${filename}`;
};

export default resolveMediaPath;
