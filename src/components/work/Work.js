import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';
import ProjectGrid from './ProjectGrid';
import ProjectModal from './ProjectModal';
import { getProjects } from './data/index';
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
    reload 
  } = useDataLoader(
    getProjects, // This will now return standardized project data
    {
      defaultData: [],
      validateData: (data) => {
        const isValid = Array.isArray(data) && data.length > 0;
        console.log('Work data validation:', isValid ? 'passed' : 'failed');
        return isValid;
      },
      onSuccess: (data) => console.log("Projects loaded successfully:", data.length, "projects"),
      onError: (err) => console.error("Error loading projects:", err)
    }
  );

  // Update filtered projects when projects change
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  // Handle project card click
  const handleCardClick = (project) => {
    const index = projects.findIndex(p => p.id === project.id);
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

  return (
    <Box>
      <ErrorBoundary componentName="WorkSection">
        <Box
          id="work"
          component="section"
          sx={{
            py: { xs: 6, md: 10 },
            px: { xs: 2, sm: 4, md: 6, lg: 8 },
            backgroundColor: 'background.paper',
            position: 'relative',
            zIndex: 'section',
            transition: theme.transitions.create(['background-color', 'color'], {
              duration: theme.transitions.duration.standard,
              easing: theme.transitions.easing.easeInOut,
            }),
          }}
        >
          <Box
            sx={{
              maxWidth: '1200px',
              mx: 'auto',
              textAlign: 'center',
              mb: 6,
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                ...theme.typography.h2,
              }}
            >
              My Work
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '700px',
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
              }}
            >
              A selection of my recent projects and case studies. Click on a project to learn more.
            </Typography>
          </Box>
          <Box sx={{ minHeight: '300px' }}>
            {error ? (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: 6,
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[1],
                  p: 4,
                }}
              >
                <Typography 
                  variant="h6" 
                  color="error" 
                  gutterBottom
                  sx={{ mb: 2 }}
                >
                  Failed to load projects
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  We couldn't load the projects. Please check your connection and try again.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={reload}
                  startIcon={<RefreshIcon />}
                  sx={{ 
                    mt: 1,
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontWeight: theme.typography.fontWeightMedium,
                    borderRadius: theme.shape.borderRadius,
                    transition: theme.transitions.create(['background-color', 'box-shadow'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                    '&:hover': {
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  Try Again
                </Button>
              </Box>
            ) : isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minHeight: '300px',
                  justifyContent: 'center',
                  p: 4,
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: 'background.subtle',
                  boxShadow: theme.shadows[1],
                  transition: theme.transitions.create(['background-color', 'box-shadow'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                }}
              >
                <Typography color="text.secondary" variant="body1" sx={{ mb: 3 }}>
                  No projects found matching your criteria.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={reload}
                  startIcon={<RefreshIcon />}
                  sx={{
                    borderRadius: theme.shape.buttonRadius,
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    mt: 2
                  }}
                >
                  Loading projects...
                </Button>
              </Box>
            ) : (
              <ErrorBoundary componentName="ProjectGrid">
                <ProjectGrid 
                  projects={filteredProjects} 
                  onCardClick={handleCardClick}
                />
              </ErrorBoundary>
            )}
          </Box>
        </Box>
      </ErrorBoundary>
      
      {/* Project Modal - Rendered in a portal */}
      <ErrorBoundary componentName="ProjectModal">
        <ProjectModal
          open={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProjectIndex !== null ? projects[selectedProjectIndex] : null}
          onNextProject={handleNextProject}
          onPreviousProject={handlePrevProject}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default Work;