import React from 'react';
import { Box, useTheme } from '@mui/material';
import TechnologyTags from './TechnologyTags';
import ProjectActionButtons from './ProjectActionButtons';
import SkillTags from '../hero/SkillTags';
import { getSpacingPreset } from '../../theme/presets';

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
  const theme = useTheme();
  const metaSpacing = variant === 'full' ? getSpacingPreset('metaBar') : null;

  // Map variant to valid ActionButton size
  let actionButtonSize = 'small';
  let actionButtonDensity = 'compact';
  if (variant === 'full') {
    actionButtonSize = 'small';
    actionButtonDensity = 'comfortable';
  }

  const resolvedMaxButtons = variant === 'full' ? actions.length : maxButtons;

  // Map variant to valid SkillTag size
  const skillTagSize = variant === 'full' || variant === 'hover' ? 'medium' : 'small';

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: variant === 'full' ? 'column' : 'row',
        alignItems: variant === 'full' ? 'stretch' : 'center',
        justifyContent: variant === 'full' ? 'flex-start' : 'space-between',
        flexWrap: variant === 'full' ? 'nowrap' : 'nowrap',
        ...(variant === 'full'
          ? {
              px: metaSpacing?.px,
              py: metaSpacing?.py,
              rowGap: metaSpacing?.rowGap,
              columnGap: metaSpacing?.columnGap,
              backgroundColor: 'background.paper',
              borderRadius: theme.shape.borderRadius,
            }
          : { gap: theme.spacing(2) }),
        ...sx,
      }}
    >
      {technologies.length > 0 && (
        <Box
          sx={{
            flex: variant === 'full' ? '1 1 auto' : 1,
            display: 'flex',
            justifyContent: 'flex-start',
            minWidth: 0,
          }}
        >
          <TechnologyTags technologies={technologies} variant={variant} size={skillTagSize} />
        </Box>
      )}
      {skills.length > 0 && (
        <SkillTags skills={skills} size={skillTagSize} />
      )}
      {actions.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: variant === 'full' ? 'column' : 'row',
            justifyContent: variant === 'full' ? 'flex-start' : { xs: 'flex-start', md: 'flex-end' },
            alignItems: variant === 'full' ? 'stretch' : 'center',
            minWidth: 0,
            columnGap: variant === 'full' ? 0 : theme.spacing(1),
            rowGap: variant === 'full' ? metaSpacing?.rowGap : theme.spacing(0.5),
            flex: variant === 'full' ? '0 0 auto' : undefined,
          }}
        >
          <ProjectActionButtons
            actions={actions}
            layout={variant === 'full' ? 'column' : 'row'}
            maxButtons={resolvedMaxButtons}
            size={actionButtonSize}
            density={actionButtonDensity}
          />
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
