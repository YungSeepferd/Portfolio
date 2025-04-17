import React from 'react';
import { Box } from '@mui/material';
import TechnologyTags from './TechnologyTags';
import ProjectActionButtons from './ProjectActionButtons';
import SkillTags from '../hero/SkillTags';

/**
 * ProjectMetaBar
 * Composes TechnologyTags, SkillTags, and ProjectActionButtons.
 * @param {Array} technologies - Array of technology names
 * @param {Array} skills - Array of skill names (optional)
 * @param {Array} actions - Array of action/link objects
 * @param {string} variant - 'hover' | 'full' (affects style)
 */
const ProjectMetaBar = ({
  technologies = [],
  skills = [],
  actions = [],
  variant = 'full',
  maxButtons = 4,
  ...rest
}) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {technologies.length > 0 && (
        <TechnologyTags technologies={technologies} variant={variant} size={variant} />
      )}
      {skills.length > 0 && (
        <SkillTags skills={skills} size={variant} />
      )}
      {actions.length > 0 && (
        <ProjectActionButtons actions={actions} layout="row" maxButtons={maxButtons} size={variant} />
      )}
    </Box>
  );
};

// Named exports for convenience
export const ProjectTechTags = (props) => <TechnologyTags {...props} />;
export const ProjectSkillTags = (props) => <SkillTags {...props} />;
export const ProjectActionButtonsBar = (props) => <ProjectActionButtons {...props} />;

export default ProjectMetaBar;
