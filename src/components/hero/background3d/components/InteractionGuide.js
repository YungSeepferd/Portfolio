import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, useTheme, useMediaQuery } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import { useSceneState } from '../SceneContext';
import { SHAPE_TYPES } from '../constants';

/**
 * InteractionGuide Component
 * 
 * Displays visual cues to guide users on how to interact with the 3D background.
 * - Shows different instructions for mouse vs touch devices
 * - Provides scene-specific instructions
 * - Only appears on the first visit to the site (uses localStorage)
 * - Disappears when the user switches scenes
 * - Can be manually toggled on/off with a prop
 */
const InteractionGuide = ({ 
  show = true, 
  autoHideDelay = 5000,
  position = 'bottom'
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [visible, setVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { currentShapeType } = useSceneState();
  
  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  // Check localStorage to see if user has visited before
  useEffect(() => {
    // Only run client-side
    if (typeof window !== 'undefined') {
      const hasVisitedBefore = localStorage.getItem('hasSeenInteractionGuide');
      
      // Show guide only if the user hasn't seen it before
      if (!hasVisitedBefore && show) {
        setVisible(true);
        // Mark as visited
        localStorage.setItem('hasSeenInteractionGuide', 'true');
        
        // Auto-hide after delay
        const timer = setTimeout(() => {
          setVisible(false);
        }, autoHideDelay);
        
        return () => clearTimeout(timer);
      } else if (show && show === true && localStorage.getItem('manuallyShowGuide') === 'true') {
        // This allows the guide to be manually shown via the info button
        setVisible(true);
        localStorage.removeItem('manuallyShowGuide');
        
        const timer = setTimeout(() => {
          setVisible(false);
        }, autoHideDelay);
        
        return () => clearTimeout(timer);
      } else {
        setVisible(false);
      }
    }
  }, [show, autoHideDelay]);
  
  // Hide guide when scene changes
  useEffect(() => {
    setVisible(false);
  }, [currentShapeType]);
  
  // Responsive position and style
  const positionStyles = isMobile ? {
    top: '72px', // Move further down below header (56px header + margin)
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: 120,
    padding: theme.spacing(0.6, 1),
  } : {
    ...(position === 'top' ? { top: '20%' } : position === 'center' ? { top: '50%', transform: 'translate(-50%, -50%)' } : { bottom: '15%' }),
    left: '50%',
    transform: position === 'center' ? 'translate(-50%, -50%)' : 'translateX(-50%)',
    maxWidth: 280,
    padding: '12px 20px',
  };

  // Get scene-specific instructions
  const getInstructions = () => {
    switch(currentShapeType) {
      case SHAPE_TYPES.SPHERE:
        return {
          action: isTouchDevice 
            ? "Tap on a sphere to switch to Cube scene" 
            : "Click on a sphere to switch to Cube scene",
          secondary: isTouchDevice
            ? "Touch and drag to move spheres and rotate view"
            : "Move cursor to attract spheres. Drag to rotate view"
        };
      case SHAPE_TYPES.BOX:
        return {
          action: isTouchDevice 
            ? "Tap on a cube to switch to Torus scene" 
            : "Click on a cube to switch to Torus scene",
          secondary: isTouchDevice
            ? "Touch and drag to create ripples and rotate view"
            : "Move cursor to create ripples. Drag to rotate view"
        };
      case SHAPE_TYPES.TORUS:
        return {
          action: isTouchDevice 
            ? "Tap on a torus ring to switch to Sphere scene" 
            : "Click on a torus ring to switch to Sphere scene",
          secondary: isTouchDevice
            ? "Touch and move to create torus rings"
            : "Move cursor to create torus rings in different directions"
        };
      default:
        return {
          action: isTouchDevice 
            ? "Tap to change scene" 
            : "Click to change scene",
          secondary: isTouchDevice
            ? "Touch and drag to rotate view"
            : "Drag to rotate view"
        };
    }
  };

  const instructions = getInstructions();
  
  return (
    <Fade in={visible && show} timeout={{ enter: 600, exit: 400 }}>
      <Box
        sx={{
          position: 'absolute',
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          borderRadius: '24px',
          backdropFilter: 'blur(4px)',
          boxShadow: theme.shadows[4],
          zIndex: 100,
          pointerEvents: 'none',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          fontSize: isMobile ? '0.48rem' : '1rem',
          ...positionStyles,
        }}
      >
        {isTouchDevice ? (
          <>
            <TouchAppIcon fontSize={isMobile ? 'inherit' : 'medium'} sx={isMobile ? { fontSize: 18 } : {}} />
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? '0.49rem' : '1rem' }}>
                {instructions.action}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, fontSize: isMobile ? '0.46rem' : '1rem' }}>
                {instructions.secondary}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MouseIcon fontSize={isMobile ? 'inherit' : 'small'} sx={isMobile ? { fontSize: 16 } : {}} />
              <ThreeDRotationIcon fontSize={isMobile ? 'inherit' : 'small'} sx={isMobile ? { fontSize: 16 } : {}} />
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: isMobile ? '0.49rem' : '1rem' }}>
                {instructions.action}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5, fontSize: isMobile ? '0.46rem' : '1rem' }}>
                {instructions.secondary}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Fade>
  );
};

export default InteractionGuide;