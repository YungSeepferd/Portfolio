import React, { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

/**
 * PDFViewer Component
 * 
 * Displays a PDF document in an iframe with improved handling of both
 * imported PDF files and URL references
 */
const PDFViewer = ({ url, title, onCloseFocusRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
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
  
  // Debugging: log url and pdfUrl
  console.log('PDFViewer url prop:', url);
  console.log('PDFViewer computed pdfUrl:', pdfUrl);
  console.log('PDFViewer isLoading:', isLoading, 'hasError:', hasError);

  // Mobile fallback: show message and download/open button instead of iframe
  if (isMobile) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, p: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          PDF Preview Not Supported on Mobile
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Most mobile browsers do not support PDF preview. Please download or open the PDF in a new tab.
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
          Download/Open PDF
        </Button>
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
        justifyContent: 'flex-end',
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
      </Box>
    </Box>
  );
};

export default PDFViewer;