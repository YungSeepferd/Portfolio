import { isVideo, getMediaType } from './mediaUtils';

/**
 * Processes normalized project content. No legacy/guessing logic.
 * Returns sections, outcomes, takeaways, and sectionCount.
 */

// Helper to extract media from a section and properly categorize media types
const extractMediaFromSection = (section) => {
  const media = [];
  
  // Handle direct media field
  if (section.media) {
    if (Array.isArray(section.media)) {
      media.push(...section.media.map(item => {
        // Add media type information to each item
        return typeof item === 'string' ? {
          src: item,
          isVideoContent: isVideo(item) // Use isVideo function to determine media type
        } : {
          ...item,
          isVideoContent: isVideo(item.src || item)
        };
      }));
    } else {
      const mediaItem = section.media;
      media.push({
        src: typeof mediaItem === 'string' ? mediaItem : mediaItem.src,
        isVideoContent: isVideo(typeof mediaItem === 'string' ? mediaItem : mediaItem.src)
      });
    }
  }

  // Handle gallery type sections
  if (section.type === 'gallery' && section.items) {
    media.push(...section.items.map(item => {
      return typeof item === 'string' ? {
        src: item,
        isVideoContent: isVideo(item)
      } : {
        ...item,
        isVideoContent: isVideo(item.src || item)
      };
    }));
  }

  return media;
};

// Enhanced section layout determination
const determineSectionLayout = (section) => {
  if (section.layout) return section.layout;
  
  // Special section types
  if (section.type === 'gallery') return 'gallery';
  if (section.type === 'overview') return 'hero';
  if (section.type === 'outcomes' || section.type === 'takeaways') return 'cards';
  if (section.type === 'methodology' || section.type === 'process') return 'steps';
  
  // Content-based determination
  if (section.media && section.content) return 'split';
  if (section.media && !section.content) return 'fullMedia';
  if (!section.media && section.content) return 'textOnly';
  
  return 'default';
};

// Helper to enhance section with dynamic features
const enhanceSection = (section, index, totalSections) => {
  const enhanced = {
    ...section,
    id: section.id || `section-${index}`,
    title: section.title || `Section ${index + 1}`,
    layout: determineSectionLayout(section),
    type: section.type || 'default',
    index,
    isFirst: index === 0,
    isLast: index === totalSections - 1,
    hasMedia: Boolean(section.media),
    hasContent: Boolean(section.content),
  };

  // Add navigation metadata
  if (section.navigable !== false) {
    enhanced.navigationMeta = {
      label: section.navigationLabel || section.title,
      anchor: section.anchor || enhanced.id,
      order: section.navigationOrder || index
    };
  }

  return enhanced;
};

export const processProjectContent = (project) => {
  if (!project) return { 
    sections: [], 
    outcomes: null, 
    takeaways: [], 
    fullContent: null, 
    sectionCount: 0,
    allMedia: []
  };

  // Process sections with enhanced metadata
  const sections = Array.isArray(project.sections) 
    ? project.sections.map((section, index) => 
        enhanceSection(section, index, project.sections.length)
      ) 
    : [];

  // Gather all media across sections
  const allMedia = sections.reduce((acc, section) => {
    const sectionMedia = extractMediaFromSection(section);
    return [...acc, ...sectionMedia];
  }, []);

  // Special sections handling
  const hasOverview = sections.some(s => s.type === 'overview');
  if (!hasOverview && project.description) {
    sections.unshift({
      id: 'section-overview',
      type: 'overview',
      title: 'Overview',
      content: project.description,
      layout: 'hero',
      navigable: true
    });
  }

  // Add media gallery section if we have media
  if (allMedia.length > 0) {
    sections.push({
      id: 'section-media-gallery',
      type: 'gallery',
      title: 'Project Gallery',
      layout: 'gallery',
      items: allMedia,
      navigable: true
    });
  }

  // Process outcomes and takeaways
  const outcomes = project.outcomes || null;
  const takeaways = project.takeaways || [];

  // Add outcomes section if present
  if (outcomes) {
    sections.push({
      id: 'section-outcomes',
      type: 'outcomes',
      title: 'Project Outcomes',
      content: outcomes,
      layout: 'cards',
      navigable: true
    });
  }

  // Add takeaways section if present
  if (takeaways.length > 0) {
    sections.push({
      id: 'section-takeaways',
      type: 'takeaways',
      title: 'Key Takeaways',
      items: takeaways,
      layout: 'cards',
      navigable: true
    });
  }

  return {
    sections,
    outcomes,
    takeaways,
    fullContent: project.fullContent || null,
    sectionCount: sections.length,
    allMedia
  };
};

