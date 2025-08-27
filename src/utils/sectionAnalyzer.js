/**
 * Section Analyzer Utility
 * 
 * Analyzes normalized section content to determine optimal rendering strategy.
 * Extends existing content analysis capabilities to provide comprehensive section analysis.
 */

import { analyzeTextContent } from './contentAnalysis';

/**
 * Rendering strategy result
 * @typedef {Object} RenderingStrategy
 * @property {string} primaryRenderer - Primary rendering approach ('adaptive', 'gallery', 'textOnly', 'showcase', 'magazine')
 * @property {string} layoutHint - Suggested layout ('textLeft', 'textRight', 'balanced', 'centered')
 * @property {string} priority - Content priority ('primary', 'secondary', 'normal')
 * @property {string} contentType - Detected content type ('text-heavy', 'media-heavy', 'balanced', 'outcomes', 'gallery')
 * @property {Object} spacing - Spacing recommendations
 * @property {Object} breakpoints - Responsive breakpoint suggestions
 * @property {boolean} requiresSpecialHandling - Whether section needs custom handling
 * @property {Object} metadata - Additional analysis metadata
 */

/**
 * Analyzes a normalized section to determine optimal rendering strategy
 * @param {Object} normalizedSection - Normalized section data
 * @returns {RenderingStrategy} Rendering strategy recommendations
 */
export const analyzeSectionContent = (normalizedSection) => {
  if (!normalizedSection) {
    throw new Error('Normalized section data is required');
  }

  // Analyze individual components
  const textAnalysis = analyzeTextComponent(normalizedSection.content);
  const mediaAnalysis = analyzeMediaComponent(normalizedSection.media);
  const structuralAnalysis = analyzeStructuralComponents(normalizedSection);

  // Determine primary rendering strategy
  const primaryRenderer = determinePrimaryRenderer(textAnalysis, mediaAnalysis, structuralAnalysis);
  
  // Generate layout hints
  const layoutHint = determineLayoutHint(textAnalysis, mediaAnalysis, normalizedSection.metadata);
  
  // Assess content priority
  const priority = determinePriority(normalizedSection.metadata, textAnalysis, mediaAnalysis);
  
  // Classify content type
  const contentType = classifyContentType(textAnalysis, mediaAnalysis, structuralAnalysis);
  
  // Calculate spacing recommendations
  const spacing = calculateSpacingRecommendations(textAnalysis, mediaAnalysis, contentType);
  
  // Generate responsive breakpoint suggestions
  const breakpoints = generateBreakpointSuggestions(textAnalysis, mediaAnalysis, contentType);
  
  // Check if special handling is required
  const requiresSpecialHandling = checkSpecialHandlingRequirements(normalizedSection, structuralAnalysis);

  return {
    primaryRenderer,
    layoutHint,
    priority,
    contentType,
    spacing,
    breakpoints,
    requiresSpecialHandling,
    metadata: {
      textAnalysis,
      mediaAnalysis,
      structuralAnalysis,
      confidence: calculateConfidenceScore(textAnalysis, mediaAnalysis, structuralAnalysis)
    }
  };
};

/**
 * Analyzes text content component
 * @param {React.ReactNode|string} content - Section content
 * @returns {Object} Text analysis results
 */
const analyzeTextComponent = (content) => {
  if (!content) {
    return {
      hasText: false,
      length: 'none',
      complexity: 'none',
      readingTime: 0,
      structure: 'none'
    };
  }

  // Use existing text analysis for string content
  if (typeof content === 'string') {
    return {
      hasText: true,
      ...analyzeTextContent(content)
    };
  }

  // For JSX content, estimate characteristics
  if (typeof content === 'object') {
    return {
      hasText: true,
      length: 'medium', // Assume medium for JSX
      complexity: 'medium',
      readingTime: 2, // Estimate
      structure: 'structured' // JSX is typically structured
    };
  }

  return {
    hasText: false,
    length: 'none',
    complexity: 'none',
    readingTime: 0,
    structure: 'none'
  };
};

/**
 * Analyzes media content component
 * @param {Object} media - Normalized media data
 * @returns {Object} Media analysis results
 */
