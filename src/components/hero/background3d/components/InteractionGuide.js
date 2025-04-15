import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, useTheme } from '@mui/material';
import MouseIcon from '@mui/icons-material/Mouse';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';

/**
 * InteractionGuide Component
 * 
 * Displays visual cues to guide users on how to interact with the 3D background.
 * - Shows different instructions for mouse vs touch devices
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
            <Typography variant="body2">
              Tap to change shape. Touch and drag to rotate the view. Pinch to zoom.
            </Typography>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MouseIcon fontSize="small" />
              <ThreeDRotationIcon fontSize="small" />
            </Box>
            <Typography variant="body2">
              Click to change shape. Drag to rotate the view. Scroll to zoom in/out.
            </Typography>
          </>
        )}
      </Box>
    </Fade>
  );
};

export default InteractionGuide;