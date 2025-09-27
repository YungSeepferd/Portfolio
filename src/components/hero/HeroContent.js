import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { skillsRow1, skillsRow2 } from './skillsData';
import SkillTagList from '../common/SkillTagList';
import { getSpacingPreset, getTypographyPreset } from '../../theme/presets';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const heroPadding = getSpacingPreset('pageHorizontal');
  const heroTitlePreset = getTypographyPreset(theme, 'heroTitle');
  const heroSubtitlePreset = getTypographyPreset(theme, 'heroSubtitle');
  const heroBodyPreset = getTypographyPreset(theme, 'bodyLong');

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
        px: heroPadding.px,
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          maxWidth: 'min(100%, 650px)',
          textAlign: isMobile ? 'center' : 'left',
          pointerEvents: 'none',
        }}
      >
        {/* Main Title */}
        <motion.div variants={itemVariants}>
          <Typography
            variant={heroTitlePreset.variant}
            component={heroTitlePreset.component}
            sx={{
              ...heroTitlePreset.sx,
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
            variant={heroSubtitlePreset.variant}
            component={heroSubtitlePreset.component}
            sx={{
              ...heroSubtitlePreset.sx,
              mb: 4,
            }}
          >
            Creative Technologist & Interaction Designer
          </Typography>
        </motion.div>
        
        {/* Status Text */}
        <motion.div variants={itemVariants}>
          <Typography 
            variant={heroBodyPreset.variant}
            component={heroBodyPreset.component}
            sx={{ 
              ...heroBodyPreset.sx,
              mb: 2,
              color: theme.palette.text.secondary,
            }}
          >
            Fulltime/ Internship | Junior/ Midlevel | On-Site/ Hybrid/ Remote
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
              <SkillTagList
                key={index}
                label={skill}
                size="medium"
                variant="filled"
                sx={{ pointerEvents: 'none' }}
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
              <SkillTagList
                key={index}
                label={skill}
                size="medium"
                variant="filled"
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