const analyzeMediaComponent = (media) => {
  if (!media) {
    return {
      hasMedia: false,
      type: 'none',
      count: 0,
      complexity: 'none'
    };
  }

  const baseAnalysis = {
    hasMedia: true,
    type: media.type, // 'single' or 'collection'
    count: media.count || 0
  };

  // Analyze based on media type
  if (media.type === 'collection') {
    return {
      ...baseAnalysis,
      complexity: media.count > 3 ? 'high' : 'medium',
      isGallery: media.count > 2,
      primaryMediaType: detectPrimaryMediaType(media.items),
      aspectRatios: analyzeAspectRatios(media.items)
    };
  }

  if (media.type === 'single') {
    return {
      ...baseAnalysis,
      complexity: 'low',
      isGallery: false,
      primaryMediaType: media.mediaType,
      aspectRatio: media.aspect
    };
  }

  return baseAnalysis;
};

/**
 * Analyzes structural components (outcomes, takeaways, etc.)
 * @param {Object} normalizedSection - Normalized section data
 * @returns {Object} Structural analysis results
 */
const analyzeStructuralComponents = (normalizedSection) => {
  const { outcomes, takeaways, metadata } = normalizedSection;
  
  return {
    hasOutcomes: outcomes && outcomes.length > 0,
    hasTakeaways: takeaways && takeaways.length > 0,
    outcomeCount: outcomes ? outcomes.length : 0,
    takeawayCount: takeaways ? takeaways.length : 0,
    isResultsSection: metadata.originalType === 'outcomes' || metadata.originalType === 'takeaways',
    isNavigable: metadata.navigable,
    sectionIndex: metadata.sectionIndex
  };
};

/**
 * Determines the primary renderer based on content analysis
 * @param {Object} textAnalysis - Text analysis results
 * @param {Object} mediaAnalysis - Media analysis results
 * @param {Object} structuralAnalysis - Structural analysis results
 * @returns {string} Primary renderer recommendation
 */
const determinePrimaryRenderer = (textAnalysis, mediaAnalysis, structuralAnalysis) => {
  // Special cases first
  if (structuralAnalysis.isResultsSection) {
    return 'outcomes';
  }
  
  if (mediaAnalysis.isGallery) {
    return 'gallery';
  }
  
  // Content-driven decisions
  if (!mediaAnalysis.hasMedia && textAnalysis.hasText) {
    return 'textOnly';
  }
  
  if (mediaAnalysis.hasMedia && !textAnalysis.hasText) {
    return 'showcase';
  }
  
  if (textAnalysis.length === 'long' && mediaAnalysis.hasMedia) {
    return 'magazine';
  }
  
  // Default to adaptive for balanced content
  return 'adaptive';
};

/**
 * Determines layout hint based on content characteristics
 * @param {Object} textAnalysis - Text analysis results
 * @param {Object} mediaAnalysis - Media analysis results
 * @param {Object} metadata - Section metadata
 * @returns {string} Layout hint
 */
const determineLayoutHint = (textAnalysis, mediaAnalysis, metadata) => {
  // Use legacy layout if specified
  if (metadata.layout) {
    return metadata.layout;
  }
  
  // Content-driven layout decisions
  if (!mediaAnalysis.hasMedia) {
    return 'centered';
  }
  
  if (textAnalysis.length === 'short') {
    return 'balanced';
  }
  
  // Alternate based on section index for visual variety
  return metadata.sectionIndex % 2 === 0 ? 'textLeft' : 'textRight';
};

/**
 * Determines content priority
 * @param {Object} metadata - Section metadata
 * @param {Object} textAnalysis - Text analysis results
 * @param {Object} mediaAnalysis - Media analysis results
 * @returns {string} Priority level
 */
const determinePriority = (metadata, textAnalysis, mediaAnalysis) => {
  if (metadata.sectionIndex === 0) {
    return 'primary';
  }
  
  if (mediaAnalysis.isGallery || textAnalysis.length === 'long') {
    return 'secondary';
  }
  
  return 'normal';
};

/**
 * Classifies overall content type
 * @param {Object} textAnalysis - Text analysis results
 * @param {Object} mediaAnalysis - Media analysis results
 * @param {Object} structuralAnalysis - Structural analysis results
 * @returns {string} Content type classification
 */
const classifyContentType = (textAnalysis, mediaAnalysis, structuralAnalysis) => {
  if (structuralAnalysis.isResultsSection) {
    return 'outcomes';
  }
  
  if (mediaAnalysis.isGallery) {
    return 'gallery';
  }
  
  if (mediaAnalysis.hasMedia && !textAnalysis.hasText) {
    return 'media-heavy';
  }
  
  if (textAnalysis.hasText && !mediaAnalysis.hasMedia) {
    return 'text-heavy';
  }
  
  return 'balanced';
};

