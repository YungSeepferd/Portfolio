import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectGrid from './ProjectGrid';
import ProjectModal from './ProjectModal';
import { projects as workData } from './data/projects/index'; // Import directly from projects index
import ErrorBoundary from '../common/ErrorBoundary';

/**
 * Work Component
 * 
 * Displays a grid of project cards and handles the project modal.
 */
const Work = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  // Load projects on component mount
  useEffect(() => {
    if (!workData || workData.length === 0) {
      console.error("Projects data not loaded or empty:", workData);
      setProjects([]);
    } else {
      console.log("Projects data loaded successfully:", workData.length, "projects");
      setProjects(workData);
    }
  }, []);

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

  // Animation variants
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
            viewport={{ once: true, margin: "-100px" }}
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
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  color: theme.palette.text.secondary
                }}
              >
                Explore a selection of my projects, showcasing skills in UX research, design, and implementation.
              </Typography>
            </Box>

            <ErrorBoundary componentName="ProjectGrid">
              <ProjectGrid 
                projects={filteredProjects} 
                onCardClick={handleCardClick} 
              />
            </ErrorBoundary>
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
        />
      </ErrorBoundary>
    </ErrorBoundary>
  );
};

export default Work;