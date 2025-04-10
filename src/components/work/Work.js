import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Grid, CircularProgress, Container } from '@mui/material';
import { workData, skillTags } from './data';
import ErrorBoundary from '../common/ErrorBoundary';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useTheme } from '@mui/material/styles';

function Work() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  
  const currentProject = currentProjectIndex !== null ? workData[currentProjectIndex] : null;
  
  // Organize projects into the 2x2x2 matrix structure
  // First 4 in primary layer, last 2 in secondary layer
  const matrixProjects = useMemo(() => {
    return {
      // Layer 1: First 4 projects (2x2)
      layer1: [
        // Row 1
        [workData[0], workData[1]], 
        // Row 2
        [workData[2], workData[3]]
      ],
      // Layer 2: Last 2 projects (1x2)
      layer2: [
        // Row 1
        [workData[4], workData[5]]
      ]
    };
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
  
  // Animation variants for the grid items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <ErrorBoundary>
      <Box
        id="work"
        component="section"
        className="work-section"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          // Use theme spacing values and remove custom spacing
        }}
      >
        {/* Section title */}
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            mb: { xs: theme.spacing(4), md: theme.spacing(6) },
            textAlign: 'center',
          }}
        >
          Work
        </Typography>
        
        {/* Project matrices container */}
        <Container maxWidth="xl">
          <Box sx={{ width: '100%', mb: 6 }}>
            {/* Layer 1 - First 4 projects in 2x2 grid */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              {matrixProjects.layer1.flatMap((row, rowIndex) => 
                row.map((project, colIndex) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6}
                    key={project.id}
                    component={motion.div}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: rowIndex * 0.2 + colIndex * 0.1 }}
                  >
                    <Box 
                      sx={{ 
                        height: { xs: '500px', md: '550px' },
                        width: '100%',
                      }}
                    >
                      <ProjectCard
                        project={project}
                        skillTags={skillTags}
                        onClick={handleProjectClick}
                        showAllTags={true}
                      />
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>
            
            {/* Layer 2 - Last 2 projects in 1x2 grid */}
            <Grid container spacing={4}>
              {matrixProjects.layer2.flatMap((row, rowIndex) => 
                row.map((project, colIndex) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6}
                    key={project.id}
                    component={motion.div}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + colIndex * 0.1 }}
                  >
                    <Box 
                      sx={{ 
                        height: { xs: '500px', md: '550px' },
                        width: '100%',
                      }}
                    >
                      <ProjectCard
                        project={project}
                        skillTags={skillTags}
                        onClick={handleProjectClick}
                        showAllTags={true}
                      />
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>
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