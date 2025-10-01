import React, { useEffect, useCallback, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, IconButton, useTheme, useMediaQuery, Typography, Paper, Chip, Button } from '@mui/material';
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
import { getLinkIcon } from './ProjectLinks';

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
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  
  // Animation variants for footer collapse (now shows minimal bar when closed)
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
      height: 'auto', // Changed from 0 to auto to show minimal bar
      opacity: 1, // Changed from 0 to 1 to keep visible
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
      setShowStickyHeader(false);
    }
  }, [project?.id]);

  // Handle scroll to show/hide sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        // Show sticky header after scrolling 300px (past hero section)
        setShowStickyHeader(scrollTop > 300);
      }
    };

    const scrollContainer = contentRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center', // Center vertically
          justifyContent: 'center', // Center horizontally
        }
      }}
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
            height: { xs: '90vh', md: '90vh' },
            maxHeight: { xs: '90vh', md: '90vh' },
            display: 'flex',
            flexDirection: 'column',
            m: { xs: 0, md: 'auto' }, // Center with auto margins on desktop
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
        {/* Sticky Header - appears after scrolling */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: showStickyHeader ? 0 : -100,
            opacity: showStickyHeader ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.modal + 1,
            pointerEvents: showStickyHeader ? 'auto' : 'none',
          }}
        >
          <Paper
            elevation={4}
            sx={{
              background: theme.palette.mode === 'dark'
                ? modalFooterTokens.footer.glassmorphic.dark.background
                : modalFooterTokens.footer.glassmorphic.light.background,
              backdropFilter: theme.palette.mode === 'dark'
                ? modalFooterTokens.footer.glassmorphic.dark.backdropFilter
                : modalFooterTokens.footer.glassmorphic.light.backdropFilter,
              WebkitBackdropFilter: theme.palette.mode === 'dark'
                ? modalFooterTokens.footer.glassmorphic.dark.WebkitBackdropFilter
                : modalFooterTokens.footer.glassmorphic.light.WebkitBackdropFilter,
              borderBottom: `1px solid ${theme.palette.divider}`,
              py: 1.5,
              px: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              {/* Left: Navigation */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {onPreviousProject && (
                  <Tooltip title="Previous Project (←)">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreviousProject();
                        if (contentRef.current) contentRef.current.scrollTop = 0;
                      }}
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
                      }}
                    >
                      <ArrowBackIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {onNextProject && (
                  <Tooltip title="Next Project (→)">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNextProject();
                        if (contentRef.current) contentRef.current.scrollTop = 0;
                      }}
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
                      }}
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              {/* Center: Project Title */}
              <Typography
                variant="subtitle1"
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {project.title}
              </Typography>

              {/* Right: Action Buttons */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'nowrap' }}>
                {project?.links && project.links.slice(0, 2).map((link, index) => {
                  const icon = getLinkIcon(link.label);
                  
                  return (
                    <Tooltip key={`sticky-link-${index}`} title={link.label}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={icon}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          px: 1.5,
                          py: 0.5,
                          minWidth: 'auto',
                          borderRadius: 1.5,
                          display: { xs: 'none', sm: 'flex' },
                          background: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(5, 38, 45, 0.05)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: `1px solid ${theme.palette.divider}`,
                          color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
                          '&:hover': {
                            background: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.15)'
                              : 'rgba(5, 38, 45, 0.15)',
                          },
                        }}
                      >
                        {link.label.replace('View ', '').replace('Try ', '')}
                      </Button>
                    </Tooltip>
                  );
                })}
                <ThemeToggle onToggle={toggleTheme} mode={mode} />
              </Box>
            </Box>
          </Paper>
        </motion.div>

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
              flexDirection: 'column',
              gap: 1,
              px: modalFooterTokens.footer.paddingX,
              py: isFooterOpen ? modalFooterTokens.footer.paddingY : 1,
              transition: theme.transitions.create(['padding'], {
                duration: theme.transitions.duration.shorter,
              }),
            }}
          >
            {/* Action Buttons Row - Only shown when expanded */}
            {isFooterOpen && project?.links && project.links.length > 0 && (
              <Box sx={{ 
                display: 'flex', 
                gap: 1.5, 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                pb: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}>
                {project.links.map((link, index) => {
                  const icon = getLinkIcon(link.label);
                  
                  return (
                    <Button
                      key={`footer-link-${index}`}
                      variant="text"
                      size="small"
                      startIcon={icon}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.75rem',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1.5,
                        fontWeight: 600,
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
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
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
                          transform: 'translateY(-2px)',
                        },
                        '&:active': {
                          background: theme.palette.mode === 'dark'
                            ? modalFooterTokens.controls.glassmorphic.dark.active.background
                            : modalFooterTokens.controls.glassmorphic.light.active.background,
                        },
                        transition: theme.transitions.create(['background', 'transform', 'backdrop-filter'], {
                          duration: theme.transitions.duration.shorter,
                        }),
                      }}
                    >
                      {link.label}
                    </Button>
                  );
                })}
              </Box>
            )}
            
            {/* Minimal Navigation Row - Always visible */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: modalFooterTokens.footer.gap,
                minHeight: isFooterOpen ? modalFooterTokens.footer.minHeight : 40,
                transition: theme.transitions.create(['min-height'], {
                  duration: theme.transitions.duration.shorter,
                }),
              }}
            >
              {/* Left: Navigation arrows */}
              <Box sx={{ 
                minWidth: isFooterOpen ? modalFooterTokens.controls.minWidth : 'auto', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'flex-start', 
                gap: modalFooterTokens.controls.gap 
              }}>
                {/* WIP Disclaimer - Only shown when expanded */}
                {isFooterOpen && (
                  <Chip
                    label="WIP"
                    size="small"
                    sx={{
                      fontSize: modalFooterTokens.wipDisclaimer.fontSize,
                      height: 'auto',
                      py: modalFooterTokens.wipDisclaimer.padding,
                      px: modalFooterTokens.wipDisclaimer.padding,
                      maxWidth: modalFooterTokens.wipDisclaimer.maxWidth,
                      color: theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper',
                      background: theme.palette.mode === 'dark'
                        ? modalFooterTokens.controls.glassmorphic.dark.background
                        : modalFooterTokens.controls.glassmorphic.light.background,
                      backdropFilter: theme.palette.mode === 'dark'
                        ? modalFooterTokens.controls.glassmorphic.dark.backdropFilter
                        : modalFooterTokens.controls.glassmorphic.light.backdropFilter,
                      WebkitBackdropFilter: theme.palette.mode === 'dark'
                        ? modalFooterTokens.controls.glassmorphic.dark.WebkitBackdropFilter
                        : modalFooterTokens.controls.glassmorphic.light.WebkitBackdropFilter,
                      border: 'none',
                      '& .MuiChip-label': {
                        px: 0.5,
                        py: 0,
                      },
                    }}
                  />
                )}
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

            {/* Right: Theme toggle and next button */}
            <Box sx={{ 
              minWidth: isFooterOpen ? modalFooterTokens.controls.minWidth : 'auto', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end', 
              gap: modalFooterTokens.controls.gap 
            }}>
              {/* Theme Toggle - Only shown when expanded */}
              {isFooterOpen && <ThemeToggle onToggle={toggleTheme} mode={mode} />}
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
          </Box>
            </Paper>
          </motion.div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
