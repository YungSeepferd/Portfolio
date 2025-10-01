import React from 'react';
import { Box, useTheme } from '@mui/material';
import { normalizeSection } from '../../utils/sectionNormalizer';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';
import ProjectSection from './ProjectSection';
import ProcessSection from './sections/ProcessSection';
import GallerySection from './sections/GallerySection';
import TimelineSection from './sections/TimelineSection';
import StepperSection from './sections/StepperSection';
import CardGridSection from './sections/CardGridSection';
import AccordionSection from './sections/AccordionSection';

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
        const sectionType = section.type || normalized.type;

        // Timeline Section - for chronological processes, research phases
        if (sectionType === 'timeline' && section.steps) {
          return (
            <TimelineSection
              key={normalized.id || `section-${index}`}
              id={normalized.id}
              title={normalized.title}
              steps={section.steps}
              orientation={section.orientation}
              content={normalized.content}
            />
          );
        }

        // Stepper Section - for interactive step-by-step flows
        if (sectionType === 'stepper' && section.steps) {
          return (
            <StepperSection
              key={normalized.id || `section-${index}`}
              id={normalized.id}
              title={normalized.title}
              steps={section.steps}
              orientation={section.orientation}
              interactive={section.interactive}
              content={normalized.content}
            />
          );
        }

        // Card Grid Section - for feature showcases, benefits
        if (sectionType === 'cardGrid' && section.items) {
          return (
            <CardGridSection
              key={normalized.id || `section-${index}`}
              id={normalized.id}
              title={normalized.title}
              items={section.items}
              columns={section.columns}
              content={normalized.content}
              cardVariant={section.cardVariant}
            />
          );
        }

        // Accordion Section - for expandable content
        if (sectionType === 'accordion' && section.items) {
          return (
            <AccordionSection
              key={normalized.id || `section-${index}`}
              id={normalized.id}
              title={normalized.title}
              items={section.items}
              content={normalized.content}
              defaultExpanded={section.defaultExpanded}
              allowMultiple={section.allowMultiple}
            />
          );
        }

        // Gallery Section - treat as gallery when media is a collection or explicit type is 'gallery'
        const isGallery = normalized.media?.type === 'collection' || sectionType === 'gallery';
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

        // Process section (steps-based) - legacy support
        const isProcess = sectionType === 'process' || normalized.legacy?.originalType === 'process';
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
            type={sectionType || 'adaptive'}
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
