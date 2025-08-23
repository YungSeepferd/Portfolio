import { designConstants } from '../../theme';

/**
 * Types for media paths
 */
export type MediaType = 'image' | 'video';
export type MediaSection = 'projects' | 'about' | undefined;

/**
 * Resolves relative image paths to account for build-time optimization and proper resource loading
 * 
 * This allows us to use consistent relative paths in our code,
 * but have them automatically adjusted based on:
 * 1. Whether we're in development or production
 * 2. If the image needs to be loaded from a CDN
 * 3. If responsive images need to be considered
 * 
 * @param path - The path to the image, starting with '/'
 * @param type - The media type ('image' or 'video')
 * @param section - Optional section qualifier ('projects', 'about', etc.)
 * @returns The resolved path
 */
export const resolveMediaPath = (
  path: string, 
  type: MediaType = 'image',
  section?: MediaSection
): string => {
  // Return external URLs as-is
  if (!path || path.startsWith('http') || path.startsWith('blob:')) {
    return path;
  }

  // Handle document paths
  if (path.endsWith('.pdf') || path.endsWith('.docx')) {
    return `/documents${path.startsWith('/') ? path : `/${path}`}`;
  }

  const { paths } = designConstants;
  
  // Handle different media types and sections
  if (type === 'image') {
    if (section === 'projects') {
      return `${paths.images.projects}${path.startsWith('/') ? path : `/${path}`}`;
    } else if (section === 'about') {
      return `${paths.images.about}${path.startsWith('/') ? path : `/${path}`}`;
    }
    return `${paths.images.base}${path.startsWith('/') ? path : `/${path}`}`;
  } else if (type === 'video') {
    if (section === 'projects') {
      return `${paths.videos.projects}${path.startsWith('/') ? path : `/${path}`}`;
    }
    return `${paths.videos.base}${path.startsWith('/') ? path : `/${path}`}`;
  }
  
  // Default case - return the original path with forward slash if needed
  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * Types for placeholders
 */
export type PlaceholderType = 'avatar' | 'profile' | 'project' | 'general';

/**
 * Gets placeholder image based on type
 * 
 * @param type - Type of placeholder needed
 * @returns Path to the placeholder image
 */
export const getPlaceholderImage = (type: PlaceholderType = 'general'): string => {
  // Default placeholders in case theme paths are not properly configured
  const placeholders = {
    avatar: '/assets/images/placeholders/avatar-placeholder.jpg',
    profile: '/assets/images/placeholders/profile-placeholder.jpg',
    project: '/assets/images/placeholders/project-placeholder.jpg',
    general: '/assets/images/placeholders/image-placeholder.jpg'
  };
  
  switch (type) {
    case 'avatar':
      return placeholders.avatar;
    case 'profile':
      return placeholders.profile;
    case 'project':
      return placeholders.project;
    case 'general':
    default:
      return placeholders.general;
  }
};
