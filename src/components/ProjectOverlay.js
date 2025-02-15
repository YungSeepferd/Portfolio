import React from 'react';
import { motion } from 'framer-motion';
import './ProjectOverlay.css';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariants = {
  hidden: { scale: 0.8, opacity: 0, y: -50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: { scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.3 } },
};

const ProjectOverlay = ({ project, onClose }) => {
  return (
    <motion.div
      className="overlay"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="overlay__background" onClick={onClose} />
      <motion.div className="overlay__container" variants={containerVariants}>
        <div className="overlay__controls">
          <button className="overlay__close" onClick={onClose} />
        </div>
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
        {/* Placeholder content for additional UX details */}
        <div className="overlay__placeholder">
          <h3>UX Designer Notes</h3>
          <p>
            Add your detailed project breakdown, user research, design process,
            and any iteration insights here.
          </p>
          <ul>
            <li>Problem Statement: [Enter description]</li>
            <li>User Research & Insights: [Enter details]</li>
            <li>Wireframes & Prototypes: [Enter notes]</li>
            <li>Final Design Decisions: [Enter rationale]</li>
          </ul>
        </div>
        {project.content}
      </motion.div>
    </motion.div>
  );
};

export default ProjectOverlay;