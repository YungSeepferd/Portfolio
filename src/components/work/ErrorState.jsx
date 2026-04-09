import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Error state component with retry functionality
 */
const ErrorState = ({ error, onRetry }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        py: theme.spacing(6),
        backgroundColor: 'background.paper',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        p: theme.spacing(4),
      }}
    >
      <Typography 
        variant="h6" 
        color="error" 
        gutterBottom
        sx={{ mb: theme.spacing(2) }}
      >
        Failed to load projects
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ mb: theme.spacing(3) }}
      >
        We couldn't load the projects. Please check your connection and try again.
      </Typography>
      {error && (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: theme.spacing(3),
            fontFamily: 'monospace',
            backgroundColor: 'background.default',
            p: theme.spacing(1),
            borderRadius: theme.shape.borderRadius,
          }}
        >
          {error.message}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={onRetry}
        startIcon={<RefreshIcon />}
        sx={{ 
          mt: theme.spacing(1),
          px: theme.spacing(4),
          py: theme.spacing(1.5),
          textTransform: 'none',
          fontWeight: theme.typography.fontWeightMedium,
          borderRadius: theme.shape.borderRadius,
          transition: theme.transitions.create(['background-color', 'box-shadow'], {
            duration: theme.transitions.duration.shorter,
          }),
          '&:hover': {
            boxShadow: theme.shadows[4],
          },
        }}
      >
        Try Again
      </Button>
    </Box>
  );
};

export default ErrorState;
