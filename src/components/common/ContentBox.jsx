import React from 'react';
import { Box, useTheme } from '@mui/material';

/**
 * ContentBox - A container alternative that applies consistent padding
 * without any width restrictions
 */
const ContentBox = ({ children, sx = {}, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%', // Ensure no width restrictions
        boxSizing: 'border-box',
        px: {
          xs: theme.spacing(2), // 16px
          sm: theme.spacing(4), // 32px
          md: theme.spacing(6), // 48px
          lg: theme.spacing(8), // 64px
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
