import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Canvas } from '@react-three/fiber';
// Make sure all scenes are properly imported
import SphereScene from './background3d/scenes/SphereScene';
import TorusScene from './background3d/scenes/TorusScene';
import BoxScene from './background3d/scenes/BoxScene';
import HeroContent from './HeroContent';
// Import other necessary components

// Ensure the ParticleComponent is imported early so it's registered
import './background3d/ParticleComponent'; // This registers the Particle component

import ErrorBoundary from '../common/ErrorBoundary';
import ScrollIndicator from './ScrollIndicator';
import Background3D from './background3d/Background3D';

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [is3DVisible, setIs3DVisible] = useState(false);
  
  // Force re-render after a slight delay to ensure everything initializes properly
  useEffect(() => {
    const timer = setTimeout(() => {
      setIs3DVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        width: '100%',
        minHeight: { 
          xs: 'calc(100vh - 56px)', 
          sm: 'calc(100vh - 64px)'  
        },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        background: `linear-gradient(145deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        py: { xs: theme.spacing(4), md: theme.spacing(0) },
      }}
    >
      {/* 3D Background - CRITICAL FIX: Set position:absolute and higher z-index with pointer-events enabled */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          zIndex: 5, // Higher than content to ensure interactivity
          pointerEvents: 'auto', // Explicitly enable
          '& canvas': {
            width: '100%',
            height: '100%',
            display: 'block', // Ensure canvas displays properly
            pointerEvents: 'auto !important' // Critical fix
          }
        }}
      >
        <ErrorBoundary componentName="Background3D">
          {is3DVisible && <Background3D />}
        </ErrorBoundary>
      </Box>
      
      {/* Content with proper z-index layering */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          zIndex: 10, // Higher than background to ensure content is visible
          pointerEvents: 'none', // Let events pass through to background
          pt: { xs: 8, md: 0 } // Add padding to avoid overlap with header
        }}
      >
        <HeroContent />
      </Box>
      
      {!isMobile && (
        <Box sx={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
          <ScrollIndicator />
        </Box>
      )}
    </Box>
  );
};

export default Hero;