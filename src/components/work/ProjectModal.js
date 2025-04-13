import React from 'react';
import { Modal, Box, useTheme } from '@mui/material';
import ProjectFullContent from './ProjectFullContent';
import ProjectNavigation from './ProjectNavigation';

/**
 * ProjectModal Component
 *
 * Displays a project in a modal dialog with navigation controls.
 */
const ProjectModal = ({ project, open, onClose, onNextProject, onPreviousProject }) => {
  const theme = useTheme();

  // Modal style for consistent appearance
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', sm: '90%', md: '85%', lg: '80%' },
    maxWidth: '1200px',
    height: { xs: '90vh', sm: '85vh' },
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
        {/* Navigation Controls */}
        <ProjectNavigation 
          onClose={onClose}
          onPrev={onPreviousProject}
          onNext={onNextProject}
        />
        
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