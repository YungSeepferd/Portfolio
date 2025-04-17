import React, { useEffect, useCallback, useRef } from 'react';
import { Modal, Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

  // Project index indicator (e.g., 2/6)
  // These props are passed from Work.js, which has projects and selectedProjectIndex
  // We'll infer index and total from project and navigation props if possible
  let projectIndex = null;
  let projectTotal = null;
  if (typeof project === 'object' && project.id && onNextProject && onPreviousProject) {
    // Try to infer index/total from parent if possible
    // (This logic can be improved if you pass index/total directly)
  }

  // Navigation UI
  const Navigation = () => (
    <Box
      sx={{
        position: isMobile ? 'fixed' : 'absolute',
        left: isMobile ? '50%' : 16,
        bottom: isMobile ? 24 : 'auto',
        top: isMobile ? 'auto' : 16,
        right: isMobile ? 'auto' : 16,
        zIndex: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        transform: isMobile ? 'translateX(-50%)' : 'none',
        background: isMobile ? 'rgba(30,30,40,0.85)' : 'none',
        borderRadius: isMobile ? 3 : 0,
        boxShadow: isMobile ? 4 : 'none',
        px: isMobile ? 2 : 0,
        py: isMobile ? 1 : 0,
      }}
    >
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
              color: theme.palette.primary.main,
              backgroundColor: 'rgba(0,0,0,0.08)',
              boxShadow: theme.shadows[2],
              borderRadius: '50%',
              p: 1.2,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.background.paper,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s',
            }}
            size={isMobile ? 'large' : 'medium'}
          >
            <KeyboardArrowLeftIcon fontSize={isMobile ? 'large' : 'medium'} />
          </IconButton>
        </Tooltip>
      )}
      {/* Project index indicator (optional, if index/total available) */}
      {typeof projectIndex === 'number' && typeof projectTotal === 'number' && (
        <Box sx={{ color: 'white', fontWeight: 600, fontSize: isMobile ? '1.1rem' : '1rem', mx: 1 }}>
          {projectIndex + 1} / {projectTotal}
        </Box>
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
              color: theme.palette.primary.main,
              backgroundColor: 'rgba(0,0,0,0.08)',
              boxShadow: theme.shadows[2],
              borderRadius: '50%',
              p: 1.2,
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.background.paper,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s',
            }}
            size={isMobile ? 'large' : 'medium'}
          >
            <KeyboardArrowRightIcon fontSize={isMobile ? 'large' : 'medium'} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  // Close button (always top right, large and touch-friendly on mobile)
  const CloseBtn = () => (
    <Tooltip title="Close Project">
      <IconButton
        aria-label="close project"
        onClick={onClose}
        size={isMobile ? 'small' : 'small'}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 40,
          color: theme.palette.background.default, // icon color
          backgroundColor: theme.palette.secondary.main, // design system background
          boxShadow: theme.shadows[2],
          borderRadius: '50%',
          p: 0.6,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.background.default,
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s',
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );

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
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        }
      }}
    >
      <Box
        sx={{
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
        {/* Navigation (bottom center on mobile, top left on desktop) */}
        <Navigation />
        {/* Close Button (always top right) */}
        <CloseBtn />
        {/* Scrollable Content Area with ref */}
        <Box 
          ref={contentRef}
          sx={{ 
            width: '100%', 
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            mt: { xs: 8, sm: 10 }, // Move content down for all projects
          }}
        >
          <ProjectFullContent project={project} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectModal;