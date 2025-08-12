import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { fadeInUp, staggerChildren } from '../../theme/animations';

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
      sx={{ width: '100%', mt: 4 }}
    >
      <Grid id="project-grid-root" container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {projects.map((project, index) => (
          <Grid
            item
            xs={12} // 1 per row on mobile
            sm={6} // 2 per row on small screens
            md={6} // 2 per row on medium screens
            lg={6} // 2 per row on large screens
            xl={6} // 2 per row on extra large screens
            key={project.id || index}
            component={motion.div}
            variants={itemVariants}
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <ProjectCard project={project} onClick={() => onCardClick(project)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectGrid;
