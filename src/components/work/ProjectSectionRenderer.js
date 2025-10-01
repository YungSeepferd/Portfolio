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
import ChallengeSolutionMatrixSection from './sections/ChallengeSolutionMatrixSection';

/**
 * ProjectSectionRenderer
 * A modern, type-aware section renderer for project modals.
 * - Uses MUI ImageList for gallery-style sections when media is a collection
 * - Falls back to existing ProjectSection for all other section types
 */
const ProjectSectionRenderer = ({ sections = [], projectId, projectColor = 'primary' }) => {
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
        // Extract commonly used props for clarity (no behaviour change)
        const key = normalized.id || `section-${index}`;
        const id = normalized.id;
        const title = normalized.title;
        const content = normalized.content;

        // Timeline Section - for chronological processes, research phases
        if (sectionType === 'timeline' && section.steps) {
          return (
            <TimelineSection
              key={key}
              id={id}
              title={title}
              steps={section.steps}
              orientation={section.orientation}
              content={content}
              sectionNumber={normalized.sectionNumber}
              sectionIndex={index}
              projectColor={projectColor}
            />
          );
        }

        // Stepper Section - for interactive step-by-step flows
        if (sectionType === 'stepper' && section.steps) {
          return (
            <StepperSection
              key={key}
              id={id}
              title={title}
              steps={section.steps}
              orientation={section.orientation}
              interactive={section.interactive}
              content={content}
            />
          );
        }

        // Challenge → Solution matrix (auto-detect on cardGrid with Challenge/Solution subtitles)
        const looksLikeChallengeSolution = Array.isArray(section.items)
          && section.items.some((it) => typeof it.subtitle === 'string' && /challenge/i.test(it.subtitle))
          && section.items.some((it) => typeof it.subtitle === 'string' && /solution/i.test(it.subtitle));
        if ((sectionType === 'challengeSolution' || (sectionType === 'cardGrid' && looksLikeChallengeSolution)) && section.items) {
          return (
            <ChallengeSolutionMatrixSection
              key={key}
              id={id}
              title={title}
              items={section.items}
              content={content}
              sectionNumber={normalized.sectionNumber}
              sectionIndex={index}
              projectColor={projectColor}
            />
          );
        }

        // Card Grid Section - for feature showcases, benefits
        if (sectionType === 'cardGrid' && section.items) {
          return (
            <CardGridSection
              key={key}
              id={id}
              title={title}
              items={section.items}
              columns={section.columns}
              content={content}
              cardVariant={section.cardVariant}
              sectionNumber={normalized.sectionNumber}
              sectionIndex={index}
              projectColor={projectColor}
            />
          );
        }

        // Accordion Section - for expandable content
        if (sectionType === 'accordion' && section.items) {
          return (
            <AccordionSection
              key={key}
              id={id}
              title={title}
              items={section.items}
              content={content}
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
              key={key}
              id={id}
              title={title}
              items={normalized.media?.items || []}
              content={content}
              sectionNumber={section.sectionNumber}
              sectionIndex={index}
              projectColor={projectColor}
            />
          );
        }

        // Process section (steps-based) - legacy support
        const isProcess = sectionType === 'process' || normalized.legacy?.originalType === 'process';
        const steps = section.steps || normalized.legacy?.originalData?.steps;
        if (isProcess && Array.isArray(steps) && steps.length > 0) {
          return (
            <ProcessSection
              key={key}
              id={id}
              title={title}
              steps={steps}
            />
          );
        }

        // Fallback to existing renderer for all other cases (keeps current behaviour intact)
        return (
          <ProjectSection
            key={key}
            id={id}
            title={title}
            content={content}
            mediaData={normalized.media}
            layout={normalized.layout}
            type={normalized.type}
            sectionNumber={normalized.sectionNumber}
            sectionIndex={index}
            projectColor={projectColor}
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
