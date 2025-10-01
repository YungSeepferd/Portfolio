import React from 'react';
import { Box, Fade, useTheme } from '@mui/material';
import TechnologyTags from './TechnologyTags';
import ProjectActionButtons from './ProjectActionButtons';

/**
 * ProjectCardPreview Component
 * 
 * Displays technology tags (top) and action buttons (bottom) in a hover overlay.
 */
const ProjectCardPreview = ({ isVisible, technologies = [], links = [], size = 'compact', projectColor = 'primary' }) => {
  const theme = useTheme();
  const isComfortable = size === 'comfortable';
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
                // Removed opaque background to allow glassmorphic effect
                px: isComfortable ? { xs: 1.5, sm: 2.5 } : { xs: 1, sm: 2 },
                py: isComfortable ? { xs: 0.75, sm: 1 } : { xs: 0.25, sm: 0.5 },
                maxWidth: { xs: '100%', sm: '90%' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TechnologyTags
                technologies={technologies}
                variant="hover"
                size={isComfortable ? 'medium' : 'small'}
                projectColor={projectColor}
              />
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
              pt: 2,
              pb: 2,
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
                // Removed opaque background to allow glassmorphic effect
                px: isComfortable ? { xs: 1.5, sm: 2.5 } : { xs: 1, sm: 2 },
                py: isComfortable ? { xs: 0.75, sm: 1.1 } : { xs: 0.5, sm: 1 },
                maxWidth: { xs: '800%', sm: '75%' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ProjectActionButtons
                actions={links}
                layout="row"
                maxButtons={links.length}
                size={isComfortable ? 'medium' : 'small'}
                density={isComfortable ? 'comfortable' : 'compact'}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
