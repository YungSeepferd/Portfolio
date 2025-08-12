import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import ProjectMetaBar from './ProjectMetaBar';

/**
 * ActionsBar Component
 *
 * Displays technologies and action buttons in a single bar.
 * Uses standardized project data.
 */
const ActionsBar = ({ technologies = [], links = [], barVariant = 'default' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Don't render if nothing to show
  if (!technologies.length && !links.length) {
    return null;
  }

  return (
    <ProjectMetaBar
      technologies={technologies}
      actions={links}
      variant={barVariant === 'overlay' ? 'hover' : 'full'}
      sx={{ width: '100%' }}
    />
  );
};

export default ActionsBar;
