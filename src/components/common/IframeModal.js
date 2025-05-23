import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, useTheme, Alert } from '@mui/material';

/**
 * IframeModal Component
 * 
 * Displays external content in an iframe with improved handling of
 * Figma embeds and other external content
 */
const IframeModal = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isFigmaEmbed, setIsFigmaEmbed] = useState(false);
  const [isMiroEmbed, setIsMiroEmbed] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');
  const theme = useTheme();
  
  // Process and optimize URL for different embed types
  useEffect(() => {
    if (!url) {
      setHasError(true);
      return;
    }
    
    // Process Figma URLs to ensure proper format for embedding
    if (url.includes('figma.com')) {
      setIsFigmaEmbed(true);
      
      // For Figma, ensure we're using the proper embed format
      // Convert any regular Figma URL to the proper embed format
      let optimizedUrl = url;
      
      // If it's not already using the embed subdomain
      if (!url.includes('embed.figma.com')) {
        // Replace www.figma.com with embed.figma.com
        optimizedUrl = url.replace('www.figma.com', 'embed.figma.com');
      }
      
      // Ensure it has the embed-host parameter
      if (!optimizedUrl.includes('embed-host=')) {
        optimizedUrl += optimizedUrl.includes('?') 
          ? '&embed-host=share' 
          : '?embed-host=share';
      }
      
      // Add proper viewer and file parameters if missing
      if (!optimizedUrl.includes('viewer=')) {
        optimizedUrl += '&viewer=1';
      }
      
      setProcessedUrl(optimizedUrl);
      
    } else if (url.includes('miro.com')) {
      // Handle Miro embeds
      setIsMiroEmbed(true);
      setProcessedUrl(url);
    } else {
      // For other URLs, use as is
      setProcessedUrl(url);
    }
    
    setIsLoading(true);
  }, [url]);
  
  // Handle iframe load completion
  const handleLoad = () => {
    console.log('Iframe content loaded successfully');
    setIsLoading(false);
  };
  
  // Handle iframe load error
  const handleError = () => {
    console.error('Failed to load iframe content:', url);
    setIsLoading(false);
    setHasError(true);
  };
  
  // Create custom iframe attributes for different embed types
  const getIframeAttributes = () => {
    const common = {
      src: processedUrl,
      title: title || 'External Content',
      width: '100%',
      height: '100%',
      style: { border: 'none' },
      onLoad: handleLoad,
      onError: handleError,
      frameBorder: "0"
    };
    
    if (isFigmaEmbed) {
      return {
        ...common,
        allowFullScreen: true,
        allow: "fullscreen",
        style: { 
          ...common.style, 
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }
      };
    }
    
    if (isMiroEmbed) {
      return {
        ...common,
        allowFullScreen: true,
        allow: "fullscreen; clipboard-read; clipboard-write",
        scrolling: "no"
      };
    }
    
    return {
      ...common,
      allowFullScreen: true
    };
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
      
      {/* Special notice for Figma/Miro embeds */}
      {(isFigmaEmbed || isMiroEmbed) && (
        <Alert severity="info" sx={{ mb: 0 }}>
          {isFigmaEmbed 
            ? 'This Figma prototype may require sign-in for full interactivity' 
            : 'This Miro board requires sign-in for full interactivity'}
        </Alert>
      )}
      
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
        <Box sx={{ flex: 1, height: 'calc(100% - 56px)', overflow: 'hidden' }}>
          <iframe
            {...getIframeAttributes()}
            title={title || "External content frame"} // Added title explicitly to avoid warnings
          />
        </Box>
      )}
    </Box>
  );
};

export default IframeModal;
