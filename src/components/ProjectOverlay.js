import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Overlay from './Overlay';
import styles from './ProjectOverlay.module.css';
import { Button, Box, Typography, useTheme } from '@mui/material';

const ProjectOverlay = ({ project, onClose }) => {
  const theme = useTheme();

  return (
    <Overlay onClose={onClose}>
      <Box
        className={styles.overlayContent}
        sx={{
          backgroundColor: theme.palette.background.paper, // Use paper background instead of contrastText
          padding: theme.spacing(4),
          borderRadius: theme.shape.borderRadius,
          boxShadow: `0 8px 32px ${theme.palette.shadow.medium}`,
        }}
      >
        <Typography
          variant="h3" // Use theme typography variant
          className={styles.title}
          sx={{
            color: theme.palette.primary.main, // Use primary color consistently
            mb: 3,
          }}
        >
          {project.title}
        </Typography>
        
        <Box
          component="img"
          src={project.media.src}
          alt={project.title}
          className={styles.projectImage}
          sx={{
            borderRadius: theme.shape.borderRadius,
            mb: 3,
          }}
        />
        
        <Typography
          variant="body1" // Use theme typography variant
          className={styles.details}
          sx={{
            color: theme.palette.text.primary, // Use text color consistently
            mb: 4,
          }}
        >
          {project.details}
        </Typography>
        
        <Box className={styles.overlayPlaceholder} sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 3 }}>
          <Typography
            variant="h5"
            className={styles.sectionTitle}
            sx={{
              color: theme.palette.secondary.main,
              mb: 2,
            }}
          >
            UX Designer Notes
          </Typography>
          {/* ...remaining content... */}
        </Box>
        
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          className={styles.closeButton}
          sx={{
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
          }}
        >
          Close
        </Button>
      </Box>
    </Overlay>
  );
};

export default ProjectOverlay;