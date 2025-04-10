import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import ErrorBoundary from '../common/ErrorBoundary';
import HeroContent from './HeroContent';
import ScrollIndicator from './ScrollIndicator';
import Background3D from './background3d';

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
      {/* Full-width background container */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          zIndex: 1
        }}
      >
        <ErrorBoundary componentName="Background3D">
          <Background3D />
        </ErrorBoundary>
      </Box>
      
      {/* Content container with proper styling to ensure content is visible */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          zIndex: 2,
          px: { 
            xs: '20px',
            sm: '30px',
            md: '40px',
            lg: '50px', 
          },
          boxSizing: 'border-box',
        }}
      >
        <HeroContent />
      </Box>
      
      {!isMobile && (
        <Box sx={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
          <ScrollIndicator />
        </Box>
      )}
    </Box>
  );
};

export default Hero;