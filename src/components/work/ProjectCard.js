import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * ProjectCard Component
 * Displays a summary card for a project. Simplified hover effects.
 */
const ProjectCard = ({ project, onClick }) => {
  const theme = useTheme();

  // Simplified card variants for hover effect
  const cardVariants = {
    rest: { scale: 1, boxShadow: theme.shadows[2] },
    hover: {
      scale: 1.03, // Slight scale on hover
      boxShadow: theme.shadows[6], // Increase shadow on hover
      transition: { duration: 0.2 }
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 } // Scale image slightly more on hover
  };

  return (
    // Use motion.div for hover state detection
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{ height: '100%', cursor: 'pointer' }}
      onClick={onClick} // Attach onClick handler to the motion div
    >
      <Card
        component={motion.div} // Apply variants to the Card itself
        variants={cardVariants}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          overflow: 'hidden', // Important for containing scaled image
          transition: 'box-shadow 0.3s ease-in-out', // Smooth shadow transition
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <CardMedia
            component={motion.img} // Use motion.img for image variants
            variants={imageVariants}
            image={project.thumbnail || 'https://via.placeholder.com/400x225?text=Project+Image'} // Fallback image
            alt={`${project.title} thumbnail`}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out', // Smooth transform transition
            }}
          />
          {/* Optional: Simple overlay on hover */}
          <Box
             component={motion.div}
             variants={{ rest: { opacity: 0 }, hover: { opacity: 0.3 } }} // Fade in overlay
             sx={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay
               transition: 'opacity 0.3s ease-in-out',
             }}
           />
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          {/* Categories */}
          {project.categories && project.categories.length > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              {project.categories.join(' • ')}
            </Typography>
          )}
          {/* Title */}
          <Typography variant="h6" component="h3" sx={{ mb: 1, flexGrow: 1, fontWeight: 600, lineHeight: 1.3 }}>
            {project.title}
          </Typography>
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto', pt: 1 }}>
              {project.tags.slice(0, 3).map((tag) => ( // Limit tags shown
                <Chip key={tag} label={tag} size="small" variant="outlined" />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;