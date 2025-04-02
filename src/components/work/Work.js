import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import { workData } from '../data/WorkData'; // Remove skillTags import
import ErrorBoundary from '../common/ErrorBoundary';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

// Define skillTags array locally since it's not exported from WorkData
const skillTags = [
  'UX Research', 'Interaction Design', 'Prototyping', 'UI Design',
  'Haptic Design', 'Sound Design', 'AI Integration', 'Frontend Development',
  'UX Gamification', 'HCI Methodologies', 'Mental Health UX', 'Automotive UX', 
  'Graphic Design'
];

// Main Work Component
function Work() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentProject = currentProjectIndex !== null ? workData[currentProjectIndex] : null;

  const handleProjectClick = (project) => {
    setIsLoading(true);
    const idx = workData.findIndex((p) => p.id === project.id);
    setCurrentProjectIndex(idx);

    // Reset loading after modal appears
    const loadingTimeout = 300; // Magic number replaced with descriptive variable
    setTimeout(() => setIsLoading(false), loadingTimeout);
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
          px: { xs: 2, md: 6 },
          boxSizing: 'border-box',
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 2,
            textAlign: 'center',
            mt: { xs: 6, md: 8 },
          }}
        >
          Work
        </Typography>
        
        <Box sx={{ width: '100%', mt: 4, mb: 8 }}>
          <motion.section
            className="work-container"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Grid 
              container 
              spacing={4} // Reduced spacing between cards for a more grid-like layout
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              {workData.map((project) => (
                <Grid 
                  item 
                  key={project.id} 
                  xs={12} 
                  sm={6}
                  md={4} // Changed to 4 columns on medium screens
                  lg={3} // Added 3 columns on large screens
                  sx={{ 
                    aspectRatio: '1/1', // Make grid items square
                    height: { xs: 'auto', sm: 450, md: 400 }, // Adjusted heights with breakpoints
                    display: 'flex' 
                  }} 
                >
                  <ProjectCard
                    project={project}
                    skillTags={skillTags}
                    onClick={handleProjectClick}
                    showAllTags={true}
                  />
                </Grid>
              ))}
            </Grid>
            
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
          </motion.section>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}

export default Work;