/**
 * Extracts all media (images and videos) from project sections
 */
const extractMediaFromSections = (sections) => {
  const allMedia = [];
  
  sections.forEach(section => {
    // Extract media from section's media array
    if (section.media) {
      allMedia.push(...section.media);
    }
    
    // Extract media from content if it contains media objects
    if (section.content && Array.isArray(section.content)) {
      section.content.forEach(item => {
        if (item.type === 'media' || item.type === 'image' || item.type === 'video') {
          allMedia.push(item.src || item);
        }
      });
    }
    
    // Extract gallery items
    if (section.type === 'gallery' && section.items) {
      allMedia.push(...section.items);
    }
  });
  
  return allMedia.filter(Boolean); // Remove any null/undefined values
};

/**
 * Process section content based on its type
 */
const processIterationSection = (section) => ({
  ...section,
  layout: section.layout || 'split',
  items: Array.isArray(section.content) ? section.content : [section.content],
  navigationMeta: {
    label: section.navigationLabel || section.title,
    anchor: section.anchor || `section-${section.id}`
  }
});

const processSectionContent = (section) => {
  switch (section.type) {
    case 'iteration':
      return processIterationSection(section);
    case 'outcomes':
    case 'takeaways':
      return {
        ...section,
        layout: section.layout || 'cards',
        items: Array.isArray(section.content) ? section.content : [section.content]
      };
      
    case 'gallery':
      return {
        ...section,
        layout: 'media-grid',
        items: (section.items || section.media || []).map(item => ({
          src: item.src || item,
          caption: item.caption || item.alt,
          type: getMediaType(item.src || item),
          aspect: item.aspect || 'auto'
        }))
      };
      
    case 'methodology':
    case 'process':
      return {
        ...section,
        layout: section.layout || 'steps',
        items: Array.isArray(section.content) ? section.content.map((step, index) => ({
          ...step,
          stepNumber: step.stepNumber || index + 1
        })) : []
      };

    case 'technical':
    case 'features':
      return {
        ...section,
        layout: section.layout || 'split',
        media: section.media ? extractMediaFromSection(section) : []
      };

    default:
      return {
        ...section,
        layout: determineSectionLayout(section),
        media: section.media ? extractMediaFromSection(section) : []
      };
  }
};

/**
 * Enhanced project content parser
 */
export const parseProjectContent = (project) => {
  if (!project) return null;

  // Process all sections
  const processedSections = project.sections.map(processSectionContent);
  
  // Extract all media from sections
  const allProjectMedia = extractMediaFromSections(project.sections);
  
  // Add hero media if it exists
  if (project.hero?.media) {
    allProjectMedia.unshift(project.hero.media);
  }
  
  // Special handling for outcomes if they exist at root level
  const outcomes = project.outcomes ? {
    type: 'outcomes',
    title: 'Outcomes',
    content: project.outcomes,
    layout: 'outcomes'
  } : null;
  
  if (outcomes) {
    processedSections.push(outcomes);
  }
  
  // Add media gallery section if we have media
  if (allProjectMedia.length > 0) {
    processedSections.push({
      type: 'gallery',
      title: 'Project Gallery',
      layout: 'media-gallery',
      items: allProjectMedia
    });
  }

  return {
    ...project,
    sections: processedSections,
    allMedia: allProjectMedia
  };
};

export default parseProjectContent;
