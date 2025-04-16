import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

/**
 * LoadingFallback Component
 * 
 * Displays a loading spinner and message while the 3D scene is initializing.
 * Provides a smoother experience when the Three.js canvas is loading.
 */
const LoadingFallback = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        zIndex: 5,
      }}
    >
      <CircularProgress 
        size={40} 
        thickness={4} 
        sx={{ 
          color: theme.palette.primary.main,
          mb: 2
        }} 
      />
      <Typography 
        variant="body2" 
        color="textSecondary"
        sx={{ 
          fontWeight: 500,
          opacity: 0.8
        }}
      >
        Loading 3D environment...
      </Typography>
    </Box>
  );
};

export default LoadingFallback;
