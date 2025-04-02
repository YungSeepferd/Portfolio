import React, { useState, useRef } from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { aboutData } from './AboutData';
import SmoothTabNavigator from './SmoothTabNavigator';
import ErrorBoundary from '../common/ErrorBoundary';

/**
 * AboutSection Component
 * 
 * Displays information about the user in a tabbed interface with
 * smooth transitions between content sections.
 */
const AboutSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const parallaxRef = useRef(null);
  const theme = useTheme();
  
  const handleSectionChange = (newStep) => {
    try {
      if (newStep >= 0 && newStep < aboutData.length) {
        setActiveStep(newStep);
      } else {
        console.warn(`Invalid section index: ${newStep}, max index is ${aboutData.length - 1}`);
      }
    } catch (error) {
      console.error("Error changing section:", error);
    }
  };
  
  return (
    <ErrorBoundary>
      <Box
        id="about"
        component="section"
        sx={{
          width: '100%',
          py: { xs: 8, md: 12 },
          backgroundColor: theme => theme.palette.background.default,
          position: 'relative',
        }}
      >
        {/* Section Header */}
        <Container maxWidth="lg">
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
                color: theme.palette.text.primary 
              }}
            >
              WhoAmI
            </Typography>
          </Box>
        </Container>
        
        {/* Tabs Navigation & Content */}
        <SmoothTabNavigator 
          ref={parallaxRef} 
          onSectionChange={handleSectionChange}
          currentSection={activeStep}
          // Pass theme-related props for consistent styling
          tagStyle={{
            backgroundColor: 'rgba(83, 99, 238, 0.2)',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.primary.main}`,
            fontSize: '0.875rem',
            fontWeight: 500,
            height: 28,
            borderRadius: '14px',
          }}
        />
      </Box>
    </ErrorBoundary>
  );
};

export default AboutSection;