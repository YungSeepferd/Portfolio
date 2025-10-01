import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectCardImproved from './ProjectCardImproved';
import { fadeInUp, staggerChildren } from '../../theme/animations';
import themeSpacing from '../../theme/spacing';

/**
 * ProjectGrid Component
 * 
 * Displays a grid of project cards with animation
 */
const ProjectGrid = ({ projects = [], onCardClick }) => {
  // Animation variants for staggered appearance
  const containerVariants = staggerChildren;
  const itemVariants = fadeInUp;
  
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
      sx={{ width: '100%', mt: themeSpacing.projectGrid.containerMarginTop }}
    >
      <Grid
        id="project-grid-root"
        container
        rowSpacing={themeSpacing.projectGrid.rowSpacing}
        columnSpacing={themeSpacing.projectGrid.columnSpacing}
      >
        {projects.map((project, index) => (
          <Grid
            size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}
            key={project.id || index}
            component={motion.div}
            variants={itemVariants}
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <ProjectCardImproved
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
