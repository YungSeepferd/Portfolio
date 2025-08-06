import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useTheme, Alert } from '@mui/material';

interface IframeModalProps {
  url: string;
  title: string;
  onClose?: () => void;
  isMobile?: boolean;
}

/**
 * IframeModal Component
 * 
 * Displays external content in an iframe with improved handling of
 * Figma embeds and other external content
 */
const IframeModal: React.FC<IframeModalProps> = ({ url, title, isMobile }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');
  const theme = useTheme();
  
  // Process and optimize URL for different embed types
  useEffect(() => {
    if (!url) {
      setHasError(true);
      return;
    }
    
    try {
      // Process Figma URLs to ensure proper format for embedding
      if (url.includes('figma.com')) {
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
      }
      // Process Miro URLs
      else if (url.includes('miro.com')) {
        // Convert to proper Miro embed URL if needed
        let optimizedUrl = url;
        if (!url.includes('embed/')) {
          optimizedUrl = url.replace('miro.com/', 'miro.com/embed/');
        }
        setProcessedUrl(optimizedUrl);
      }
      // For other URLs, use as-is
      else {
        setProcessedUrl(url);
      }
    } catch (error) {
      console.error('Error processing URL:', error);
      setHasError(true);
    }
  }, [url]);

  return (
    <Box 
      sx={{
        height: isMobile ? '100vh' : '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {hasError ? (
        <Alert severity="error" sx={{ m: 2 }}>
          There was an error loading the content. Please try refreshing the page or opening the content in a new tab.
        </Alert>
      ) : (
        <>
          {isLoading && (
            <Box 
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          
          <Box
            component="iframe"
            src={processedUrl}
            title={title}
            onLoad={() => setIsLoading(false)}
            sx={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: theme.palette.background.paper,
            }}
          />
        </>
      )}
    </Box>
  );
};

export default IframeModal;
