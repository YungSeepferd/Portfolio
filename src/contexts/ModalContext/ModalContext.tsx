import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import {
  Modal,
  Box,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Slide,
  SlideProps
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Import components needed for modals
// We'll use dynamic imports or lazy loading when implementing these components
const PDFViewer = React.lazy(() => import('../../components/common/pdf-viewer'));
const IframeModal = React.lazy(() => import('../../components/common/iframe-modal'));

// Define types for the context
interface ModalContextType {
  openPdf: (url: string, title?: string) => void;
  openIframe: (url: string, title?: string) => void;
  openExternalContent: (url: string, title?: string) => void;
  openProjectModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  projectContent: React.ReactNode;
  projectOpen: boolean;
}

// Create context with default values
export const ModalContext = createContext<ModalContextType>({
  openPdf: () => {},
  openIframe: () => {},
  openExternalContent: () => {},
  openProjectModal: () => {},
  closeModal: () => {},
  projectContent: null,
  projectOpen: false,
});

// Define props for ModalProvider
interface ModalProviderProps {
  children: ReactNode;
  initialState?: {
    pdfOpen?: boolean;
    iframeOpen?: boolean;
    externalOpen?: boolean;
    projectOpen?: boolean;
  };
}

// Modal style for consistent appearance
const modalStyle = {
  position: 'absolute',
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
  flexDirection: 'column',
};

// Slide transition component
const SlideTransition = React.forwardRef(function Transition(
  props: SlideProps,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Provider component
export const ModalProvider: React.FC<ModalProviderProps> = ({ 
  children, 
  initialState = {} 
}) => {
  // State for different modal types
  const [pdfOpen, setPdfOpen] = useState<boolean>(initialState.pdfOpen || false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('');

  const [iframeOpen, setIframeOpen] = useState<boolean>(initialState.iframeOpen || false);
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [iframeTitle, setIframeTitle] = useState<string>('');

  const [externalOpen, setExternalOpen] = useState<boolean>(initialState.externalOpen || false);
  const [externalUrl, setExternalUrl] = useState<string>('');
  const [externalTitle, setExternalTitle] = useState<string>('');

  const [projectOpen, setProjectOpen] = useState<boolean>(initialState.projectOpen || false);
  const [projectContent, setProjectContent] = useState<React.ReactNode>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Open PDF modal
  const openPdf = useCallback((url: string, title = '') => {
    setPdfUrl(url);
    setPdfTitle(title);
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
        TransitionComponent={SlideTransition}
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
          },
        }}
      >
        <AppBar position="sticky" color="default" elevation={1} sx={{ borderRadius: 0 }}>
          <Toolbar sx={{ minHeight: 56, px: 1 }}>
            <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 600 }}>
              {pdfTitle || 'PDF Document'}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={closeModal}
              aria-label="Close PDF"
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            flex: 1,
            width: '100%',
            height: '100%',
            minHeight: 0,
            p: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <React.Suspense fallback={<div>Loading PDF viewer...</div>}>
            {pdfUrl && <PDFViewer url={pdfUrl} title={pdfTitle || 'PDF Document'} />}
          </React.Suspense>
        </Box>
      </Dialog>
      
      {/* Iframe Modal - Responsive Dialog for mobile */}
      <Dialog
        open={iframeOpen}
        onClose={closeModal}
        fullScreen={isMobile}
        maxWidth="md"
        fullWidth
        TransitionComponent={SlideTransition}
        aria-labelledby="iframe-modal-title"
        aria-describedby="iframe-modal-description"
        PaperProps={{
          sx: isMobile ? { m: 0, borderRadius: 0, height: '100vh' } : { borderRadius: 2 },
        }}
      >
        {isMobile && (
          <AppBar position="sticky" color="default" elevation={1} sx={{ borderRadius: 0 }}>
            <Toolbar sx={{ minHeight: 56, px: 1 }}>
              <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 600 }}>
                {iframeTitle || 'External Content'}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={closeModal}
                aria-label="Close content"
                size="large"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        <Box
          sx={{
            flex: 1,
            height: isMobile ? 'calc(100vh - 56px)' : '80vh',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <React.Suspense fallback={<div>Loading content...</div>}>
            <IframeModal url={iframeUrl} title={iframeTitle} />
          </React.Suspense>
        </Box>
      </Dialog>
      
      {/* External Content Modal - Responsive Dialog for mobile */}
      <Dialog
        open={externalOpen}
        onClose={closeModal}
        fullScreen={isMobile}
        maxWidth="md"
        fullWidth
        TransitionComponent={SlideTransition}
        aria-labelledby="external-modal-title"
        aria-describedby="external-modal-description"
        PaperProps={{
          sx: isMobile ? { m: 0, borderRadius: 0, height: '100vh' } : { borderRadius: 2 },
        }}
      >
        {isMobile && (
          <AppBar position="sticky" color="default" elevation={1} sx={{ borderRadius: 0 }}>
            <Toolbar sx={{ minHeight: 56, px: 1 }}>
              <Typography variant="subtitle1" sx={{ flex: 1, fontWeight: 600 }}>
                {externalTitle || 'External Website'}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={closeModal}
                aria-label="Close external"
                size="large"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        <Box
          sx={{
            flex: 1,
            height: isMobile ? 'calc(100vh - 56px)' : '80vh',
            p: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <React.Suspense fallback={<div>Loading external content...</div>}>
            <IframeModal url={externalUrl} title={externalTitle} />
          </React.Suspense>
        </Box>
      </Dialog>
      
      {/* Project Modal renders arbitrary React content provided via context */}
      <Modal open={projectOpen} onClose={closeModal}>
        <Box sx={modalStyle}>{projectContent}</Box>
      </Modal>
    </ModalContext.Provider>
  );
};

// Custom hook to use the modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Legacy hook for backward compatibility
export const useModalContext = useModal;

export default ModalContext;
