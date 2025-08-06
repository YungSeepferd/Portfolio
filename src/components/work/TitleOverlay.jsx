import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * TitleOverlay Component
 *
 * Displays a title, description, and categories overlay on top of hero images
 * with responsive design and animated entrance.
 *
 * @param {string} title - The title to display
 * @param {string} description - The description text
 * @param {Array} categories - Array of category strings
 * @param {boolean} isMobile - Whether the current view is mobile
 * @param {Object} sx - Additional styles to apply to the root component
 */
const TitleOverlay = ({ title, description, categories = [], isMobile = false, sx = {} }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
      },
    },
  };

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        background:
          'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.25) 75%, rgba(0,0,0,0) 100%)',
        color: 'white',
        p: { xs: 2, sm: 3, md: 4 },
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: { xs: '30%', sm: '40%' },
        ...sx,
      }}
    >
      {/* Categories */}
      {categories.length > 0 && (
        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mb: 1.5,
          }}
        >
          {categories.map((category, index) => (
            <Chip
              key={`category-${index}`}
              label={category}
              size={isMobile ? 'small' : 'medium'}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                backdropFilter: 'blur(4px)',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Title */}
      <Typography
        component={motion.h1}
        variants={itemVariants}
        variant={isMobile ? 'h4' : 'h3'}
        gutterBottom
        sx={{
          fontWeight: 700,
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      {/* Description - show less text on mobile */}
      {description && (
        <Typography
          component={motion.div}
          variants={itemVariants}
          variant="body1"
          sx={{
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: isMobile ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            fontWeight: 400,
            textShadow: '0 1px 2px rgba(0,0,0,0.7)',
            opacity: 0.9,
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default TitleOverlay;
