import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import { getPdfUrl } from '../../utils/pdfUtils';

/**
 * PDFViewer Component
 * 
 * Displays a PDF document in an iframe for inline viewing
 */
const PDFViewer = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');
  const theme = useTheme();
  
  useEffect(() => {
    // Process URL to ensure it's correctly formatted
    try {
      if (!url) {
        console.warn('PDFViewer: No URL provided');
        setHasError(true);
        setIsLoading(false);
        return;
      }
      
      const resolvedUrl = getPdfUrl(url);
      setProcessedUrl(resolvedUrl);
    } catch (error) {
      console.error("Failed to process PDF URL:", error);
      setHasError(true);
      setIsLoading(false);
    }
  }, [url]);
  
  // Handle iframe load completion
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };
  
  // Handle iframe load error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('Failed to load PDF:', processedUrl);
  };
  
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
        {title || 'PDF Document'}
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
            Loading document...
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
            Unable to load document
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            The requested document could not be loaded. Please check if the file exists and try again.
          </Typography>
          <Typography variant="caption" color="text.disabled" sx={{ mt: 2 }}>
            Path: {url || 'Not provided'}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 1, height: 'calc(100% - 56px)' }}>
          <iframe
            src={processedUrl}
            title={title || "Document Viewer"}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            onLoad={handleLoad}
            onError={handleError}
            frameBorder="0"
          />
        </Box>
      )}
    </Box>
  );
};

export default PDFViewer;