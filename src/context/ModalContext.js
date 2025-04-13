import React, { createContext, useState, useContext, useCallback } from 'react';
import { Modal as MuiModal, Box, IconButton, useTheme, Fade, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProjectFullContent from '../components/work/ProjectFullContent';
import { PDFViewer, IframeViewer } from '../components/common/ModalContentViewer';

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [modalType, setModalType] = useState('project'); // 'project', 'pdf', 'iframe', 'external'
  const [modalTitle, setModalTitle] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [onModalCloseCallback, setOnModalCloseCallback] = useState(null);

  const openModal = useCallback((content, type = 'custom', title = '') => {
    setModalContent(content);
    setModalType(type);
    setModalTitle(title);
    setModalOpen(true);
    setCurrentProject(null); // Reset project state for generic modals
    setExternalUrl(''); // Reset external URL
  }, []);

  const openProjectModal = useCallback((projectData) => {
    if (!projectData) {
      console.error("Attempted to open project modal with no data.");
      return;
    }
    setCurrentProject(projectData);
    setModalType('project');
    setModalTitle(projectData.title || 'Project Details');
    setModalOpen(true);
    setModalContent(null); // Clear generic content
    setExternalUrl(''); // Reset external URL
  }, []);

  const openPdf = useCallback((pdfUrl, title = 'PDF Document') => {
    setModalContent(<PDFViewer url={pdfUrl} title={title} />);
    setModalType('pdf');
    setModalTitle(title);
    setModalOpen(true);
    setCurrentProject(null);
    setExternalUrl('');
  }, []);

  const openIframe = useCallback((iframeUrl, title = 'Interactive Content') => {
    setModalContent(<IframeViewer url={iframeUrl} title={title} />);
    setModalType('iframe');
    setModalTitle(title);
    setModalOpen(true);
    setCurrentProject(null);
    setExternalUrl('');
  }, []);

  const openExternalContent = useCallback((url, title = 'External Content') => {
    setExternalUrl(url);
    setModalType('external');
    setModalTitle(title);
    setModalOpen(true);
    setModalContent(null);
    setCurrentProject(null);
  }, []);

  const closeModal = useCallback((callback) => {
    if (typeof callback === 'function') {
      setOnModalCloseCallback(() => callback); // Store the callback
    } else {
      setOnModalCloseCallback(null); // Clear any previous callback
    }
    setModalOpen(false);
  }, []);

  const handleExited = () => {
    setModalContent(null);
    setCurrentProject(null);
    setModalType('project');
    setModalTitle('');
    setExternalUrl('');
    if (onModalCloseCallback) {
      onModalCloseCallback();
      setOnModalCloseCallback(null);
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'project':
        return currentProject ? <ProjectFullContent project={currentProject} /> : null;
      case 'pdf':
      case 'iframe':
        return modalContent;
      case 'external':
        return (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Redirecting...</Typography>
            <Typography sx={{ mb: 3 }}>You are being redirected to:</Typography>
            <Typography component="a" href={externalUrl} target="_blank" rel="noopener noreferrer" sx={{ wordBreak: 'break-all' }}>
              {externalUrl}
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} onClick={() => window.open(externalUrl, '_blank', 'noopener,noreferrer')}>
              Open Link Manually
            </Button>
          </Box>
        );
      default:
        return modalContent;
    }
  };

  const getModalStyle = () => {
    const baseStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: theme.shape.borderRadius,
      outline: 'none',
      display: 'flex',
      flexDirection: 'column',
    };

    switch (modalType) {
      case 'project':
        return {
          ...baseStyle,
          width: { xs: '98%', sm: '95%', md: '90%', lg: '85%' },
          maxWidth: '1400px',
          height: { xs: '95vh', sm: '90vh' },
          maxHeight: '95vh',
        };
      case 'pdf':
      case 'iframe':
        return {
          ...baseStyle,
          width: { xs: '95%', sm: '90%', md: '80%' },
          maxWidth: '1100px',
          height: { xs: '90vh', sm: '85vh' },
          maxHeight: '90vh',
        };
      case 'external':
        return {
          ...baseStyle,
          width: { xs: '90%', sm: '60%', md: '400px' },
          height: 'auto',
          maxHeight: '80vh',
        };
      default:
        return {
          ...baseStyle,
          width: { xs: '90%', sm: '70%', md: '500px' },
          height: 'auto',
          maxHeight: '80vh',
        };
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, openProjectModal, openPdf, openIframe, openExternalContent, closeModal }}>
      {children}
      <MuiModal
        open={modalOpen}
        onClose={() => closeModal(null)}
        closeAfterTransition
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300, onExited: handleExited }}
      >
        <Fade in={modalOpen} timeout={300}>
          <Box sx={getModalStyle()}>
            <IconButton
              aria-label="close modal"
              onClick={() => closeModal(null)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 1301,
                color: (theme) => theme.palette.grey[500],
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: (theme) => theme.palette.common.white,
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              id="modal-scroll-container"
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-track': { bgcolor: 'background.default' },
                '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.700', borderRadius: '4px' },
                '&::-webkit-scrollbar-thumb:hover': { bgcolor: 'grey.600' },
              }}
            >
              {renderModalContent()}
            </Box>
          </Box>
        </Fade>
      </MuiModal>
    </ModalContext.Provider>
  );
};
