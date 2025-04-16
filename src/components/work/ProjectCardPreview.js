import React from 'react';
import { Box, Fade, useTheme } from '@mui/material';
import TagList from '../common/TagList';
import ProjectActionsBar from './ProjectActionsBar';
import { getBarStyles } from '../../utils/getBarStyles';

/**
 * ProjectCardPreview Component
 * 
 * Displays technology tags and action buttons when hovering over a project card
 */
const ProjectCardPreview = ({ isVisible, technologies = [], categories = [], links = [] }) => {
  const theme = useTheme();
  const styles = getBarStyles('overlay', theme);

  // Only render if there's something to show
  const hasContent = (technologies.length > 0 || categories.length > 0 || links.length > 0);
  if (!hasContent) return null;

  return (
    <Fade in={isVisible} timeout={300}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
          ...styles.barBg,
        }}
      >
        {/* Top overlay bar: TagList (categories) */}
        {Array.isArray(categories) && categories.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.82) 80%, rgba(0,0,0,0.05) 100%)',
              p: { xs: 1, sm: 1.5 },
              pt: { xs: 1.5, sm: 2 },
              boxSizing: 'border-box',
              pointerEvents: 'auto',
            }}
          >
            <TagList tags={categories} sx={{ mb: 0 }} />
          </Box>
        )}
        {/* Bottom overlay bar: Action buttons + TechBar as a unit, absolutely at bottom, shadow only bottom 50% */}
        {(technologies.length > 0 || links.length > 0) && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '50%', // Only cover bottom 50%
              display: 'flex',
              alignItems: 'flex-end',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <ProjectActionsBar
              technologies={technologies}
              links={links}
              barVariant="overlay"
              sx={{ width: '100%' }}
            />
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
