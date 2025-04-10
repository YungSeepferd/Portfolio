import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Chip, useTheme, useMediaQuery } from '@mui/material';
import { skillsRow1, skillsRow2 } from './skillsData';

/**
 * HeroContent Component
 * 
 * Displays the main hero content including:
 * - Main title
 * - Subtitle
 * - Status text
 * - Skill tags
 */
const HeroContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 10, // Make sure it's higher than background but allows interaction
        pointerEvents: 'none',
        userSelect: 'none',
        pl: { xs: 2, sm: 4, md: 8, lg: 12 }, // Responsive padding
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          maxWidth: isMobile ? '100%' : isTablet ? '80%' : '650px',
          textAlign: isMobile ? 'center' : 'left',
          pointerEvents: 'none',
        }}
      >
        {/* Main Title */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: '2.5rem', // Mobile
                sm: '3.5rem', // Tablet
                md: '4.5rem', // Desktop
                lg: '5rem'    // Large desktop
              },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            Vincent Göke
          </Typography>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: {
                xs: '0.7rem',
                sm: '1rem',
                md: '1.35rem'
              },
              fontWeight: 500,
              mb: 4,
              color: theme.palette.accent?.main || theme.palette.primary.main,
            }}
          >
            Creative Technologist & Interaction Designer
          </Typography>
        </motion.div>
        
        {/* Status Text */}
        <motion.div variants={itemVariants}>
          <Typography 
            variant="body1"
            sx={{ 
              mb: 2,
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: theme.palette.text.secondary,
            }}
          >
            Fulltime | Available from June 2025 | On-Site, Hybrid, Remote
          </Typography>
        </motion.div>
        
        {/* Skill Tags */}
        <Box 
          component={motion.div} 
          variants={itemVariants} 
          sx={{ pointerEvents: 'none' }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 1,
              mb: 1.5,
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}
          >
            {skillsRow1.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                sx={{
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                  px: 1,
                  fontSize: theme.typography.chipText?.fontSize || '0.9rem',
                  pointerEvents: 'none',
                  '&:hover': {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.accent?.main || theme.palette.primary.main,
                    borderColor: theme.palette.accent?.main || theme.palette.primary.main,
                  }
                }}
              />
            ))}
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: isMobile ? 'center' : 'flex-start',
            }}
          >
            {skillsRow2.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                sx={{
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                  px: 1,
                  fontSize: theme.typography.chipText?.fontSize || '0.9rem',
                  pointerEvents: 'none',
                  '&:hover': {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.accent?.main || theme.palette.primary.main,
                    borderColor: theme.palette.accent?.main || theme.palette.primary.main,
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HeroContent;
