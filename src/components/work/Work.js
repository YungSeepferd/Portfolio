import React from 'react';
import { Box, Typography, Grid } from '@mui/material'; // Removed useTheme
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { allProjects } from './data'; // Using allProjects from data
import ErrorBoundary from '../common/ErrorBoundary';

const Work = () => {
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
              xs: '20px',
              sm: '30px',
              md: '40px',
              lg: '100px', // Increased to 100px padding as requested
            },
            mb: 6,
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Typography
              variant="h2"
              component="h2"
              align="center"
              gutterBottom
            >
              Selected Work
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ 
                maxWidth: '800px',
                mx: 'auto',
                mb: 4
              }}
            >
              Explore my projects focusing on user experience design, interaction design, and prototyping
            </Typography>
          </motion.div>
        </Box>

        {/* Projects grid with 2x3 layout (6 cards total) */}
        <Box
          sx={{
            width: '100%',
            px: { 
              xs: '20px',
              sm: '30px',
              md: '40px',
              lg: '100px', // Increased to 100px padding as requested
            },
            boxSizing: 'border-box',
          }}
        >
          <Grid 
            container 
            spacing={4}
            justifyContent="center"
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
                  height: { xs: 'auto', md: '400px' }, // Fixed height for cards on desktop
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