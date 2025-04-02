import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box, Typography, useTheme } from '@mui/material';

const ProjectFrame = ({ title, description, media, index }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box className="container" sx={{ width: '100%' }}>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
            alignItems: 'center',
            gap: 3
          }}
        >
          <Box sx={{ 
            width: { xs: '100%', md: '50%' },
            position: 'relative'
          }}>
            {media.type === 'image' ? (
              <motion.img
                src={media.src}
                alt={title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: theme.shape.borderRadius,
                  objectFit: 'cover',
                }}
              />
            ) : media.type === 'video' ? (
              <motion.video
                src={media.src}
                alt={title}
                controls
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: theme.shape.borderRadius,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: theme.palette.grey[300],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  color: theme.palette.text.secondary,
                }}
              >
                Loading...
              </Box>
            )}
          </Box>
          <Box sx={{ 
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography 
              variant="h3" 
              component="h3"
              sx={{ 
                color: theme.palette.primary.main,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' }
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: theme.palette.text.secondary
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

ProjectFrame.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  media: PropTypes.shape({
    type: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProjectFrame;