import React from 'react';
import { Box } from '@mui/material';
import ProjectSection from './ProjectSection';
import { processProjectContent } from '../../utils/projectContentParser';

/**
 * ProjectSections Component
 * 
 * Takes raw project data and renders structured sections.
 * Uses projectContentParser to transform the data into a standardized format.
 */
const ProjectSections = ({ project }) => {
  if (!project) return null;
  
  // Process the project data into structured sections, outcomes, takeaways
  const { sections, outcomes, takeaways } = processProjectContent(project);
  
  // Don't render if no sections
  if (!sections || sections.length === 0) return null;
  
  return (
    <Box>
      {/* Render each section */}
      {sections.map((section, index) => (
        <ProjectSection
          key={`section-${section.id || index}`}
          id={section.id || `section-${index}`}
          title={section.title}
          content={section.content}
          mediaData={section.media}
          layout={section.layout || (index % 2 === 0 ? 'textLeft' : 'textRight')}
          sectionIndex={index}
          sectionNumber={index + 1} // <-- Ensure sectionNumber is always passed
          takeaways={index === sections.length - 1 ? takeaways : null}
          outcomes={index === sections.length - 1 ? outcomes : null}
          type={section.type}
          sx={{ mb: 6 }}
        />
      ))}
    </Box>
  );
};

export default ProjectSections;