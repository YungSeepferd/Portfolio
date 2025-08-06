import React, { createContext, useState, useContext, useCallback } from 'react';
import { Modal, Box, Dialog, AppBar, Toolbar, IconButton, Typography, useMediaQuery, useTheme, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PDFViewer from '../components/common/PDFViewer';
import IframeModal from '../components/common/IframeModal';
import { TransitionProps } from '@mui/material/transitions';

interface ModalContextType {
  openPdf: (url: string, title?: string) => void;
  openIframe: (url: string, title?: string) => void;
  openExternalContent: (url: string, title?: string) => void;
  openProjectModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

// Create context
const ModalContext = createContext<ModalContextType | null>(null);

// Modal style for consistent appearance - updated to be almost fullscreen
const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  height: '95vh',
  maxWidth: '95vw',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column' as const,
};

// Transition for Dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Provider component
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  // State for different modal types
  const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  const [iframeOpen, setIframeOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [iframeTitle, setIframeTitle] = useState('');

  const [externalOpen, setExternalOpen] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');
  const [externalTitle, setExternalTitle] = useState('');

  const [projectOpen, setProjectOpen] = useState(false);
  const [projectContent, setProjectContent] = useState<React.ReactNode>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Open PDF modal
  const openPdf = useCallback((url: string, title = '') => {
    setPdfUrl(url);
    setPdfOpen(true);
    // Close other modals
    setIframeOpen(false);
    setExternalOpen(false);
    setProjectOpen(false);
  }, []);
  
  // Open iframe modal
  const openIframe = useCallback((url: string, title = 'External Content') => {
    setIframeUrl(url);
    setIframeTitle(title);
    setIframeOpen(true);
    // Close other modals
    setPdfOpen(false);
    setExternalOpen(false);
    setProjectOpen(false);
  }, []);
  
  // Open external content modal
  const openExternalContent = useCallback((url: string, title = 'External Website') => {
    setExternalUrl(url);
    setExternalTitle(title);
    setExternalOpen(true);
    // Close other modals
    setPdfOpen(false);
    setIframeOpen(false);
    setProjectOpen(false);
  }, []);
  
  // Open project modal
  const openProjectModal = useCallback((content: React.ReactNode) => {
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
      }}
    >
      {children}

      {/* PDF Modal */}
      <Modal
        open={pdfOpen}
        onClose={closeModal}
        aria-labelledby="pdf-modal-title"
      >
        <Box sx={modalStyle}>
          <AppBar position="relative">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={closeModal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography id="pdf-modal-title" variant="h6" component="h2" sx={{ ml: 2, flex: 1 }}>
                Document Viewer
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            {pdfUrl && <PDFViewer url={pdfUrl} />}
          </Box>
        </Box>
      </Modal>

      {/* Iframe Modal */}
      <Dialog
        fullScreen={isMobile}
        maxWidth="xl"
        open={iframeOpen}
        onClose={closeModal}
        TransitionComponent={Transition}
      >
        <IframeModal
          url={iframeUrl}
          title={iframeTitle}
          onClose={closeModal}
          isMobile={isMobile}
        />
      </Dialog>

      {/* External Content Modal */}
      <Dialog
        fullScreen={isMobile}
        maxWidth="xl"
        open={externalOpen}
        onClose={closeModal}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {externalTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ height: isMobile ? '100vh' : '80vh', width: '100%' }}>
          <iframe
            src={externalUrl}
            title={externalTitle}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </Box>
      </Dialog>

      {/* Project Modal */}
      <Dialog
        fullScreen
        open={projectOpen}
        onClose={closeModal}
        TransitionComponent={Transition}
      >
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          {projectContent}
        </Box>
      </Dialog>
    </ModalContext.Provider>
  );
};

// Custom hook to use modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export default ModalContext;
