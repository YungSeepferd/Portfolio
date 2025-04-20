/**
 * Enhanced MediaPathResolver utility
 * Handles resolution of media paths and type detection
 */

const SUPPORTED_IMAGE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const SUPPORTED_VIDEO_TYPES = ['.mp4', '.webm', '.mov'];

export class MediaPathResolver {
  constructor(basePath = '') {
    this.basePath = basePath;
  }

  /**
   * Normalize a media path to ensure proper formatting
   */
  normalizePath(path) {
    if (!path) return null;
    // Handle already processed media objects
    if (typeof path === 'object' && path.src) {
      return {
        ...path,
        src: this.normalizePath(path.src)
      };
    }
    
    // Convert string path
    let normalizedPath = path;
    // Remove any double slashes except after protocol
    normalizedPath = normalizedPath.replace(/(?<!:)\/+/g, '/');
    // Ensure basePath is properly joined
    if (this.basePath && !normalizedPath.startsWith(this.basePath)) {
      normalizedPath = `${this.basePath}/${normalizedPath}`.replace(/\/+/g, '/');
    }
    return normalizedPath;
  }

  /**
   * Detect media type from path
   */
  detectMediaType(path) {
    if (!path) return null;
    const lowercasePath = path.toLowerCase();
    
    if (SUPPORTED_VIDEO_TYPES.some(ext => lowercasePath.endsWith(ext))) {
      return 'video';
    }
    if (SUPPORTED_IMAGE_TYPES.some(ext => lowercasePath.endsWith(ext))) {
      return 'image';
    }
    return null;
  }

  /**
   * Process media input into a standardized format
   */
  processMedia(input) {
    if (!input) return null;

    // Already processed media object
    if (typeof input === 'object' && input.src) {
      return {
        ...input,
        src: this.normalizePath(input.src),
        type: input.type || this.detectMediaType(input.src)
      };
    }

    // String path
    if (typeof input === 'string') {
      const normalizedPath = this.normalizePath(input);
      return {
        src: normalizedPath,
        type: this.detectMediaType(normalizedPath),
        alt: this.generateAltText(normalizedPath)
      };
    }

    // Array of media
    if (Array.isArray(input)) {
      return input.map(item => this.processMedia(item));
    }

    return null;
  }

  /**
   * Generate alt text from filename
   */
  generateAltText(path) {
    if (!path) return '';
    const filename = path.split('/').pop();
    const nameWithoutExt = filename.split('.')[0];
    // Convert kebab/snake case to words and capitalize
    return nameWithoutExt
      .replace(/[-_]/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim();
  }

  /**
   * Process project media with proper paths and metadata
   */
  processProjectMedia(project) {
    if (!project) return project;

    const processMediaInSection = (section) => {
      if (!section) return section;

      const processedSection = { ...section };

      if (section.media) {
        processedSection.media = this.processMedia(section.media);
      }

      if (section.items && Array.isArray(section.items)) {
        processedSection.items = section.items.map(item => 
          typeof item === 'string' || item.src ? this.processMedia(item) : item
        );
      }

      return processedSection;
    };

    return {
      ...project,
      sections: project.sections?.map(processMediaInSection) || [],
      media: project.media ? this.processMedia(project.media) : null,
      gallery: project.gallery ? this.processMedia(project.gallery) : null
    };
  }
}

// Create a default instance
const mediaPathResolver = new MediaPathResolver();

// Export the resolveMediaPath function
export const resolveMediaPath = (path) => mediaPathResolver.normalizePath(path);

// Export the default instance
export default mediaPathResolver;
