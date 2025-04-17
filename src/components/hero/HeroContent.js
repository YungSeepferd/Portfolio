import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, useTheme } from '@mui/material';
import { skillsRow1, skillsRow2 } from './skillsData';
import SkillTagList from '../common/SkillTagList';

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
        justifyContent: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start' },
        alignItems: { xs: 'flex-start', md: 'top' }, // Left-align on mobile, center on desktop
        zIndex: 10,
        pointerEvents: 'none', // All content is non-interactive by default
        userSelect: 'none',
        pl: { xs: 2, sm: 4, md: 8, lg: 12 }, // Responsive padding
        mt: { xs: '72px', sm: '72px', md: 0 }, // Aligns with tooltip on mobile
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          maxWidth: 'min(100%, 340px)', // Smaller on mobile
          textAlign: 'left',
        }}
      >
        {/* Main Title */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: '3rem', // Smaller for mobile
                sm: '2rem',
                md: '4.5rem',
                lg: '5rem'
              },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 1,
              color: theme.palette.text.primary,
              letterSpacing: '-0.5px',
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
                xs: '0.9rem',
                sm: '0.9rem',
                md: '1.35rem'
              },
              fontWeight: 500,
              mb: 2,
              color: theme.palette.secondary.main, // Changed to secondary (yellow) color
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
              fontSize: {
                xs: '0.65rem',
                sm: '0.9rem',
                md: '1.35rem'
              },
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
              <SkillTagList
                key={index}
                label={skill}
                size="responsive"
                variant="skill"
                sx={{ pointerEvents: 'none' }}
              />
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
              <SkillTagList
                key={index}
                label={skill}
                size="responsive"
                variant="skill"
                sx={{ pointerEvents: 'none' }}
              />
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HeroContent;
