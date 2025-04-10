import React from 'react';
import { Box } from '@mui/material';

/**
 * ContentBox - A container alternative that applies consistent padding
 * without any width restrictions
 */
const ContentBox = ({ children, sx = {}, ...props }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%', // Ensure no width restrictions
        boxSizing: 'border-box',
        px: { 
          xs: '20px',
          sm: '30px',
          md: '40px',
          lg: '50px',
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ContentBox;
