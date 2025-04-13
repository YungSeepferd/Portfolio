import React from 'react';
import { Modal, Box, IconButton, useTheme } from '@mui/material'; // Removed useMediaQuery
import CloseIcon from '@mui/icons-material/Close';
import ProjectFullContent from './ProjectFullContent';
import ProjectNavigation from './ProjectNavigation';

/**
 * ProjectModal Component
 *
 * Wrapper for displaying project details within a modal.
 * Primarily relies on ModalContext for state and rendering logic.
 * This component might be simplified or removed if ModalContext handles everything.
 */
const ProjectModal = ({ project, open, onClose, onNavigate }) => {
  const theme = useTheme();

  // Modal style (can be potentially moved to ModalContext if this component is removed)
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', sm: '90%', md: '85%', lg: '80%' }, // Responsive width handled here or in context
    maxWidth: '1200px',
    height: { xs: '90vh', sm: '85vh' }, // Responsive height handled here or in context
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

  if (!project) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
    >
      <Box sx={modalStyle}>
        {/* Header with Title and Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
          {/* Project Navigation (passed via props if this component is kept) */}
          {onNavigate && (
             <ProjectNavigation
               onNavigate={onNavigate}
               // Need isFirst/isLast props if this component manages navigation state
             />
          )}
          <IconButton onClick={onClose} aria-label="close modal" sx={{ ml: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Scrollable Content Area */}
        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
          {/* Render the full content */}
          <ProjectFullContent project={project} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ProjectModal;