import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography, Button, useTheme } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

/**
 * PDFViewer Component
 *
 * Displays a PDF document in an iframe for inline viewing.
 */
export const PDFViewer = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [processedUrl, setProcessedUrl] = useState('');
  const theme = useTheme();

  useEffect(() => {
    try {
      if (!url) {
        setHasError(true);
        console.error('No URL provided to PDFViewer');
        return;
      }
      let normalizedUrl = url.trim();
      if (normalizedUrl.startsWith('src/')) {
        normalizedUrl = normalizedUrl.replace('src/', '/');
      }
      if (!normalizedUrl.startsWith('/') && !normalizedUrl.startsWith('http')) {
        normalizedUrl = `/${normalizedUrl}`;
      }
      setProcessedUrl(normalizedUrl);
      setHasError(false);
    } catch (error) {
      console.error('Error processing PDF URL:', error);
      setHasError(true);
    }
  }, [url]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    console.error('Failed to load PDF:', processedUrl);
    setIsLoading(false);
    setHasError(true);
  };

  const getFileName = () => {
    try {
      const pathParts = processedUrl.split('/');
      return pathParts[pathParts.length - 1];
    } catch (e) { return 'document.pdf'; }
  };

  if (hasError) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error" sx={{ mb: 2 }}>Unable to load PDF</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>The PDF document could not be loaded. Please try downloading it directly.</Typography>
        <Button variant="contained" startIcon={<FileDownloadIcon />} href={processedUrl} download={getFileName()} target="_blank" rel="noopener noreferrer">Download PDF</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {isLoading && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: theme.palette.background.paper, zIndex: 1, minHeight: '70vh' }}>
          <CircularProgress size={60} />
        </Box>
      )}
      <Box component="iframe" src={processedUrl} title={title || "PDF Document"} onLoad={handleLoad} onError={handleError} sx={{ width: '100%', flexGrow: 1, border: 'none', display: 'block', borderRadius: theme.shape.borderRadius }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button variant="outlined" startIcon={<FileDownloadIcon />} href={processedUrl} download={getFileName()} target="_blank" rel="noopener noreferrer" size="small">Download PDF</Button>
      </Box>
    </Box>
  );
};

PDFViewer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};


/**
 * IframeViewer Component (Renamed from IframeModal for clarity)
 *
 * Displays external content in an iframe.
 */
export const IframeViewer = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const theme = useTheme();

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('Failed to load iframe content:', url);
  };

  if (!url) {
    return (
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 3 }}>
        <Typography variant="h6" color="error" sx={{ mb: 1 }}>Invalid URL</Typography>
        <Typography variant="body2" color="text.secondary">No URL was provided.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: theme.shape.borderRadius, overflow: 'hidden' }}>
      {/* Optional Header within the content area */}
      {/* <Typography variant="h6" sx={{ p: 2, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', fontWeight: 500 }}>{title || 'Interactive Content'}</Typography> */}

      {isLoading && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', bgcolor: 'background.paper', zIndex: 1 }}>
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ mt: 2 }}>Loading content...</Typography>
        </Box>
      )}

      {hasError ? (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', p: 3, flex: 1 }}>
          <Typography variant="h6" color="error" sx={{ mb: 1 }}>Unable to load content</Typography>
          <Typography variant="body2" color="text.secondary" align="center">The requested content could not be loaded. This might be due to security policies or the resource being unavailable.</Typography>
          <Typography variant="caption" color="text.disabled" sx={{ mt: 2 }}>URL: {url}</Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 1, height: '100%' /* Ensure Box takes full height */ }}>
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

IframeViewer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};
