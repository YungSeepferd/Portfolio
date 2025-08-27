/**
 * Content Analysis Utilities
 * 
 * Provides intelligent content analysis for adaptive layout decisions
 */

/**
 * Analyzes image dimensions and returns optimal aspect ratio and sizing recommendations
 */
export const analyzeImageContent = (mediaData) => {
  if (!mediaData) return { aspectRatio: 'auto', sizing: 'medium', layout: 'standard' };

  // Handle array of images
  if (Array.isArray(mediaData)) {
    const imageCount = mediaData.length;
    if (imageCount === 1) {
      return analyzeImageContent(mediaData[0]);
    } else if (imageCount <= 3) {
      return {
        aspectRatio: '16/9',
        sizing: 'grid',
        layout: 'gallery-small',
        gridColumns: imageCount
      };
    } else {
      return {
        aspectRatio: 'auto',
        sizing: 'masonry',
        layout: 'gallery-large',
        gridColumns: 3
      };
    }
  }

  // Single image analysis
  const image = mediaData;
  const aspect = image.aspect || 'landscape';
  
  // Determine optimal aspect ratio based on content type and natural dimensions
  const aspectRatioMap = {
    portrait: { ratio: '3/4', sizing: 'tall', layout: 'portrait' },
    landscape: { ratio: '16/9', sizing: 'wide', layout: 'landscape' },
    square: { ratio: '1/1', sizing: 'square', layout: 'square' },
    panoramic: { ratio: '21/9', sizing: 'ultra-wide', layout: 'panoramic' },
    auto: { ratio: 'auto', sizing: 'adaptive', layout: 'adaptive' }
  };

  return aspectRatioMap[aspect] || aspectRatioMap.landscape;
};

/**
 * Analyzes text content and returns layout recommendations
 */
export const analyzeTextContent = (content) => {
  if (!content) return { length: 'short', complexity: 'simple', layout: 'minimal' };

  let textLength = 0;
  let complexity = 'simple';

  // Handle React elements
  if (typeof content === 'object' && content.props) {
    // Estimate content from React element structure
    const hasLists = JSON.stringify(content).includes('component="ul"') || 
                     JSON.stringify(content).includes('component="ol"');
    const hasMultipleParagraphs = JSON.stringify(content).includes('paragraph');
    
    textLength = JSON.stringify(content).length;
    complexity = hasLists || hasMultipleParagraphs ? 'complex' : 'simple';
  } else if (typeof content === 'string') {
    textLength = content.length;
    complexity = content.includes('\n') || content.split('.').length > 3 ? 'complex' : 'simple';
  }

  // Determine layout based on content analysis
  let length, layout;
  if (textLength < 200) {
    length = 'short';
    layout = 'minimal';
  } else if (textLength < 800) {
    length = 'medium';
    layout = 'balanced';
  } else {
    length = 'long';
    layout = 'detailed';
  }

  return { length, complexity, layout, textLength };
};

/**
 * Determines optimal section layout based on content analysis
 */
export const determineOptimalLayout = (textAnalysis, imageAnalysis, sectionType) => {
  const { length: textLength, complexity } = textAnalysis;
  const { sizing: imageSize, layout: imageLayout } = imageAnalysis;

  // Layout decision matrix
  const layoutMatrix = {
    // Short text scenarios
    short: {
      minimal: imageSize === 'wide' ? 'imageFirst' : 'balanced',
      simple: 'balanced',
      complex: 'textFirst'
    },
    // Medium text scenarios  
    medium: {
      minimal: imageLayout === 'portrait' ? 'textFirst' : 'balanced',
      simple: 'balanced',
      complex: 'textFirst'
    },
    // Long text scenarios
    long: {
      minimal: 'textFirst',
      simple: 'textFirst',
      complex: 'textOnly'
    }
  };

  const baseLayout = layoutMatrix[textLength]?.[complexity] || 'balanced';

  // Override based on section type
  if (sectionType === 'gallery') return 'imageFirst';
  if (sectionType === 'textOnly') return 'textOnly';
  if (sectionType === 'showcase') return 'imageFirst';

  return baseLayout;
};

/**
 * Calculates responsive spacing based on content density
 */
export const calculateResponsiveSpacing = (textAnalysis, imageAnalysis, sectionIndex) => {
  const { length, complexity } = textAnalysis;
  const { sizing } = imageAnalysis;

  // Base spacing
  let spacing = { xs: 2, sm: 3, md: 4 };

  // Adjust for content complexity
  if (complexity === 'complex') {
    spacing = { xs: 3, sm: 4, md: 5 };
  }

  // Adjust for content length
  if (length === 'long') {
    spacing = { xs: spacing.xs + 1, sm: spacing.sm + 1, md: spacing.md + 1 };
  }

  // Adjust for image size
  if (sizing === 'ultra-wide' || sizing === 'masonry') {
    spacing = { xs: spacing.xs + 1, sm: spacing.sm + 1, md: spacing.md + 2 };
  }

  // Add variation for visual rhythm (every 3rd section gets extra spacing)
  if (sectionIndex % 3 === 2) {
    spacing = { xs: spacing.xs + 1, sm: spacing.sm + 1, md: spacing.md + 1 };
  }

  return spacing;
};

/**
 * Determines responsive grid configuration
 */
export const calculateGridConfiguration = (layout, textAnalysis, imageAnalysis) => {
  const { length } = textAnalysis;
  const { sizing } = imageAnalysis;

  const configurations = {
    balanced: {
      text: { xs: 12, md: 6 },
      image: { xs: 12, md: 6 },
      spacing: { xs: 2, md: 4 }
    },
    textFirst: {
      text: { xs: 12, md: length === 'long' ? 8 : 7 },
      image: { xs: 12, md: length === 'long' ? 4 : 5 },
      spacing: { xs: 3, md: 5 }
    },
    imageFirst: {
      text: { xs: 12, md: sizing === 'ultra-wide' ? 12 : 5 },
      image: { xs: 12, md: sizing === 'ultra-wide' ? 12 : 7 },
      spacing: { xs: 2, md: 3 }
    },
    textOnly: {
      text: { xs: 12, md: 10, lg: 8 },
      image: null,
      spacing: { xs: 3, md: 5 }
    }
  };

  return configurations[layout] || configurations.balanced;
};
