import React from 'react';
import { Box, Fade } from '@mui/material';
import ProjectMetaBar from './ProjectMetaBar';

/**
 * ProjectCardPreview Component
 * 
 * Displays technology tags and action buttons in a hover overlay using ProjectMetaBar.
 */
const ProjectCardPreview = ({ isVisible, technologies = [], links = [] }) => {
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
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'none',
          }}
        >
          {/* Top overlay: Technologies and actions using ProjectMetaBar */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              pt: { xs: 2, sm: 3 },
              pb: 0,
              pointerEvents: 'auto',
            }}
          >
            <ProjectMetaBar
              technologies={technologies}
              actions={links}
              variant="hover"
            />
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
