import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import TechnologyTags from './TechnologyTags';
import ProjectActionButtons from './ProjectActionButtons';
import MobileActionAccordion from './MobileActionAccordion';
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
  useSplitButton = false, // Feature flag for new ActionButtonGroup
  showHierarchy = true, // Feature flag for primary chip emphasis
  useMobileAccordion = true, // Feature flag for mobile accordion
  projectColor = 'primary',
  sx = {},
  ...rest
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  // Determine if we should center the chips (no actions)
  const shouldCenterChips = actions.length === 0;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Column on mobile, row on tablet+
        alignItems: { xs: 'stretch', sm: 'center' }, // Center align vertically on tablet+
        justifyContent: shouldCenterChips 
          ? 'center' 
          : { xs: 'flex-start', sm: 'space-between' },
        flexWrap: 'nowrap',
        overflow: 'hidden',
        ...(variant === 'full'
          ? {
              px: metaSpacing?.px,
              py: metaSpacing?.py,
              gap: { xs: metaSpacing?.rowGap, sm: metaSpacing?.columnGap },
              backgroundColor: 'background.paper',
              borderRadius: theme.shape.borderRadius,
            }
          : { gap: theme.spacing(2) }),
        ...sx,
      }}
    >
      {/* Technology Chips - Centered when no actions, left-aligned when actions present */}
      {technologies.length > 0 && (
        <Box
          sx={{
            flex: shouldCenterChips ? '0 1 auto' : { xs: '1 1 auto', sm: '1 1 auto' },
            display: 'flex',
            justifyContent: shouldCenterChips ? 'center' : 'flex-start',
            alignItems: 'center',
            minWidth: 0,
            maxWidth: shouldCenterChips ? '100%' : { xs: '100%', sm: '60%' },
            overflow: 'hidden',
          }}
        >
          <TechnologyTags 
            technologies={technologies} 
            variant={variant} 
            size={skillTagSize}
            showHierarchy={showHierarchy}
            projectColor={projectColor}
          />
        </Box>
      )}
      
      {/* Skills (if any) */}
      {skills.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SkillTags skills={skills} size={skillTagSize} />
        </Box>
      )}
      
      {/* Action Buttons - Right side, center-aligned (or accordion on mobile) */}
      {actions.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
            alignItems: 'center',
            minWidth: 0,
            maxWidth: '100%',
            flexWrap: 'wrap',
            columnGap: theme.spacing(1),
            rowGap: theme.spacing(1),
            flex: { xs: '1 1 auto', sm: '0 0 auto' },
          }}
        >
          {isMobile && useMobileAccordion ? (
            <MobileActionAccordion
              actions={actions}
              label="Project Actions"
              defaultExpanded={false}
              sx={{ width: '100%' }}
            />
          ) : (
            <ProjectActionButtons
              actions={actions}
              layout="row"
              maxButtons={resolvedMaxButtons}
              size={actionButtonSize}
              density={actionButtonDensity}
              useSplitButton={useSplitButton}
            />
          )}
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
