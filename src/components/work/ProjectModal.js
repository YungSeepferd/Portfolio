import React, { useEffect, useCallback, useRef } from 'react';
import { Modal, Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Tooltip from '@mui/material/Tooltip';
import ProjectFullContent from './ProjectFullContent';

/**
 * ProjectModal Component
 * 
 * Displays a project in a modal dialog with navigation controls
 * Now appears almost full screen with a close button in the top left
 */
const ProjectModal = ({ 
  open, 
  onClose, 
  project, 
  onNextProject, 
  onPreviousProject 
}) => {
  const theme = useTheme();
  const contentRef = useRef(null);
  
  // Reset scroll position when project changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [project?.id]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!open) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        if (onPreviousProject) {
          e.preventDefault();
          onPreviousProject();
        }
        break;
      case 'ArrowRight':
        if (onNextProject) {
          e.preventDefault();
          onNextProject();
        }
        break;
      case 'Escape':
        if (onClose) {
          e.preventDefault();
          onClose();
        }
        break;
      default:
        break;
    }
  }, [open, onNextProject, onPreviousProject, onClose]);

  // Add and remove keyboard event listener
  useEffect(() => {
    // Only add the listener when the modal is open
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  // Don't render anything if no project is provided
  if (!project) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={`project-modal-${project.id}-title`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Backdrop styling
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker background
        }
      }}
    >
      <Box
        sx={{
          // Increased to almost full screen
          width: '95vw',
          height: '95vh',
          maxWidth: '95vw', 
          maxHeight: '95vh',
          bgcolor: 'background.default',
          borderRadius: 1,
          boxShadow: 24,
          overflow: 'hidden',
          position: 'relative',
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {/* Navigation Buttons - Both Top Left, Accent Color */}
        <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 30, display: 'flex', gap: 2 }}>
          {onPreviousProject && (
            <Tooltip title="Previous Project">
              <IconButton
                aria-label="previous project"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreviousProject();
                  if (contentRef.current) contentRef.current.scrollTop = 0;
                }}
                sx={{
                  color: theme.palette.accent.main,
                  backgroundColor: 'rgba(0,0,0,0.08)',
                  boxShadow: theme.shadows[2],
                  borderRadius: theme.shape.borderRadius,
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.warning.main,
                    color: theme.palette.success.dark,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <KeyboardArrowLeftIcon fontSize="medium" sx={{ mr: 1 }} />
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>Previous Project</span>
              </IconButton>
            </Tooltip>
          )}
          {onNextProject && (
            <Tooltip title="Next Project">
              <IconButton
                aria-label="next project"
                onClick={(e) => {
                  e.stopPropagation();
                  onNextProject();
                  if (contentRef.current) contentRef.current.scrollTop = 0;
                }}
                sx={{
                  color: theme.palette.accent.main,
                  backgroundColor: 'rgba(0,0,0,0.08)',
                  boxShadow: theme.shadows[2],
                  borderRadius: theme.shape.borderRadius,
                  display: 'flex',
                  alignItems: 'center',
                  px: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.warning.main,
                    color: theme.palette.success.dark,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <span style={{ fontSize: '1rem', fontWeight: 500, marginRight: 8 }}>Next Project</span>
                <KeyboardArrowRightIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Close Button - Top Right, Design System Styling */}
        <Tooltip title="Close Project">
          <IconButton
            aria-label="close project"
            onClick={onClose}
            size="large"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 20,
              color: theme.palette.grey[900],
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[2],
              borderRadius: theme.shape.borderRadius,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.grey[800],
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        {/* Scrollable Content Area with ref */}
        <Box 
          ref={contentRef}
          sx={{ 
            width: '100%', 
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          <ProjectFullContent project={project} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectModal;