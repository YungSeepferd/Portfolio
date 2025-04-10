import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * ProjectFullContent Component
 * 
 * Displays the full content of a project when it doesn't need to be 
 * divided into sections with specific layouts.
 */
const ProjectFullContent = ({ project, content, description }) => {
  // Removed unused theme variable
  
  if (!project) return null;
  
  return (
    <Box 
      component={motion.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      sx={{ py: 4 }}
    >
      <Typography variant="h3" component="h3" sx={{ mb: 4 }}>
        Project Details
      </Typography>
      
      {content ? (
        <Box>{content}</Box>
      ) : description ? (
        <Box>
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
          <Typography variant="body1" paragraph>
            Additional project details are being prepared. Please check back soon for more information about this project.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" paragraph>
            This project is still being documented. More detailed information will be available soon.
          </Typography>
          <Typography variant="body1">
            In the meantime, please feel free to explore other projects or contact me for more information about {project.title}.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProjectFullContent;
