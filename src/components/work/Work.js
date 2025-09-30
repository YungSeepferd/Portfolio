import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ProjectGrid from './ProjectGrid';
import ProjectModal from './ProjectModal';
import { getProjects } from './data/index';
import ErrorBoundary from '../common/ErrorBoundary';
import useDataLoader from '../../hooks/useDataLoader';
import { useProjectModal } from '../../hooks/useProjectModal';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';

/**
 * Improved Work Component with better separation of concerns
 * Uses custom hooks for modal and data management
 */
const Work = () => {
  const theme = useTheme();
  
  // Data loading with proper error handling
  const { 
    data: projects, 
    isLoading, 
    error,
    reload 
  } = useDataLoader(getProjects, {
    defaultData: [],
    validateData: (data) => Array.isArray(data) && data.length > 0,
  });

  // Modal state management
  const {
    isOpen: isModalOpen,
    selectedProject,
    openModal,
    closeModal,
    nextProject,
    prevProject
  } = useProjectModal(projects);

  // Memoized filtered projects (add filtering logic here if needed)
  const filteredProjects = useMemo(() => projects, [projects]);

  // Memoized section styles
  const sectionStyles = useMemo(() => {
    const vertical = getSpacingPreset('sectionVertical');
    const horizontal = getSpacingPreset('pageHorizontal');
    return {
      pt: vertical.pt,
      pb: vertical.pb,
      px: horizontal.px,
      backgroundColor: 'background.paper',
      position: 'relative',
      zIndex: theme.zIndex.section || 1,
      transition: theme.transitions.create(['background-color', 'color'], {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeInOut,
      }),
    };
  }, [theme]);

  const headerStyles = useMemo(() => ({
    maxWidth: theme.breakpoints.values.lg,
    mx: 'auto',
    textAlign: 'center',
    mb: theme.spacing(6),
  }), [theme]);

  const sectionTitlePreset = getTypographyPreset(theme, 'sectionTitle');
  const sectionSubtitlePreset = getTypographyPreset(theme, 'sectionSubtitle');

  return (
    <Box>
      <ErrorBoundary componentName="WorkSection">
        <Box
          id="work"
          component="section"
          sx={sectionStyles}
        >
          {/* Header Section */}
          <Box sx={headerStyles}>
            <Typography
              variant={sectionTitlePreset.variant}
              component={sectionTitlePreset.component}
              sx={{
                ...sectionTitlePreset.sx,
                background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                display: 'inline-block',
              }}
            >
              My Work
            </Typography>
            <Typography
              variant={sectionSubtitlePreset.variant}
              component={sectionSubtitlePreset.component}
              sx={{
                ...sectionSubtitlePreset.sx,
                mb: theme.spacing(4),
              }}
            >
              A selection of my recent projects and case studies. Click on a project to learn more.
            </Typography>
          </Box>

          {/* Content Area */}
          <Box sx={{ minHeight: theme.spacing(37.5) }}> {/* 300px equivalent */}
            {error ? (
              <ErrorState error={error} onRetry={reload} />
            ) : isLoading ? (
              <LoadingState />
            ) : (
              <ErrorBoundary componentName="ProjectGrid">
                <ProjectGrid 
                  projects={filteredProjects} 
                  onCardClick={openModal}
                />
              </ErrorBoundary>
            )}
          </Box>
        </Box>
      </ErrorBoundary>
      
      {/* Project Modal */}
      <ErrorBoundary componentName="ProjectModal">
        <ProjectModal
          open={isModalOpen}
          onClose={closeModal}
          project={selectedProject}
          onNextProject={nextProject}
          onPreviousProject={prevProject}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default Work;
