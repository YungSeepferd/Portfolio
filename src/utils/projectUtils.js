/**
 * Project Utilities (normalized schema)
 * Only uses normalized fields: sections, media, links, technologies, etc.
 */

import { resolveMediaPath } from './MediaPathResolver';

/**
 * Filter projects by category
 */
export const filterProjectsByCategory = (projects, category) => {
  if (!category) return projects;
  return projects.filter((project) => project.categories && project.categories.includes(category));
};

/**
 * Search projects by text (title, description, categories, technologies)
 */
export const searchProjects = (projects, searchTerm) => {
  if (!searchTerm) return projects;
  const term = searchTerm.toLowerCase();
  return projects.filter((project) => {
    const title = project.title ? project.title.toLowerCase() : '';
    const description = project.description ? project.description.toLowerCase() : '';
    const categories = project.categories
      ? project.categories.map((cat) => cat.toLowerCase()).join(' ')
      : '';
    const technologies = project.technologies
      ? project.technologies.map((t) => t.toLowerCase()).join(' ')
      : '';
    return (
      title.includes(term) ||
      description.includes(term) ||
      categories.includes(term) ||
      technologies.includes(term)
    );
  });
};

/**
 * Get unique categories from all projects
 */
export const getUniqueCategories = (projects) => {
  const categoriesSet = new Set();
  projects.forEach((project) => {
    if (project.categories && Array.isArray(project.categories)) {
      project.categories.forEach((category) => categoriesSet.add(category));
    }
  });
  return Array.from(categoriesSet).sort();
};

/**
 * Get unique technologies from all projects
 */
export const getUniqueTechnologies = (projects) => {
  const techSet = new Set();
  projects.forEach((project) => {
    if (project.technologies && Array.isArray(project.technologies)) {
      project.technologies.forEach((tech) => techSet.add(tech));
    }
  });
  return Array.from(techSet).sort();
};

/**
 * Organize projects into display matrix
 */
export const organizeProjectsMatrix = (projects, options = {}) => {
  const {
    primaryCount = 4,
    secondaryCount = 4,
    sortFn = (a, b) => (a.id < b.id ? -1 : 1),
  } = options;
  const sortedProjects = [...projects].sort(sortFn);
  return {
    primary: sortedProjects.slice(0, primaryCount),
    secondary: sortedProjects.slice(primaryCount, primaryCount + secondaryCount),
    additional: sortedProjects.slice(primaryCount + secondaryCount),
  };
};

/**
 * Get the primary media for a project (for cards, headers, etc.)
 */
export const getProjectPrimaryMedia = (
  project,
  defaultPath = '/assets/images/placeholders/project.jpg'
) => {
  if (!project) return defaultPath;
  // Try normalized media field first
  if (project.media) {
    if (typeof project.media === 'string') {
      return resolveMediaPath(project.media);
    }
    if (project.media.src) {
      return resolveMediaPath(project.media.src);
    }
  }
  // Fallback: featuredImages.overview
  if (project.featuredImages?.overview) {
    if (typeof project.featuredImages.overview === 'string') {
      return resolveMediaPath(project.featuredImages.overview);
    }
    if (
      typeof project.featuredImages.overview === 'object' &&
      project.featuredImages.overview.src
    ) {
      return resolveMediaPath(project.featuredImages.overview.src);
    }
  }
  // Fallback: first gallery image
  if (project.galleryImages && project.galleryImages.length > 0) {
    const firstImage = project.galleryImages.find(
      (img) => typeof img === 'string' || (img && img.type !== 'video')
    );
    if (firstImage) {
      if (typeof firstImage === 'string') {
        return resolveMediaPath(firstImage);
      }
      if (firstImage.src) {
        return resolveMediaPath(firstImage.src);
      }
    }
  }
  return defaultPath;
};

/**
 * Get the hero media for a project (for headers, hero sections, etc.)
 */
export const getProjectHeroMedia = (project) => {
  if (!project) {
    return { type: 'image', src: '/assets/images/placeholders/project.jpg' };
  }
  // Try heroVideo first
  if (project.heroVideo) {
    return { type: 'video', src: resolveMediaPath(project.heroVideo) };
  }
  // Try videos from galleryImages
  if (project.galleryImages && project.galleryImages.length > 0) {
    const videoItem = project.galleryImages.find(
      (item) =>
        (typeof item === 'object' && item.type === 'video') ||
        (typeof item === 'string' &&
          (item.endsWith('.mp4') || item.endsWith('.webm') || item.endsWith('.mov')))
    );
    if (videoItem) {
      return {
        type: 'video',
        src:
          typeof videoItem === 'object'
            ? resolveMediaPath(videoItem.src)
            : resolveMediaPath(videoItem),
      };
    }
  }
  // Try heroImage
  if (project.heroImage) {
    return { type: 'image', src: resolveMediaPath(project.heroImage) };
  }
  // Try normalized media field
  if (project.media) {
    if (typeof project.media === 'string') {
      return { type: 'image', src: resolveMediaPath(project.media) };
    }
    if (typeof project.media === 'object') {
      const type = project.media.type || 'image';
      const src = resolveMediaPath(project.media.src);
      return { type, src };
    }
  }
  // Try featuredImages.overview
  if (project.featuredImages?.overview) {
    if (typeof project.featuredImages.overview === 'string') {
      return { type: 'image', src: resolveMediaPath(project.featuredImages.overview) };
    }
    if (typeof project.featuredImages.overview === 'object') {
      const type = project.featuredImages.overview.type || 'image';
      const src = resolveMediaPath(project.featuredImages.overview.src);
      return { type, src };
    }
  }
  // Fallback to first gallery image
  if (project.galleryImages && project.galleryImages.length > 0) {
    const firstImage = project.galleryImages[0];
    if (typeof firstImage === 'string') {
      return { type: 'image', src: resolveMediaPath(firstImage) };
    }
    if (typeof firstImage === 'object') {
      const type = firstImage.type || 'image';
      const src = resolveMediaPath(firstImage.src);
      return { type, src };
    }
  }
  // Ultimate fallback
  return { type: 'image', src: '/assets/images/placeholders/project.jpg' };
};

/**
 * Get links as an array (already normalized)
 */
export const getProjectLinks = (project) => {
  return Array.isArray(project.links) ? project.links : [];
};

const projectUtils = {
  filterProjectsByCategory,
  searchProjects,
  getUniqueCategories,
  getUniqueTechnologies,
  organizeProjectsMatrix,
  getProjectPrimaryMedia,
  getProjectHeroMedia,
  getProjectLinks,
};

export default projectUtils;
