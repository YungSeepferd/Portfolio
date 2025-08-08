import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, CircularProgress, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectGrid from './ProjectGrid';
import ProjectModal from './ProjectModal';
import { getProjects } from './data/index'; // UPDATED: Import from the correct location
import ErrorBoundary from '../common/ErrorBoundary';
import useDataLoader from '../../hooks/useDataLoader';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Work Component
 *
 * Displays a grid of project cards and handles the project modal.
 * Uses useDataLoader hook for consistent data loading.
 */
const Work = () => {
  const theme = useTheme();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  // Use the data loader with the proper function, not direct data
  const {
    data: projects,
    isLoading,
    error,
    reload,
  } = useDataLoader(
    getProjects, // This will now return standardized project data
    {
      defaultData: [],
      validateData: (data) => {
        const isValid = Array.isArray(data) && data.length > 0;
        console.log('Work data validation:', isValid ? 'passed' : 'failed');
        return isValid;
      },
      onSuccess: (data) => console.log('Projects loaded successfully:', data.length, 'projects'),
      onError: (err) => console.error('Error loading projects:', err),
    }
  );

  // Update filtered projects when projects change
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  // Handle project card click
  const handleCardClick = (project) => {
    const index = projects.findIndex((p) => p.id === project.id);
    if (index !== -1) {
      setSelectedProjectIndex(index);
      setIsModalOpen(true);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle navigation to next project
  const handleNextProject = () => {
    if (selectedProjectIndex < projects.length - 1) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    } else {
      setSelectedProjectIndex(0); // Loop back to first project
    }
  };

  // Handle navigation to previous project
  const handlePrevProject = () => {
    if (selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    } else {
      setSelectedProjectIndex(projects.length - 1); // Loop to last project
    }
  };

  // Animation variants
  const sectionAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <ErrorBoundary componentName="WorkSection">
      <Box
        id="work"
        component="section"
        sx={{
          width: '100%',
          py: { xs: 8, md: 12 },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            width: '100%',
            px: {
              xs: '20px',
              sm: '30px',
              md: '40px',
              lg: '50px',
            },
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                Work
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  color: theme.palette.text.secondary,
                }}
              >
                Explore a selection of my projects, showcasing skills in UX research, design, and
                implementation.
              </Typography>
            </Box>

            {/* Render different content based on loading/error state */}
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '300px',
                }}
              >
                <CircularProgress color="primary" aria-label="Loading projects" />
              </Box>
            ) : error ? (
              <Box
                sx={{
                  textAlign: 'center',
                  p: 4,
                  color: 'error.main',
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h5" color="error" gutterBottom>
                  Error Loading Projects
                </Typography>
                <Typography variant="body1">
                  There was a problem loading the projects. Please try refreshing.
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', mb: 3 }}>
                  Error details: {error.message || 'Unknown error'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={reload}
                >
                  Try Again
                </Button>
              </Box>
            ) : (
              <ErrorBoundary componentName="ProjectGrid">
                <ProjectGrid projects={filteredProjects} onCardClick={handleCardClick} />
              </ErrorBoundary>
            )}
          </motion.div>
        </Box>
      </Box>

      <ErrorBoundary componentName="ProjectModal">
        <ProjectModal
          open={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProjectIndex !== null ? projects[selectedProjectIndex] : null}
          onNextProject={handleNextProject}
          onPreviousProject={handlePrevProject}
          projectIndex={selectedProjectIndex ?? undefined}
          projectTotal={projects?.length ?? undefined}
        />
      </ErrorBoundary>
    </ErrorBoundary>
  );
};

export default Work;
