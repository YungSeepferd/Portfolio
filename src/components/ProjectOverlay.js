import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Overlay from './Overlay';
import styles from './ProjectOverlay.module.css';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

/**
 * ProjectOverlay displays detailed project information inside an overlay.
 * It now also includes a mini interactive geography section.
 */
const ProjectOverlay = ({ project, onClose }) => {
  const theme = useTheme();

  return (
    <Overlay onClose={onClose}>
      <div
        className={styles.overlayContent}
        style={{
          backgroundColor: theme.palette.background, // Use contrastText color for background
        }}
      >
        <h2
          className={styles.title}
          style={{
            color: theme.palette.secondary.main, // Use secondary color for text
          }}
        >
          {project.title}
        </h2>
        <img
          src={project.media.src}
          alt={project.title}
          className={styles.projectImage}
        />
        <p
          className={styles.details}
          style={{
            color: theme.palette.secondary.main, // Use secondary color for text
          }}
        >
          {project.details}
        </p>
        <div className={styles.overlayPlaceholder}>
          <h3
            className={styles.sectionTitle}
            style={{
              color: theme.palette.secondary.main, // Use secondary color for text
            }}
          >
            UX Designer Notes
          </h3>
          <p
            className={styles.sectionContent}
            style={{
              color: theme.palette.secondary.main, // Use secondary color for text
            }}
          >
            Add your detailed breakdown, user research or design process insights here.
          </p>
          <ul
            className={styles.sectionList}
            style={{
              color: theme.palette.secondary.main, // Use secondary color for text
            }}
          >
            <li>Problem Statement: [Your description]</li>
            <li>User Research: [Your insights]</li>
            <li>Design Decisions: [Your rationale]</li>
          </ul>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          className={styles.closeButton}
        >
          Close
        </Button>
      </div>
    </Overlay>
  );
};

export default ProjectOverlay;