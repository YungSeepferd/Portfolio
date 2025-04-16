import React from 'react';
import { Box } from '@mui/material';

/**
 * FullWidthContainer Component
 * 
 * A simple full-width container with no width restrictions
 */
const ContentContainer = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        // Add consistent padding but NO width constraints
        px: { 
          xs: '20px',
          sm: '30px',
          md: '40px',
          lg: '50px',
        },
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ContentContainer;
