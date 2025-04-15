import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, useTheme } from '@mui/material';
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
 * - Fades out after a short period
 * - Can be toggled on/off with a prop
 */
const InteractionGuide = ({ 
  show = true, 
  autoHideDelay = 5000,
  position = 'bottom'
}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { currentShapeType } = useSceneState();
  
  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  // Auto-hide after delay
  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }
    
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, autoHideDelay);
    
    return () => clearTimeout(timer);
  }, [show, autoHideDelay]);
  
  // Position styles
  const positionStyles = {
    top: {
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    center: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    bottom: {
      bottom: '15%',
      left: '50%',
      transform: 'translateX(-50%)',
    }
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
          ...positionStyles[position],
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '12px 20px',
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
          maxWidth: '280px',
        }}
      >
        {isTouchDevice ? (
          <>
            <TouchAppIcon fontSize="medium" />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {instructions.action}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                {instructions.secondary}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MouseIcon fontSize="small" />
              <ThreeDRotationIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                {instructions.action}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
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