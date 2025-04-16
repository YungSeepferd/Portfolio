import React, { createContext, useState, useContext, useCallback } from 'react';
import { Modal, Box } from '@mui/material';
import PDFViewer from '../components/common/PDFViewer';
import IframeModal from '../components/common/IframeModal';

// Create context
const ModalContext = createContext(null);

// Modal style for consistent appearance - updated to be almost fullscreen
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw', // Increased to 95% of viewport width
  height: '95vh', // Increased to 95% of viewport height
  maxWidth: '95vw',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

// Provider component
export const ModalProvider = ({ children }) => {
  // State for different modal types
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  
  const [iframeOpen, setIframeOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [iframeTitle, setIframeTitle] = useState('');

  const [externalOpen, setExternalOpen] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');
  const [externalTitle, setExternalTitle] = useState('');

  const [projectOpen, setProjectOpen] = useState(false);
  const [projectContent, setProjectContent] = useState(null);
  
  // Open PDF modal
  const openPdf = useCallback((url, title = '') => {
    // Check if url is a string path or an imported file
    setPdfUrl(url);
    setPdfOpen(true);
    // Close other modals
    setIframeOpen(false);
    setExternalOpen(false);
    setProjectOpen(false);
  }, []);
  
  // Open iframe modal
  const openIframe = useCallback((url, title = 'External Content') => {
    setIframeUrl(url);
    setIframeTitle(title);
    setIframeOpen(true);
    // Close other modals
    setPdfOpen(false);
    setExternalOpen(false);
    setProjectOpen(false);
  }, []);
  
  // Open external content modal
  const openExternalContent = useCallback((url, title = 'External Website') => {
    setExternalUrl(url);
    setExternalTitle(title);
    setExternalOpen(true);
    // Close other modals
    setPdfOpen(false);
    setIframeOpen(false);
    setProjectOpen(false);
  }, []);
  
  // Open project modal
  const openProjectModal = useCallback((content) => {
    setProjectContent(content);
    setProjectOpen(true);
    // Close other modals
    setPdfOpen(false);
    setIframeOpen(false);
    setExternalOpen(false);
  }, []);
  
  // Close all modals
  const closeModal = useCallback(() => {
    setPdfOpen(false);
    setIframeOpen(false);
    setExternalOpen(false);
    setProjectOpen(false);
  }, []);
  
  return (
    <ModalContext.Provider
      value={{
        openPdf,
        openIframe,
        openExternalContent,
        openProjectModal,
        closeModal,
        projectContent,
        projectOpen,
      }}
    >
      {children}
      
      {/* PDF Modal */}
      <Modal
        open={pdfOpen}
        onClose={closeModal}
        aria-labelledby="pdf-modal-title"
        aria-describedby="pdf-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Backdrop styling
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker background
          }
        }}
      >
        <Box sx={modalStyle}>
          <PDFViewer url={pdfUrl} title="PDF Document" />
        </Box>
      </Modal>
      
      {/* Iframe Modal */}
      <Modal
        open={iframeOpen}
        onClose={closeModal}
        aria-labelledby="iframe-modal-title"
        aria-describedby="iframe-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Backdrop styling
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker background
          }
        }}
      >
        <Box sx={modalStyle}>
          <IframeModal url={iframeUrl} title={iframeTitle} />
        </Box>
      </Modal>
      
      {/* External Content Modal */}
      <Modal
        open={externalOpen}
        onClose={closeModal}
        aria-labelledby="external-modal-title"
        aria-describedby="external-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Backdrop styling
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.85)', // Darker background
          }
        }}
      >
        <Box sx={modalStyle}>
          <IframeModal url={externalUrl} title={externalTitle} />
        </Box>
      </Modal>
      
      {/* Project Modal is rendered by the ProjectModal component */}
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export default ModalContext;
