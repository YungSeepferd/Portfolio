import React from 'react';
import { Box, Fade, useTheme } from '@mui/material';
import TechBar from './TechBar';
import ActionButton from '../common/ActionButton';

/**
 * ProjectCardPreview Component
 *
 * Displays TechBar and Links as an overlay on ProjectCard hover.
 */
const ProjectCardPreview = ({ isVisible, technologies = [], links = [] }) => {
  const theme = useTheme();

  // Handle links as either array or object for backward compatibility
  const linksArray = Array.isArray(links) ? links : 
                    (links && typeof links === 'object' ? Object.values(links) : []);

  // Only render if there's something to show
  const hasContent = (technologies.length > 0 || linksArray.length > 0);
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
        {technologies && technologies.length > 0 && (
          <TechBar
            technologies={technologies}
            variant="outlined"
            size="small"
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

        {/* Quick link buttons - will be clickable but pointer-events is set to none on parent */}
        {linksArray.length > 0 && linksArray.slice(0, 2).map((link, index) => (
          <Box 
            key={`preview-link-${index}`} 
            sx={{ 
              pointerEvents: 'auto', // Override parent's pointer-events: none
              mt: 1
            }}
          >
            <ActionButton
              label={link.label || 'View'}
              href={link.url}
              icon={link.icon}
              contentType={link.contentType || 'external'}
              variant="outlined"
              size="small"
              color="inherit"
              sx={{
                color: theme.palette.common.white,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: theme.palette.common.white,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
