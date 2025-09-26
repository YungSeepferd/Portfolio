import React from 'react';
import { Box, Typography, Skeleton, useTheme } from '@mui/material';

/**
 * Loading state component with skeleton placeholders
 */
const LoadingState = () => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: theme.spacing(37.5), // 300px
        justifyContent: 'center',
        p: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'background.subtle',
      }}
    >
      <Typography 
        color="text.secondary" 
        variant="body1" 
        sx={{ mb: theme.spacing(3) }}
      >
        Loading projects...
      </Typography>
      
      {/* Project card skeletons */}
      <Box sx={{ width: '100%', maxWidth: theme.breakpoints.values.lg }}>
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: theme.spacing(3),
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ aspectRatio: '1 / 1' }}>
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height="60%"
                sx={{ borderRadius: 0 }}
              />
              <Box sx={{ pt: theme.spacing(2) }}>
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="100%" height={16} />
                <Skeleton variant="text" width="60%" height={16} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingState;
