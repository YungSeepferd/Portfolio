import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme, CircularProgress, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import AboutTabNavigator from './AboutTabNavigator';
import ErrorBoundary from '../common/ErrorBoundary';
import { aboutData } from './AboutData'; // Import directly for immediate use

/**
 * AboutSection Component
 * Uses direct data import instead of async loading
 */
const AboutSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const tabNavigatorRef = useRef(null);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  // Use direct data import instead of useDataLoader for about section
  useEffect(() => {
    // Simulate a short loading delay for UI consistency
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Log the data state
  useEffect(() => {
    console.log('About section state:', { 
      isLoading,
      dataLength: aboutData?.length || 0,
    });
  }, [isLoading]);
  
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
  
  // Check if we have valid data
  const hasValidData = Array.isArray(aboutData) && aboutData.length > 0;
  
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
        {/* Header section */}
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
        
        {/* Render loading state or content */}
        {isLoading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '400px',
              gap: 2
            }}
          >
            <CircularProgress color="primary" />
            <Typography variant="body2" color="text.secondary">
              Loading content...
            </Typography>
          </Box>
        ) : !hasValidData ? (
          <Box 
            sx={{ 
              textAlign: 'center', 
              p: 4, 
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant="h5" gutterBottom>
              No Content Available
            </Typography>
            <Typography variant="body1">
              We couldn't find any content to display in this section.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{ mt: 3 }}
            >
              Reload Page
            </Button>
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
