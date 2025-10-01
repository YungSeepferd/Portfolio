import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, IconButton, useTheme, useMediaQuery, Typography, Paper, Chip } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';
import ProjectFullContent from './ProjectFullContent';
import ThemeToggle from '../common/ThemeToggle';
import { useThemeMode } from '../../context/ThemeContext';
import modalFooterTokens from '../../theme/components/modalFooter';

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
  const { mode, toggleTheme } = useThemeMode();
  const contentRef = useRef(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [isFooterOpen, setIsFooterOpen] = useState(true);
  
  // Animation variants for footer collapse
  const footerVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: 'easeInOut' },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        opacity: { duration: 0.15 },
        height: { duration: 0.3, ease: 'easeInOut', delay: 0.05 }
      }
    }
  };
  
  // Toggle footer visibility
  const toggleFooter = useCallback(() => {
    setIsFooterOpen(prev => !prev);
  }, []);
  
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      // Store original styles
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Prevent body scroll and compensate for scrollbar
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [open]);

  // Don't render anything if no project is provided
  if (!project) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={`project-modal-${project.id}-title`}
      fullScreen={fullScreen}
      maxWidth="xl"
      fullWidth
      scroll="paper"
      disableScrollLock={false}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }
        },
        paper: {
          sx: {
            borderRadius: 0,
            overflow: 'hidden',
            boxShadow: theme.shadows[24],
            position: 'relative',
            height: { xs: '100vh', md: '95vh' },
            maxHeight: { xs: '100vh', md: '95vh' },
            display: 'flex',
            flexDirection: 'column',
          }
        }
      }}
      data-testid="project-modal"
    >
      <DialogTitle
        id={`project-modal-${project.id}-title`}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          p: 0,
          // visually hidden title bar; we keep semantic title via aria but place close button
        }}
      >
        {/* Accessible title for screen readers (Dialog's aria-labelledby targets the DialogTitle id) */}
        <Typography component="h2" sx={visuallyHidden}>
          {project.title}
        </Typography>
        <Tooltip title="Close Project">
          <IconButton
            aria-label="close project"
            onClick={onClose}
            size="large"
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 16 },
              left: { xs: 8, sm: 16 },
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
            data-testid="project-modal-close"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </DialogTitle>

      <DialogContent 
        dividers 
        ref={contentRef} 
        sx={{ 
          p: 0, 
          flex: 1,
          overflowY: 'auto',
          // Hide scrollbar while keeping scroll functionality
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, Edge
          },
          msOverflowStyle: 'none', // IE and Edge legacy
          // Ensure content doesn't exceed modal boundaries
          '& > *': {
            maxWidth: '100%',
            boxSizing: 'border-box',
          },
        }}
      >
        {/* Content */}
        <Box sx={{ width: '100%' }}>
          <ProjectFullContent project={project} />
        </Box>
        {/* Collapsible sticky footer navigation */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: theme.zIndex.modal + 2,
          }}
        >
          {/* Toggle button */}
          <Tooltip title={isFooterOpen ? 'Hide navigation' : 'Show navigation'}>
            <IconButton
              onClick={toggleFooter}
              aria-label={isFooterOpen ? 'hide navigation' : 'show navigation'}
              aria-expanded={isFooterOpen}
              sx={{
                position: 'absolute',
                top: modalFooterTokens.toggle.offset,
                left: '50%',
                transform: 'translateX(-50%)',
                width: modalFooterTokens.toggle.size,
                height: modalFooterTokens.toggle.size,
                background: theme.palette.mode === 'dark'
                  ? modalFooterTokens.toggle.glassmorphic.dark.background
                  : modalFooterTokens.toggle.glassmorphic.light.background,
                backdropFilter: theme.palette.mode === 'dark'
                  ? modalFooterTokens.toggle.glassmorphic.dark.backdropFilter
                  : modalFooterTokens.toggle.glassmorphic.light.backdropFilter,
                WebkitBackdropFilter: theme.palette.mode === 'dark'
                  ? modalFooterTokens.toggle.glassmorphic.dark.WebkitBackdropFilter
                  : modalFooterTokens.toggle.glassmorphic.light.WebkitBackdropFilter,
                border: `1px solid ${theme.palette.divider}`,
                zIndex: theme.zIndex.modal + 3,
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? modalFooterTokens.toggle.glassmorphic.dark.hover.background
                    : modalFooterTokens.toggle.glassmorphic.light.hover.background,
                  backdropFilter: theme.palette.mode === 'dark'
                    ? modalFooterTokens.toggle.glassmorphic.dark.hover.backdropFilter
                    : modalFooterTokens.toggle.glassmorphic.light.hover.backdropFilter,
                  WebkitBackdropFilter: theme.palette.mode === 'dark'
                    ? modalFooterTokens.toggle.glassmorphic.dark.hover.WebkitBackdropFilter
                    : modalFooterTokens.toggle.glassmorphic.light.hover.WebkitBackdropFilter,
                  transform: 'translateX(-50%) scale(1.05)',
                },
                '&:active': {
                  background: theme.palette.mode === 'dark'
                    ? modalFooterTokens.toggle.glassmorphic.dark.active.background
                    : modalFooterTokens.toggle.glassmorphic.light.active.background,
                  transform: 'translateX(-50%) scale(0.98)',
                },
                transition: theme.transitions.create(['background', 'transform', 'backdrop-filter'], {
                  duration: theme.transitions.duration.shorter,
                }),
              }}
            >
              {isFooterOpen ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

          {/* Animated footer */}
          <motion.div
            initial="open"
            animate={isFooterOpen ? 'open' : 'closed'}
            variants={footerVariants}
            style={{ overflow: 'hidden' }}
          >
            <Paper
              elevation={3}
              square
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                // Glassmorphic background using design tokens
                background: theme.palette.mode === 'dark'
                  ? modalFooterTokens.footer.glassmorphic.dark.background
                  : modalFooterTokens.footer.glassmorphic.light.background,
                backdropFilter: theme.palette.mode === 'dark'
                  ? modalFooterTokens.footer.glassmorphic.dark.backdropFilter
                  : modalFooterTokens.footer.glassmorphic.light.backdropFilter,
                WebkitBackdropFilter: theme.palette.mode === 'dark'
                  ? modalFooterTokens.footer.glassmorphic.dark.WebkitBackdropFilter
                  : modalFooterTokens.footer.glassmorphic.light.WebkitBackdropFilter,
              }}
            >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: modalFooterTokens.footer.gap,
              px: modalFooterTokens.footer.paddingX,
              py: modalFooterTokens.footer.paddingY,
              minHeight: modalFooterTokens.footer.minHeight,
            }}
          >
            <Box sx={{ minWidth: modalFooterTokens.controls.minWidth, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: modalFooterTokens.controls.gap }}>
              {/* WIP Disclaimer */}
              <Chip
                label="WIP"
                size="small"
                variant="outlined"
                sx={{
                  fontSize: modalFooterTokens.wipDisclaimer.fontSize,
                  height: 'auto',
                  py: modalFooterTokens.wipDisclaimer.padding,
                  px: modalFooterTokens.wipDisclaimer.padding,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  maxWidth: modalFooterTokens.wipDisclaimer.maxWidth,
                  '& .MuiChip-label': {
                    px: 0.5,
                    py: 0,
                  },
                }}
              />
              {onPreviousProject && (
                <Tooltip title="Previous Project (←)">
                  <span>
                    <IconButton
                      aria-label="previous project"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreviousProject();
                        if (contentRef.current) contentRef.current.scrollTop = 0;
                      }}
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
                        width: modalFooterTokens.controls.size,
                        height: modalFooterTokens.controls.size,
                        background: theme.palette.mode === 'dark'
                          ? modalFooterTokens.controls.glassmorphic.dark.background
                          : modalFooterTokens.controls.glassmorphic.light.background,
                        backdropFilter: theme.palette.mode === 'dark'
                          ? modalFooterTokens.controls.glassmorphic.dark.backdropFilter
                          : modalFooterTokens.controls.glassmorphic.light.backdropFilter,
                        WebkitBackdropFilter: theme.palette.mode === 'dark'
                          ? modalFooterTokens.controls.glassmorphic.dark.WebkitBackdropFilter
                          : modalFooterTokens.controls.glassmorphic.light.WebkitBackdropFilter,
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          background: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.hover.background
                            : modalFooterTokens.controls.glassmorphic.light.hover.background,
                          backdropFilter: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.hover.backdropFilter
                            : modalFooterTokens.controls.glassmorphic.light.hover.backdropFilter,
                          WebkitBackdropFilter: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.hover.WebkitBackdropFilter
                            : modalFooterTokens.controls.glassmorphic.light.hover.WebkitBackdropFilter,
                          transform: 'scale(1.05)',
                        },
                        '&:active': {
                          background: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.active.background
                            : modalFooterTokens.controls.glassmorphic.light.active.background,
                          transform: 'scale(0.98)',
                        },
                        transition: theme.transitions.create(['background', 'transform', 'backdrop-filter'], {
                          duration: theme.transitions.duration.shorter,
                        }),
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
            </Box>

            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 1, overflow: 'hidden' }}>
              <Typography
                component="h3"
                sx={{
                  fontSize: modalFooterTokens.title.fontSize,
                  fontWeight: modalFooterTokens.title.fontWeight,
                  lineHeight: modalFooterTokens.title.lineHeight,
                  textAlign: 'center',
                  whiteSpace: modalFooterTokens.title.whiteSpace,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  display: { xs: '-webkit-box', sm: 'block' },
                  WebkitLineClamp: { xs: modalFooterTokens.title.maxLines.xs, sm: modalFooterTokens.title.maxLines.sm },
                  WebkitBoxOrient: { xs: 'vertical', sm: 'unset' },
                  color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
                }}
                title={project.title}
              >
                {project.title}
              </Typography>
            </Box>

            <Box sx={{ minWidth: modalFooterTokens.controls.minWidth, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: modalFooterTokens.controls.gap }}>
              <ThemeToggle onToggle={toggleTheme} mode={mode} />
              {onNextProject && (
                <Tooltip title="Next Project (→)">
                  <span>
                    <IconButton
                      aria-label="next project"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNextProject();
                        if (contentRef.current) contentRef.current.scrollTop = 0;
                      }}
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
                        width: modalFooterTokens.controls.size,
                        height: modalFooterTokens.controls.size,
                        background: theme.palette.mode === 'dark'
                          ? modalFooterTokens.controls.glassmorphic.dark.background
                          : modalFooterTokens.controls.glassmorphic.light.background,
                        backdropFilter: theme.palette.mode === 'dark'
                          ? modalFooterTokens.controls.glassmorphic.dark.backdropFilter
                          : modalFooterTokens.controls.glassmorphic.light.backdropFilter,
                        WebkitBackdropFilter: theme.palette.mode === 'dark'
                          ? modalFooterTokens.controls.glassmorphic.dark.WebkitBackdropFilter
                          : modalFooterTokens.controls.glassmorphic.light.WebkitBackdropFilter,
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          background: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.hover.background
                            : modalFooterTokens.controls.glassmorphic.light.hover.background,
                          backdropFilter: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.hover.backdropFilter
                            : modalFooterTokens.controls.glassmorphic.light.hover.backdropFilter,
                          WebkitBackdropFilter: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.hover.WebkitBackdropFilter
                            : modalFooterTokens.controls.glassmorphic.light.hover.WebkitBackdropFilter,
                          transform: 'scale(1.05)',
                        },
                        '&:active': {
                          background: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.active.background
                            : modalFooterTokens.controls.glassmorphic.light.active.background,
                          transform: 'scale(0.98)',
                        },
                        transition: theme.transitions.create(['background', 'transform', 'backdrop-filter'], {
                          duration: theme.transitions.duration.shorter,
                        }),
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
            </Box>
          </Box>
            </Paper>
          </motion.div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
