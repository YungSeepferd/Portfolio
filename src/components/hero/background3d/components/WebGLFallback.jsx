import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

/**
 * WebGLFallback Component
 * 
 * Displays a graceful fallback UI when WebGL is not supported.
 * Provides a lightweight static background instead of the 3D canvas.
 * Accessible with proper ARIA labels.
 */
const WebGLFallback = ({ 
  message = '3D graphics not supported in your browser',
  showDetails = false 
}) => {
  const theme = useTheme();
  
  return (
    <Box
      role="img"
      aria-label={message}
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
        zIndex: 0,
        // Subtle gradient fallback
        background: `linear-gradient(
          135deg,
          ${theme.palette.background.default} 0%,
          ${theme.palette.mode === 'dark' 
            ? theme.palette.grey[900] 
            : theme.palette.grey[100]} 100%
        )`,
      }}
    >
      {/* Decorative static pattern to indicate visual content */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${theme.palette.primary.main} 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, ${theme.palette.primary.main} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Message container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: 3,
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            mb: 1,
          }}
        >
          {message}
        </Typography>
        
        {showDetails && (
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{
              mt: 1,
              fontSize: '0.75rem',
            }}
          >
            Your browser does not support WebGL, which is required for the 3D interactive background.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default WebGLFallback;
