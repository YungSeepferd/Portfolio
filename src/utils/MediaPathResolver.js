import { designConstants } from '../theme';

/**
 * MediaPathResolver
 * 
 * Utility for resolving media paths in the application.
 * Handles conversion between relative and absolute paths,
 * and ensures consistent path structure.
 */

// Default paths if designConstants is not available
const DEFAULT_PATHS = {
  documents: '/assets/documents',
  images: '/assets/images',
  videos: '/assets/videos',
};

// Default file formats if designConstants is not available
const DEFAULT_FILE_FORMATS = {
  documents: ['.pdf', '.doc', '.docx', '.ppt', '.pptx'],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
  videos: ['.mp4', '.webm', '.mov', '.avi']
};

// Get media paths from designConstants or use defaults
const mediaPaths = designConstants?.media?.paths || DEFAULT_PATHS;
const fileFormats = designConstants?.media?.fileFormats || DEFAULT_FILE_FORMATS;

/**
 * Resolves a media path based on the file type and project context
 * 
 * @param {string} path - The relative or absolute path to resolve
 * @param {string} [projectId] - Optional project ID for project-specific paths
 * @returns {string} The resolved absolute path
 */
export const resolveMediaPath = (path, projectId = null) => {
  // If path is null, undefined, or empty, return empty string
  if (!path) return '';
  
  // If it's already an absolute URL (starts with http, https, or data:), return as is
  if (typeof path === 'string' && (path.startsWith('http') || path.startsWith('data:'))) {
    return path;
  }
  
  // Handle module imports (webpack processed)
  if (typeof path === 'object' && path.hasOwnProperty('default')) {
    return path.default;
  }
  
  try {
    // String path processing
    if (typeof path === 'string') {
      // If it starts with a slash or assets/, treat as absolute within the app
      if (path.startsWith('/') || path.startsWith('assets/')) {
        return path;
      }
      
      // Determine media type by extension
      const ext = path.substring(path.lastIndexOf('.')).toLowerCase();
      
      // Check file type and use appropriate path
      if (fileFormats.documents.includes(ext)) {
        return `${mediaPaths.documents}/${projectId ? `${projectId}/` : ''}${path}`;
      } else if (fileFormats.images.includes(ext)) {
        return `${mediaPaths.images}/${projectId ? `${projectId}/` : ''}${path}`;
      } else if (fileFormats.videos.includes(ext)) {
        return `${mediaPaths.videos}/${projectId ? `${projectId}/` : ''}${path}`;
      }
      
      // If no extension match, assume it's a document
      return `${mediaPaths.documents}/${projectId ? `${projectId}/` : ''}${path}`;
    }
    
    // If it's an object with src property, resolve that
    if (typeof path === 'object' && path.src) {
      return resolveMediaPath(path.src, projectId);
    }
  } catch (error) {
    console.error('Error resolving media path:', error);
  }
  
  // Return the original path if all else fails
  return path;
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
