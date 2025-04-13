import React from 'react';
import { Box, Typography, Button, useTheme, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Background3D from './background3d/Background3D';
import ContentContainer from '../common/ContentContainer';
// Updated import for skillsData (use named import)
import { allSkills } from './skillsData';
import { SkillTag } from '../common/Tags';

// --- Integrated ScrollIndicator ---
const IntegratedScrollIndicator = () => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      style={{
        position: 'absolute',
        bottom: theme.spacing(4),
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}
    >
      <ScrollLink
        to="about" // Scroll target ID
        spy={true}
        smooth={true}
        offset={-70} // Adjust offset based on header height
        duration={800}
      >
        <IconButton
          aria-label="Scroll down"
          sx={{
            color: theme.palette.primary.main, // Use primary color for visibility
            border: `2px solid ${theme.palette.primary.main}`, // Thicker border
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight background
            backdropFilter: 'blur(5px)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.1)',
            },
            transition: theme.transitions.create(['background-color', 'transform']),
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }} // Slightly larger bounce
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDownwardIcon fontSize="medium" />
          </motion.div>
        </IconButton>
      </ScrollLink>
    </motion.div>
  );
};
// --- End of Integrated ScrollIndicator ---

/**
 * Hero Section Component
 */
const Hero = () => {
  const theme = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.5, // Staggered delay starting after background animates
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Box
      id="hero"
      component={motion.section}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        height: '100vh',
        minHeight: '700px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Center content horizontally
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default, // Fallback background
      }}
    >
      {/* 3D Background */}
      <Background3D />

      {/* Content Container */}
      <ContentContainer
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          color: theme.palette.common.white, // Ensure text is visible
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          pt: { xs: 12, md: 0 }, // Add padding top on mobile due to header
          // Add subtle text shadow for better readability on complex backgrounds
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* --- Integrated HeroContent --- */}
        <motion.div custom={0} variants={itemVariants}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 'clamp(2.5rem, 10vw, 3.5rem)', sm: 'clamp(3.5rem, 10vw, 5rem)', md: 'clamp(4rem, 10vw, 6rem)' }, // Responsive font size
              mb: 2,
              lineHeight: 1.1,
            }}
          >
            Vincent Göke
          </Typography>
        </motion.div>

        <motion.div custom={1} variants={itemVariants}>
          <Typography
            variant="h4"
            component="p"
            sx={{
              mb: 4,
              fontWeight: 300,
              fontSize: { xs: 'clamp(1rem, 4vw, 1.3rem)', sm: 'clamp(1.2rem, 4vw, 1.6rem)', md: 'clamp(1.4rem, 4vw, 1.8rem)' }, // Responsive font size
              maxWidth: '800px',
              mx: 'auto',
              color: theme.palette.grey[300], // Lighter color for subtitle
            }}
          >
            UX Designer & Researcher | Affective Haptics | Multi-Sensory Interaction
          </Typography>
        </motion.div>

        {/* Skills Tags */}
        <motion.div custom={2} variants={itemVariants}>
           <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4, maxWidth: '600px' }}>
             {/* Use the imported allSkills array */}
             {allSkills.slice(0, 5).map((skill) => ( // Show a few key skills
               <SkillTag
                 key={skill}
                 label={skill}
                 size="medium"
                 sx={{
                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
                   color: theme.palette.common.white,
                   border: `1px solid ${theme.palette.primary.light}`,
                   backdropFilter: 'blur(3px)',
                   '&:hover': {
                     backgroundColor: 'rgba(255, 255, 255, 0.2)',
                     borderColor: theme.palette.secondary.light,
                   },
                 }}
               />
             ))}
           </Box>
        </motion.div>

        <motion.div custom={3} variants={itemVariants}>
          <ScrollLink
            to="work" // Scroll target ID
            spy={true}
            smooth={true}
            offset={-70} // Adjust offset based on header height
            duration={800}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: theme.shadows[4],
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: theme.shadows[8],
                  backgroundColor: theme.palette.secondary.dark, // Darken on hover
                },
              }}
            >
              View My Work
            </Button>
          </ScrollLink>
        </motion.div>
        {/* --- End of Integrated HeroContent --- */}

      </ContentContainer>

      {/* Integrated Scroll Indicator */}
      <IntegratedScrollIndicator />

    </Box>
  );
};

export default Hero;