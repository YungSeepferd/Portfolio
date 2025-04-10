import React, { useState } from 'react';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';

/**
 * IframeModal Component
 * 
 * Displays external content in an iframe with proper loading state handling
 */
const IframeModal = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const theme = useTheme();
  
  // Handle iframe load completion
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };
  
  // Handle iframe load error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('Failed to load iframe content:', url);
  };
  
  // Check if URL is valid
  if (!url) {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        p: 3
      }}>
        <Typography variant="h6" color="error" sx={{ mb: 1 }}>
          Invalid URL
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No URL was provided to the iframe component.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden'
    }}>
      <Typography variant="h6" sx={{ 
        p: 2, 
        bgcolor: 'background.paper', 
        borderBottom: 1, 
        borderColor: 'divider',
        fontWeight: 500
      }}>
        {title || 'Interactive Content'}
      </Typography>
      
      {isLoading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          zIndex: 1
        }}>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Loading content...
          </Typography>
        </Box>
      )}
      
      {hasError ? (
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          p: 3,
          flex: 1
        }}>
          <Typography variant="h6" color="error" sx={{ mb: 1 }}>
            Unable to load content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The requested external content could not be loaded. This might be due to content security policies or the resource being unavailable.
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ mt: 2 }}>
            URL: {url}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 1, height: 'calc(100% - 56px)' }}>
          <iframe
            src={url}
            title={title || 'External Content'}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            onLoad={handleLoad}
            onError={handleError}
            frameBorder="0"
            allowFullScreen
          />
        </Box>
      )}
    </Box>
  );
};

export default IframeModal;
