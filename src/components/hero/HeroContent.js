import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';
import { skillsRow1, skillsRow2 } from './skillsData';

/**
 * HeroContent Component
 * 
 * Displays the main hero content including:
 * - Main title
 * - Subtitle
 * - Status text
 * - Skill tags
 * 
 * This component is set with pointerEvents: 'none' to allow
 * clicks to pass through to the 3D background
 */
const HeroContent = () => {
  const theme = useTheme();
  
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
  
  // Determine if mobile for responsive layout
  const isMobileBreakpoint = theme.breakpoints.values.sm;
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none', // All content is non-interactive by default
        userSelect: 'none',
        pl: { xs: 2, sm: 4, md: 8, lg: 12 }, // Responsive padding
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          maxWidth: `min(100%, 650px)`,
          textAlign: window.innerWidth < isMobileBreakpoint ? 'center' : 'left',
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
                xs: '0.8rem',
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
              justifyContent: window.innerWidth < isMobileBreakpoint ? 'center' : 'flex-start',
            }}
          >
            {skillsRow1.map((skill, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '16px',
                  px: 1.5,
                  py: 0.5,
                  fontSize: theme.typography.chipText?.fontSize || '0.9rem',
                  display: 'inline-block',
                  pointerEvents: 'none',
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: window.innerWidth < isMobileBreakpoint ? 'center' : 'flex-start',
            }}
          >
            {skillsRow2.map((skill, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '16px',
                  px: 1.5,
                  py: 0.5,
                  fontSize: theme.typography.chipText?.fontSize || '0.9rem',
                  display: 'inline-block',
                  pointerEvents: 'none',
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HeroContent;
