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
          section={section}
          sectionIndex={index}
          sx={{ mb: 6 }}
        />
      ))}
    </Box>
  );
};

export default ProjectSections;