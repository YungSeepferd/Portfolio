import React from 'react';
import { Box, CircularProgress } from '@mui/material';

/**
 * Loading Fallback Component
 * Displayed while the scenes are loading
 */
const LoadingFallback = () => (
  <Box
    sx={{
      width: '100%', 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <CircularProgress color="primary" />
  </Box>
);

export default LoadingFallback;
