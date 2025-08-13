import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, CircularProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Document, Page, pdfjs } from 'react-pdf';
import './pdf-viewer.css';

// Set up PDF.js worker
if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

interface PDFViewerProps {
  url: string | Blob;
  title?: string;
  onCloseFocusRef?: React.RefObject<HTMLElement>;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title, onCloseFocusRef }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [numPages, setNumPages] = useState<number | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const downloadBtnRef = useRef<HTMLButtonElement>(null);

  const pdfUrl = React.useMemo(() => {
    try {
      const hasURL = typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function';
      if (typeof Blob !== 'undefined' && url instanceof Blob && hasURL) {
        const blob = URL.createObjectURL(url);
        setBlobUrl(blob);
        return blob;
      }
    } catch (e) {
      // noop
    }
    return url as string;
  }, [url]);

  useEffect(
    () => () => {
      try {
        if (blobUrl && typeof URL !== 'undefined') URL.revokeObjectURL(blobUrl);
      } catch (e) {
        // noop
      }
    },
    [blobUrl]
  );

  useEffect(() => {
    if (
      onCloseFocusRef?.current &&
      downloadBtnRef.current &&
      onCloseFocusRef.current !== downloadBtnRef.current
    ) {
      (onCloseFocusRef as any).current = downloadBtnRef.current;
    }
  }, [onCloseFocusRef]);

  const getFileName = (): string => {
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

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const handleDownload = (): void => {
    const link = document.createElement('a');
    link.href = pdfUrl as string;
    link.download = getFileName();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNew = (): void => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          p: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Button
          ref={downloadBtnRef}
          startIcon={<FileDownloadIcon />}
          onClick={handleDownload}
          variant="contained"
          color="primary"
          size="small"
        >
          Download
        </Button>
        <Button
          startIcon={<OpenInNewIcon />}
          onClick={handleOpenInNew}
          variant="outlined"
          color="primary"
          size="small"
        >
          Open in New Tab
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<CircularProgress aria-label="Loading PDF document" />}
          error={<div>Error loading PDF. Please try downloading it instead.</div>}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={isMobile ? window.innerWidth - 32 : undefined}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </Box>
    </Box>
  );
};

export default PDFViewer;
