import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { skillTags } from './data/skillTags';
import ErrorBoundary from '../common/ErrorBoundary';

// Import projects from the folder structure properly
import { workData as projects } from './data/index';

/**
 * Work Component
 * 
 * Displays the portfolio projects section with filtering capabilities,
 * project cards, and modal project details.
 */
const Work = () => {
  const theme = useTheme();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTag] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // Check for proper projects data loading
  useEffect(() => {
    if (!projects || projects.length === 0) {
      console.error("Projects data not loaded or empty:", projects);
    } else {
      console.log("Projects data loaded successfully:", projects.length, "projects");
    }
  }, []);
  
  // Update filtered projects when activeTag changes
  useEffect(() => {
    if (activeTag === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.categories && project.categories.includes(activeTag)
      );
      setFilteredProjects(filtered);
    }
  }, [activeTag]);
  
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
  
  // Animation variants for section
  const sectionAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };
  
  // Animation variants for items
  const itemAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // Render nothing if projects data is missing
  if (!projects || projects.length === 0) {
    console.error("Projects data missing or empty");
    return (
      <Box id="work" sx={{ py: 8, bgcolor: theme.palette.background.default }}>
        <Typography variant="h4" color="error" sx={{ textAlign: 'center' }}>
          Projects data could not be loaded
        </Typography>
      </Box>
    );
  }

  return (
    <ErrorBoundary componentName="Work">
      <Box
        id="work"
        component="section"
        sx={{
          py: 8,
          bgcolor: theme.palette.background.default,
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
            viewport={{ once: true, margin: "-100px" }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
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
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  color: theme.palette.text.secondary
                }}
              >
                Explore my projects in UX Research, Interaction Design, and Sound Design
              </Typography>
            </Box>
            
            {/* Projects Grid */}
            <Grid container spacing={4}>
              {filteredProjects.map((project, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={project.id || index}
                  component={motion.div}
                  variants={itemAnimation}
                >
                  <ProjectCard
                    project={project}
                    skillTags={skillTags}
                    onClick={handleCardClick}
                    showAllTags={true}
                    gridPosition={index}
                  />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
        
        {/* Project Modal */}
        {isModalOpen && selectedProjectIndex !== null && (
          <ProjectModal
            project={projects[selectedProjectIndex]}
            projects={projects}
            currentIndex={selectedProjectIndex}
            setCurrentIndex={setSelectedProjectIndex}
            onClose={handleCloseModal}
          />
        )}
      </Box>
    </ErrorBoundary>
  );
};

export default Work;