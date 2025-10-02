import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, useTheme, CircularProgress, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AboutTabNavigatorScrollSpy from './AboutTabNavigatorScrollSpy';
import ErrorBoundary from '../common/ErrorBoundary';
import aboutData from './AboutData'; // Import default export

/**
 * AboutSection Component
 * Uses direct data import instead of async loading
 */
const AboutSection = () => {
  // Initialize to null to match useScrollSpy's initial state
  const [, setActiveSection] = useState(null);
  const tabNavigatorRef = useRef(null);
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [isAtViewportTop, setIsAtViewportTop] = useState(false);
  const sectionRef = useRef(null);
  
  // Use direct data import instead of useDataLoader for about section
  useEffect(() => {
    // Simulate a short loading delay for UI consistency
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Detect when About section reaches viewport top
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if section is at or near the top of viewport
        const rect = entry.boundingClientRect;
        // More lenient threshold - within 50px of top
        const atTop = rect.top <= 50 && rect.top >= -10;
        const isAtTop = atTop && entry.isIntersecting;
        setIsAtViewportTop(isAtTop);
        
        // Don't automatically lock - let the parallax container handle scrolling
        setScrollLocked(false);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  
  // Body scroll lock effect - only when section is at viewport top
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    
    // Prevent wheel and touch scroll on body
    const preventScroll = (e) => {
      if (scrollLocked && isAtViewportTop) {
        e.preventDefault();
      }
    };
    
    // Only lock scroll when section is at viewport top AND scroll lock is requested
    if (scrollLocked && isAtViewportTop) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
      
      // Capture wheel events to prevent page scroll
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      // Unlock body scroll
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
      document.body.style.top = '';
      
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
      document.body.style.top = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [scrollLocked, isAtViewportTop]);
  
  const handleSectionChange = (newSection) => {
    try {
      // Allow null for initial state
      if (newSection === null || (newSection >= 0 && newSection < aboutData.length)) {
        setActiveSection(newSection);
      } else {
        console.warn(`Invalid section index: ${newSection}, max index is ${aboutData.length - 1}`);
      }
    } catch (error) {
      console.error("Error changing about section:", error);
    }
  };
  
  const handleScrollLock = (shouldLock) => {
    // Disabled - allow free scrolling throughout
    // The parallax container handles its own scroll
    setScrollLocked(false);
  };

  // Header animation removed with old header block
  
  // Check if we have valid data
  const hasValidData = Array.isArray(aboutData) && aboutData.length > 0;
  
  return (
    <ErrorBoundary componentName="AboutSection">
      <Box
        ref={sectionRef}
        id="about"
        component="section"
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          py: 8,
        }}
      >
        {/* Header removed: Title moved to left tabs column; description removed per request */}
        
        {/* Render loading state or content */}
        {isLoading ? (
          <Box 
            id="about-section-loading"
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
            id="about-section-nocontent"
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
              color="secondary"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{ mt: 3 }}
            >
              Reload Page
            </Button>
          </Box>
        ) : (
          /* Scroll-Based Tab Navigation & Content */
          <AboutTabNavigatorScrollSpy
            ref={tabNavigatorRef} 
            onSectionChange={handleSectionChange}
            aboutData={aboutData}
            onScrollLock={handleScrollLock}
          />
        )}
      </Box>
    </ErrorBoundary>
  );
};

export default AboutSection;
