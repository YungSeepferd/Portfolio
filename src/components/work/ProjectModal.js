import React, { useEffect, useCallback, useRef } from 'react';
import { Modal, Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
          // Consistent box styling
          bgcolor: 'background.default',
          borderRadius: 1,
          boxShadow: 24,
          overflow: 'hidden',
          // Improved position
          position: 'relative', 
          // Animation
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {/* Close Button - Top Left with Design System Styling */}
        <IconButton
          aria-label="close project"
          onClick={onClose}
          size="large"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10,
            color: theme.palette.common.white,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            boxShadow: theme.shadows[2],
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Navigation Buttons */}
        {onPreviousProject && (
          <IconButton
            aria-label="previous project"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onPreviousProject();
              // Reset scroll position when navigating
              if (contentRef.current) {
                contentRef.current.scrollTop = 0;
              }
            }}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              color: theme.palette.common.white,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              },
            }}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>
        )}
        
        {onNextProject && (
          <IconButton
            aria-label="next project"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onNextProject();
              // Reset scroll position when navigating
              if (contentRef.current) {
                contentRef.current.scrollTop = 0;
              }
            }}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              color: theme.palette.common.white,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              },
            }}
          >
            <KeyboardArrowRightIcon fontSize="large" />
          </IconButton>
        )}
        
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