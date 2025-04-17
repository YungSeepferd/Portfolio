import React from 'react';
import { Box, useTheme } from '@mui/material';

/**
 * FullWidthContainer Component
 * 
 * A simple full-width container with no width restrictions
 */
const ContentContainer = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        // Use design system spacing tokens for horizontal padding
        px: {
          xs: theme.spacing(3), // Increased from 2 to 3 (24px)
          sm: theme.spacing(5), // Increased from 4 to 5 (40px)
          md: theme.spacing(6), // 48px
          lg: theme.spacing(8), // 64px
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
