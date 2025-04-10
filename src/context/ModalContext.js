import React, { createContext, useContext, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useTheme from '@mui/material/styles/useTheme';
import PDFViewer from '../components/common/PDFViewer';
import IframeModal from '../components/common/IframeModal';
import { getPdfUrl } from '../utils/pdfUtils';

// Create context
const ModalContext = createContext();

/**
 * ModalProvider Component
 * 
 * Provides modal functionality for PDFs, iframes, and external websites
 * throughout the application.
 */
export const ModalProvider = ({ children }) => {
  const theme = useTheme();
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  
  const [iframeModalOpen, setIframeModalOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [iframeTitle, setIframeTitle] = useState('');
  
  const [externalModalOpen, setExternalModalOpen] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');
  const [externalTitle, setExternalTitle] = useState('');

  // Open PDF modal
  const openPdf = (url, title = 'Document') => {
    // Use getPdfUrl to ensure correct URL format
    const processedUrl = getPdfUrl(url);
    setPdfUrl(processedUrl);
    setPdfTitle(title);
    setPdfModalOpen(true);
  };

  // Close PDF modal
  const closePdf = () => {
    setPdfModalOpen(false);
    // Reset URL after a brief timeout to allow close animation
    setTimeout(() => {
      setPdfUrl('');
      setPdfTitle('');
    }, 300);
  };

  // Open Iframe modal (for Figma, etc.)
  const openIframe = (url, title = 'Interactive Content') => {
    setIframeUrl(url);
    setIframeTitle(title);
    setIframeModalOpen(true);
  };

  // Close Iframe modal
  const closeIframe = () => {
    setIframeModalOpen(false);
    // Reset URL after a brief timeout to allow close animation
    setTimeout(() => {
      setIframeUrl('');
      setIframeTitle('');
    }, 300);
  };
  
  // Open External Content modal (for websites, GitHub, etc.)
  const openExternalContent = (url, title = 'External Content') => {
    setExternalUrl(url);
    setExternalTitle(title);
    setExternalModalOpen(true);
  };
  
  // Close External Content modal
  const closeExternalContent = () => {
    setExternalModalOpen(false);
    // Reset URL after a brief timeout to allow close animation
    setTimeout(() => {
      setExternalUrl('');
      setExternalTitle('');
    }, 300);
  };

  // Common modal style
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', sm: '90%', md: '80%' },
    height: '80vh',
    bgcolor: 'background.paper',
    borderRadius: theme.shape.borderRadius,
    boxShadow: 24,
    p: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };
  
  // Close button style
  const closeButtonStyle = {
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500],
    zIndex: 10,
  };

  return (
    <ModalContext.Provider 
      value={{ 
        openPdf, 
        closePdf, 
        openIframe, 
        closeIframe, 
        openExternalContent, 
        closeExternalContent 
      }}
    >
      {children}
      
      {/* PDF Modal */}
      <Modal
        open={pdfModalOpen}
        onClose={closePdf}
        aria-labelledby="pdf-modal-title"
      >
        <Box sx={modalStyle}>
          <IconButton onClick={closePdf} sx={closeButtonStyle} aria-label="close">
            <CloseIcon />
          </IconButton>
          <PDFViewer url={pdfUrl} title={pdfTitle} />
        </Box>
      </Modal>
      
      {/* Iframe Modal */}
      <Modal
        open={iframeModalOpen}
        onClose={closeIframe}
        aria-labelledby="iframe-modal-title"
      >
        <Box sx={modalStyle}>
          <IconButton onClick={closeIframe} sx={closeButtonStyle} aria-label="close">
            <CloseIcon />
          </IconButton>
          <IframeModal url={iframeUrl} title={iframeTitle} />
        </Box>
      </Modal>
      
      {/* External Content Modal */}
      <Modal
        open={externalModalOpen}
        onClose={closeExternalContent}
        aria-labelledby="external-modal-title"
      >
        <Box sx={modalStyle}>
          <IconButton onClick={closeExternalContent} sx={closeButtonStyle} aria-label="close">
            <CloseIcon />
          </IconButton>
          <IframeModal url={externalUrl} title={externalTitle} />
        </Box>
      </Modal>
    </ModalContext.Provider>
  );
};

// Custom hook for using the modal context
export const useModalContext = () => useContext(ModalContext);
