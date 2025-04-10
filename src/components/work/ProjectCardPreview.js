import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * ProjectCardPreview
 * 
 * Shows a preview of project details on card hover, including key takeaways
 * and tools used. Animates in from the bottom of the card.
 */
const ProjectCardPreview = ({ project, isVisible = false }) => {
  if (!project || !isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.9) 70%, rgba(15, 23, 42, 0) 100%)',
        padding: '20px 16px',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        zIndex: 10,
        backdropFilter: 'blur(5px)',
      }}
    >
      <Typography 
        variant="subtitle2" 
        sx={{ 
          color: 'primary.main',
          fontWeight: 'bold',
          mb: 1.5
        }}
      >
        Project highlights:
      </Typography>
      
      {project.keyTakeaways?.length > 0 ? (
        <Box sx={{ mb: 2 }}>
          <Box component="ul" sx={{ pl: 2, mb: 0 }}>
            {project.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
              <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'common.white',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    lineHeight: 1.4
                  }}
                >
                  {takeaway}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
      
      {project.tools?.length > 0 ? (
        <Box>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 1,
              fontSize: '0.75rem'
            }}
          >
            Tools used:
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 0.75
          }}>
            {project.tools.map((tool, idx) => (
              <Chip 
                key={idx} 
                label={tool} 
                size="small"
                sx={{
                  fontSize: '0.65rem',
                  height: '20px',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'common.white',
                }}
              />
            ))}
          </Box>
        </Box>
      ) : null}
    </motion.div>
  );
};

export default ProjectCardPreview;
