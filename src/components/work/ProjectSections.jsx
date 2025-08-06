import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import sectionPropTypes from './sectionPropTypes';
import ProjectSection from './ProjectSection';

/**
 * ProjectSections Component
 *
 * Renders an array of normalized project sections.
 */
const ProjectSections = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  return (
    <Box
      id="project-sections-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {sections.map((section, index) => (
        <ProjectSection
          key={`section-${section.id || index}`}
          id={section.id || `section-${index}`}
          title={section.title}
          content={section.content}
          mediaData={section.media}
          layout={section.layout || (index % 2 === 0 ? 'textLeft' : 'textRight')}
          sectionIndex={index}
          sectionNumber={index + 1}
          takeaways={section.takeaways}
          outcomes={section.outcomes}
          type={section.type}
          anchor={section.anchor}
          navigable={section.navigable}
          sx={{ mb: 6 }}
        />
      ))}
    </Box>
  );
};

ProjectSections.propTypes = {
  sections: PropTypes.arrayOf(sectionPropTypes).isRequired,
};

export default ProjectSections;
