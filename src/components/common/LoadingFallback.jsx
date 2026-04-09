import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * LoadingFallback Component
 * Used as a Suspense fallback for lazy-loaded components
 */
const LoadingFallback = ({ message = "Loading..." }) => {
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
        gap: 2,
        py: 4,
      }}
    >
      <CircularProgress 
        color="primary" 
        size={40}
        thickness={4}
      />
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ 
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingFallback;
