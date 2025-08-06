import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import ProjectMetaBar from './ProjectMetaBar';

/**
 * ProjectActionsBar Component
 *
 * Shared bar for displaying technologies/tools and action buttons.
 * Used in both ProjectCardPreview (hover) and full project view.
 *
 * Props:
 * - technologies: array of tool/tech names
 * - actions: array of action button configs
 * - barVariant: 'default' | 'overlay'
 * - sx: optional style overrides
 */
const ProjectActionsBar = ({
  technologies = [],
  actions = [],
  barVariant = 'default',
  sx = {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!technologies.length && !actions.length) return null;

  return (
    <ProjectMetaBar
      technologies={technologies}
      actions={actions}
      variant={barVariant === 'overlay' ? 'hover' : 'full'}
      sx={sx}
    />
  );
};

export default ProjectActionsBar;
