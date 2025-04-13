import React, { useCallback } from 'react';
import { Box, Typography, Grid, Chip, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { processedProjects, workCategories } from './data';
import { useModalContext } from '../../context/ModalContext';
import { useProjectFilter } from '../../hooks/useProjectFilter';
import ErrorBoundary from '../common/ErrorBoundary';
import ContentContainer from '../common/ContentContainer';

const Work = () => {
  const theme = useTheme();
  const { openProjectModal } = useModalContext();
  const { filteredProjects, currentCategory, handleCategoryChange } = useProjectFilter(processedProjects, 'all');

  const handleProjectClick = useCallback((project) => {
    // Pass only the specific project object
    openProjectModal(project);
  }, [openProjectModal]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <ErrorBoundary componentName="WorkSection">
      <Box
        id="work"
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <ContentContainer>
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              component="h2"
              align="center"
              sx={{
                mb: 2,
                color: theme.palette.text.primary,
              }}
            >
              My Work
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                mb: { xs: 4, md: 6 },
                maxWidth: '700px',
                mx: 'auto',
                color: theme.palette.text.secondary,
              }}
            >
              A selection of projects showcasing my skills in UX design, research, and interaction development.
            </Typography>
          </motion.div>

          {/* Category Filters */}
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            sx={{ mb: { xs: 4, md: 6 } }}
          >
            {workCategories.map((category) => (
              <Chip
                key={category.value}
                label={category.label}
                clickable
                onClick={() => handleCategoryChange(category.value)}
                color={currentCategory === category.value ? 'primary' : 'default'}
                variant={currentCategory === category.value ? 'filled' : 'outlined'}
                sx={{ m: 0.5, transition: 'all 0.2s ease' }}
              />
            ))}
          </Stack>

          {/* Project Grid (2x2x2 for 6 projects) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} md={6} key={project.id}>
                  <motion.div variants={itemVariants} style={{ height: '100%' }}>
                    <ProjectCard
                      project={project}
                      onClick={() => handleProjectClick(project)}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </ContentContainer>
      </Box>
    </ErrorBoundary>
  );
};

export default Work;