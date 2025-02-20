import React from 'react';
import Overlay from './Overlay';
import styles from './ProjectOverlay.module.css';
import Button from './Button';

/**
 * ProjectOverlay displays detailed project information inside an overlay.
 * Props:
 *   - project: Object containing title, details, and media information.
 *   - onClose: Function to close the overlay.
 */
const ProjectOverlay = ({ project, onClose }) => {
  return (
    <Overlay onClose={onClose}>
      <div className={styles.overlayContent}>
        <h2>{project.title}</h2>
        <img
          src={project.media.src}
          alt={project.title}
          style={{
            width: '100%',
            maxWidth: '800px',
            borderRadius: '12px',
            margin: '2rem 0',
          }}
        />
        <p>{project.details}</p>
        {/* Placeholder for additional UX designer notes */}
        <div className={styles.overlayPlaceholder}>
          <h3>UX Designer Notes</h3>
          <p>
            Add your detailed breakdown, user research or design process insights here.
          </p>
          <ul>
            <li>Problem Statement: [Your description]</li>
            <li>User Research: [Your insights]</li>
            <li>Design Decisions: [Your rationale]</li>
          </ul>
        </div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Overlay>
  );
};

export default ProjectOverlay;