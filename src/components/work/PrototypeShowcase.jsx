import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import ProjectPrototypeEmbed from './ProjectPrototypeEmbed'; 
// Use theme transitions directly instead of designConstants

/**
 * PrototypeShowcase Component
 *
 * Displays an interactive prototype (e.g., Figma embed) within a styled container.
 */
const PrototypeShowcase = ({ title = "Interactive Prototype", type = 'figma', url, sx = {} }) => {
  const theme = useTheme();

  // Don't render if no URL is provided
  if (!url) {
    return null;
  }

  return (
    <Box sx={{ ...sx }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: theme.palette.text.secondary,
          fontWeight: 500
        }}
      >
        {title}
      </Typography>
      <Paper
        elevation={3}
        sx={{
          overflow: 'hidden', // Ensure iframe stays within bounds
          borderRadius: theme.shape.borderRadius,
          // Responsive height for the embed
          height: { xs: '400px', sm: '500px', md: '600px', lg: '700px' },
          width: '100%',
          backgroundColor: theme.palette.background.default, // Background for loading state
          transition: 'all 0.3s ease', // Use direct value instead of designConstants
        }}
      >
        {/* Use ProjectPrototypeEmbed to handle the actual embedding */}
        <ProjectPrototypeEmbed type={type} url={url} title={title} />
      </Paper>
    </Box>
  );
};

export default PrototypeShowcase;
