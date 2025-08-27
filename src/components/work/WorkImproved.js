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

/**
 * Improved Work Component with better separation of concerns
 * Uses custom hooks for modal and data management
 */
const WorkImproved = () => {
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
  const sectionStyles = useMemo(() => ({
    py: theme.spacing(8, 12), // Use theme spacing scale
    px: theme.spacing(2, 4, 6, 8),
    backgroundColor: 'background.paper',
    position: 'relative',
    zIndex: theme.zIndex.section || 1,
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  }), [theme]);

  const headerStyles = useMemo(() => ({
    maxWidth: theme.breakpoints.values.lg,
    mx: 'auto',
    textAlign: 'center',
    mb: theme.spacing(6),
  }), [theme]);

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
              variant="h2"
              component="h2"
              sx={{
                mb: theme.spacing(2),
                fontWeight: theme.typography.fontWeightBold,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              My Work
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                maxWidth: theme.spacing(87.5), // 700px equivalent
                mx: 'auto',
                mb: theme.spacing(4),
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
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

export default WorkImproved;
