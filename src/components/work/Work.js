import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Grid, CircularProgress, Container } from '@mui/material';
import { workData } from '../data/WorkData';
import ErrorBoundary from '../common/ErrorBoundary';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Work Component
 * 
 * Displays projects in a 2x2x2 matrix layout (2 rows, 2 columns, 2 layers deep).
 * Projects are loaded into the matrix by category and importance.
 * 
 * The component handles:
 * - Responsive layout adjustments
 * - Project card rendering
 * - Modal display when a project is selected
 * - Loading state management
 */
function Work() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Define skillTags array locally since it's not exported from WorkData
  const skillTags = [
    'UX Research', 'Interaction Design', 'Prototyping', 'UI Design',
    'Haptic Design', 'Sound Design', 'AI Integration', 'Frontend Development',
    'UX Gamification', 'HCI Methodologies', 'Mental Health UX', 'Automotive UX', 
    'Graphic Design'
  ];
  
  const currentProject = currentProjectIndex !== null ? workData[currentProjectIndex] : null;
  
  // Organize projects into the 2x2x2 matrix structure
  // This divides projects into primary (first 4) and secondary (next 4) layers
  const matrixProjects = useMemo(() => {
    // Sort projects by importance or category if needed
    const sortedProjects = [...workData].sort((a, b) => {
      // Sort logic can be customized based on project properties
      return a.id < b.id ? -1 : 1;
    });
    
    // Create two layers (primary and secondary)
    return {
      primary: sortedProjects.slice(0, 4), // First 4 projects for main matrix
      secondary: sortedProjects.slice(4, 8), // Next 4 projects for secondary matrix
      additional: sortedProjects.slice(8)    // Any remaining projects
    };
    // Removed workData from the dependency array since it won't change
  }, []);
  
  const handleProjectClick = (project) => {
    try {
      setIsLoading(true);
      const idx = workData.findIndex((p) => p.id === project.id);
      if (idx === -1) {
        console.error("Project not found in workData", project.id);
      }
      setCurrentProjectIndex(idx);
      
      // Reset loading after modal appears
      const loadingTimeout = 300;
      setTimeout(() => setIsLoading(false), loadingTimeout);
    } catch (error) {
      console.error("Error opening project:", error);
      setIsLoading(false);
    }
  };
  
  // Animation variants for the matrix layers
  const matrixAnimations = {
    container: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          staggerChildren: 0.1,
          delayChildren: 0.3
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }
    }
  };
  
  /**
   * Renders a 2x2 grid of projects
   * @param {Array} projects - Projects to display in the grid
   * @param {Boolean} isSecondary - Whether this is the secondary layer
   * @returns {JSX.Element} A 2x2 grid of project cards
   */
  const renderProjectMatrix = (projects, isSecondary = false) => {
    if (!projects || projects.length === 0) {
      return null;
    }

    // For mobile, render as a single column
    if (isMobile) {
      return (
        <Grid container spacing={5}>
          {projects.map((project) => (
            <Grid item xs={12} key={project.id} sx={{ minHeight: '550px' }}>
              <ProjectCard
                project={project}
                skillTags={skillTags}
                onClick={handleProjectClick}
                showAllTags={false}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    // Render based on layoutType
    return (
      <Box
        component={motion.div}
        variants={isSecondary ? {} : matrixAnimations.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        sx={{
          width: '100%',
          mb: isSecondary ? 0 : theme.spacing(10),
          mt: isSecondary ? theme.spacing(10) : 0,
          opacity: isSecondary ? 0.9 : 1,
          transform: isSecondary ? 'scale(0.95)' : 'scale(1)',
          zIndex: isSecondary ? 1 : 2,
        }}
      >
        <Grid 
          container 
          spacing={5}
          sx={{ 
            height: '100%',
          }}
        >
          {projects.map((project, index) => {
            const layoutType = project.layoutType || 'default';

            if (layoutType === 'highlighted') {
              return (
                <Grid 
                  item 
                  key={project.id} 
                  xs={12} 
                  sm={12}
                  component={motion.div}
                  variants={matrixAnimations.item}
                  sx={{ 
                    height: '600px',
                    display: 'flex',
                    '&:hover': {
                      zIndex: 10,
                    },
                  }} 
                >
                  <ProjectCard
                    project={project}
                    skillTags={skillTags}
                    onClick={handleProjectClick}
                    showAllTags={!isSecondary}
                    isHighlighted={true}
                  />
                </Grid>
              );
            }

            // Default layout
            const row = Math.floor(index / 2);
            const col = index % 2;

            return (
              <Grid 
                item 
                key={project.id} 
                xs={12} 
                sm={6}
                component={motion.div}
                variants={matrixAnimations.item}
                sx={{ 
                  height: isTablet ? '520px' : '580px',
                  display: 'flex',
                  '&:hover': {
                    zIndex: 10,
                  },
                }} 
              >
                <ProjectCard
                  project={project}
                  skillTags={skillTags}
                  onClick={handleProjectClick}
                  showAllTags={!isSecondary}
                  gridPosition={{ row, col }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };
  
  // Render any additional projects in a more traditional grid layout
  const renderAdditionalProjects = (projects) => {
    if (!projects || projects.length === 0) return null;
    
    return (
      <Box sx={{ mt: theme.spacing(12), width: '100%' }}>
        <Typography 
          variant="h3" 
          component="h3" 
          sx={{ mb: theme.spacing(5), textAlign: 'center' }}
        >
          More Projects
        </Typography>
        
        <Grid 
          container 
          spacing={5}
          justifyContent="center"
        >
          {projects.map((project) => (
            <Grid 
              item 
              key={project.id} 
              xs={12} 
              sm={6}
              md={4}
              lg={4}
              sx={{ 
                height: { xs: '450px', sm: '500px', md: '550px' },
                display: 'flex',
              }} 
            >
              <ProjectCard
                project={project}
                skillTags={skillTags}
                onClick={handleProjectClick}
                showAllTags={false}
                isCompact={true}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <ErrorBoundary>
      <Box
        id="work"
        className="work-section"
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: theme.spacing(2), md: theme.spacing(6) },
          py: { xs: theme.spacing(10), md: theme.spacing(12) },
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Section title */}
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            mb: theme.spacing(8),
            textAlign: 'center',
          }}
        >
          Work
        </Typography>
        
        {/* Project matrices container */}
        <Container maxWidth="xl" sx={{ position: 'relative' }}>
          <Box 
            sx={{ 
              width: '100%', 
              position: 'relative',
              perspective: '1000px'
            }}
          >
            {/* Primary matrix (front layer) */}
            {renderProjectMatrix(matrixProjects.primary, false)}
            
            {/* Secondary matrix (back layer) */}
            {renderProjectMatrix(matrixProjects.secondary, true)}
            
            {/* Additional projects */}
            {renderAdditionalProjects(matrixProjects.additional)}
          </Box>
        </Container>
        
        {/* Loading overlay */}
        {isLoading && (
          <Box 
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1500,
            }}
          >
            <CircularProgress color="secondary" size={60} />
          </Box>
        )}
        
        {/* Project modal */}
        <AnimatePresence>
          {currentProject !== null && (
            <ProjectModal 
              project={currentProject} 
              projects={workData} 
              currentIndex={currentProjectIndex} 
              setCurrentIndex={setCurrentProjectIndex} 
              onClose={() => setCurrentProjectIndex(null)} 
            />
          )}
        </AnimatePresence>
      </Box>
    </ErrorBoundary>
  );
}

export default Work;