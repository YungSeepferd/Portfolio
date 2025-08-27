import React from 'react';
import { Box, Fade, useTheme } from '@mui/material';
import TechnologyTags from './TechnologyTags';
import ProjectActionButtons from './ProjectActionButtons';

/**
 * ProjectCardPreview Component
 * 
 * Displays technology tags (top) and action buttons (bottom) in a hover overlay.
 */
const ProjectCardPreview = ({ isVisible, technologies = [], links = [] }) => {
  const theme = useTheme();
  const hasContent = (technologies.length > 0 || links.length > 0);
  if (!hasContent) return null;
  
  return (
    <Fade in={isVisible} timeout={theme.transitions.duration.enteringScreen}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: theme.zIndex.speedDial,
          pointerEvents: 'none',
        }}
      >
        {/* Top overlay: Technology tags */}
        {technologies.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              pt: { xs: 2, sm: 3 },
              pb: 0,
              pointerEvents: 'auto',
              zIndex: theme.zIndex.speedDial + 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'background.paper',
                opacity: 0.95,
                border: 1,
                borderColor: 'divider',
                borderRadius: 8, // Reduced from theme.shape.borderRadius * 2 for less rounded corners
                px: { xs: 1, sm: 2 },
                py: { xs: 0.25, sm: 0.5 },
                maxWidth: { xs: '100%', sm: '90%' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: theme.shadows[4],
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <TechnologyTags technologies={technologies} variant="hover" size="small" />
            </Box>
          </Box>
        )}

        {/* Bottom overlay: Action buttons */}
        {links.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              pb: { xs: 2, sm: 3 },
              pointerEvents: 'auto',
              zIndex: theme.zIndex.speedDial + 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'background.paper',
                opacity: 0.95,
                border: 1,
                borderColor: 'divider',
                borderRadius: 8, // Reduced from theme.shape.borderRadius * 2 for less rounded corners
                px: { xs: 1, sm: 2 },
                py: { xs: 0.5, sm: 1 },
                maxWidth: { xs: '100%', sm: '95%' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: theme.shadows[4],
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <ProjectActionButtons actions={links} layout="row" maxButtons={4} size="small" />
            </Box>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
