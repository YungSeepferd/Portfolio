import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const ProjectBubbles = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.bubbles.background, // Use theme color for background
        border: `1px solid ${theme.palette.bubbles.border}`, // Use theme color for border
        borderRadius: '50%',
        padding: theme.spacing(2), // Use theme spacing
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150, // Fixed width for bubble
        height: 150, // Fixed height for bubble
      }}
    >
      <Typography
        sx={{
          color: theme.palette.text.primary, // Use theme color for text
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Project Bubble
      </Typography>
    </Box>
  );
};

export default ProjectBubbles;