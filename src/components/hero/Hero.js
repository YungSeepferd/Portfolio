import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import ErrorBoundary from '../common/ErrorBoundary';
import HeroContent from './HeroContent';
import ScrollIndicator from './ScrollIndicator';
import Background3D from './background3d'; // Updated import path

/**
 * Hero Component
 * 
 * Main hero section with interactive 3D background and content.
 * Uses a simplified, reliable Three.js implementation.
 */
const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        width: '100%',
        minHeight: { 
          xs: 'calc(100vh - 56px)', // Mobile header height
          sm: 'calc(100vh - 64px)'  // Desktop header height
        },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        // Subtle gradient background as fallback if 3D fails
        background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        // Use theme spacing for consistent vertical padding
        py: { xs: theme.spacing(4), md: theme.spacing(0) },
      }}
    >
      {/* Interactive 3D Background with error boundary */}
      <ErrorBoundary 
        fallback={
          <Box sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
            zIndex: 1,
          }}/>
        }
        componentName="Background3D"
      >
        <Background3D />
      </ErrorBoundary>
      
      <Box 
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          // Use the theme's page padding
          px: theme.spacing.pagePadding || { xs: 2, sm: 4, md: 6, lg: 12.5 },
          position: 'relative',
          zIndex: 2, // Keep higher z-index for content visibility
          pointerEvents: 'none', // IMPORTANT: Make the entire content area not capture mouse events
        }}
      >
        {/* Hero Content */}
        <HeroContent />
      </Box>
      
      {/* Scroll Indicator - Only visible on larger screens */}
      {!isMobile && (
        <Box sx={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
          <ScrollIndicator />
        </Box>
      )}
    </Box>
  );
};

export default Hero;