import React from 'react';
import { Box, Fade } from '@mui/material';
import TechnologyTags from './TechnologyTags';
import ProjectActionButtons from './ProjectActionButtons';

/**
 * ProjectCardPreview Component
 *
 * Displays technology tags (top) and action buttons (bottom) in a hover overlay.
 */
const ProjectCardPreview = ({ isVisible, technologies = [], links = [] }) => {
  const hasContent = technologies.length > 0 || links.length > 0;
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
              zIndex: 3,
            }}
          >
            <Box
              sx={{
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 2,
                px: 2,
                py: 0.5,
                maxWidth: '90%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
              zIndex: 3,
            }}
          >
            <Box
              sx={{
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 2,
                px: 2,
                py: 1,
                maxWidth: '95%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <ProjectActionButtons
                actions={links}
                layout={{ xs: 'column', sm: 'row' }}
                maxButtons={4}
                size="small"
              />
            </Box>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
