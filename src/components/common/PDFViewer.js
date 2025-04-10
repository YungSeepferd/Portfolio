import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

/**
 * PDFViewer Component
 * 
 * Displays a PDF document in an iframe for inline viewing
 * with improved path resolution and error handling
 */
const PDFViewer = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');
  const theme = useTheme();
  
  // Process URL to ensure proper PDF loading
  useEffect(() => {
    try {
      if (!url) {
        setHasError(true);
        console.error('No URL provided to PDFViewer');
        return;
      }
      
      // Normalize the URL by removing leading slashes and processing src/ references
      let normalizedUrl = url.trim();
      
      // Handle src/ paths by transforming them to public assets
      if (normalizedUrl.startsWith('src/')) {
        // Remove 'src/' and prepend with public path
        normalizedUrl = normalizedUrl.replace('src/', '/');
      }
      
      // Ensure the URL starts with a slash if it's a relative path
      if (!normalizedUrl.startsWith('/') && !normalizedUrl.startsWith('http')) {
        normalizedUrl = `/${normalizedUrl}`;
      }
      
      console.log('Processed PDF URL:', normalizedUrl);
      setProcessedUrl(normalizedUrl);
      setHasError(false);
    } catch (error) {
      console.error('Error processing PDF URL:', error);
      setHasError(true);
    }
  }, [url]);
  
  // Handle iframe load completion
  const handleLoad = () => {
    console.log('PDF loaded successfully');
    setIsLoading(false);
  };
  
  // Handle iframe load error
  const handleError = () => {
    console.error('Failed to load PDF:', processedUrl);
    setIsLoading(false);
    setHasError(true);
  };
  
  // Extract filename for download button
  const getFileName = () => {
    try {
      const pathParts = processedUrl.split('/');
      return pathParts[pathParts.length - 1];
    } catch (e) {
      return 'document.pdf';
    }
  };
  
  if (hasError) {
    return (
      <Box 
        sx={{ 
          width: '100%',
          height: '70vh',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography 
          variant="h6" 
          color="error"
          sx={{ mb: 2 }}
        >
          Unable to load PDF
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          The PDF document could not be loaded. Please try downloading it directly.
        </Typography>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          href={processedUrl}
          download={getFileName()}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {isLoading && (
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: theme.palette.background.paper,
            zIndex: 1,
            minHeight: '70vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}
      
      <Box 
        component="iframe"
        src={processedUrl}
        title={title || "PDF Document"}
        onLoad={handleLoad}
        onError={handleError}
        sx={{
          width: '100%',
          height: '70vh',
          border: 'none',
          display: 'block',
          borderRadius: theme.shape.borderRadius,
        }}
      />
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        mt: 2
      }}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          href={processedUrl}
          download={getFileName()}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          Download PDF
        </Button>
      </Box>
    </Box>
  );
};

export default PDFViewer;