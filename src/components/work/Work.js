import React, { useState, useCallback } from 'react';
import { Box, Typography, Grid } from '@mui/material'; // Removed useTheme
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { allProjects } from './data'; // Using allProjects from data
import ErrorBoundary from '../common/ErrorBoundary';

/**
 * Work Section Component
 * 
 * Displays a collection of project cards in a responsive grid layout
 * with filtering capabilities and interactive modal previews.
 */
const Work = () => {
  // Add missing state variables
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Ensure handleProjectClick is properly defined
  const handleProjectClick = useCallback((project) => {
    if (!project) {
      console.warn('No project data provided to click handler');
      return;
    }
    
    console.log('Project clicked:', project.title);
    
    // Set the selected project and open the modal
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);
  
  // Add handler to close the modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ErrorBoundary componentName="Work">
      <Box
        component="section"
        id="work"
        sx={{
          width: '100%',
          py: 8,
          backgroundColor: 'background.paper',
        }}
      >
        {/* Section header */}
        <Box
          sx={{
            width: '100%',
            px: { 
              xs: '10px', // REDUCED from typical 20px
              sm: '20px', // REDUCED from typical 30px
              md: '30px', // REDUCED from typical 40px
              lg: '40px', // REDUCED from typical 50px
            },
            mb: 6,
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Box 
              sx={{ 
                width: '100%', 
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
              }}
            >
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                Work
              </Typography>
              
              <Typography 
                variant="subtitle1"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  color: 'text.secondary'
                }}
              >
                Selected projects showcasing my design approach and problem-solving skills
              </Typography>
            </Box>
          </motion.div>
        </Box>

        {/* Projects grid with 2x3 layout (6 cards total) */}
        <Box sx={{ pt: 2, pb: 4 }}>
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }} // REDUCED spacing between items
            sx={{ width: '100%' }}
          >
            {/* Limit to 6 projects in a 2x3 grid */}
            {allProjects.slice(0, 6).map((project, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={project.id}
                sx={{
                  height: { 
                    xs: 550, // Taller cards on mobile
                    sm: 580, // Medium height on tablet
                    md: 600  // Full height on desktop
                  }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  style={{ height: '100%' }}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={handleProjectClick} // Ensure this is correctly passed
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }} 
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default Work;