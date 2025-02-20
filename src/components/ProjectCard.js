import React, { useState } from 'react';
import ProjectBubble from './ProjectBubble';
import './ProjectCard.css';  // assume other project card styles are kept here

/**
 * ProjectCard displays the project details (image, title, etc.)
 * It now uses ProjectBubble to render the image.
 */
const ProjectCard = ({ project }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleReadMore = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="project-card">
      <ProjectBubble image={project.image} alt={project.name} />
      <h3>{project.name}</h3>
      <button onClick={handleReadMore}>Read More</button>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>{project.name}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;