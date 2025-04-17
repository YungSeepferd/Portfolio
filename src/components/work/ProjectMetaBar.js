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

  // Map variant to valid ActionButton size
  let actionButtonSize = 'medium';
  if (variant === 'full') actionButtonSize = 'large';
  if (variant === 'hover') actionButtonSize = 'small';

  // Map variant to valid SkillTag size
  const skillTagSize = variant === 'full' || variant === 'hover' ? 'medium' : 'small';

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' }, 
      alignItems: 'center', 
      gap: { xs: 1.5, sm: 2 }, 
      flexWrap: { xs: 'wrap', sm: 'nowrap' }, 
      justifyContent: { xs: 'flex-start', sm: 'space-between' }, 
      ...sx 
    }}>
      {technologies.length > 0 && (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', ...techPadding, mb: { xs: 1, sm: 0 } }}>
          <TechnologyTags technologies={technologies} variant={variant} size={skillTagSize} />
        </Box>
      )}
      {skills.length > 0 && (
        <SkillTags skills={skills} size={skillTagSize} />
      )}
      {actions.length > 0 && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          flexWrap: { xs: 'wrap', sm: 'nowrap' }, 
          justifyContent: { xs: 'flex-start', sm: 'flex-end' }, 
          minWidth: 0, 
          ...actionsPadding,
          gap: { xs: 1, sm: 0 }
        }}>
          <ProjectActionButtons actions={actions} layout="row" maxButtons={maxButtons} size={actionButtonSize} />
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
