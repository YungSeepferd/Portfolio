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
  sx = {},
  ...rest
}) => {
  // Responsive side paddings for detail view
  const techPadding = variant === 'full' ? { pl: { xs: 2, sm: 4, md: 6, lg: 12.5 } } : {};
  const actionsPadding = variant === 'full' ? { pr: { xs: 2, sm: 4, md: 6, lg: 12.5 } } : {};

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, flexWrap: 'nowrap', justifyContent: 'space-between', ...sx }}>
      {technologies.length > 0 && (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', ...techPadding }}>
          <TechnologyTags technologies={technologies} variant={variant} size={variant} />
        </Box>
      )}
      {skills.length > 0 && (
        <SkillTags skills={skills} size={variant} />
      )}
      {actions.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-end', minWidth: 0, ...actionsPadding }}>
          <ProjectActionButtons actions={actions} layout="row" maxButtons={maxButtons} size={variant} />
        </Box>
      )}
    </Box>
  );
};

// Named exports for convenience
export const ProjectTechTags = (props) => <TechnologyTags {...props} />;
export const ProjectSkillTags = (props) => <SkillTags {...props} />;
export const ProjectActionButtonsBar = (props) => <ProjectActionButtons {...props} />;

export default ProjectMetaBar;
