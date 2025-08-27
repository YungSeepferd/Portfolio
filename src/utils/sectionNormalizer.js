/**
 * Section Normalizer Utility
 * 
 * Converts any section data structure to a standardized format for consistent processing.
 * Handles legacy type-based sections and ensures all sections have consistent data structure.
 */

/**
 * Standard section schema after normalization
 * @typedef {Object} NormalizedSection
 * @property {string} id - Unique section identifier
 * @property {string} title - Section title
 * @property {React.ReactNode|string} content - Main section content
 * @property {Object|Array} media - Media data (images, videos, etc.)
 * @property {Array} outcomes - List of outcomes/results
 * @property {Array} takeaways - List of key takeaways
 * @property {Object} metadata - Additional section metadata
 * @property {Object} legacy - Original section data for backward compatibility
 */

/**
 * Normalizes a section to the standard format
 * @param {Object} rawSection - Raw section data from project files
 * @param {number} sectionIndex - Index of section in project
 * @returns {NormalizedSection} Normalized section data
 */
export const normalizeSection = (rawSection, sectionIndex = 0) => {
  if (!rawSection) {
    throw new Error('Section data is required');
  }

  // Extract basic properties with defaults
  const id = rawSection.id || `section-${sectionIndex}`;
  const title = rawSection.title || null;
  const content = rawSection.content || null;

  // Normalize media data to consistent format
  const media = normalizeMediaData(rawSection.media);

  // Extract outcomes and takeaways
  const outcomes = extractOutcomes(rawSection);
  const takeaways = extractTakeaways(rawSection);

  // Build metadata from various section properties
  const metadata = buildMetadata(rawSection, sectionIndex);

  // Store original data for backward compatibility
  const legacy = {
    type: rawSection.type,
    layout: rawSection.layout,
    anchor: rawSection.anchor,
    navigable: rawSection.navigable,
    originalData: rawSection
  };

  return {
    id,
    title,
    content,
    media,
    outcomes,
    takeaways,
    metadata,
    legacy
  };
};

/**
 * Normalizes media data to consistent format
 * @param {Object|Array|undefined} mediaData - Raw media data
 * @returns {Object|null} Normalized media data
 */
const normalizeMediaData = (mediaData) => {
  if (!mediaData) return null;

  // Handle array of media items
  if (Array.isArray(mediaData)) {
    return {
      type: 'collection',
      items: mediaData.map(normalizeMediaItem),
      count: mediaData.length
    };
  }

  // Handle single media item
  if (typeof mediaData === 'object') {
    return {
      type: 'single',
      ...normalizeMediaItem(mediaData),
      count: 1
    };
  }

  // Handle string (direct URL/path)
  if (typeof mediaData === 'string') {
    return {
      type: 'single',
      mediaType: detectMediaType(mediaData),
      src: mediaData,
      count: 1
    };
  }

  return null;
};

/**
 * Normalizes a single media item
 * @param {Object|string} item - Media item data
 * @returns {Object} Normalized media item
 */
const normalizeMediaItem = (item) => {
  if (typeof item === 'string') {
    return {
      mediaType: detectMediaType(item),
      src: item,
      alt: null,
      aspect: null
    };
  }

  return {
    mediaType: item.type || detectMediaType(item.src),
    src: item.src,
    alt: item.alt || null,
    aspect: item.aspect || null,
    ...item // Preserve any additional properties
  };
};

/**
 * Detects media type from URL/path
 * @param {string} src - Media source URL/path
 * @returns {string} Detected media type
 */
const detectMediaType = (src) => {
  if (!src) return 'unknown';
  
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  
  const lowerSrc = src.toLowerCase();
  
  if (videoExtensions.some(ext => lowerSrc.includes(ext))) {
    return 'video';
  }
  
  if (imageExtensions.some(ext => lowerSrc.includes(ext))) {
    return 'image';
  }
  
  return 'unknown';
};

/**
 * Extracts outcomes from section data
 * @param {Object} rawSection - Raw section data
 * @returns {Array} Array of outcomes
 */
const extractOutcomes = (rawSection) => {
  const outcomes = [];
  
  // Direct outcomes property
  if (rawSection.outcomes && Array.isArray(rawSection.outcomes)) {
    outcomes.push(...rawSection.outcomes);
  }
  
  // Legacy: outcomes in type field
  if (rawSection.type === 'outcomes' && rawSection.content) {
    // Try to extract outcomes from content if it's structured
    outcomes.push('Section contains outcome content');
  }
  
  return outcomes;
};

/**
 * Extracts takeaways from section data
 * @param {Object} rawSection - Raw section data
 * @returns {Array} Array of takeaways
 */
const extractTakeaways = (rawSection) => {
  const takeaways = [];
  
  // Direct takeaways property
  if (rawSection.takeaways && Array.isArray(rawSection.takeaways)) {
    takeaways.push(...rawSection.takeaways);
  }
  
  // Legacy: takeaways in type field
  if (rawSection.type === 'takeaways' && rawSection.content) {
    takeaways.push('Section contains takeaway content');
  }
  
  return takeaways;
};

/**
 * Builds metadata object from section properties
 * @param {Object} rawSection - Raw section data
 * @param {number} sectionIndex - Section index
 * @returns {Object} Metadata object
 */
const buildMetadata = (rawSection, sectionIndex) => {
  return {
    sectionIndex,
    originalType: rawSection.type || 'default',
    layout: rawSection.layout || null,
    anchor: rawSection.anchor || null,
    navigable: rawSection.navigable !== false, // Default to true
    priority: sectionIndex === 0 ? 'primary' : 'normal',
    hasContent: !!rawSection.content,
    hasMedia: !!rawSection.media,
    hasOutcomes: !!(rawSection.outcomes && rawSection.outcomes.length > 0),
    hasTakeaways: !!(rawSection.takeaways && rawSection.takeaways.length > 0)
  };
};

/**
 * Normalizes an array of sections
 * @param {Array} sections - Array of raw section data
 * @returns {Array} Array of normalized sections
 */
export const normalizeSections = (sections) => {
  if (!Array.isArray(sections)) {
    return [];
  }
  
  return sections.map((section, index) => normalizeSection(section, index));
};

/**
 * Validates a normalized section
 * @param {NormalizedSection} section - Normalized section to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateNormalizedSection = (section) => {
  const errors = [];
  
  if (!section.id) {
    errors.push('Section must have an id');
  }
  
  if (!section.title && !section.content && !section.media) {
    errors.push('Section must have at least title, content, or media');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const sectionNormalizer = {
  normalizeSection,
  normalizeSections,
  validateNormalizedSection
};

export default sectionNormalizer;
