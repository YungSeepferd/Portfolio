import React, { useState } from 'react';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';

/**
 * ProjectPrototypeEmbed Component
 * 
 * Embeds interactive prototypes (Figma, Invision, etc.) into project modals
 * with proper loading state handling
 */
const ProjectPrototypeEmbed = ({ embedUrl, title }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle iframe load completion
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle iframe load error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <Box 
      component="section"
      sx={{ 
        my: 6,
        width: '100%',
        position: 'relative',
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        height: { xs: '400px', md: '600px' },
      }}
    >
      <Typography 
        variant="h4" 
        component="h3"
        sx={{ 
          mb: 2,
          textAlign: 'center'
        }}
      >
        Interactive Prototype
      </Typography>

      {isLoading && (
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: theme.palette.background.paper,
            zIndex: 1,
          }}
        >
          <CircularProgress size={40} thickness={4} />
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2,
              color: theme.palette.text.secondary 
            }}
          >
            Loading prototype...
          </Typography>
        </Box>
      )}
      
      {hasError ? (
        <Box 
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            bgcolor: theme.palette.background.default,
          }}
        >
          <Typography 
            variant="h6" 
            color="error"
            sx={{ mb: 2 }}
          >
            Failed to load prototype
          </Typography>
          <Typography variant="body2">
            The prototype could not be loaded. Please check the URL or try again later.
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1,
              color: theme.palette.text.secondary,
              wordBreak: 'break-all' 
            }}
          >
            URL: {embedUrl}
          </Typography>
        </Box>
      ) : (
        <Box 
          component="iframe"
          src={embedUrl}
          title={`${title} prototype`}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            border: 'none',
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          allowFullScreen
        />
      )}
    </Box>
  );
};

export default ProjectPrototypeEmbed;
