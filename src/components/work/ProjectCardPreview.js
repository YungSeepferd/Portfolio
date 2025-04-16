import React from 'react';
import { Box, Fade, useTheme } from '@mui/material';
import TechBar from './TechBar';
import ActionButtonGroup from '../common/ActionButtonGroup';
import { getBarStyles } from '../../utils/getBarStyles';

/**
 * ProjectCardPreview Component
 * 
 * Displays technology tags and action buttons when hovering over a project card
 */
const ProjectCardPreview = ({ isVisible, technologies = [], links = [] }) => {
  const theme = useTheme();
  const styles = getBarStyles('overlay', theme);

  // Only render if there's something to show
  const hasContent = (technologies.length > 0 || links.length > 0);
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
          ...styles.barBg,
          color: styles.text.color,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          boxSizing: 'border-box',
          pointerEvents: 'none', // Allow clicks to pass through to the card
        }}
      >
        {/* Tech Bar */}
        {technologies && technologies.length > 0 && (
          <TechBar
            technologies={technologies}
            variant="outlined"
            size="small"
            barVariant="overlay"
            sx={{ mb: 2 }}
          />
        )}

        {/* Quick links - using ActionButtonGroup with pointerEvents: auto */}
        {links.length > 0 && (
          <Box sx={{ 
            pointerEvents: 'auto', // Override parent's pointer-events: none
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mt: 2
          }}>
            <ActionButtonGroup
              actions={links}
              layout="column"
              maxButtons={2}
              size="small"
              variant="outlined"
              barVariant="overlay"
            />
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
