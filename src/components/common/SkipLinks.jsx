import React from 'react';
import { Box } from '@mui/material';

/**
 * SkipLinks Component
 * 
 * Provides keyboard-accessible skip links that allow users to bypass navigation
 * and jump directly to main content. This is a WCAG 2.1 Level A requirement.
 * 
 * Usage: Place this component near the top of the app, before the Header.
 */
const SkipLinks = () => {
  return (
    <Box
      component="nav"
      aria-label="Skip links"
      sx={{
        // Visually hidden until focused
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        zIndex: 9999,
        '&:focus-within': {
          // When any child receives focus, show the skip link
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'auto',
          height: 'auto',
          overflow: 'visible',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          padding: 2,
          borderRadius: '0 0 8px 0',
          boxShadow: 4,
          zIndex: 9999,
        },
      }}
    >
      <Box
        component="a"
        href="#main-content"
        sx={{
          display: 'block',
          padding: 1.5,
          color: 'primary.contrastText',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          '&:hover': {
            textDecoration: 'underline',
          },
          '&:focus': {
            outline: '2px solid',
            outlineColor: 'primary.contrastText',
            outlineOffset: 2,
          },
        }}
      >
        Skip to main content
      </Box>
    </Box>
  );
};

export default SkipLinks;
