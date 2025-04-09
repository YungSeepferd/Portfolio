import React, { useState, useRef } from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { aboutData } from './AboutData';
import AboutTabNavigator from './AboutTabNavigator';
import ErrorBoundary from '../common/ErrorBoundary';

/**
 * AboutSection Component
 * 
 * Main container for the About section of the portfolio.
 * Displays a heading and the AboutTabNavigator for browsing
 * different sections of information.
 * 
 * @component
 */
const AboutSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const tabNavigatorRef = useRef(null);
  const theme = useTheme();
  
  /**
   * Updates the active section when tab navigation occurs
   * @param {number} newSection - Index of the new active section
   */
  const handleSectionChange = (newSection) => {
    try {
      if (newSection >= 0 && newSection < aboutData.length) {
        setActiveSection(newSection);
      } else {
        console.warn(`Invalid section index: ${newSection}, max index is ${aboutData.length - 1}`);
      }
    } catch (error) {
      console.error("Error changing about section:", error);
    }
  };

  // Animation variants for section fade-in
  const sectionAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <ErrorBoundary componentName="AboutSection">
      <Box
        id="about"
        component="section"
        sx={{
          width: '100%',
          py: { xs: 8, md: 12 }, // Keep vertical padding
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          // Increase minimum height to accommodate expanded content
          minHeight: { xs: 'auto', md: '900px', lg: '1000px' },
        }}
      >
        {/* Section Header */}
        <Container maxWidth="xl"> {/* Changed from lg to xl for more width */}
          <motion.div
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Box 
              sx={{ 
                width: '100%', 
                textAlign: 'center',
                mb: { xs: 4, md: 6 },
              }}
            >
              <Typography 
                variant="h2" 
                component="h2" 
                sx={{ 
                  mb: 2,
                  color: theme.palette.text.primary,
                  fontWeight: 700
                }}
              >
                About
              </Typography>
              
              <Typography 
                variant="subtitle1"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  color: theme.palette.text.secondary
                }}
              >
                Learn more about my background, skills, and professional journey
              </Typography>
            </Box>
          </motion.div>
        </Container>
        
        {/* Tab Navigation & Content */}
        <AboutTabNavigator 
          ref={tabNavigatorRef} 
          onSectionChange={handleSectionChange}
          currentSection={activeSection}
        />
      </Box>
    </ErrorBoundary>
  );
};

export default AboutSection;
