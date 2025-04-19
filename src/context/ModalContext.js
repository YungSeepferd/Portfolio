import React, { createContext, useState, useContext, useCallback } from 'react';
import { Modal, Box, Dialog, AppBar, Toolbar, IconButton, Typography, useMediaQuery, useTheme, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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
      {/* PDF Modal - Responsive Dialog for all devices */}
      <Dialog
        open={pdfOpen}
        onClose={closeModal}
        fullScreen={false}
        maxWidth={false}
        fullWidth={false}
        TransitionComponent={Slide}
        aria-labelledby="pdf-modal-title"
        aria-describedby="pdf-modal-description"
        PaperProps={{
          sx: {
            m: 0,
            borderRadius: 2,
            width: '95vw',
            height: '80vh',
            maxWidth: '95vw',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        <AppBar position="sticky" color="default" elevation={1} sx={{ borderRadius: 0 }}>
          <Toolbar sx={{ minHeight: 56, px: 1 }}>
            <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 600 }}>
              PDF Document
            </Typography>
            <IconButton edge="end" color="inherit" onClick={closeModal} aria-label="Close PDF" size="large">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ flex: 1, width: '100vw', height: '100%', minHeight: 0, p: 0, display: 'flex', flexDirection: 'column' }}>
          <PDFViewer url={pdfUrl} title="PDF Document" />
        </Box>
      </Dialog>
      {/* Iframe Modal - Responsive Dialog for mobile */}
      <Dialog
        open={iframeOpen}
        onClose={closeModal}
        fullScreen={isMobile}
        maxWidth="md"
        fullWidth
        TransitionComponent={Slide}
        aria-labelledby="iframe-modal-title"
        aria-describedby="iframe-modal-description"
        PaperProps={{
          sx: isMobile ? { m: 0, borderRadius: 0, height: '100vh' } : { borderRadius: 2 }
        }}
      >
        {isMobile && (
          <AppBar position="sticky" color="default" elevation={1} sx={{ borderRadius: 0 }}>
            <Toolbar sx={{ minHeight: 56, px: 1 }}>
              <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 600 }}>
                {iframeTitle || 'External Content'}
              </Typography>
              <IconButton edge="end" color="inherit" onClick={closeModal} aria-label="Close content" size="large">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        <Box sx={{ flex: 1, height: isMobile ? 'calc(100vh - 56px)' : '80vh', p: 0, display: 'flex', flexDirection: 'column' }}>
          <IframeModal url={iframeUrl} title={iframeTitle} />
        </Box>
      </Dialog>
      {/* External Content Modal - Responsive Dialog for mobile */}
      <Dialog
        open={externalOpen}
        onClose={closeModal}
        fullScreen={isMobile}
        maxWidth="md"
        fullWidth
        TransitionComponent={Slide}
        aria-labelledby="external-modal-title"
        aria-describedby="external-modal-description"
        PaperProps={{
          sx: isMobile ? { m: 0, borderRadius: 0, height: '100vh' } : { borderRadius: 2 }
        }}
      >
        {isMobile && (
          <AppBar position="sticky" color="default" elevation={1} sx={{ borderRadius: 0 }}>
            <Toolbar sx={{ minHeight: 56, px: 1 }}>
              <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 600 }}>
                {externalTitle || 'External Website'}
              </Typography>
              <IconButton edge="end" color="inherit" onClick={closeModal} aria-label="Close external" size="large">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        <Box sx={{ flex: 1, height: isMobile ? 'calc(100vh - 56px)' : '80vh', p: 0, display: 'flex', flexDirection: 'column' }}>
          <IframeModal url={externalUrl} title={externalTitle} />
        </Box>
      </Dialog>
      {/* Project Modal is rendered by the ProjectModal component */}
      {/* Purpose: Custom Modal for future use (e.g., onboarding, announcements, or special overlays) */}
      {/* This Modal is not shown by default, but is ready for future use and uses modalStyle for responsive design. */}
      <Modal open={false} onClose={() => {}}>
        <Box sx={modalStyle}>
          {/* Future: Place onboarding, announcement, or custom overlay content here */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            Special Announcement
          </Typography>
          <Typography variant="body1">
            This is a placeholder for a custom modal overlay. You can use this for onboarding, announcements, or any special content that should appear above the main app. The modalStyle ensures it is responsive and visually consistent.
          </Typography>
        </Box>
      </Modal>
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
