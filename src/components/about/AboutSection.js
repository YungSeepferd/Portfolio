import React, { useState, useRef } from 'react';
import { Box, Typography, useTheme, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import AboutTabNavigator from './AboutTabNavigator';
import ErrorBoundary from '../common/ErrorBoundary';
import useDataLoader from '../../hooks/useDataLoader';
import { aboutData as getAboutData } from './AboutData';

/**
 * AboutSection Component
 * Uses the useDataLoader hook to handle data loading
 */
const AboutSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const tabNavigatorRef = useRef(null);
  const theme = useTheme();
  
  // Use the data loader hook to load about data
  const { 
    data: aboutData, 
    isLoading, 
    error 
  } = useDataLoader(
    getAboutData, 
    {
      defaultData: [],
      validateData: (data) => Array.isArray(data) && data.length > 0
    }
  );
  
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
        {/* MODIFIED: Use Box with direct styling instead of container wrappers */}
        <Box 
          sx={{ 
            width: '100%',
            px: { 
              xs: '20px',
              sm: '30px',
              md: '40px',
              lg: '50px',
            },
            boxSizing: 'border-box',
          }}
        >
          <motion.div
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* We're using motion here, so the import is needed */}
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
        </Box>
        
        {/* Render different content based on loading/error state */}
        {isLoading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '400px'
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 4, 
              color: 'error.main', 
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant="h5" color="error" gutterBottom>
              Error Loading About Data
            </Typography>
            <Typography variant="body1">
              There was a problem loading the content. Please try refreshing the page.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              Error details: {error.message || 'Unknown error'}
            </Typography>
          </Box>
        ) : (
          /* Tab Navigation & Content */
          <AboutTabNavigator 
            ref={tabNavigatorRef} 
            onSectionChange={handleSectionChange}
            currentSection={activeSection}
            aboutData={aboutData}
          />
        )}
      </Box>
    </ErrorBoundary>
  );
};

export default AboutSection;
