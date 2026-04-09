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
          xs: theme.spacing(2), // 16px
          sm: theme.spacing(4), // 32px
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
