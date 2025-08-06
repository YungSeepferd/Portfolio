import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

// Set up PDF.js worker
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

const PDFViewer = ({ url, title, onCloseFocusRef }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [numPages, setNumPages] = useState(null);
  const [blobUrl, setBlobUrl] = useState(null);
  const downloadBtnRef = useRef(null);

  const pdfUrl = React.useMemo(() => {
    if (typeof url === 'object') {
      const blob = URL.createObjectURL(new Blob([url], { type: 'application/pdf' }));
      setBlobUrl(blob);
      return blob;
    }
    return url;
  }, [url]);

  useEffect(
    () => () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    },
    [blobUrl]
  );

  useEffect(() => {
    if (onCloseFocusRef && downloadBtnRef.current) {
      onCloseFocusRef.current = downloadBtnRef.current;
    }
  }, [onCloseFocusRef]);

  const getFileName = () => {
    try {
      if (typeof url === 'string') {
        const parts = url.split('/');
        return parts[parts.length - 1];
      }
      return title ? `${title.replace(/\s+/g, '_')}.pdf` : 'document.pdf';
    } catch {
      return 'document.pdf';
    }
  };

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ flex: 1, overflow: 'auto', p: isMobile ? 1 : 2 }}>
        <Document
          file={pdfUrl}
          loading={
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={isMobile ? undefined : 600}
            />
          ))}
        </Document>
      </Box>
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          href={pdfUrl}
          download={getFileName()}
          ref={downloadBtnRef}
        >
          Download
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<OpenInNewIcon />}
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in New Tab
        </Button>
      </Box>
    </Box>
  );
};

export default PDFViewer;
