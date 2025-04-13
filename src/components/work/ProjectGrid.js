import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

/**
 * ProjectGrid Component
 * 
 * Displays a grid of project cards with animation
 */
const ProjectGrid = ({ projects = [], onCardClick }) => {
  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  if (!projects || projects.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          No projects found
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ width: '100%', mt: 4 }}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 3, md: 4 }} // Adjust spacing if needed
      >
        {projects.map((project, index) => (
          <Grid
            item
            xs={12} // Full width on extra-small screens
            sm={6}  // Half width on small screens
            md={6}  // Half width on medium screens (Increased from 4)
            lg={6}  // Half width on large screens (Adjust as needed, e.g., lg={4} for 3 cards)
            key={project.id || index}
            component={motion.div}
            variants={itemVariants}
            sx={{ display: 'flex' }} // Ensure cards stretch vertically if needed
          >
            <ProjectCard
              project={project}
              onClick={() => onCardClick(project)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectGrid;
