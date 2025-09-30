import React from 'react';
import { Box, useTheme } from '@mui/material';
import { normalizeSection } from '../../utils/sectionNormalizer';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';
import ProjectSection from './ProjectSection';
import ProcessSection from './sections/ProcessSection';
import GallerySection from './sections/GallerySection';

/**
 * ProjectSectionRenderer
 * A modern, type-aware section renderer for project modals.
 * - Uses MUI ImageList for gallery-style sections when media is a collection
 * - Falls back to existing ProjectSection for all other section types
 */
const ProjectSectionRenderer = ({ sections = [], projectId }) => {
  const theme = useTheme();
  if (!Array.isArray(sections) || sections.length === 0) return null;

  // spacing presets used by section components if needed in future
  getSpacingPreset('pageHorizontal');
  getTypographyPreset(theme, 'sectionTitle');

  return (
    <Box id="project-section-renderer-root" sx={{ width: '100%' }}>
      {sections.map((section, index) => {
        const normalized = normalizeSection(section, index);

        // Heuristic: treat as gallery when media is a collection or explicit type is 'gallery'
        const isGallery = normalized.media?.type === 'collection' || section.type === 'gallery';
        if (isGallery) {
          return (
            <GallerySection
              key={normalized.id || `section-${index}`}
              id={normalized.id}
              title={normalized.title}
              items={normalized.media?.items || []}
              content={normalized.content}
            />
          );
        }

        // Process section (steps-based)
        const isProcess = section.type === 'process' || normalized.legacy?.originalType === 'process';
        const steps = section.steps || normalized.legacy?.originalData?.steps;
        if (isProcess && Array.isArray(steps) && steps.length > 0) {
          return (
            <ProcessSection
              key={normalized.id || `section-${index}`}
              id={normalized.id}
              title={normalized.title}
              steps={steps}
            />
          );
        }

        // Fallback to existing renderer for all other cases (keeps current behaviour intact)
        return (
          <ProjectSection
            key={normalized.id || `section-${index}`}
            id={normalized.id}
            title={normalized.title}
            content={normalized.content}
            mediaData={normalized.media}
            layout={section.layout || undefined}
            sectionIndex={index}
            type={section.type || 'adaptive'}
            outcomes={normalized.outcomes}
            takeaways={normalized.takeaways}
            sx={{ mb: 6 }}
          />
        );
      })}
    </Box>
  );
};

export default ProjectSectionRenderer;
