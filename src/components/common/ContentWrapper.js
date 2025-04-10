import React from 'react';
import { Box } from '@mui/material';

/**
 * ContentWrapper - A simple full-width wrapper
 */
const ContentWrapper = ({ children, sx = {}, ...props }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%', // Ensure no width restrictions
        boxSizing: 'border-box',
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ContentWrapper;
