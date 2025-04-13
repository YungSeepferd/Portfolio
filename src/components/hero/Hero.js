import React, { useState, useEffect, memo } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import HeroContent from './HeroContent';
import ErrorBoundary from '../common/ErrorBoundary';
import ScrollIndicator from './ScrollIndicator';
import Background3D from './background3d/Background3D';

/**
 * HeroBackground Component
 * 
 * Encapsulates the 3D background with error handling
 * This separation helps with better rendering control and error isolation
 */
const HeroBackground = memo(() => {
  return (
    <ErrorBoundary 
      componentName="Background3D"
      fallback={
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.6,
            background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.2) 100%)',
            pointerEvents: 'none',
          }}
        />
      }
    >
      <Background3D />
    </ErrorBoundary>
  );
});

HeroBackground.displayName = 'HeroBackground';

/**
 * Hero Component
 * 
 * The main hero section of the portfolio with:
 * - A 3D background using Three.js
 * - Content overlay with title, subtitle and skills
 * - Scroll indicator (desktop only)
 */
const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [is3DVisible, setIs3DVisible] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Two-phase initialization for better stability:
  // 1. First wait for the component to mount
  // 2. Then show the 3D background with a slight delay
  useEffect(() => {
    // Mark the component as mounted
    setHasInitialized(true);
    
    // Small delay before showing 3D background to ensure DOM is ready
    const timer = setTimeout(() => {
      setIs3DVisible(true);
    }, 200); // Increased from 100ms for more reliable initialization
    
    return () => clearTimeout(timer);
  }, []);

  // Define z-index values from theme or use fallbacks
  const zIndexes = {
    background: theme.zIndex?.heroBackground || 5,
    content: theme.zIndex?.heroContent || 10,
    scrollIndicator: theme.zIndex?.scrollIndicator || 10
  };

  return (
    <Box
      id="hero"
      component="section"
      aria-label="Hero section"
      sx={{
        width: '100%',
        minHeight: { 
          xs: 'calc(100vh - 56px)', // Mobile header height
          sm: 'calc(100vh - 64px)'  // Desktop header height
        },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        py: { xs: theme.spacing(4), md: theme.spacing(0) },
        // Ensure proper stacking context
        isolation: 'isolate',
      }}
    >
      {/* 3D Background Layer */}
      {hasInitialized && is3DVisible && <HeroBackground />}
      
      {/* Content Overlay Layer */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          zIndex: zIndexes.content,
          // Set pointer-events to auto on the container but none on content
          // This allows interaction with background while keeping content visible
          pointerEvents: 'auto',
          pt: { xs: 8, md: 0 }, // Add padding to avoid header overlap
        }}
      >
        <HeroContent />
      </Box>
      
      {/* Scroll Indicator - Desktop Only */}
      {!isMobile && (
        <Box 
          sx={{ 
            position: 'relative', 
            zIndex: zIndexes.scrollIndicator, 
            pointerEvents: 'auto',
            mt: 'auto', // Push to bottom
          }}
        >
          <ScrollIndicator />
        </Box>
      )}
    </Box>
  );
};

export default Hero;