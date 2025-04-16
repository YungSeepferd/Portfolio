import React from 'react';
import { Box, Fade, useTheme } from '@mui/material';
import SkillTag from '../common/SkillTag';
import ActionButtonGroup from '../common/ActionButtonGroup';
import { getBarStyles } from '../../utils/getBarStyles';
import TechBar from './TechBar';

/**
 * ProjectCardPreview Component
 * 
 * Displays technology tags at the top overlay (as SkillTag chips),
 * and action buttons at the bottom overlay when hovering over a project card.
 */
const ProjectCardPreview = ({ isVisible, technologies = [], links = [] }) => {
  const theme = useTheme();
  const styles = getBarStyles('overlay', theme);

  // technologies is passed as a prop, which comes from the project object
  // Example: technologies: ["Figma", "Adobe Illustrator", "Adobe Premiere Pro"]

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
          ...styles.barBg,
        }}
      >
        {/* Top overlay: Technologies as TechBar, centered, with theme-based background gradient */}
        {technologies.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              // Ensure height is only as tall as needed for the tags
              height: 'auto',
              display: 'flex',
              justifyContent: 'center', // Center horizontally
              alignItems: 'flex-start', // Align to top
              pointerEvents: 'auto',
              zIndex: 3,
              pt: { xs: 2, sm: 3 },
              pb: 0,
            }}
          >
            <Box
              sx={{
                px: { xs: 2, sm: 3 },
                py: 2,
                pb: 3,
                borderRadius: theme.shape.borderRadius * 2,
                background: `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                boxShadow: theme.shadows[3],
                opacity: 0.93,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center tags inside the gradient box
              }}
            >
              <TechBar
                technologies={technologies}
                centered
                sx={{
                  background: 'transparent',
                  boxShadow: 'none',
                  px: 0,
                  py: 0,
                }}
              />
            </Box>
          </Box>
        )}
        {/* Bottom overlay: Action buttons only */}
        {links.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              pointerEvents: 'auto',
              pb: 2,
              zIndex: 2,
            }}
          >
            <ActionButtonGroup
              actions={links}
              layout="row"
              maxButtons={3}
              size="small"
              variant="outlined"
              sx={{
                background: 'rgba(0,0,0,0.5)',
                borderRadius: 2,
                px: 2,
                py: 1,
                boxShadow: 2,
                '& .MuiButton-root': {
                  color: theme.palette.common.white,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: theme.palette.common.white,
                  },
                }
              }}
            />
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default ProjectCardPreview;
