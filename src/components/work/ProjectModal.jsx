import React, { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { Modal, Box, IconButton, useTheme, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProjectFullContent from './ProjectFullContent';
import { useSwipeable } from 'react-swipeable';
import parseProjectContent from '../../utils/projectContentParser';
import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt';
import SwipeLeftAltIcon from '@mui/icons-material/SwipeLeftAlt';

/**
 * ProjectModal Component
 *
 * Displays a project in a modal dialog with navigation controls
 * Enhanced with responsive design, improved gesture support,
 * and optimized content loading.
 */
const ProjectModal = ({
  open,
  onClose,
  project,
  onNextProject,
  onPreviousProject,
  projectIndex,
  projectTotal,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const contentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const parsedProject = useMemo(() => parseProjectContent(project), [project]);

  // Enhanced swipe handlers with better sensitivity settings
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => onNextProject && onNextProject(),
    onSwipedRight: () => onPreviousProject && onPreviousProject(),
    trackMouse: false,
    preventDefaultTouchmoveEvent: true,
    delta: 50, // Increased threshold for more intentional swipes
    swipeDuration: 500, // Limit swipe duration
  });

  // Reset scroll position and loading state when project changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      setIsLoading(true);
      // Short timeout to allow content to load
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [project?.id]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
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
    },
    [open, onNextProject, onPreviousProject, onClose]
  );

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

  // Disable/enable page scrolling when modal opens/closes
  useEffect(() => {
    // Store original body style to restore it later
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    if (open) {
      // Calculate scroll bar width to prevent layout shift
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Disable scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';

      // Add padding right to prevent content shift when scrollbar disappears
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    }

    // Cleanup function to restore original body style when modal closes
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [open]);

  // Don't render anything if no project is provided
  if (!project) return null;

  // Navigation UI - Enhanced for better touch area and accessibility
  const Navigation = () => {
    // For mobile, create a more touch-friendly navigation panel
    if (isMobile) {
      return (
        <Box
          sx={{
            position: 'fixed',
            left: '50%',
            bottom: 24,
            zIndex: 30,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            transform: 'translateX(-50%)',
            background: 'rgba(30,30,40,0.85)',
            borderRadius: 3,
            boxShadow: 4,
            px: 1.5,
            py: 0.75,
            backdropFilter: 'blur(8px)', // Add blur effect for better visibility
          }}
        >
          {onPreviousProject && (
            <IconButton
              aria-label="previous project"
              onClick={(e) => {
                e.stopPropagation();
                onPreviousProject();
                if (contentRef.current) contentRef.current.scrollTop = 0;
              }}
              sx={{
                color: theme.palette.common.white,
                p: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s',
              }}
              size="large"
            >
              <KeyboardArrowLeftIcon fontSize="large" />
            </IconButton>
          )}

          {/* Project index indicator (optional) */}
          {typeof projectIndex === 'number' && typeof projectTotal === 'number' && (
            <Box
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: '1.1rem',
                mx: 1,
                minWidth: '3rem',
                textAlign: 'center',
              }}
            >
              {projectIndex + 1} / {projectTotal}
            </Box>
          )}

          {onNextProject && (
            <IconButton
              aria-label="next project"
              onClick={(e) => {
                e.stopPropagation();
                onNextProject();
                if (contentRef.current) contentRef.current.scrollTop = 0;
              }}
              sx={{
                color: theme.palette.common.white,
                p: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s',
              }}
              size="large"
            >
              <KeyboardArrowRightIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      );
    }

    // For desktop/tablet, use the standard navigation in the corners
    return (
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          zIndex: 30,
          // Separate buttons to opposite corners for better UX
          '& .prev-button': {
            position: 'absolute',
            left: 16,
            top: 16,
          },
          '& .next-button': {
            position: 'absolute',
            right: 16,
            top: 16,
          },
          '& .project-counter': {
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 20,
            fontSize: '0.9rem',
            fontWeight: 500,
          },
        }}
      >
        {typeof projectIndex === 'number' && typeof projectTotal === 'number' && (
          <Box className="project-counter">
            {projectIndex + 1} / {projectTotal}
          </Box>
        )}

        {onPreviousProject && (
          <Tooltip title="Previous Project">
            <IconButton
              className="prev-button"
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
              size="medium"
            >
              <KeyboardArrowLeftIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        )}

        {onNextProject && (
          <Tooltip title="Next Project">
            <IconButton
              className="next-button"
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
              size="medium"
            >
              <KeyboardArrowRightIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    );
  };

  // Improved Close button with better accessibility
  const CloseBtn = () => (
    <Tooltip title="Close Project">
      <IconButton
        aria-label="close project"
        onClick={onClose}
        size={isMobile ? 'medium' : 'small'}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 40,
          color: theme.palette.background.default,
          backgroundColor: theme.palette.secondary.main,
          boxShadow: theme.shadows[2],
          borderRadius: '50%',
          p: isMobile ? 0.8 : 0.6, // Larger touch target on mobile
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s',
        }}
      >
        <CloseIcon fontSize={isMobile ? 'medium' : 'small'} />
      </IconButton>
    </Tooltip>
  );

  // Improved swipe indicator with animated instructions
  const SwipeIndicator = () => (
    <Box
      sx={{
        position: 'absolute',
        bottom: 80, // Position above the navigation controls
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: { xs: 'flex', sm: 'none' },
        alignItems: 'center',
        bgcolor: 'rgba(0,0,0,0.7)',
        color: 'white',
        borderRadius: 2,
        px: 2,
        py: 1,
        fontSize: '0.9rem',
        boxShadow: 3,
        pointerEvents: 'none',
        gap: 1,
        opacity: 0.9,
        animation: 'fadeOut 3s 2s forwards', // fade out after 2s
        '@keyframes fadeOut': {
          to: { opacity: 0 },
        },
      }}
    >
      <SwipeRightAltIcon
        fontSize="small"
        sx={{
          animation: 'swipeRight 1.5s infinite',
          '@keyframes swipeRight': {
            '0%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(-3px)' },
            '100%': { transform: 'translateX(0)' },
          },
        }}
      />
      <Box component="span">Swipe to navigate</Box>
      <SwipeLeftAltIcon
        fontSize="small"
        sx={{
          animation: 'swipeLeft 1.5s infinite',
          '@keyframes swipeLeft': {
            '0%': { transform: 'translateX(0)' },
            '50%': { transform: 'translateX(3px)' },
            '100%': { transform: 'translateX(0)' },
          },
        }}
      />
    </Box>
  );

  // Loading indicator
  const LoadingOverlay = () =>
    isLoading && (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 25,
          backdropFilter: 'blur(4px)',
        }}
      >
        <CircularProgress color="primary" size={isMobile ? 40 : 50} />
      </Box>
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
        },
        // Prevent any overflow on the modal itself
        '& .MuiModal-root': {
          overflow: 'hidden',
        },
      }}
    >
      <Box
        id="project-modal-container"
        sx={{
          width: '95vw',
          height: '95vh',
          maxWidth: '95vw',
          maxHeight: '95vh',
          bgcolor: 'background.default',
          borderRadius: theme.shape.borderRadius,
          boxShadow: 24,
          overflow: 'hidden', // Prevent any overflow
          position: 'relative',
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        {...swipeHandlers} // Apply swipe handlers to the entire modal
      >
        <LoadingOverlay />
        <CloseBtn />
        <Navigation />
        {isMobile && <SwipeIndicator />}

        <Box
          ref={contentRef}
          sx={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            mt: { xs: 6, sm: 8 }, // Reduced top margin for better content visibility
            WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
            scrollbarWidth: 'thin', // Better scrollbars for Firefox
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <ProjectFullContent
            project={parsedProject}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectModal;
