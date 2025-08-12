import { isVideo, getMediaType } from '../services/ImageService';

/**
 * Helper to extract media from a section and properly categorize media types
 */
const extractMediaFromSection = (section) => {
  const media = [];

  // Handle direct media field
  if (section.media) {
    if (Array.isArray(section.media)) {
      media.push(
        ...section.media.map((item) => {
          // Add media type information to each item
          return typeof item === 'string'
            ? {
                src: item,
                isVideoContent: isVideo(item),
                type: getMediaType(item),
              }
            : {
                ...item,
                isVideoContent: isVideo(item.src || item),
                type: getMediaType(item.src || item),
              };
        })
      );
    } else {
      const mediaItem = section.media;
      media.push({
        src: typeof mediaItem === 'string' ? mediaItem : mediaItem.src,
        isVideoContent: isVideo(typeof mediaItem === 'string' ? mediaItem : mediaItem.src),
        type: getMediaType(typeof mediaItem === 'string' ? mediaItem : mediaItem.src),
        caption: typeof mediaItem === 'string' ? '' : mediaItem.caption || mediaItem.alt || '',
        aspect: typeof mediaItem === 'string' ? 'auto' : mediaItem.aspect || 'auto',
      });
    }
  }

  // Handle gallery type sections
  if (section.type === 'gallery' && section.items) {
    media.push(
      ...section.items.map((item) => {
        return typeof item === 'string'
          ? {
              src: item,
              isVideoContent: isVideo(item),
              type: getMediaType(item),
              aspect: 'auto',
            }
          : {
              ...item,
              isVideoContent: isVideo(item.src || item),
              type: getMediaType(item.src || item),
              aspect: item.aspect || 'auto',
            };
      })
    );
  }

  // Extract media from content if it contains media objects
  if (section.content && Array.isArray(section.content)) {
    section.content.forEach((item) => {
      if (item && (item.type === 'media' || item.type === 'image' || item.type === 'video')) {
        const src = item.src || item;
        media.push({
          src,
          isVideoContent: isVideo(src),
          type: getMediaType(src),
          caption: item.caption || item.alt || '',
          aspect: item.aspect || 'auto',
        });
      }
    });
  }

  return media;
};

/**
 * Enhanced section layout determination
 * Determines the best layout based on section type and content
 */
const determineSectionLayout = (section) => {
  if (section.layout) return section.layout;

  // Special section types
  if (section.type === 'gallery') return 'gallery';
  if (section.type === 'overview') return 'hero';
  if (section.type === 'outcomes' || section.type === 'takeaways') return 'cards';
  if (section.type === 'methodology' || section.type === 'process') return 'steps';
  if (section.type === 'technical' || section.type === 'features') return 'split';
  if (section.type === 'iteration') return 'split';

  // Content-based determination
  if (section.media && section.content) return 'split';
  if (section.media && !section.content) return 'fullMedia';
  if (!section.media && section.content) return 'textOnly';

  return 'default';
};

/**
 * Process specific section types with specialized handling
 */
const processSpecializedSection = (section) => {
  switch (section.type) {
    case 'iteration':
      return {
        ...section,
        layout: section.layout || 'split',
        items: Array.isArray(section.content) ? section.content : [section.content],
      };

    case 'outcomes':
    case 'takeaways':
      return {
        ...section,
        layout: section.layout || 'cards',
        items: Array.isArray(section.content) ? section.content : [section.content],
      };

    case 'gallery':
      return {
        ...section,
        layout: section.layout || 'gallery',
        items: (section.items || section.media || []).map((item) => ({
          src: typeof item === 'string' ? item : item.src || item,
          caption: typeof item === 'string' ? '' : item.caption || item.alt || '',
          type: getMediaType(typeof item === 'string' ? item : item.src || item),
          aspect: typeof item === 'string' ? 'auto' : item.aspect || 'auto',
          isVideoContent: isVideo(typeof item === 'string' ? item : item.src || item),
        })),
      };

    case 'methodology':
    case 'process':
      return {
        ...section,
        layout: section.layout || 'steps',
        items: Array.isArray(section.content)
          ? section.content.map((step, index) => ({
              ...step,
              stepNumber: step.stepNumber || index + 1,
            }))
          : [],
      };

    case 'technical':
    case 'features':
      return {
        ...section,
        layout: section.layout || 'split',
      };

    default:
      return section;
  }
};

/**
 * Consolidated Project Content Parser
 *
 * This is the canonical parser that merges functionality from both
 * parseProjectContent and processProjectContent into one consistent function.
 *
 * Features:
 * - Preserves all section metadata (type, title, aspect, alt, etc.)
 * - Applies layout defaults based on content type
 * - Attaches navigation anchors to sections
 * - Processes special sections (outcomes, takeaways, galleries)
 * - Extracts and categorizes all media
 */
export const parseProjectContent = (project) => {
  if (!project)
    return {
      sections: [],
      outcomes: null,
      takeaways: [],
      fullContent: null,
      sectionCount: 0,
      allMedia: [],
    };

  // Ensure project has a sections array
  const rawSections = Array.isArray(project.sections) ? project.sections : [];

  // Process all sections with enhanced metadata
  const processedSections = rawSections.map((section, index) => {
    // Apply basic metadata enhancements
    const enhancedSection = {
      ...section,
      id: section.id || `section-${index}`,
      title: section.title || `Section ${index + 1}`,
      layout: determineSectionLayout(section),
      type: section.type || 'default',
      index,
      isFirst: index === 0,
      isLast: index === rawSections.length - 1,
      hasMedia: Boolean(section.media || (section.type === 'gallery' && section.items)),
      hasContent: Boolean(section.content),
    };

    // Add navigation metadata
    if (section.navigable !== false) {
      enhancedSection.navigationMeta = {
        label: section.navigationLabel || section.title,
        anchor: section.anchor || enhancedSection.id,
        order: section.navigationOrder || index,
      };
    }

    // Process media
    enhancedSection.media = extractMediaFromSection(enhancedSection);

    // Apply specialized processing based on section type
    return { ...enhancedSection, ...processSpecializedSection(enhancedSection) };
  });

  // Gather all media across sections
  const allMedia = processedSections.reduce((acc, section) => {
    const sectionMedia = extractMediaFromSection(section);
    return [...acc, ...sectionMedia];
  }, []);

  // Add hero media if it exists
  if (project.hero?.media) {
    allMedia.unshift(
      typeof project.hero.media === 'string'
        ? {
            src: project.hero.media,
            isVideoContent: isVideo(project.hero.media),
            type: getMediaType(project.hero.media),
          }
        : project.hero.media
    );
  }

  // Special sections handling - Overview
  const hasOverview = processedSections.some((s) => s.type === 'overview');
  if (!hasOverview && project.description) {
    processedSections.unshift({
      id: 'section-overview',
      type: 'overview',
      title: 'Overview',
      content: project.description,
      layout: 'hero',
      navigationMeta: {
        label: 'Overview',
        anchor: 'section-overview',
        order: -1,
      },
      navigable: true,
    });
  }

  // Special handling for outcomes if they exist at root level
  const outcomes = project.outcomes || null;
  if (outcomes && !processedSections.some((s) => s.type === 'outcomes')) {
    processedSections.push({
      id: 'section-outcomes',
      type: 'outcomes',
      title: 'Project Outcomes',
      content: outcomes,
      layout: 'cards',
      items: Array.isArray(outcomes) ? outcomes : [outcomes],
      navigationMeta: {
        label: 'Outcomes',
        anchor: 'section-outcomes',
        order: processedSections.length,
      },
      navigable: true,
    });
  }

  // Special handling for takeaways
  const takeaways = project.takeaways || [];
  if (takeaways.length > 0 && !processedSections.some((s) => s.type === 'takeaways')) {
    processedSections.push({
      id: 'section-takeaways',
      type: 'takeaways',
      title: 'Key Takeaways',
      items: takeaways,
      layout: 'cards',
      navigationMeta: {
        label: 'Takeaways',
        anchor: 'section-takeaways',
        order: processedSections.length,
      },
      navigable: true,
    });
  }

  // Add media gallery section if we have media
  if (
    allMedia.length > 0 &&
    !processedSections.some((s) => s.type === 'gallery' && s.id === 'section-media-gallery')
  ) {
    processedSections.push({
      id: 'section-media-gallery',
      type: 'gallery',
      title: 'Project Gallery',
      layout: 'gallery',
      items: allMedia,
      navigationMeta: {
        label: 'Gallery',
        anchor: 'section-media-gallery',
        order: processedSections.length,
      },
      navigable: true,
    });
  }

  return {
    ...project,
    sections: processedSections,
    outcomes,
    takeaways,
    fullContent: project.fullContent || null,
    sectionCount: processedSections.length,
    allMedia,
  };
};

// Make parseProjectContent the default export
export default parseProjectContent;

// For backwards compatibility, keep processProjectContent but make it call parseProjectContent
export const processProjectContent = parseProjectContent;
