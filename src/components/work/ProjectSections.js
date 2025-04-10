import React from 'react';
import { Divider } from '@mui/material';
import ProjectSection from './ProjectSection';
import { sectionImageKeyMap, getFallbackContent } from '../../utils/projectContentParser';

/**
 * ProjectSections Component
 * 
 * Renders all project sections with proper dividers and consistent formatting
 */
const ProjectSections = ({ 
  project, 
  sections = [], 
  accentColor
}) => {
  if (!project || sections.length === 0) return null;
  
  return (
    <>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          <ProjectSection
            sectionNumber={section.number}
            title={section.title}
            titleVariant="h3"
            titleComponent="h3"
            content={section.content}
            imageData={project.featuredImages?.[sectionImageKeyMap(section.title)] || 
                      (index < project.images?.length ? project.images[index] : null)}
            direction={index % 2 === 1 ? "reverse" : "default"}
            headingColor={project.theme?.textColor}
            accentColor={accentColor}
            fallbackContent={getFallbackContent(section.title, project)}
          />
          {index < sections.length - 1 && (
            <Divider sx={{ my: 6 }} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default ProjectSections;