/**
 * Calculates spacing recommendations
 * @param {Object} textAnalysis - Text analysis results
 * @param {Object} mediaAnalysis - Media analysis results
 * @param {string} contentType - Content type classification
 * @returns {Object} Spacing recommendations
 */
const calculateSpacingRecommendations = (textAnalysis, mediaAnalysis, contentType) => {
  const baseSpacing = { xs: 4, md: 6 };
  
  if (contentType === 'text-heavy' && textAnalysis.length === 'long') {
    return { xs: 3, md: 5 }; // Tighter spacing for long text
  }
  
  if (contentType === 'gallery' || mediaAnalysis.count > 2) {
    return { xs: 2, md: 4 }; // Tighter spacing for galleries
  }
  
  if (contentType === 'outcomes') {
    return { xs: 5, md: 7 }; // More spacing for outcomes
  }
  
  return baseSpacing;
};

/**
 * Generates responsive breakpoint suggestions
 * @param {Object} textAnalysis - Text analysis results
 * @param {Object} mediaAnalysis - Media analysis results
 * @param {string} contentType - Content type classification
 * @returns {Object} Breakpoint suggestions
 */
const generateBreakpointSuggestions = (textAnalysis, mediaAnalysis, contentType) => {
  const defaultBreakpoints = {
    textColumn: { xs: 12, md: 6 },
    mediaColumn: { xs: 12, md: 6 }
  };
  
  if (contentType === 'text-heavy') {
    return {
      textColumn: { xs: 12, md: 8 },
      mediaColumn: { xs: 12, md: 4 }
    };
  }
  
  if (contentType === 'media-heavy') {
    return {
      textColumn: { xs: 12, md: 4 },
      mediaColumn: { xs: 12, md: 8 }
    };
  }
  
  return defaultBreakpoints;
};

/**
 * Checks if section requires special handling
 * @param {Object} normalizedSection - Normalized section data
 * @param {Object} structuralAnalysis - Structural analysis results
 * @returns {boolean} Whether special handling is required
 */
const checkSpecialHandlingRequirements = (normalizedSection, structuralAnalysis) => {
  // Legacy type-specific handling
  const specialTypes = ['prototype', 'figmaEmbed', 'metrics', 'custom'];
  if (specialTypes.includes(normalizedSection.metadata.originalType)) {
    return true;
  }
  
  // Complex structural requirements
  if (structuralAnalysis.hasOutcomes && structuralAnalysis.hasTakeaways) {
    return true;
  }
  
  return false;
};

/**
 * Calculates confidence score for analysis results
 * @param {Object} textAnalysis - Text analysis results
 * @param {Object} mediaAnalysis - Media analysis results
 * @param {Object} structuralAnalysis - Structural analysis results
 * @returns {number} Confidence score (0-1)
 */
const calculateConfidenceScore = (textAnalysis, mediaAnalysis, structuralAnalysis) => {
  let score = 0.5; // Base confidence
  
  // Increase confidence for clear content patterns
  if (textAnalysis.hasText && textAnalysis.structure !== 'none') {
    score += 0.2;
  }
  
  if (mediaAnalysis.hasMedia && mediaAnalysis.type !== 'none') {
    score += 0.2;
  }
  
  if (structuralAnalysis.isResultsSection) {
    score += 0.1; // Clear structural indicator
  }
  
  return Math.min(score, 1.0);
};

/**
 * Helper function to detect primary media type in collection
 * @param {Array} mediaItems - Array of media items
 * @returns {string} Primary media type
 */
const detectPrimaryMediaType = (mediaItems) => {
  if (!mediaItems || mediaItems.length === 0) return 'unknown';
  
  const types = mediaItems.map(item => item.mediaType);
  const typeCounts = types.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  return Object.keys(typeCounts).reduce((a, b) => 
    typeCounts[a] > typeCounts[b] ? a : b
  );
};

/**
 * Helper function to analyze aspect ratios in media collection
 * @param {Array} mediaItems - Array of media items
 * @returns {Object} Aspect ratio analysis
 */
const analyzeAspectRatios = (mediaItems) => {
  if (!mediaItems || mediaItems.length === 0) {
    return { variety: 'none', dominant: null };
  }
  
  const aspects = mediaItems.map(item => item.aspect || 'landscape');
  const uniqueAspects = [...new Set(aspects)];
  
  return {
    variety: uniqueAspects.length > 1 ? 'mixed' : 'uniform',
    dominant: aspects[0],
    count: uniqueAspects.length
  };
};

const sectionAnalyzer = {
  analyzeSectionContent
};

export default sectionAnalyzer;
