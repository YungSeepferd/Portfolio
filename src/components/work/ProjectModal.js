import React, { useEffect, useCallback, useRef } from 'react';
import { Modal, Box, IconButton, useTheme, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '95vw' },
          height: { xs: '100%', sm: '95vh' },
          maxWidth: { sm: '95vw' }, 
          maxHeight: { sm: '95vh' },
          bgcolor: 'background.paper',
          borderRadius: { xs: 0, sm: theme.shape.borderRadius * 1.5 },
          boxShadow: theme.shadows[24],
          overflow: 'hidden',
          position: 'relative',
          opacity: 1,
          transition: theme.transitions.create(['opacity', 'transform'], {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeInOut,
          }),
        }}
      >
        {/* Navigation Buttons - Floating Action Buttons positioned on sides */}
        {onPreviousProject && (
          <Tooltip title="Previous Project (←)" placement="right">
            <Fab
              color="primary"
              aria-label="previous project"
              onClick={(e) => {
                e.stopPropagation();
                onPreviousProject();
                if (contentRef.current) contentRef.current.scrollTop = 0;
              }}
              sx={{
                position: 'absolute',
                left: { xs: 16, sm: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: theme.zIndex.modal + 1,
                boxShadow: theme.shadows[6],
                '&:hover': {
                  transform: 'translateY(-50%) scale(1.1)',
                  boxShadow: theme.shadows[12],
                },
                '&:active': {
                  transform: 'translateY(-50%) scale(0.95)',
                },
                transition: theme.transitions.create(['transform', 'box-shadow'], {
                  duration: theme.transitions.duration.shorter,
                  easing: theme.transitions.easing.easeInOut,
                }),
              }}
            >
              <ArrowBackIcon />
            </Fab>
          </Tooltip>
        )}
        
        {onNextProject && (
          <Tooltip title="Next Project (→)" placement="left">
            <Fab
              color="primary"
              aria-label="next project"
              onClick={(e) => {
                e.stopPropagation();
                onNextProject();
                if (contentRef.current) contentRef.current.scrollTop = 0;
              }}
              sx={{
                position: 'absolute',
                right: { xs: 16, sm: 24 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: theme.zIndex.modal + 1,
                boxShadow: theme.shadows[6],
                '&:hover': {
                  transform: 'translateY(-50%) scale(1.1)',
                  boxShadow: theme.shadows[12],
                },
                '&:active': {
                  transform: 'translateY(-50%) scale(0.95)',
                },
                transition: theme.transitions.create(['transform', 'box-shadow'], {
                  duration: theme.transitions.duration.shorter,
                  easing: theme.transitions.easing.easeInOut,
                }),
              }}
            >
              <ArrowForwardIcon />
            </Fab>
          </Tooltip>
        )}

        {/* Close Button - Top Right, Design System Styling */}
        <Tooltip title="Close Project">
          <IconButton
            aria-label="close project"
            onClick={onClose}
            size="large"
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 16 },
              right: { xs: 8, sm: 16 },
              zIndex: theme.zIndex.modal + 1,
              color: 'text.primary',
              backgroundColor: 'background.paper',
              boxShadow: theme.shadows[2],
              border: `1px solid`,
              borderColor: 'divider',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'text.primary',
                transform: 'rotate(90deg)',
                boxShadow: theme.shadows[4],
              },
              transition: theme.transitions.create(['transform', 'background-color', 'box-shadow'], {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeInOut,
              }),
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
            overflowX: 'hidden',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.action.disabled,
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: theme.palette.action.disabledBackground,
              },
            },
          }}
        >
          <ProjectFullContent project={project} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectModal;