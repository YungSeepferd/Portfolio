import React from 'react';
import './ProjectBubble.css';

/**
 * ProjectBubble renders any image in a fixed 250x250 frame.
 * It uses object-fit and object-position so that images cover the frame without overflowing.
 *
 * Props:
 *   - image: URL string for the image
 *   - alt: Alternative text for the image
 */
const ProjectBubble = ({ image, alt }) => {
  return (
    <div className="project-bubble">
      <img src={image} alt={alt} className="project-bubble-img" />
    </div>
  );
};

export default ProjectBubble;