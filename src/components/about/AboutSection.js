import React, { useState, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { aboutData } from './AboutData';
import AboutTabNavigator from './AboutTabNavigator';
import ErrorBoundary from '../common/ErrorBoundary';
import ContentContainer from '../common/ContentContainer'; // Added ContentContainer

/**
 * AboutSection Component
 */
const AboutSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const tabNavigatorRef = useRef(null);
  const theme = useTheme();
  
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
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          py: 8,
        }}
      >
        {/* Use ContentContainer for horizontal padding */}
        <ContentContainer>
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
        </ContentContainer>
        
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
