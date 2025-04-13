import React from 'react';
import { Box, Fade, useTheme } from '@mui/material';
import TechBar from './TechBar';
import ProjectLinks from './ProjectLinks';

/**
 * ProjectCardPreview Component
 *
 * Displays TechBar and ProjectLinks as an overlay on ProjectCard hover.
 */
const ProjectCardPreview = ({ isVisible, technologies = [], tools = [], links = {} }) => {
  const theme = useTheme();

  // Only render if there's something to show
  const hasContent = (technologies.length > 0 || tools.length > 0 || Object.keys(links).length > 0);
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
          backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark overlay
          color: theme.palette.common.white,
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
        {(technologies.length > 0 || tools.length > 0) && (
          <TechBar
            technologies={technologies}
            tools={tools}
            sx={{
              mb: 2,
              // Override TechBar styles for overlay
              '& .MuiChip-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: theme.palette.common.white,
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '& .MuiTypography-root': {
                 color: theme.palette.common.white, // Ensure title is white
              }
            }}
          />
        )}

        {/* Project Links */}
        {Object.keys(links).length > 0 && (
          <ProjectLinks
            links={links}
            sx={{
              // Override ProjectLinks styles for overlay
              '& .MuiButton-root': {
                color: theme.palette.common.white,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: theme.palette.common.white,
                },
              },
            }}
          />
        )}
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
