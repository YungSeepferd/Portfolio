import React from 'react';
import { useTheme } from '@mui/material';
import ProjectActionsBar from './ProjectActionsBar';

/**
 * ActionsBar Component
 * 
 * Displays technologies on the left and action buttons on the right in a single bar.
 * Uses standardized project data.
 */
const ActionsBar = ({ technologies = [], links = [], barVariant = 'default' }) => {
  const theme = useTheme();
  
  // Don't render if nothing to show
  if (!technologies.length && !links.length) {
    return null;
  }
  
  return (
    <ProjectActionsBar
      technologies={technologies}
      links={links}
      barVariant={barVariant}
      theme={theme}
    />
  );
};

export default ActionsBar;
