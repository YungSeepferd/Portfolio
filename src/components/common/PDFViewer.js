import React, { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, Button, useMediaQuery, Stack, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// Remove unused icons but keep them commented for future reference
// import ZoomInIcon from '@mui/icons-material/ZoomIn';
// import ZoomOutIcon from '@mui/icons-material/ZoomOut';

/**
 * PDFViewer Component
 * 
 * Displays a PDF document in an iframe with improved handling of both
 * imported PDF files and URL references. Provides mobile fallbacks with
 * Google PDF Viewer for better mobile support.
 */
const PDFViewer = ({ url, title, onCloseFocusRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useGoogleViewer, setUseGoogleViewer] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const blobUrlRef = useRef(null);
  const downloadBtnRef = useRef(null);
  
  // Generate a proper URL for the PDF, whether it's an imported file or string path
  const pdfUrl = React.useMemo(() => {
    if (typeof url === 'object') {
      const blobUrl = URL.createObjectURL(new Blob([url], { type: 'application/pdf' }));
      blobUrlRef.current = blobUrl;
      return blobUrl;
    }
    return url;
  }, [url]);

  // Generate Google PDF Viewer URL for better mobile compatibility
  const googleViewerUrl = React.useMemo(() => {
    if (!pdfUrl) return '';
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  }, [pdfUrl]);

  // Clean up Blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [pdfUrl]);

  // Focus management: expose download button ref to parent for focus restoration
  useEffect(() => {
    if (onCloseFocusRef && downloadBtnRef.current) {
      onCloseFocusRef.current = downloadBtnRef.current;
    }
  }, [onCloseFocusRef]);

  // Handle iframe load completion
  const handleLoad = () => {
    console.log('PDF loaded successfully');
    setIsLoading(false);
  };
  
  // Handle iframe load error
  const handleError = () => {
    console.error('Failed to load PDF:', pdfUrl);
    setIsLoading(false);
    setHasError(true);
  };
  
  // Extract filename for download button
  const getFileName = () => {
    try {
      if (typeof url === 'string') {
        const pathParts = url.split('/');
        return pathParts[pathParts.length - 1];
      } else {
        return title ? `${title.replace(/\s+/g, '_')}.pdf` : 'document.pdf';
      }
    } catch (e) {
      return 'document.pdf';
    }
  };

  // Toggle between native PDF and Google Viewer (better for mobile)
  const toggleViewer = () => {
    setIsLoading(true);
    setUseGoogleViewer(prev => !prev);
  };
  
  // For mobile, provide improved PDF viewing options
  if (isMobile) {
    return (
      <Box 
        sx={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: theme.palette.background.paper,
          overflow: 'hidden'
        }}
      >
        {/* Alert about mobile PDF viewing */}
        <Alert severity="info" variant="outlined" sx={{ m: 2 }}>
          For best experience, choose one of these options to view the PDF
        </Alert>

        {/* Show the Google PDF Viewer for better mobile support */}
        <Box 
          sx={{
            width: '100%', 
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {isLoading && (
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                flex: 1
              }}
            >
              <CircularProgress size={40} />
              <Typography variant="body2" sx={{ mt: 2 }}>
                Loading PDF viewer...
              </Typography>
            </Box>
          )}

          <Box 
            component="iframe"
            src={useGoogleViewer ? googleViewerUrl : pdfUrl}
            title={title || "PDF Document"}
            onLoad={handleLoad}
            onError={handleError}
            sx={{
              width: '100%',
              flex: 1,
              border: 'none',
              display: isLoading ? 'none' : 'block'
            }}
          />
        </Box>
        
        {/* Bottom action bar with viewing options */}
        <Box 
          sx={{ 
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
            <Button
              variant={useGoogleViewer ? "outlined" : "contained"}
              color={useGoogleViewer ? "primary" : "secondary"}
              onClick={toggleViewer}
              fullWidth
            >
              {useGoogleViewer ? "Use Native Viewer" : "Use Google Viewer"}
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              href={pdfUrl}
              download={getFileName()}
              ref={downloadBtnRef}
              fullWidth
            >
              Download
            </Button>
            <Button
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer" 
              fullWidth
            >
              Open in New Tab
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  }

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
          href={pdfUrl}
          download={getFileName()}
          target="_blank"
          rel="noopener noreferrer"
          ref={downloadBtnRef}
        >
          Download PDF
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
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
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}
      <Box 
        sx={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          flex: 1,
          border: 'none',
          display: 'block',
          borderRadius: theme.shape.borderRadius,
          overflow: 'auto',
          touchAction: 'pan-x pan-y',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Box
          component="iframe"
          src={pdfUrl}
          title={title || "PDF Document"}
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            width: '100%',
            height: '100%',
            minHeight: 0,
            border: 'none',
            display: 'block',
            borderRadius: theme.shape.borderRadius,
          }}
        />
      </Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        p: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.paper,
      }}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          href={pdfUrl}
          download={getFileName()}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          ref={downloadBtnRef}
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          Open in New Tab
        </Button>
      </Box>
    </Box>
  );
};

export default PDFViewer;