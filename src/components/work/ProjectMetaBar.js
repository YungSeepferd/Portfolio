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
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 2 },
        px: { xs: 1, sm: 2, md: 4 },
        mb: { xs: 6, sm: 0 }, // Extra bottom margin on mobile for nav
        ...sx,
      }}
      {...rest}
    >
      {/* Technologies/Skill tags */}
      {technologies.length > 0 && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 6, sm: 2 }, // EXTREME gap on mobile
            rowGap: { xs: 6, sm: 2 }, // EXTREME row gap for stacked rows
            mb: { xs: 2, sm: 0 },
            justifyContent: { xs: 'flex-start', sm: 'flex-start' },
          }}
        >
          <TechnologyTags technologies={technologies} variant={variant} size="medium" />
        </Box>
      )}
      {/* Action buttons */}
      {actions.length > 0 && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1.5, sm: 2 },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <ProjectActionButtons actions={actions} layout={{ xs: 'column', sm: 'row' }} maxButtons={maxButtons} size="medium" />
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
